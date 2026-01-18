/**
 * Admin Settings Page
 * Premium Dark Theme Design
 */

import { useState, useEffect } from 'react';
import { DashboardLayout } from '../../components/layout';
import {
  Card,
  CardBody,
  Button,
  Input,
  Select,
  Textarea,
  LoadingScreen,
} from '../../components/ui';
import api from '../../lib/api';
import useAuthStore from '../../store/authStore';
import { Settings, Save, RefreshCw, Globe, DollarSign, Bell, Shield, AlertTriangle, Target, Sparkles, Clock, Zap, Calendar, Timer, Power } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const defaultSettings = {
  // General
  siteName: { value: 'SMB Panel', label: 'Site Name', type: 'text', section: 'general', icon: Globe },
  siteDescription: { value: 'Social Media Marketing Panel', label: 'Site Description', type: 'textarea', section: 'general', icon: Globe },
  siteUrl: { value: 'https://example.com', label: 'Site URL', type: 'text', section: 'general', icon: Globe },

  // Currency
  defaultCurrency: {
    value: 'USD',
    label: 'Default Currency',
    type: 'select',
    section: 'currency',
    icon: DollarSign,
    options: [
      { value: 'PHP', label: 'PHP (₱ Peso)' },
      { value: 'USD', label: 'USD ($ Dollar)' },
    ],
  },
  currencySymbol: { value: '$', label: 'Currency Symbol', type: 'text', section: 'currency', icon: DollarSign },

  // Notifications
  emailNotifications: { value: true, label: 'Enable Email Notifications', type: 'checkbox', section: 'notifications', icon: Bell },
  maintenanceMode: { value: false, label: 'Maintenance Mode', type: 'maintenance', section: 'general', icon: Settings },
  maintenanceDuration: { value: 1, label: 'Maintenance Duration (hours)', type: 'hidden', section: 'general', icon: Settings, min: 0, max: 168 }, // 0 = indefinitely, max 168 hours (7 days)

  // Security
  minPasswordLength: { value: 8, label: 'Minimum Password Length', type: 'number', section: 'security', icon: Shield },
  maxLoginAttempts: { value: 5, label: 'Max Login Attempts', type: 'number', section: 'security', icon: Shield },
  sessionTimeout: { value: 3600, label: 'Session Timeout (seconds)', type: 'number', section: 'security', icon: Shield },
};

const sections = [
  { id: 'general', name: 'General', icon: Settings },
  { id: 'currency', name: 'Currency', icon: DollarSign },
  { id: 'notifications', name: 'Notifications', icon: Bell },
  { id: 'security', name: 'Security', icon: Shield },
];

