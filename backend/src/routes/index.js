/**
 * API Routes Index
 * 
 * Aggregates all module routes.
 */

const express = require('express');
const router = express.Router();

// Import module routes
const authRoutes = require('../modules/auth/auth.routes');
const userRoutes = require('../modules/user/user.routes');
const walletRoutes = require('../modules/wallet/wallet.routes');
const serviceRoutes = require('../modules/service/service.routes');
const orderRoutes = require('../modules/order/order.routes');
const ticketRoutes = require('../modules/ticket/ticket.routes');
const apiKeyRoutes = require('../modules/apiKey/apiKey.routes');
const adminRoutes = require('../modules/admin/admin.routes');
const externalRoutes = require('../modules/external/external.routes');
const notificationRoutes = require('../modules/notification/notification.routes');
const suggestionRoutes = require('../modules/suggestion/suggestion.routes');
const { getMaintenanceStatusHandler } = require('../middleware/maintenance');

// API version
const API_VERSION = 'v1';

// Mount routes
router.use(`/${API_VERSION}/auth`, authRoutes);
router.use(`/${API_VERSION}/users`, userRoutes);
router.use(`/${API_VERSION}/wallet`, walletRoutes);
router.use(`/${API_VERSION}/services`, serviceRoutes);
router.use(`/${API_VERSION}/orders`, orderRoutes);
router.use(`/${API_VERSION}/tickets`, ticketRoutes);
router.use(`/${API_VERSION}/api-keys`, apiKeyRoutes);
router.use(`/${API_VERSION}/admin`, adminRoutes);
router.use(`/${API_VERSION}/notifications`, notificationRoutes);
router.use(`/${API_VERSION}/suggestions`, suggestionRoutes);

// External API (reseller API)
router.use('/external', externalRoutes);

// Public routes (no auth required)
router.get(`/${API_VERSION}/public/maintenance`, getMaintenanceStatusHandler);

// API info
router.get('/', (req, res) => {
  res.json({
    name: 'SMB Panel API',
    version: API_VERSION,
    documentation: '/api/docs',
    endpoints: {
      auth: `/api/${API_VERSION}/auth`,
      users: `/api/${API_VERSION}/users`,
      wallet: `/api/${API_VERSION}/wallet`,
      services: `/api/${API_VERSION}/services`,
      orders: `/api/${API_VERSION}/orders`,
      tickets: `/api/${API_VERSION}/tickets`,
      apiKeys: `/api/${API_VERSION}/api-keys`,
      admin: `/api/${API_VERSION}/admin`,
      notifications: `/api/${API_VERSION}/notifications`,
      suggestions: `/api/${API_VERSION}/suggestions`,
      external: '/api/external/v1',
    },
  });
});

module.exports = router;
