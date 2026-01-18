/**
 * Admin Tickets Page
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
  Textarea,
  LoadingScreen,
} from '../../components/ui';
import { useAdminTickets } from '../../hooks/useApi';
import api from '../../lib/api';
import { formatDate, truncate } from '../../lib/utils';
import { 
  MessageSquare, 
  ExternalLink, 
  Send, 
  RefreshCw,
  Headphones,
  Target,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  AlertTriangle,
  Zap,
  User,
  Calendar,
  MessageCircle,
  ArrowRight,
  Reply,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

const statusOptions = [
  { value: '', label: 'All Statuses' },
  { value: 'OPEN', label: 'Open' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'ANSWERED', label: 'Answered' },
  { value: 'CLOSED', label: 'Closed' },
];

const priorityOptions = [
  { value: '', label: 'All Priorities' },
  { value: 'LOW', label: 'Low' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'HIGH', label: 'High' },
  { value: 'URGENT', label: 'Urgent' },
];

export default function AdminTicketsPage() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [expandedTicket, setExpandedTicket] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [replying, setReplying] = useState(false);

  const { data, isLoading, refetch, isFetching } = useAdminTickets({
    page,
    limit: 15,
    ...(status && { status }),
    ...(priority && { priority }),
  });

  const tickets = data?.data || [];
  const pagination = data?.pagination || { total: 0, pages: 1 };

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ['admin', 'tickets'] });
    refetch();
  };

  const handleUpdateStatus = async (ticketId, newStatus) => {
    try {
      await api.patch(`/v1/admin/tickets/${ticketId}`, { status: newStatus });
      toast.success(`Status updated to ${newStatus}`);
      refetch();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleReply = async (ticketId) => {
    if (!replyText.trim()) return;
    setReplying(true);
    try {
      await api.post(`/v1/tickets/${ticketId}/messages`, { message: replyText });
      toast.success('Reply sent');
      setReplyText('');
      setExpandedTicket(null);
      refetch();
    } catch (error) {
      toast.error('Failed to send reply');
    } finally {
      setReplying(false);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'URGENT': return 'danger';
      case 'HIGH': return 'warning';
      case 'MEDIUM': return 'info';
      default: return 'gray';
    }
  };

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'URGENT': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'HIGH': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'MEDIUM': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'OPEN': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'IN_PROGRESS': return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
      case 'ANSWERED': return 'bg-violet-500/20 text-violet-400 border-violet-500/30';
      case 'CLOSED': return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  // Status filter options with icons
  const statusFilters = [
    { value: '', label: 'All', icon: MessageSquare, color: 'slate' },
    { value: 'OPEN', label: 'Open', icon: AlertCircle, color: 'emerald' },
    { value: 'IN_PROGRESS', label: 'In Progress', icon: Clock, color: 'cyan' },
    { value: 'ANSWERED', label: 'Answered', icon: CheckCircle, color: 'violet' },
    { value: 'CLOSED', label: 'Closed', icon: XCircle, color: 'slate' },
  ];

  // Priority filter options
  const priorityFilters = [
    { value: '', label: 'All', icon: Target, color: 'slate' },
    { value: 'LOW', label: 'Low', icon: Target, color: 'slate' },
    { value: 'MEDIUM', label: 'Medium', icon: AlertCircle, color: 'blue' },
    { value: 'HIGH', label: 'High', icon: AlertTriangle, color: 'orange' },
    { value: 'URGENT', label: 'Urgent', icon: Zap, color: 'red' },
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
      <div className="relative overflow-hidden rounded-3xl border border-slate-700/50 bg-gradient-to-br from-slate-900 via-slate-800/90 to-slate-900 shadow-2xl">
        {/* Animated Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-gradient-to-br from-teal-500/30 to-cyan-500/20 blur-3xl animate-pulse" />
          <div className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-gradient-to-br from-violet-500/20 to-fuchsia-500/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiLz48cGF0aCBkPSJNNDAgMEgwdjQwaDQwVjB6TTEgMXYzOGgzOFYxSDF6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIi8+PC9nPjwvc3ZnPg==')] opacity-50" />
        </div>

        <div className="relative px-6 py-8 md:px-8 md:py-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-4">
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-teal-300 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-400"></span>
                </span>
                Support Center
              </div>
              
              {/* Title Section */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 shadow-lg shadow-teal-500/30">
                    <Headphones className="h-7 w-7 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-white to-slate-400 bg-clip-text text-transparent">
                    Support Tickets
                  </h1>
                  <p className="text-base text-slate-400 flex items-center gap-2">
                    <Target className="h-4 w-4 text-teal-400" />
                    Manage customer support requests
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
                className="text-white border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30 backdrop-blur-sm"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isFetching ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Status Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-500 uppercase tracking-wider mr-1">Status:</span>
            {statusFilters.map((option) => {
              const Icon = option.icon;
              const isActive = status === option.value;
              const colorMap = {
                slate: { active: 'border-slate-500/50 bg-slate-500/20 text-slate-300', icon: 'text-slate-400' },
                emerald: { active: 'border-emerald-500/50 bg-emerald-500/20 text-emerald-300', icon: 'text-emerald-400' },
                cyan: { active: 'border-cyan-500/50 bg-cyan-500/20 text-cyan-300', icon: 'text-cyan-400' },
                violet: { active: 'border-violet-500/50 bg-violet-500/20 text-violet-300', icon: 'text-violet-400' },
              };
              const colors = colorMap[option.color];
              
              return (
                <button
                  key={option.value}
                  onClick={() => { setStatus(option.value); setPage(1); }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all duration-200 text-xs ${
                    isActive
                      ? colors.active
                      : 'border-slate-700/50 bg-slate-800/50 text-slate-400 hover:border-slate-600 hover:text-slate-300'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? colors.icon : 'text-slate-500'}`} />
                  <span className="font-medium">{option.label}</span>
                </button>
              );
            })}
          </div>

          {/* Priority Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-500 uppercase tracking-wider mr-1">Priority:</span>
            {priorityFilters.map((option) => {
              const Icon = option.icon;
              const isActive = priority === option.value;
              const colorMap = {
                slate: { active: 'border-slate-500/50 bg-slate-500/20 text-slate-300', icon: 'text-slate-400' },
                blue: { active: 'border-blue-500/50 bg-blue-500/20 text-blue-300', icon: 'text-blue-400' },
                orange: { active: 'border-orange-500/50 bg-orange-500/20 text-orange-300', icon: 'text-orange-400' },
                red: { active: 'border-red-500/50 bg-red-500/20 text-red-300', icon: 'text-red-400' },
              };
              const colors = colorMap[option.color];
              
              return (
                <button
                  key={option.value}
                  onClick={() => { setPriority(option.value); setPage(1); }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all duration-200 text-xs ${
                    isActive
                      ? colors.active
                      : 'border-slate-700/50 bg-slate-800/50 text-slate-400 hover:border-slate-600 hover:text-slate-300'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? colors.icon : 'text-slate-500'}`} />
                  <span className="font-medium">{option.label}</span>
                </button>
              );
            })}
          </div>
        </div>
        <p className="text-sm text-slate-400">
          {pagination.total} ticket{pagination.total !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Tickets List */}
      <div className="rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm overflow-hidden">
        {tickets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-700/50 ring-1 ring-slate-600/50 mb-6">
              <MessageSquare className="h-10 w-10 text-slate-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No tickets found</h3>
            <p className="text-slate-400 text-center max-w-sm">
              All caught up! No support tickets match your filters.
            </p>
            {(status || priority) && (
              <button
                onClick={() => { setStatus(''); setPriority(''); setPage(1); }}
                className="mt-4 flex items-center gap-2 text-sm text-teal-400 hover:text-teal-300 transition-colors"
              >
                Clear all filters
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="divide-y divide-slate-700/50">
              {tickets.map((ticket) => (
                <div key={ticket.id} className="p-5 hover:bg-slate-700/30 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <Link
                          href={`/tickets/${ticket.id}`}
                          className="font-semibold text-white hover:text-teal-400 transition-colors"
                        >
                          {ticket.subject}
                        </Link>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${getPriorityStyle(ticket.priority)}`}>
                          {ticket.priority === 'URGENT' && <Zap className="w-3 h-3" />}
                          {ticket.priority === 'HIGH' && <AlertTriangle className="w-3 h-3" />}
                          {ticket.priority}
                        </span>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusStyle(ticket.status)}`}>
                          {ticket.status === 'OPEN' && <AlertCircle className="w-3 h-3" />}
                          {ticket.status === 'IN_PROGRESS' && <Clock className="w-3 h-3" />}
                          {ticket.status === 'ANSWERED' && <CheckCircle className="w-3 h-3" />}
                          {ticket.status}
                        </span>
                      </div>
                      <p className="text-sm text-slate-400 line-clamp-2">
                        {truncate(ticket.messages?.[0]?.message || '', 150)}
                      </p>
                      <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5" />
                          {ticket.user?.username || ticket.user?.email}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {formatDate(ticket.createdAt)}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MessageCircle className="w-3.5 h-3.5" />
                          {ticket._count?.messages || 0} messages
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <select
                        value={ticket.status}
                        onChange={(e) => handleUpdateStatus(ticket.id, e.target.value)}
                        className="px-3 py-2 rounded-lg border border-slate-600 bg-slate-800/80 text-white text-sm focus:outline-none focus:border-teal-500"
                      >
                        {statusOptions.filter(o => o.value !== '').map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                      <button
                        onClick={() => setExpandedTicket(
                          expandedTicket === ticket.id ? null : ticket.id
                        )}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          expandedTicket === ticket.id
                            ? 'bg-teal-500/20 text-teal-400 border border-teal-500/50'
                            : 'bg-slate-700/50 text-slate-300 border border-slate-600 hover:bg-slate-700 hover:text-white'
                        }`}
                      >
                        <Reply className="w-4 h-4" />
                        Reply
                      </button>
                      <Link href={`/tickets/${ticket.id}`}>
                        <button className="flex items-center justify-center w-9 h-9 rounded-lg bg-slate-700/50 text-slate-400 border border-slate-600 hover:bg-slate-700 hover:text-white transition-colors">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </Link>
                    </div>
                  </div>

                  {/* Quick Reply */}
                  {expandedTicket === ticket.id && (
                    <div className="mt-4 ml-4 pl-4 border-l-2 border-teal-500/50">
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-4 h-4 text-teal-400" />
                        <span className="text-sm font-medium text-white">Quick Reply</span>
                      </div>
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Type your reply..."
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-600 text-white placeholder-slate-500 focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30 focus:outline-none resize-none"
                      />
                      <div className="flex justify-end gap-2 mt-3">
                        <button
                          onClick={() => {
                            setExpandedTicket(null);
                            setReplyText('');
                          }}
                          className="px-4 py-2 rounded-lg text-sm font-medium text-slate-400 border border-slate-600 hover:text-white hover:bg-slate-700/50 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleReply(ticket.id)}
                          disabled={!replyText.trim() || replying}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white shadow-lg shadow-teal-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {replying ? (
                            <RefreshCw className="w-4 h-4 animate-spin" />
                          ) : (
                            <Send className="w-4 h-4" />
                          )}
                          Send Reply
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
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
    </div>
  );
}

AdminTicketsPage.getLayout = function getLayout(page) {
  return <DashboardLayout isAdmin>{page}</DashboardLayout>;
};
