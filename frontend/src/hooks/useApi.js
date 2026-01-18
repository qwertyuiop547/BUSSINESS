/**
 * React Query Hooks
 * 
 * Custom hooks for data fetching with React Query.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';
import toast from 'react-hot-toast';

// ==================== SERVICES ====================

export function useServices(params = {}) {
  return useQuery({
    queryKey: ['services', params],
    queryFn: async () => {
      try {
      const response = await api.get('/v1/services', { params });
        // Handle paginated response - data is in response.data.data
        const services = response.data?.data;
        if (Array.isArray(services)) {
          return services;
        }
        console.warn('Services response format unexpected:', response.data);
        return [];
      } catch (error) {
        console.error('Error fetching services:', error);
        throw error;
      }
    },
    retry: 2,
    retryDelay: 1000,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useServiceById(id) {
  return useQuery({
    queryKey: ['service', id],
    queryFn: async () => {
      const response = await api.get(`/v1/services/${id}`);
      return response.data.data;
    },
    enabled: !!id,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      try {
      const response = await api.get('/v1/services/categories');
        const categories = response.data?.data;
        if (Array.isArray(categories)) {
          return categories;
        }
        console.warn('Categories response format unexpected:', response.data);
        return [];
      } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
      }
    },
    retry: 2,
    retryDelay: 1000,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// ==================== COMING SOON ====================

export function useComingSoonCount(category) {
  return useQuery({
    queryKey: ['coming-soon', category],
    queryFn: async () => {
      const response = await api.get(`/v1/services/coming-soon/${category}`);
      return response.data?.data?.count || 0;
    },
    enabled: !!category,
    staleTime: 10 * 1000, // 10 seconds
    refetchInterval: 10 * 1000, // Refetch every 10 seconds to see other users' clicks
  });
}

export function useNotifyComingSoon() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (category) => {
      const response = await api.post(`/v1/services/coming-soon/${category}/notify`);
      return response.data?.data;
    },
    onSuccess: (data, category) => {
      // Update the cache with new count
      queryClient.setQueryData(['coming-soon', category], data.count);
    },
  });
}

// ==================== ORDERS ====================

export function useOrders(params = {}) {
  return useQuery({
    queryKey: ['orders', params],
    queryFn: async () => {
      try {
      const response = await api.get('/v1/orders', { params });
      return response.data;
      } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
      }
    },
    retry: 2,
    retryDelay: 1000,
    staleTime: 30 * 1000, // 30 seconds
  });
}

export function useOrderById(id) {
  return useQuery({
    queryKey: ['order', id],
    queryFn: async () => {
      const response = await api.get(`/v1/orders/${id}`);
      return response.data.data;
    },
    enabled: !!id,
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await api.post('/v1/orders', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success('Order placed successfully!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to place order');
    },
  });
}

// ==================== WALLET ====================

export function useTransactions(params = {}) {
  return useQuery({
    queryKey: ['transactions', params],
    queryFn: async () => {
      try {
      const response = await api.get('/v1/wallet/transactions', { params });
      return response.data;
      } catch (error) {
        console.error('Error fetching transactions:', error);
        throw error;
      }
    },
    retry: 2,
    retryDelay: 1000,
    staleTime: 30 * 1000, // 30 seconds
  });
}

export function useTopUpRequests(params = {}) {
  return useQuery({
    queryKey: ['topups', params],
    queryFn: async () => {
      const response = await api.get('/v1/wallet/topup', { params });
      return response.data;
    },
  });
}

export function useCreateTopUp() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await api.post('/v1/wallet/topup', data);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate both user and admin queries
      queryClient.invalidateQueries({ queryKey: ['topups'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'topups'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'dashboard'] });
      toast.success('Top-up request submitted!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to submit top-up request');
    },
  });
}

// ==================== TICKETS ====================

export function useTickets(params = {}) {
  return useQuery({
    queryKey: ['tickets', params],
    queryFn: async () => {
      const response = await api.get('/v1/tickets', { params });
      return response.data;
    },
  });
}

export function useTicketById(id) {
  return useQuery({
    queryKey: ['ticket', id],
    queryFn: async () => {
      const response = await api.get(`/v1/tickets/${id}`);
      return response.data.data;
    },
    enabled: !!id,
  });
}

export function useCreateTicket() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await api.post('/v1/tickets', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
      toast.success('Ticket created!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to create ticket');
    },
  });
}

export function useReplyTicket() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ ticketId, message }) => {
      const response = await api.post(`/v1/tickets/${ticketId}/reply`, { message });
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['ticket', variables.ticketId] });
      toast.success('Reply sent!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to send reply');
    },
  });
}

// ==================== API KEYS ====================

export function useApiKeys() {
  return useQuery({
    queryKey: ['apiKeys'],
    queryFn: async () => {
      const response = await api.get('/v1/api-keys');
      return response.data.data;
    },
  });
}

export function useCreateApiKey() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await api.post('/v1/api-keys', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apiKeys'] });
      toast.success('API key created!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to create API key');
    },
  });
}

export function useDeleteApiKey() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const response = await api.delete(`/v1/api-keys/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apiKeys'] });
      toast.success('API key deleted!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to delete API key');
    },
  });
}

// ==================== ADMIN ====================

export function useAdminDashboard() {
  return useQuery({
    queryKey: ['admin', 'dashboard'],
    queryFn: async () => {
      const response = await api.get('/v1/admin/dashboard');
      return response.data.data;
    },
    refetchInterval: 5000, // Auto-refresh every 5 seconds
    staleTime: 0, // Always consider data stale to ensure fresh fetch
    refetchOnWindowFocus: true, // Refetch when tab becomes active
    refetchOnMount: 'always', // Always refetch on component mount
  });
}

export function useAdminUsers(params = {}) {
  return useQuery({
    queryKey: ['admin', 'users', params],
    queryFn: async () => {
      const response = await api.get('/v1/admin/users', { params });
      return response.data;
    },
  });
}

export function useAdminUserById(userId) {
  return useQuery({
    queryKey: ['admin', 'user', userId],
    queryFn: async () => {
      const response = await api.get(`/v1/admin/users/${userId}`);
      return response.data.data;
    },
    enabled: !!userId,
  });
}

export function useAdminOrders(params = {}) {
  return useQuery({
    queryKey: ['admin', 'orders', params],
    queryFn: async () => {
      const response = await api.get('/v1/admin/orders', { params });
      return response.data;
    },
  });
}

export function useAdminTopUps(params = {}) {
  return useQuery({
    queryKey: ['admin', 'topups', params],
    queryFn: async () => {
      const response = await api.get('/v1/admin/topups', { params });
      return response.data;
    },
    refetchInterval: 5000, // Auto-refresh every 5 seconds
    staleTime: 0, // Always consider data stale to ensure fresh fetch
    refetchOnWindowFocus: true, // Refetch when tab becomes active
    refetchOnMount: 'always', // Always refetch on component mount
  });
}

export function useAdminServices(params = {}) {
  return useQuery({
    queryKey: ['admin', 'services', params],
    queryFn: async () => {
      const response = await api.get('/v1/admin/services', { params });
      return response.data;
    },
  });
}

export function useAdminCategories() {
  return useQuery({
    queryKey: ['admin', 'categories'],
    queryFn: async () => {
      const response = await api.get('/v1/admin/categories');
      return response.data.data;
    },
  });
}

export function useAdminTickets(params = {}) {
  return useQuery({
    queryKey: ['admin', 'tickets', params],
    queryFn: async () => {
      const response = await api.get('/v1/admin/tickets', { params });
      return response.data;
    },
  });
}

export function useAdminProviders() {
  return useQuery({
    queryKey: ['admin', 'providers'],
    queryFn: async () => {
      const response = await api.get('/v1/admin/providers');
      return response.data.data;
    },
  });
}

export function useAdminLogs(params = {}) {
  return useQuery({
    queryKey: ['admin', 'logs', params],
    queryFn: async () => {
      const response = await api.get('/v1/admin/logs', { params });
      return response.data;
    },
  });
}

// Admin mutations
export function useApproveTopUp() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, adminNote }) => {
      const response = await api.post(`/v1/admin/topups/${id}/approve`, { adminNote });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'topups'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'dashboard'] });
      toast.success('Top-up approved!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to approve top-up');
    },
  });
}

export function useRejectTopUp() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, adminNote }) => {
      const response = await api.post(`/v1/admin/topups/${id}/reject`, { adminNote });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'topups'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'dashboard'] });
      toast.success('Top-up rejected');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to reject top-up');
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...data }) => {
      const response = await api.patch(`/v1/admin/users/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
      toast.success('User updated!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update user');
    },
  });
}

export function useAdjustBalance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, amount, description }) => {
      const response = await api.post(`/v1/admin/users/${userId}/adjust-balance`, {
        amount,
        description,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
      toast.success('Balance adjusted!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to adjust balance');
    },
  });
}

/**
 * Admin self wallet adjustment (for testing)
 */
