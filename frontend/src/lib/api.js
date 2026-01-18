/**
 * API Client Configuration
 */

import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor - Add auth token
api.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' 
      ? localStorage.getItem('accessToken') 
      : null;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - Handle token refresh and maintenance mode
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // #region agent log
    if (typeof window !== 'undefined') fetch('http://127.0.0.1:7242/ingest/344d8f42-c2de-485e-8e1f-b018a2df1d67',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'api.js:35',message:'API response error',data:{url:originalRequest?.url,method:originalRequest?.method,status:error.response?.status,statusText:error.response?.statusText,message:error.message},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'G'})}).catch(()=>{});
    // #endregion

    // Handle maintenance mode (503)
    if (error.response?.status === 503 && error.response?.data?.data?.maintenance) {
      // Dispatch custom event for maintenance mode
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('maintenance-mode', { 
          detail: { 
            enabled: true,
            data: error.response.data.data
          } 
        }));
      }
      return Promise.reject(error);
    }

    // If 401 and not already retried
    // Skip token refresh for auth endpoints (login, register, etc.)
    const isAuthEndpoint = originalRequest?.url?.includes('/auth/');
    if (error.response?.status === 401 && !originalRequest._retry && !isAuthEndpoint) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        
        if (!refreshToken) {
          throw new Error('No refresh token');
        }

        const response = await axios.post(`${API_URL}/v1/auth/refresh`, {
          refreshToken,
        });

        const { accessToken, refreshToken: newRefreshToken } = response.data.data;
        
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', newRefreshToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Clear tokens and redirect to login
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
