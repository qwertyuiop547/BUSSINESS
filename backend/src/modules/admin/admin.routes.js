/**
 * Admin Routes
 * 
 * Admin panel API endpoints (admin only).
 */

const express = require('express');
const router = express.Router();
const adminController = require('./admin.controller');
const providerRoutes = require('../provider/provider.routes');
const suggestionController = require('../suggestion/suggestion.controller');
const { authenticate } = require('../../middleware/auth');
const { requireAdmin } = require('../../middleware/rbac');
const { validateBody, validateQuery } = require('../../middleware/validate');
const {
  adminUpdateUserSchema,
  adjustBalanceSchema,
  reviewTopUpSchema,
  createServiceSchema,
  updateServiceSchema,
  createCategorySchema,
  updateCategorySchema,
  adminUpdateOrderSchema,
  refundOrderSchema,
  adminUserQuerySchema,
  adminOrderQuerySchema,
  adminTopUpQuerySchema,
} = require('./admin.schema');
const { replyTicketSchema } = require('../ticket/ticket.schema');

// All routes require admin
router.use(authenticate);
router.use(requireAdmin);

// Dashboard
router.get('/dashboard', adminController.getDashboard);

// Users
router.get('/users', validateQuery(adminUserQuerySchema), adminController.getUsers);
router.get('/users/:id', adminController.getUserById);
router.patch('/users/:id', validateBody(adminUpdateUserSchema), adminController.updateUser);
router.post('/users/:id/ban', adminController.banUser);
router.post('/users/:id/unban', adminController.unbanUser);
router.post('/users/:id/adjust-balance', validateBody(adjustBalanceSchema), adminController.adjustBalance);

// Top-ups
router.get('/topups', validateQuery(adminTopUpQuerySchema), adminController.getTopUps);
router.post('/topups/:id/approve', validateBody(reviewTopUpSchema), adminController.approveTopUp);
router.post('/topups/:id/reject', validateBody(reviewTopUpSchema), adminController.rejectTopUp);

// Orders
router.get('/orders', validateQuery(adminOrderQuerySchema), adminController.getOrders);
router.get('/orders/:id', adminController.getOrderById);
router.patch('/orders/:id', validateBody(adminUpdateOrderSchema), adminController.updateOrder);
router.post('/orders/:id/refund', validateBody(refundOrderSchema), adminController.refundOrder);

// Services
router.get('/services', adminController.getServices);
router.post('/services', validateBody(createServiceSchema), adminController.createService);
router.patch('/services/:id', validateBody(updateServiceSchema), adminController.updateService);
router.delete('/services/:id', adminController.deleteService);

// Categories
router.get('/categories', adminController.getCategories);
router.post('/categories', validateBody(createCategorySchema), adminController.createCategory);
router.patch('/categories/:id', validateBody(updateCategorySchema), adminController.updateCategory);
router.delete('/categories/:id', adminController.deleteCategory);

// Tickets
router.get('/tickets', adminController.getTickets);
router.get('/tickets/:id', adminController.getTicketById);
router.post('/tickets/:id/reply', validateBody(replyTicketSchema), adminController.replyToTicket);
router.patch('/tickets/:id', adminController.updateTicket);

// Providers (nested routes)
router.use('/providers', providerRoutes);

// Logs
router.get('/logs', adminController.getLogs);

// Settings
router.get('/settings', adminController.getSettings);
router.patch('/settings', adminController.updateSettings);

// Admin Self Wallet Adjustment (for testing/admin purposes)
router.post('/wallet/self-adjust', validateBody(adjustBalanceSchema), adminController.selfAdjustBalance);

// Suggestions
router.get('/suggestions', suggestionController.getAll);
router.get('/suggestions/stats', suggestionController.getStats);
router.get('/suggestions/:id', suggestionController.getById);
router.patch('/suggestions/:id', suggestionController.updateStatus);
router.delete('/suggestions/:id', suggestionController.delete);

module.exports = router;
