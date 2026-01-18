/**
 * Ticket Validation Schemas
 */

const { z } = require('zod');

// Create ticket schema
const createTicketSchema = z.object({
  subject: z
    .string()
    .min(5, 'Subject must be at least 5 characters')
    .max(200, 'Subject is too long'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message is too long'),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional().default('MEDIUM'),
  orderId: z.string().optional().nullable(),
});

// Reply to ticket schema
const replyTicketSchema = z.object({
  message: z
    .string()
    .min(1, 'Message is required')
    .max(5000, 'Message is too long'),
});

// Query schema for tickets list
const ticketQuerySchema = z.object({
  page: z.string().optional().transform((v) => parseInt(v) || 1),
  limit: z.string().optional().transform((v) => parseInt(v) || 20),
  status: z.enum(['OPEN', 'ANSWERED', 'CUSTOMER_REPLY', 'CLOSED']).optional(),
});

module.exports = {
  createTicketSchema,
  replyTicketSchema,
  ticketQuerySchema,
};
