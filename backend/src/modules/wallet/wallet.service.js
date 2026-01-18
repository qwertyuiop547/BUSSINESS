/**
 * Wallet Service
 * 
 * Business logic for wallet operations.
 * Optimized with caching for high performance.
 */

const walletRepository = require('./wallet.repository');
const { cache, CacheKeys, invalidateUser } = require('../../utils/cache');

class WalletService {
  /**
   * Get user balance (with short cache)
   */
  async getBalance(userId) {
    return cache(
      CacheKeys.userBalance(userId),
      () => walletRepository.getBalance(userId),
      15 // Cache for 15 seconds (balance changes frequently)
    );
  }

  /**
   * Create top-up request
   */
  async createTopUpRequest(userId, data) {
    const topUp = await walletRepository.createTopUpRequest({
      userId,
      amount: data.amount,
      paymentMethod: data.paymentMethod,
      referenceNumber: data.referenceNumber || null,
      proofUrl: data.proofUrl || null,
      status: 'PENDING',
    });

    return topUp;
  }

  /**
   * Get user's top-up requests (with pagination limits)
   */
  async getUserTopUps(userId, options) {
    const config = require('../../config');
    const { page = 1, limit = 20, status } = options;
    
    // Enforce max limit to prevent large queries
    const safeLimit = Math.min(limit, config.pagination.maxLimit || 100);
    const skip = (page - 1) * safeLimit;

    return walletRepository.getUserTopUps(userId, {
      skip,
      take: safeLimit,
      status,
    });
  }

  /**
   * Get top-up by ID (with ownership check)
   */
  async getTopUpById(userId, topUpId, isAdmin = false) {
    const topUp = await walletRepository.getTopUpById(topUpId);

    if (!topUp) {
      throw { statusCode: 404, message: 'Top-up request not found' };
    }

    // Check ownership (unless admin)
    if (!isAdmin && topUp.userId !== userId) {
      throw { statusCode: 403, message: 'Access denied' };
    }

    return topUp;
  }

  /**
   * Get user's transactions (with pagination limits)
   */
  async getUserTransactions(userId, options) {
    const config = require('../../config');
    const { page = 1, limit = 20, type } = options;
    
    // Enforce max limit to prevent large queries
    const safeLimit = Math.min(limit, config.pagination.maxLimit || 100);
    const skip = (page - 1) * safeLimit;

    return walletRepository.getUserTransactions(userId, {
      skip,
      take: safeLimit,
      type,
    });
  }

  /**
   * Get transaction by ID (with ownership check)
   */
  async getTransactionById(userId, transactionId, isAdmin = false) {
    const transaction = await walletRepository.getTransactionById(transactionId);

    if (!transaction) {
      throw { statusCode: 404, message: 'Transaction not found' };
    }

    // Check ownership (unless admin)
    if (!isAdmin && transaction.userId !== userId) {
      throw { statusCode: 403, message: 'Access denied' };
    }

    return transaction;
  }

  /**
   * Add balance to user (called by admin when approving top-up)
   * Invalidates cache after balance change
   */
  async addBalance(userId, amount, description, topUpId = null) {
    const result = await walletRepository.updateBalanceWithTransaction(
      userId,
      amount,
      'TOP_UP',
      description,
      topUpId
    );
    
    // Invalidate user cache after balance change
    await invalidateUser(userId);
    
    return result;
  }

  /**
   * Deduct balance for order
   * Invalidates cache after balance change
   */
  async deductForOrder(userId, amount, description, orderId) {
    // Check sufficient balance (bypass cache to get fresh data)
    const currentBalance = await walletRepository.getBalance(userId);
    if (parseFloat(currentBalance) < parseFloat(amount)) {
      throw { statusCode: 400, message: 'Insufficient balance' };
    }

    const result = await walletRepository.updateBalanceWithTransaction(
      userId,
      -Math.abs(amount), // Ensure negative
      'ORDER_PAYMENT',
      description,
      orderId
    );
    
    // Invalidate user cache after balance change
    await invalidateUser(userId);
    
    return result;
  }

  /**
   * Refund balance for order
   * Invalidates cache after balance change
   */
  async refundForOrder(userId, amount, description, orderId) {
    const result = await walletRepository.updateBalanceWithTransaction(
      userId,
      Math.abs(amount), // Ensure positive
      'ORDER_REFUND',
      description,
      orderId
    );
    
    // Invalidate user cache after balance change
    await invalidateUser(userId);
    
    return result;
  }

  /**
   * Admin balance adjustment
   * Invalidates cache after balance change
   */
  async adminAdjustBalance(userId, amount, description) {
    const result = await walletRepository.updateBalanceWithTransaction(
      userId,
      amount,
      'ADMIN_ADJUST',
      description
    );
    
    // Invalidate user cache after balance change
    await invalidateUser(userId);
    
    return result;
  }
}

module.exports = new WalletService();
