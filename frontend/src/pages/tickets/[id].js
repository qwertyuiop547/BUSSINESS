/**
 * Single Ticket Page
 */

import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { DashboardLayout } from '../../components/layout';
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Button,
  Textarea,
  Badge,
  LoadingScreen,
} from '../../components/ui';
import { useTicketById, useReplyTicket } from '../../hooks/useApi';
import useAuthStore from '../../store/authStore';
import { formatDate } from '../../lib/utils';
import { ArrowLeft, Send, User, Shield } from 'lucide-react';
import Link from 'next/link';

const replySchema = z.object({
  message: z.string().min(1, 'Message is required').max(5000),
});

export default function TicketPage() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuthStore();
  
  const { data: ticket, isLoading } = useTicketById(id);
  const replyTicket = useReplyTicket();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(replySchema),
  });

  const onSubmit = async (data) => {
    try {
      await replyTicket.mutateAsync({ ticketId: id, message: data.message });
      reset();
    } catch (error) {
      // Error handled by mutation
    }
  };

  if (isLoading || !ticket) {
    return (
      <DashboardLayout>
        <LoadingScreen />
      </DashboardLayout>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/tickets"
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-800 text-slate-700 dark:text-slate-300"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-800 dark:text-white">{ticket.subject}</h1>
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
          <p className="text-sm text-slate-500 dark:text-gray-500">
            #{ticket.id.slice(-8)} · {ticket.category} · Created {formatDate(ticket.createdAt)}
          </p>
        </div>
      </div>

      {/* Messages */}
      <Card>
        <CardBody className="p-0">
          <div className="divide-y divide-slate-200 dark:divide-gray-700">
            {ticket.messages?.map((message) => (
              <div
                key={message.id}
                className={`p-4 ${
                  message.isAdmin
                    ? 'bg-violet-50 dark:bg-primary-900/10'
                    : 'bg-white dark:bg-transparent'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.isAdmin
                        ? 'bg-violet-100 dark:bg-primary-900/30'
                        : 'bg-slate-100 dark:bg-gray-800'
                    }`}
                  >
                    {message.isAdmin ? (
                      <Shield className="w-4 h-4 text-violet-600 dark:text-primary-600" />
                    ) : (
                      <User className="w-4 h-4 text-slate-600 dark:text-gray-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-slate-800 dark:text-white">
                        {message.isAdmin ? 'Support Team' : ticket.user?.username || 'You'}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-gray-500">
                        {formatDate(message.createdAt)}
                      </span>
                    </div>
                    <p className="text-slate-700 dark:text-gray-300 whitespace-pre-wrap">
                      {message.message}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Reply Form */}
      {ticket.status !== 'CLOSED' && (
        <Card>
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Textarea
                placeholder="Type your reply..."
                rows={4}
                {...register('message')}
                error={errors.message?.message}
              />
              <div className="flex justify-end mt-3">
                <Button
                  type="submit"
                  isLoading={isSubmitting || replyTicket.isPending}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Reply
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      )}

      {ticket.status === 'CLOSED' && (
        <div className="text-center p-4 bg-slate-100 dark:bg-gray-800 rounded-lg">
          <p className="text-slate-500 dark:text-gray-500">This ticket has been closed.</p>
        </div>
      )}
    </div>
  );
}

TicketPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
