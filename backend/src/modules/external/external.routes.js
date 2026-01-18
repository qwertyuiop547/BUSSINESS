/**
 * External API Routes
 * 
 * Routes for external/reseller API.
 * Supports both v1 (single endpoint) and v2 (RESTful) formats.
 */

const express = require('express');
const router = express.Router();
const externalController = require('./external.controller');
const { authenticateApiKey } = require('../../middleware/apiKeyAuth');
const { externalApiLimiter } = require('../../middleware/rateLimiter');

// Apply rate limiting and API key auth to all external routes
router.use(externalApiLimiter);
router.use(authenticateApiKey);

// ==================== V1 API (Standard SMM Format) ====================
// Note: "SMM Format" refers to the API format type, not the panel name
// Single POST endpoint that accepts 'action' parameter
router.post('/v1', externalController.handleRequest);

// Also support key in URL for compatibility
router.post('/v1/:key', (req, res, next) => {
  // Merge key from URL into body if not present
  if (!req.body.key && req.params.key) {
    req.body.key = req.params.key;
  }
  next();
}, externalController.handleRequest);

// ==================== V2 API (RESTful) ====================

// Balance
router.get('/v2/balance', externalController.getBalance);

// Services
router.get('/v2/services', externalController.getServices);

// Orders
router.post('/v2/order', externalController.addOrder);
router.get('/v2/order/:id', externalController.getOrderStatus);
router.post('/v2/orders/status', externalController.getMultipleOrderStatus);

// Refills
router.post('/v2/refill', externalController.createRefill);
router.get('/v2/refill/:id', externalController.getRefillStatus);

// Cancel
router.post('/v2/cancel', externalController.cancelOrders);

module.exports = router;
