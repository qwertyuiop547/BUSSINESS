/**
 * Ticket Service
 * 
 * Business logic for support tickets.
 */

const ticketRepository = require('./ticket.repository');
const notificationService = require('../notification/notification.service');

class TicketService {
  /**
   * Create new ticket
   */
  async createTicket(userId, data) {
    return ticketRepository.create(userId, data);
  }

  /**
   * Get user's tickets
   */
  async getUserTickets(userId, options) {
    const { page = 1, limit = 20, status } = options;
    const skip = (page - 1) * limit;

    return ticketRepository.findByUser(userId, {
      skip,
      take: limit,
      status,
    });
  }

  /**
   * Get ticket by ID (with ownership check)
   */
  async getTicketById(userId, ticketId, isAdmin = false) {
    const ticket = await ticketRepository.findById(ticketId);

    if (!ticket) {
      throw { statusCode: 404, message: 'Ticket not found' };
    }

    // Check ownership (unless admin)
    if (!isAdmin && ticket.userId !== userId) {
      throw { statusCode: 403, message: 'Access denied' };
    }

    return ticket;
  }

  /**
   * Reply to ticket
   */
  async replyToTicket(userId, ticketId, message, isAdmin = false) {
    const ticket = await this.getTicketById(userId, ticketId, isAdmin);

    if (ticket.status === 'CLOSED') {
      throw { statusCode: 400, message: 'Cannot reply to a closed ticket' };
    }

    const result = await ticketRepository.addMessage(ticketId, userId, message, isAdmin);

    // Send notification if admin replied
    if (isAdmin) {
      try {
        await notificationService.createNotification({
          userId: ticket.userId,
          type: 'TICKET_REPLY',
          title: 'Ticket Reply',
          message: `You have a new reply on your ticket: ${ticket.subject}`,
          link: `/tickets?id=${ticketId}`,
        });
      } catch (error) {
        console.error('Failed to send ticket reply notification:', error);
      }
    }

    return result;
  }

  /**
   * Close ticket
   */
  async closeTicket(userId, ticketId, isAdmin = false) {
    const ticket = await this.getTicketById(userId, ticketId, isAdmin);

    if (ticket.status === 'CLOSED') {
      throw { statusCode: 400, message: 'Ticket is already closed' };
    }

    return ticketRepository.close(ticketId);
  }

  /**
   * Get all tickets (admin)
   */
  async getAllTickets(options) {
    const { page = 1, limit = 20, status, priority } = options;
    const skip = (page - 1) * limit;

    return ticketRepository.findAll({
      skip,
      take: limit,
      status,
      priority,
    });
  }

  /**
   * Update ticket (admin)
   */
  async updateTicket(ticketId, data) {
    const ticket = await ticketRepository.findById(ticketId);

    if (!ticket) {
      throw { statusCode: 404, message: 'Ticket not found' };
    }

    return ticketRepository.update(ticketId, data);
  }
}

module.exports = new TicketService();
