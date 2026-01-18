/**
 * Home Page - SMM Panel Landing
 */

import Link from 'next/link';
import { useEffect } from 'react';
import {
  ArrowRight,
  CheckCircle,
  Clock,
  CreditCard,
  Headphones,
  Key,
  Rocket,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Wallet,
  Zap,
} from 'lucide-react';
import { Button, ThemeToggle } from '../components/ui';
import useAuthStore from '../store/authStore';
import useThemeStore from '../store/themeStore';
import { formatCurrency } from '../lib/utils';

// Social Media Platform Icons
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

// Platform services data
const platforms = [
  {
    name: 'Instagram',
    icon: InstagramIcon,
    gradient: 'from-pink-500 via-purple-500 to-orange-400',
    services: ['Followers', 'Likes', 'Views', 'Reels Views', 'Story Views', 'Comments'],
  },
  {
    name: 'Facebook',
    icon: FacebookIcon,
    gradient: 'from-blue-600 to-blue-400',
    services: ['Page Likes', 'Post Likes', 'Shares', 'Comments', 'Video Views', 'Reactions'],
  },
  {
    name: 'TikTok',
    icon: TikTokIcon,
    gradient: 'from-gray-900 via-pink-500 to-cyan-400',
    services: ['Followers', 'Likes', 'Views', 'Shares', 'Comments', 'Saves'],
  },
  {
    name: 'YouTube',
    icon: YouTubeIcon,
    gradient: 'from-red-600 to-red-400',
    services: ['Subscribers', 'Views', 'Likes', 'Watch Time', 'Comments', 'Shares'],
  },
  {
    name: 'Twitter/X',
    icon: TwitterIcon,
    gradient: 'from-gray-800 to-gray-600',
    services: ['Followers', 'Likes', 'Retweets', 'Views', 'Comments', 'Bookmarks'],
  },
];

const features = [
  {
    title: 'Instant Delivery',
    description: 'Orders start processing within seconds. Watch your numbers grow in real-time.',
    icon: Zap,
  },
  {
    title: 'Cheapest Prices',
    description: 'Best rates in the market. Get more value for your money with bulk discounts.',
    icon: TrendingUp,
  },
  {
    title: 'Easy Payment',
    description: 'Pay with GCash, PayMaya, PayPal, or bank transfer. Instant wallet top-up.',
    icon: CreditCard,
  },
  {
    title: '24/7 Support',
    description: 'Our support team is always ready to help you with any questions or issues.',
    icon: Headphones,
  },
  {
    title: 'API Access',
    description: 'Integrate our services into your own platform. Perfect for resellers.',
    icon: Key,
  },
  {
    title: 'Secure & Safe',
    description: 'Your account and data are protected with enterprise-grade security.',
    icon: ShieldCheck,
  },
];

const stats = [
  { value: '50K+', label: 'Happy Customers' },
  { value: '10M+', label: 'Orders Completed' },
  { value: '99.9%', label: 'Uptime' },
  { value: '24/7', label: 'Support' },
];

