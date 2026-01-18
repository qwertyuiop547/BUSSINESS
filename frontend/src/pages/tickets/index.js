/**
 * Tickets List Page - Premium Design
 */

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { DashboardLayout } from '../../components/layout';
import {
  Card,
  CardBody,
  Button,
  Input,
  Select,
  Textarea,
  Badge,
  Pagination,
  EmptyState,
  Modal,
} from '../../components/ui';
import { useTickets, useCreateTicket } from '../../hooks/useApi';
import { formatDate, formatRelativeTime } from '../../lib/utils';
import { 
  MessageSquare, Plus, ExternalLink, Headphones, ChevronRight,
  Clock, CheckCircle, XCircle, AlertTriangle, HelpCircle, Send,
  Sparkles, MessageCirclePlus, LifeBuoy
} from 'lucide-react';
import Link from 'next/link';

const ticketSchema = z.object({
  subject: z.string().min(5, 'Subject must be at least 5 characters').max(200),
  category: z.enum(['GENERAL', 'ORDER_ISSUE', 'PAYMENT', 'TECHNICAL', 'OTHER']),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).default('MEDIUM'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000),
  orderId: z.string().optional(),
});

const categoryOptions = [
  { value: 'GENERAL', label: 'General Inquiry' },
  { value: 'ORDER_ISSUE', label: 'Order Issue' },
  { value: 'PAYMENT', label: 'Payment Problem' },
  { value: 'TECHNICAL', label: 'Technical Support' },
  { value: 'OTHER', label: 'Other' },
];

const priorityOptions = [
  { value: 'LOW', label: 'Low' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'HIGH', label: 'High' },
  { value: 'URGENT', label: 'Urgent' },
];

