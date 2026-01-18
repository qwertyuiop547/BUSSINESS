/**
 * Order Service
 * 
 * Business logic for orders.
 * Optimized for high performance with transactions.
 */

const orderRepository = require('./order.repository');
const serviceService = require('../service/service.service');
const walletService = require('../wallet/wallet.service');
const { invalidateUser } = require('../../utils/cache');
const { prisma } = require('../../config/database');

class OrderService {
  // Bulk order markup configuration (hidden from user)
  // Applies to ALL services when quantity >= 6000
  static BULK_ORDER_CONFIG = {
    minQuantity: 6000,        // Minimum quantity to apply bulk markup
    markupPerThousand: 30,    // Additional charge per 1000 quantity (₱30/1K = ₱180 at 6K)
  };

  // Quantity-based markup for ALL services (encourages larger orders)
  // Lower quantities = higher markup, higher quantities = better deal
  static QUANTITY_MARKUP = [
    { maxQty: 100, markup: 11 },   // 100 qty = +₱11 (worst deal)
    { maxQty: 250, markup: 8 },    // 101-250 qty = +₱8
    { maxQty: 500, markup: 5 },    // 251-500 qty = +₱5
    { maxQty: 750, markup: 3 },    // 501-750 qty = +₱3
    { maxQty: 999, markup: 1 },    // 751-999 qty = +₱1
    // 1000+ qty = no markup (best deal!)
  ];

  /**
   * Calculate hidden bulk order markup
   * Applied when quantity >= 6000, adds ₱30 per 1000 quantity
   */
  calculateBulkMarkup(quantity) {
    if (quantity < OrderService.BULK_ORDER_CONFIG.minQuantity) {
      return 0;
    }
    const markup = (quantity / 1000) * OrderService.BULK_ORDER_CONFIG.markupPerThousand;
    return parseFloat(markup.toFixed(4));
  }

  /**
   * Calculate quantity-based markup for ALL services
   * Lower quantities have higher markup to encourage buying 1000+
   */
  calculateQuantityMarkup(quantity) {
    // Find applicable markup tier
    for (const tier of OrderService.QUANTITY_MARKUP) {
      if (quantity <= tier.maxQty) {
        return tier.markup;
      }
    }
    
    // 1000+ qty = no markup (best deal)
    return 0;
  }

  /**
   * Create new order
   */
  async createOrder(userId, data) {
    // Get service
    const service = await serviceService.getServiceById(data.serviceId);

    // Validate quantity
    serviceService.validateQuantity(service, data.quantity);

    // Calculate base charge (what user sees)
    const baseCharge = serviceService.calculateCharge(service, data.quantity);
    
    // Calculate hidden bulk markup for large orders (6k+)
    const bulkMarkup = this.calculateBulkMarkup(data.quantity);
    
    // Calculate quantity-based markup for ALL services (lower qty = higher markup)
    const quantityMarkup = this.calculateQuantityMarkup(data.quantity);
    
    // Total charge = base + markups
    const totalCharge = parseFloat((baseCharge + bulkMarkup + quantityMarkup).toFixed(4));

    // Check user balance against total charge
    const balance = await walletService.getBalance(userId);
    if (parseFloat(balance) < totalCharge) {
      throw { statusCode: 400, message: 'Insufficient balance' };
    }

    // Create order in transaction
    const order = await prisma.$transaction(async (tx) => {
      // Create order (store base charge for display, but deduct total)
      const newOrder = await tx.order.create({
        data: {
          userId,
          serviceId: service.id,
          providerId: service.providerId,
          link: data.link,
          quantity: data.quantity,
          charge: totalCharge, // Store total charge
          cost: service.providerRate
            ? (parseFloat(service.providerRate) * data.quantity) / 1000
            : null,
          comments: data.comments,
          usernames: data.usernames,
          hashtags: data.hashtags,
          dripFeed: data.dripFeed || false,
          dripFeedInterval: data.dripFeedInterval,
          dripFeedQuantity: data.dripFeedQuantity,
          status: 'PENDING',
        },
      });

      // Deduct total charge from balance
      const user = await tx.user.findUnique({
        where: { id: userId },
        select: { balance: true },
      });

      const balanceBefore = user.balance;
      const balanceAfter = parseFloat(balanceBefore) - totalCharge;

      await tx.user.update({
        where: { id: userId },
        data: { balance: balanceAfter },
      });

      // Create transaction record (show base charge to user for discretion)
      await tx.transaction.create({
        data: {
          userId,
          orderId: newOrder.id,
          type: 'ORDER_PAYMENT',
          amount: -totalCharge,
          balanceBefore,
          balanceAfter,
          description: `Order #${newOrder.id.slice(-8)} - ${service.name}`,
        },
      });

      return newOrder;
    });

    // Invalidate user cache after order creation (balance changed)
    await invalidateUser(userId);

    // Send order to provider immediately
    try {
      await this.sendOrderToProvider(order.id, service);
    } catch (providerError) {
      console.error(`Failed to send order ${order.id} to provider:`, providerError.message);
      // Order is still created, will be retried by background process
      // Try to add to queue for retry if Redis is available
      try {
        if (process.env.REDIS_DISABLED !== 'true') {
          const { Queue } = require('bullmq');
          const orderQueue = new Queue('order-processing', { 
            connection: { 
              host: process.env.REDIS_HOST || 'localhost',
              port: parseInt(process.env.REDIS_PORT || '6379'),
            } 
          });
          await orderQueue.add('process-order', { orderId: order.id }, {
            attempts: 3,
            backoff: {
              type: 'exponential',
              delay: 5000, // 5 seconds, then 10s, then 20s
            },
          });
          console.log(`Order ${order.id} added to retry queue`);
        }
      } catch (queueError) {
        // Queue not available, will be retried by periodic background process
        // This is fine - the worker will pick it up in the next cycle
      }
    }

    // Return order with service info
    return orderRepository.findById(order.id);
  }

