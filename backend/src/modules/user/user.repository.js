/**
 * User Repository
 * 
 * Data access layer for user operations.
 */

const { prisma } = require('../../config/database');

class UserRepository {
  /**
   * Find user by ID
   */
  async findById(id, includePassword = false) {
    return prisma.user.findUnique({
      where: { id },
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
        password: includePassword,
      },
    });
  }

  /**
   * Find user by email
   */
  async findByEmail(email) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  /**
   * Find user by username
   */
  async findByUsername(username) {
    return prisma.user.findUnique({
      where: { username },
    });
  }

  /**
   * Update user
   */
  async update(id, data) {
    return prisma.user.update({
      where: { id },
      data,
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
      },
    });
  }

  /**
   * Get user balance
   */
  async getBalance(userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { balance: true },
    });
    return user?.balance || 0;
  }

  /**
   * Update user balance
   */
  async updateBalance(userId, newBalance) {
    return prisma.user.update({
      where: { id: userId },
      data: { balance: newBalance },
    });
  }

  /**
   * Get user dashboard stats
   */
  async getDashboardStats(userId) {
    const [
      user,
      totalOrders,
      pendingOrders,
      completedOrders,
      totalSpent,
      recentOrders,
    ] = await Promise.all([
      prisma.user.findUnique({
        where: { id: userId },
        select: { balance: true },
      }),
      prisma.order.count({ where: { userId } }),
      prisma.order.count({
        where: { userId, status: { in: ['PENDING', 'PROCESSING', 'IN_PROGRESS'] } },
      }),
      prisma.order.count({ where: { userId, status: 'COMPLETED' } }),
      prisma.order.aggregate({
        where: { userId },
        _sum: { charge: true },
      }),
      prisma.order.findMany({
        where: { userId },
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          service: {
            select: { name: true, platform: true },
          },
        },
      }),
    ]);

    return {
      balance: user?.balance || 0,
      orders: {
        total: totalOrders,
        pending: pendingOrders,
        completed: completedOrders,
      },
      totalSpent: totalSpent._sum.charge || 0,
      recentOrders,
    };
  }

  /**
   * Delete user
   */
  async delete(id) {
    return prisma.user.delete({
      where: { id },
    });
  }
}

module.exports = new UserRepository();