export default function TicketsPage() {
  const [page, setPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data, isLoading } = useTickets({ page, limit: 10 });
  const createTicket = useCreateTicket();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      priority: 'MEDIUM',
    },
  });

  const onSubmit = async (data) => {
    try {
      await createTicket.mutateAsync(data);
      setShowCreateModal(false);
      reset();
    } catch (error) {
      // Error handled by mutation
    }
  };

  const tickets = data?.data || [];
  const pagination = data?.pagination || { total: 0, pages: 1 };

  // Calculate stats
  const openTickets = tickets.filter(t => t.status === 'OPEN').length;
  const pendingTickets = tickets.filter(t => t.status === 'PENDING' || t.status === 'AWAITING_REPLY').length;

  return (
    <div className={`space-y-8 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      {/* Premium Hero Section */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-700/50 bg-gradient-to-br from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-800/90 dark:to-slate-900 shadow-xl dark:shadow-2xl">
        {/* Animated Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-gradient-to-br from-violet-500/30 to-purple-500/20 blur-3xl animate-pulse" />
          <div className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-gradient-to-br from-fuchsia-500/20 to-pink-500/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiLz48cGF0aCBkPSJNNDAgMEgwdjQwaDQwVjB6TTEgMXYzOGgzOFYxSDF6IiBmaWxsPSJyZ2JhKDAsMCwwLDAuMDMpIi8+PC9nPjwvc3ZnPg==')] dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiLz48cGF0aCBkPSJNNDAgMEgwdjQwaDQwVjB6TTEgMXYzOGgzOFYxSDF6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIi8+PC9nPjwvc3ZnPg==')] opacity-50" />
        </div>
        
        <div className="relative px-8 py-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Left Content */}
            <div className="space-y-4">
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-violet-600 dark:text-violet-300 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-400"></span>
                </span>
                Support Center
              </div>
              
              {/* Title Section */}
              <div className="flex items-center gap-5">
                <div className="relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/30">
                    <Headphones className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-fuchsia-500 ring-4 ring-slate-900">
                    <MessageSquare className="h-3 w-3 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-800 to-slate-500 dark:from-white dark:via-white dark:to-slate-400 bg-clip-text text-transparent">
                    Support Tickets
                  </h1>
                  <p className="mt-1 text-base text-slate-500 dark:text-slate-400">
                    Get help with your orders and account
                  </p>
                </div>
              </div>
            </div>
            
            {/* Right - Stats & Action */}
            <div className="flex items-center gap-4">
              {/* Quick Stats */}
              <div className="hidden md:flex items-center gap-4">
                <div className="px-5 py-3 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 backdrop-blur">
                  <p className="text-xs text-slate-500 dark:text-slate-400">Open</p>
                  <p className="text-2xl font-bold text-violet-400">{openTickets}</p>
                </div>
                <div className="px-5 py-3 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 backdrop-blur">
                  <p className="text-xs text-slate-500 dark:text-slate-400">Pending</p>
                  <p className="text-2xl font-bold text-amber-400">{pendingTickets}</p>
                </div>
              </div>
              
              <Button 
                onClick={() => setShowCreateModal(true)}
                className="bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-400 hover:to-purple-400 border-none shadow-lg shadow-violet-500/25 px-6 py-3"
              >
                <MessageCirclePlus className="w-5 h-5 mr-2" />
                New Ticket
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tickets List */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 backdrop-blur-sm overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700/50 px-6 py-5 bg-gradient-to-r from-slate-50 to-slate-100/50 dark:from-slate-800/50 dark:to-slate-800/30">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-fuchsia-500/20 ring-1 ring-fuchsia-500/30">
              <LifeBuoy className="h-5 w-5 text-fuchsia-400" />
            </div>
            <div>
              <h2 className="font-semibold text-slate-800 dark:text-white">Your Tickets</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">{pagination.total} total tickets</p>
            </div>
          </div>
        </div>
        <CardBody className="p-0">
          {tickets.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-700/50 mb-5">
                <MessageSquare className="h-10 w-10 text-slate-500" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">No tickets yet</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 max-w-sm">
                Need help? Create a support ticket and we&apos;ll get back to you as soon as possible.
              </p>
              <Button 
                onClick={() => setShowCreateModal(true)}
                className="bg-violet-500 hover:bg-violet-400 border-none"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Ticket
              </Button>
            </div>
          ) : (
            <>
              <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
                {tickets.map((ticket) => (
                  <Link
                    key={ticket.id}
                    href={`/tickets/${ticket.id}`}
                    className="group block p-5 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-all duration-200"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-slate-800 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors truncate">
                            {ticket.subject}
                          </h3>
                          <Badge status={ticket.status}>{ticket.status}</Badge>
                          <Badge
                            variant={
                              ticket.priority === 'URGENT'
                                ? 'danger'
                                : ticket.priority === 'HIGH'
                                  ? 'warning'
                                  : 'gray'
                            }
                          >
                            {ticket.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
                          <span className="font-mono text-xs bg-slate-100 dark:bg-slate-700/50 px-2 py-0.5 rounded">#{ticket.id.slice(-8)}</span>
                          <span>·</span>
                          <span>{ticket.category}</span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatRelativeTime(ticket.updatedAt)}
                          </span>
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-violet-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </div>
                  </Link>
                ))}
              </div>

              {pagination.pages > 1 && (
                <div className="p-4 border-t border-slate-200 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-900/30">
                  <Pagination
                    currentPage={page}
                    totalPages={pagination.pages}
                    onPageChange={setPage}
                  />
                </div>
              )}
            </>
          )}
        </CardBody>
      </div>

      {/* Create Ticket Modal - Premium Design */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title=""
        size="lg"
      >
        <div className="space-y-6">
          {/* Modal Header */}
          <div className="text-center pb-4 border-b border-slate-200 dark:border-slate-700/50">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 mx-auto mb-4 shadow-lg shadow-violet-500/30">
              <Send className="h-7 w-7 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Create Support Ticket</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">We&apos;ll get back to you as soon as possible</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label="Subject"
              placeholder="Brief description of your issue"
              {...register('subject')}
              error={errors.subject?.message}
              className="bg-slate-800/50 border-slate-700"
            />

            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Category"
                options={categoryOptions}
                {...register('category')}
                error={errors.category?.message}
              />

              <Select
                label="Priority"
                options={priorityOptions}
                {...register('priority')}
                error={errors.priority?.message}
              />
            </div>

            <Input
              label="Order ID (Optional)"
              placeholder="If this is about a specific order"
              {...register('orderId')}
              error={errors.orderId?.message}
              className="bg-slate-800/50 border-slate-700"
            />

            <Textarea
              label="Message"
              placeholder="Describe your issue in detail..."
              rows={5}
              {...register('message')}
              error={errors.message?.message}
              className="bg-slate-800/50 border-slate-700"
            />

            <div className="flex gap-3 justify-end pt-4 border-t border-slate-200 dark:border-slate-700/50">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowCreateModal(false)}
                className="border-slate-600 hover:bg-slate-700"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                isLoading={isSubmitting || createTicket.isPending}
                className="bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-400 hover:to-purple-400 border-none shadow-lg shadow-violet-500/25"
              >
                <Send className="w-4 h-4 mr-2" />
                Submit Ticket
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

TicketsPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