export function useAdminSelfAdjust() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ amount, description }) => {
      const response = await api.post('/v1/admin/wallet/self-adjust', {
        amount,
        description,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'dashboard'] });
      toast.success('Wallet updated!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to adjust wallet');
    },
  });
}

// ==================== USER ACCOUNT ====================

export function useDeleteAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await api.delete('/v1/users/profile/account');
      return response.data;
    },
    onSuccess: () => {
      // Clear all queries and logout
      queryClient.clear();
      toast.success('Account deleted successfully');
      // Redirect will be handled in component
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to delete account');
    },
  });
}

// ==================== SUGGESTIONS ====================

export function useSuggestions(params = {}) {
  return useQuery({
    queryKey: ['suggestions', 'my', params],
    queryFn: async () => {
      const response = await api.get('/v1/suggestions/my', { params });
      return response.data;
    },
    staleTime: 30 * 1000,
  });
}

export function useCreateSuggestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await api.post('/v1/suggestions', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suggestions'] });
      toast.success('Suggestion submitted successfully!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to submit suggestion');
    },
  });
}

// Admin Suggestions
export function useAdminSuggestions(params = {}) {
  return useQuery({
    queryKey: ['admin', 'suggestions', params],
    queryFn: async () => {
      const response = await api.get('/v1/admin/suggestions', { params });
      return response.data;
    },
    staleTime: 30 * 1000,
  });
}

export function useAdminSuggestionStats() {
  return useQuery({
    queryKey: ['admin', 'suggestions', 'stats'],
    queryFn: async () => {
      const response = await api.get('/v1/admin/suggestions/stats');
      return response.data?.data;
    },
    staleTime: 60 * 1000,
  });
}

export function useUpdateSuggestionStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status, adminNote }) => {
      const response = await api.patch(`/v1/admin/suggestions/${id}`, {
        status,
        adminNote,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'suggestions'] });
      toast.success('Suggestion updated!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update suggestion');
    },
  });
}

export function useDeleteSuggestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const response = await api.delete(`/v1/admin/suggestions/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'suggestions'] });
      toast.success('Suggestion deleted!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to delete suggestion');
    },
  });
}
