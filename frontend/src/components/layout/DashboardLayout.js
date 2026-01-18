/**
 * Dashboard Layout Component
 */

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Sidebar from './Sidebar';
import Header from './Header';
import useAuthStore from '../../store/authStore';
import { LoadingScreen } from '../ui';

export default function DashboardLayout({ children, isAdmin = false }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const { isAuthenticated, isLoading, isInitialized, user, initialize } = useAuthStore();
  const router = useRouter();
  const navigationHandled = useRef(false);

  // Initialize auth on mount
  useEffect(() => {
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  // Check maintenance mode for admin banner padding
  useEffect(() => {
    const checkMaintenance = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const response = await fetch(`${API_URL}/v1/public/maintenance`);
        const data = await response.json();
        setIsMaintenanceMode(data.success && data.data?.maintenance);
      } catch {
        setIsMaintenanceMode(false);
      }
    };
    
    if (user?.role === 'ADMIN') {
      checkMaintenance();
      const interval = setInterval(checkMaintenance, 30000);
      return () => clearInterval(interval);
    }
  }, [user?.role]);

  // Redirect to login if not authenticated (only after initialization is complete)
  useEffect(() => {
    // Wait for initialization to complete before redirecting
    if (!isInitialized || isLoading) {
      return;
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated && !navigationHandled.current) {
      const currentPath = router.pathname;
      if (currentPath !== '/login' && currentPath !== '/register' && currentPath !== '/') {
        navigationHandled.current = true;
        router.replace('/login');
      }
    }

    // Reset flag when authenticated
    if (isAuthenticated) {
      navigationHandled.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized, isLoading, isAuthenticated]);

  // Redirect non-admin users away from admin pages
  useEffect(() => {
    if (!isInitialized || isLoading) {
      return;
    }

    if (isAuthenticated && isAdmin && user?.role !== 'ADMIN' && !navigationHandled.current) {
      if (router.pathname !== '/dashboard') {
        navigationHandled.current = true;
        router.replace('/dashboard');
      }
    }

    if (!isAdmin || user?.role === 'ADMIN') {
      navigationHandled.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized, isLoading, isAuthenticated, isAdmin, user?.role]);

  // Show loading screen while initializing
  if (!isInitialized || isLoading) {
    return <LoadingScreen />;
  }

  // Don't render if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null;
  }

  // Don't render if non-admin trying to access admin page (will redirect)
  if (isAdmin && user?.role !== 'ADMIN') {
    return null;
  }

  // Show admin maintenance banner padding
  const showAdminBannerPadding = user?.role === 'ADMIN' && isMaintenanceMode;

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 flex ${showAdminBannerPadding ? 'pt-10' : ''}`}>
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isAdmin={isAdmin}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 px-4 pb-6 pt-4 lg:px-6 lg:pb-8 lg:pt-6">
          <div className="max-w-6xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
