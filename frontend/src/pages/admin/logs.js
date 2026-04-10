/**
 * Admin Logs Page
 */

import { useState } from 'react';
import { DashboardLayout } from '../../components/layout';
import {
  Card,
  CardBody,
  Select,
  Badge,
  Pagination,
  EmptyState,
} from '../../components/ui';
import { useAdminLogs } from '../../hooks/useApi';
import { formatDate } from '../../lib/utils';
import { FileText, User, Settings, CreditCard, Package, Shield } from 'lucide-react';

const actionOptions = [
  { value: '', label: 'All Actions' },
  { value: 'USER_CREATED', label: 'User Created' },
  { value: 'USER_BANNED', label: 'User Banned' },
  { value: 'USER_UNBANNED', label: 'User Unbanned' },
  { value: 'BALANCE_ADJUSTED', label: 'Balance Adjusted' },
  { value: 'ORDER_REFUNDED', label: 'Order Refunded' },
  { value: 'ORDER_UPDATED', label: 'Order Updated' },
  { value: 'SERVICE_CREATED', label: 'Service Created' },
  { value: 'SERVICE_UPDATED', label: 'Service Updated' },
  { value: 'SERVICE_DELETED', label: 'Service Deleted' },
  { value: 'TOPUP_APPROVED', label: 'Top-up Approved' },
  { value: 'TOPUP_REJECTED', label: 'Top-up Rejected' },
  { value: 'PROVIDER_CREATED', label: 'Provider Created' },
  { value: 'PROVIDER_UPDATED', label: 'Provider Updated' },
];

export default function AdminLogsPage() {
  const [page, setPage] = useState(1);
  const [action, setAction] = useState('');

  const { data, isLoading } = useAdminLogs({
    page,
    limit: 30,
    ...(action && { action }),
  });

  const logs = data?.data || [];
  const pagination = data?.pagination || { total: 0, pages: 1 };

  const getActionIcon = (action) => {
    if (action.includes('USER')) return User;
    if (action.includes('ORDER')) return Package;
    if (action.includes('BALANCE') || action.includes('TOPUP')) return CreditCard;
    if (action.includes('SERVICE') || action.includes('PROVIDER')) return Settings;
    return Shield;
  };

  const getActionColor = (action) => {
    if (action.includes('BANNED') || action.includes('DELETED') || action.includes('REJECTED')) {
      return 'text-red-600 bg-red-100 dark:bg-red-900/30';
    }
    if (action.includes('CREATED') || action.includes('APPROVED') || action.includes('UNBANNED')) {
      return 'text-green-600 bg-green-100 dark:bg-green-900/30';
    }
    if (action.includes('UPDATED') || action.includes('ADJUSTED') || action.includes('REFUNDED')) {
      return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30';
    }
    return 'text-gray-600 bg-gray-100 dark:bg-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Premium Hero Header */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-700/50 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800/90 dark:to-slate-900 shadow-2xl">
        {/* Animated Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-gradient-to-br from-blue-500/10 to-cyan-500/10 dark:from-blue-500/20 dark:to-cyan-500/20 blur-3xl animate-pulse" />
          <div className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-gradient-to-br from-indigo-500/10 to-purple-500/5 dark:from-indigo-500/20 dark:to-purple-500/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiLz48cGF0aCBkPSJNNDAgMEgwdjQwaDQwVjB6TTEgMXYzOGgzOFYxSDF6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIi8+PC9nPjwvc3ZnPg==')] opacity-50" />
        </div>

        <div className="relative px-6 py-8 md:px-8 md:py-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-blue-600 dark:text-blue-300 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-400"></span>
                </span>
                System Monitor
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30">
                  <FileText className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600 dark:from-white dark:via-white dark:to-slate-400 bg-clip-text text-transparent">
                    Activity Logs
                  </h1>
                  <p className="text-base text-slate-500 dark:text-slate-400 flex items-center gap-2">
                    <Shield className="h-4 w-4 text-blue-500" />
                    Track admin actions and system events
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Select
                value={action}
                onChange={(e) => {
                  setAction(e.target.value);
                  setPage(1);
                }}
                options={actionOptions}
                className="w-48"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Logs */}
      <Card>
        <CardBody className="p-0">
          {logs.length === 0 ? (
            <EmptyState
              icon={FileText}
              title="No logs found"
              description="Activity logs will appear here as actions are performed."
            />
          ) : (
            <>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {logs.map((log) => {
                  const Icon = getActionIcon(log.action);
                  const colorClass = getActionColor(log.action);

                  return (
                    <div key={log.id} className="p-4 flex items-start gap-4">
                      <div className={`p-2 rounded-lg ${colorClass}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" size="sm">
                            {log.action.replace(/_/g, ' ')}
                          </Badge>
                          <span className="text-xs text-gray-400">
                            {formatDate(log.createdAt)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-900 dark:text-white">
                          <span className="font-medium">{log.admin?.username || 'System'}</span>
                          {log.targetUser && (
                            <>
                              {' → '}
                              <span className="text-gray-500 dark:text-gray-400">{log.targetUser.email}</span>
                            </>
                          )}
                        </p>
                        {log.details && (
                          <pre className="mt-2 text-xs text-gray-500 bg-gray-50 dark:bg-gray-800 p-2 rounded overflow-x-auto">
                            {typeof log.details === 'object'
                              ? JSON.stringify(log.details, null, 2)
                              : log.details}
                          </pre>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {pagination.pages > 1 && (
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
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
      </Card>
    </div>
  );
}

AdminLogsPage.getLayout = function getLayout(page) {
  return <DashboardLayout isAdmin>{page}</DashboardLayout>;
};
