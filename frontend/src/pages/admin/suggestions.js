/**
 * Admin Suggestions Page
 * Premium Dark Theme Design
 */

import { useState } from 'react';
import { DashboardLayout } from '../../components/layout';
import {
  Button,
  Pagination,
  LoadingScreen,
  Modal,
} from '../../components/ui';
import { 
  useAdminSuggestions, 
  useAdminSuggestionStats,
  useUpdateSuggestionStatus, 
  useDeleteSuggestion 
} from '../../hooks/useApi';
import { formatDate } from '../../lib/utils';
import {
  Lightbulb,
  RefreshCw,
  Target,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Rocket,
  Sparkles,
  Bug,
  Palette,
  ShoppingBag,
  HelpCircle,
  ArrowRight,
  TrendingUp,
  User,
  Calendar,
  Trash2,
  Edit,
  Search,
  BarChart3,
  Inbox,
} from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';

const categoryOptions = [
  { value: '', label: 'All', icon: Target, color: 'slate' },
  { value: 'FEATURE_REQUEST', label: 'Feature', icon: Sparkles, color: 'violet' },
  { value: 'IMPROVEMENT', label: 'Improve', icon: TrendingUp, color: 'cyan' },
  { value: 'BUG_REPORT', label: 'Bug', icon: Bug, color: 'red' },
  { value: 'UI_UX', label: 'UI/UX', icon: Palette, color: 'pink' },
  { value: 'SERVICE_REQUEST', label: 'Service', icon: ShoppingBag, color: 'amber' },
  { value: 'OTHER', label: 'Other', icon: HelpCircle, color: 'slate' },
];

const statusOptions = [
  { value: '', label: 'All', icon: Target, color: 'slate' },
  { value: 'PENDING', label: 'Pending', icon: Clock, color: 'amber' },
  { value: 'UNDER_REVIEW', label: 'Reviewing', icon: Eye, color: 'blue' },
  { value: 'APPROVED', label: 'Approved', icon: CheckCircle, color: 'emerald' },
  { value: 'IMPLEMENTED', label: 'Done', icon: Rocket, color: 'violet' },
  { value: 'REJECTED', label: 'Rejected', icon: XCircle, color: 'red' },
];

const updateStatusOptions = [
  { value: 'PENDING', label: 'Pending', icon: Clock, color: 'amber', description: 'Awaiting review' },
  { value: 'UNDER_REVIEW', label: 'Under Review', icon: Eye, color: 'blue', description: 'Currently being reviewed' },
  { value: 'APPROVED', label: 'Approved', icon: CheckCircle, color: 'emerald', description: 'Approved for implementation' },
  { value: 'IMPLEMENTED', label: 'Implemented', icon: Rocket, color: 'violet', description: 'Successfully implemented' },
  { value: 'REJECTED', label: 'Rejected', icon: XCircle, color: 'red', description: 'Not approved' },
];

