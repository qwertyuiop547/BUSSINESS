/**
 * Notification Service
 * 
 * Business logic for notification operations.
 */

const { prisma } = require('../../config/database');

class NotificationService {
    /**
     * Create a new notification
     */
    async createNotification(data) {
        const { userId, type, title, message, link } = data;

        return await prisma.notification.create({
            data: {
                userId,
                type,
                title,
                message,
                link,
            },
        });
    }

    /**
     * Get notifications for a user
     */
    async getUserNotifications(userId, limit = 10, offset = 0) {
        const notifications = await prisma.notification.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            take: limit,
            skip: offset,
        });

        const unreadCount = await prisma.notification.count({
            where: { userId, isRead: false },
        });

        return { notifications, unreadCount };
    }

    /**
     * Mark notification as read
     */
    async markAsRead(notificationId, userId) {
        return await prisma.notification.update({
            where: {
                id: notificationId,
                userId // Security check
            },
            data: { isRead: true },
        });
    }

    /**
     * Mark all notifications as read for a user
     */
    async markAllAsRead(userId) {
        return await prisma.notification.updateMany({
            where: { userId, isRead: false },
            data: { isRead: true },
        });
    }

    /**
     * Delete a notification
     */
    async deleteNotification(notificationId, userId) {
        return await prisma.notification.delete({
            where: {
                id: notificationId,
                userId // Security check
            },
        });
    }
}

module.exports = new NotificationService();
