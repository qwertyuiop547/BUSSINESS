/**
 * Admin Controller
 * 
 * Handles HTTP requests for admin endpoints.
 */

const adminService = require('./admin.service');
const { successResponse, paginatedResponse } = require('../../utils/apiResponse');

class AdminController {
  // ==================== DASHBOARD ====================

  /**
   * GET /admin/dashboard
   */
  async getDashboard(req, res, next) {
    try {
      const metrics = await adminService.getDashboardMetrics();
      return successResponse(res, metrics);
    } catch (error) {
      next(error);
    }
  }

  // ==================== USERS ====================

  /**
   * GET /admin/users
   */
  async getUsers(req, res, next) {
    try {
      const { page, limit, status, role, search } = req.query;
      const result = await adminService.getUsers({
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 20,
        status,
        role,
        search,
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
   * GET /admin/users/:id
   */
  async getUserById(req, res, next) {
    try {
      const user = await adminService.getUserById(req.params.id);
      return successResponse(res, user);
    } catch (error) {
      next(error);
    }
  }

  /**
   * PATCH /admin/users/:id
   */
  async updateUser(req, res, next) {
    try {
      const user = await adminService.updateUser(req.params.id, req.body);
      return successResponse(res, user, 'User updated');
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /admin/users/:id/ban
   */
  async banUser(req, res, next) {
    try {
      const result = await adminService.banUser(req.params.id, req.user.id);
      return successResponse(res, null, result.message);
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /admin/users/:id/unban
   */
  async unbanUser(req, res, next) {
    try {
      const result = await adminService.unbanUser(req.params.id, req.user.id);
      return successResponse(res, null, result.message);
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /admin/users/:id/adjust-balance
   */
  async adjustBalance(req, res, next) {
    try {
      const { amount, description } = req.body;
      const result = await adminService.adjustBalance(
        req.params.id,
        amount,
        description,
        req.user.id
      );
      return successResponse(res, result, 'Balance adjusted');
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /admin/wallet/self-adjust
   * Admin can adjust their own wallet balance (for testing purposes)
   */
  async selfAdjustBalance(req, res, next) {
    try {
      const { amount, description } = req.body;
      const result = await adminService.adjustBalance(
        req.user.id, // Use admin's own ID
        amount,
        description || 'Admin self-adjustment',
        req.user.id
      );
      return successResponse(res, result, 'Wallet balance updated');
    } catch (error) {
      next(error);
    }
  }

  // ==================== TOP-UPS ====================

  /**
   * GET /admin/topups
   */
  async getTopUps(req, res, next) {
    try {
      const { page, limit, status, userId } = req.query;
      const result = await adminService.getTopUps({
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 20,
        status,
        userId,
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
   * POST /admin/topups/:id/approve
   */
  async approveTopUp(req, res, next) {
    try {
      const result = await adminService.approveTopUp(
        req.params.id,
        req.user.id,
        req.body.adminNote
      );
      return successResponse(res, null, result.message);
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /admin/topups/:id/reject
   */
  async rejectTopUp(req, res, next) {
    try {
      const result = await adminService.rejectTopUp(
        req.params.id,
        req.user.id,
        req.body.adminNote
      );
      return successResponse(res, null, result.message);
    } catch (error) {
      next(error);
    }
  }

  // ==================== ORDERS ====================

  /**
   * GET /admin/orders
   */
  async getOrders(req, res, next) {
    try {
      const { page, limit, status, userId, serviceId } = req.query;
      const result = await adminService.getOrders({
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 20,
        status,
        userId,
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
   * GET /admin/orders/:id
   */
  async getOrderById(req, res, next) {
    try {
      // Use order service with admin flag
      const orderService = require('../order/order.service');
      const order = await orderService.getOrderById(null, req.params.id, true);
      return successResponse(res, order);
    } catch (error) {
      next(error);
    }
  }

  /**
   * PATCH /admin/orders/:id
   */
  async updateOrder(req, res, next) {
    try {
      const order = await adminService.updateOrder(
        req.params.id,
        req.body,
        req.user.id
      );
      return successResponse(res, order, 'Order updated');
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /admin/orders/:id/refund
   */
  async refundOrder(req, res, next) {
    try {
      const { amount, reason } = req.body;
      const result = await adminService.refundOrder(
        req.params.id,
        amount,
        reason,
        req.user.id
      );
      return successResponse(res, result, 'Order refunded');
    } catch (error) {
      next(error);
    }
  }

  // ==================== SERVICES ====================

  /**
   * GET /admin/services
   */
  async getServices(req, res, next) {
    try {
      const { page, limit } = req.query;
      const result = await adminService.getServices({
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 50,
      });
      return paginatedResponse(
        res,
        result.data,
        result.total,
        parseInt(page) || 1,
        parseInt(limit) || 50
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /admin/services
   */
  async createService(req, res, next) {
    try {
      const service = await adminService.createService(req.body, req.user.id);
      return successResponse(res, service, 'Service created', 201);
    } catch (error) {
      next(error);
    }
  }

  /**
   * PATCH /admin/services/:id
   */
  async updateService(req, res, next) {
    try {
      const service = await adminService.updateService(
        req.params.id,
        req.body,
        req.user.id
      );
      return successResponse(res, service, 'Service updated');
    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /admin/services/:id
   */
  async deleteService(req, res, next) {
    try {
      const result = await adminService.deleteService(req.params.id, req.user.id);
      return successResponse(res, null, result.message);
    } catch (error) {
      next(error);
    }
  }

  // ==================== CATEGORIES ====================

  /**
   * GET /admin/categories
   */
  async getCategories(req, res, next) {
    try {
      const categories = await adminService.getCategories();
      return successResponse(res, categories);
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /admin/categories
   */
  async createCategory(req, res, next) {
    try {
      const category = await adminService.createCategory(req.body);
      return successResponse(res, category, 'Category created', 201);
    } catch (error) {
      next(error);
    }
  }

  /**
   * PATCH /admin/categories/:id
   */
  async updateCategory(req, res, next) {
    try {
      const category = await adminService.updateCategory(req.params.id, req.body);
      return successResponse(res, category, 'Category updated');
    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /admin/categories/:id
   */
  async deleteCategory(req, res, next) {
    try {
      const result = await adminService.deleteCategory(req.params.id);
      return successResponse(res, null, result.message);
    } catch (error) {
      next(error);
    }
  }

  // ==================== LOGS ====================

  /**
   * GET /admin/logs
   */
  async getLogs(req, res, next) {
    try {
      const { page, limit, action, adminId } = req.query;
      const result = await adminService.getLogs({
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 50,
        action,
        adminId,
      });
      return paginatedResponse(
        res,
        result.data,
        result.total,
        parseInt(page) || 1,
        parseInt(limit) || 50
      );
    } catch (error) {
      next(error);
    }
  }

  // ==================== TICKETS (Admin view) ====================

  /**
   * GET /admin/tickets
   */
  async getTickets(req, res, next) {
    try {
      const ticketService = require('../ticket/ticket.service');
      const { page, limit, status, priority } = req.query;
      const result = await ticketService.getAllTickets({
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 20,
        status,
        priority,
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
   * GET /admin/tickets/:id
   */
  async getTicketById(req, res, next) {
    try {
      const ticketService = require('../ticket/ticket.service');
      const ticket = await ticketService.getTicketById(null, req.params.id, true);
      return successResponse(res, ticket);
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /admin/tickets/:id/reply
   */
  async replyToTicket(req, res, next) {
    try {
      const ticketService = require('../ticket/ticket.service');
      const message = await ticketService.replyToTicket(
        req.user.id,
        req.params.id,
        req.body.message,
        true // isAdmin
      );
      return successResponse(res, message, 'Reply sent');
    } catch (error) {
      next(error);
    }
  }

  /**
   * PATCH /admin/tickets/:id
   */
  async updateTicket(req, res, next) {
    try {
      const ticketService = require('../ticket/ticket.service');
      const ticket = await ticketService.updateTicket(req.params.id, req.body);
      return successResponse(res, ticket, 'Ticket updated');
    } catch (error) {
      next(error);
    }
  }

  // ==================== SETTINGS ====================

  /**
   * GET /admin/settings
   */
  async getSettings(req, res, next) {
    try {
      const settings = await adminService.getSettings();
      return successResponse(res, settings);
    } catch (error) {
      next(error);
    }
  }

  /**
   * PATCH /admin/settings
   */
  async updateSettings(req, res, next) {
    try {
      const settings = await adminService.updateSettings(req.body, req.user.id);
      return successResponse(res, settings, 'Settings updated');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AdminController();
