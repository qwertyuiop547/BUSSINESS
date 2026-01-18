/**
 * Admin Providers Page
 */

import { useState } from 'react';
import { DashboardLayout } from '../../components/layout';
import {
  Card,
  CardBody,
  Button,
  Input,
  Textarea,
  Badge,
  EmptyState,
  Modal,
} from '../../components/ui';
import api from '../../lib/api';
import { formatCurrency } from '../../lib/utils';
import { Server, Plus, Edit, Trash2, RefreshCw, Activity } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const initialFormState = {
  name: '',
  apiUrl: '',
  apiKey: '',
  description: '',
  isActive: true,
};

export default function AdminProvidersPage() {
  const [showModal, setShowModal] = useState(false);
  const [editingProvider, setEditingProvider] = useState(null);
  const [formData, setFormData] = useState(initialFormState);
  const [testingProvider, setTestingProvider] = useState(null);

  // Fetch providers
  const { data: providersData, isLoading, refetch } = useQuery({
    queryKey: ['admin-providers'],
    queryFn: async () => {
      const response = await api.get('/v1/admin/providers');
      return response.data;
    },
  });

  const providers = providersData?.data || [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProvider) {
        await api.patch(`/v1/admin/providers/${editingProvider.id}`, formData);
        toast.success('Provider updated');
      } else {
        await api.post('/v1/admin/providers', formData);
        toast.success('Provider created');
      }

      setShowModal(false);
      setEditingProvider(null);
      setFormData(initialFormState);
      refetch();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (provider) => {
    setEditingProvider(provider);
    setFormData({
      name: provider.name,
      apiUrl: provider.apiUrl,
      apiKey: provider.apiKey,
      description: provider.description || '',
      isActive: provider.isActive,
    });
    setShowModal(true);
  };

  const handleDelete = async (providerId) => {
    if (!window.confirm('Are you sure? Services linked to this provider will need to be updated.')) return;
    try {
      await api.delete(`/v1/admin/providers/${providerId}`);
      toast.success('Provider deleted');
      refetch();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete provider');
    }
  };

  const handleTestConnection = async (providerId) => {
    setTestingProvider(providerId);
    try {
      const response = await api.post(`/v1/admin/providers/${providerId}/test`);
      if (response.data.success) {
        toast.success(`Connection successful! Balance: ${formatCurrency(response.data.balance)}`);
      } else {
        toast.error('Connection failed');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Connection test failed');
    } finally {
      setTestingProvider(null);
    }
  };

  const handleSyncServices = async (providerId) => {
    const toastId = toast.loading('Syncing services...');
    try {
      const response = await api.post(`/v1/admin/providers/${providerId}/sync`);
      toast.success(`Synced ${response.data.count || 0} services`, { id: toastId });
      refetch();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Sync failed', { id: toastId });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">API Providers</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage SMB panel API providers
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingProvider(null);
            setFormData(initialFormState);
            setShowModal(true);
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Provider
        </Button>
      </div>

      {/* Providers Grid */}
      {providers.length === 0 ? (
        <Card>
          <CardBody>
            <EmptyState
              icon={Server}
              title="No providers"
              description="Add your first API provider to start processing orders automatically."
              action={
                <Button onClick={() => setShowModal(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Provider
                </Button>
              }
            />
          </CardBody>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {providers.map((provider) => (
            <Card key={provider.id} className={!provider.isActive ? 'opacity-60' : ''}>
              <CardBody>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${provider.isActive
                      ? 'bg-green-100 dark:bg-green-900/30'
                      : 'bg-gray-100 dark:bg-gray-800'
                      }`}>
                      <Server className={`w-5 h-5 ${provider.isActive ? 'text-green-600' : 'text-gray-500'
                        }`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{provider.name}</h3>
                    </div>
                  </div>
                  <Badge variant={provider.isActive ? 'success' : 'gray'}>
                    {provider.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>

                {provider.description && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{provider.description}</p>
                )}

                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <span>{provider._count?.services || 0} services</span>
                  {provider.balance !== undefined && (
                    <span>Balance: {formatCurrency(provider.balance)}</span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleTestConnection(provider.id)}
                    disabled={testingProvider === provider.id}
                  >
                    {testingProvider === provider.id ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Activity className="w-4 h-4" />
                    )}
                    <span className="ml-1">Test</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSyncServices(provider.id)}
                  >
                    <RefreshCw className="w-4 h-4 mr-1" />
                    Sync
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(provider)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(provider.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}

      {/* Provider Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingProvider(null);
          setFormData(initialFormState);
        }}
        title={editingProvider ? 'Edit Provider' : 'Add Provider'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Provider Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., SMB Panel Pro"
            required
          />

          <Input
            label="API URL"
            value={formData.apiUrl}
            onChange={(e) => setFormData({ ...formData, apiUrl: e.target.value })}
            placeholder="https://provider.com/api/v2"
            required
          />

          <Input
            label="API Key"
            type="password"
            value={formData.apiKey}
            onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
            placeholder="Your API key"
            required={!editingProvider}
          />
          {editingProvider && (
            <p className="text-xs text-gray-500 -mt-2">
              Leave empty to keep the existing API key
            </p>
          )}

          <Textarea
            label="Description (Optional)"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={2}
          />

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="w-4 h-4 rounded"
            />
            <span className="text-sm">Active</span>
          </label>

          <div className="flex gap-3 justify-end pt-4">
            <Button type="button" variant="outline" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {editingProvider ? 'Update' : 'Create'} Provider
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

AdminProvidersPage.getLayout = function getLayout(page) {
  return <DashboardLayout isAdmin>{page}</DashboardLayout>;
};
