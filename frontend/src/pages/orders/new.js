/**
 * New Order Page - Premium Dark Theme Design
 */

import { useState, useMemo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { DashboardLayout } from '../../components/layout';
import { Button, Badge, LoadingScreen } from '../../components/ui';
import { useServices, useCreateOrder, useCategories, useComingSoonCount, useNotifyComingSoon } from '../../hooks/useApi';
import useAuthStore from '../../store/authStore';
import useCurrencyStore from '../../store/currencyStore';
import { getPlatformIcon } from '../../lib/utils';
import {
  ShoppingCart, Info, ChevronRight, Zap, Clock,
  TrendingUp, Wallet, Check, AlertCircle, Link2,
  Hash, Layers, Sparkles, ShieldAlert, Eye, Users, Globe, Languages,
  Rocket, Target, Package, Bell, Heart, MessageCircle, Share2, UserPlus,
  Play, ThumbsUp, Repeat, Star, HelpCircle, MousePointerClick, Search, X
} from 'lucide-react';

// Service Type Config - Icons, Labels, and Colors
const serviceTypeConfig = {
  followers: { icon: UserPlus, label: 'Followers', color: 'violet', emoji: '👥' },
  likes: { icon: Heart, label: 'Likes', color: 'pink', emoji: '❤️' },
  views: { icon: Play, label: 'Views', color: 'cyan', emoji: '👁️' },
  comments: { icon: MessageCircle, label: 'Comments', color: 'amber', emoji: '💬' },
  shares: { icon: Share2, label: 'Shares', color: 'emerald', emoji: '🔄' },
  members: { icon: Users, label: 'Members', color: 'blue', emoji: '👤' },
  subscribers: { icon: Bell, label: 'Subscribers', color: 'red', emoji: '🔔' },
  reactions: { icon: ThumbsUp, label: 'Reactions', color: 'orange', emoji: '👍' },
  retweets: { icon: Repeat, label: 'Retweets', color: 'sky', emoji: '🔁' },
  saves: { icon: Star, label: 'Saves', color: 'yellow', emoji: '⭐' },
  clicks: { icon: MousePointerClick, label: 'Clicks', color: 'indigo', emoji: '🖱️' },
  traffic: { icon: TrendingUp, label: 'Traffic', color: 'teal', emoji: '📈' },
  other: { icon: HelpCircle, label: 'Other', color: 'slate', emoji: '📦' },
};

// Get service type config with fallback
const getTypeConfig = (type) => {
  const normalizedType = type?.toLowerCase().trim();
  // Check for exact match first
  if (serviceTypeConfig[normalizedType]) {
    return serviceTypeConfig[normalizedType];
  }
  // Check if type contains any known keyword
  for (const [key, config] of Object.entries(serviceTypeConfig)) {
    if (normalizedType?.includes(key)) {
      return { ...config, label: type }; // Use original label if partial match
    }
  }
  // Fallback to other with original label
  return { ...serviceTypeConfig.other, label: type || 'Other' };
};

// Facebook Warning Translations
const facebookWarningTranslations = {
  tl: {
    title: '⚠️ Mahalagang Paalala para sa Facebook Orders',
    subtitle: 'Bago mag-place ng order, siguraduhin na ang iyong Facebook account settings ay naka-set sa',
    public: 'PUBLIC',
    followersTitle: 'Followers Setting',
    followersDesc: 'dapat naka-',
    followersPath: 'Settings → Privacy → Who can follow me → Public',
    contentTitle: 'Public Content',
    contentDesc: 'dapat naka-',
    contentPath: 'Settings → Privacy → Public posts → Public',
    visibilityTitle: 'Profile Visibility',
    visibilityDesc: 'dapat visible sa lahat',
    visibilityPath: 'Settings → Privacy → Who can see your future posts → Public',
    warningText: 'Kung hindi naka-PUBLIC ang settings,',
    warningBold: 'MAGIGING FAILED ang order mo',
    warningEnd: 'at hindi ma-refund.',
    confirmCheckbox: '✅ Naka-PUBLIC na lahat ng Facebook settings ko (Followers, Public Content, at Profile Visibility). Naiintindihan ko na hindi ma-refund kung mag-fail dahil sa privacy settings.',
    checkReminder: 'I-check muna ang confirmation sa itaas para makapag-place ng order.',
  },
  en: {
    title: '⚠️ Important Reminder for Facebook Orders',
    subtitle: 'Before placing an order, make sure your Facebook account settings are set to',
    public: 'PUBLIC',
    followersTitle: 'Followers Setting',
    followersDesc: 'must be set to',
    followersPath: 'Settings → Privacy → Who can follow me → Public',
    contentTitle: 'Public Content',
    contentDesc: 'must be set to',
    contentPath: 'Settings → Privacy → Public posts → Public',
    visibilityTitle: 'Profile Visibility',
    visibilityDesc: 'must be visible to everyone',
    visibilityPath: 'Settings → Privacy → Who can see your future posts → Public',
    warningText: 'If settings are not PUBLIC,',
    warningBold: 'YOUR ORDER WILL FAIL',
    warningEnd: 'and will not be refunded.',
    confirmCheckbox: '✅ All my Facebook settings are PUBLIC (Followers, Public Content, and Profile Visibility). I understand that orders cannot be refunded if they fail due to privacy settings.',
    checkReminder: 'Please check the confirmation above to place your order.',
  },
};

const orderSchema = z.object({
  serviceId: z.string().min(1, 'Please select a service'),
  link: z.string().url('Please enter a valid URL'),
  quantity: z.number().int().positive('Quantity must be positive'),
});

export default function NewOrderPage() {
  const { user, refreshBalance } = useAuthStore();
  const { formatAmount } = useCurrencyStore();
  const { data: services, isLoading: servicesLoading, isError: servicesError, error: servicesErrorData } = useServices({ limit: 5000 });
  const { data: allCategories, isLoading: categoriesLoading, isError: categoriesError, error: categoriesErrorData } = useCategories();

  const createOrder = useCreateOrder();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedService, setSelectedService] = useState(null);
  const [facebookConfirmed, setFacebookConfirmed] = useState(false);
  const [fbWarningLang, setFbWarningLang] = useState('tl'); // 'tl' for Tagalog, 'en' for English

  // Check if selected category is Facebook
  const isFacebookCategory = selectedCategory?.toLowerCase().includes('facebook');

  // Check if selected category is Telegram, Spotify, or Other (Coming Soon)
  const isTelegramCategory = selectedCategory?.toLowerCase().includes('telegram');
  const isSpotifyCategory = selectedCategory?.toLowerCase().includes('spotify');
  const isOtherCategory = selectedCategory?.toLowerCase() === 'other';
  const isComingSoonCategory = isTelegramCategory || isSpotifyCategory || isOtherCategory;

  // Coming Soon API hooks
  const comingSoonCategoryKey = isComingSoonCategory ? selectedCategory?.toLowerCase() : null;
  const { data: comingSoonCount = 0 } = useComingSoonCount(comingSoonCategoryKey);
  const notifyMutation = useNotifyComingSoon();
  const [isAnimating, setIsAnimating] = useState(false);
  const [showPlusOne, setShowPlusOne] = useState(false);
  const [clickEffects, setClickEffects] = useState([]);
  const [serviceSearch, setServiceSearch] = useState('');

  // Dynamic placeholder based on selected category
  const getLinkPlaceholder = () => {
    const cat = selectedCategory?.toLowerCase() || '';
    if (cat.includes('facebook')) return 'https://facebook.com/yourpage';
    if (cat.includes('instagram')) return 'https://instagram.com/yourprofile';
    if (cat.includes('tiktok')) return 'https://tiktok.com/@yourusername';
    if (cat.includes('youtube')) return 'https://youtube.com/watch?v=xxxxx';
    if (cat.includes('twitter') || cat.includes('x')) return 'https://x.com/yourusername';
    if (cat.includes('telegram')) return 'https://t.me/yourchannel';
    if (cat.includes('spotify')) return 'https://open.spotify.com/track/xxxxx';
    if (cat.includes('discord')) return 'https://discord.gg/xxxxx';
    if (cat.includes('twitch')) return 'https://twitch.tv/yourusername';
    return 'https://example.com/yourlink';
  };

  // Get current translations
  const fbText = facebookWarningTranslations[fbWarningLang];

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      quantity: 0,
    },
  });

  const watchQuantity = watch('quantity');
  const watchLink = watch('link');

  // Get all categories (from API) and group services by category
  const categories = useMemo(() => {
    if (!allCategories) {
      return [];
    }
    const filtered = allCategories.filter(cat => cat.isActive);
    const mapped = filtered.map(cat => cat.name);
    return mapped;
  }, [allCategories]);

  const groupedServices = useMemo(() => {
    if (!services) return {};
    return services.reduce((acc, service) => {
      const category = service.category?.name || 'Other';
      if (!acc[category]) acc[category] = [];
      acc[category].push(service);
      return acc;
    }, {});
  }, [services]);

  // Group services by type within the selected category
  const categoryServicesByType = useMemo(() => {
    if (!selectedCategory || !services) return {};
    const categoryServices = groupedServices[selectedCategory] || [];

    return categoryServices.reduce((acc, service) => {
      const type = (service.type || '').replace(/\s+/g, ' ').trim() || 'Other';
      if (!acc[type]) acc[type] = [];
      acc[type].push(service);
      return acc;
    }, {});
  }, [selectedCategory, services, groupedServices]);

  // Count total services per category
  const categoryServiceCounts = useMemo(() => {
    if (!services) return {};
    return Object.keys(groupedServices).reduce((acc, category) => {
      const categoryServices = groupedServices[category] || [];
      acc[category] = categoryServices.length;
      return acc;
    }, {});
  }, [services, groupedServices]);

  const categoryServices = selectedCategory ? groupedServices[selectedCategory] || [] : [];
  const serviceTypes = Object.keys(categoryServicesByType);
  const typeServices = selectedType ? categoryServicesByType[selectedType] || [] : [];
  
  // Filter services by search query
  const filteredTypeServices = useMemo(() => {
    if (!serviceSearch.trim()) return typeServices;
    const query = serviceSearch.toLowerCase().trim();
    return typeServices.filter(service => 
      service.name.toLowerCase().includes(query) ||
      service.description?.toLowerCase().includes(query)
    );
  }, [typeServices, serviceSearch]);

  // Quantity-based markup tiers for ALL services (lower qty = higher markup)
  const QUANTITY_MARKUP = [
    { maxQty: 100, markup: 11 },   // 100 qty = +₱11
    { maxQty: 250, markup: 8 },    // 101-250 qty = +₱8
    { maxQty: 500, markup: 5 },    // 251-500 qty = +₱5
    { maxQty: 750, markup: 3 },    // 501-750 qty = +₱3
    { maxQty: 999, markup: 1 },    // 751-999 qty = +₱1
    // 1000+ = no markup (best deal!)
  ];

  // Calculate quantity-based fee for ALL services (realtime)
  const quantityFee = useMemo(() => {
    if (!selectedService || !watchQuantity) return 0;
    
    for (const tier of QUANTITY_MARKUP) {
      if (watchQuantity <= tier.maxQty) {
        return tier.markup;
      }
    }
    
    // 1000+ = no fee (best deal!)
    return 0;
  }, [selectedService, watchQuantity]);

  // Calculate base total
  const baseTotal = useMemo(() => {
    if (!selectedService || !watchQuantity) return 0;
    return (parseFloat(selectedService.rate) * watchQuantity) / 1000;
  }, [selectedService, watchQuantity]);

  // Calculate total with fees
  const total = useMemo(() => {
    return baseTotal + quantityFee;
  }, [baseTotal, quantityFee]);

  const remainingBalance = (user?.balance || 0) - total;
  const hasInsufficientBalance = total > (user?.balance || 0);

  // Handle service selection
  const handleServiceChange = (serviceId) => {
    const service = services?.find((s) => s.id === serviceId);
    setSelectedService(service);
    if (service) {
      setValue('quantity', service.minQuantity);
    }
  };

  const onSubmit = async (data) => {
    try {
      await createOrder.mutateAsync(data);
      refreshBalance();
      reset();
      setSelectedService(null);
      setSelectedType('');
      setSelectedCategory('');
    } catch (error) {
      // Error handled by mutation
    }
  };

  if (servicesLoading || categoriesLoading) {
    return <LoadingScreen />;
  }

  if (servicesError || categoriesError) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Failed to load services</h2>
          <p className="text-gray-500 dark:text-gray-400">
            {servicesErrorData?.response?.data?.message || categoriesErrorData?.response?.data?.message || 'Please try refreshing the page'}
          </p>
          <Button
            onClick={() => window.location.reload()}
            className="mt-4"
          >
            Refresh Page
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Compact Hero Header */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/80 backdrop-blur-sm">
        {/* Subtle gradient accent */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-500 via-violet-500 to-amber-500" />

        <div className="relative px-4 py-4 md:px-6 md:py-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Left - Title */}
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/25">
                <ShoppingCart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white">
                  New Order
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Select a service to boost your presence
                </p>
              </div>
            </div>

            {/* Right - Balance */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/50">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                <Wallet className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Balance</p>
                <p className="text-lg font-bold text-emerald-500">
                  {formatAmount(user?.balance || 0)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Order Form */}
          <div className="lg:col-span-2 space-y-6">

            {/* Step 1: Category Selection */}
            <div className="rounded-xl border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-800/80">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500 text-white font-bold text-sm">
                    1
                  </div>
                  <h2 className="font-semibold text-slate-800 dark:text-white">Select Category</h2>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {categories.length === 0 ? (
                    <div className="col-span-full p-8 text-center text-slate-400">
                      <Package className="w-12 h-12 mx-auto mb-3 text-slate-500" />
                      <p>No categories available</p>
                    </div>
                  ) : (
                    categories.map((category) => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => {
                          setSelectedCategory(category);
                          setSelectedType('');
                          setSelectedService(null);
                          setValue('serviceId', '');
                          setFacebookConfirmed(false);
                          setServiceSearch(''); // Clear search when changing category
                        }}
                        className={`group relative p-3 rounded-lg border transition-all duration-200 text-left ${selectedCategory === category
                          ? 'border-cyan-500 bg-cyan-500/10'
                          : 'border-slate-200 dark:border-slate-700/50 hover:border-cyan-400/50 hover:bg-slate-50 dark:hover:bg-slate-700/30'
                          }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className={`font-medium text-sm ${selectedCategory === category ? 'text-cyan-500' : 'text-slate-800 dark:text-white'}`}>
                              {category}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              {categoryServiceCounts[category] || 0} services
                            </p>
                          </div>
                          {selectedCategory === category && (
                            <Check className="w-4 h-4 text-cyan-500" />
                          )}
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Step 2: Type Selection */}
            {selectedCategory && (
              <div className="rounded-xl border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-800/80">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500 text-white font-bold text-sm">
                      2
                    </div>
                    <h2 className="font-semibold text-slate-800 dark:text-white">Select Type</h2>
                  </div>
                </div>
                <div className="p-4">
                  {/* Telegram/Spotify Coming Soon */}
                  {isComingSoonCategory ? (
                    <div className="flex flex-col items-center justify-center py-8 px-4">
                      <div className="text-center space-y-4 max-w-md">
                        <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Coming soon</h3>
                        <div className="p-4 bg-slate-100 dark:bg-slate-700/50 rounded-xl">
                          <p className="text-slate-600 dark:text-slate-300">
                            We got your request! We are on it. Once available, we'll notify you.
                          </p>
                        </div>

                        {/* Notify Button */}
                        <div className="relative inline-block">
                          {/* Notification Badge - only show if count > 0 */}
                          {comingSoonCount > 0 && (
                            <div className={`absolute -top-3 -right-3 z-10 transition-transform duration-150 ${isAnimating ? 'scale-125' : 'scale-100'}`}>
                              <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold text-slate-900 bg-amber-400 rounded-full shadow-lg">
                                +{comingSoonCount.toLocaleString()}
                              </span>
                            </div>
                          )}

                          {/* Floating +1 animation */}
                          {showPlusOne && (
                            <div className="absolute -top-6 left-1/2 z-20 animate-float-up">
                              <span className="text-lg font-bold text-emerald-400 drop-shadow-glow">+1</span>
                            </div>
                          )}

                          {/* Sparkle effects on click */}
                          {clickEffects.map((effect) => (
                            <div
                              key={effect.id}
                              className="absolute z-30 pointer-events-none animate-float-up"
                              style={{ left: `${effect.x}%`, top: `${effect.y}%` }}
                            >
                              <span className="text-xl">{effect.emoji}</span>
                            </div>
                          ))}

                          <button
                            type="button"
                            onClick={() => {
                              notifyMutation.mutate(selectedCategory?.toLowerCase());
                              setIsAnimating(true);
                              setShowPlusOne(true);

                              // Add random sparkle effects
                              const emojis = ['✨', '🔔', '⭐', '💫', '🌟'];
                              const newEffects = Array.from({ length: 3 }, (_, i) => ({
                                id: Date.now() + i,
                                emoji: emojis[Math.floor(Math.random() * emojis.length)],
                                x: Math.random() * 100,
                                y: Math.random() * 100 - 50,
                              }));
                              setClickEffects(prev => [...prev, ...newEffects]);

                              setTimeout(() => setIsAnimating(false), 200);
                              setTimeout(() => setShowPlusOne(false), 600);
                              setTimeout(() => setClickEffects(prev => prev.filter(e => !newEffects.includes(e))), 800);
                            }}
                            className={`relative flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-150 bg-white dark:bg-slate-800 text-slate-800 dark:text-white border-2 border-slate-200 dark:border-slate-600 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-500/20 overflow-hidden ${isAnimating
                              ? 'scale-110 border-amber-400 shadow-lg shadow-amber-500/40'
                              : 'active:scale-95'
                              }`}
                          >
                            {/* Ripple effect */}
                            {isAnimating && (
                              <div className="absolute inset-0 bg-amber-400/20 animate-ping rounded-xl" />
                            )}
                            <span className={`text-2xl transition-transform duration-200 ${isAnimating ? 'animate-wiggle scale-125' : ''}`}>🔔</span>
                            <span className="relative z-10">Give Me It</span>
                          </button>
                        </div>

                        {comingSoonCount > 0 && (
                          <p className="text-sm text-emerald-400">
                            {comingSoonCount.toLocaleString()} {comingSoonCount === 1 ? 'person wants' : 'people want'} {selectedCategory} services!
                          </p>
                        )}
                      </div>
                    </div>
                  ) : serviceTypes.length === 0 ? (
                    <div className="p-8 text-center text-slate-400">
                      <Layers className="w-12 h-12 mx-auto mb-3 text-slate-500" />
                      <p>No service types available</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                      {serviceTypes.map((type) => {
                        const config = getTypeConfig(type);
                        const Icon = config.icon;
                        const isSelected = selectedType === type;
                        const serviceCount = categoryServicesByType[type]?.length || 0;
                        
                        // Color styles mapping - ALWAYS show colors
                        const colorStyles = {
                          violet: { bg: 'bg-violet-500/10 dark:bg-violet-500/20', icon: 'text-violet-500 dark:text-violet-400', selected: 'border-violet-500 bg-violet-500/20 ring-2 ring-violet-500/30', text: 'text-violet-500 dark:text-violet-400' },
                          pink: { bg: 'bg-pink-500/10 dark:bg-pink-500/20', icon: 'text-pink-500 dark:text-pink-400', selected: 'border-pink-500 bg-pink-500/20 ring-2 ring-pink-500/30', text: 'text-pink-500 dark:text-pink-400' },
                          cyan: { bg: 'bg-cyan-500/10 dark:bg-cyan-500/20', icon: 'text-cyan-500 dark:text-cyan-400', selected: 'border-cyan-500 bg-cyan-500/20 ring-2 ring-cyan-500/30', text: 'text-cyan-500 dark:text-cyan-400' },
                          amber: { bg: 'bg-amber-500/10 dark:bg-amber-500/20', icon: 'text-amber-500 dark:text-amber-400', selected: 'border-amber-500 bg-amber-500/20 ring-2 ring-amber-500/30', text: 'text-amber-500 dark:text-amber-400' },
                          emerald: { bg: 'bg-emerald-500/10 dark:bg-emerald-500/20', icon: 'text-emerald-500 dark:text-emerald-400', selected: 'border-emerald-500 bg-emerald-500/20 ring-2 ring-emerald-500/30', text: 'text-emerald-500 dark:text-emerald-400' },
                          blue: { bg: 'bg-blue-500/10 dark:bg-blue-500/20', icon: 'text-blue-500 dark:text-blue-400', selected: 'border-blue-500 bg-blue-500/20 ring-2 ring-blue-500/30', text: 'text-blue-500 dark:text-blue-400' },
                          red: { bg: 'bg-red-500/10 dark:bg-red-500/20', icon: 'text-red-500 dark:text-red-400', selected: 'border-red-500 bg-red-500/20 ring-2 ring-red-500/30', text: 'text-red-500 dark:text-red-400' },
                          orange: { bg: 'bg-orange-500/10 dark:bg-orange-500/20', icon: 'text-orange-500 dark:text-orange-400', selected: 'border-orange-500 bg-orange-500/20 ring-2 ring-orange-500/30', text: 'text-orange-500 dark:text-orange-400' },
                          sky: { bg: 'bg-sky-500/10 dark:bg-sky-500/20', icon: 'text-sky-500 dark:text-sky-400', selected: 'border-sky-500 bg-sky-500/20 ring-2 ring-sky-500/30', text: 'text-sky-500 dark:text-sky-400' },
                          yellow: { bg: 'bg-yellow-500/10 dark:bg-yellow-500/20', icon: 'text-yellow-500 dark:text-yellow-400', selected: 'border-yellow-500 bg-yellow-500/20 ring-2 ring-yellow-500/30', text: 'text-yellow-500 dark:text-yellow-400' },
                          indigo: { bg: 'bg-indigo-500/10 dark:bg-indigo-500/20', icon: 'text-indigo-500 dark:text-indigo-400', selected: 'border-indigo-500 bg-indigo-500/20 ring-2 ring-indigo-500/30', text: 'text-indigo-500 dark:text-indigo-400' },
                          teal: { bg: 'bg-teal-500/10 dark:bg-teal-500/20', icon: 'text-teal-500 dark:text-teal-400', selected: 'border-teal-500 bg-teal-500/20 ring-2 ring-teal-500/30', text: 'text-teal-500 dark:text-teal-400' },
                          slate: { bg: 'bg-slate-500/10 dark:bg-slate-500/20', icon: 'text-slate-500 dark:text-slate-400', selected: 'border-slate-500 bg-slate-500/20 ring-2 ring-slate-500/30', text: 'text-slate-500 dark:text-slate-400' },
                        };
                        const colors = colorStyles[config.color] || colorStyles.slate;
                        
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() => {
                              setSelectedType(type);
                              setSelectedService(null);
                              setValue('serviceId', '');
                              setServiceSearch(''); // Clear search when changing type
                            }}
                            className={`group relative p-4 rounded-xl border-2 transition-all duration-300 text-left hover:scale-[1.02] active:scale-[0.98] ${
                              isSelected
                                ? colors.selected
                                : 'border-slate-200 dark:border-slate-700/50 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-700/30'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`flex items-center justify-center w-10 h-10 rounded-xl transition-colors ${colors.bg}`}>
                                <Icon className={`w-5 h-5 ${colors.icon}`} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className={`font-semibold text-sm capitalize truncate ${
                                  isSelected ? colors.text : 'text-slate-800 dark:text-white'
                                }`}>
                                  {config.label}
                                </p>
                                <p className={`text-xs mt-0.5 ${colors.icon}`}>
                                  {serviceCount} {serviceCount === 1 ? 'service' : 'services'}
                                </p>
                              </div>
                            </div>
                            {isSelected && (
                              <div className="absolute top-2 right-2">
                                <Check className={`w-4 h-4 ${colors.text}`} />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Service Selection */}
            {selectedType && (
              <div className="rounded-xl border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-800/80">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white font-bold text-sm">
                        3
                      </div>
                      <h2 className="font-semibold text-slate-800 dark:text-white">Select Service</h2>
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {filteredTypeServices.length} of {typeServices.length}
                    </span>
                  </div>
                </div>
                
                {/* Search Bar - Premium Design */}
                <div className="p-4 bg-gradient-to-r from-slate-50 to-slate-100/50 dark:from-slate-900/50 dark:to-slate-800/30">
                  <div className="relative group">
                    {/* Glow effect on focus */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl opacity-0 group-focus-within:opacity-20 blur transition-opacity duration-300" />
                    
                    <div className="relative flex items-center">
                      <div className="absolute left-3 flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/10 dark:bg-amber-500/20">
                        <Search className="w-4 h-4 text-amber-500" />
                      </div>
                      <input
                        type="text"
                        placeholder="Search services... (e.g. 'real', 'instant', 'refill')"
                        value={serviceSearch}
                        onChange={(e) => setServiceSearch(e.target.value)}
                        className="w-full pl-14 pr-12 py-3 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700/50 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-amber-500 dark:focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all duration-200 text-sm font-medium"
                      />
                      {serviceSearch ? (
                        <button
                          type="button"
                          onClick={() => setServiceSearch('')}
                          className="absolute right-3 w-7 h-7 flex items-center justify-center rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-red-500 hover:text-white transition-all duration-200 group/clear"
                        >
                          <X className="w-3.5 h-3.5 text-slate-500 group-hover/clear:text-white" />
                        </button>
                      ) : (
                        <div className="absolute right-3 px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600/50">
                          <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500">LIVE</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Search info */}
                  {serviceSearch && (
                    <div className="mt-2 flex items-center justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400">
                        Found <span className="font-semibold text-amber-500">{filteredTypeServices.length}</span> services matching "{serviceSearch}"
                      </span>
                      {filteredTypeServices.length !== typeServices.length && (
                        <button
                          type="button"
                          onClick={() => setServiceSearch('')}
                          className="text-amber-500 hover:text-amber-400 font-medium"
                        >
                          Show all {typeServices.length}
                        </button>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="divide-y divide-slate-100 dark:divide-slate-700/50 max-h-72 overflow-y-auto">
                  {filteredTypeServices.length === 0 ? (
                    <div className="p-10 text-center">
                      {serviceSearch ? (
                        <div className="space-y-3">
                          <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                            <Search className="w-8 h-8 text-slate-400" />
                          </div>
                          <p className="text-slate-600 dark:text-slate-300 font-medium">No results for "{serviceSearch}"</p>
                          <p className="text-sm text-slate-400">Try searching for different keywords</p>
                          <button
                            type="button"
                            onClick={() => setServiceSearch('')}
                            className="mt-2 px-4 py-2 bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 rounded-lg text-sm font-medium transition-colors"
                          >
                            Clear search
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                            <ShoppingCart className="w-8 h-8 text-slate-400" />
                          </div>
                          <p className="text-slate-400">No services available</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    filteredTypeServices.map((service) => (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => {
                          handleServiceChange(service.id);
                          setValue('serviceId', service.id);
                        }}
                        className={`w-full p-3 transition-all duration-200 text-left ${selectedService?.id === service.id
                          ? 'bg-amber-500/10'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-700/30'
                          }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <p className={`font-medium text-sm truncate ${selectedService?.id === service.id ? 'text-amber-500' : 'text-slate-800 dark:text-white'}`}>
                              {getPlatformIcon(service.platform)} {service.name}
                            </p>
                            <div className="flex items-center gap-3 mt-1 text-xs text-slate-500 dark:text-slate-400">
                              <span>{service.minQuantity} - {service.maxQuantity}</span>
                              {service.averageTime && <span>{service.averageTime}</span>}
                            </div>
                          </div>
                          <div className="text-right pl-3">
                            <p className="font-bold text-amber-500">
                              {formatAmount(service.rate)}
                            </p>
                            <p className="text-xs text-slate-500">per 1K</p>
                          </div>
                        </div>
                      </button>
                    ))
                  )}
                </div>
                {errors.serviceId && (
                  <div className="px-4 py-2 bg-red-900/20 text-red-400 text-sm border-t border-red-800/30">
                    {errors.serviceId.message}
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Order Details */}
            {selectedService && (
              <div className="rounded-xl border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-800/80">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-white font-bold text-sm">
                      4
                    </div>
                    <h2 className="font-semibold text-slate-800 dark:text-white">Order Details</h2>
                  </div>
                </div>
                <div className="p-4 space-y-4">
                  {/* Service Info Banner */}
                  <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700/50">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/20 ring-1 ring-cyan-500/30 flex-shrink-0">
                        <Info className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div className="space-y-1 text-sm">
                        <p className="font-medium text-slate-800 dark:text-white">{selectedService.name}</p>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-slate-500 dark:text-slate-400">
                          <span className="flex items-center gap-1">
                            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                            {formatAmount(selectedService.rate)}/1K
                          </span>
                          <span className="flex items-center gap-1">
                            <Hash className="w-3.5 h-3.5 text-violet-400" />
                            Min: {selectedService.minQuantity} | Max: {selectedService.maxQuantity}
                          </span>
                          {selectedService.averageTime && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-amber-400" />
                              {selectedService.averageTime}
                            </span>
                          )}
                        </div>
                        {selectedService.description && (
                          <p className="text-cyan-400 pt-1">{selectedService.description}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Facebook Warning Banner */}
                  {isFacebookCategory && (
                    <div className="p-4 bg-gradient-to-r from-orange-900/30 to-red-900/30 rounded-xl border-2 border-orange-600/50">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/20 ring-1 ring-orange-500/30 flex-shrink-0">
                          <ShieldAlert className="w-5 h-5 text-orange-400" />
                        </div>
                        <div className="space-y-3 flex-1">
                          {/* Language Toggle */}
                          <div className="flex items-center justify-between">
                            <p className="font-bold text-orange-300 text-base">{fbText.title}</p>
                            <button
                              type="button"
                              onClick={() => setFbWarningLang(fbWarningLang === 'tl' ? 'en' : 'tl')}
                              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-800 border border-orange-600/50 text-orange-300 hover:bg-orange-900/30 transition-colors"
                            >
                              <Languages className="w-3.5 h-3.5" />
                              {fbWarningLang === 'tl' ? 'English' : 'Tagalog'}
                            </button>
                          </div>

                          <p className="text-sm text-orange-400">
                            {fbText.subtitle} <strong className="text-orange-300">{fbText.public}</strong>:
                          </p>

                          <div className="space-y-2 text-sm">
                            <div className="flex items-start gap-2 text-orange-300">
                              <Users className="w-4 h-4 mt-0.5 flex-shrink-0" />
                              <div>
                                <span className="font-semibold">{fbText.followersTitle}</span> — {fbText.followersDesc} <strong>Public</strong>
                                <p className="text-xs text-orange-400/80 mt-0.5">
                                  {fbText.followersPath}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start gap-2 text-orange-300">
                              <Globe className="w-4 h-4 mt-0.5 flex-shrink-0" />
                              <div>
                                <span className="font-semibold">{fbText.contentTitle}</span> — {fbText.contentDesc} <strong>Public</strong>
                                <p className="text-xs text-orange-400/80 mt-0.5">
                                  {fbText.contentPath}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start gap-2 text-orange-300">
                              <Eye className="w-4 h-4 mt-0.5 flex-shrink-0" />
                              <div>
                                <span className="font-semibold">{fbText.visibilityTitle}</span> — {fbText.visibilityDesc}
                                <p className="text-xs text-orange-400/80 mt-0.5">
                                  {fbText.visibilityPath}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="p-3 bg-red-900/40 rounded-lg border border-red-700/50">
                            <p className="text-sm text-red-300 font-medium">
                              ❌ {fbText.warningText} <strong>{fbText.warningBold}</strong> {fbText.warningEnd}
                            </p>
                          </div>

                          {/* Confirmation Checkbox */}
                          <label className="flex items-start gap-3 p-3 bg-slate-800 rounded-lg border-2 border-orange-600/50 cursor-pointer hover:bg-orange-900/20 transition-colors">
                            <input
                              type="checkbox"
                              checked={facebookConfirmed}
                              onChange={(e) => setFacebookConfirmed(e.target.checked)}
                              className="w-5 h-5 mt-0.5 rounded border-orange-500 bg-slate-700 text-orange-600 focus:ring-orange-500 cursor-pointer"
                            />
                            <span className="text-sm text-slate-200 font-medium">
                              {fbText.confirmCheckbox}
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Link Input */}
                  <div>
                    <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
                      <Link2 className="w-4 h-4 inline mr-2 text-cyan-400" />
                      Target Link
                    </label>
                    <input
                      type="url"
                      placeholder={getLinkPlaceholder()}
                      {...register('link')}
                      className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900/50 border text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${errors.link
                        ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500'
                        : 'border-slate-200 dark:border-slate-700/50 focus:ring-cyan-500/50 focus:border-cyan-500'
                        }`}
                    />
                    {errors.link && (
                      <p className="mt-1.5 text-sm text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.link.message}
                      </p>
                    )}
                  </div>

                  {/* Quantity Input */}
                  <div>
                    <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
                      <Layers className="w-4 h-4 inline mr-2 text-violet-400" />
                      Quantity
                    </label>
                    <input
                      type="number"
                      max={selectedService?.maxQuantity || 100000}
                      {...register('quantity', { valueAsNumber: true })}
                      className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900/50 border text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${errors.quantity
                        ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500'
                        : 'border-slate-200 dark:border-slate-700/50 focus:ring-cyan-500/50 focus:border-cyan-500'
                        }`}
                    />
                    {errors.quantity && (
                      <p className="mt-1.5 text-sm text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.quantity.message}
                      </p>
                    )}
                    <div className="mt-2 flex gap-2">
                      {[selectedService.minQuantity, Math.floor((selectedService.minQuantity + selectedService.maxQuantity) / 4), Math.floor((selectedService.minQuantity + selectedService.maxQuantity) / 2)].map((qty) => (
                        <button
                          key={qty}
                          type="button"
                          onClick={() => setValue('quantity', qty)}
                          className="px-3 py-1.5 text-xs rounded-lg bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-600/50 border border-slate-200 dark:border-slate-600/50 hover:border-slate-300 dark:hover:border-slate-500 transition-all text-slate-700 dark:text-white"
                        >
                          {qty.toLocaleString()}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* Summary Card */}
              <div className="relative group">
                <div className="absolute -inset-1 rounded-2xl animated-gradient-border opacity-30 blur-lg group-hover:opacity-50 transition-opacity duration-500" />
                <div className="relative rounded-2xl border border-slate-200 dark:border-cyan-500/20 bg-white dark:bg-slate-800/80 backdrop-blur-xl overflow-hidden card-hover">
                  <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700/50 bg-gradient-to-r from-slate-50 to-slate-100/50 dark:from-slate-800/50 dark:to-slate-800/30">
                    <h2 className="font-semibold flex items-center gap-2 text-slate-800 dark:text-white">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/20 ring-1 ring-cyan-500/30">
                        <ShoppingCart className="w-4 h-4 text-cyan-400" />
                      </div>
                      Order Summary
                    </h2>
                  </div>
                  <div className="p-6 space-y-4">
                    {/* Balance */}
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
                        <Wallet className="w-4 h-4 text-emerald-400" />
                        Your Balance
                      </span>
                      <span className="font-semibold text-slate-800 dark:text-white">{formatAmount(user?.balance || 0)}</span>
                    </div>

                    {selectedService && (
                      <>
                        <hr className="border-slate-200 dark:border-slate-700/50" />

                        {/* Service */}
                        <div className="flex justify-between">
                          <span className="text-slate-500 dark:text-slate-400">Service</span>
                          <span className="font-medium text-right max-w-[150px] truncate text-sm text-slate-800 dark:text-white">
                            {selectedService.name}
                          </span>
                        </div>

                        {/* Quantity */}
                        <div className="flex justify-between">
                          <span className="text-slate-500 dark:text-slate-400">Quantity</span>
                          <span className="font-medium text-slate-800 dark:text-white">{(watchQuantity || 0).toLocaleString()}</span>
                        </div>

                        {/* Rate */}
                        <div className="flex justify-between">
                          <span className="text-slate-500 dark:text-slate-400">Rate</span>
                          <span className="font-medium text-slate-800 dark:text-white">{formatAmount(selectedService.rate)}/1K</span>
                        </div>

                        {/* Subtotal */}
                        <div className="flex justify-between">
                          <span className="text-slate-500 dark:text-slate-400">Subtotal</span>
                          <span className="font-medium text-slate-800 dark:text-white">{formatAmount(baseTotal)}</span>
                        </div>

                        {/* Quantity Fee for ALL services */}
                        {quantityFee > 0 && (
                          <div className="flex justify-between items-center p-2 -mx-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                            <span className="text-amber-600 dark:text-amber-400 text-sm flex items-center gap-1.5">
                              <AlertCircle className="w-3.5 h-3.5" />
                              Small Order Fee
                            </span>
                            <span className="font-medium text-amber-600 dark:text-amber-400">+{formatAmount(quantityFee)}</span>
                          </div>
                        )}

                        {/* Best Deal Indicator for 1000+ */}
                        {selectedService && watchQuantity >= 1000 && (
                          <div className="flex justify-between items-center p-2 -mx-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                            <span className="text-emerald-600 dark:text-emerald-400 text-sm flex items-center gap-1.5">
                              <Check className="w-3.5 h-3.5" />
                              Best Value!
                            </span>
                            <span className="font-medium text-emerald-600 dark:text-emerald-400">No extra fee</span>
                          </div>
                        )}
                      </>
                    )}

                    <hr className="border-slate-700/50" />

                    {/* Total */}
                    <div className="flex justify-between items-center p-3 -mx-3 rounded-xl bg-gradient-to-r from-cyan-500/5 to-violet-500/5">
                      <span className="font-semibold text-lg text-slate-800 dark:text-white">Total</span>
                      <span className="font-bold text-2xl animated-gradient-text">
                        {formatAmount(total)}
                      </span>
                    </div>

                    {/* Remaining */}
                    <div className="flex justify-between">
                      <span className="text-slate-400">Remaining</span>
                      <span className={`font-medium ${hasInsufficientBalance ? 'text-red-400' : 'text-emerald-400'}`}>
                        {formatAmount(remainingBalance)}
                      </span>
                    </div>

                    {/* Insufficient Balance Warning */}
                    {hasInsufficientBalance && total > 0 && (
                      <div className="p-3 bg-red-900/20 rounded-xl border border-red-800/30">
                        <p className="text-sm text-red-400 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 flex-shrink-0" />
                          Insufficient balance. Please add funds.
                        </p>
                      </div>
                    )}

                    {/* Facebook Confirmation Warning */}
                    {isFacebookCategory && !facebookConfirmed && selectedService && (
                      <div className="p-3 bg-orange-900/20 rounded-xl border border-orange-800/30">
                        <p className="text-sm text-orange-400 flex items-center gap-2">
                          <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                          {fbText.checkReminder}
                        </p>
                      </div>
                    )}

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 hover:from-amber-300 hover:via-orange-400 hover:to-amber-300 text-slate-900 font-bold py-4 border-none shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 hover:shadow-xl transition-all duration-300 btn-shine animate-glow text-base"
                      isLoading={isSubmitting || createOrder.isPending}
                      disabled={!selectedService || hasInsufficientBalance || (isFacebookCategory && !facebookConfirmed)}
                    >
                      <Zap className="w-5 h-5 mr-2" />
                      ⚡ Place Order Now
                    </Button>
                  </div>
                </div>
              </div>

              {/* Quick Tips */}
              <div className="relative group">
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 opacity-20 blur group-hover:opacity-40 transition-opacity duration-500" />
                <div className="relative rounded-2xl border border-amber-200 dark:border-amber-500/30 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/20 p-5 backdrop-blur-sm">
                  <h3 className="font-bold text-amber-700 dark:text-amber-300 flex items-center gap-2 mb-4">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/20 ring-1 ring-amber-500/30">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                    </div>
                    Quick Tips
                  </h3>
                  <ul className="space-y-3 text-sm stagger-children">
                    <li className="flex items-start gap-3 p-2 rounded-lg bg-white/50 dark:bg-slate-800/30">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-emerald-500" />
                      </div>
                      <span className="text-amber-700 dark:text-amber-300">Make sure your profile is <strong className="text-emerald-600 dark:text-emerald-400">public</strong></span>
                    </li>
                    <li className="flex items-start gap-3 p-2 rounded-lg bg-white/50 dark:bg-slate-800/30">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-emerald-500" />
                      </div>
                      <span className="text-amber-700 dark:text-amber-300">Use the <strong className="text-cyan-600 dark:text-cyan-400">correct link format</strong></span>
                    </li>
                    <li className="flex items-start gap-3 p-2 rounded-lg bg-white/50 dark:bg-slate-800/30">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-emerald-500" />
                      </div>
                      <span className="text-amber-700 dark:text-amber-300">Orders start <strong className="text-violet-600 dark:text-violet-400">within minutes</strong> ⚡</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

NewOrderPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
