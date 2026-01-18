/**
 * Order Controller
 * 
 * Handles HTTP requests for order endpoints.
 */

const orderService = require('./order.service');
const { successResponse, paginatedResponse } = require('../../utils/apiResponse');

class OrderController {
  /**
   * POST /orders
   */
  async createOrder(req, res, next) {
    try {
      const order = await orderService.createOrder(req.user.id, req.body);
      return successResponse(res, order, 'Order placed successfully', 201);
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /orders
   */
  async getOrders(req, res, next) {
    try {
      const { page, limit, status, serviceId } = req.query;
      const result = await orderService.getUserOrders(req.user.id, {
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 20,
        status,
        serviceId,
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
   * GET /orders/:id
   */
  async getOrderById(req, res, next) {
    try {
      const order = await orderService.getOrderById(req.user.id, req.params.id);
      return successResponse(res, order);
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /orders/:id/status
   */
  async getOrderStatus(req, res, next) {
    try {
      const status = await orderService.getOrderStatus(req.user.id, req.params.id);
      return successResponse(res, status);
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /orders/:id/cancel
   */
  async cancelOrder(req, res, next) {
    try {
      const result = await orderService.cancelOrder(req.user.id, req.params.id);
      return successResponse(res, null, result.message);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new OrderController();