const steps = [
  {
    step: '01',
    title: 'Create Account',
    description: 'Sign up for free in just 30 seconds. No credit card required.',
  },
  {
    step: '02',
    title: 'Add Funds',
    description: 'Top up your wallet using GCash, PayMaya, PayPal, or bank transfer.',
  },
  {
    step: '03',
    title: 'Place Order',
    description: 'Choose your service, enter your link, and watch your growth!',
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

export default function HomePage() {
  const { isAuthenticated, user, initialize } = useAuthStore();
  const { theme, initializeTheme } = useThemeStore();

  useEffect(() => {
    initialize();
    initializeTheme();
  }, [initialize, initializeTheme]);

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
        <div className="flex items-center justify-between px-6 py-4 mx-auto max-w-7xl">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex items-center justify-center w-10 h-10 text-lg font-bold text-white transition-transform shadow-lg rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-indigo-500/30 group-hover:scale-110">
              S
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-gray-900 dark:text-white">SMM Panel</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Grow your social media</span>
            </div>
          </Link>
          <nav className="items-center hidden gap-8 text-sm font-medium text-gray-600 md:flex dark:text-gray-300">
            <a href="#services" className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">Services</a>
            <a href="#features" className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">Features</a>
            <a href="#how-it-works" className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">How It Works</a>
            <a href="#testimonials" className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">Reviews</a>
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            {!isAuthenticated && (
              <Link href="/login">
                <Button variant="ghost" size="sm" className="text-gray-700 dark:text-gray-200">
                  Sign in
                </Button>
              </Link>
            )}
            <Link href={primaryCtaHref}>
              <Button size="sm" className="shadow-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-indigo-500/25">
                {isAuthenticated ? 'Dashboard' : 'Get Started'}
              </Button>
            </Link>
          </div>
        </div>
      </header>
  
      <main className="px-6 mx-auto max-w-7xl">
        {/* Hero Section */}
        <section className="py-20 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-100 border border-indigo-200 rounded-full dark:bg-indigo-500/20 dark:border-indigo-500/30 dark:text-indigo-300">
                <Sparkles className="w-4 h-4" />
                #1 Cheapest SMM Panel in PH
              </div>
              <h1 className="text-4xl font-bold leading-tight lg:text-6xl">
                Grow Your
                <span className="block text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text">
                  Social Media Fast
                </span>
              </h1>
              <p className="max-w-lg text-lg text-gray-600 dark:text-gray-400">
                Get real followers, likes, views, and engagement at the cheapest prices. 
                Trusted by 50,000+ marketers, influencers, and businesses worldwide.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href={primaryCtaHref}>
                  <Button size="lg" className="px-8 shadow-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-indigo-500/30">
                    Start Growing Now
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="#services">
                  <Button variant="outline" size="lg" className="border-gray-300 dark:border-gray-700">
                    View Services
                  </Button>
                </Link>
              </div>
              {/* Trust Badges */}
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Secure Payments</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Instant Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <Headphones className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">24/7 Support</span>
                </div>
              </div>
            </div>
              
            {/* Platform Cards */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl" />
              <div className="relative grid grid-cols-2 gap-4">
                {platforms.slice(0, 4).map((platform, idx) => (
                  <div
                    key={platform.name}
                    className={`p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl hover:scale-105 transition-all duration-300 ${idx === 0 ? 'col-span-2' : ''}`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${platform.gradient} flex items-center justify-center shadow-lg`}>
                        <platform.icon className="w-6 h-6 text-white" />
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
        <section className="py-16">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="p-6 text-center bg-white border border-gray-200 shadow-sm rounded-2xl dark:bg-gray-800 dark:border-gray-700">
                <div className="text-3xl font-bold text-transparent lg:text-4xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>
  
        {/* Services/Platforms Section */}
        <section id="services" className="py-20">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400">Our Services</p>
            <h2 className="text-3xl font-bold lg:text-4xl">All Major Platforms Supported</h2>
            <p className="max-w-2xl mx-auto mt-3 text-gray-600 dark:text-gray-400">
              We provide high-quality SMM services for all major social media platforms at unbeatable prices.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
            {platforms.map((platform) => (
              <div
                key={platform.name}
                className="p-6 transition-all duration-300 bg-white border border-gray-200 shadow-sm group rounded-2xl dark:bg-gray-800 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-xl"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${platform.gradient} flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform`}>
                  <platform.icon className="text-white w-7 h-7" />
                </div>
                <h3 className="mb-2 font-bold text-gray-900 dark:text-white">{platform.name}</h3>
                <ul className="space-y-1">
                  {platform.services.slice(0, 4).map((service) => (
                    <li key={service} className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
  
        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400">Why Choose Us</p>
            <h2 className="text-3xl font-bold lg:text-4xl">The Best SMM Panel Features</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ title, description, icon: Icon }) => (
              <div
                key={title}
                className="p-6 transition-all duration-300 bg-white border border-gray-200 shadow-sm rounded-2xl dark:bg-gray-800 dark:border-gray-700 hover:border-indigo-500/50 hover:shadow-lg group"
              >
                <div className="flex items-center justify-center w-12 h-12 mb-4 text-indigo-600 transition-transform bg-indigo-100 rounded-xl dark:bg-indigo-500/20 dark:text-indigo-400 group-hover:scale-110">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="mb-2 text-lg font-bold">{title}</h3>
                <p className="text-gray-500 dark:text-gray-400">{description}</p>
              </div>
            ))}
          </div>
        </section>
  
        {/* How It Works */}
        <section id="how-it-works" className="py-20">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400">How It Works</p>
            <h2 className="text-3xl font-bold lg:text-4xl">Start Growing in 3 Easy Steps</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.title} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-indigo-500 to-transparent -translate-x-1/2" />
                )}
                <div className="p-8 text-center bg-white border border-gray-200 shadow-sm rounded-2xl dark:bg-gray-800 dark:border-gray-700">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 text-2xl font-bold text-white rounded-full shadow-lg bg-gradient-to-br from-indigo-500 to-purple-600 shadow-indigo-500/30">
                    {step.step}
                  </div>
                  <h3 className="mb-3 text-xl font-bold">{step.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
  
        {/* Testimonials */}
        <section id="testimonials" className="py-20">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400">Testimonials</p>
            <h2 className="text-3xl font-bold lg:text-4xl">What Our Customers Say</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="p-6 bg-white border border-gray-200 shadow-sm rounded-2xl dark:bg-gray-800 dark:border-gray-700">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="mb-6 text-gray-600 dark:text-gray-300">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 font-bold text-white rounded-full bg-gradient-to-br from-indigo-500 to-purple-600">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
  
        {/* CTA Section */}
        <section className="py-20">
          <div className="relative p-12 overflow-hidden text-center text-white border rounded-3xl border-slate-700 bg-gradient-to-br from-slate-900 via-slate-800 to-sky-950 lg:p-16 shadow-xl">
            {/* Glow Effects */}
            <div className="absolute -left-10 top-6 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none" />
            <div className="absolute -right-16 bottom-6 h-52 w-52 rounded-full bg-amber-400/20 blur-3xl pointer-events-none" />
            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
            <div className="relative z-10">
              <h2 className="mb-4 text-3xl font-bold lg:text-4xl">Ready to Grow Your Social Media?</h2>
              <p className="max-w-2xl mx-auto mb-8 text-lg text-white/70">
                Join 50,000+ satisfied customers and start growing your social media presence today.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href={primaryCtaHref}>
                  <Button size="lg" className="px-8 font-bold text-slate-900 bg-amber-400 shadow-xl hover:bg-amber-300 border-none">
                    Get Started Free
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline" className="px-8 text-white bg-white/5 border border-white/20 hover:bg-white/10">
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
        <div className="px-6 py-12 mx-auto max-w-7xl">
          <div className="grid gap-8 mb-8 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 font-bold text-white rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600">
                  S
                </div>
                <span className="text-xl font-bold">SMM Panel</span>
              </div>
              <p className="max-w-sm text-gray-500 dark:text-gray-400">
                The #1 SMM Panel in the Philippines. Get real followers, likes, and views at the cheapest prices.
              </p>
              <div className="flex items-center gap-4 mt-4">
                {platforms.slice(0, 4).map((platform) => (
                  <div key={platform.name} className={`w-8 h-8 rounded-lg bg-gradient-to-br ${platform.gradient} flex items-center justify-center`}>
                    <platform.icon className="w-4 h-4 text-white" />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Quick Links</h4>
              <ul className="space-y-2 text-gray-500 dark:text-gray-400">
                <li><Link href="/register" className="hover:text-indigo-600 dark:hover:text-indigo-400">Sign Up</Link></li>
                <li><Link href="/login" className="hover:text-indigo-600 dark:hover:text-indigo-400">Login</Link></li>
                <li><Link href="/services" className="hover:text-indigo-600 dark:hover:text-indigo-400">Services</Link></li>
                <li><Link href="/api-docs" className="hover:text-indigo-600 dark:hover:text-indigo-400">API Docs</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Support</h4>
              <ul className="space-y-2 text-gray-500 dark:text-gray-400">
                <li><Link href="/tickets" className="hover:text-indigo-600 dark:hover:text-indigo-400">Help Center</Link></li>
                <li><Link href="/faq" className="hover:text-indigo-600 dark:hover:text-indigo-400">FAQ</Link></li>
                <li><Link href="/terms" className="hover:text-indigo-600 dark:hover:text-indigo-400">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-indigo-600 dark:hover:text-indigo-400">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 pt-8 border-t border-gray-200 dark:border-gray-800 md:flex-row">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} SMM Panel. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <ShieldCheck className="w-4 h-4 text-green-500" />
              <span>Secure payments powered by GCash, PayMaya & PayPal</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
