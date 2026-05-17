/**
 * API Keys Page - Premium Design
 */

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { DashboardLayout } from '../components/layout';
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Button,
  Input,
  Badge,
  EmptyState,
  Modal,
} from '../components/ui';
import { useApiKeys, useCreateApiKey, useDeleteApiKey } from '../hooks/useApi';
import { formatDate, copyToClipboard } from '../lib/utils';
import { 
  Key, Plus, Copy, Trash2, Check, Code,
  Shield, AlertTriangle, Zap, Server, Terminal, Lock
} from 'lucide-react';
import toast from 'react-hot-toast';

const apiKeySchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
});

export default function ApiKeysPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [keyToDelete, setKeyToDelete] = useState(null);
  const [newKey, setNewKey] = useState(null);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: apiKeys, isLoading } = useApiKeys();
  const createApiKey = useCreateApiKey();
  const deleteApiKey = useDeleteApiKey();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(apiKeySchema),
  });

  const onSubmit = async (data) => {
    try {
      const result = await createApiKey.mutateAsync(data);
      setNewKey(result.data.key);
      reset();
    } catch (error) {
      // Error handled by mutation
    }
  };

  const handleCopy = async (key) => {
    const success = await copyToClipboard(key);
    if (success) {
      setCopied(true);
      toast.success('Copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDelete = (apiKey) => {
    setKeyToDelete(apiKey);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (keyToDelete) {
      await deleteApiKey.mutateAsync(keyToDelete.id);
      setShowDeleteModal(false);
      setKeyToDelete(null);
    }
  };

  return (
    <div className={`space-y-8 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      {/* Premium Hero Section */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-700/50 bg-gradient-to-br from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-800/90 dark:to-slate-900 shadow-xl dark:shadow-2xl">
        {/* Animated Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-gradient-to-br from-fuchsia-500/20 dark:from-fuchsia-500/30 to-purple-500/10 dark:to-purple-500/20 blur-3xl animate-pulse" />
          <div className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-gradient-to-br from-violet-500/10 dark:from-violet-500/20 to-indigo-500/5 dark:to-indigo-500/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiLz48cGF0aCBkPSJNNDAgMEgwdjQwaDQwVjB6TTEgMXYzOGgzOFYxSDF6IiBmaWxsPSJyZ2JhKDAsMCwwLDAuMDMpIi8+PC9nPjwvc3ZnPg==')] dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiLz48cGF0aCBkPSJNNDAgMEgwdjQwaDQwVjB6TTEgMXYzOGgzOFYxSDF6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIi8+PC9nPjwvc3ZnPg==')] opacity-50" />
        </div>
        
        <div className="relative px-8 py-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Left Content */}
            <div className="space-y-4">
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-fuchsia-600 dark:text-fuchsia-300 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fuchsia-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-fuchsia-400"></span>
                </span>
                Developer Tools
              </div>
              
              {/* Title Section */}
              <div className="flex items-center gap-5">
                <div className="relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-purple-600 shadow-lg shadow-fuchsia-500/30">
                    <Terminal className="h-8 w-8 text-slate-900 dark:text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-violet-500 ring-4 ring-white dark:ring-slate-900">
                    <Code className="h-3 w-3 text-slate-900 dark:text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-500 dark:from-white dark:via-white dark:to-slate-400 bg-clip-text text-transparent">
                    API Keys
                  </h1>
                  <p className="mt-1 text-base text-slate-500 dark:text-slate-400 dark:text-slate-400">
                    Manage your API keys for external integrations
                  </p>
                </div>
              </div>
            </div>
            
            {/* Right - Action Button */}
            <div>
              <Button 
                onClick={() => setShowCreateModal(true)}
                className="bg-gradient-to-r from-fuchsia-500 to-purple-500 hover:from-fuchsia-400 hover:to-purple-400 border-none shadow-lg shadow-fuchsia-500/25 px-6 py-3"
              >
                <Plus className="w-5 h-5 mr-2" />
                Generate Key
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* API Documentation - Premium Card */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 backdrop-blur-sm overflow-hidden">
        <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-700/50 px-6 py-5 bg-gradient-to-r from-slate-50 dark:from-slate-800/50 to-white dark:to-slate-800/30">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20 ring-1 ring-cyan-500/30">
            <Server className="h-5 w-5 text-cyan-500 dark:text-cyan-400" />
          </div>
          <div>
            <h2 className="font-semibold text-slate-800 dark:text-white flex items-center gap-2">
              <Code className="w-5 h-5" />
              API Documentation
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-400">Integration guide and endpoints</p>
          </div>
        </div>
        <CardBody>
          <div className="space-y-5 text-sm">
            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-5 border border-slate-200 dark:border-slate-700/50">
              <p className="text-slate-600 dark:text-slate-300 mb-3">
                Use your API key to place orders programmatically. Send POST requests to:
              </p>
              <code className="block p-4 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-200 font-mono text-sm border border-slate-200 dark:border-slate-700">
                POST {process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/external/v1
              </code>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50 dark:bg-slate-900/30 rounded-xl p-4 border border-slate-200 dark:border-slate-700/50">
                <h3 className="font-medium text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                  Available Actions
                </h3>
                <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> <code className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-xs">balance</code> - Get account balance</li>
                  <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> <code className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-xs">services</code> - Get available services</li>
                  <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> <code className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-xs">add</code> - Create new order</li>
                  <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> <code className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-xs">status</code> - Check order status</li>
                </ul>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-900/30 rounded-xl p-4 border border-slate-200 dark:border-slate-700/50">
                <h3 className="font-medium text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-red-500 dark:text-red-400" />
                  Security Notice
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                    <p className="text-slate-600 dark:text-slate-300 text-sm">Keep your API key secret. Anyone with your key can place orders.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Lock className="w-4 h-4 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <p className="text-slate-600 dark:text-slate-300 text-sm">Keys can be revoked at any time for security.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </div>

      {/* API Keys List - Premium Table */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 backdrop-blur-sm overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700/50 px-6 py-5 bg-gradient-to-r from-slate-50 dark:from-slate-800/50 to-white dark:to-slate-800/30">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20 ring-1 ring-indigo-500/30">
              <Key className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
            </div>
            <div>
              <h2 className="font-semibold text-slate-800 dark:text-white">Your API Keys</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-400">{apiKeys?.length || 0} key{apiKeys?.length !== 1 ? 's' : ''} generated</p>
            </div>
          </div>
        </div>
        <CardBody className="p-0">
          {!apiKeys || apiKeys.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-700/50 mb-5">
                <Key className="h-10 w-10 text-slate-500 dark:text-slate-400 dark:text-slate-500" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">No API keys</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-400 mb-6 max-w-sm">
                Generate an API key to start using our programmatic interface.
              </p>
              <Button 
                onClick={() => setShowCreateModal(true)}
                className="bg-indigo-500 hover:bg-indigo-400 border-none"
              >
                <Plus className="w-4 h-4 mr-2" />
                Generate Key
              </Button>
            </div>
          ) : (
            <div className="divide-y divide-slate-200 dark:divide-slate-700/50">
              {apiKeys.map((apiKey) => (
                <div
                  key={apiKey.id}
                  className="p-5 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-all duration-200"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-slate-800 dark:text-white">{apiKey.name}</h3>
                        <Badge variant={apiKey.isActive ? 'success' : 'gray'}>
                          {apiKey.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 mb-2">
                        <code className="text-sm text-slate-700 dark:text-slate-200 font-mono bg-slate-100 dark:bg-slate-900/50 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700/50">
                          {apiKey.key}
                        </code>
                        <div className="flex items-center gap-1">
                          <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30">
                            <Lock className="w-3 h-3 text-amber-500 dark:text-amber-400" />
                            <span className="text-xs text-amber-500 dark:text-amber-400">Hidden</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                        <span>Created {formatDate(apiKey.createdAt)}</span>
                        {apiKey.lastUsedAt && (
                          <span>· Last used {formatDate(apiKey.lastUsedAt)}</span>
                        )}
                        {apiKey.requestCount > 0 && (
                          <span>· {apiKey.requestCount} requests</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(apiKey)}
                        className="bg-rose-500/20 text-rose-400 border-rose-500/30 hover:bg-rose-500/30"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardBody>
      </div>

      {/* Create Modal - Premium Design */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          setNewKey(null);
          reset();
        }}
        title=""
        size="md"
      >
        <div className="space-y-6">
          {newKey ? (
            /* Success State */
            <>
              <div className="text-center pb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 mx-auto mb-4 shadow-lg shadow-emerald-500/30">
                  <Check className="h-8 w-8 text-slate-900 dark:text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">API Key Generated!</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Copy your key now - it won&apos;t be shown again</p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-5 border border-slate-200 dark:border-slate-700/50">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="w-5 h-5 text-amber-400" />
                  <span className="text-sm font-medium text-amber-400">Important Security Notice</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Store this key securely. Anyone with access to it can place orders on your account.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <code className="flex-1 p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-mono break-all text-slate-700 dark:text-slate-200">
                  {newKey}
                </code>
                <Button
                  variant={copied ? 'success' : 'outline'}
                  size="sm"
                  onClick={() => handleCopy(newKey)}
                  className={copied ? 'bg-emerald-500 border-emerald-500' : 'border-slate-600 hover:bg-slate-700'}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-slate-700/50">
                <Button
                  onClick={() => {
                    setShowCreateModal(false);
                    setNewKey(null);
                  }}
                  className="bg-slate-100 dark:bg-slate-700 hover:bg-slate-600 border-none"
                >
                  Done
                </Button>
              </div>
            </>
          ) : (
            /* Form State */
            <>
              <div className="text-center pb-4 border-b border-slate-200 dark:border-slate-700/50">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 mx-auto mb-4 shadow-lg shadow-indigo-500/30">
                  <Key className="h-7 w-7 text-slate-900 dark:text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Generate API Key</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Create a new key for programmatic access</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <Input
                  label="Key Name"
                  placeholder="e.g., Production API Key"
                  {...register('name')}
                  error={errors.name?.message}
                  className="bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700"
                />
                
                <div className="flex gap-3 justify-end pt-4 border-t border-slate-200 dark:border-slate-700/50">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowCreateModal(false)}
                    className="border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    isLoading={isSubmitting || createApiKey.isPending}
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 border-none shadow-lg shadow-indigo-500/25"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Generate Key
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setKeyToDelete(null);
        }}
        title=""
        size="sm"
      >
        <div className="space-y-6">
          <div className="text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 mx-auto mb-4 shadow-lg shadow-rose-500/30">
              <Trash2 className="h-8 w-8 text-slate-900 dark:text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Delete API Key?</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Are you sure you want to delete this API key?
            </p>
          </div>

          {keyToDelete && (
            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700/50">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white dark:bg-slate-800 ring-1 ring-slate-700">
                  <Key className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                </div>
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">{keyToDelete.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    {keyToDelete.key}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-rose-500/10 rounded-xl p-4 border border-rose-500/30">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-rose-400">Warning</p>
                <p className="text-sm text-rose-300/80 mt-1">
                  This action cannot be undone. Any applications using this key will stop working.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t border-slate-200 dark:border-slate-700/50">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowDeleteModal(false);
                setKeyToDelete(null);
              }}
              className="border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              Cancel
            </Button>
            <Button
              onClick={confirmDelete}
              isLoading={deleteApiKey.isPending}
              className="bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-400 hover:to-red-500 border-none shadow-lg shadow-rose-500/25"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Key
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

ApiKeysPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
