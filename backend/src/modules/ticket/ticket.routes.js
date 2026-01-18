/**
 * Ticket Routes
 * 
 * Ticket API endpoints.
 */

const express = require('express');
const router = express.Router();
const ticketController = require('./ticket.controller');
const { authenticate } = require('../../middleware/auth');
const { validateBody, validateQuery } = require('../../middleware/validate');
const {
  createTicketSchema,
  replyTicketSchema,
  ticketQuerySchema,
} = require('./ticket.schema');

// All routes require authentication
router.use(authenticate);

router.post('/', validateBody(createTicketSchema), ticketController.createTicket);
router.get('/', validateQuery(ticketQuerySchema), ticketController.getTickets);
router.get('/:id', ticketController.getTicketById);
router.post('/:id/reply', validateBody(replyTicketSchema), ticketController.replyToTicket);
router.patch('/:id/close', ticketController.closeTicket);

module.exports = router;