export default function AdminSettingsPage() {
  const queryClient = useQueryClient();
  const { isAuthenticated, user, isLoading: authLoading } = useAuthStore();
  const [activeSection, setActiveSection] = useState('general');
  const [formData, setFormData] = useState({});

  // Fetch settings - only run when authenticated and user is admin
  const { data: settingsData, isLoading: settingsLoading } = useQuery({
    queryKey: ['admin', 'settings'],
    queryFn: async () => {
      const response = await api.get('/v1/admin/settings');
      return response.data.data || {};
    },
    enabled: !authLoading && isAuthenticated && user?.role === 'ADMIN',
    retry: false,
  });

  const isLoading = authLoading || settingsLoading;

  // Initialize form data when settings are loaded
  useEffect(() => {
    if (settingsData) {
      const formState = {};
      Object.keys(defaultSettings).forEach((key) => {
        // Special handling for maintenanceMode - extract boolean from object
        if (key === 'maintenanceMode' && typeof settingsData[key] === 'object' && settingsData[key] !== null) {
          formState[key] = Boolean(settingsData[key].enabled);
          // Also set duration from expiry if available
          if (settingsData[key].expiry) {
            const durationHours = Math.round((settingsData[key].expiry - Date.now()) / (60 * 60 * 1000));
            formState['maintenanceDuration'] = Math.max(1, durationHours);
          }
        } else {
          formState[key] = settingsData[key] !== undefined ? settingsData[key] : defaultSettings[key].value;
        }
      });
      setFormData(formState);
    }
  }, [settingsData]);

  // Update settings mutation
  const updateSettings = useMutation({
    mutationFn: async (data) => {
      const response = await api.patch('/v1/admin/settings', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'settings'] });
      toast.success('Settings updated successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update settings');
    },
  });

  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));

    // Auto-fill currency symbol when changing default currency (still editable)
    if (key === 'defaultCurrency') {
      const symbol = value === 'PHP' ? '₱' : value === 'USD' ? '$' : '';
      setFormData((prev) => ({
        ...prev,
        defaultCurrency: value,
        ...(symbol ? { currencySymbol: symbol } : {}),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Process maintenance mode to include expiry time
    const processedFormData = { ...formData };

    if (formData.maintenanceMode) {
      // If maintenance mode is enabled, calculate expiry based on duration
      if (formData.maintenanceDuration > 0) {
        const expiryTime = Date.now() + (formData.maintenanceDuration * 60 * 60 * 1000); // Convert hours to milliseconds
        processedFormData.maintenanceMode = {
          enabled: true,
          expiry: expiryTime,
          reason: 'Scheduled maintenance'
        };
      } else {
        // If duration is 0, set indefinite maintenance mode
        processedFormData.maintenanceMode = {
          enabled: true,
          expiry: null,
          reason: 'Indefinite maintenance'
        };
      }
    } else {
      // If maintenance mode is disabled
      processedFormData.maintenanceMode = {
        enabled: false,
        expiry: null,
        reason: null
      };
    }

    updateSettings.mutate(processedFormData);
  };

  const handleReset = () => {
    if (!window.confirm('Are you sure you want to reset all settings to default values?')) return;

    const resetData = {};
    Object.keys(defaultSettings).forEach((key) => {
      resetData[key] = defaultSettings[key].value;
    });
    setFormData(resetData);
  };

  if (isLoading) {
    return (
      <DashboardLayout isAdmin>
        <LoadingScreen />
      </DashboardLayout>
    );
  }

  // Merge default settings with loaded settings and form data
  const currentSettings = { ...defaultSettings };
  Object.keys(currentSettings).forEach((key) => {
    if (formData[key] !== undefined) {
      currentSettings[key].value = formData[key];
    } else if (settingsData && settingsData[key] !== undefined) {
      // Handle maintenance mode object format
      if (key === 'maintenanceMode' && typeof settingsData[key] === 'object' && settingsData[key] !== null) {
        currentSettings[key].value = settingsData[key].enabled || false;
        // Set the maintenanceDuration based on the expiry time
        if (settingsData[key].expiry) {
          const durationHours = Math.round((settingsData[key].expiry - Date.now()) / (60 * 60 * 1000));
          setFormData(prev => ({ ...prev, maintenanceDuration: Math.max(1, durationHours) }));
        }
      } else {
        currentSettings[key].value = settingsData[key];
      }
    }
  });

  const sectionSettings = Object.entries(currentSettings).filter(
    ([, setting]) => setting.section === activeSection
  );

  const activeSectionInfo = sections.find((s) => s.id === activeSection);

  return (
    <DashboardLayout isAdmin>
      <div className="space-y-6">
        {/* Premium Hero Header */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-700/50 bg-gradient-to-br from-slate-900 via-slate-800/90 to-slate-900 shadow-2xl">
          {/* Animated Background Effects */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-gradient-to-br from-violet-500/30 to-purple-500/20 blur-3xl animate-pulse" />
            <div className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiLz48cGF0aCBkPSJNNDAgMEgwdjQwaDQwVjB6TTEgMXYzOGgzOFYxSDF6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIi8+PC9nPjwvc3ZnPg==')] opacity-50" />
          </div>

          <div className="relative px-6 py-8 md:px-8 md:py-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="space-y-4">
                {/* Status Badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-violet-300 backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-400"></span>
                  </span>
                  System Configuration
                </div>

                {/* Title Section */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/30">
                      <Settings className="h-7 w-7 text-white" />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-white to-slate-400 bg-clip-text text-transparent">
                      Settings
                    </h1>
                    <p className="text-base text-slate-400 flex items-center gap-2">
                      <Target className="h-4 w-4 text-violet-400" />
                      Manage system-wide settings and configurations
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Maintenance Mode Warning */}
        {formData.maintenanceMode && (
          <div className="relative overflow-hidden rounded-2xl border border-amber-500/50 bg-amber-500/10 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-orange-500/5" />
            <div className="relative flex items-start gap-4 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 ring-1 ring-amber-500/30 flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-amber-200">
                  Maintenance Mode is Active
                </p>
                <p className="text-sm text-amber-300/80 mt-1">
                  Regular users cannot access the system. Only admins can use the panel while maintenance mode is enabled.
                </p>
                <p className="text-xs text-amber-400/70 mt-2 font-medium flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Note: Please do not logout while maintenance mode is active. If you need to logout, you can still login again (admin login works even during maintenance).
                </p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar - Section Navigation */}
            <div className="lg:col-span-1">
              <div className="rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm overflow-hidden">
                <div className="p-4">
                  <nav className="space-y-2">
                    {sections.map((section) => {
                      const Icon = section.icon;
                      const isActive = activeSection === section.id;
                      const colorMap = {
                        general: { active: 'border-violet-500/50 bg-violet-500/20 text-violet-400', icon: 'bg-violet-500/20 ring-violet-500/30 text-violet-400' },
                        currency: { active: 'border-emerald-500/50 bg-emerald-500/20 text-emerald-400', icon: 'bg-emerald-500/20 ring-emerald-500/30 text-emerald-400' },
                        notifications: { active: 'border-amber-500/50 bg-amber-500/20 text-amber-400', icon: 'bg-amber-500/20 ring-amber-500/30 text-amber-400' },
                        security: { active: 'border-cyan-500/50 bg-cyan-500/20 text-cyan-400', icon: 'bg-cyan-500/20 ring-cyan-500/30 text-cyan-400' },
                      };
                      const colors = colorMap[section.id] || colorMap.general;

                      return (
                        <button
                          key={section.id}
                          type="button"
                          onClick={() => setActiveSection(section.id)}
                          className={`group w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 border ${isActive
                              ? colors.active
                              : 'border-transparent text-slate-400 hover:text-white hover:bg-slate-700/50'
                            }`}
                        >
                          <div className={`flex h-8 w-8 items-center justify-center rounded-lg ring-1 transition-all ${isActive ? colors.icon : 'bg-slate-700/50 ring-slate-600/50 text-slate-400 group-hover:bg-slate-600/50'
                            }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          {section.name}
                        </button>
                      );
                    })}
                  </nav>
                </div>
              </div>
            </div>

            {/* Main Content - Settings Form */}
            <div className="lg:col-span-3 space-y-6">
              <div className="rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm overflow-hidden">
                <div className="p-6">
                  {/* Section Header */}
                  <div className="flex items-center gap-4 mb-8">
                    {activeSectionInfo && (
                      <>
                        {(() => {
                          const headerColorMap = {
                            general: { gradient: 'from-violet-500 to-purple-600', shadow: 'shadow-violet-500/30', icon: 'text-white' },
                            currency: { gradient: 'from-emerald-500 to-cyan-600', shadow: 'shadow-emerald-500/30', icon: 'text-white' },
                            notifications: { gradient: 'from-amber-500 to-orange-600', shadow: 'shadow-amber-500/30', icon: 'text-white' },
                            security: { gradient: 'from-cyan-500 to-blue-600', shadow: 'shadow-cyan-500/30', icon: 'text-white' },
                          };
                          const headerColors = headerColorMap[activeSection] || headerColorMap.general;
                          return (
                            <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${headerColors.gradient} shadow-lg ${headerColors.shadow}`}>
                              <activeSectionInfo.icon className={`w-6 h-6 ${headerColors.icon}`} />
                            </div>
                          );
                        })()}
                        <div>
                          <h2 className="text-xl font-bold text-white">
                            {activeSectionInfo.name} Settings
                          </h2>
                          <p className="text-sm text-slate-400">
                            Configure {activeSectionInfo.name.toLowerCase()} preferences
                          </p>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Settings Fields */}
                  <div className="space-y-6">
                    {sectionSettings.map(([key, setting]) => {
                      const Icon = setting.icon;

                      // Skip hidden fields (like maintenanceDuration which is now integrated into maintenance mode UI)
                      if (setting.type === 'hidden') {
                        return null;
                      }

                      // Skip maintenanceDuration if we're not in the general section or if maintenance mode is not enabled
                      if (key === 'maintenanceDuration' && activeSection !== 'general') {
                        return null;
                      }

                      // Show maintenance duration field only when maintenance mode is enabled
                      if (key === 'maintenanceDuration') {
                        if (!(formData.maintenanceMode ||
                          (typeof formData.maintenanceMode === 'object' && formData.maintenanceMode?.enabled) ||
                          (typeof settingsData?.maintenanceMode === 'object' && settingsData.maintenanceMode?.enabled))) {
                          return null;
                        }
                      }

                      return (
                        <div key={key} className="space-y-2">
                          <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
                            <Icon className="w-4 h-4 text-slate-400" />
                            {setting.label}
                          </label>

                          {setting.type === 'textarea' ? (
                            <Textarea
                              value={formData[key] ?? setting.value ?? ''}
                              onChange={(e) => handleChange(key, e.target.value)}
                              className="w-full bg-slate-900/50 border-slate-600 text-white placeholder-slate-500 focus:border-violet-500 focus:ring-violet-500/20"
                              rows={3}
                            />
                          ) : setting.type === 'checkbox' ? (
                            <label className="flex items-center gap-3 cursor-pointer group">
                              <div className="relative">
                                <input
                                  type="checkbox"
                                  checked={formData[key] ?? setting.value ?? false}
                                  onChange={(e) => {
                                    handleChange(key, e.target.checked);
                                    // If toggling maintenance mode off, reset duration to default
                                    if (key === 'maintenanceMode' && !e.target.checked) {
                                      setFormData(prev => ({ ...prev, maintenanceDuration: 1 }));
                                    }
                                  }}
                                  className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-violet-500/30 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-slate-400 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600 peer-checked:after:bg-white"></div>
                              </div>
                              <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                                {(formData[key] ?? setting.value) ? 'Enabled' : 'Disabled'}
                              </span>
                            </label>
                          ) : setting.type === 'number' ? (
                            <Input
                              type="number"
                              min={setting.min}
                              max={setting.max}
                              value={formData[key] ?? setting.value ?? ''}
                              onChange={(e) => {
                                const value = key === 'maintenanceDuration'
                                  ? Math.max(setting.min || 0, Math.min(setting.max || Infinity, Number(e.target.value)))
                                  : parseFloat(e.target.value) || 0;
                                handleChange(key, value);
                              }}
                              className="w-full bg-slate-900/50 border-slate-600 text-white placeholder-slate-500 focus:border-violet-500 focus:ring-violet-500/20"
                            />
                          ) : setting.type === 'select' ? (
                            <Select
                              value={formData[key] ?? setting.value ?? ''}
                              onChange={(e) => handleChange(key, e.target.value)}
                              options={setting.options || []}
                              className="w-full bg-slate-900/50 border-slate-600 text-white"
                            />
                          ) : setting.type === 'maintenance' ? (
                            <div className="space-y-4">
                              {/* Toggle Switch with Enabled/Disabled label */}
                              <label className="flex items-center gap-3 cursor-pointer group">
                                <div className="relative">
                                  <input
                                    type="checkbox"
                                    checked={formData[key] ?? setting.value ?? false}
                                    onChange={(e) => {
                                      handleChange(key, e.target.checked);
                                      if (!e.target.checked) {
                                        setFormData(prev => ({ ...prev, maintenanceDuration: 1 }));
                                      }
                                    }}
                                    className="sr-only peer"
                                  />
                                  <div className="w-12 h-6 bg-slate-700/80 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-slate-400 after:rounded-full after:h-5 after:w-5 after:transition-all after:duration-300 peer-checked:bg-gradient-to-r peer-checked:from-violet-500 peer-checked:to-purple-500 peer-checked:after:bg-white peer-focus:ring-2 peer-focus:ring-violet-500/30 transition-all duration-300 shadow-inner"></div>
                                </div>
                                <span className={`text-sm font-medium transition-colors ${(formData[key] ?? setting.value) ? 'text-violet-300' : 'text-slate-400'}`}>
                                  {(formData[key] ?? setting.value) ? 'Enabled' : 'Disabled'}
                                </span>
                              </label>

                              {/* Duration Controls - Only show when maintenance is enabled */}
                              {formData[key] && (
                                <div className="mt-4 p-4 rounded-xl bg-slate-900/70 border border-slate-700/50 space-y-4">
                                  <div className="flex items-center gap-2 text-sm font-medium text-slate-300">
                                    <Timer className="w-4 h-4 text-violet-400" />
                                    Duration
                                  </div>

                                  {/* Preset Duration Buttons */}
                                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                                    {[
                                      { value: 1, label: '1h', icon: Clock },
                                      { value: 2, label: '2h', icon: Clock },
                                      { value: 4, label: '4h', icon: Clock },
                                      { value: 12, label: '12h', icon: Clock },
                                      { value: 24, label: '24h', icon: Calendar },
                                      { value: 0, label: '∞', icon: Zap, tooltip: 'Indefinite' },
                                    ].map((preset) => {
                                      const PresetIcon = preset.icon;
                                      const isSelected = formData.maintenanceDuration === preset.value;
                                      return (
                                        <button
                                          key={preset.value}
                                          type="button"
                                          onClick={() => handleChange('maintenanceDuration', preset.value)}
                                          title={preset.tooltip || `${preset.label} duration`}
                                          className={`relative flex flex-col items-center justify-center py-3 px-2 rounded-lg border transition-all duration-200 ${isSelected
                                              ? 'bg-gradient-to-br from-violet-600/30 to-purple-600/30 border-violet-500/50 text-violet-300 shadow-lg shadow-violet-500/20'
                                              : 'bg-slate-800/50 border-slate-700/50 text-slate-400 hover:border-slate-600 hover:text-slate-300 hover:bg-slate-700/50'
                                            }`}
                                        >
                                          <PresetIcon className={`w-4 h-4 mb-1 ${isSelected ? 'text-violet-400' : 'text-slate-500'}`} />
                                          <span className="text-sm font-semibold">{preset.label}</span>
                                          {isSelected && (
                                            <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
                                          )}
                                        </button>
                                      );
                                    })}
                                  </div>

                                  {/* Custom Duration Input */}
                                  <div className="flex items-center gap-3">
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2">
                                        <input
                                          type="number"
                                          min="0"
                                          max="168"
                                          value={formData.maintenanceDuration ?? 1}
                                          onChange={(e) => {
                                            const val = Math.max(0, Math.min(168, Number(e.target.value)));
                                            handleChange('maintenanceDuration', val);
                                          }}
                                          className="w-24 px-3 py-2 rounded-lg bg-slate-800 border border-slate-600 text-white text-center font-mono text-lg focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 focus:outline-none"
                                        />
                                        <span className="text-slate-400 text-sm">hours</span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Estimated End Time */}
                                  <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/50 border border-slate-700/30">
                                    <Calendar className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                                    <div>
                                      <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Estimated End Time</p>
                                      <p className="text-sm font-medium text-slate-200">
                                        {formData.maintenanceDuration === 0
                                          ? 'No automatic end - Manual disable required'
                                          : new Date(Date.now() + formData.maintenanceDuration * 60 * 60 * 1000).toLocaleString('en-US', {
                                            weekday: 'short',
                                            month: 'short',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: true
                                          })
                                        }
                                      </p>
                                    </div>
                                  </div>

                                  {/* Info text */}
                                  <p className="text-xs text-slate-500 flex items-start gap-2">
                                    <Sparkles className="w-3 h-3 mt-0.5 flex-shrink-0 text-violet-400" />
                                    <span>Maintenance mode will automatically disable after the set duration. Set to 0 or ∞ for indefinite maintenance.</span>
                                  </p>
                                </div>
                              )}
                            </div>
                          ) : (
                            <Input
                              type="text"
                              value={formData[key] ?? setting.value ?? ''}
                              onChange={(e) => handleChange(key, e.target.value)}
                              className="w-full bg-slate-900/50 border-slate-600 text-white placeholder-slate-500 focus:border-violet-500 focus:ring-violet-500/20"
                            />
                          )}
                          {key === 'maintenanceDuration' && (
                            <p className="text-xs text-slate-500 mt-1">Enter 0 for indefinite maintenance mode, or number of hours to auto-disable</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleReset}
                  className="text-slate-400 border border-slate-600 hover:text-white hover:bg-slate-700/50 hover:border-slate-500"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset to Defaults
                </Button>
                <Button
                  type="submit"
                  isLoading={updateSettings.isPending}
                  className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white shadow-lg shadow-violet-500/30 border-0"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Settings
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}

AdminSettingsPage.getLayout = function getLayout(page) {
  return <DashboardLayout isAdmin>{page}</DashboardLayout>;
};
