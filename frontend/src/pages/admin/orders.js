/**
 * Admin Orders Page
 * Premium Dark Theme Design
 */

import { useState } from 'react';
import { DashboardLayout } from '../../components/layout';
import {
  Card,
  CardBody,
  Button,
  Select,
  Badge,
  Pagination,
  EmptyState,
  Modal,
  Input,
  Textarea,
  LoadingScreen,
} from '../../components/ui';
import { useAdminOrders } from '../../hooks/useApi';
import api from '../../lib/api';
import { formatCurrency, formatDate, formatOrderId, truncate } from '../../lib/utils';
import { 
  Package, 
  ExternalLink, 
  RefreshCw, 
  Edit, 
  RotateCcw,
  Target,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Loader,
  Hash,
  User,
  Link as LinkIcon,
  Layers,
  DollarSign,
  Calendar,
  ArrowRight,
  Sparkles,
  ShoppingCart,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

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

export default function AdminOrdersPage() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [refundData, setRefundData] = useState({ amount: '', reason: '' });

  const { data, isLoading, refetch, isFetching } = useAdminOrders({
    page,
    limit: 20,
    ...(status && { status }),
  });

  const orders = data?.data || [];
  const pagination = data?.pagination || { total: 0, pages: 1 };

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ['admin', 'orders'] });
    refetch();
  };

  const handleUpdateOrder = async () => {
    try {
      await api.patch(`/v1/admin/orders/${selectedOrder.id}`, editData);
      toast.success('Order updated');
      setShowEditModal(false);
      setSelectedOrder(null);
      setEditData({});
      refetch();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update order');
    }
  };

  const handleRefund = async () => {
    try {
      await api.post(`/v1/admin/orders/${selectedOrder.id}/refund`, {
        amount: refundData.amount ? parseFloat(refundData.amount) : undefined,
        reason: refundData.reason,
      });
      toast.success('Order refunded');
      setShowRefundModal(false);
      setSelectedOrder(null);
      setRefundData({ amount: '', reason: '' });
      refetch();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to refund order');
    }
  };

  // Status filter options with icons and colors
  const statusFilters = [
    { value: '', label: 'All', icon: Package, color: 'slate' },
    { value: 'PENDING', label: 'Pending', icon: Clock, color: 'amber' },
    { value: 'PROCESSING', label: 'Processing', icon: Loader, color: 'blue' },
    { value: 'IN_PROGRESS', label: 'In Progress', icon: Loader, color: 'cyan' },
    { value: 'COMPLETED', label: 'Completed', icon: CheckCircle, color: 'emerald' },
    { value: 'PARTIAL', label: 'Partial', icon: AlertTriangle, color: 'orange' },
    { value: 'FAILED', label: 'Failed', icon: XCircle, color: 'red' },
    { value: 'CANCELED', label: 'Canceled', icon: XCircle, color: 'slate' },
    { value: 'REFUNDED', label: 'Refunded', icon: RotateCcw, color: 'violet' },
  ];

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
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-700/50 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800/90 dark:to-slate-900 shadow-2xl">
        {/* Animated Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-gradient-to-br from-blue-500/30 to-cyan-500/20 blur-3xl animate-pulse" />
          <div className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-gradient-to-br from-violet-500/20 to-fuchsia-500/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiLz48cGF0aCBkPSJNNDAgMEgwdjQwaDQwVjB6TTEgMXYzOGgzOFYxSDF6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIi8+PC9nPjwvc3ZnPg==')] opacity-50" />
        </div>

        <div className="relative px-6 py-8 md:px-8 md:py-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-4">
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-blue-300 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-400"></span>
                </span>
                Order Management
              </div>
              
              {/* Title Section */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 shadow-lg shadow-blue-500/30">
                    <ShoppingCart className="h-7 w-7 text-slate-900 dark:text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600 dark:from-white dark:via-white dark:to-slate-400 bg-clip-text text-transparent">
                    Orders
                  </h1>
                  <p className="text-base text-slate-500 dark:text-slate-400 dark:text-slate-400 flex items-center gap-2">
                    <Target className="h-4 w-4 text-blue-400" />
                    Manage and track all customer orders
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                onClick={handleRefresh}
                disabled={isFetching}
                className="text-slate-900 dark:text-white border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30 backdrop-blur-sm"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isFetching ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {statusFilters.slice(0, 5).map((option) => {
            const Icon = option.icon;
            const isActive = status === option.value;
            const colorMap = {
              slate: { active: 'border-slate-500/50 bg-slate-500/20 text-slate-300', icon: 'text-slate-400' },
              amber: { active: 'border-amber-500/50 bg-amber-500/20 text-amber-300', icon: 'text-amber-400' },
              blue: { active: 'border-blue-500/50 bg-blue-500/20 text-blue-300', icon: 'text-blue-400' },
              cyan: { active: 'border-cyan-500/50 bg-cyan-500/20 text-cyan-300', icon: 'text-cyan-400' },
              emerald: { active: 'border-emerald-500/50 bg-emerald-500/20 text-emerald-300', icon: 'text-emerald-400' },
              orange: { active: 'border-orange-500/50 bg-orange-500/20 text-orange-300', icon: 'text-orange-400' },
              red: { active: 'border-red-500/50 bg-red-500/20 text-red-300', icon: 'text-red-400' },
              violet: { active: 'border-violet-500/50 bg-violet-500/20 text-violet-300', icon: 'text-violet-400' },
            };
            const colors = colorMap[option.color];
            
            return (
              <button
                key={option.value}
                onClick={() => { setStatus(option.value); setPage(1); }}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all duration-200 text-sm ${ isActive ? colors.active : 'border-slate-700/50 bg-white dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600 hover:text-slate-300' }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? colors.icon : 'text-slate-500'}`} />
                <span className="font-medium">{option.label}</span>
              </button>
            );
          })}
          {/* More filters dropdown */}
          <select
            value={status}
            onChange={(e) => { setStatus(e.target.value); setPage(1); }}
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 text-sm focus:outline-none focus:border-blue-500"
          >
            <option value="">More...</option>
            {statusFilters.slice(5).map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-400">
          {pagination.total} order{pagination.total !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Orders Table */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 backdrop-blur-sm overflow-hidden">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-700/50 ring-1 ring-slate-200 dark:ring-slate-600/50 mb-6">
              <Package className="h-10 w-10 text-slate-500 dark:text-slate-400 dark:text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">No orders found</h3>
            <p className="text-slate-500 dark:text-slate-400 dark:text-slate-400 text-center max-w-sm">
              {status 
                ? `No ${status.toLowerCase().replace('_', ' ')} orders at the moment.`
                : 'No orders have been placed yet.'}
            </p>
            {status && (
              <button
                onClick={() => { setStatus(''); setPage(1); }}
                className="mt-4 flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                View all orders
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 dark:bg-slate-900/50">
                  <tr>
                    <th className="px-4 py-4 text-left text-xs font-medium text-slate-500 dark:text-slate-400 dark:text-slate-400 uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <Hash className="w-4 h-4" />
                        ID
                      </div>
                    </th>
                    <th className="px-4 py-4 text-left text-xs font-medium text-slate-500 dark:text-slate-400 dark:text-slate-400 uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        User
                      </div>
                    </th>
                    <th className="px-4 py-4 text-left text-xs font-medium text-slate-500 dark:text-slate-400 dark:text-slate-400 uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4" />
                        Service
                      </div>
                    </th>
                    <th className="px-4 py-4 text-left text-xs font-medium text-slate-500 dark:text-slate-400 dark:text-slate-400 uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <LinkIcon className="w-4 h-4" />
                        Link
                      </div>
                    </th>
                    <th className="px-4 py-4 text-left text-xs font-medium text-slate-500 dark:text-slate-400 dark:text-slate-400 uppercase tracking-wider">Qty</th>
                    <th className="px-4 py-4 text-left text-xs font-medium text-slate-500 dark:text-slate-400 dark:text-slate-400 uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        Charge
                      </div>
                    </th>
                    <th className="px-4 py-4 text-left text-xs font-medium text-slate-500 dark:text-slate-400 dark:text-slate-400 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-4 text-left text-xs font-medium text-slate-500 dark:text-slate-400 dark:text-slate-400 uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Date
                      </div>
                    </th>
                    <th className="px-4 py-4 text-left text-xs font-medium text-slate-500 dark:text-slate-400 dark:text-slate-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700/50">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                      <td className="px-4 py-4">
                        <span className="font-mono text-sm text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-700/30 px-2 py-1 rounded">
                          {formatOrderId(order.id)}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div>
                          <p className="font-medium text-sm text-slate-900 dark:text-white">{order.user?.username}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-400">{order.user?.email}</p>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="max-w-[150px]">
                          <p className="truncate text-sm text-slate-900 dark:text-white">{order.service?.name}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-400">{order.service?.platform}</p>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <a
                          href={order.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 text-sm transition-colors"
                        >
                          <span className="truncate max-w-[100px]">
                            {truncate(order.link, 20)}
                          </span>
                          <ExternalLink className="w-3 h-3 flex-shrink-0" />
                        </a>
                      </td>
                      <td className="px-4 py-4 text-slate-900 dark:text-white font-medium">{order.quantity?.toLocaleString()}</td>
                      <td className="px-4 py-4">
                        <span className="font-bold text-emerald-400">
                          {formatCurrency(order.charge)}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <Badge status={order.status}>{order.status}</Badge>
                      </td>
                      <td className="px-4 py-4 text-slate-500 dark:text-slate-400 dark:text-slate-400 text-sm">
                        {formatDate(order.createdAt, {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedOrder(order);
                              setEditData({ status: order.status });
                              setShowEditModal(true);
                            }}
                            className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors ring-1 ring-blue-500/30"
                            title="Edit Order"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          {order.status !== 'REFUNDED' && (
                            <button
                              onClick={() => {
                                setSelectedOrder(order);
                                setRefundData({ amount: order.charge.toString(), reason: '' });
                                setShowRefundModal(true);
                              }}
                              className="flex items-center justify-center w-8 h-8 rounded-lg bg-violet-500/20 text-violet-400 hover:bg-violet-500/30 transition-colors ring-1 ring-violet-500/30"
                              title="Refund Order"
                            >
                              <RotateCcw className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {pagination.pages > 1 && (
              <div className="p-4 border-t border-slate-200 dark:border-slate-700/50 bg-slate-900/30">
                <Pagination
                  currentPage={page}
                  totalPages={pagination.pages}
                  onPageChange={setPage}
                />
              </div>
            )}
          </>
        )}
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedOrder(null);
          setEditData({});
        }}
        title=""
        size="md"
      >
        {selectedOrder && (
          <div className="space-y-6">
            {/* Modal Header */}
            <div className="text-center pb-4 border-b border-slate-200 dark:border-slate-700/50">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 shadow-lg shadow-blue-500/30 mb-4">
                <Edit className="h-8 w-8 text-slate-900 dark:text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Edit Order</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-400 mt-1">
                Update order #{formatOrderId(selectedOrder.id)}
              </p>
            </div>

            {/* Order Info */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50">
                <p className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-400 mb-1">Service</p>
                <p className="text-sm text-slate-900 dark:text-white font-medium truncate">{selectedOrder.service?.name}</p>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50">
                <p className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-400 mb-1">Charge</p>
                <p className="text-sm text-emerald-400 font-bold">{formatCurrency(selectedOrder.charge)}</p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  Status
                </label>
                <select
                  value={editData.status || ''}
                  onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 focus:outline-none"
                >
                  {statusOptions.filter(o => o.value !== '').map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-2 block">Start Count</label>
                  <input
                    type="number"
                    value={editData.startCount ?? selectedOrder.startCount ?? ''}
                    onChange={(e) => setEditData({ ...editData, startCount: parseInt(e.target.value) || null })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-2 block">Remains</label>
                  <input
                    type="number"
                    value={editData.remains ?? selectedOrder.remains ?? ''}
                    onChange={(e) => setEditData({ ...editData, remains: parseInt(e.target.value) || null })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-2 block">Status Note</label>
                <textarea
                  value={editData.statusNote ?? selectedOrder.statusNote ?? ''}
                  onChange={(e) => setEditData({ ...editData, statusNote: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 focus:outline-none resize-none"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-end pt-4 border-t border-slate-200 dark:border-slate-700/50">
              <Button
                variant="ghost"
                onClick={() => setShowEditModal(false)}
                className="text-slate-500 dark:text-slate-400 dark:text-slate-400 border border-slate-300 dark:border-slate-600 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700/50"
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpdateOrder}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-lg shadow-blue-500/30 border-0"
              >
                <Edit className="w-4 h-4 mr-2" />
                Update Order
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Refund Modal */}
      <Modal
        isOpen={showRefundModal}
        onClose={() => {
          setShowRefundModal(false);
          setSelectedOrder(null);
          setRefundData({ amount: '', reason: '' });
        }}
        title=""
        size="md"
      >
        {selectedOrder && (
          <div className="space-y-6">
            {/* Modal Header */}
            <div className="text-center pb-4 border-b border-slate-200 dark:border-slate-700/50">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/30 mb-4">
                <RotateCcw className="h-8 w-8 text-slate-900 dark:text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Refund Order</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-400 mt-1">
                Process refund for order #{formatOrderId(selectedOrder.id)}
              </p>
            </div>

            {/* Order Info */}
            <div className="p-4 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-400 mb-1">Order ID</p>
                  <p className="font-mono text-slate-900 dark:text-white">{formatOrderId(selectedOrder.id)}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-400 mb-1">Original Charge</p>
                  <p className="font-bold text-lg text-emerald-400">{formatCurrency(selectedOrder.charge)}</p>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
                  <DollarSign className="w-4 h-4 text-violet-400" />
                  Refund Amount (leave empty for full refund)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={refundData.amount}
                  onChange={(e) => setRefundData({ ...refundData, amount: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 focus:outline-none"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
                  <Sparkles className="w-4 h-4 text-violet-400" />
                  Reason (required)
                </label>
                <textarea
                  value={refundData.reason}
                  onChange={(e) => setRefundData({ ...refundData, reason: e.target.value })}
                  placeholder="Reason for refund..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 focus:outline-none resize-none"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-end pt-4 border-t border-slate-200 dark:border-slate-700/50">
              <Button
                variant="ghost"
                onClick={() => setShowRefundModal(false)}
                className="text-slate-500 dark:text-slate-400 dark:text-slate-400 border border-slate-300 dark:border-slate-600 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700/50"
              >
                Cancel
              </Button>
              <Button
                onClick={handleRefund}
                disabled={!refundData.reason}
                className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white shadow-lg shadow-violet-500/30 border-0 disabled:opacity-50"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Process Refund
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

AdminOrdersPage.getLayout = function getLayout(page) {
  return <DashboardLayout isAdmin>{page}</DashboardLayout>;
};
