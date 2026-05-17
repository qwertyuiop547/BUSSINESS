/**
 * Orders List Page
 * Premium Dark Theme Design
 */

import { useState } from 'react';
import { DashboardLayout } from '../../components/layout';
import {
  Button,
  Badge,
  Pagination,
  LoadingScreen,
  Card,
  CardBody,
  EmptyState,
  Select,
} from '../../components/ui';
import { useOrders } from '../../hooks/useApi';
import useAuthStore from '../../store/authStore';
import useCurrencyStore from '../../store/currencyStore';
import {
  formatDate,
  formatOrderId,
  truncate,
  formatNumber,
} from '../../lib/utils';
import {
  Package,
  ExternalLink,
  RefreshCw,
  Plus,
  CheckCircle2,
  Clock,
  ArrowRight,
  Filter,
  X,
  Wallet,
  TrendingUp,
  Rocket,
  Target,
  ChevronRight,
  Zap,
} from 'lucide-react';
import Link from 'next/link';

const statusOptions = [
  { value: '', label: 'All Statuses' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'PROCESSING', label: 'Processing' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'PARTIAL', label: 'Partial' },
  { value: 'FAILED', label: 'Failed' },
  { value: 'CANCELED', label: 'Canceled' },
  { value: 'REFUNDED', label: 'Refunded' },
];

