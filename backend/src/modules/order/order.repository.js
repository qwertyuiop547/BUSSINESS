/**
 * Order Repository
 * 
 * Data access layer for orders.
 */

const { prisma } = require('../../config/database');

class OrderRepository {
  /**
   * Create order
   */
  async create(data) {
    return prisma.order.create({
      data,
      include: {
        service: {
          select: {
            id: true,
            name: true,
            platform: true,
            type: true,
          },
        },
      },
    });
  }

  /**
   * Get order by ID
   */
  async findById(id) {
    return prisma.order.findUnique({
      where: { id },
      include: {
        service: {
          select: {
            id: true,
            name: true,
            platform: true,
            type: true,
            rate: true,
          },
        },
        user: {
          select: {
            id: true,
            email: true,
            username: true,
          },
        },
        transaction: {
          select: {
            id: true,
            amount: true,
            createdAt: true,
          },
        },
      },
    });
  }

  /**
   * Get user's orders
   */
  async findByUser(userId, { skip, take, status, serviceId }) {
    const where = { userId };
    if (status) {
      where.status = status;
    }
    if (serviceId) {
      where.serviceId = serviceId;
    }

    const [data, total] = await Promise.all([
      prisma.order.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: {
          service: {
            select: {
              id: true,
              name: true,
              platform: true,
              type: true,
            },
          },
        },
      }),
      prisma.order.count({ where }),
    ]);

    return { data, total };
  }

  /**
   * Update order
   */
  async update(id, data) {
    return prisma.order.update({
      where: { id },
      data,
      include: {
        service: {
          select: {
            id: true,
            name: true,
            platform: true,
            type: true,
          },
        },
      },
    });
  }

  /**
   * Get orders by status (for background processing)
   */
  async findByStatus(status, limit = 100) {
    return prisma.order.findMany({
      where: { status },
      take: limit,
      orderBy: { createdAt: 'asc' },
      include: {
        service: {
          include: {
            provider: true,
          },
        },
        user: {
          select: { id: true, email: true },
        },
      },
    });
  }

  /**
   * Get pending orders for a provider
   */
  async findPendingByProvider(providerId) {
    return prisma.order.findMany({
      where: {
        providerId,
        status: { in: ['PENDING', 'PROCESSING', 'IN_PROGRESS'] },
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  /**
   * Count orders by status
   */
  async countByStatus(userId = null) {
    const where = userId ? { userId } : {};
    
    const counts = await prisma.order.groupBy({
      by: ['status'],
      where,
      _count: true,
    });

    const result = {};
    counts.forEach((c) => {
      result[c.status] = c._count;
    });
    return result;
  }
}

module.exports = new OrderRepository();
