/**
 * Wallet Repository
 * 
 * Data access layer for wallet operations.
 */

const { prisma } = require('../../config/database');

class WalletRepository {
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
   * Create top-up request
   */
  async createTopUpRequest(data) {
    return prisma.topUpRequest.create({
      data,
    });
  }

  /**
   * Get top-up request by ID
   */
  async getTopUpById(id) {
    return prisma.topUpRequest.findUnique({
      where: { id },
      include: {
        user: {
          select: { id: true, email: true, username: true },
        },
        transaction: true,
      },
    });
  }

  /**
   * Get user's top-up requests
   */
  async getUserTopUps(userId, { skip, take, status }) {
    const where = { userId };
    if (status) {
      where.status = status;
    }

    const [data, total] = await Promise.all([
      prisma.topUpRequest.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.topUpRequest.count({ where }),
    ]);

    return { data, total };
  }

  /**
   * Create transaction
   */
  async createTransaction(data) {
    return prisma.transaction.create({
      data,
    });
  }

  /**
   * Get transaction by ID
   */
  async getTransactionById(id) {
    return prisma.transaction.findUnique({
      where: { id },
      include: {
        order: {
          select: { id: true, link: true, quantity: true },
        },
        topUp: {
          select: { id: true, paymentMethod: true },
        },
      },
    });
  }

  /**
   * Get user's transactions
   */
  async getUserTransactions(userId, { skip, take, type }) {
    const where = { userId };
    if (type) {
      where.type = type;
    }

    const [data, total] = await Promise.all([
      prisma.transaction.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: {
          order: {
            select: { id: true },
          },
          topUp: {
            select: { id: true, paymentMethod: true },
          },
        },
      }),
      prisma.transaction.count({ where }),
    ]);

    return { data, total };
  }

  /**
   * Update user balance (with transaction)
   */
  async updateBalanceWithTransaction(userId, amount, type, description, relatedId = null) {
    return prisma.$transaction(async (tx) => {
      // Get current balance
      const user = await tx.user.findUnique({
        where: { id: userId },
        select: { balance: true },
      });

      const balanceBefore = user.balance;
      const balanceAfter = parseFloat(balanceBefore) + parseFloat(amount);

      // Update balance
      await tx.user.update({
        where: { id: userId },
        data: { balance: balanceAfter },
      });

      // Create transaction record
      const transactionData = {
        userId,
        type,
        amount,
        balanceBefore,
        balanceAfter,
        description,
      };

      if (type === 'TOP_UP' && relatedId) {
        transactionData.topUpId = relatedId;
      } else if ((type === 'ORDER_PAYMENT' || type === 'ORDER_REFUND') && relatedId) {
        transactionData.orderId = relatedId;
      }

      const transaction = await tx.transaction.create({
        data: transactionData,
      });

      return { transaction, balanceAfter };
    });
  }
}

module.exports = new WalletRepository();
