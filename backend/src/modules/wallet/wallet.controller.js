/**
 * Wallet Controller
 * 
 * Handles HTTP requests for wallet endpoints.
 */

const walletService = require('./wallet.service');
const { successResponse, paginatedResponse } = require('../../utils/apiResponse');

class WalletController {
  /**
   * GET /wallet/balance
   */
  async getBalance(req, res, next) {
    try {
      const balance = await walletService.getBalance(req.user.id);
      return successResponse(res, { balance });
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /wallet/topup
   */
  async createTopUp(req, res, next) {
    try {
      const topUp = await walletService.createTopUpRequest(req.user.id, req.body);
      return successResponse(
        res,
        topUp,
        'Top-up request submitted. Awaiting admin approval.',
        201
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /wallet/topup
   */
  async getTopUps(req, res, next) {
    try {
      const { page, limit, status } = req.query;
      const result = await walletService.getUserTopUps(req.user.id, {
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 20,
        status,
      });
      return paginatedResponse(
        res,
        result.data,
        result.total,
        parseInt(page) || 1,
        parseInt(limit) || 20
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /wallet/topup/:id
   */
  async getTopUpById(req, res, next) {
    try {
      const topUp = await walletService.getTopUpById(req.user.id, req.params.id);
      return successResponse(res, topUp);
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /wallet/transactions
   */
  async getTransactions(req, res, next) {
    try {
      const { page, limit, type } = req.query;
      const result = await walletService.getUserTransactions(req.user.id, {
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 20,
        type,
      });
      return paginatedResponse(
        res,
        result.data,
        result.total,
        parseInt(page) || 1,
        parseInt(limit) || 20
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /wallet/transactions/:id
   */
  async getTransactionById(req, res, next) {
    try {
      const transaction = await walletService.getTransactionById(
        req.user.id,
        req.params.id
      );
      return successResponse(res, transaction);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new WalletController();
