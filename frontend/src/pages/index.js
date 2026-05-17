/**
 * Home Page - SMM Panel Landing
 */

import Link from 'next/link';
import { useEffect, useMemo, useState, useRef } from 'react';
import {
  ArrowRight,
  CheckCircle,
  Clock,
  CreditCard,
  Headphones,
  Key,
  Menu,
  Rocket,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Wallet,
  X,
  Zap,
} from 'lucide-react';
import { Button, ThemeToggle } from '../components/ui';
import useAuthStore from '../store/authStore';
import useThemeStore from '../store/themeStore';
import { usePublicStats } from '../hooks/useApi';
import { formatCurrency } from '../lib/utils';

// Social Media Platform Icons - Authentic Brand Style
const InstagramIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const FacebookIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const TikTokIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
);

const YouTubeIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const TwitterIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

// Platform services data with authentic brand colors
const platforms = [
  {
    name: 'Instagram',
    icon: InstagramIcon,
    bgClass: 'bg-gradient-to-br from-[#833AB4] via-[#E1306C] to-[#F77737]',
    glowClass: 'group-hover:shadow-[0_0_30px_rgba(225,48,108,0.5)]',
    services: ['Followers', 'Likes', 'Views', 'Reels Views', 'Story Views', 'Comments'],
  },
  {
    name: 'Facebook',
    icon: FacebookIcon,
    bgClass: 'bg-[#1877F2]',
    glowClass: 'group-hover:shadow-[0_0_30px_rgba(24,119,242,0.5)]',
    services: ['Page Likes', 'Post Likes', 'Shares', 'Comments', 'Video Views', 'Reactions'],
  },
  {
    name: 'TikTok',
    icon: TikTokIcon,
    bgClass: 'bg-gradient-to-br from-[#25F4EE] via-[#000000] to-[#FE2C55]',
    glowClass: 'group-hover:shadow-[0_0_30px_rgba(37,244,238,0.6)]',
    services: ['Followers', 'Likes', 'Views', 'Shares', 'Comments', 'Saves'],
  },
  {
    name: 'YouTube',
    icon: YouTubeIcon,
    bgClass: 'bg-[#FF0000]',
    glowClass: 'group-hover:shadow-[0_0_30px_rgba(255,0,0,0.5)]',
    services: ['Subscribers', 'Views', 'Likes', 'Watch Time', 'Comments', 'Shares'],
  },
  {
    name: 'Twitter/X',
    icon: TwitterIcon,
    bgClass: 'bg-[#000000] dark:bg-[#16181c]',
    glowClass: 'group-hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]',
    services: ['Followers', 'Likes', 'Retweets', 'Views', 'Comments', 'Bookmarks'],
  },
];

const features = [
  {
    title: 'Instant Delivery',
    description: 'Orders start processing within seconds. Watch your numbers grow in real-time.',
    icon: Zap,
    gradient: 'from-amber-500 to-orange-600',
    glowColor: 'rgba(245, 158, 11, 0.4)',
  },
  {
    title: 'Cheapest Prices',
    description: 'Best rates in the market. Get more value for your money with bulk discounts.',
    icon: TrendingUp,
    gradient: 'from-emerald-500 to-teal-600',
    glowColor: 'rgba(16, 185, 129, 0.4)',
  },
  {
    title: 'Easy Payment',
    description: 'Pay with GCash, PayMaya, PayPal, or bank transfer. Instant wallet top-up.',
    icon: CreditCard,
    gradient: 'from-blue-500 to-indigo-600',
    glowColor: 'rgba(59, 130, 246, 0.4)',
  },
  {
    title: '24/7 Support',
    description: 'Our support team is always ready to help you with any questions or issues.',
    icon: Headphones,
    gradient: 'from-purple-500 to-pink-600',
    glowColor: 'rgba(168, 85, 247, 0.4)',
  },
  {
    title: 'API Access',
    description: 'Integrate our services into your own platform. Perfect for resellers.',
    icon: Key,
    gradient: 'from-cyan-500 to-blue-600',
    glowColor: 'rgba(6, 182, 212, 0.4)',
  },
  {
    title: 'Secure & Safe',
    description: 'Your account and data are protected with enterprise-grade security.',
    icon: ShieldCheck,
    gradient: 'from-rose-500 to-red-600',
    glowColor: 'rgba(244, 63, 94, 0.4)',
  },
];

