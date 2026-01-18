/**
 * Auth Store (Zustand)
 * 
 * Global authentication state management.
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../lib/api';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true, // Start as loading to prevent redirects during init
      isInitialized: false, // Track if initialization is complete
      error: null,

      // Initialize auth state
      initialize: async () => {
        const currentState = get();

        // If already initialized, don't re-initialize
        if (currentState.isInitialized) {
          return;
        }

        // FIX: If stuck in loading state but not initialized, reset and proceed
        // This handles the case where isLoading was persisted from a previous session
        if (currentState.isLoading && !currentState.isInitialized) {
          // Reset loading state and continue with initialization
          set({ isLoading: false });
        }

        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          // No token - set initialized immediately without loading
          set({
            isAuthenticated: false,
            user: null,
            isLoading: false,
            isInitialized: true
          });
          return;
        }

        // Has token - verify it
        set({ isLoading: true, isInitialized: false });

        try {
          // Add timeout to prevent infinite loading
          const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => {
              reject(new Error('Auth timeout'));
            }, 10000); // 10 second timeout
          });

          const profilePromise = api.get('/v1/users/profile');
          const response = await Promise.race([profilePromise, timeoutPromise]);
          const userData = response.data.data;
          set({
            user: userData,
            isAuthenticated: true,
            isLoading: false,
            isInitialized: true,
          });
        } catch (error) {
          console.error('Auth initialization error:', error);
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            isInitialized: true,
          });
        }
      },

      // Login
      login: async (email, password) => {
        try {
          set({ isLoading: true, error: null });
          // #region agent log
          fetch('http://127.0.0.1:7242/ingest/344d8f42-c2de-485e-8e1f-b018a2df1d67', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'authStore.js:82', message: 'login API call starting', data: { email, hasPassword: !!password }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run1', hypothesisId: 'D' }) }).catch(() => { });
          // #endregion
          const response = await api.post('/v1/auth/login', { email, password });
          // #region agent log
          fetch('http://127.0.0.1:7242/ingest/344d8f42-c2de-485e-8e1f-b018a2df1d67', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'authStore.js:87', message: 'login API response received', data: { status: response.status, hasData: !!response.data, hasUser: !!response.data?.data?.user, hasTokens: !!response.data?.data?.accessToken }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run1', hypothesisId: 'E' }) }).catch(() => { });
          // #endregion
          const { user, accessToken, refreshToken } = response.data.data;

          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            isInitialized: true,
          });

          return { success: true };
        } catch (error) {
          // #region agent log
          fetch('http://127.0.0.1:7242/ingest/344d8f42-c2de-485e-8e1f-b018a2df1d67', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'authStore.js:100', message: 'login API error', data: { message: error.message, status: error.response?.status, responseMessage: error.response?.data?.message, responseData: error.response?.data, hasRequest: !!error.request }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run1', hypothesisId: 'F' }) }).catch(() => { });
          // #endregion
          // Provide more descriptive error messages
          let errorMessage = 'Login failed';
          
          // Check for network error (no response at all)
          if (error.message === 'Network Error' || error.code === 'ERR_NETWORK' || (!error.response && !error.response?.status)) {
            errorMessage = 'Cannot connect to server. Please make sure the backend server is running.';
          } else if (error.response?.status === 401) {
            // Authentication failed - wrong credentials
            errorMessage = error.response?.data?.message || 'Invalid email or password.';
          } else if (error.response?.status === 403) {
            // Account issues (banned, etc.)
            errorMessage = error.response?.data?.message || 'Account access denied.';
          } else if (error.response?.status === 429) {
            // Rate limited
            errorMessage = error.response?.data?.message || 'Too many login attempts. Please try again later.';
          } else if (error.response?.data?.message) {
            // Other server errors with message
            errorMessage = error.response.data.message;
          }
          set({
            isLoading: false,
            error: errorMessage,
          });
          return {
            success: false,
            error: errorMessage,
          };
        }
      },

      // Register
      register: async (data) => {
        try {
          set({ isLoading: true, error: null });

          const response = await api.post('/v1/auth/register', data);
          const responseData = response.data.data;

          // Check if email verification is required
          if (responseData.requiresVerification) {
            set({
              isLoading: false,
              isAuthenticated: false,
            });
            return {
              success: true,
              requiresVerification: true,
              email: data.email,
              message: responseData.message
            };
          }

          // Old flow (if verification not required)
          const { user, accessToken, refreshToken } = responseData;
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            isInitialized: true,
          });

          return { success: true };
        } catch (error) {
          set({
            isLoading: false,
            error: error.response?.data?.message || 'Registration failed',
          });
          return {
            success: false,
            error: error.response?.data?.message || 'Registration failed',
          };
        }
      },

      // Verify Email
      verifyEmail: async (email, code) => {
        try {
          set({ isLoading: true, error: null });

          const response = await api.post('/v1/auth/verify-email', { email, code });
          const { user, accessToken, refreshToken } = response.data.data;

          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            isInitialized: true,
          });

          return { success: true };
        } catch (error) {
          set({
            isLoading: false,
            error: error.response?.data?.message || 'Verification failed',
          });
          return {
            success: false,
            error: error.response?.data?.message || 'Verification failed',
          };
        }
      },

      // Resend Verification Code
      resendVerificationCode: async (email) => {
        try {
          set({ isLoading: true, error: null });
          await api.post('/v1/auth/resend-verification', { email });
          set({ isLoading: false });
          return { success: true };
        } catch (error) {
          set({
            isLoading: false,
            error: error.response?.data?.message || 'Failed to resend code',
          });
          return {
            success: false,
            error: error.response?.data?.message || 'Failed to resend code',
          };
        }
      },

      // Logout
      logout: async () => {
        try {
          const refreshToken = localStorage.getItem('refreshToken');
          if (refreshToken) {
            await api.post('/v1/auth/logout', { refreshToken });
          }
        } catch (error) {
          console.error('Logout error:', error);
        } finally {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          set({
            user: null,
            isAuthenticated: false,
            isInitialized: true,
          });
        }
      },

      // Update user data
      updateUser: (userData) => {
        set((state) => ({
          user: { ...state.user, ...userData },
        }));
      },

      // Refresh balance
      refreshBalance: async () => {
        try {
          const response = await api.get('/v1/users/profile');
          set((state) => ({
            user: { ...state.user, balance: response.data.data.balance },
          }));
        } catch (error) {
          console.error('Failed to refresh balance:', error);
        }
      },

      // Clear error
      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        // Don't persist isAuthenticated, isLoading, or isInitialized
        // These should always be reset on page load to prevent stuck states
        // Only persist user data for faster initial render
        user: state.user,
      }),
    }
  )
);

export default useAuthStore;
