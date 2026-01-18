/**
 * Provider Routes
 * 
 * Provider management endpoints (admin only).
 */

const express = require('express');
const router = express.Router();
const providerController = require('./provider.controller');
const { authenticate } = require('../../middleware/auth');
const { requireAdmin } = require('../../middleware/rbac');
const { validateBody } = require('../../middleware/validate');
const { createProviderSchema, updateProviderSchema } = require('./provider.schema');

// All routes require admin
router.use(authenticate);
router.use(requireAdmin);

router.get('/', providerController.getProviders);
router.post('/', validateBody(createProviderSchema), providerController.createProvider);
router.get('/:id', providerController.getProviderById);
router.patch('/:id', validateBody(updateProviderSchema), providerController.updateProvider);
router.delete('/:id', providerController.deleteProvider);
router.post('/:id/test', providerController.testConnection);
router.get('/:id/balance', providerController.getBalance);
router.get('/:id/services', providerController.getServices);

module.exports = router;
