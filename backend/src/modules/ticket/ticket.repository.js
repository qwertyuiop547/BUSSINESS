/**
 * Ticket Repository
 * 
 * Data access layer for support tickets.
 */

const { prisma } = require('../../config/database');

class TicketRepository {
  /**
   * Create ticket with initial message
   */
  async create(userId, data) {
    return prisma.ticket.create({
      data: {
        userId,
        subject: data.subject,
        priority: data.priority || 'MEDIUM',
        orderId: data.orderId,
        status: 'OPEN',
        messages: {
          create: {
            userId,
            message: data.message,
            isAdmin: false,
          },
        },
      },
      include: {
        messages: {
          include: {
            user: {
              select: { id: true, username: true, role: true },
            },
          },
        },
      },
    });
  }

  /**
   * Get ticket by ID with messages
   */
  async findById(id) {
    return prisma.ticket.findUnique({
      where: { id },
      include: {
        user: {
          select: { id: true, email: true, username: true },
        },
        messages: {
          orderBy: { createdAt: 'asc' },
          include: {
            user: {
              select: { id: true, username: true, role: true },
            },
          },
        },
      },
    });
  }

  /**
   * Get user's tickets
   */
  async findByUser(userId, { skip, take, status }) {
    const where = { userId };
    if (status) {
      where.status = status;
    }

    const [data, total] = await Promise.all([
      prisma.ticket.findMany({
        where,
        skip,
        take,
        orderBy: { updatedAt: 'desc' },
        include: {
          _count: { select: { messages: true } },
        },
      }),
      prisma.ticket.count({ where }),
    ]);

    return { data, total };
  }

  /**
   * Add message to ticket
   */
  async addMessage(ticketId, userId, message, isAdmin = false) {
    // Update ticket status based on who is replying
    const newStatus = isAdmin ? 'ANSWERED' : 'CUSTOMER_REPLY';

    const [ticketMessage] = await Promise.all([
      prisma.ticketMessage.create({
        data: {
          ticketId,
          userId,
          message,
          isAdmin,
        },
        include: {
          user: {
            select: { id: true, username: true, role: true },
          },
        },
      }),
      prisma.ticket.update({
        where: { id: ticketId },
        data: { status: newStatus },
      }),
    ]);

    return ticketMessage;
  }

  /**
   * Update ticket
   */
  async update(id, data) {
    return prisma.ticket.update({
      where: { id },
      data,
    });
  }

  /**
   * Close ticket
   */
  async close(id) {
    return prisma.ticket.update({
      where: { id },
      data: {
        status: 'CLOSED',
        closedAt: new Date(),
      },
    });
  }

  /**
   * Get all tickets (admin)
   */
  async findAll({ skip, take, status, priority }) {
    const where = {};
    if (status) {
      where.status = status;
    }
    if (priority) {
      where.priority = priority;
    }

    const [data, total] = await Promise.all([
      prisma.ticket.findMany({
        where,
        skip,
        take,
        orderBy: [{ priority: 'desc' }, { updatedAt: 'desc' }],
        include: {
          user: {
            select: { id: true, email: true, username: true },
          },
          _count: { select: { messages: true } },
        },
      }),
      prisma.ticket.count({ where }),
    ]);

    return { data, total };
  }
}

module.exports = new TicketRepository();
