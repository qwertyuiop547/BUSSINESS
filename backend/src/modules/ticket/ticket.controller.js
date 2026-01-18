/**
 * Ticket Controller
 * 
 * Handles HTTP requests for ticket endpoints.
 */

const ticketService = require('./ticket.service');
const { successResponse, paginatedResponse } = require('../../utils/apiResponse');

class TicketController {
  /**
   * POST /tickets
   */
  async createTicket(req, res, next) {
    try {
      const ticket = await ticketService.createTicket(req.user.id, req.body);
      return successResponse(res, ticket, 'Ticket created successfully', 201);
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /tickets
   */
  async getTickets(req, res, next) {
    try {
      const { page, limit, status } = req.query;
      const result = await ticketService.getUserTickets(req.user.id, {
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
   * GET /tickets/:id
   */
  async getTicketById(req, res, next) {
    try {
      const ticket = await ticketService.getTicketById(req.user.id, req.params.id);
      return successResponse(res, ticket);
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /tickets/:id/reply
   */
  async replyToTicket(req, res, next) {
    try {
      const message = await ticketService.replyToTicket(
        req.user.id,
        req.params.id,
        req.body.message,
        req.user.role === 'ADMIN'
      );
      return successResponse(res, message, 'Reply sent');
    } catch (error) {
      next(error);
    }
  }

  /**
   * PATCH /tickets/:id/close
   */
  async closeTicket(req, res, next) {
    try {
      await ticketService.closeTicket(req.user.id, req.params.id);
      return successResponse(res, null, 'Ticket closed');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TicketController();
