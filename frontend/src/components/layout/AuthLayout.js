/**
 * Auth Layout Component - Modern Split Screen Design
 */

import Link from 'next/link';
import { Home, Zap, CreditCard, ShoppingCart, Key, Star } from 'lucide-react';
import { ThemeToggle } from '../ui';

// Social media platform icons as SVG components
const InstagramIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const TikTokIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
);

const YouTubeIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const services = [
  { icon: InstagramIcon, name: 'Instagram', items: 'Followers, Likes, Views, Reels', gradient: 'from-pink-500 via-purple-500 to-orange-400' },
  { icon: FacebookIcon, name: 'Facebook', items: 'Page Likes, Shares, Reactions', gradient: 'from-blue-600 to-blue-400' },
  { icon: TikTokIcon, name: 'TikTok', items: 'Followers, Likes, Views', gradient: 'from-gray-900 via-pink-500 to-cyan-400' },
  { icon: YouTubeIcon, name: 'YouTube', items: 'Subscribers, Views, Likes', gradient: 'from-red-600 to-red-400' },
  { icon: TwitterIcon, name: 'Twitter/X', items: 'Followers, Likes, Retweets', gradient: 'from-gray-800 to-gray-600' },
];

const features = [
  { icon: ShoppingCart, title: 'Instant Orders', desc: 'Automated delivery system' },
  { icon: CreditCard, title: 'Easy Top-up', desc: 'GCash, PayMaya, PayPal' },
  { icon: Zap, title: 'Fast Delivery', desc: 'Orders start within minutes' },
  { icon: Key, title: 'API Access', desc: 'For resellers & developers' },
];

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Theme Responsive */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Background - matches dashboard */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-cyan-50/30 to-slate-100 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.06)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
          {/* Radial Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-cyan-300/20 via-teal-300/10 to-transparent dark:from-cyan-500/15 dark:via-teal-500/10 dark:to-transparent rounded-full blur-3xl" />
        </div>
        
        {/* Animated Orbs */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-cyan-300/40 to-teal-400/40 dark:from-cyan-500/25 dark:to-teal-500/25 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-32 left-16 w-40 h-40 bg-gradient-to-br from-teal-300/30 to-cyan-300/30 dark:from-teal-500/15 dark:to-cyan-500/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-gradient-to-br from-emerald-300/30 to-cyan-300/30 dark:from-emerald-500/15 dark:to-cyan-500/15 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-10 w-full">
          {/* Logo & Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-11 h-11 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/30 group-hover:scale-110 transition-transform">
                <span className="font-bold text-xl text-white">S</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">SMB Panel</span>
            </Link>
          </div>
          
          {/* Main Message */}
          <div className="space-y-5">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-100 dark:bg-cyan-500/20 border border-cyan-200 dark:border-cyan-400/30 rounded-full text-xs font-medium text-cyan-600 dark:text-cyan-300 mb-4">
                <Zap className="w-3.5 h-3.5" />
                #1 Cheapest SMM Panel
              </div>
              <h1 className="text-3xl xl:text-4xl font-bold leading-tight text-gray-900 dark:text-white">
                Grow Your
                <br />
                <span className="bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 dark:from-cyan-400 dark:via-teal-400 dark:to-emerald-400 bg-clip-text text-transparent">
                  Social Media Fast
                </span>
              </h1>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 max-w-sm">
                Real followers, likes & views at unbeatable prices. Trusted by 50,000+ marketers worldwide.
              </p>
            </div>
            
            {/* Supported Platforms */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-500 uppercase tracking-wider">Supported Platforms</h3>
              <div className="grid grid-cols-1 gap-2">
                {services.map((service, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-white/90 dark:bg-slate-800/60 border border-gray-200 dark:border-slate-700/50 hover:bg-white dark:hover:bg-slate-800 hover:border-gray-300 dark:hover:border-slate-600 transition-all duration-300 group cursor-default shadow-sm dark:shadow-none"
                  >
                    <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${service.gradient} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                      <service.icon />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm text-gray-800 dark:text-gray-200">{service.name}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-500 truncate">{service.items}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-2">
              {features.map((feature, idx) => (
                <div 
                  key={idx} 
                  className="p-3 rounded-xl bg-white/90 dark:bg-slate-800/60 border border-gray-200 dark:border-slate-700/50 hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 shadow-sm dark:shadow-none"
                >
                  <feature.icon className="w-5 h-5 mb-1.5 text-cyan-500 dark:text-cyan-400" />
                  <h3 className="font-semibold text-xs text-gray-800 dark:text-gray-200">{feature.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-500">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Social Proof */}
          <div className="flex items-center gap-4 pt-4 border-t border-gray-200/50 dark:border-white/5">
            <div className="flex -space-x-2">
              {['bg-gradient-to-br from-pink-500 to-rose-500', 'bg-gradient-to-br from-blue-500 to-cyan-500', 'bg-gradient-to-br from-amber-500 to-orange-500', 'bg-gradient-to-br from-emerald-500 to-green-500'].map((bg, i) => (
                <div 
                  key={i} 
                  className={`w-8 h-8 rounded-full ${bg} border-2 border-white dark:border-slate-900 flex items-center justify-center text-xs font-bold text-white shadow-lg`}
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
              <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-800 border-2 border-white dark:border-slate-900 flex items-center justify-center text-xs font-medium text-gray-600 dark:text-gray-400">
                +50k
              </div>
            </div>
            <div>
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
                <span className="ml-1.5 text-xs font-medium text-gray-600 dark:text-gray-400">4.9/5</span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-500">Trusted by businesses worldwide</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Panel - Login Form */}
      <div className="flex-1 flex flex-col bg-slate-50 dark:bg-slate-900">
        {/* Navigation */}
        <nav className="flex items-center justify-between p-6">
          <Link href="/" className="lg:hidden inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="font-bold text-xl text-gray-900 dark:text-white">SMB Panel</span>
          </Link>
          <div className="flex items-center gap-4 ml-auto">
            <ThemeToggle />
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Home className="w-4 h-4" />
              Home
            </Link>
          </div>
        </nav>
        
        {/* Form Container */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md space-y-8">
            {/* Header */}
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                {title}
              </h2>
              {subtitle && (
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  {subtitle}
                </p>
              )}
            </div>
            
            {/* Form Card */}
            <div className="bg-white dark:bg-slate-800/80 p-8 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-slate-950/50 border border-gray-100 dark:border-slate-700">
              {children}
            </div>
            
            {/* Footer */}
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              By continuing, you agree to our{' '}
              <Link href="/terms" className="text-cyan-600 dark:text-cyan-400 hover:underline">Terms of Service</Link>
              {' '}and{' '}
              <Link href="/privacy" className="text-cyan-600 dark:text-cyan-400 hover:underline">Privacy Policy</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
