/**
 * Notification Store (Zustand)
 * 
 * Manages notification state and real-time updates.
 */

import { create } from 'zustand';
import api from '../lib/api';

const useNotificationStore = create((set, get) => ({
    notifications: [],
    unreadCount: 0,
    isLoading: false,
    error: null,

    // Fetch notifications from API
    fetchNotifications: async (limit = 20, offset = 0) => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.get(`/v1/notifications?limit=${limit}&offset=${offset}`);
            if (response.data.success) {
                set({
                    notifications: response.data.data.notifications,
                    unreadCount: response.data.data.unreadCount,
                    isLoading: false
                });
            } else {
                set({
                    error: response.data?.message || 'Failed to fetch notifications',
                    isLoading: false
                });
            }
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Failed to fetch notifications',
                isLoading: false
            });
        }
    },

    // Mark a single notification as read
    markAsRead: async (id) => {
        try {
            const response = await api.patch(`/v1/notifications/${id}/read`);
            if (response.data.success) {
                set((state) => {
                    const nextNotifications = state.notifications.map((n) =>
                        n.id === id ? { ...n, isRead: true } : n
                    );
                    const nextUnreadCount = nextNotifications.filter((n) => !n.isRead).length;
                    return {
                        notifications: nextNotifications,
                        unreadCount: nextUnreadCount,
                    };
                });
            }
        } catch (error) {
            console.error('Failed to mark notification as read:', error);
        }
    },

    // Mark all notifications as read
    markAllAsRead: async () => {
        try {
            const response = await api.patch('/v1/notifications/mark-all-read');
            if (response.data.success) {
                set((state) => ({
                    notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
                    unreadCount: 0
                }));
            }
        } catch (error) {
            console.error('Failed to mark all notifications as read:', error);
        }
    },

    // Delete a notification
    deleteNotification: async (id) => {
        try {
            const response = await api.delete(`/v1/notifications/${id}`);
            if (response.data.success) {
                set((state) => {
                    const nextNotifications = state.notifications.filter((n) => n.id !== id);
                    const nextUnreadCount = nextNotifications.filter((n) => !n.isRead).length;
                    return {
                        notifications: nextNotifications,
                        unreadCount: nextUnreadCount,
                    };
                });
            }
        } catch (error) {
            console.error('Failed to delete notification:', error);
        }
    }
}));

export default useNotificationStore;
