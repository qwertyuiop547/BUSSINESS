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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Activity Logs</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Track admin actions and system events
          </p>
        </div>
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
