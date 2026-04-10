/**
 * User Dashboard Page - Premium Design
 */

import { DashboardLayout } from '../components/layout';
import { Card, CardBody, StatsCard, Badge, Button } from '../components/ui';
import { useOrders, useTransactions } from '../hooks/useApi';
import useAuthStore from '../store/authStore';
import useCurrencyStore from '../store/currencyStore';
import {
  Package,
  TrendingUp,
  Clock,
  CheckCircle,
  DollarSign,
  Activity,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  MessageCircle,
  Send,
  Zap,
  BarChart3,
  CircleDot,
  ChevronRight,
  Rocket,
  Target,
  Crown,
} from 'lucide-react';
import { formatDate, formatOrderId } from '../lib/utils';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { formatAmount } = useCurrencyStore();
  const { data: ordersData } = useOrders({ limit: 5 });
  const { data: transactionsData } = useTransactions({ limit: 5 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const recentOrders = ordersData?.data || [];
  const recentTransactions = transactionsData?.data || [];
  const totalOrders = ordersData?.meta?.total ?? 0;

  // Calculate stats from orders
  const completedOrders = recentOrders.filter(o => o.status === 'COMPLETED').length;
  const pendingOrders = recentOrders.filter(o =>
    ['PENDING', 'PROCESSING', 'IN_PROGRESS'].includes(o.status)
  ).length;
  const failedOrders = recentOrders.filter(o =>
    ['FAILED', 'CANCELED', 'REFUNDED'].includes(o.status)
  ).length;
  const completionRate = recentOrders.length
    ? Math.round((completedOrders / recentOrders.length) * 100)
    : 0;

  // Wallet signal
  const netChange = recentTransactions.reduce(
    (sum, tx) => sum + (Number(tx.amount) || 0),
    0
  );
  const recentSpend = recentTransactions
    .filter((tx) => (Number(tx.amount) || 0) < 0)
    .reduce((sum, tx) => sum + Math.abs(Number(tx.amount) || 0), 0);

  // Timeline
  const timeline = [
    ...recentOrders.map((order) => ({
      id: order.id,
      type: 'order',
      createdAt: order.createdAt,
      title: order.service?.name || 'Service order',
      subtitle: formatOrderId(order.id),
      badge: order.status,
    })),
    ...recentTransactions.map((tx) => ({
      id: tx.id,
      type: 'transaction',
      createdAt: tx.createdAt,
      title: tx.type?.replace('_', ' ') || 'Transaction',
      subtitle: tx.amount > 0 ? 'Wallet credit' : 'Wallet debit',
      amount: tx.amount,
    })),
  ]
    .filter((item) => item.createdAt && !Number.isNaN(new Date(item.createdAt).getTime()))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);

  return (
    <div className={`space-y-8 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      {/* Premium Hero Section */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-700/50 bg-gradient-to-br from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-800/90 dark:to-slate-900 shadow-xl dark:shadow-2xl">
        {/* Animated Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/10 dark:from-cyan-500/30 dark:to-blue-500/20 blur-3xl animate-pulse" />
          <div className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-gradient-to-br from-violet-500/10 to-fuchsia-500/5 dark:from-violet-500/20 dark:to-fuchsia-500/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-gradient-to-br from-amber-500/5 to-orange-500/5 dark:from-amber-500/10 dark:to-orange-500/5 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiLz48cGF0aCBkPSJNNDAgMEgwdjQwaDQwVjB6TTEgMXYzOGgzOFYxSDF6IiBmaWxsPSJyZ2JhKDAsMCwwLDAuMDMpIi8+PC9nPjwvc3ZnPg==')] dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiLz48cGF0aCBkPSJNNDAgMEgwdjQwaDQwVjB6TTEgMXYzOGgzOFYxSDF6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIi8+PC9nPjwvc3ZnPg==')] opacity-50" />
        </div>
        
        <div className="relative px-4 py-6 md:px-8 md:py-10">
          <div className="grid gap-6 lg:gap-8 lg:grid-cols-3">
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-cyan-600 dark:text-cyan-300 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400"></span>
                </span>
                Command Center
              </div>
              
              {/* Welcome Section */}
              <div className="flex items-center gap-5">
                <div className="relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/30">
                    <Rocket className="h-8 w-8 text-slate-900 dark:text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 ring-4 ring-white dark:ring-slate-900">
                    <CheckCircle className="h-4 w-4 text-slate-900 dark:text-white" />
                  </div>
                </div>
                <div>
              <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-500 dark:from-white dark:via-white dark:to-slate-400 bg-clip-text text-transparent">
                    Welcome back, {user?.username || 'User'}
                  </h1>
                  <p className="mt-1 text-base text-slate-500 dark:text-slate-400 dark:text-slate-400">
                    {totalOrders ? (
                      <span className="flex items-center gap-2">
                        <Crown className="h-4 w-4 text-amber-500 dark:text-amber-400" />
                        {totalOrders} orders placed • Keep up the momentum!
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-cyan-500 dark:text-cyan-400" />
                        Ready to launch your first campaign?
                      </span>
                    )}
                  </p>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <Link href="/orders/new">
                  <Button className="group relative overflow-hidden bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-semibold hover:from-amber-300 hover:to-orange-400 focus:ring-amber-400/50 border-none shadow-lg shadow-amber-500/25 px-4 py-2 md:px-6 md:py-2.5 transition-all duration-300 hover:shadow-amber-500/40 hover:scale-105 text-sm md:text-base">
                    <Zap className="mr-2 h-4 w-4" />
                    New Order
                    <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/wallet">
                  <Button variant="ghost" className="group text-slate-700 dark:text-white border border-slate-300 dark:border-white/20 bg-slate-100/50 dark:bg-white/5 hover:bg-slate-200/50 dark:hover:bg-white/10 hover:border-slate-400 dark:hover:border-white/30 backdrop-blur-sm px-4 py-2 md:px-5 md:py-2.5 transition-all duration-300 hover:scale-105 text-sm md:text-base">
                    <Wallet className="mr-2 h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                    Add Funds
                  </Button>
                </Link>
                <Link href="/tickets">
                  <Button variant="ghost" className="group text-slate-700 dark:text-white border border-slate-300 dark:border-white/20 bg-slate-100/50 dark:bg-white/5 hover:bg-slate-200/50 dark:hover:bg-white/10 hover:border-slate-400 dark:hover:border-white/30 backdrop-blur-sm px-4 py-2 md:px-5 md:py-2.5 transition-all duration-300 hover:scale-105 text-sm md:text-base">
                    <MessageCircle className="mr-2 h-4 w-4 text-violet-500 dark:text-violet-400" />
                    Support
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Wallet Card */}
            <div className="relative group">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500 opacity-20 dark:opacity-30 blur-lg group-hover:opacity-40 dark:group-hover:opacity-50 transition-opacity duration-500" />
              <div className="relative rounded-2xl border border-slate-200 dark:border-white/20 bg-white/90 dark:bg-slate-900/80 p-6 shadow-xl dark:shadow-2xl backdrop-blur-xl">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400 dark:text-slate-400">Available Balance</p>
                    <p className="mt-2 text-4xl font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 dark:from-emerald-400 dark:to-cyan-400 bg-clip-text text-transparent">
                      {formatAmount(user?.balance || 0)}
                    </p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 ring-1 ring-emerald-500/30">
                    <DollarSign className="h-6 w-6 text-emerald-500 dark:text-emerald-400" />
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700/50">
                  <div className="flex items-center gap-2 text-sm">
                    {netChange === 0 ? (
                      <span className="flex items-center gap-2 text-slate-500 dark:text-slate-400 dark:text-slate-400">
                        <Activity className="h-4 w-4" />
                        No recent activity
                      </span>
                    ) : netChange > 0 ? (
                      <span className="flex items-center gap-2 text-emerald-500 dark:text-emerald-400">
                        <ArrowUpRight className="h-4 w-4" />
                        +{formatAmount(Math.abs(netChange))} net inflow
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 text-amber-500 dark:text-amber-400">
                        <ArrowDownRight className="h-4 w-4" />
                        {formatAmount(Math.abs(netChange))} spent
                      </span>
                    )}
                  </div>
                </div>
                
                <Link href="/wallet" className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30 dark:border-emerald-500/20 py-2.5 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:from-emerald-500/20 hover:to-cyan-500/20 transition-all duration-300">
                  <Wallet className="h-4 w-4" />
                  Manage Wallet
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            title: 'Total Balance',
            value: formatAmount(user?.balance || 0),
            icon: DollarSign,
            gradient: 'from-emerald-500 to-cyan-500',
            bgGradient: 'from-emerald-500/10 to-cyan-500/10',
            iconBg: 'bg-emerald-500/20',
            iconColor: 'text-emerald-400',
            delay: '0ms',
          },
          {
            title: 'Active Orders',
            value: pendingOrders,
            icon: Clock,
            gradient: 'from-amber-500 to-orange-500',
            bgGradient: 'from-amber-500/10 to-orange-500/10',
            iconBg: 'bg-amber-500/20',
            iconColor: 'text-amber-400',
            delay: '100ms',
          },
          {
            title: 'Completed',
            value: completedOrders,
            icon: CheckCircle,
            gradient: 'from-violet-500 to-purple-500',
            bgGradient: 'from-violet-500/10 to-purple-500/10',
            iconBg: 'bg-violet-500/20',
            iconColor: 'text-violet-400',
            delay: '200ms',
          },
          {
            title: 'Success Rate',
            value: `${completionRate}%`,
            icon: TrendingUp,
            gradient: 'from-cyan-500 to-blue-500',
            bgGradient: 'from-cyan-500/10 to-blue-500/10',
            iconBg: 'bg-cyan-500/20',
            iconColor: 'text-cyan-400',
            delay: '300ms',
          },
        ].map((stat, idx) => (
          <div
            key={stat.title}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 p-6 backdrop-blur-sm transition-all duration-500 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 hover:-translate-y-1"
            style={{ animationDelay: stat.delay }}
          >
            {/* Hover Gradient Effect */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 dark:text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">{stat.title}</p>
                <p className={`mt-2 text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                  {stat.value}
                </p>
              </div>
              <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${stat.iconBg} ring-1 ring-white/10 group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className={`h-7 w-7 ${stat.iconColor}`} />
              </div>
            </div>
            
            {/* Bottom Accent Line */}
            <div className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${stat.gradient} group-hover:w-full transition-all duration-500`} />
          </div>
        ))}
      </div>

      {/* Orders & Wallet Section */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Recent Orders Card */}
        <div className="xl:col-span-2 rounded-2xl border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 backdrop-blur-sm overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700/50 px-6 py-5 bg-gradient-to-r from-slate-50 dark:from-slate-800/50 to-white dark:to-slate-800/30">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20 ring-1 ring-cyan-500/30">
                <Package className="h-5 w-5 text-cyan-500 dark:text-cyan-400" />
              </div>
              <div>
                <h2 className="font-semibold text-slate-800 dark:text-white">Recent Orders</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-400">Your latest transactions</p>
              </div>
            </div>
            <Link href="/orders" className="group flex items-center gap-1 rounded-lg bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/20 transition-all duration-300">
              View All
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="p-6 space-y-4">
            {recentOrders.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-700/50 mb-4">
                  <Package className="h-8 w-8 text-slate-500 dark:text-slate-400 dark:text-slate-500" />
                </div>
                <p className="text-slate-600 dark:text-slate-400 font-medium">No orders yet</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-500 mt-1">Your orders will appear here</p>
                <Link href="/orders/new">
                  <Button className="mt-4 bg-cyan-500 hover:bg-cyan-400 text-white border-none">
                    <Zap className="mr-2 h-4 w-4" />
                    Place First Order
                  </Button>
                </Link>
              </div>
            ) : (
              recentOrders.map((order, idx) => (
                <div
                  key={order.id}
                  className="group flex items-center justify-between gap-4 rounded-xl border border-slate-200 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-900/30 p-4 transition-all duration-300 hover:border-cyan-500/30 hover:bg-white dark:hover:bg-slate-900/50 hover:shadow-lg hover:shadow-cyan-500/5"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 ring-1 ring-cyan-500/20 group-hover:ring-cyan-500/40 transition-all">
                      <Package className="h-5 w-5 text-cyan-500 dark:text-cyan-400" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-100 transition-colors">{order.service?.name || 'Service'}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-400">
                        {formatOrderId(order.id)} • {formatDate(order.createdAt, { month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      {order.charge !== undefined && (
                        <p className="font-semibold text-slate-800 dark:text-white">{formatAmount(order.charge)}</p>
                      )}
                      {order.quantity !== undefined && (
                        <p className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-400">{order.quantity.toLocaleString()} units</p>
                      )}
                    </div>
                    <Badge status={order.status}>{order.status}</Badge>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Wallet Activity Card */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 backdrop-blur-sm overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700/50 px-6 py-5 bg-gradient-to-r from-slate-50 dark:from-slate-800/50 to-white dark:to-slate-800/30">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 ring-1 ring-emerald-500/30">
                <Wallet className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />
              </div>
              <div>
                <h2 className="font-semibold text-slate-800 dark:text-white">Wallet Activity</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-400">Recent transactions</p>
              </div>
            </div>
            <Link href="/wallet" className="group flex items-center gap-1 rounded-lg bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 transition-all duration-300">
              View
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="p-6 space-y-4">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/50 p-4">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">
                  <ArrowDownRight className="h-3 w-3 text-amber-500 dark:text-amber-400" />
                  Spent
                </div>
                <p className="mt-1 text-lg font-bold text-amber-500 dark:text-amber-400">
                  {recentSpend ? formatAmount(recentSpend) : '₱0.00'}
                </p>
              </div>
              <div className="rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/50 p-4">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">
                  <ArrowUpRight className="h-3 w-3 text-emerald-500 dark:text-emerald-400" />
                  Net
                </div>
                <p className={`mt-1 text-lg font-bold ${netChange >= 0 ? 'text-emerald-500 dark:text-emerald-400' : 'text-rose-500 dark:text-rose-400'}`}>
                  {netChange > 0 ? '+' : ''}{formatAmount(netChange)}
                </p>
              </div>
            </div>
            
            {/* Transactions List */}
            {recentTransactions.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-700/50 mb-3">
                  <Activity className="h-7 w-7 text-slate-500 dark:text-slate-400 dark:text-slate-500" />
                </div>
                <p className="text-slate-600 dark:text-slate-400 font-medium">No transactions</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-500 mt-1">Activity will show here</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentTransactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="group flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-900/30 p-4 transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-white dark:hover:bg-slate-900/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${tx.amount > 0 ? 'bg-emerald-500/20' : 'bg-rose-500/20'}`}>
                        {tx.amount > 0 ? (
                          <ArrowUpRight className="h-5 w-5 text-emerald-400" />
                        ) : (
                          <ArrowDownRight className="h-5 w-5 text-rose-400" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-slate-800 dark:text-white text-sm">
                          {tx.type?.replace('_', ' ') || 'Transaction'}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-400">
                          {formatDate(tx.createdAt)}
                        </p>
                      </div>
                    </div>
                    <span className={`font-semibold ${tx.amount > 0 ? 'text-emerald-500 dark:text-emerald-400' : 'text-rose-500 dark:text-rose-400'}`}>
                      {tx.amount > 0 ? '+' : ''}{formatAmount(tx.amount)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pipeline & Timeline Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Order Pipeline Card */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 backdrop-blur-sm overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700/50 px-6 py-5 bg-gradient-to-r from-slate-50 dark:from-slate-800/50 to-white dark:to-slate-800/30">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/20 ring-1 ring-violet-500/30">
                <BarChart3 className="h-5 w-5 text-violet-500 dark:text-violet-400" />
              </div>
              <div>
                <h2 className="font-semibold text-slate-800 dark:text-white">Order Pipeline</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-400">Live order status breakdown</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-600 dark:text-violet-400 ring-1 ring-violet-500/20">
              <CircleDot className="h-3 w-3" />
              {recentOrders.length ? `${recentOrders.length} active` : 'No data'}
            </div>
          </div>
          <div className="p-6">
            {recentOrders.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-700/50 mb-4">
                  <BarChart3 className="h-8 w-8 text-slate-500 dark:text-slate-400 dark:text-slate-500" />
                </div>
                <p className="text-slate-600 dark:text-slate-400 font-medium">No pipeline data</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-500 mt-1">Place an order to see the breakdown</p>
              </div>
            ) : (
              <div className="space-y-5">
                {[
                  { key: 'PENDING', label: 'Queued', count: recentOrders.filter(o => o.status === 'PENDING').length, gradient: 'from-amber-500 to-orange-500', bg: 'bg-amber-500', ring: 'ring-amber-500/30' },
                  { key: 'PROCESSING', label: 'Processing', count: recentOrders.filter(o => o.status === 'PROCESSING').length, gradient: 'from-sky-500 to-blue-500', bg: 'bg-sky-500', ring: 'ring-sky-500/30' },
                  { key: 'IN_PROGRESS', label: 'In Progress', count: recentOrders.filter(o => o.status === 'IN_PROGRESS').length, gradient: 'from-blue-500 to-indigo-500', bg: 'bg-blue-500', ring: 'ring-blue-500/30' },
                  { key: 'COMPLETED', label: 'Completed', count: completedOrders, gradient: 'from-emerald-500 to-green-500', bg: 'bg-emerald-500', ring: 'ring-emerald-500/30' },
                  { key: 'FAILED', label: 'Failed / Refunded', count: failedOrders, gradient: 'from-rose-500 to-red-500', bg: 'bg-rose-500', ring: 'ring-rose-500/30' },
                ].map((item) => {
                  const denominator = recentOrders.length || 1;
                  const width = Math.round((item.count / denominator) * 100);
                  return (
                    <div key={item.key} className="group">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className={`h-3 w-3 rounded-full bg-gradient-to-r ${item.gradient} ring-2 ${item.ring}`} />
                          <span className="font-medium text-slate-800 dark:text-white">{item.label}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-400">{item.count} orders</span>
                          <span className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500">({width}%)</span>
                        </div>
                      </div>
                      <div className="h-3 rounded-full bg-slate-200 dark:bg-slate-700/50 overflow-hidden">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${item.gradient} transition-all duration-700 ease-out`}
                          style={{ width: `${width}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Live Timeline Card */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 backdrop-blur-sm overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700/50 px-6 py-5 bg-gradient-to-r from-slate-50 dark:from-slate-800/50 to-white dark:to-slate-800/30">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-fuchsia-500/20 ring-1 ring-fuchsia-500/30">
                <Activity className="h-5 w-5 text-fuchsia-500 dark:text-fuchsia-400" />
              </div>
              <div>
                <h2 className="font-semibold text-slate-800 dark:text-white">Live Timeline</h2>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-fuchsia-500/10 px-3 py-1.5 text-xs font-medium text-fuchsia-600 dark:text-fuchsia-400 ring-1 ring-fuchsia-500/20">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fuchsia-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-fuchsia-400"></span>
              </span>
              Latest 6
            </div>
          </div>
          <div className="p-6">
            {timeline.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-700/50 mb-3">
                  <Activity className="h-7 w-7 text-slate-500 dark:text-slate-400 dark:text-slate-500" />
                </div>
                <p className="text-slate-600 dark:text-slate-400 font-medium">No activity yet</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-500 mt-1">Events will appear here</p>
              </div>
            ) : (
              <div className="relative space-y-4">
                {/* Timeline line */}
                <div className="absolute left-5 top-6 bottom-6 w-px bg-gradient-to-b from-slate-300 dark:from-slate-600 via-slate-200 dark:via-slate-700 to-transparent" />
                
                {timeline.map((item, idx) => (
                  <div
                    key={`${item.type}-${item.id}`}
                    className="group relative flex items-start gap-4 rounded-xl border border-slate-200 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-900/30 p-4 transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-white dark:hover:bg-slate-900/50"
                  >
                    <div className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-xl ${item.type === 'order' ? 'bg-cyan-500/20 ring-1 ring-cyan-500/30' : 'bg-emerald-500/20 ring-1 ring-emerald-500/30'}`}>
                      {item.type === 'order' ? (
                        <Package className="h-5 w-5 text-cyan-500 dark:text-cyan-400" />
                      ) : (
                        <DollarSign className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-800 dark:text-white truncate">{item.title}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-400 mt-0.5">
                        {item.subtitle} • {formatDate(item.createdAt, { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      {item.type === 'order' ? (
                        <Badge status={item.badge}>{item.badge}</Badge>
                      ) : (
                        <span className={`font-semibold text-sm ${item.amount > 0 ? 'text-emerald-500 dark:text-emerald-400' : 'text-rose-500 dark:text-rose-400'}`}>
                          {item.amount > 0 ? '+' : ''}{formatAmount(item.amount || 0)}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

DashboardPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
