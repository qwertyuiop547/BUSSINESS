/**
 * User Suggestions Page
 * Premium Dark Theme Design
 */

import { useState } from 'react';
import { DashboardLayout } from '../components/layout';
import {
  Button,
  Badge,
  Pagination,
  LoadingScreen,
  Modal,
} from '../components/ui';
import { useSuggestions, useCreateSuggestion } from '../hooks/useApi';
import { formatDate } from '../lib/utils';
import {
  Lightbulb,
  Plus,
  RefreshCw,
  Target,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Rocket,
  Sparkles,
  Send,
  Bug,
  Palette,
  ShoppingBag,
  HelpCircle,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';

const categoryOptions = [
  { value: 'FEATURE_REQUEST', label: 'Feature Request', icon: Sparkles, color: 'violet' },
  { value: 'IMPROVEMENT', label: 'Improvement', icon: TrendingUp, color: 'cyan' },
  { value: 'BUG_REPORT', label: 'Bug Report', icon: Bug, color: 'red' },
  { value: 'UI_UX', label: 'UI/UX', icon: Palette, color: 'pink' },
  { value: 'SERVICE_REQUEST', label: 'Service Request', icon: ShoppingBag, color: 'amber' },
  { value: 'OTHER', label: 'Other', icon: HelpCircle, color: 'slate' },
];

const statusOptions = [
  { value: '', label: 'All Status', icon: Target, color: 'slate' },
  { value: 'PENDING', label: 'Pending', icon: Clock, color: 'amber' },
  { value: 'UNDER_REVIEW', label: 'Under Review', icon: Eye, color: 'blue' },
  { value: 'APPROVED', label: 'Approved', icon: CheckCircle, color: 'emerald' },
  { value: 'IMPLEMENTED', label: 'Implemented', icon: Rocket, color: 'violet' },
  { value: 'REJECTED', label: 'Rejected', icon: XCircle, color: 'red' },
];

export default function SuggestionsPage() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'FEATURE_REQUEST',
  });

  const { data, isLoading, refetch, isFetching } = useSuggestions({
    page,
    limit: 10,
    ...(status && { status }),
  });

  const createSuggestion = useCreateSuggestion();

  const suggestions = data?.data || [];
  const pagination = data?.pagination || { total: 0, pages: 1 };

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ['suggestions'] });
    refetch();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) return;

    await createSuggestion.mutateAsync(formData);
    setFormData({ title: '', description: '', category: 'FEATURE_REQUEST' });
    setShowCreateModal(false);
  };

  const getStatusStyle = (status) => {
    const option = statusOptions.find((o) => o.value === status);
    const colorMap = {
      amber: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      emerald: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      violet: 'bg-violet-500/20 text-violet-400 border-violet-500/30',
      red: 'bg-red-500/20 text-red-400 border-red-500/30',
      slate: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
    };
    return colorMap[option?.color] || colorMap.slate;
  };

  const getCategoryStyle = (category) => {
    const option = categoryOptions.find((o) => o.value === category);
    const colorMap = {
      violet: 'bg-violet-500/20 text-violet-400 border-violet-500/30',
      cyan: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
      red: 'bg-red-500/20 text-red-400 border-red-500/30',
      pink: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
      amber: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      slate: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
    };
    return colorMap[option?.color] || colorMap.slate;
  };

  const getCategoryIcon = (category) => {
    const option = categoryOptions.find((o) => o.value === category);
    return option?.icon || HelpCircle;
  };

  if (isLoading) {
    return (
      <DashboardLayout>
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
                Help Us Improve
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-500/30">
                  <Lightbulb className="h-7 w-7 text-slate-900 dark:text-white" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600 dark:from-white dark:via-white dark:to-slate-400 bg-clip-text text-transparent">
                    Suggestions
                  </h1>
                  <p className="text-base text-slate-500 dark:text-slate-400 flex items-center gap-2">
                    <Target className="h-4 w-4 text-amber-400" />
                    Share your ideas to make us better
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                onClick={handleRefresh}
                disabled={isFetching}
                className="text-slate-600 dark:text-white border border-slate-300/50 dark:border-white/20 bg-white/50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/30 backdrop-blur-sm"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isFetching ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-semibold shadow-lg shadow-amber-500/30 transition-all duration-200"
              >
                <Plus className="w-5 h-5" />
                New Suggestion
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
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
                className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all duration-200 text-sm ${ isActive ? colors.active : 'border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600 hover:text-slate-700 dark:hover:text-slate-300' }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? colors.icon : 'text-slate-400 dark:text-slate-500'}`} />
                <span className="font-medium">{option.label}</span>
              </button>
            );
          })}
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {pagination.total} suggestion{pagination.total !== 1 ? 's' : ''} submitted
        </p>
      </div>

      {/* Suggestions List */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 backdrop-blur-sm overflow-hidden">
        {suggestions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-700/50 ring-1 ring-slate-200 dark:ring-slate-600/50 mb-6">
              <Lightbulb className="h-10 w-10 text-slate-500 dark:text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">No suggestions yet</h3>
            <p className="text-slate-500 dark:text-slate-400 text-center max-w-sm mb-4">
              Be the first to share your ideas! Help us improve by submitting a suggestion.
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300 transition-colors"
            >
              Create your first suggestion
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <>
            <div className="divide-y divide-slate-200 dark:divide-slate-700/50">
              {suggestions.map((suggestion) => {
                const CategoryIcon = getCategoryIcon(suggestion.category);
                return (
                  <div key={suggestion.id} className="p-5 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="font-semibold text-slate-900 dark:text-white">{suggestion.title}</h3>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${getCategoryStyle(suggestion.category)}`}>
                            <CategoryIcon className="w-3 h-3" />
                            {suggestion.category.replace('_', ' ')}
                          </span>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusStyle(suggestion.status)}`}>
                            {suggestion.status.replace('_', ' ')}
                          </span>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">
                          {suggestion.description}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Submitted {formatDate(suggestion.createdAt)}
                        </p>
                        {suggestion.adminNote && (
                          <div className="mt-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/50">
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Admin Response:</p>
                            <p className="text-sm text-slate-600 dark:text-slate-300">{suggestion.adminNote}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
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

      {/* Create Suggestion Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title=""
        size="lg"
      >
        <div className="space-y-6">
          <div className="text-center pb-4 border-b border-slate-200 dark:border-slate-700/50">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-500/30 mb-4">
              <Lightbulb className="h-8 w-8 text-slate-900 dark:text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">New Suggestion</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Share your ideas to help us improve</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-2 block">Category</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {categoryOptions.map((option) => {
                  const Icon = option.icon;
                  const isSelected = formData.category === option.value;
                  const colorMap = {
                    violet: 'border-violet-500/50 bg-violet-500/20 text-violet-300',
                    cyan: 'border-cyan-500/50 bg-cyan-500/20 text-cyan-300',
                    red: 'border-red-500/50 bg-red-500/20 text-red-300',
                    pink: 'border-pink-500/50 bg-pink-500/20 text-pink-300',
                    amber: 'border-amber-500/50 bg-amber-500/20 text-amber-300',
                    slate: 'border-slate-500/50 bg-slate-500/20 text-slate-300',
                  };
                  
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, category: option.value })}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border transition-all duration-200 text-sm ${ isSelected ? colorMap[option.color] : 'border-slate-700/50 bg-white dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 hover:border-slate-600' }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-medium">{option.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-2 block">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Brief title for your suggestion..."
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-2 block">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your suggestion in detail..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 focus:outline-none resize-none"
                required
              />
            </div>

            <div className="flex gap-3 justify-end pt-4 border-t border-slate-200 dark:border-slate-700/50">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2.5 rounded-xl text-slate-500 dark:text-slate-400 border border-slate-300 dark:border-slate-600 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={createSuggestion.isPending || !formData.title.trim() || !formData.description.trim()}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-semibold shadow-lg shadow-amber-500/30 transition-all duration-200 disabled:opacity-50"
              >
                {createSuggestion.isPending ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                Submit Suggestion
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

SuggestionsPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