export default function OrdersPage() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('');
  const { user } = useAuthStore();
  const { formatAmount } = useCurrencyStore();

  const { data, isLoading, refetch, isFetching } = useOrders({
    page,
    limit: 10,
    ...(status && { status }),
  });

  const orders = data?.data || [];
  const pagination = data?.pagination || { total: 0, pages: 1 };

  const completedOrders = orders.filter((order) => order.status === 'COMPLETED').length;
  const inProgressOrders = orders.filter((order) =>
    ['PROCESSING', 'IN_PROGRESS', 'PENDING'].includes(order.status)
  ).length;
  const statusLabel = statusOptions.find((option) => option.value === status)?.label;

  if (isLoading) {
    return <LoadingScreen />;
  }

  const stats = [
    {
      label: 'Balance',
      value: formatAmount(user?.balance || 0),
      icon: Wallet,
      gradient: 'from-emerald-500 to-cyan-500',
      bgGradient: 'from-emerald-500/10 to-cyan-500/10',
      iconBg: 'bg-emerald-500/20',
      iconColor: 'text-emerald-400',
      ring: 'ring-emerald-500/30',
    },
    {
      label: 'Total Orders',
      value: formatNumber(pagination.total),
      icon: Package,
      gradient: 'from-violet-500 to-purple-500',
      bgGradient: 'from-violet-500/10 to-purple-500/10',
      iconBg: 'bg-violet-500/20',
      iconColor: 'text-violet-400',
      ring: 'ring-violet-500/30',
    },
    {
      label: 'Completed',
      value: formatNumber(completedOrders),
      icon: CheckCircle2,
      gradient: 'from-cyan-500 to-blue-500',
      bgGradient: 'from-cyan-500/10 to-blue-500/10',
      iconBg: 'bg-cyan-500/20',
      iconColor: 'text-cyan-400',
      ring: 'ring-cyan-500/30',
    },
    {
      label: 'In Progress',
      value: formatNumber(inProgressOrders),
      icon: Clock,
      gradient: 'from-amber-500 to-orange-500',
      bgGradient: 'from-amber-500/10 to-orange-500/10',
      iconBg: 'bg-amber-500/20',
      iconColor: 'text-amber-400',
      ring: 'ring-amber-500/30',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Premium Hero Header */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-700/50 bg-gradient-to-br from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-800/90 dark:to-slate-900 shadow-xl dark:shadow-2xl">
        {/* Animated Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-gradient-to-br from-violet-500/30 to-purple-500/20 blur-3xl animate-pulse" />
          <div className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiLz48cGF0aCBkPSJNNDAgMEgwdjQwaDQwVjB6TTEgMXYzOGgzOFYxSDF6IiBmaWxsPSJyZ2JhKDAsMCwwLDAuMDMpIi8+PC9nPjwvc3ZnPg==')] dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiLz48cGF0aCBkPSJNNDAgMEgwdjQwaDQwVjB6TTEgMXYzOGgzOFYxSDF6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIi8+PC9nPjwvc3ZnPg==')] opacity-50" />
        </div>

        <div className="relative px-6 py-8 md:px-8 md:py-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-4">
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-violet-600 dark:text-violet-300 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-400"></span>
                </span>
                Order Management
              </div>
              
              {/* Title Section */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/30">
                    <Package className="h-7 w-7 text-slate-900 dark:text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-800 to-slate-500 dark:from-white dark:via-white dark:to-slate-400 bg-clip-text text-transparent">
                    Orders
                  </h1>
                  <p className="text-base text-slate-500 dark:text-slate-400 dark:text-slate-400 flex items-center gap-2">
                    <Target className="h-4 w-4 text-violet-400" />
                    Manage and track all your orders
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <select
                value={status}
                onChange={(event) => {
                  setStatus(event.target.value);
                  setPage(1);
                }}
                className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/50 text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 backdrop-blur-sm"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <Button
                variant="ghost"
                onClick={() => refetch()}
                disabled={isFetching}
                className="text-slate-700 dark:text-white border border-slate-200 dark:border-white/20 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/30 backdrop-blur-sm"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isFetching ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Link href="/orders/new">
                <Button className="bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-semibold hover:from-amber-300 hover:to-orange-400 border-none shadow-lg shadow-amber-500/25">
                  <Zap className="w-4 h-4 mr-2" />
                  New Order
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 p-5 backdrop-blur-sm transition-all duration-500 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 hover:-translate-y-1"
          >
            {/* Hover Gradient Effect */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            
            <div className="relative flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 dark:text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors mb-1">
                  {stat.label}
                </p>
                <p className={`text-2xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent truncate`}>
                  {stat.value}
                </p>
              </div>
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.iconBg} ring-1 ${stat.ring} ml-3 flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
              </div>
            </div>
            
            {/* Bottom Accent Line */}
            <div className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${stat.gradient} group-hover:w-full transition-all duration-500`} />
          </div>
        ))}
      </div>

      {/* Orders List Card */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 backdrop-blur-sm overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700/50 px-6 py-5 bg-gradient-to-r from-slate-50 to-slate-100/50 dark:from-slate-800/50 dark:to-slate-800/30">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/20 ring-1 ring-violet-500/30">
              <Package className="h-5 w-5 text-violet-400" />
            </div>
            <div>
              <h2 className="font-semibold text-slate-800 dark:text-white">Orders List</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-400">
                {status ? `${statusLabel} orders` : 'All orders'} · {formatNumber(pagination.total)} total
              </p>
            </div>
          </div>
          {status && (
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-violet-500/20 text-violet-400 ring-1 ring-violet-500/30">
                <Filter className="w-3 h-3" />
                {statusLabel}
              </span>
              <button
                onClick={() => setStatus('')}
                className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-200 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-600/50 hover:text-slate-700 dark:hover:text-white transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
        <div className="p-0">
          {orders.length === 0 ? (
            <div className="py-16 px-4">
              <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-700/50 mb-4">
                  <Package className="h-10 w-10 text-slate-500 dark:text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
                  No orders found
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-400 mb-6">
                  {status
                    ? `You don't have any ${statusLabel?.toLowerCase()} orders.`
                    : "You haven't placed any orders yet. Start boosting your social presence!"}
                </p>
                {!status && (
                  <Link href="/orders/new">
                    <Button className="bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-semibold hover:from-amber-300 hover:to-orange-400 border-none shadow-lg shadow-amber-500/25">
                      <Zap className="w-4 h-4 mr-2" />
                      Place your first order
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 dark:bg-slate-900/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 dark:text-slate-400 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 dark:text-slate-400 uppercase tracking-wider">
                        Service
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 dark:text-slate-400 uppercase tracking-wider">
                        Link
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 dark:text-slate-400 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 dark:text-slate-400 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 dark:text-slate-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 dark:text-slate-400 uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                    {orders.map((order) => (
                      <tr
                        key={order.id}
                        className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="font-mono text-sm text-slate-600 dark:text-slate-300">
                            {formatOrderId(order.id)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="max-w-[220px]">
                            <p className="text-sm font-medium text-slate-800 dark:text-white truncate">
                              {order.service?.name || 'Service'}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-400 mt-0.5">
                              {order.service?.platform || 'Unknown'}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <a
                            href={order.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors group"
                          >
                            <span className="truncate max-w-[150px]">
                              {truncate(order.link, 25)}
                            </span>
                            <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                          </a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm">
                            <p className="font-medium text-slate-800 dark:text-white">
                              {order.quantity !== null && order.quantity !== undefined
                                ? order.quantity.toLocaleString()
                                : '-'}
                            </p>
                            {order.remains !== null && order.remains > 0 && (
                              <p className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-400 mt-0.5">
                                {order.remains} left
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-semibold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                            {formatAmount(order.charge || 0)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge status={order.status}>{order.status}</Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-400">
                            {formatDate(order.createdAt, {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden divide-y divide-slate-100 dark:divide-slate-700/50">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-4 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <p className="font-mono text-xs text-slate-500 dark:text-slate-400 dark:text-slate-400 mb-1">
                          {formatOrderId(order.id)}
                        </p>
                        <h3 className="text-sm font-semibold text-slate-800 dark:text-white truncate mb-1">
                          {order.service?.name || 'Service'}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-400">
                          {order.service?.platform || 'Unknown'}
                        </p>
                      </div>
                      <Badge status={order.status} className="ml-2 flex-shrink-0">
                        {order.status}
                      </Badge>
                    </div>

                    <a
                      href={order.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 text-sm font-medium mb-3 group"
                    >
                      <span className="truncate flex-1 min-w-0">
                        {truncate(order.link, 40)}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    </a>

                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 dark:border-slate-700/50">
                      <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-400 mb-0.5">Quantity</p>
                        <p className="text-sm font-medium text-slate-800 dark:text-white">
                          {order.quantity !== null && order.quantity !== undefined
                            ? order.quantity.toLocaleString()
                            : '-'}
                          {order.remains !== null && order.remains > 0 && (
                            <span className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-400 ml-1">
                              ({order.remains} left)
                            </span>
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-400 mb-0.5">Amount</p>
                        <p className="text-sm font-semibold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                          {formatAmount(order.charge || 0)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700/50">
                      <span className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-400">
                        {formatDate(order.createdAt, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {pagination.pages > 1 && (
                <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-900/30">
                  <div className="flex justify-center">
                    <Pagination
                      currentPage={page}
                      totalPages={pagination.pages}
                      onPageChange={setPage}
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

OrdersPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};