export default function AdminSuggestionsPage() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('');
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [updateData, setUpdateData] = useState({ status: '', adminNote: '' });

  const { data, isLoading, refetch, isFetching } = useAdminSuggestions({
    page,
    limit: 15,
    ...(status && { status }),
    ...(category && { category }),
    ...(search && { search }),
  });

  const { data: stats } = useAdminSuggestionStats();
  const updateStatus = useUpdateSuggestionStatus();
  const deleteSuggestion = useDeleteSuggestion();

  const suggestions = data?.data || [];
  const pagination = data?.pagination || { total: 0, pages: 1 };

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ['admin', 'suggestions'] });
    refetch();
  };

  const handleUpdate = async () => {
    if (!selectedSuggestion) return;
    await updateStatus.mutateAsync({
      id: selectedSuggestion.id,
      status: updateData.status,
      adminNote: updateData.adminNote,
    });
    setShowUpdateModal(false);
    setSelectedSuggestion(null);
    setUpdateData({ status: '', adminNote: '' });
  };

  const handleDelete = async () => {
    if (!selectedSuggestion) return;
    await deleteSuggestion.mutateAsync(selectedSuggestion.id);
    setShowDeleteModal(false);
    setSelectedSuggestion(null);
  };

  const getStatusStyle = (status) => {
    const colorMap = {
      PENDING: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      UNDER_REVIEW: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      APPROVED: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      IMPLEMENTED: 'bg-violet-500/20 text-violet-400 border-violet-500/30',
      REJECTED: 'bg-red-500/20 text-red-400 border-red-500/30',
    };
    return colorMap[status] || 'bg-slate-500/20 text-slate-400 border-slate-500/30';
  };

  const getCategoryStyle = (category) => {
    const colorMap = {
      FEATURE_REQUEST: 'bg-violet-500/20 text-violet-400 border-violet-500/30',
      IMPROVEMENT: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
      BUG_REPORT: 'bg-red-500/20 text-red-400 border-red-500/30',
      UI_UX: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
      SERVICE_REQUEST: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      OTHER: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
    };
    return colorMap[category] || colorMap.OTHER;
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
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-gradient-to-br from-amber-500/30 to-orange-500/20 blur-3xl animate-pulse" />
          <div className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-gradient-to-br from-violet-500/20 to-fuchsia-500/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiLz48cGF0aCBkPSJNNDAgMEgwdjQwaDQwVjB6TTEgMXYzOGgzOFYxSDF6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIi8+PC9nPjwvc3ZnPg==')] opacity-50" />
        </div>

        <div className="relative px-6 py-8 md:px-8 md:py-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-amber-300 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400"></span>
                </span>
                Feedback Management
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-500/30">
                  <Lightbulb className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-white to-slate-400 bg-clip-text text-transparent">
                    Suggestions
                  </h1>
                  <p className="text-base text-slate-400 flex items-center gap-2">
                    <Target className="h-4 w-4 text-amber-400" />
                    Review and manage user feedback
                  </p>
                </div>
              </div>
            </div>

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

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div className="p-4 rounded-xl border border-slate-700/50 bg-slate-800/50">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-slate-700/50">
                <Inbox className="w-5 h-5 text-slate-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.total}</p>
                <p className="text-xs text-slate-400">Total</p>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/10">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/20">
                <Clock className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-amber-400">{stats.pending}</p>
                <p className="text-xs text-amber-300/70">Pending</p>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl border border-blue-500/30 bg-blue-500/10">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/20">
                <Eye className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-400">{stats.underReview}</p>
                <p className="text-xs text-blue-300/70">Reviewing</p>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/20">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-emerald-400">{stats.approved}</p>
                <p className="text-xs text-emerald-300/70">Approved</p>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl border border-violet-500/30 bg-violet-500/10">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-violet-500/20">
                <Rocket className="w-5 h-5 text-violet-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-violet-400">{stats.implemented}</p>
                <p className="text-xs text-violet-300/70">Done</p>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-500/20">
                <XCircle className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-red-400">{stats.rejected}</p>
                <p className="text-xs text-red-300/70">Rejected</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Status Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-500 uppercase tracking-wider mr-1">Status:</span>
            {statusOptions.map((option) => {
              const Icon = option.icon;
              const isActive = status === option.value;
              const colorMap = {
                slate: { active: 'border-slate-500/50 bg-slate-500/20 text-slate-300', icon: 'text-slate-400' },
                amber: { active: 'border-amber-500/50 bg-amber-500/20 text-amber-300', icon: 'text-amber-400' },
                blue: { active: 'border-blue-500/50 bg-blue-500/20 text-blue-300', icon: 'text-blue-400' },
                emerald: { active: 'border-emerald-500/50 bg-emerald-500/20 text-emerald-300', icon: 'text-emerald-400' },
                violet: { active: 'border-violet-500/50 bg-violet-500/20 text-violet-300', icon: 'text-violet-400' },
                red: { active: 'border-red-500/50 bg-red-500/20 text-red-300', icon: 'text-red-400' },
              };
              const colors = colorMap[option.color];
              
              return (
                <button
                  key={option.value}
                  onClick={() => { setStatus(option.value); setPage(1); }}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border transition-all duration-200 text-xs ${
                    isActive
                      ? colors.active
                      : 'border-slate-700/50 bg-slate-800/50 text-slate-400 hover:border-slate-600'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? colors.icon : 'text-slate-500'}`} />
                  <span className="font-medium">{option.label}</span>
                </button>
              );
            })}
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-500 uppercase tracking-wider mr-1">Type:</span>
            {categoryOptions.slice(0, 4).map((option) => {
              const Icon = option.icon;
              const isActive = category === option.value;
              const colorMap = {
                slate: { active: 'border-slate-500/50 bg-slate-500/20 text-slate-300', icon: 'text-slate-400' },
                violet: { active: 'border-violet-500/50 bg-violet-500/20 text-violet-300', icon: 'text-violet-400' },
                cyan: { active: 'border-cyan-500/50 bg-cyan-500/20 text-cyan-300', icon: 'text-cyan-400' },
                red: { active: 'border-red-500/50 bg-red-500/20 text-red-300', icon: 'text-red-400' },
              };
              const colors = colorMap[option.color];
              
              return (
                <button
                  key={option.value}
                  onClick={() => { setCategory(option.value); setPage(1); }}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border transition-all duration-200 text-xs ${
                    isActive
                      ? colors.active
                      : 'border-slate-700/50 bg-slate-800/50 text-slate-400 hover:border-slate-600'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? colors.icon : 'text-slate-500'}`} />
                  <span className="font-medium">{option.label}</span>
                </button>
              );
            })}
            <select
              value={category}
              onChange={(e) => { setCategory(e.target.value); setPage(1); }}
              className="px-2.5 py-1.5 rounded-lg border border-slate-700/50 bg-slate-800/50 text-slate-300 text-xs focus:outline-none focus:border-amber-500"
            >
              <option value="">More...</option>
              {categoryOptions.slice(4).map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search suggestions..."
            className="pl-10 pr-4 py-2 rounded-xl bg-slate-800/50 border border-slate-700/50 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-500 w-full sm:w-64"
          />
        </div>
      </div>

      {/* Suggestions List */}
      <div className="rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm overflow-hidden">
        {suggestions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-700/50 ring-1 ring-slate-600/50 mb-6">
              <Lightbulb className="h-10 w-10 text-slate-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No suggestions found</h3>
            <p className="text-slate-400 text-center max-w-sm">
              {status || category || search 
                ? 'No suggestions match your current filters.'
                : 'No suggestions have been submitted yet.'}
            </p>
            {(status || category || search) && (
              <button
                onClick={() => { setStatus(''); setCategory(''); setSearch(''); setPage(1); }}
                className="mt-4 flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300 transition-colors"
              >
                Clear all filters
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="divide-y divide-slate-700/50">
              {suggestions.map((suggestion) => (
                <div key={suggestion.id} className="p-5 hover:bg-slate-700/30 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="font-semibold text-white">{suggestion.title}</h3>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${getCategoryStyle(suggestion.category)}`}>
                          {suggestion.category.replace('_', ' ')}
                        </span>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusStyle(suggestion.status)}`}>
                          {suggestion.status.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-sm text-slate-400 line-clamp-2 mb-3">
                        {suggestion.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5" />
                          {suggestion.user?.username || suggestion.user?.email}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {formatDate(suggestion.createdAt)}
                        </span>
                      </div>
                      {suggestion.adminNote && (
                        <div className="mt-3 p-3 rounded-lg bg-slate-900/50 border border-slate-700/50">
                          <p className="text-xs text-slate-500 mb-1">Admin Note:</p>
                          <p className="text-sm text-slate-300">{suggestion.adminNote}</p>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => {
                          setSelectedSuggestion(suggestion);
                          setUpdateData({ status: suggestion.status, adminNote: suggestion.adminNote || '' });
                          setShowUpdateModal(true);
                        }}
                        className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30 transition-colors"
                        title="Update"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedSuggestion(suggestion);
                          setShowDeleteModal(true);
                        }}
                        className="flex items-center justify-center w-9 h-9 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
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

      {/* Update Modal - Premium Design */}
      <Modal
        isOpen={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        title=""
        size="lg"
      >
        {selectedSuggestion && (
          <div className="space-y-6">
            {/* Header with Gradient */}
            <div className="relative overflow-hidden rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-800 via-slate-800/90 to-slate-900 p-6">
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/10 blur-2xl" />
              </div>
              <div className="relative flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 shadow-lg shadow-blue-500/30 flex-shrink-0">
                  <Edit className="h-7 w-7 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-white">Update Suggestion</h3>
                  <p className="text-slate-400 text-sm mt-1 line-clamp-2">{selectedSuggestion.title}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${getCategoryStyle(selectedSuggestion.category)}`}>
                      {selectedSuggestion.category.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-slate-500">•</span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {selectedSuggestion.user?.username || selectedSuggestion.user?.email}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Selection - Visual Cards */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-3">
                <BarChart3 className="w-4 h-4 text-blue-400" />
                Select Status
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {updateStatusOptions.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = updateData.status === opt.value;
                  const colorStyles = {
                    amber: {
                      selected: 'border-amber-500 bg-amber-500/20 ring-2 ring-amber-500/30',
                      icon: 'bg-amber-500/30 text-amber-400',
                      text: 'text-amber-300',
                      desc: 'text-amber-300/70',
                    },
                    blue: {
                      selected: 'border-blue-500 bg-blue-500/20 ring-2 ring-blue-500/30',
                      icon: 'bg-blue-500/30 text-blue-400',
                      text: 'text-blue-300',
                      desc: 'text-blue-300/70',
                    },
                    emerald: {
                      selected: 'border-emerald-500 bg-emerald-500/20 ring-2 ring-emerald-500/30',
                      icon: 'bg-emerald-500/30 text-emerald-400',
                      text: 'text-emerald-300',
                      desc: 'text-emerald-300/70',
                    },
                    violet: {
                      selected: 'border-violet-500 bg-violet-500/20 ring-2 ring-violet-500/30',
                      icon: 'bg-violet-500/30 text-violet-400',
                      text: 'text-violet-300',
                      desc: 'text-violet-300/70',
                    },
                    red: {
                      selected: 'border-red-500 bg-red-500/20 ring-2 ring-red-500/30',
                      icon: 'bg-red-500/30 text-red-400',
                      text: 'text-red-300',
                      desc: 'text-red-300/70',
                    },
                  };
                  const colors = colorStyles[opt.color];
                  
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setUpdateData({ ...updateData, status: opt.value })}
                      className={`relative p-3 rounded-xl border transition-all duration-200 text-left group ${
                        isSelected
                          ? colors.selected
                          : 'border-slate-700/50 bg-slate-800/50 hover:border-slate-600 hover:bg-slate-700/50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`flex items-center justify-center w-8 h-8 rounded-lg transition-colors ${
                          isSelected ? colors.icon : 'bg-slate-700/50 text-slate-400 group-hover:bg-slate-700'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className={`font-medium text-sm ${
                            isSelected ? colors.text : 'text-slate-300'
                          }`}>
                            {opt.label}
                          </p>
                          <p className={`text-xs mt-0.5 ${
                            isSelected ? colors.desc : 'text-slate-500'
                          }`}>
                            {opt.description}
                          </p>
                        </div>
                      </div>
                      {isSelected && (
                        <div className="absolute top-2 right-2">
                          <CheckCircle className={`w-4 h-4 ${colors.text}`} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Admin Note */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                <Edit className="w-4 h-4 text-slate-400" />
                Admin Note
                <span className="text-xs text-slate-500 font-normal">(optional)</span>
              </label>
              <textarea
                value={updateData.adminNote}
                onChange={(e) => setUpdateData({ ...updateData, adminNote: e.target.value })}
                placeholder="Add a note for the user explaining your decision..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700/50 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none resize-none transition-all"
              />
              <p className="text-xs text-slate-500 mt-1.5 flex items-center gap-1">
                <Target className="w-3 h-3" />
                This note will be visible to the user who submitted the suggestion
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 justify-end pt-4 border-t border-slate-700/50">
              <button
                onClick={() => setShowUpdateModal(false)}
                className="px-5 py-2.5 rounded-xl text-slate-400 border border-slate-600 hover:text-white hover:bg-slate-700/50 hover:border-slate-500 transition-all duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={updateStatus.isPending || !updateData.status}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg"
              >
                {updateStatus.isPending ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title=""
        size="sm"
      >
        {selectedSuggestion && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 shadow-lg shadow-red-500/30 mb-4">
                <Trash2 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Delete Suggestion</h3>
              <p className="text-sm text-slate-400 mt-2">
                Are you sure you want to delete "{selectedSuggestion.title}"? This action cannot be undone.
              </p>
            </div>

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2.5 rounded-xl text-slate-400 border border-slate-600 hover:text-white hover:bg-slate-700/50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleteSuggestion.isPending}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-semibold shadow-lg shadow-red-500/30 transition-all duration-200 disabled:opacity-50"
              >
                {deleteSuggestion.isPending ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
                Delete
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

AdminSuggestionsPage.getLayout = function getLayout(page) {
  return <DashboardLayout isAdmin>{page}</DashboardLayout>;
};