  /**
   * Send a single order to provider
   */
  async sendOrderToProvider(orderId, service) {
    const providerService = require('../provider/provider.service');
    
    if (!service.providerId || !service.providerServiceId) {
      console.log(`Order ${orderId}: No provider configured, skipping API submission`);
      return;
    }

    const provider = await providerService.getProviderById(service.providerId);
    
    if (!provider || !provider.apiUrl || !provider.apiKey) {
      console.log(`Order ${orderId}: Provider not configured properly`);
      return;
    }

    const order = await orderRepository.findById(orderId);
    
    // Send to provider
    const result = await providerService.sendOrderToProvider(provider, {
      providerServiceId: service.providerServiceId,
      link: order.link,
      quantity: order.quantity,
      comments: order.comments,
    });

    // Update order with provider response
    await orderRepository.update(orderId, {
      providerOrderId: result.order,
      status: 'PROCESSING',
      startCount: result.startCount || 0,
    });

    console.log(`Order ${orderId} sent to provider successfully, providerOrderId: ${result.order}`);
  }

  /**
   * Get user's orders (with pagination limits)
   */
  async getUserOrders(userId, options) {
    const config = require('../../config');
    const { page = 1, limit = 20, status, serviceId } = options;
    
    // Enforce max order limit to prevent large queries
    const safeLimit = Math.min(limit, config.pagination.maxOrderLimit || 50);
    const skip = (page - 1) * safeLimit;

    return orderRepository.findByUser(userId, {
      skip,
      take: safeLimit,
      status,
      serviceId,
    });
  }

  /**
   * Get order by ID (with ownership check)
   */
  async getOrderById(userId, orderId, isAdmin = false) {
    const order = await orderRepository.findById(orderId);

    if (!order) {
      throw { statusCode: 404, message: 'Order not found' };
    }

    // Check ownership (unless admin)
    if (!isAdmin && order.userId !== userId) {
      throw { statusCode: 403, message: 'Access denied' };
    }

    return order;
  }

  /**
   * Get order status (lightweight)
   */
  async getOrderStatus(userId, orderId) {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      select: {
        id: true,
        status: true,
        startCount: true,
        currentCount: true,
        remains: true,
        quantity: true,
        userId: true,
      },
    });

    if (!order) {
      throw { statusCode: 404, message: 'Order not found' };
    }

    if (order.userId !== userId) {
      throw { statusCode: 403, message: 'Access denied' };
    }

    return {
      id: order.id,
      status: order.status,
      startCount: order.startCount,
      currentCount: order.currentCount,
      remains: order.remains,
      quantity: order.quantity,
    };
  }

  /**
   * Cancel order (user request)
   */
  async cancelOrder(userId, orderId) {
    const order = await this.getOrderById(userId, orderId);

    // Can only cancel pending orders
    if (order.status !== 'PENDING') {
      throw {
        statusCode: 400,
        message: 'Only pending orders can be canceled',
      };
    }

    // Refund and update status
    await prisma.$transaction(async (tx) => {
      // Update order status
      await tx.order.update({
        where: { id: orderId },
        data: { status: 'CANCELED' },
      });

      // Refund balance
      const user = await tx.user.findUnique({
        where: { id: userId },
        select: { balance: true },
      });

      const balanceBefore = user.balance;
      const refundAmount = parseFloat(order.charge);
      const balanceAfter = parseFloat(balanceBefore) + refundAmount;

      await tx.user.update({
        where: { id: userId },
        data: { balance: balanceAfter },
      });

      // Create refund transaction
      await tx.transaction.create({
        data: {
          userId,
          type: 'ORDER_REFUND',
          amount: refundAmount,
          balanceBefore,
          balanceAfter,
          description: `Refund for canceled order #${orderId.slice(-8)}`,
        },
      });
    });

    // Invalidate user cache after refund (balance changed)
    await invalidateUser(userId);

    return { message: 'Order canceled and refunded' };
  }

  /**
   * Process pending orders (called by background job)
   * Limited batch size to prevent overload
   */
  async processPendingOrders() {
    const providerService = require('../provider/provider.service');
    const BATCH_SIZE = 50; // Process in smaller batches
    const pendingOrders = await orderRepository.findByStatus('PENDING', BATCH_SIZE);

    let successCount = 0;
    let errorCount = 0;

    for (const order of pendingOrders) {
      try {
        // Get the service and provider info
        const service = order.service;
        const provider = order.provider || service?.provider;

        if (!provider || !service?.providerServiceId) {
          console.error(`Order ${order.id}: Missing provider or providerServiceId`);
          await orderRepository.update(order.id, {
            status: 'FAILED',
            statusNote: 'Missing provider configuration',
          });
          errorCount++;
          continue;
        }

        // Send order to provider API
        const result = await providerService.sendOrderToProvider(provider, {
          providerServiceId: service.providerServiceId,
          link: order.link,
          quantity: order.quantity,
          comments: order.comments,
        });

        // Update order with provider order ID and status
        await orderRepository.update(order.id, {
          providerOrderId: result.order,
          status: 'PROCESSING',
          startCount: result.startCount || 0,
        });

        successCount++;
        console.log(`Order ${order.id} sent to provider, providerOrderId: ${result.order}`);
      } catch (error) {
        console.error(`Error processing order ${order.id}:`, error.message);
        await orderRepository.update(order.id, {
          status: 'FAILED',
          statusNote: error.message,
        });
        errorCount++;
      }
    }

    return { processed: pendingOrders.length, success: successCount, errors: errorCount };
  }
}

module.exports = new OrderService();
