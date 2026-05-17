/**
 * Admin Users Page
 */

import { useState } from 'react';
import { DashboardLayout } from '../../components/layout';
import {
  Card,
  CardBody,
  Button,
  Input,
  Select,
  Badge,
  Pagination,
  EmptyState,
  Modal,
} from '../../components/ui';
import { useAdminUsers, useUpdateUser, useAdjustBalance, useAdminUserById } from '../../hooks/useApi';
import api from '../../lib/api';
import { formatCurrency, formatDate, getProfileImageUrl } from '../../lib/utils';
import { Users, Search, Ban, CheckCircle, DollarSign, Eye, User, Mail, Calendar, Wallet, Package, Ticket, Key, TrendingUp, Clock, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import toast from 'react-hot-toast';

const statusOptions = [
  { value: '', label: 'All Statuses' },
  { value: 'ACTIVE', label: 'Active' },
  { value: 'BANNED', label: 'Banned' },
  { value: 'SUSPENDED', label: 'Suspended' },
];

const roleOptions = [
  { value: '', label: 'All Roles' },
  { value: 'USER', label: 'User' },
  { value: 'ADMIN', label: 'Admin' },
];

export default function AdminUsersPage() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('');
  const [role, setRole] = useState('');
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [viewingUserId, setViewingUserId] = useState(null);
  const [showBalanceModal, setShowBalanceModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [balanceAmount, setBalanceAmount] = useState('');
  const [balanceDescription, setBalanceDescription] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  const { data, isLoading, refetch } = useAdminUsers({
    page,
    limit: 20,
    ...(status && { status }),
    ...(role && { role }),
    ...(search && { search }),
  });

  const adjustBalance = useAdjustBalance();
  const { data: viewedUser, isLoading: isLoadingUser } = useAdminUserById(viewingUserId);

  const users = data?.data || [];
  const pagination = data?.pagination || { total: 0, pages: 1 };

  const handleViewProfile = (userId) => {
    setViewingUserId(userId);
    setShowViewModal(true);
  };

  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setViewingUserId(null);
  };

  const handleBan = async (userId) => {
    if (!window.confirm('Are you sure you want to ban this user?')) return;
    try {
      await api.post(`/v1/admin/users/${userId}/ban`);
      toast.success('User banned');
      refetch();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to ban user');
    }
  };

  const handleUnban = async (userId) => {
    if (!window.confirm('Are you sure you want to unban this user?')) return;
    try {
      await api.post(`/v1/admin/users/${userId}/unban`);
      toast.success('User unbanned');
      refetch();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to unban user');
    }
  };

  const handleAdjustBalance = async () => {
    if (!selectedUser || !balanceAmount || !balanceDescription) return;
    
    try {
      await adjustBalance.mutateAsync({
        userId: selectedUser.id,
        amount: parseFloat(balanceAmount),
        description: balanceDescription,
      });
      setShowBalanceModal(false);
      setSelectedUser(null);
      setBalanceAmount('');
      setBalanceDescription('');
      refetch();
    } catch (error) {
      // Error handled by mutation
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Users</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Manage user accounts and balances
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardBody>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by email or username..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  className="pl-10"
                />
              </div>
            </div>
            <Select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
              options={statusOptions}
              className="w-40"
            />
            <Select
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
                setPage(1);
              }}
              options={roleOptions}
              className="w-32"
            />
          </div>
        </CardBody>
      </Card>

      {/* Users Table */}
      <Card>
        <CardBody className="p-0">
          {users.length === 0 ? (
            <EmptyState
              icon={Users}
              title="No users found"
              description="Try adjusting your search filters."
            />
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="table">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="text-gray-900 dark:text-white">User</th>
                      <th className="text-gray-900 dark:text-white">Role</th>
                      <th className="text-gray-900 dark:text-white">Balance</th>
                      <th className="text-gray-900 dark:text-white">Orders</th>
                      <th className="text-gray-900 dark:text-white">Status</th>
                      <th className="text-gray-900 dark:text-white">Joined</th>
                      <th className="text-gray-900 dark:text-white">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{user.username}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                          </div>
                        </td>
                        <td>
                          <Badge variant={user.role === 'ADMIN' ? 'info' : 'gray'}>
                            {user.role}
                          </Badge>
                        </td>
                        <td className="font-medium text-gray-900 dark:text-white">
                          {formatCurrency(user.balance)}
                        </td>
                        <td className="text-gray-900 dark:text-white">{user._count?.orders || 0}</td>
                        <td>
                          <Badge status={user.status}>{user.status}</Badge>
                        </td>
                        <td className="text-gray-500 dark:text-gray-400 text-sm">
                          {formatDate(user.createdAt, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </td>
                        <td>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewProfile(user.id)}
                              title="View Profile"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedUser(user);
                                setShowBalanceModal(true);
                              }}
                              title="Adjust Balance"
                            >
                              <DollarSign className="w-4 h-4" />
                            </Button>
                            {user.status === 'BANNED' ? (
                              <Button
                                variant="success"
                                size="sm"
                                onClick={() => handleUnban(user.id)}
                                title="Unban User"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </Button>
                            ) : (
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleBan(user.id)}
                                disabled={user.role === 'ADMIN'}
                                title="Ban User"
                              >
                                <Ban className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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

      {/* Balance Adjustment Modal */}
      <Modal
        isOpen={showBalanceModal}
        onClose={() => {
          setShowBalanceModal(false);
          setSelectedUser(null);
          setBalanceAmount('');
          setBalanceDescription('');
        }}
        title="Adjust User Balance"
      >
        {selectedUser && (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">User</p>
              <p className="font-medium text-gray-900 dark:text-white">{selectedUser.email}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Current Balance</p>
              <p className="font-bold text-lg text-gray-900 dark:text-white">{formatCurrency(selectedUser.balance)}</p>
            </div>

            <Input
              label="Amount (use negative for deduction)"
              type="number"
              step="0.01"
              placeholder="10.00 or -10.00"
              value={balanceAmount}
              onChange={(e) => setBalanceAmount(e.target.value)}
            />

            <Input
              label="Description (required)"
              placeholder="Reason for adjustment..."
              value={balanceDescription}
              onChange={(e) => setBalanceDescription(e.target.value)}
            />

            <div className="flex gap-3 justify-end pt-4">
              <Button
                variant="outline"
                onClick={() => setShowBalanceModal(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleAdjustBalance}
                disabled={!balanceAmount || !balanceDescription}
                isLoading={adjustBalance.isPending}
              >
                Adjust Balance
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* View Profile Modal - Comprehensive User View */}
      <Modal
        isOpen={showViewModal}
        onClose={() => {
          handleCloseViewModal();
          setActiveTab('overview');
        }}
        title="User Profile - Complete View"
        size="xl"
      >
        {isLoadingUser ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        ) : viewedUser ? (
          <div className="space-y-6">
            {/* Profile Header */}
            <div className="flex items-start gap-4 pb-6 border-b border-gray-200 dark:border-gray-700">
              <div className="relative">
                {viewedUser.profilePicture ? (
                  <img
                    src={getProfileImageUrl(viewedUser.profilePicture)}
                    alt={viewedUser.username}
                    className="w-20 h-20 rounded-full object-cover border-4 border-primary-100 dark:border-primary-900 cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => {
                      setImageUrl(getProfileImageUrl(viewedUser.profilePicture));
                      setShowImageModal(true);
                    }}
                    title="Click to view full size"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center border-4 border-primary-100 dark:border-primary-900">
                    <User className="w-10 h-10 text-slate-900 dark:text-white" />
                  </div>
                )}
                <Badge
                  status={viewedUser.status}
                  className="absolute -bottom-1 -right-1 border-2 border-white dark:border-gray-800"
                >
                  {viewedUser.status}
                </Badge>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{viewedUser.username}</h3>
                <p className="text-gray-500 dark:text-gray-400 flex items-center gap-2 mt-1">
                  <Mail className="w-4 h-4" />
                  {viewedUser.email}
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <Badge variant={viewedUser.role === 'ADMIN' ? 'info' : 'gray'}>
                    {viewedUser.role}
                  </Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedUser(viewedUser);
                    setShowBalanceModal(true);
                  }}
                >
                  <DollarSign className="w-4 h-4 mr-2" />
                  Adjust Balance
                </Button>
                {viewedUser.status === 'BANNED' ? (
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => {
                      handleCloseViewModal();
                      handleUnban(viewedUser.id);
                    }}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Unban
                  </Button>
                ) : (
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      handleCloseViewModal();
                      handleBan(viewedUser.id);
                    }}
                    disabled={viewedUser.role === 'ADMIN'}
                  >
                    <Ban className="w-4 h-4 mr-2" />
                    Ban
                  </Button>
                )}
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 dark:border-gray-700">
              <div className="flex gap-2 overflow-x-auto">
                {[
                  { id: 'overview', label: 'Overview', icon: User },
                  { id: 'orders', label: `Orders (${viewedUser._count?.orders || 0})`, icon: Package },
                  { id: 'transactions', label: `Transactions (${viewedUser._count?.transactions || 0})`, icon: TrendingUp },
                  { id: 'topups', label: `Top-ups (${viewedUser._count?.topUpRequests || 0})`, icon: Wallet },
                  { id: 'apikeys', label: `API Keys (${viewedUser._count?.apiKeys || 0})`, icon: Key },
                  { id: 'tickets', label: `Tickets (${viewedUser._count?.tickets || 0})`, icon: Ticket },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${ activeTab === tab.id ? 'border-primary-600 text-primary-600 dark:text-primary-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300' }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Account Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-1">
                        <Wallet className="w-4 h-4" />
                        <span className="text-xs font-medium">Balance</span>
                      </div>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        {formatCurrency(viewedUser.balance)}
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-1">
                        <Package className="w-4 h-4" />
                        <span className="text-xs font-medium">Orders</span>
                      </div>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        {viewedUser._count?.orders || 0}
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-1">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-xs font-medium">Transactions</span>
                      </div>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        {viewedUser._count?.transactions || 0}
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-1">
                        <Ticket className="w-4 h-4" />
                        <span className="text-xs font-medium">Tickets</span>
                      </div>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        {viewedUser._count?.tickets || 0}
                      </p>
                    </div>
                  </div>

                  {/* Account Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Account Created
                      </label>
                      <p className="text-sm text-gray-900 dark:text-white flex items-center gap-2 mt-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(viewedUser.createdAt, {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Last Login
                      </label>
                      <p className="text-sm text-gray-900 dark:text-white flex items-center gap-2 mt-1">
                        <Calendar className="w-4 h-4" />
                        {viewedUser.lastLoginAt
                          ? formatDate(viewedUser.lastLoginAt, {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })
                          : 'Never'}
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Last Updated
                      </label>
                      <p className="text-sm text-gray-900 dark:text-white flex items-center gap-2 mt-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(viewedUser.updatedAt, {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        User ID
                      </label>
                      <p className="text-sm text-gray-900 dark:text-white font-mono mt-1">
                        {viewedUser.id}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div className="space-y-4">
                  {viewedUser.orders && viewedUser.orders.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="table">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                          <tr>
                            <th>Order ID</th>
                            <th>Service</th>
                            <th>Quantity</th>
                            <th>Charge</th>
                            <th>Status</th>
                            <th>Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {viewedUser.orders.map((order) => (
                            <tr key={order.id}>
                              <td className="font-mono text-xs">{order.id.slice(0, 8)}...</td>
                              <td>
                                <div>
                                  <p className="font-medium">{order.service?.name || 'N/A'}</p>
                                  <p className="text-xs text-gray-500">{order.service?.platform || ''}</p>
                                </div>
                              </td>
                              <td>{order.quantity}</td>
                              <td className="font-medium">{formatCurrency(order.charge)}</td>
                              <td><Badge status={order.status}>{order.status}</Badge></td>
                              <td className="text-sm text-gray-500">
                                {formatDate(order.createdAt, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <EmptyState icon={Package} title="No orders" description="This user hasn't placed any orders yet." />
                  )}
                </div>
              )}

              {/* Transactions Tab */}
              {activeTab === 'transactions' && (
                <div className="space-y-4">
                  {viewedUser.transactions && viewedUser.transactions.length > 0 ? (
                    <div className="space-y-2">
                      {viewedUser.transactions.map((transaction) => (
                        <div key={transaction.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {transaction.type === 'CREDIT' ? (
                              <ArrowDownRight className="w-5 h-5 text-green-500" />
                            ) : (
                              <ArrowUpRight className="w-5 h-5 text-red-500" />
                            )}
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">{transaction.description}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {formatDate(transaction.createdAt, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`font-bold ${transaction.type === 'CREDIT' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                              {transaction.type === 'CREDIT' ? '+' : '-'}{formatCurrency(Math.abs(Number(transaction.amount)))}
                            </p>
                            <Badge variant="gray" className="text-xs mt-1">{transaction.type}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <EmptyState icon={TrendingUp} title="No transactions" description="This user hasn't made any transactions yet." />
                  )}
                </div>
              )}

              {/* Top-ups Tab */}
              {activeTab === 'topups' && (
                <div className="space-y-4">
                  {viewedUser.topUpRequests && viewedUser.topUpRequests.length > 0 ? (
                    <div className="space-y-2">
                      {viewedUser.topUpRequests.map((topup) => (
                        <div key={topup.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">{formatCurrency(topup.amount)}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {formatDate(topup.createdAt, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                              </p>
                            </div>
                            <Badge status={topup.status}>{topup.status}</Badge>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <span>Payment Method:</span>
                            <Badge variant="gray">{topup.paymentMethod}</Badge>
                          </div>
                          {topup.adminNote && (
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Note: {topup.adminNote}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <EmptyState icon={Wallet} title="No top-ups" description="This user hasn't requested any top-ups yet." />
                  )}
                </div>
              )}

              {/* API Keys Tab */}
              {activeTab === 'apikeys' && (
                <div className="space-y-4">
                  {viewedUser.apiKeys && viewedUser.apiKeys.length > 0 ? (
                    <div className="space-y-2">
                      {viewedUser.apiKeys.map((apiKey) => (
                        <div key={apiKey.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">{apiKey.name || 'Unnamed Key'}</p>
                              <p className="text-xs font-mono text-gray-500 dark:text-gray-400 mt-1">
                                {apiKey.key.slice(0, 20)}...
                              </p>
                            </div>
                            <Badge variant={apiKey.isActive ? 'success' : 'gray'}>
                              {apiKey.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                            <span>Created: {formatDate(apiKey.createdAt, { month: 'short', day: 'numeric' })}</span>
                            {apiKey.lastUsedAt && (
                              <span>Last used: {formatDate(apiKey.lastUsedAt, { month: 'short', day: 'numeric' })}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <EmptyState icon={Key} title="No API keys" description="This user hasn't created any API keys yet." />
                  )}
                </div>
              )}

              {/* Tickets Tab */}
              {activeTab === 'tickets' && (
                <div className="space-y-4">
                  {viewedUser.tickets && viewedUser.tickets.length > 0 ? (
                    <div className="space-y-2">
                      {viewedUser.tickets.map((ticket) => (
                        <div key={ticket.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-medium text-gray-900 dark:text-white">{ticket.subject}</p>
                            <div className="flex items-center gap-2">
                              <Badge status={ticket.status}>{ticket.status}</Badge>
                              {ticket.priority === 'URGENT' && (
                                <Badge variant="danger">URGENT</Badge>
                              )}
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Created: {formatDate(ticket.createdAt, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <EmptyState icon={Ticket} title="No tickets" description="This user hasn't created any support tickets yet." />
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="py-12 text-center text-gray-500 dark:text-gray-400">
            Failed to load user profile
          </div>
        )}
      </Modal>

      {/* Full Size Image Modal */}
      <Modal
        isOpen={showImageModal}
        onClose={() => {
          setShowImageModal(false);
          setImageUrl('');
        }}
        title="Profile Picture"
        size="full"
      >
        <div className="flex items-center justify-center p-8">
          <img
            src={imageUrl}
            alt="Profile Picture"
            className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
          />
        </div>
      </Modal>
    </div>
  );
}

AdminUsersPage.getLayout = function getLayout(page) {
  return <DashboardLayout isAdmin>{page}</DashboardLayout>;
};
