/**
 * Admin Dashboard Page
 * Premium Dark Theme Design
 */

import { DashboardLayout } from '../../components/layout';
import { Card, CardBody, StatsCard, LoadingScreen, Input, Button } from '../../components/ui';
import { Badge } from '../../components/ui';
import { useAdminDashboard, useAdminTopUps, useAdminSelfAdjust } from '../../hooks/useApi';
import { formatCurrency, formatNumber, formatDate } from '../../lib/utils';
import {
  Users,
  Package,
  DollarSign,
  Wallet,
  MessageSquare,
  TrendingUp,
  Clock,
  AlertTriangle,
  ArrowRight,
  RefreshCw,
  Shield,
  Target,
  ChevronRight,
  Sparkles,
  BarChart3,
  Key,
  Plus,
  Minus,
  Zap,
  TestTube,
} from 'lucide-react';
import Link from 'next/link';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import useAuthStore from '../../store/authStore';

export default function AdminDashboardPage() {
  const queryClient = useQueryClient();
  const { data: metrics, isLoading, refetch: refetchMetrics } = useAdminDashboard();
  const { data: topUpsData, refetch: refetchTopUps } = useAdminTopUps({ limit: 5 });
  const recentTopUps = topUpsData?.data || [];
  const { user, refreshBalance } = useAuthStore();
  const selfAdjust = useAdminSelfAdjust();
  
  // Quick funds state
  const [quickAmount, setQuickAmount] = useState('');
  const [isDeducting, setIsDeducting] = useState(false);
  const PRESET_AMOUNTS = [100, 500, 1000, 5000, 10000];

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ['admin', 'dashboard'] });
    queryClient.invalidateQueries({ queryKey: ['admin', 'topups'] });
    refetchMetrics();
    refetchTopUps();
  };

  const handleQuickFunds = async (amount, deduct = false) => {
    if (!amount || amount <= 0) return;
    const finalAmount = deduct ? -Math.abs(parseFloat(amount)) : Math.abs(parseFloat(amount));
    await selfAdjust.mutateAsync({
      amount: finalAmount,
      description: deduct 
        ? `Deducted test funds (-${formatCurrency(Math.abs(amount))})` 
        : `Added test funds (+${formatCurrency(amount)})`
    });
    setQuickAmount('');
    refreshBalance(); // Refresh the user balance
  };

  if (isLoading) {
    return (
      <DashboardLayout isAdmin>
        <LoadingScreen />
      </DashboardLayout>
    );
  }

  return (
    <div className="space-y-6">
      {/* Premium Hero Header */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-700/50 bg-gradient-to-br from-slate-900 via-slate-800/90 to-slate-900 shadow-2xl">
        {/* Animated Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-gradient-to-br from-amber-500/30 to-orange-500/20 blur-3xl animate-pulse" />
          <div className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-gradient-to-br from-violet-500/20 to-fuchsia-500/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-500/5 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiLz48cGF0aCBkPSJNNDAgMEgwdjQwaDQwVjB6TTEgMXYzOGgzOFYxSDF6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIi8+PC9nPjwvc3ZnPg==')] opacity-50" />
        </div>

        <div className="relative px-6 py-8 md:px-8 md:py-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-4">
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-amber-300 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400"></span>
                </span>
                Admin Control Center
              </div>
              
              {/* Title Section */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-500/30">
                    <Shield className="h-7 w-7 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-white to-slate-400 bg-clip-text text-transparent">
                    Admin Dashboard
                  </h1>
                  <p className="text-base text-slate-400 flex items-center gap-2">
                    <Target className="h-4 w-4 text-amber-400" />
                    Overview of your SMM panel performance
                  </p>
                </div>
              </div>
            </div>

            {/* Refresh Button */}
            <Button
              variant="ghost"
              onClick={handleRefresh}
              className="text-white border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30 backdrop-blur-sm"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </div>

      {/* Premium Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          {
            title: 'Total Revenue',
            value: formatCurrency(metrics?.revenue?.total || 0),
            change: `${formatCurrency(metrics?.revenue?.today || 0)} today`,
            icon: DollarSign,
            gradient: 'from-emerald-500 to-cyan-500',
            bgGradient: 'from-emerald-500/10 to-cyan-500/10',
            iconBg: 'bg-emerald-500/20',
            iconColor: 'text-emerald-400',
            ring: 'ring-emerald-500/30',
            changeColor: 'text-emerald-400',
          },
          {
            title: 'Total Users',
            value: formatNumber(metrics?.users?.total || 0),
            change: `${metrics?.users?.newToday || 0} new today`,
            icon: Users,
            gradient: 'from-blue-500 to-indigo-500',
            bgGradient: 'from-blue-500/10 to-indigo-500/10',
            iconBg: 'bg-blue-500/20',
            iconColor: 'text-blue-400',
            ring: 'ring-blue-500/30',
            changeColor: 'text-blue-400',
          },
          {
            title: 'Total Orders',
            value: formatNumber(metrics?.orders?.total || 0),
            change: `${metrics?.orders?.today || 0} today`,
            icon: Package,
            gradient: 'from-violet-500 to-purple-500',
            bgGradient: 'from-violet-500/10 to-purple-500/10',
            iconBg: 'bg-violet-500/20',
            iconColor: 'text-violet-400',
            ring: 'ring-violet-500/30',
            changeColor: 'text-violet-400',
          },
          {
            title: 'API Keys',
            value: formatNumber(metrics?.apiKeys?.total || 0),
            change: `${formatNumber(metrics?.apiKeys?.active || 0)} active`,
            icon: Key,
            gradient: 'from-cyan-500 to-teal-500',
            bgGradient: 'from-cyan-500/10 to-teal-500/10',
            iconBg: 'bg-cyan-500/20',
            iconColor: 'text-cyan-400',
            ring: 'ring-cyan-500/30',
            changeColor: 'text-cyan-400',
          },
          {
            title: 'Pending Top-ups',
            value: formatNumber(metrics?.topups?.pending || 0),
            change: formatCurrency(metrics?.topups?.pendingAmount || 0),
            icon: Wallet,
            gradient: 'from-amber-500 to-orange-500',
            bgGradient: 'from-amber-500/10 to-orange-500/10',
            iconBg: 'bg-amber-500/20',
            iconColor: 'text-amber-400',
            ring: 'ring-amber-500/30',
            changeColor: 'text-amber-400',
          },
        ].map((stat) => (
          <div
            key={stat.title}
            className="group relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/50 p-5 backdrop-blur-sm transition-all duration-500 hover:border-slate-600 hover:bg-slate-800/80 hover:shadow-xl hover:shadow-slate-900/50 hover:-translate-y-1"
          >
            {/* Hover Gradient Effect */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400 group-hover:text-slate-300 transition-colors">{stat.title}</p>
                <p className={`mt-2 text-2xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                  {stat.value}
                </p>
                <p className={`mt-1 text-xs ${stat.changeColor}`}>{stat.change}</p>
              </div>
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.iconBg} ring-1 ${stat.ring} group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
              </div>
            </div>
            
            {/* Bottom Accent Line */}
            <div className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${stat.gradient} group-hover:w-full transition-all duration-500`} />
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/admin/topups">
          <div className={`group relative overflow-hidden rounded-2xl border p-5 transition-all duration-300 cursor-pointer ${
            metrics?.topups?.pending > 0 
              ? 'border-amber-500/50 bg-amber-500/10' 
              : 'border-slate-700/50 bg-slate-800/50 hover:border-slate-600'
          }`}>
            <div className="flex items-center gap-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ring-1 ${
                metrics?.topups?.pending > 0
                  ? 'bg-amber-500/20 ring-amber-500/30'
                  : 'bg-slate-700/50 ring-slate-600/50'
              }`}>
                <Wallet className={`w-6 h-6 ${metrics?.topups?.pending > 0 ? 'text-amber-400' : 'text-slate-400'}`} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white">Pending Top-ups</h3>
                <p className="text-sm text-slate-400">
                  {metrics?.topups?.pending || 0} requests waiting
                </p>
              </div>
              <ChevronRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${metrics?.topups?.pending > 0 ? 'text-amber-400' : 'text-slate-500'}`} />
            </div>
          </div>
        </Link>

        <Link href="/admin/orders?status=PENDING">
          <div className={`group relative overflow-hidden rounded-2xl border p-5 transition-all duration-300 cursor-pointer ${
            metrics?.orders?.pending > 0 
              ? 'border-blue-500/50 bg-blue-500/10' 
              : 'border-slate-700/50 bg-slate-800/50 hover:border-slate-600'
          }`}>
            <div className="flex items-center gap-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ring-1 ${
                metrics?.orders?.pending > 0
                  ? 'bg-blue-500/20 ring-blue-500/30'
                  : 'bg-slate-700/50 ring-slate-600/50'
              }`}>
                <Clock className={`w-6 h-6 ${metrics?.orders?.pending > 0 ? 'text-blue-400' : 'text-slate-400'}`} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white">Pending Orders</h3>
                <p className="text-sm text-slate-400">
                  {metrics?.orders?.pending || 0} orders waiting
                </p>
              </div>
              <ChevronRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${metrics?.orders?.pending > 0 ? 'text-blue-400' : 'text-slate-500'}`} />
            </div>
          </div>
        </Link>

        <Link href="/admin/tickets">
          <div className={`group relative overflow-hidden rounded-2xl border p-5 transition-all duration-300 cursor-pointer ${
            metrics?.tickets?.urgent > 0 
              ? 'border-red-500/50 bg-red-500/10' 
              : 'border-slate-700/50 bg-slate-800/50 hover:border-slate-600'
          }`}>
            <div className="flex items-center gap-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ring-1 ${
                metrics?.tickets?.urgent > 0
                  ? 'bg-red-500/20 ring-red-500/30'
                  : 'bg-slate-700/50 ring-slate-600/50'
              }`}>
                <MessageSquare className={`w-6 h-6 ${metrics?.tickets?.urgent > 0 ? 'text-red-400' : 'text-slate-400'}`} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white">Open Tickets</h3>
                <p className="text-sm text-slate-400">
                  {metrics?.tickets?.open || 0} tickets ({metrics?.tickets?.urgent || 0} urgent)
                </p>
              </div>
              <ChevronRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${metrics?.tickets?.urgent > 0 ? 'text-red-400' : 'text-slate-500'}`} />
            </div>
          </div>
        </Link>
      </div>

      {/* Admin Quick Funds - For Testing */}
      <div className="rounded-2xl border border-violet-500/30 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 backdrop-blur-sm overflow-hidden">
        <div className="flex items-center justify-between border-b border-violet-500/20 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 shadow-lg shadow-violet-500/30">
              <TestTube className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-white flex items-center gap-2">
                Quick Test Funds
                <span className="text-xs px-2 py-0.5 rounded-full bg-violet-500/30 text-violet-300 font-medium">Admin Only</span>
              </h2>
              <p className="text-xs text-slate-400">Add or deduct balance instantly for testing</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-400">Current Balance</p>
            <p className="font-bold text-lg bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              {formatCurrency(user?.balance || 0)}
            </p>
          </div>
        </div>
        <div className="p-6">
          {/* Add/Deduct Toggle */}
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={() => setIsDeducting(false)}
              className={`flex-1 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                !isDeducting
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                  : 'bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:border-slate-600'
              }`}
            >
              <Plus className="w-4 h-4" />
              Add Funds
            </button>
            <button
              onClick={() => setIsDeducting(true)}
              className={`flex-1 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                isDeducting
                  ? 'bg-red-500/20 text-red-400 border border-red-500/50'
                  : 'bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:border-slate-600'
              }`}
            >
              <Minus className="w-4 h-4" />
              Deduct Funds
            </button>
          </div>

          {/* Preset Amount Buttons */}
          <div className="flex flex-wrap gap-3 mb-4">
            {PRESET_AMOUNTS.map((amount) => (
              <button
                key={amount}
                onClick={() => handleQuickFunds(amount, isDeducting)}
                disabled={selfAdjust.isPending || (isDeducting && (user?.balance || 0) < amount)}
                className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                  isDeducting
                    ? 'bg-slate-800/80 hover:bg-red-500/30 border border-slate-700/50 hover:border-red-500/50 text-white'
                    : 'bg-slate-800/80 hover:bg-emerald-500/30 border border-slate-700/50 hover:border-emerald-500/50 text-white'
                }`}
              >
                {isDeducting ? (
                  <Minus className="w-4 h-4 text-red-400" />
                ) : (
                  <Plus className="w-4 h-4 text-emerald-400" />
                )}
                {formatCurrency(amount)}
              </button>
            ))}
          </div>

          {/* Custom Amount Input */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="number"
                value={quickAmount}
                onChange={(e) => setQuickAmount(e.target.value)}
                placeholder="Custom amount..."
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/50 border border-slate-600 text-white placeholder-slate-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 focus:outline-none"
              />
            </div>
            <button
              onClick={() => handleQuickFunds(quickAmount, isDeducting)}
              disabled={!quickAmount || selfAdjust.isPending || (isDeducting && (user?.balance || 0) < parseFloat(quickAmount))}
              className={`px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                isDeducting
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-red-500/30'
                  : 'bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white shadow-emerald-500/30'
              }`}
            >
              {selfAdjust.isPending ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : isDeducting ? (
                <Minus className="w-5 h-5" />
              ) : (
                <Zap className="w-5 h-5" />
              )}
              {isDeducting ? 'Deduct' : 'Add Funds'}
            </button>
          </div>
        </div>
      </div>

      {/* Revenue & User Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Overview */}
        <div className="rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-700/50 px-6 py-4 bg-gradient-to-r from-slate-800/50 to-slate-800/30">
            <h2 className="font-semibold flex items-center gap-2 text-white">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 ring-1 ring-emerald-500/30">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              </div>
              Revenue Overview
            </h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Today</span>
              <span className="font-semibold text-white">
                {formatCurrency(metrics?.revenue?.today || 0)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">This Week</span>
              <span className="font-semibold text-white">
                {formatCurrency(metrics?.revenue?.thisWeek || 0)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">This Month</span>
              <span className="font-semibold text-white">
                {formatCurrency(metrics?.revenue?.thisMonth || 0)}
              </span>
            </div>
            <hr className="border-slate-700/50" />
            <div className="flex justify-between items-center">
              <span className="text-slate-400 font-medium">All Time</span>
              <span className="font-bold text-lg bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                {formatCurrency(metrics?.revenue?.total || 0)}
              </span>
            </div>
          </div>
        </div>

        {/* User Statistics */}
        <div className="rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-700/50 px-6 py-4 bg-gradient-to-r from-slate-800/50 to-slate-800/30">
            <h2 className="font-semibold flex items-center gap-2 text-white">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/20 ring-1 ring-blue-500/30">
                <Users className="w-4 h-4 text-blue-400" />
              </div>
              User Statistics
            </h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Active Users</span>
              <span className="font-semibold text-emerald-400">
                {formatNumber(metrics?.users?.active || 0)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Banned Users</span>
              <span className="font-semibold text-red-400">
                {formatNumber(metrics?.users?.banned || 0)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">New Today</span>
              <span className="font-semibold text-white">
                {formatNumber(metrics?.users?.newToday || 0)}
              </span>
            </div>
            <hr className="border-slate-700/50" />
            <div className="flex justify-between items-center">
              <span className="text-slate-400 font-medium">Total Users</span>
              <span className="font-bold text-lg text-white">
                {formatNumber(metrics?.users?.total || 0)}
              </span>
            </div>
          </div>
        </div>

        {/* API Keys Statistics */}
        <div className="rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-700/50 px-6 py-4 bg-gradient-to-r from-slate-800/50 to-slate-800/30">
            <h2 className="font-semibold flex items-center gap-2 text-white">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/20 ring-1 ring-cyan-500/30">
                <Key className="w-4 h-4 text-cyan-400" />
              </div>
              API Keys
            </h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Total Keys</span>
              <span className="font-semibold text-white">
                {formatNumber(metrics?.apiKeys?.total || 0)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Active Keys</span>
              <span className="font-semibold text-emerald-400">
                {formatNumber(metrics?.apiKeys?.active || 0)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Inactive Keys</span>
              <span className="font-semibold text-slate-500">
                {formatNumber((metrics?.apiKeys?.total || 0) - (metrics?.apiKeys?.active || 0))}
              </span>
            </div>
            <hr className="border-slate-700/50" />
            <div className="flex justify-between items-center">
              <span className="text-slate-400 font-medium">Total Requests</span>
              <span className="font-bold text-lg bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                {formatNumber(metrics?.apiKeys?.totalRequests || 0)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Top-ups */}
      <div className="rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-700/50 px-6 py-4 bg-gradient-to-r from-slate-800/50 to-slate-800/30">
          <h2 className="font-semibold flex items-center gap-2 text-white">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/20 ring-1 ring-violet-500/30">
              <Wallet className="w-4 h-4 text-violet-400" />
            </div>
            Recent Top-ups
          </h2>
          <Link href="/admin/topups" className="group flex items-center gap-1 rounded-lg bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-400 hover:bg-violet-500/20 transition-all duration-300">
            View All
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-900/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Method</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {recentTopUps?.map((topUp) => (
                <tr key={topUp.id} className="hover:bg-slate-700/30 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-white">{topUp.user?.username || 'Unknown'}</p>
                      <p className="text-xs text-slate-400">{topUp.user?.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                      {formatCurrency(topUp.amount)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-white">{topUp.paymentMethod}</td>
                  <td className="px-6 py-4">
                    <Badge status={topUp.status}>{topUp.status}</Badge>
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-sm">
                    {formatDate(topUp.createdAt)}
                  </td>
                </tr>
              ))}
              {(!recentTopUps || recentTopUps.length === 0) && (
                <tr>
                  <td colSpan="5" className="text-center py-12 text-slate-400">
                    <Wallet className="w-10 h-10 mx-auto mb-3 text-slate-500" />
                    No recent top-ups found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

AdminDashboardPage.getLayout = function getLayout(page) {
  return <DashboardLayout isAdmin>{page}</DashboardLayout>;
};
