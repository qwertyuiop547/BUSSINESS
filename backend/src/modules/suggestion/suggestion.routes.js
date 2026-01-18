/**
 * Suggestion Routes
 */

const express = require('express');
const router = express.Router();
const suggestionController = require('./suggestion.controller');
const { authenticate } = require('../../middleware/auth');

// All routes require authentication
router.use(authenticate);

// User routes
router.post('/', suggestionController.create);
router.get('/my', suggestionController.getUserSuggestions);
router.get('/:id', suggestionController.getById);

module.exports = router;