const steps = [
  {
    step: '01',
    title: 'Create Account',
    description: 'Sign up for free in just 30 seconds. No credit card required.',
    icon: Users,
    gradient: 'from-violet-500 to-purple-600',
    glowColor: 'rgba(139, 92, 246, 0.5)',
  },
  {
    step: '02',
    title: 'Add Funds',
    description: 'Top up your wallet using GCash, PayMaya, PayPal, or bank transfer.',
    icon: Wallet,
    gradient: 'from-emerald-500 to-teal-600',
    glowColor: 'rgba(16, 185, 129, 0.5)',
  },
  {
    step: '03',
    title: 'Place Order',
    description: 'Choose your service, enter your link, and watch your growth!',
    icon: Rocket,
    gradient: 'from-orange-500 to-pink-600',
    glowColor: 'rgba(249, 115, 22, 0.5)',
  },
];

const testimonials = [
  {
    name: 'Maria Santos',
    role: 'Business Owner',
    content: 'Best SMM panel I\'ve ever used! Fast delivery and great prices. My Instagram grew from 1K to 50K followers.',
    rating: 5,
  },
  {
    name: 'John Cruz',
    role: 'Digital Marketer',
    content: 'I use this panel for all my clients. The API integration is seamless and support is always helpful.',
    rating: 5,
  },
  {
    name: 'Angela Reyes',
    role: 'Content Creator',
    content: 'Finally found a reliable SMM panel! Orders are delivered fast and the quality is amazing.',
    rating: 5,
  },
];

// Animated counter hook
function useCountUp(end, duration = 2000, start = 0) {
  const [count, setCount] = useState(start);
  const countRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) return;
    
    const startTime = Date.now();
    const endValue = typeof end === 'string' ? parseFloat(end.replace(/[^0-9.]/g, '')) || 0 : end;
    
    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3); // Cubic ease out
      setCount(Math.floor(easeOut * endValue));
      
      if (progress < 1) {
        countRef.current = requestAnimationFrame(animate);
      }
    };
    
    countRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(countRef.current);
  }, [end, duration, hasStarted]);

  return { count, setHasStarted };
}

// Intersection observer for triggering animations
function useInView(threshold = 0.3) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

// Stat Card Component with animations
function StatCard({ stat, index }) {
  const { ref, inView } = useInView(0.3);
  const [animated, setAnimated] = useState(false);
  
  useEffect(() => {
    if (inView && !animated) {
      setAnimated(true);
    }
  }, [inView, animated]);

  // Parse numeric value
  const numericValue = parseFloat(stat.value.replace(/[^0-9.]/g, '')) || 0;
  const suffix = stat.value.replace(/[0-9.]/g, '');
  const isNumeric = numericValue > 0;

  return (
    <div 
      ref={ref}
      className="group relative p-4 sm:p-6 text-center rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-500"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-2xl" />
      
      {/* Animated gradient border */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${stat.gradient} p-[1px]`}>
          <div className="w-full h-full bg-white dark:bg-gray-800 rounded-2xl" />
        </div>
      </div>
      
      {/* Glow effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        style={{ 
          background: `radial-gradient(circle at center, ${stat.glowColor} 0%, transparent 70%)` 
        }}
      />
      
      {/* Pulsing ring behind icon */}
      <div className="relative z-10 flex justify-center mb-3 sm:mb-4">
        <div className="relative">
          {/* Pulse rings */}
          <div className={`absolute inset-0 w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${stat.gradient} opacity-30 ${animated ? 'animate-ping' : ''}`} 
               style={{ animationDuration: '2s', animationIterationCount: '1' }} />
          <div className={`absolute -inset-1 w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br ${stat.gradient} opacity-20 blur-sm group-hover:opacity-40 transition-opacity`} />
          
          {/* Icon container */}
          <div className={`relative w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
            <stat.icon className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
          </div>
        </div>
      </div>
      
      {/* Animated counter value */}
      <div className={`relative z-10 text-2xl sm:text-3xl lg:text-5xl font-bold text-transparent bg-gradient-to-r ${stat.gradient} bg-clip-text`}>
        {isNumeric && animated ? (
          <AnimatedNumber value={numericValue} suffix={suffix} />
        ) : (
          stat.value
        )}
      </div>
      
      {/* Label with subtle animation */}
      <div className="relative z-10 mt-1 sm:mt-2 text-[10px] sm:text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
        {stat.label}
      </div>
    </div>
  );
}

// Animated number component
function AnimatedNumber({ value, suffix }) {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    const duration = 2000;
    const startTime = Date.now();
    
    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.floor(easeOut * value));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };
    
    requestAnimationFrame(animate);
  }, [value]);

  return <>{displayValue}{suffix}</>;
}

