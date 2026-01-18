/**
 * Notification Routes
 * 
 * Defines API endpoints for notification operations.
 */

const express = require('express');
const router = express.Router();
const notificationController = require('./notification.controller');
const { authenticate } = require('../../middleware/auth');

// All notification routes require authentication
router.use(authenticate);

// GET /api/v1/notifications
router.get('/', notificationController.getMyNotifications);

// PATCH /api/v1/notifications/mark-all-read
router.patch('/mark-all-read', notificationController.markAllAsRead);

// PATCH /api/v1/notifications/:id/read
router.patch('/:id/read', notificationController.markAsRead);

// DELETE /api/v1/notifications/:id
router.delete('/:id', notificationController.deleteNotification);

module.exports = router;
