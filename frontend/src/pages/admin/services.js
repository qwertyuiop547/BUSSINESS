/**
 * Admin Services Page
 */

import { useState } from 'react';
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
import { useCategories } from '../../hooks/useApi';
import api from '../../lib/api';
import { formatCurrency, formatNumber } from '../../lib/utils';
import { Settings, Plus, Edit, Trash2, Search, Power, PowerOff } from 'lucide-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const initialFormState = {
  name: '',
  categoryId: '',
  platform: '',
  type: 'REGULAR',
  description: '',
  price: '',
  minQuantity: 100,
  maxQuantity: 10000,
  apiProviderId: '',
  apiServiceId: '',
  dripFeed: false,
  refill: false,
  isActive: true,
};

export default function AdminServicesPage() {
  const [page, setPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState(initialFormState);

  const queryClient = useQueryClient();

  // Fetch services
  const { data: servicesData, isLoading, refetch } = useQuery({
    queryKey: ['admin-services', page, categoryFilter, search],
    queryFn: async () => {
      const params = { page, limit: 20 };
      if (categoryFilter) params.categoryId = categoryFilter;
      if (search) params.search = search;
      const response = await api.get('/v1/admin/services', { params });
      return response.data;
    },
  });

  // Fetch categories for dropdown
  const { data: categoriesData } = useCategories();

  // Fetch providers for dropdown
  const { data: providersData } = useQuery({
    queryKey: ['admin-providers'],
    queryFn: async () => {
      const response = await api.get('/v1/admin/providers');
      return response.data;
    },
  });

  const services = servicesData?.data || [];
  const pagination = servicesData?.pagination || { total: 0, pages: 1 };
  const categories = categoriesData?.data || [];
  const providers = providersData?.data || [];

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    ...categories.map(c => ({ value: c.id, label: c.name })),
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        categoryId: formData.categoryId || undefined,
        price: parseFloat(formData.price),
        minQuantity: parseInt(formData.minQuantity),
        maxQuantity: parseInt(formData.maxQuantity),
        apiProviderId: formData.apiProviderId || undefined,
        apiServiceId: formData.apiServiceId || undefined,
      };

      if (editingService) {
        await api.patch(`/v1/admin/services/${editingService.id}`, payload);
        toast.success('Service updated');
      } else {
        await api.post('/v1/admin/services', payload);
        toast.success('Service created');
      }

      setShowModal(false);
      setEditingService(null);
      setFormData(initialFormState);
      refetch();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      categoryId: service.categoryId || '',
      platform: service.platform || '',
      type: service.type,
      description: service.description || '',
      price: service.price.toString(),
      minQuantity: service.minQuantity,
      maxQuantity: service.maxQuantity,
      apiProviderId: service.apiProviderId || '',
      apiServiceId: service.apiServiceId || '',
      dripFeed: service.dripFeed,
      refill: service.refill,
      isActive: service.isActive,
    });
    setShowModal(true);
  };

  const handleDelete = async (serviceId) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    try {
      await api.delete(`/v1/admin/services/${serviceId}`);
      toast.success('Service deleted');
      refetch();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete service');
    }
  };

  const handleToggleActive = async (service) => {
    try {
      await api.patch(`/v1/admin/services/${service.id}`, {
        isActive: !service.isActive,
      });
      toast.success(`Service ${service.isActive ? 'disabled' : 'enabled'}`);
      refetch();
    } catch (error) {
      toast.error('Failed to update service');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Services</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage SMM services and pricing
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingService(null);
            setFormData(initialFormState);
            setShowModal(true);
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Service
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardBody>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search services..."
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
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setPage(1);
              }}
              options={categoryOptions}
              className="w-48"
            />
          </div>
        </CardBody>
      </Card>

      {/* Services Table */}
      <Card>
        <CardBody className="p-0">
          {services.length === 0 ? (
            <EmptyState
              icon={Settings}
              title="No services found"
              description="Add your first service to get started."
              action={
                <Button onClick={() => setShowModal(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Service
                </Button>
              }
            />
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="table">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="text-gray-900 dark:text-white">Service</th>
                      <th className="text-gray-900 dark:text-white">Category</th>
                      <th className="text-gray-900 dark:text-white">Platform</th>
                      <th className="text-gray-900 dark:text-white">Price</th>
                      <th className="text-gray-900 dark:text-white">Min/Max</th>
                      <th className="text-gray-900 dark:text-white">Orders</th>
                      <th className="text-gray-900 dark:text-white">Status</th>
                      <th className="text-gray-900 dark:text-white">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map((service) => (
                      <tr key={service.id} className={!service.isActive ? 'opacity-50' : ''}>
                        <td>
                          <div className="max-w-[200px]">
                            <p className="font-medium text-gray-900 dark:text-white truncate">{service.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{service.type}</p>
                          </div>
                        </td>
                        <td className="text-gray-900 dark:text-white">{service.category?.name || '-'}</td>
                        <td className="text-gray-900 dark:text-white">{service.platform || '-'}</td>
                        <td className="font-medium text-gray-900 dark:text-white">
                          {formatCurrency(service.price)}/1k
                        </td>
                        <td className="text-sm text-gray-900 dark:text-white">
                          {formatNumber(service.minQuantity)} - {formatNumber(service.maxQuantity)}
                        </td>
                        <td className="text-gray-900 dark:text-white">{service._count?.orders || 0}</td>
                        <td>
                          <Badge variant={service.isActive ? 'success' : 'gray'}>
                            {service.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                        </td>
                        <td>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleToggleActive(service)}
                              title={service.isActive ? 'Disable' : 'Enable'}
                            >
                              {service.isActive ? (
                                <PowerOff className="w-4 h-4" />
                              ) : (
                                <Power className="w-4 h-4" />
                              )}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(service)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleDelete(service.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
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

      {/* Service Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingService(null);
          setFormData(initialFormState);
        }}
        title={editingService ? 'Edit Service' : 'Add Service'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Service Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Category"
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              options={[
                { value: '', label: 'Select Category' },
                ...categories.map(c => ({ value: c.id, label: c.name })),
              ]}
            />
            <Input
              label="Platform"
              value={formData.platform}
              onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
              placeholder="Instagram, YouTube, etc."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              options={[
                { value: 'REGULAR', label: 'Regular' },
                { value: 'PREMIUM', label: 'Premium' },
                { value: 'CHEAP', label: 'Cheap' },
              ]}
            />
            <Input
              label="Price per 1000"
              type="number"
              step="0.001"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Min Quantity"
              type="number"
              value={formData.minQuantity}
              onChange={(e) => setFormData({ ...formData, minQuantity: e.target.value })}
              required
            />
            <Input
              label="Max Quantity"
              type="number"
              value={formData.maxQuantity}
              onChange={(e) => setFormData({ ...formData, maxQuantity: e.target.value })}
              required
            />
          </div>

          <Textarea
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={2}
          />

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="API Provider"
              value={formData.apiProviderId}
              onChange={(e) => setFormData({ ...formData, apiProviderId: e.target.value })}
              options={[
                { value: '', label: 'None (Manual)' },
                ...providers.map(p => ({ value: p.id, label: p.name })),
              ]}
            />
            <Input
              label="API Service ID"
              value={formData.apiServiceId}
              onChange={(e) => setFormData({ ...formData, apiServiceId: e.target.value })}
              placeholder="Service ID from provider"
            />
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.dripFeed}
                onChange={(e) => setFormData({ ...formData, dripFeed: e.target.checked })}
                className="w-4 h-4 rounded"
              />
              <span className="text-sm">Drip Feed</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.refill}
                onChange={(e) => setFormData({ ...formData, refill: e.target.checked })}
                className="w-4 h-4 rounded"
              />
              <span className="text-sm">Refill</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-4 h-4 rounded"
              />
              <span className="text-sm">Active</span>
            </label>
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Button type="button" variant="outline" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {editingService ? 'Update' : 'Create'} Service
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

AdminServicesPage.getLayout = function getLayout(page) {
  return <DashboardLayout isAdmin>{page}</DashboardLayout>;
};
