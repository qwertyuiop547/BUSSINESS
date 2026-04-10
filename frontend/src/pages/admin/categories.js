/**
 * Admin Categories Page
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
import { Folder, Plus, Edit, Trash2, GripVertical } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const initialFormState = {
  name: '',
  slug: '',
  description: '',
  sortOrder: 0,
  isActive: true,
};

export default function AdminCategoriesPage() {
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState(initialFormState);

  // Fetch categories
  const { data: categoriesData, isLoading, refetch } = useQuery({
    queryKey: ['admin-categories'],
    queryFn: async () => {
      const response = await api.get('/v1/admin/categories');
      return response.data;
    },
  });

  const categories = categoriesData?.data || [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        sortOrder: parseInt(formData.sortOrder) || 0,
      };

      if (editingCategory) {
        await api.patch(`/v1/admin/categories/${editingCategory.id}`, payload);
        toast.success('Category updated');
      } else {
        await api.post('/v1/admin/categories', payload);
        toast.success('Category created');
      }

      setShowModal(false);
      setEditingCategory(null);
      setFormData(initialFormState);
      refetch();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug || '',
      description: category.description || '',
      sortOrder: category.sortOrder || 0,
      isActive: category.isActive,
    });
    setShowModal(true);
  };

  const handleDelete = async (categoryId) => {
    if (!window.confirm('Are you sure? This will also affect all services in this category.')) return;
    try {
      await api.delete(`/v1/admin/categories/${categoryId}`);
      toast.success('Category deleted');
      refetch();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete category');
    }
  };

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Categories</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Organize services into categories
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingCategory(null);
            setFormData(initialFormState);
            setShowModal(true);
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </Button>
      </div>

      {/* Categories List */}
      <Card>
        <CardBody className="p-0">
          {categories.length === 0 ? (
            <EmptyState
              icon={Folder}
              title="No categories"
              description="Create your first category to organize services."
              action={
                <Button onClick={() => setShowModal(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Category
                </Button>
              }
            />
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {categories
                .sort((a, b) => a.sortOrder - b.sortOrder)
                .map((category) => (
                  <div
                    key={category.id}
                    className={`flex items-center gap-4 p-4 ${!category.isActive ? 'opacity-50' : '' }`}
                  >
                    <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-gray-900 dark:text-white">{category.name}</h3>
                        <Badge variant={category.isActive ? 'success' : 'gray'} size="sm">
                          {category.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      {category.description && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{category.description}</p>
                      )}
                      <p className="text-xs text-gray-400 mt-1">
                        {category._count?.services || 0} services • Sort: {category.sortOrder}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(category)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(category.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </CardBody>
      </Card>

      {/* Category Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingCategory(null);
          setFormData(initialFormState);
        }}
        title={editingCategory ? 'Edit Category' : 'Add Category'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Category Name"
            value={formData.name}
            onChange={(e) => {
              setFormData({
                ...formData,
                name: e.target.value,
                slug: editingCategory ? formData.slug : generateSlug(e.target.value),
              });
            }}
            required
          />

          <Input
            label="Slug"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            placeholder="auto-generated-from-name"
          />

          <Textarea
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={2}
          />

          <Input
            label="Sort Order"
            type="number"
            value={formData.sortOrder}
            onChange={(e) => setFormData({ ...formData, sortOrder: e.target.value })}
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
              {editingCategory ? 'Update' : 'Create'} Category
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

AdminCategoriesPage.getLayout = function getLayout(page) {
  return <DashboardLayout isAdmin>{page}</DashboardLayout>;
};
