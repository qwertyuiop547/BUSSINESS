/**
 * External API Service
 * 
 * Business logic for external/reseller API endpoints.
 * Follows standard SMM panel API format for compatibility.
 */

const { prisma } = require('../../config/database');
const orderService = require('../order/order.service');

class ExternalApiService {
  /**
   * Get account balance
   */
  async getBalance(userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { balance: true },
    });

    if (!user) {
      throw { statusCode: 404, message: 'User not found' };
    }

    return {
      balance: user.balance.toString(),
      currency: 'USD',
    };
  }

  /**
   * Get all services
   */
  async getServices() {
    const services = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: [{ category: { sortOrder: 'asc' } }, { sortOrder: 'asc' }],
      select: {
        id: true,
        name: true,
        type: true,
        rate: true,
        minQuantity: true,
        maxQuantity: true,
        isDripFeed: true,
        isRefill: true,
        category: {
          select: { name: true },
        },
      },
    });

    // Return in standard SMM API format
    return services.map((s, index) => ({
      service: index + 1, // Sequential service ID for external API
      serviceId: s.id, // Internal service UUID
      name: s.name,
      type: s.type,
      rate: s.rate.toString(),
      min: s.minQuantity,
      max: s.maxQuantity,
      dripfeed: s.isDripFeed,
      refill: s.isRefill,
      category: s.category.name,
    }));
  }

  /**
   * Add new order
   */
  async addOrder(userId, serviceNumber, link, quantity) {
    // Get service by sequential number (for external API compatibility)
    const services = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: [{ category: { sortOrder: 'asc' } }, { sortOrder: 'asc' }],
      select: {
        id: true,
        name: true,
        rate: true,
        minQuantity: true,
        maxQuantity: true,
      },
    });

    const service = services[serviceNumber - 1];

    if (!service) {
      return { error: 'Invalid service' };
    }

    // Validate quantity
    if (quantity < service.minQuantity) {
      return { error: `Minimum quantity is ${service.minQuantity}` };
    }

    if (quantity > service.maxQuantity) {
      return { error: `Maximum quantity is ${service.maxQuantity}` };
    }

    try {
      // Use order service to create order
      const order = await orderService.createOrder(userId, {
        serviceId: service.id,
        link,
        quantity,
      });

      // Return external order number (sequential)
      const orderCount = await prisma.order.count({
        where: { userId },
      });

      return { order: orderCount };
    } catch (error) {
      return { error: error.message || 'Failed to create order' };
    }
  }

  /**
   * Get order status
   */
  async getOrderStatus(userId, orderNumber) {
    // Get user's orders and find by sequential number
    const orders = await prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
      select: {
        id: true,
        status: true,
        charge: true,
        startCount: true,
        quantity: true,
        remains: true,
      },
    });

    const order = orders[orderNumber - 1];

    if (!order) {
      return { error: 'Invalid order' };
    }

    return {
      charge: order.charge.toString(),
      start_count: order.startCount?.toString() || '0',
      status: this.mapStatus(order.status),
      remains: order.remains?.toString() || order.quantity.toString(),
    };
  }

  /**
   * Get multiple order statuses
   */
  async getMultipleOrderStatus(userId, orderNumbers) {
    const orders = await prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
      select: {
        id: true,
        status: true,
        charge: true,
        startCount: true,
        quantity: true,
        remains: true,
      },
    });

    const result = {};

    for (const num of orderNumbers) {
      const order = orders[num - 1];
      if (order) {
        result[num] = {
          charge: order.charge.toString(),
          start_count: order.startCount?.toString() || '0',
          status: this.mapStatus(order.status),
          remains: order.remains?.toString() || order.quantity.toString(),
        };
      } else {
        result[num] = { error: 'Invalid order' };
      }
    }

    return result;
  }

  /**
   * Create refill request
   */
  async createRefill(userId, orderNumber) {
    const orders = await prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
      include: {
        service: {
          select: { isRefill: true },
        },
      },
    });

    const order = orders[orderNumber - 1];

    if (!order) {
      return { error: 'Invalid order' };
    }

    if (!order.service.isRefill) {
      return { error: 'Order does not support refill' };
    }

    if (order.status !== 'COMPLETED') {
      return { error: 'Order must be completed to request refill' };
    }

    // Create refill request (stored as metadata in the order)
    await prisma.order.update({
      where: { id: order.id },
      data: {
        refillRequested: true,
        refillRequestedAt: new Date(),
      },
    });

    return {
      refill: orderNumber,
      status: 'Pending',
    };
  }

  /**
   * Get refill status
   */
  async getRefillStatus(userId, orderNumber) {
    const orders = await prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
    });

    const order = orders[orderNumber - 1];

    if (!order || !order.refillRequested) {
      return { error: 'Invalid refill' };
    }

    return {
      status: order.refillCompleted ? 'Completed' : 'Pending',
    };
  }

  /**
   * Cancel orders
   */
  async cancelOrders(userId, orderNumbers) {
    const orders = await prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
    });

    const results = {};

    for (const num of orderNumbers) {
      const order = orders[num - 1];

      if (!order) {
        results[num] = { error: 'Invalid order' };
        continue;
      }

      if (!['PENDING', 'PROCESSING'].includes(order.status)) {
        results[num] = { error: 'Cannot cancel order' };
        continue;
      }

      try {
        await prisma.$transaction(async (tx) => {
          // Cancel order
          await tx.order.update({
            where: { id: order.id },
            data: { status: 'CANCELED' },
          });

          // Refund balance
          const user = await tx.user.findUnique({
            where: { id: userId },
            select: { balance: true },
          });

          const balanceBefore = user.balance;
          const balanceAfter = parseFloat(balanceBefore) + parseFloat(order.charge);

          await tx.user.update({
            where: { id: userId },
            data: { balance: balanceAfter },
          });

          await tx.transaction.create({
            data: {
              userId,
              type: 'ORDER_REFUND',
              amount: parseFloat(order.charge),
              balanceBefore,
              balanceAfter,
              description: `Order cancellation refund`,
            },
          });
        });

        results[num] = { cancel: { status: 'Canceled' } };
      } catch (error) {
        results[num] = { error: 'Failed to cancel' };
      }
    }

    return results;
  }

  /**
   * Map internal status to external API status
   */
  mapStatus(status) {
    const statusMap = {
      PENDING: 'Pending',
      PROCESSING: 'Processing',
      IN_PROGRESS: 'In progress',
      COMPLETED: 'Completed',
      PARTIAL: 'Partial',
      FAILED: 'Failed',
      CANCELED: 'Canceled',
      REFUNDED: 'Refunded',
    };
    return statusMap[status] || status;
  }
}

module.exports = new ExternalApiService();
