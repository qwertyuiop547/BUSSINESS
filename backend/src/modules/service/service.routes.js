/**
 * Service Routes
 * 
 * Service API endpoints.
 */

const express = require('express');
const router = express.Router();
const serviceController = require('./service.controller');
const { authenticate } = require('../../middleware/auth');
const { validateQuery } = require('../../middleware/validate');
const { serviceQuerySchema } = require('./service.schema');

// All routes require authentication
router.use(authenticate);

// Categories
router.get('/categories', serviceController.getCategories);

// Services
router.get('/', validateQuery(serviceQuerySchema), serviceController.getServices);
router.get('/category/:slug', serviceController.getServicesByCategory);
router.get('/platform/:platform', serviceController.getServicesByPlatform);

// Coming Soon notifications
router.get('/coming-soon/:category', serviceController.getComingSoonCount);
router.post('/coming-soon/:category/notify', serviceController.incrementComingSoonCount);

router.get('/:id', serviceController.getServiceById);

module.exports = router;