export default function HomePage() {
  const { isAuthenticated, user, initialize } = useAuthStore();
  const { theme, initializeTheme } = useThemeStore();
  const { data: publicStats } = usePublicStats();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    initialize();
    initializeTheme();
  }, [initialize, initializeTheme]);

  // Format number with K/M suffix
  const formatNumber = (num) => {
    if (!num) return '0';
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M+`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K+`;
    return num.toString();
  };

  // Real stats from database with icons and colors
  const stats = useMemo(() => [
    { 
      value: formatNumber(publicStats?.totalUsers || 0), 
      label: 'Happy Customers',
      icon: Users,
      gradient: 'from-emerald-500 to-teal-600',
      glowColor: 'rgba(16, 185, 129, 0.4)',
    },
    { 
      value: formatNumber(publicStats?.completedOrders || 0), 
      label: 'Orders Completed',
      icon: Rocket,
      gradient: 'from-blue-500 to-indigo-600',
      glowColor: 'rgba(59, 130, 246, 0.4)',
    },
    { 
      value: publicStats?.uptime || '99.9%', 
      label: 'Uptime',
      icon: Clock,
      gradient: 'from-purple-500 to-pink-600',
      glowColor: 'rgba(168, 85, 247, 0.4)',
    },
    { 
      value: publicStats?.support || '24/7', 
      label: 'Support',
      icon: Headphones,
      gradient: 'from-amber-500 to-orange-600',
      glowColor: 'rgba(245, 158, 11, 0.4)',
    },
  ], [publicStats]);

  const primaryCtaHref = isAuthenticated ? '/dashboard' : '/register';
  const secondaryCtaHref = isAuthenticated ? '/orders' : '/login';

  return (
    <div className="relative min-h-screen text-gray-900 bg-gray-50 dark:bg-gray-900 dark:text-gray-100">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 rounded-full -left-32 h-96 w-96 bg-indigo-500/20 dark:bg-indigo-500/10 blur-3xl" />
        <div className="absolute right-0 rounded-full top-1/4 h-96 w-96 bg-purple-500/15 dark:bg-purple-500/10 blur-3xl" />
        <div className="absolute bottom-0 rounded-full left-1/3 h-96 w-96 bg-cyan-500/10 dark:bg-cyan-500/5 blur-3xl" />
      </div>
  
      {/* Header */}
      <header className="sticky top-0 z-50 border-b backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-gray-200/50 dark:border-gray-800/50">
        <div className="flex items-center justify-between px-4 py-4 mx-auto max-w-7xl sm:px-6">
          <Link href="/" className="flex items-center gap-3 sm:gap-4 group">
            {/* Ultra Premium Logo */}
            <div className="relative">
              {/* Animated glow rings */}
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur-lg opacity-40 group-hover:opacity-70 transition-opacity animate-pulse" style={{ animationDuration: '2s' }} />
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-indigo-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-50 transition-opacity blur-md" />
              
              {/* Main logo container */}
              <div className="relative w-11 h-11 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 overflow-hidden">
                {/* Inner gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                
                {/* Hexagon pattern background */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 left-0 w-3 h-3 border border-white/30 rotate-45" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border border-white/30 rotate-45" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-white/10 rounded-lg" />
                </div>
                
                {/* Icon Stack */}
                <div className="relative flex items-center justify-center">
                  {/* Background chart icon */}
                  <TrendingUp className="absolute w-6 h-6 sm:w-8 sm:h-8 text-white/20 -translate-x-0.5 -translate-y-0.5" />
                  {/* Main S letter */}
                  <span className="relative font-black text-xl sm:text-3xl text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] tracking-tighter">S</span>
                </div>
                
                {/* Sparkle decorations */}
                <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                <div className="absolute bottom-2 left-2 w-1 h-1 bg-white/70 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                <div className="absolute top-1/2 right-1 w-0.5 h-0.5 bg-white/50 rounded-full" />
              </div>
              
              {/* Live status badge */}
              <div className="absolute -top-1.5 -right-1.5 flex items-center justify-center">
                <div className="absolute w-4 h-4 bg-green-500 rounded-full animate-ping opacity-40" />
                <div className="relative w-4 h-4 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 shadow-lg border-2 border-white dark:border-gray-900 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
                </div>
              </div>
              
              {/* Floating mini icons */}
              <div className="absolute -bottom-1 -left-1 w-5 h-5 rounded-md bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-lg border border-white/50 dark:border-gray-800 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 translate-x-2">
                <Star className="w-2.5 h-2.5 text-white" />
              </div>
            </div>
            
            {/* Brand Text */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-gray-900 dark:text-white text-base sm:text-xl tracking-tight">SMM</span>
                <span className="font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent text-base sm:text-xl">Panel</span>
              </div>
              <span className="hidden sm:flex items-center gap-1 text-[10px] text-gray-500 dark:text-gray-400 font-medium">
                <Zap className="w-2.5 h-2.5 text-amber-500" />
                Grow your social media
              </span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="items-center hidden gap-8 text-sm font-medium text-gray-600 lg:flex dark:text-gray-300">
            <a href="#services" className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">Services</a>
            <a href="#features" className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">Features</a>
            <a href="#how-it-works" className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">How It Works</a>
            <a href="#testimonials" className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">Reviews</a>
          </nav>
          
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            {!isAuthenticated && (
              <Link href="/login" className="hidden sm:block">
                <Button variant="ghost" size="sm" className="text-gray-700 dark:text-gray-200">
                  Sign in
                </Button>
              </Link>
            )}
            <Link href={primaryCtaHref}>
              <Button size="sm" className="shadow-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-indigo-500/25 text-xs sm:text-sm px-3 sm:px-4">
                {isAuthenticated ? 'Dashboard' : 'Get Started'}
              </Button>
            </Link>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200/50 dark:border-gray-800/50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl">
            <nav className="flex flex-col p-4 space-y-1">
              <a 
                href="#services" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium"
              >
                Services
              </a>
              <a 
                href="#features" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium"
              >
                Features
              </a>
              <a 
                href="#how-it-works" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium"
              >
                How It Works
              </a>
              <a 
                href="#testimonials" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium"
              >
                Reviews
              </a>
              {!isAuthenticated && (
                <Link 
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-xl text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors font-medium"
                >
                  Sign In
                </Link>
              )}
            </nav>
          </div>
        )}
      </header>
  
      <main className="px-4 sm:px-6 mx-auto max-w-7xl">
        {/* Hero Section */}
        <section className="py-12 sm:py-16 lg:py-28">
          <div className="grid items-center gap-8 lg:gap-12 lg:grid-cols-2">
            <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-indigo-600 bg-indigo-100 border border-indigo-200 rounded-full dark:bg-indigo-500/20 dark:border-indigo-500/30 dark:text-indigo-300">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                #1 Cheapest SMM Panel in PH
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold leading-tight lg:text-6xl">
                Grow Your
                <span className="block text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text">
                  Social Media Fast
                </span>
              </h1>
              <p className="max-w-lg mx-auto lg:mx-0 text-base sm:text-lg text-gray-600 dark:text-gray-400">
                Get real followers, likes, views, and engagement at the cheapest prices. 
                Trusted by 50,000+ marketers, influencers, and businesses worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <Link href={primaryCtaHref}>
                  <Button size="lg" className="w-full sm:w-auto px-6 sm:px-8 shadow-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-indigo-500/30">
                    Start Growing Now
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="#services">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-gray-300 dark:border-gray-700">
                    View Services
                  </Button>
                </Link>
              </div>
              {/* Trust Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                  <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Secure Payments</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
                  <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Instant Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <Headphones className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                  <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">24/7 Support</span>
                </div>
              </div>
            </div>
              
            {/* Platform Cards - Hidden on mobile, shown on tablet+ */}
            <div className="relative hidden sm:block">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl" />
              <div className="relative grid grid-cols-2 gap-3 sm:gap-4">
                {platforms.slice(0, 4).map((platform, idx) => (
                  <div
                    key={platform.name}
                    className={`group p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl hover:scale-105 transition-all duration-300 ${idx === 0 ? 'col-span-2' : ''}`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="relative">
                        <div className={`absolute inset-0 w-12 h-12 rounded-xl ${platform.bgClass} blur-lg opacity-0 group-hover:opacity-50 transition-opacity`} />
                        <div className={`relative w-12 h-12 rounded-xl ${platform.bgClass} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                          <platform.icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">{platform.name}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Services Available</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {platform.services.slice(0, idx === 0 ? 6 : 3).map((service) => (
                        <span key={service} className="px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded-md dark:bg-gray-700 dark:text-gray-300">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
  
        {/* Stats Section */}
        <section className="py-12 sm:py-16 lg:py-20">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-12">
            <p className="mb-2 text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400">Our Impact</p>
            <h2 className="text-2xl sm:text-3xl font-bold lg:text-4xl">Trusted by Thousands</h2>
            <p className="max-w-2xl mx-auto mt-2 sm:mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Real numbers from our growing community of satisfied customers.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-4">
            {stats.map((stat, index) => (
              <StatCard key={stat.label} stat={stat} index={index} />
            ))}
          </div>
        </section>
  
        {/* Services/Platforms Section */}
        <section id="services" className="py-12 sm:py-16 lg:py-20">
          <div className="mb-8 sm:mb-12 text-center">
            <p className="mb-2 text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400">Our Services</p>
            <h2 className="text-2xl sm:text-3xl font-bold lg:text-4xl">All Major Platforms Supported</h2>
            <p className="max-w-2xl mx-auto mt-2 sm:mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-400">
              We provide high-quality SMM services for all major social media platforms at unbeatable prices.
            </p>
          </div>
          <div className="grid gap-3 sm:gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {platforms.map((platform) => (
              <div
                key={platform.name}
                className="group relative p-4 sm:p-6 transition-all duration-500 bg-white border border-gray-200 shadow-sm rounded-2xl dark:bg-gray-800/90 dark:border-gray-700 hover:border-transparent hover:shadow-2xl hover:-translate-y-2 overflow-hidden"
              >
                {/* Hover gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon with glow effect */}
                  <div className="relative mb-3 sm:mb-4">
                    <div className={`absolute inset-0 w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl ${platform.bgClass} blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />
                    <div className={`relative w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl ${platform.bgClass} flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300 ${platform.glowClass}`}>
                      <platform.icon className="text-white w-5 h-5 sm:w-7 sm:h-7" />
                    </div>
                  </div>
                  
                  <h3 className="mb-2 sm:mb-3 text-sm sm:text-lg font-bold text-gray-900 dark:text-white">{platform.name}</h3>
                  <ul className="space-y-1 sm:space-y-2 hidden sm:block">
                    {platform.services.slice(0, 4).map((service) => (
                      <li key={service} className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 sm:gap-2">
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                        {service}
                      </li>
                    ))}
                  </ul>
                  {/* Mobile: show service count */}
                  <p className="text-xs text-gray-500 dark:text-gray-400 sm:hidden">
                    {platform.services.length}+ services
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
  
        {/* Features Section */}
        <section id="features" className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
          {/* Floating Background Shapes */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-full blur-3xl" />
          </div>
          
          <div className="relative z-10">
            <div className="mb-8 sm:mb-12 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-100/80 dark:bg-indigo-500/20 rounded-full border border-indigo-200 dark:border-indigo-500/30">
                <Sparkles className="w-4 h-4" />
                Why Choose Us
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold lg:text-4xl">The Best SMM Panel Features</h2>
              <p className="max-w-2xl mx-auto mt-2 sm:mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Everything you need to grow your social media presence effectively.
              </p>
            </div>
            
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {features.map(({ title, description, icon: Icon, gradient, glowColor }, index) => (
                <div
                  key={title}
                  className="group relative p-5 sm:p-6 transition-all duration-500 rounded-2xl overflow-hidden hover:-translate-y-3 hover:shadow-2xl"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Glassmorphism background */}
                  <div className="absolute inset-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 rounded-2xl shadow-lg" />
                  
                  {/* Animated rotating gradient border on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
                    <div className={`absolute inset-[-2px] rounded-2xl bg-gradient-to-r ${gradient} animate-spin-slow`} style={{ animationDuration: '3s' }} />
                    <div className="absolute inset-[2px] bg-white dark:bg-gray-800 rounded-2xl" />
                  </div>
                  
                  {/* Shimmer effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                  </div>
                  
                  {/* Glow effect on hover */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                    style={{ background: `radial-gradient(circle at center, ${glowColor} 0%, transparent 70%)` }}
                  />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon with animated ring */}
                    <div className="relative mb-5">
                      {/* Pulsing ring */}
                      <div className={`absolute inset-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br ${gradient} opacity-20 group-hover:opacity-40 group-hover:scale-125 transition-all duration-700`} />
                      {/* Glow behind */}
                      <div className={`absolute inset-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br ${gradient} blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500`} />
                      {/* Icon container */}
                      <div className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                        <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-lg" />
                      </div>
                    </div>
                    
                    {/* Title with gradient on hover */}
                    <h3 className="mb-2 text-lg sm:text-xl font-bold text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 dark:group-hover:from-white dark:group-hover:to-gray-300 transition-all duration-300">
                      {title}
                    </h3>
                    
                    {/* Animated underline */}
                    <div className={`h-1 w-0 group-hover:w-16 bg-gradient-to-r ${gradient} transition-all duration-500 mb-3 rounded-full shadow-lg`} />
                    
                    {/* Description */}
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                      {description}
                    </p>
                    
                    {/* Learn more link */}
                    <div className="mt-4 flex items-center gap-2 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                      <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>Learn more</span>
                      <ArrowRight className={`w-4 h-4 bg-gradient-to-r ${gradient} text-transparent`} style={{ stroke: 'url(#gradient)' }} />
                    </div>
                  </div>
                  
                  {/* Multiple decorative accents */}
                  <div className={`absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br ${gradient} opacity-5 group-hover:opacity-20 rounded-full blur-2xl transition-all duration-500`} />
                  <div className={`absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 rounded-full blur-2xl transition-all duration-500`} />
                </div>
              ))}
            </div>
          </div>
        </section>
  
        {/* How It Works */}
        <section id="how-it-works" className="py-12 sm:py-16 lg:py-24 relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Floating particles */}
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-violet-500 rounded-full animate-pulse opacity-40" />
            <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-emerald-500 rounded-full animate-pulse opacity-30" style={{ animationDelay: '0.5s' }} />
            <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-orange-500 rounded-full animate-pulse opacity-40" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-pink-500 rounded-full animate-pulse opacity-30" style={{ animationDelay: '1.5s' }} />
            
            {/* Large gradient blobs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-violet-500/10 to-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-orange-500/5 to-pink-500/5 rounded-full blur-3xl" />
          </div>
          
          <div className="relative z-10">
            <div className="mb-12 sm:mb-20 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-100/80 dark:bg-indigo-500/20 rounded-full border border-indigo-200 dark:border-indigo-500/30 shadow-lg">
                <Sparkles className="w-4 h-4 animate-pulse" />
                How It Works
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold lg:text-5xl bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-300 dark:to-white bg-clip-text text-transparent">
                Start Growing in 3 Easy Steps
              </h2>
              <p className="max-w-2xl mx-auto mt-4 text-sm sm:text-lg text-gray-600 dark:text-gray-400">
                Get started in minutes and watch your social media presence explode.
              </p>
            </div>
            
            <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-3 relative">
              {/* Animated connecting line with dots - desktop only */}
              <div className="hidden md:block absolute top-20 left-[22%] right-[22%] h-1">
                {/* Main gradient line */}
                <div className="h-full bg-gradient-to-r from-violet-500 via-emerald-500 to-orange-500 rounded-full opacity-40" />
                {/* Glow line */}
                <div className="absolute inset-0 h-full bg-gradient-to-r from-violet-500 via-emerald-500 to-orange-500 rounded-full blur-md opacity-60" />
                {/* Animated dots traveling along the line */}
                <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg animate-pulse" style={{ left: '25%' }}>
                  <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-75" />
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg animate-pulse" style={{ left: '75%', animationDelay: '0.5s' }}>
                  <div className="absolute inset-0 bg-orange-500 rounded-full animate-ping opacity-75" style={{ animationDelay: '0.5s' }} />
                </div>
              </div>
              
              {steps.map((step, index) => (
                <div key={step.title} className="relative group perspective-1000">
                  {/* Card with 3D tilt effect */}
                  <div className="relative p-6 sm:p-10 text-center rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl transform-gpu hover:rotate-y-2 hover:rotate-x-2">
                    {/* Glassmorphism background */}
                    <div className="absolute inset-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl border border-white/60 dark:border-gray-700/60 rounded-3xl shadow-xl" />
                    
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl overflow-hidden">
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                    </div>
                    
                    {/* Gradient border on hover */}
                    <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${step.gradient} p-[2px]`}>
                        <div className="w-full h-full bg-white dark:bg-gray-800 rounded-3xl" />
                      </div>
                    </div>
                    
                    {/* Glow effect */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                      style={{ background: `radial-gradient(circle at top, ${step.glowColor} 0%, transparent 70%)` }}
                    />
                    
                    {/* Content */}
                    <div className="relative z-10">
                      {/* Step circle with icon - BIGGER */}
                      <div className="relative mx-auto mb-8 w-24 h-24 sm:w-32 sm:h-32">
                        {/* Outer ring animation */}
                        <div className={`absolute -inset-2 rounded-full border-2 border-dashed opacity-30 group-hover:opacity-60 group-hover:rotate-180 transition-all duration-1000`} style={{ borderColor: step.glowColor }} />
                        {/* Pulsing ring */}
                        <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.gradient} opacity-20 group-hover:opacity-50 group-hover:scale-125 transition-all duration-700`} />
                        {/* Glow */}
                        <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.gradient} blur-2xl opacity-0 group-hover:opacity-70 transition-opacity duration-500`} />
                        {/* Main circle */}
                        <div className={`relative w-full h-full rounded-full bg-gradient-to-br ${step.gradient} flex flex-col items-center justify-center shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                          <step.icon className="w-10 h-10 sm:w-14 sm:h-14 text-white drop-shadow-lg" />
                          <span className="text-sm sm:text-base font-bold text-white/90 mt-1">{step.step}</span>
                        </div>
                        {/* Floating badge */}
                        <div className={`absolute -top-1 -right-1 w-8 h-8 rounded-full bg-white dark:bg-gray-900 shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-0 group-hover:scale-100`}>
                          <CheckCircle className={`w-5 h-5`} style={{ color: step.glowColor }} />
                        </div>
                      </div>
                      
                      {/* Title */}
                      <h3 className="mb-3 text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                        {step.title}
                      </h3>
                      
                      {/* Animated underline */}
                      <div className={`h-1.5 w-0 group-hover:w-20 mx-auto bg-gradient-to-r ${step.gradient} transition-all duration-500 mb-4 rounded-full shadow-lg`} />
                      
                      {/* Description */}
                      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                    
                    {/* Multiple corner accents */}
                    <div className={`absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br ${step.gradient} opacity-5 group-hover:opacity-20 rounded-full blur-2xl transition-all duration-500`} />
                    <div className={`absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-10 rounded-full blur-2xl transition-all duration-500`} />
                  </div>
                  
                  {/* Step connector arrow - mobile only */}
                  {index < steps.length - 1 && (
                    <div className="md:hidden flex justify-center my-6">
                      <div className="flex flex-col items-center gap-1">
                        <div className={`w-1 h-8 bg-gradient-to-b ${step.gradient} rounded-full opacity-40`} />
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-xl`}>
                          <ArrowRight className="w-5 h-5 text-white rotate-90" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
  
        {/* Testimonials */}
        <section id="testimonials" className="py-12 sm:py-16 lg:py-20">
          <div className="mb-8 sm:mb-12 text-center">
            <p className="mb-2 text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400">Testimonials</p>
            <h2 className="text-2xl sm:text-3xl font-bold lg:text-4xl">What Our Customers Say</h2>
          </div>
          <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-3">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="p-4 sm:p-6 bg-white border border-gray-200 shadow-sm rounded-2xl dark:bg-gray-800 dark:border-gray-700">
                <div className="flex items-center gap-1 mb-3 sm:mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="mb-4 sm:mb-6 text-sm sm:text-base text-gray-600 dark:text-gray-300">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 text-sm sm:text-base font-bold text-white rounded-full bg-gradient-to-br from-indigo-500 to-purple-600">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">{testimonial.name}</div>
                    <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
  
        {/* CTA Section */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="relative p-6 sm:p-8 lg:p-16 overflow-hidden text-center text-white border rounded-2xl sm:rounded-3xl border-slate-700 bg-gradient-to-br from-slate-900 via-slate-800 to-sky-950 shadow-xl">
            {/* Glow Effects */}
            <div className="absolute -left-10 top-6 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none" />
            <div className="absolute -right-16 bottom-6 h-52 w-52 rounded-full bg-amber-400/20 blur-3xl pointer-events-none" />
            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
            <div className="relative z-10">
              <h2 className="mb-3 sm:mb-4 text-xl sm:text-3xl font-bold lg:text-4xl">Ready to Grow Your Social Media?</h2>
              <p className="max-w-2xl mx-auto mb-6 sm:mb-8 text-sm sm:text-lg text-white/70">
                Join 50,000+ satisfied customers and start growing your social media presence today.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                <Link href={primaryCtaHref}>
                  <Button size="lg" className="w-full sm:w-auto px-6 sm:px-8 font-bold text-slate-900 bg-amber-400 shadow-xl hover:bg-amber-300 border-none">
                    Get Started Free
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto px-6 sm:px-8 text-white bg-white/5 border border-white/20 hover:bg-white/10">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
  
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 dark:border-gray-800 dark:bg-gray-900">
        <div className="px-4 sm:px-6 py-8 sm:py-12 mx-auto max-w-7xl">
          <div className="grid gap-6 sm:gap-8 mb-6 sm:mb-8 grid-cols-2 md:grid-cols-4">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-4">
                {/* Footer Logo - Premium Style */}
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl blur-md opacity-40" />
                  <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-0 left-0 w-3 h-3 border border-white/30 rotate-45" />
                      <div className="absolute bottom-0 right-0 w-3 h-3 border border-white/30 rotate-45" />
                    </div>
                    <div className="relative flex items-center justify-center">
                      <TrendingUp className="absolute w-6 h-6 text-white/20 -translate-x-0.5 -translate-y-0.5" />
                      <span className="relative font-black text-xl text-white drop-shadow-lg">S</span>
                    </div>
                    <div className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 border-2 border-white dark:border-gray-900 flex items-center justify-center">
                    <div className="w-1 h-1 bg-white rounded-full" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-gray-900 dark:text-white text-xl tracking-tight">SMM</span>
                    <span className="font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent text-xl">Panel</span>
                  </div>
                </div>
              </div>
              <p className="max-w-sm text-sm sm:text-base text-gray-500 dark:text-gray-400">
                The #1 SMM Panel in the Philippines. Get real followers, likes, and views at the cheapest prices.
              </p>
              <div className="flex items-center gap-3 sm:gap-4 mt-3 sm:mt-4">
                {platforms.slice(0, 4).map((platform) => (
                  <div key={platform.name} className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg ${platform.bgClass} flex items-center justify-center`}>
                    <platform.icon className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="mb-3 sm:mb-4 text-sm sm:text-base font-semibold">Quick Links</h4>
              <ul className="space-y-1 sm:space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <li><Link href="/register" className="hover:text-indigo-600 dark:hover:text-indigo-400">Sign Up</Link></li>
                <li><Link href="/login" className="hover:text-indigo-600 dark:hover:text-indigo-400">Login</Link></li>
                <li><Link href="/services" className="hover:text-indigo-600 dark:hover:text-indigo-400">Services</Link></li>
                <li><Link href="/api-docs" className="hover:text-indigo-600 dark:hover:text-indigo-400">API Docs</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 sm:mb-4 text-sm sm:text-base font-semibold">Support</h4>
              <ul className="space-y-1 sm:space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <li><Link href="/tickets" className="hover:text-indigo-600 dark:hover:text-indigo-400">Help Center</Link></li>
                <li><Link href="/faq" className="hover:text-indigo-600 dark:hover:text-indigo-400">FAQ</Link></li>
                <li><Link href="/terms" className="hover:text-indigo-600 dark:hover:text-indigo-400">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-indigo-600 dark:hover:text-indigo-400">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-3 sm:gap-4 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-800 md:flex-row">
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} SMM Panel. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              <ShieldCheck className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
              <span>Secure payments powered by GCash, PayMaya & PayPal</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
