/**
 * API Key Routes
 * 
 * API key management endpoints.
 */

const express = require('express');
const router = express.Router();
const apiKeyController = require('./apiKey.controller');
const { authenticate } = require('../../middleware/auth');
const { validateBody } = require('../../middleware/validate');
const { createApiKeySchema } = require('./apiKey.schema');

// Public docs endpoint
router.get('/docs', apiKeyController.getApiDocs);

// Protected routes
router.use(authenticate);

router.post('/', validateBody(createApiKeySchema), apiKeyController.createApiKey);
router.get('/', apiKeyController.getApiKeys);
router.delete('/:id', apiKeyController.revokeApiKey);
router.patch('/:id/toggle', apiKeyController.toggleApiKey);

module.exports = router;
