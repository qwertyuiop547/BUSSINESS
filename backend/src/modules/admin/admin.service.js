/**
 * Admin Service
 * 
 * Business logic for admin operations.
 */

const { prisma } = require('../../config/database');
const walletService = require('../wallet/wallet.service');
const notificationService = require('../notification/notification.service');
const { clearMaintenanceCache } = require('../../middleware/maintenance');

class AdminService {
  // ==================== DASHBOARD ====================

  /**
   * Get dashboard metrics
   */
  async getDashboardMetrics() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const thisWeek = new Date();
    thisWeek.setDate(thisWeek.getDate() - 7);

    const thisMonth = new Date();
    thisMonth.setDate(1);
    thisMonth.setHours(0, 0, 0, 0);

    const [
      totalUsers,
      newUsersToday,
      activeUsers,
      bannedUsers,
      totalOrders,
      ordersToday,
      pendingOrders,
      processingOrders,
      revenueToday,
      revenueWeek,
      revenueMonth,
      revenueTotal,
      pendingTopUps,
      pendingTopUpsAmount,
      openTickets,
      urgentTickets,
      totalApiKeys,
      activeApiKeys,
      totalApiRequests,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { createdAt: { gte: today } } }),
      prisma.user.count({ where: { status: 'ACTIVE' } }),
      prisma.user.count({ where: { status: 'BANNED' } }),
      prisma.order.count(),
      prisma.order.count({ where: { createdAt: { gte: today } } }),
      prisma.order.count({ where: { status: 'PENDING' } }),
      prisma.order.count({ where: { status: { in: ['PROCESSING', 'IN_PROGRESS'] } } }),
      prisma.order.aggregate({
        where: { createdAt: { gte: today } },
        _sum: { charge: true },
      }),
      prisma.order.aggregate({
        where: { createdAt: { gte: thisWeek } },
        _sum: { charge: true },
      }),
      prisma.order.aggregate({
        where: { createdAt: { gte: thisMonth } },
        _sum: { charge: true },
      }),
      prisma.order.aggregate({ _sum: { charge: true } }),
      prisma.topUpRequest.count({ where: { status: 'PENDING' } }),
      prisma.topUpRequest.aggregate({
        where: { status: 'PENDING' },
        _sum: { amount: true },
      }),
      prisma.ticket.count({ where: { status: { not: 'CLOSED' } } }),
      prisma.ticket.count({ where: { status: { not: 'CLOSED' }, priority: 'URGENT' } }),
      prisma.apiKey.count(),
      prisma.apiKey.count({ where: { isActive: true } }),
      prisma.apiKey.aggregate({ _sum: { requestCount: true } }),
    ]);

    return {
      users: {
        total: totalUsers,
        newToday: newUsersToday,
        active: activeUsers,
        banned: bannedUsers,
      },
      orders: {
        total: totalOrders,
        today: ordersToday,
        pending: pendingOrders,
        processing: processingOrders,
      },
      revenue: {
        today: revenueToday._sum.charge || 0,
        thisWeek: revenueWeek._sum.charge || 0,
        thisMonth: revenueMonth._sum.charge || 0,
        total: revenueTotal._sum.charge || 0,
      },
      topups: {
        pending: pendingTopUps,
        pendingAmount: pendingTopUpsAmount._sum.amount || 0,
      },
      tickets: {
        open: openTickets,
        urgent: urgentTickets,
      },
      apiKeys: {
        total: totalApiKeys,
        active: activeApiKeys,
        totalRequests: Number(totalApiRequests._sum.requestCount || 0),
      },
    };
  }

  // ==================== USERS ====================

  /**
   * Get all users
   */
  async getUsers(options) {
    const { page = 1, limit = 20, status, role, search } = options;
    const skip = (page - 1) * limit;

    const where = {};
    if (status) where.status = status;
    if (role) where.role = role;
    if (search) {
      where.OR = [
        { email: { contains: search, mode: 'insensitive' } },
        { username: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [data, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          email: true,
          username: true,
          role: true,
          status: true,
          balance: true,
          createdAt: true,
          lastLoginAt: true,
          _count: { select: { orders: true } },
        },
      }),
      prisma.user.count({ where }),
    ]);

    return { data, total };
  }

  /**
   * Get user by ID (admin view) - Comprehensive user details
   */
  async getUserById(userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        status: true,
        balance: true,
        profilePicture: true,
        createdAt: true,
        updatedAt: true,
        lastLoginAt: true,
        _count: {
          select: { 
            orders: true, 
            transactions: true, 
            tickets: true,
            topUpRequests: true,
            apiKeys: true,
          },
        },
        // Recent orders (last 10)
        orders: {
          take: 10,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            serviceId: true,
            quantity: true,
            charge: true,
            status: true,
            createdAt: true,
            service: {
              select: {
                id: true,
                name: true,
                platform: true,
              },
            },
          },
        },
        // Recent transactions (last 10)
        transactions: {
          take: 10,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            type: true,
            amount: true,
            description: true,
            createdAt: true,
            order: {
              select: { id: true },
            },
            topUp: {
              select: { id: true, paymentMethod: true },
            },
          },
        },
        // Recent top-up requests (last 10)
        topUpRequests: {
          take: 10,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            amount: true,
            paymentMethod: true,
            status: true,
            createdAt: true,
            adminNote: true,
          },
        },
        // API keys
        apiKeys: {
          select: {
            id: true,
            name: true,
            key: true,
            lastUsedAt: true,
            createdAt: true,
            isActive: true,
          },
        },
        // Recent tickets (last 5)
        tickets: {
          take: 5,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            subject: true,
            status: true,
            priority: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    if (!user) {
      throw { statusCode: 404, message: 'User not found' };
    }

    return user;
  }

  /**
   * Update user (admin)
   */
  async updateUser(userId, data) {
    await this.getUserById(userId);
    return prisma.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        status: true,
        balance: true,
      },
    });
  }

  /**
   * Ban user
   */
  async banUser(userId, adminId) {
    const user = await this.getUserById(userId);

    if (user.role === 'ADMIN') {
      throw { statusCode: 400, message: 'Cannot ban admin users' };
    }

    await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: { status: 'BANNED' },
      }),
      prisma.adminLog.create({
        data: {
          adminId,
          action: 'USER_BAN',
          targetType: 'User',
          targetId: userId,
          details: { email: user.email },
        },
      }),
    ]);

    return { message: 'User banned' };
  }

  /**
   * Unban user
   */
  async unbanUser(userId, adminId) {
    const user = await this.getUserById(userId);

    await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: { status: 'ACTIVE' },
      }),
      prisma.adminLog.create({
        data: {
          adminId,
          action: 'USER_UNBAN',
          targetType: 'User',
          targetId: userId,
          details: { email: user.email },
        },
      }),
    ]);

    return { message: 'User unbanned' };
  }

  /**
   * Adjust user balance
   */
  async adjustBalance(userId, amount, description, adminId) {
    await this.getUserById(userId);

    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { id: userId },
        select: { balance: true },
      });

      const balanceBefore = user.balance;
      const balanceAfter = parseFloat(balanceBefore) + parseFloat(amount);

      if (balanceAfter < 0) {
        throw { statusCode: 400, message: 'Balance cannot go negative' };
      }

      await tx.user.update({
        where: { id: userId },
        data: { balance: balanceAfter },
      });

      const transaction = await tx.transaction.create({
        data: {
          userId,
          type: 'ADMIN_ADJUST',
          amount,
          balanceBefore,
          balanceAfter,
          description,
        },
      });

      await tx.adminLog.create({
        data: {
          adminId,
          action: 'USER_BALANCE_ADJUST',
          targetType: 'User',
          targetId: userId,
          details: { amount, description, balanceAfter },
        },
      });

      return { transaction, balanceAfter };
    });

    return result;
  }

  // ==================== TOP-UPS ====================

  /**
   * Get all top-ups
   */
  async getTopUps(options) {
    const { page = 1, limit = 20, status, userId } = options;
    const skip = (page - 1) * limit;

    const where = {};
    if (status) where.status = status;
    if (userId) where.userId = userId;

    const [data, total] = await Promise.all([
      prisma.topUpRequest.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: { id: true, email: true, username: true },
          },
        },
      }),
      prisma.topUpRequest.count({ where }),
    ]);

    return { data, total };
  }

  /**
   * Approve top-up
   */
  async approveTopUp(topUpId, adminId, adminNote = null) {
    const topUp = await prisma.topUpRequest.findUnique({
      where: { id: topUpId },
      include: { user: true },
    });

    if (!topUp) {
      throw { statusCode: 404, message: 'Top-up request not found' };
    }

    if (topUp.status !== 'PENDING') {
      throw { statusCode: 400, message: 'Top-up has already been processed' };
    }

    await prisma.$transaction(async (tx) => {
      // Update top-up status
      await tx.topUpRequest.update({
        where: { id: topUpId },
        data: {
          status: 'APPROVED',
          reviewedBy: adminId,
          reviewedAt: new Date(),
          adminNote,
        },
      });

      // Add balance
      const user = await tx.user.findUnique({
        where: { id: topUp.userId },
        select: { balance: true },
      });

      const balanceBefore = user.balance;
      const balanceAfter = parseFloat(balanceBefore) + parseFloat(topUp.amount);

      await tx.user.update({
        where: { id: topUp.userId },
        data: { balance: balanceAfter },
      });

      // Create transaction
      await tx.transaction.create({
        data: {
          userId: topUp.userId,
          topUpId: topUpId,
          type: 'TOP_UP',
          amount: topUp.amount,
          balanceBefore,
          balanceAfter,
          description: `Top-up via ${topUp.paymentMethod}${topUp.referenceNumber ? ` - Ref: ${topUp.referenceNumber}` : ''}`,
        },
      });

      // Log
      await tx.adminLog.create({
        data: {
          adminId,
          action: 'TOPUP_APPROVE',
          targetType: 'TopUpRequest',
          targetId: topUpId,
          details: { amount: topUp.amount, userId: topUp.userId },
        },
      });
    });

    // Send notification
    try {
      await notificationService.createNotification({
        userId: topUp.userId,
        type: 'WALLET_TOPUP',
        title: 'Top-up Approved',
        message: `Your top-up of ${topUp.amount} via ${topUp.paymentMethod} has been approved.`,
        link: '/wallet',
      });
    } catch (error) {
      console.error('Failed to send top-up approval notification:', error);
    }

    return { message: 'Top-up approved' };
  }

  /**
   * Reject top-up
   */
  async rejectTopUp(topUpId, adminId, adminNote = null) {
    const topUp = await prisma.topUpRequest.findUnique({
      where: { id: topUpId },
    });

    if (!topUp) {
      throw { statusCode: 404, message: 'Top-up request not found' };
    }

    if (topUp.status !== 'PENDING') {
      throw { statusCode: 400, message: 'Top-up has already been processed' };
    }

    await prisma.$transaction([
      prisma.topUpRequest.update({
        where: { id: topUpId },
        data: {
          status: 'REJECTED',
          reviewedBy: adminId,
          reviewedAt: new Date(),
          adminNote,
        },
      }),
      prisma.adminLog.create({
        data: {
          adminId,
          action: 'TOPUP_REJECT',
          targetType: 'TopUpRequest',
          targetId: topUpId,
          details: { amount: topUp.amount, reason: adminNote },
        },
      }),
    ]);

    // Send notification
    try {
      await notificationService.createNotification({
        userId: topUp.userId,
        type: 'WALLET_TOPUP',
        title: 'Top-up Rejected',
        message: `Your top-up of ${topUp.amount} has been rejected.${adminNote ? ` Reason: ${adminNote}` : ''}`,
        link: '/wallet',
      });
    } catch (error) {
      console.error('Failed to send top-up rejection notification:', error);
    }

    return { message: 'Top-up rejected' };
  }

  // ==================== ORDERS ====================

  /**
   * Get all orders
   */
  async getOrders(options) {
    const { page = 1, limit = 20, status, userId, serviceId } = options;
    const skip = (page - 1) * limit;

    const where = {};
    if (status) where.status = status;
    if (userId) where.userId = userId;
    if (serviceId) where.serviceId = serviceId;

    const [data, total] = await Promise.all([
      prisma.order.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: { id: true, email: true, username: true },
          },
          service: {
            select: { id: true, name: true, platform: true },
          },
        },
      }),
      prisma.order.count({ where }),
    ]);

    return { data, total };
  }

  /**
   * Update order (admin)
   */
  async updateOrder(orderId, data, adminId) {
    const order = await prisma.order.findUnique({ where: { id: orderId } });

    if (!order) {
      throw { statusCode: 404, message: 'Order not found' };
    }

    const updated = await prisma.$transaction(async (tx) => {
      const updatedOrder = await tx.order.update({
        where: { id: orderId },
        data: {
          ...data,
          ...(data.status === 'COMPLETED' ? { completedAt: new Date() } : {}),
        },
        include: {
          service: { select: { name: true } },
        },
      });

      await tx.adminLog.create({
        data: {
          adminId,
          action: 'ORDER_UPDATE',
          targetType: 'Order',
          targetId: orderId,
          details: { changes: data },
        },
      });

      return updatedOrder;
    });

    return updated;
  }

  /**
   * Refund order
   */
  async refundOrder(orderId, amount, reason, adminId) {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { user: true },
    });

    if (!order) {
      throw { statusCode: 404, message: 'Order not found' };
    }

    if (order.status === 'REFUNDED') {
      throw { statusCode: 400, message: 'Order already refunded' };
    }

    // If no amount specified, refund full charge
    const refundAmount = amount || parseFloat(order.charge);

    await prisma.$transaction(async (tx) => {
      // Update order status
      await tx.order.update({
        where: { id: orderId },
        data: {
          status: 'REFUNDED',
          statusNote: reason,
        },
      });

      // Refund balance
      const user = await tx.user.findUnique({
        where: { id: order.userId },
        select: { balance: true },
      });

      const balanceBefore = user.balance;
      const balanceAfter = parseFloat(balanceBefore) + refundAmount;

      await tx.user.update({
        where: { id: order.userId },
        data: { balance: balanceAfter },
      });

      // Create refund transaction
      await tx.transaction.create({
        data: {
          userId: order.userId,
          type: 'ORDER_REFUND',
          amount: refundAmount,
          balanceBefore,
          balanceAfter,
          description: `Refund for order #${orderId.slice(-8)} - ${reason}`,
        },
      });

      // Log
      await tx.adminLog.create({
        data: {
          adminId,
          action: 'ORDER_REFUND',
          targetType: 'Order',
          targetId: orderId,
          details: { amount: refundAmount, reason },
        },
      });
    });

    // Send notification
    try {
      await notificationService.createNotification({
        userId: order.userId,
        type: 'ORDER_STATUS',
        title: 'Order Refunded',
        message: `Your order #${orderId.slice(-8)} has been refunded. Amount: ${refundAmount}. Reason: ${reason || 'N/A'}`,
        link: `/orders?id=${orderId}`,
      });
    } catch (error) {
      console.error('Failed to send order refund notification:', error);
    }

    return { message: 'Order refunded', amount: refundAmount };
  }

  // ==================== SERVICES & CATEGORIES ====================

  /**
   * Get all services (admin - includes inactive)
   */
  async getServices(options) {
    const { page = 1, limit = 50 } = options;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      prisma.service.findMany({
        skip,
        take: limit,
        orderBy: [{ category: { sortOrder: 'asc' } }, { sortOrder: 'asc' }],
        include: {
          category: { select: { id: true, name: true, slug: true } },
          provider: { select: { id: true, name: true, status: true } },
          _count: { select: { orders: true } },
        },
      }),
      prisma.service.count(),
    ]);

    return { data, total };
  }

  /**
   * Create service
   */
  async createService(data, adminId) {
    const service = await prisma.$transaction(async (tx) => {
      const newService = await tx.service.create({
        data,
        include: {
          category: { select: { id: true, name: true } },
        },
      });

      await tx.adminLog.create({
        data: {
          adminId,
          action: 'SERVICE_CREATE',
          targetType: 'Service',
          targetId: newService.id,
          details: { name: data.name },
        },
      });

      return newService;
    });

    return service;
  }

  /**
   * Update service
   */
  async updateService(serviceId, data, adminId) {
    const service = await prisma.service.findUnique({ where: { id: serviceId } });

    if (!service) {
      throw { statusCode: 404, message: 'Service not found' };
    }

    const updated = await prisma.$transaction(async (tx) => {
      const updatedService = await tx.service.update({
        where: { id: serviceId },
        data,
        include: {
          category: { select: { id: true, name: true } },
        },
      });

      await tx.adminLog.create({
        data: {
          adminId,
          action: 'SERVICE_UPDATE',
          targetType: 'Service',
          targetId: serviceId,
          details: { changes: data },
        },
      });

      return updatedService;
    });

    return updated;
  }

  /**
   * Delete service
   */
  async deleteService(serviceId, adminId) {
    const service = await prisma.service.findUnique({ where: { id: serviceId } });

    if (!service) {
      throw { statusCode: 404, message: 'Service not found' };
    }

    // Check if service has orders
    const orderCount = await prisma.order.count({ where: { serviceId } });
    if (orderCount > 0) {
      throw { statusCode: 400, message: 'Cannot delete service with existing orders. Deactivate it instead.' };
    }

    await prisma.$transaction([
      prisma.service.delete({ where: { id: serviceId } }),
      prisma.adminLog.create({
        data: {
          adminId,
          action: 'SERVICE_DELETE',
          targetType: 'Service',
          targetId: serviceId,
          details: { name: service.name },
        },
      }),
    ]);

    return { message: 'Service deleted' };
  }

  /**
   * Get all categories (admin)
   */
  async getCategories() {
    return prisma.category.findMany({
      orderBy: { sortOrder: 'asc' },
      include: {
        _count: { select: { services: true } },
      },
    });
  }

  /**
   * Create category
   */
  async createCategory(data) {
    return prisma.category.create({ data });
  }

  /**
   * Update category
   */
  async updateCategory(categoryId, data) {
    const category = await prisma.category.findUnique({ where: { id: categoryId } });

    if (!category) {
      throw { statusCode: 404, message: 'Category not found' };
    }

    return prisma.category.update({
      where: { id: categoryId },
      data,
    });
  }

  /**
   * Delete category
   */
  async deleteCategory(categoryId) {
    const category = await prisma.category.findUnique({ where: { id: categoryId } });

    if (!category) {
      throw { statusCode: 404, message: 'Category not found' };
    }

    // Check if category has services
    const serviceCount = await prisma.service.count({ where: { categoryId } });
    if (serviceCount > 0) {
      throw { statusCode: 400, message: 'Cannot delete category with existing services' };
    }

    await prisma.category.delete({ where: { id: categoryId } });
    return { message: 'Category deleted' };
  }

  // ==================== LOGS ====================

  /**
   * Get admin logs
   */
  async getLogs(options) {
    const { page = 1, limit = 50, action, adminId } = options;
    const skip = (page - 1) * limit;

    const where = {};
    if (action) where.action = action;
    if (adminId) where.adminId = adminId;

    const [data, total] = await Promise.all([
      prisma.adminLog.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          admin: {
            select: { id: true, email: true, username: true },
          },
        },
      }),
      prisma.adminLog.count({ where }),
    ]);

    return { data, total };
  }

  // ==================== SETTINGS ====================

  /**
   * Get all settings
   */
  async getSettings() {
    const settings = await prisma.setting.findMany({
      orderBy: { key: 'asc' },
    });

    // Convert to key-value object
    const result = {};
    for (const setting of settings) {
      result[setting.key] = setting.value;
    }

    return result;
  }

  /**
   * Get a single setting by key
   */
  async getSetting(key) {
    const setting = await prisma.setting.findUnique({
      where: { key },
    });

    if (!setting) {
      throw { statusCode: 404, message: 'Setting not found' };
    }

    return setting.value;
  }

  /**
   * Update a setting (create if doesn't exist)
   */
  async updateSetting(key, value, adminId) {
    let processedValue = value;
    
    // Special handling for maintenance mode to support expiry
    if (key === 'maintenanceMode') {
      if (typeof value === 'object' && value !== null) {
        // Ensure the value has the correct structure
        processedValue = {
          enabled: Boolean(value.enabled),
          expiry: value.expiry || null,
          reason: value.reason || null
        };
      } else if (typeof value === 'boolean') {
        // Convert legacy boolean to new format
        processedValue = {
          enabled: value,
          expiry: null,
          reason: null
        };
      }
      
      // Clear maintenance cache when updating maintenance mode
      clearMaintenanceCache();
    }
    
    const setting = await prisma.setting.upsert({
      where: { key },
      update: {
        value: processedValue,
        updatedAt: new Date(),
      },
      create: {
        key,
        value: processedValue,
      },
    });

    // Log the change
    await prisma.adminLog.create({
      data: {
        adminId,
        action: 'SETTINGS_UPDATE',
        targetType: 'Setting',
        targetId: key,
        details: { key, value: processedValue },
      },
    });

    return setting.value;
  }

  /**
   * Update multiple settings at once
   */
  async updateSettings(settings, adminId) {
    const updates = Object.entries(settings).map(([key, value]) => {
      let processedValue = value;
      
      // Special handling for maintenance mode to support expiry
      if (key === 'maintenanceMode') {
        if (typeof value === 'object' && value !== null) {
          // Ensure the value has the correct structure
          processedValue = {
            enabled: Boolean(value.enabled),
            expiry: value.expiry || null,
            reason: value.reason || null
          };
        } else if (typeof value === 'boolean') {
          // Convert legacy boolean to new format
          processedValue = {
            enabled: value,
            expiry: null,
            reason: null
          };
        }
      }
      
      return prisma.setting.upsert({
        where: { key },
        update: { value: processedValue, updatedAt: new Date() },
        create: { key, value: processedValue },
      });
    });

    await Promise.all(updates);

    // Clear maintenance cache if maintenanceMode was updated
    if ('maintenanceMode' in settings) {
      clearMaintenanceCache();
    }

    // Log the change
    await prisma.adminLog.create({
      data: {
        adminId,
        action: 'SETTINGS_UPDATE',
        targetType: 'Settings',
        targetId: 'bulk',
        details: settings,
      },
    });

    return this.getSettings();
  }
}

module.exports = new AdminService();
