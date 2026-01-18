/**
 * Maintenance Mode Component
 * 
 * Shows a maintenance overlay when the system is under maintenance.
 * For admins, shows a warning banner instead of blocking access.
 * Excludes public pages (login, register, etc.) from maintenance mode.
 * Listens to the 'maintenance-mode' custom event from API interceptor.
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Settings, RefreshCw, AlertTriangle, X, Clock, Sparkles } from 'lucide-react';
import { Button } from './ui';
import useAuthStore from '../store/authStore';

// Pages that should NOT show maintenance mode (public pages)
// Note: Home page (/) will show maintenance mode for non-admin users
const EXCLUDED_PATHS = [
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
];

export default function MaintenanceMode() {
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const [showAdminBanner, setShowAdminBanner] = useState(true);
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();

  // Check if current path should be excluded from maintenance mode
  const isExcludedPath = EXCLUDED_PATHS.some(path => 
    router.pathname === path || router.pathname.startsWith(path + '/')
  );

  useEffect(() => {
    // Listen for maintenance mode event from API interceptor
    const handleMaintenanceMode = (event) => {
      if (event.detail?.enabled) {
        setIsMaintenanceMode(true);
        // Store maintenance data in localStorage for display purposes
        if (event.detail.data) {
          localStorage.setItem('maintenanceData', JSON.stringify(event.detail.data));
        }
      } else {
        setIsMaintenanceMode(false);
        localStorage.removeItem('maintenanceData');
      }
    };
      
    window.addEventListener('maintenance-mode', handleMaintenanceMode);
  
    // Check maintenance status on mount and when user changes
    checkMaintenanceStatus();
  
    // Re-check every 3 seconds for real-time updates (no reload needed)
    const interval = setInterval(checkMaintenanceStatus, 3000);
  
    return () => {
      window.removeEventListener('maintenance-mode', handleMaintenanceMode);
      clearInterval(interval);
    };
  }, [user]);

  const checkMaintenanceStatus = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${API_URL}/v1/public/maintenance`);
      const data = await response.json();
      
      if (data.success && data.data?.maintenance) {
        setIsMaintenanceMode(true);
        // Store maintenance data in localStorage for display purposes
        localStorage.setItem('maintenanceData', JSON.stringify(data.data));
      } else {
        setIsMaintenanceMode(false);
        localStorage.removeItem('maintenanceData');
      }
    } catch (error) {
      // If can't reach server, don't show maintenance
      console.error('Failed to check maintenance status:', error);
    }
  };

  const handleRefresh = () => {
    checkMaintenanceStatus();
  };

  // Not in maintenance mode
  if (!isMaintenanceMode) {
    return null;
  }

  // Don't show maintenance on excluded paths (login, register, etc.)
  // This allows users to login first, then we check if they're admin
  if (isExcludedPath) {
    return null;
  }

  // Admin user - show warning banner only
  if (user?.role === 'ADMIN') {
    if (!showAdminBanner) return null;
    
    return (
      <div className="fixed top-0 left-0 right-0 z-[9998]">
        <div className="bg-slate-900 border-b border-slate-700 px-4 py-2.5">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            {/* Left side */}
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-7 h-7 rounded-full bg-amber-500">
                <AlertTriangle className="w-4 h-4 text-white" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white">Maintenance Mode</span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-amber-500 text-white rounded">ACTIVE</span>
              </div>
              <span className="hidden sm:block text-slate-600">•</span>
              <span className="hidden sm:block text-sm text-slate-400">Regular users cannot access the system</span>
            </div>
            {/* Right side */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-emerald-500/20 rounded-full">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-xs font-medium text-emerald-400">Admin Access</span>
              </div>
              <button
                onClick={() => setShowAdminBanner(false)}
                className="p-1.5 hover:bg-slate-700 rounded-lg transition-colors"
                title="Dismiss"
              >
                <X className="w-4 h-4 text-slate-400 hover:text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />

      {/* Animated orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-64 md:w-96 h-64 md:h-96 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-64 md:w-96 h-64 md:h-96 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-gradient-to-r from-amber-500/5 to-cyan-500/5 rounded-full blur-3xl" />
      </div>

      {/* Floating particles - hidden on mobile for performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative text-center px-4 sm:px-6 py-8 sm:py-12 max-w-xl mx-auto">
        {/* Animated icon container */}
        <div className="mb-8 md:mb-10 relative">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-28 h-28 sm:w-40 sm:h-40 rounded-full border-2 border-dashed border-amber-500/20 animate-spin" style={{ animationDuration: '20s' }} />
          </div>
          {/* Middle pulsing ring */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border border-amber-500/30 animate-ping" style={{ animationDuration: '2s' }} />
          </div>
          {/* Inner glow */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 blur-xl" />
          </div>
          {/* Icon container */}
          <div className="relative inline-flex items-center justify-center w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-amber-500/30 to-orange-500/30 backdrop-blur-sm border border-amber-500/30 shadow-lg shadow-amber-500/20">
            <Settings className="w-10 h-10 sm:w-14 sm:h-14 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
          </div>
        </div>

        {/* Title with gradient */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent">
          Under Maintenance
        </h1>

        {/* Subtitle */}
        <p className="text-amber-400/80 font-medium mb-3 sm:mb-4 flex items-center justify-center gap-2 text-sm sm:text-base">
          <Sparkles className="w-4 h-4" />
          We&apos;re making things better
          <Sparkles className="w-4 h-4" />
        </p>

        {/* Description */}
        <p className="text-base sm:text-lg text-slate-400 mb-6 sm:mb-8 leading-relaxed max-w-md mx-auto px-2">
          Our team is performing scheduled maintenance to enhance your experience. 
          We&apos;ll be back shortly!
        </p>

        {/* Progress bar - Clean indeterminate loader */}
        <div className="w-full max-w-xs sm:max-w-md mx-auto mb-6 sm:mb-8">
          {/* Track */}
          <div className="h-2 bg-slate-800/90 rounded-full overflow-hidden ring-1 ring-slate-700/50">
            {/* Progress bar */}
            <div 
              className="h-full w-2/5 rounded-full"
              style={{ 
                background: 'linear-gradient(90deg, #f59e0b, #fbbf24, #f59e0b)',
                animation: 'loading 1.8s ease-in-out infinite' 
              }}
            />
          </div>
        </div>

        {/* Status cards */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center mb-6 sm:mb-8 px-2">
          <div className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50">
            <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-amber-500"></span>
            </span>
            <span className="text-slate-300 text-xs sm:text-sm font-medium">Maintenance in progress</span>
          </div>
          <div className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50">
            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
            <span className="text-slate-300 text-xs sm:text-sm font-medium">
              {(() => {
                if (typeof window !== 'undefined') {
                  const maintenanceData = JSON.parse(localStorage.getItem('maintenanceData') || '{}');
                  if (maintenanceData.timeRemaining !== null && maintenanceData.timeRemaining > 0) {
                    const hours = Math.floor(maintenanceData.timeRemaining / (1000 * 60 * 60));
                    const minutes = Math.floor((maintenanceData.timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
                    if (hours > 0) {
                      return `Ends in: ${hours}h ${minutes}m`;
                    } else {
                      return `Ends in: ${minutes}m`;
                    }
                  } else if (maintenanceData.timeRemaining === 0 || (maintenanceData.expiry && maintenanceData.expiry <= Date.now())) {
                    return 'Ending soon...';
                  } else {
                    return 'Duration: Indefinite';
                  }
                }
                return 'Estimated: ~30 mins';
              })()}
            </span>
          </div>
        </div>

        {/* Refresh button */}
        <div className="flex justify-center">
          <Button
            onClick={handleRefresh}
            className="group relative bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl shadow-lg shadow-amber-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/30 hover:scale-105 text-sm sm:text-base"
          >
            <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:animate-spin" />
            Check Again
          </Button>
        </div>

        {/* Footer */}
        <p className="mt-8 sm:mt-10 text-xs sm:text-sm text-slate-600">
          Thank you for your patience. We appreciate your understanding.
        </p>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.2; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.5; }
        }
        @keyframes loading {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(150%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
}
