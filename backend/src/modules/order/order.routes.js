/**
 * Order Routes
 * 
 * Order API endpoints.
 */

const express = require('express');
const router = express.Router();
const orderController = require('./order.controller');
const { authenticate } = require('../../middleware/auth');
const { validateBody, validateQuery } = require('../../middleware/validate');
const { orderLimiter } = require('../../middleware/rateLimiter');
const { createOrderSchema, orderQuerySchema } = require('./order.schema');

// All routes require authentication
router.use(authenticate);

// Orders
router.post(
  '/',
  orderLimiter,
  validateBody(createOrderSchema),
  orderController.createOrder
);
router.get('/', validateQuery(orderQuerySchema), orderController.getOrders);
router.get('/:id', orderController.getOrderById);
router.get('/:id/status', orderController.getOrderStatus);
router.post('/:id/cancel', orderController.cancelOrder);

module.exports = router;
