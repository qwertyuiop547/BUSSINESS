/**
 * Admin Top-ups Page
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
  Textarea,
  LoadingScreen,
} from '../../components/ui';
import { useAdminTopUps, useApproveTopUp, useRejectTopUp } from '../../hooks/useApi';
import { formatCurrency, formatDate } from '../../lib/utils';
import { 
  Wallet, 
  Check, 
  X, 
  Eye, 
  Target, 
  Clock, 
  CheckCircle, 
  XCircle,
  RefreshCw,
  Filter,
  Receipt,
  User,
  CreditCard,
  Hash,
  Calendar,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';

const statusOptions = [
  { value: '', label: 'All Statuses' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'APPROVED', label: 'Approved' },
  { value: 'REJECTED', label: 'Rejected' },
];

export default function AdminTopUpsPage() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('PENDING');
  const [selectedTopUp, setSelectedTopUp] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [adminNote, setAdminNote] = useState('');
  const [action, setAction] = useState(null);

  const { data, isLoading, refetch } = useAdminTopUps({
    page,
    limit: 20,
    ...(status && { status }),
  });

  const approveTopUp = useApproveTopUp();
  const rejectTopUp = useRejectTopUp();

  const topUps = data?.data || [];
  const pagination = data?.pagination || { total: 0, pages: 1 };

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ['admin', 'topups'] });
    refetch();
  };

  const handleAction = async () => {
    if (!selectedTopUp) return;

    try {
      if (action === 'approve') {
        await approveTopUp.mutateAsync({ id: selectedTopUp.id, adminNote });
      } else {
        await rejectTopUp.mutateAsync({ id: selectedTopUp.id, adminNote });
      }
      setShowModal(false);
      setSelectedTopUp(null);
      setAdminNote('');
      setAction(null);
      refetch();
    } catch (error) {
      // Error handled by mutation
    }
  };

  const openModal = (topUp, actionType) => {
    setSelectedTopUp(topUp);
    setAction(actionType);
    setShowModal(true);
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
          <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-gradient-to-br from-emerald-500/30 to-cyan-500/20 blur-3xl animate-pulse" />
          <div className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-gradient-to-br from-violet-500/20 to-fuchsia-500/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiLz48cGF0aCBkPSJNNDAgMEgwdjQwaDQwVjB6TTEgMXYzOGgzOFYxSDF6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIi8+PC9nPjwvc3ZnPg==')] opacity-50" />
        </div>

        <div className="relative px-6 py-8 md:px-8 md:py-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-4">
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-emerald-300 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
                </span>
                Fund Management
              </div>
              
              {/* Title Section */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-600 shadow-lg shadow-emerald-500/30">
                    <Wallet className="h-7 w-7 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-white to-slate-400 bg-clip-text text-transparent">
                    Top-up Requests
                  </h1>
                  <p className="text-base text-slate-400 flex items-center gap-2">
                    <Target className="h-4 w-4 text-emerald-400" />
                    Review and process user fund requests
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
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
      </div>

      {/* Filter Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {[
            { value: '', label: 'All', icon: Receipt, color: 'slate' },
            { value: 'PENDING', label: 'Pending', icon: Clock, color: 'amber' },
            { value: 'APPROVED', label: 'Approved', icon: CheckCircle, color: 'emerald' },
            { value: 'REJECTED', label: 'Rejected', icon: XCircle, color: 'red' },
          ].map((option) => {
            const Icon = option.icon;
            const isActive = status === option.value;
            const colorMap = {
              slate: { active: 'border-slate-500/50 bg-slate-500/20 text-slate-300', icon: 'text-slate-400' },
              amber: { active: 'border-amber-500/50 bg-amber-500/20 text-amber-300', icon: 'text-amber-400' },
              emerald: { active: 'border-emerald-500/50 bg-emerald-500/20 text-emerald-300', icon: 'text-emerald-400' },
              red: { active: 'border-red-500/50 bg-red-500/20 text-red-300', icon: 'text-red-400' },
            };
            const colors = colorMap[option.color];
            
            return (
              <button
                key={option.value}
                onClick={() => { setStatus(option.value); setPage(1); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-200 ${
                  isActive
                    ? colors.active
                    : 'border-slate-700/50 bg-slate-800/50 text-slate-400 hover:border-slate-600 hover:text-slate-300'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? colors.icon : 'text-slate-500'}`} />
                <span className="text-sm font-medium">{option.label}</span>
              </button>
            );
          })}
        </div>
        <p className="text-sm text-slate-400">
          {pagination.total} request{pagination.total !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Top-ups Table */}
      <div className="rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm overflow-hidden">
        {topUps.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-700/50 ring-1 ring-slate-600/50 mb-6">
              <Wallet className="h-10 w-10 text-slate-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No top-up requests</h3>
            <p className="text-slate-400 text-center max-w-sm">
              {status === 'PENDING' 
                ? 'No pending requests to review at the moment.' 
                : status === 'APPROVED'
                  ? 'No approved requests found.'
                  : status === 'REJECTED'
                    ? 'No rejected requests found.'
                    : 'No top-up requests found.'}
            </p>
            {status !== '' && (
              <button
                onClick={() => { setStatus(''); setPage(1); }}
                className="mt-4 flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                View all requests
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-900/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        User
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <Wallet className="w-4 h-4" />
                        Amount
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4" />
                        Method
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <Hash className="w-4 h-4" />
                        Reference
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Date
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {topUps.map((topUp) => (
                    <tr key={topUp.id} className="hover:bg-slate-700/30 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-white">{topUp.user?.username}</p>
                          <p className="text-xs text-slate-400">{topUp.user?.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-lg bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                          {formatCurrency(topUp.amount)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-700/50 text-slate-300 text-sm">
                          <CreditCard className="w-3.5 h-3.5" />
                          {topUp.paymentMethod}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm text-slate-300 bg-slate-700/30 px-2 py-1 rounded">
                          {topUp.referenceNumber || '-'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Badge status={topUp.status}>{topUp.status}</Badge>
                      </td>
                      <td className="px-6 py-4 text-slate-400 text-sm">
                        {formatDate(topUp.createdAt)}
                      </td>
                      <td className="px-6 py-4">
                        {topUp.status === 'PENDING' ? (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => openModal(topUp, 'approve')}
                              className="flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors ring-1 ring-emerald-500/30"
                              title="Approve"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => openModal(topUp, 'reject')}
                              className="flex items-center justify-center w-9 h-9 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors ring-1 ring-red-500/30"
                              title="Reject"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setSelectedTopUp(topUp);
                              setAction('view');
                              setShowModal(true);
                            }}
                            className="flex items-center justify-center w-9 h-9 rounded-lg bg-slate-700/50 text-slate-400 hover:bg-slate-600/50 hover:text-slate-300 transition-colors ring-1 ring-slate-600/50"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {pagination.pages > 1 && (
              <div className="p-4 border-t border-slate-700/50 bg-slate-900/30">
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

      {/* Action Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedTopUp(null);
          setAdminNote('');
          setAction(null);
        }}
        title=""
        size="md"
      >
        {selectedTopUp && (
          <div className="space-y-6">
            {/* Modal Header */}
            <div className="text-center pb-4 border-b border-slate-700/50">
              <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl mb-4 ${
                action === 'approve' 
                  ? 'bg-gradient-to-br from-emerald-500 to-cyan-600 shadow-lg shadow-emerald-500/30'
                  : action === 'reject'
                    ? 'bg-gradient-to-br from-red-500 to-rose-600 shadow-lg shadow-red-500/30'
                    : 'bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/30'
              }`}>
                {action === 'approve' ? (
                  <CheckCircle className="h-8 w-8 text-white" />
                ) : action === 'reject' ? (
                  <XCircle className="h-8 w-8 text-white" />
                ) : (
                  <Eye className="h-8 w-8 text-white" />
                )}
              </div>
              <h3 className="text-xl font-bold text-white">
                {action === 'approve'
                  ? 'Approve Top-up Request'
                  : action === 'reject'
                    ? 'Reject Top-up Request'
                    : 'Top-up Details'}
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                {action === 'approve'
                  ? 'Confirm to add funds to user account'
                  : action === 'reject'
                    ? 'Provide a reason for rejection'
                    : 'View request information'}
              </p>
            </div>

            {/* Request Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                  <User className="w-3.5 h-3.5" />
                  User
                </div>
                <p className="font-medium text-white">{selectedTopUp.user?.username}</p>
                <p className="text-xs text-slate-400">{selectedTopUp.user?.email}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                  <Wallet className="w-3.5 h-3.5" />
                  Amount
                </div>
                <p className="font-bold text-xl bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  {formatCurrency(selectedTopUp.amount)}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                  <CreditCard className="w-3.5 h-3.5" />
                  Payment Method
                </div>
                <p className="font-medium text-white">{selectedTopUp.paymentMethod}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                  <Hash className="w-3.5 h-3.5" />
                  Reference
                </div>
                <p className="font-mono text-white">{selectedTopUp.referenceNumber || '-'}</p>
              </div>
              <div className="col-span-2 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                  <Calendar className="w-3.5 h-3.5" />
                  Submitted
                </div>
                <p className="text-white">{formatDate(selectedTopUp.createdAt)}</p>
              </div>
            </div>

            {/* Proof Image */}
            {selectedTopUp.proofUrl && (
              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-2">
                  <Receipt className="w-3.5 h-3.5" />
                  Payment Proof
                </div>
                <a 
                  href={selectedTopUp.proofUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 text-sm underline"
                >
                  View Proof Image
                </a>
              </div>
            )}

            {/* Admin Note Input */}
            {action !== 'view' && (
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                  <Sparkles className="w-4 h-4 text-violet-400" />
                  Admin Note (Optional)
                </label>
                <textarea
                  placeholder="Add a note for the user..."
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-600 text-white placeholder-slate-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 focus:outline-none resize-none"
                />
              </div>
            )}

            {/* Existing Admin Note */}
            {selectedTopUp.adminNote && action === 'view' && (
              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Admin Note
                </div>
                <p className="text-white">{selectedTopUp.adminNote}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 justify-end pt-4 border-t border-slate-700/50">
              <Button
                variant="ghost"
                onClick={() => setShowModal(false)}
                className="text-slate-400 border border-slate-600 hover:text-white hover:bg-slate-700/50"
              >
                {action === 'view' ? 'Close' : 'Cancel'}
              </Button>
              {action === 'approve' && (
                <Button
                  onClick={handleAction}
                  isLoading={approveTopUp.isPending}
                  className="bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white shadow-lg shadow-emerald-500/30 border-0"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Approve Request
                </Button>
              )}
              {action === 'reject' && (
                <Button
                  onClick={handleAction}
                  isLoading={rejectTopUp.isPending}
                  className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-lg shadow-red-500/30 border-0"
                >
                  <X className="w-4 h-4 mr-2" />
                  Reject Request
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

AdminTopUpsPage.getLayout = function getLayout(page) {
  return <DashboardLayout isAdmin>{page}</DashboardLayout>;
};
