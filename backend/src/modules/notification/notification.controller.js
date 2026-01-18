/**
 * Notification Controller
 * 
 * Handles HTTP requests for notification operations.
 */

const notificationService = require('./notification.service');
const { successResponse, errorResponse } = require('../../utils/apiResponse');

class NotificationController {
    /**
     * Get all notifications for current user
     */
    async getMyNotifications(req, res, next) {
        try {
            const userId = req.user.id;
            const limit = parseInt(req.query.limit) || 20;
            const offset = parseInt(req.query.offset) || 0;

            const result = await notificationService.getUserNotifications(userId, limit, offset);
            return successResponse(res, result, 'Notifications retrieved successfully');
        } catch (error) {
            next(error);
        }
    }

    /**
     * Mark a notification as read
     */
    async markAsRead(req, res, next) {
        try {
            const userId = req.user.id;
            const { id } = req.params;

            await notificationService.markAsRead(id, userId);
            return successResponse(res, null, 'Notification marked as read');
        } catch (error) {
            next(error);
        }
    }

    /**
     * Mark all as read
     */
    async markAllAsRead(req, res, next) {
        try {
            const userId = req.user.id;

            await notificationService.markAllAsRead(userId);
            return successResponse(res, null, 'All notifications marked as read');
        } catch (error) {
            next(error);
        }
    }

    /**
     * Delete a notification
     */
    async deleteNotification(req, res, next) {
        try {
            const userId = req.user.id;
            const { id } = req.params;

            await notificationService.deleteNotification(id, userId);
            return successResponse(res, null, 'Notification deleted successfully');
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new NotificationController();
