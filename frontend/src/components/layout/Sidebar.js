/**
 * Sidebar Component
 */

import Link from 'next/link';
import { useRouter } from 'next/router';
import { cn, getProfileImageUrl } from '../../lib/utils';
import useAuthStore from '../../store/authStore';
import useCurrencyStore from '../../store/currencyStore';
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Wallet,
  MessageSquare,
  Key,
  Settings,
  Users,
  FileText,
  Server,
  LogOut,
  X,
  ChevronDown,
  Lightbulb,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useMaintenanceMode } from '../../hooks/useMaintenanceMode';
import toast from 'react-hot-toast';

const userNavigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Services', href: '/orders/new', icon: ShoppingCart },
  { name: 'My Orders', href: '/orders', icon: Package },
  { name: 'Add Funds', href: '/wallet', icon: Wallet },
  { name: 'Support', href: '/tickets', icon: MessageSquare },
  { name: 'Suggestions', href: '/suggestions', icon: Lightbulb },
  { name: 'API', href: '/api-keys', icon: Key },
  { name: 'Profile', href: '/profile', icon: Users },
];

const adminNavigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  {
    name: 'Orders',
    icon: Package,
    children: [
      { name: 'All Orders', href: '/admin/orders' },
      { name: 'Pending', href: '/admin/orders?status=PENDING' },
    ],
  },
  {
    name: 'Users',
    icon: Users,
    children: [
      { name: 'All Users', href: '/admin/users' },
      { name: 'Top-ups', href: '/admin/topups' },
    ],
  },
  {
    name: 'Services',
    icon: Server,
    children: [
      { name: 'All Services', href: '/admin/services' },
      { name: 'Categories', href: '/admin/categories' },
      { name: 'Providers', href: '/admin/providers' },
    ],
  },
  { name: 'Tickets', href: '/admin/tickets', icon: MessageSquare },
  { name: 'Suggestions', href: '/admin/suggestions', icon: Lightbulb },
  { name: 'Logs', href: '/admin/logs', icon: FileText },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

function NavItem({ item, isActive }) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children?.length > 0;

  if (hasChildren) {
    return (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors',
            'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
          )}
        >
          <span className="flex items-center gap-3">
            <item.icon className="w-5 h-5" />
            {item.name}
          </span>
          <ChevronDown
            className={cn('w-4 h-4 transition-transform', isOpen && 'rotate-180')}
          />
        </button>
        {isOpen && (
          <div className="ml-8 mt-1 space-y-1">
            {item.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                className="block px-3 py-2 text-sm rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {child.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      className={cn(
        'flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors',
        isActive
          ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
      )}
    >
      <item.icon className="w-5 h-5" />
      {item.name}
    </Link>
  );
}

export default function Sidebar({ isOpen, onClose, isAdmin = false }) {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { formatAmount } = useCurrencyStore();
  const [imageError, setImageError] = useState(false);
  const navigation = isAdmin ? adminNavigation : userNavigation;
  const balanceValue = Number(user?.balance) || 0;
  const { isMaintenanceMode } = useMaintenanceMode();

  useEffect(() => {
    setImageError(false);
  }, [user?.profilePicture]);

  const handleLogout = async () => {
    // Prevent logout for admin users when maintenance mode is active
    if (user?.role === 'ADMIN' && isMaintenanceMode) {
      toast.error('Cannot logout during maintenance mode. Please disable maintenance mode first.');
      onClose();
      return;
    }
    
    await logout();
    router.push('/login');
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-transform duration-300 lg:relative lg:translate-x-0 lg:z-auto lg:shrink-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-4 h-16 border-b border-gray-200 dark:border-gray-700">
            <Link href={isAdmin ? '/admin' : '/dashboard'} className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">S</span>
              </div>
              <span className="font-bold text-lg">SMB Panel</span>
            </Link>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User info */}
          <div className="px-4 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-indigo-600 rounded-full flex items-center justify-center overflow-hidden shadow-lg ring-2 ring-primary-100 dark:ring-gray-700">
                {user?.profilePicture && !imageError ? (
                  <img
                    src={getProfileImageUrl(user.profilePicture)}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <span className="text-white text-lg font-bold">
                    {user?.username?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate">{user?.username || 'User'}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-center justify-between px-3 py-2 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Balance</span>
              <span className="text-sm font-bold text-primary-600 dark:text-primary-400">
                {formatAmount(balanceValue)}
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => (
              <NavItem
                key={item.name}
                item={item}
                isActive={router.pathname === item.href}
              />
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            {isAdmin && (
              <Link
                href="/dashboard"
                className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 mb-2"
              >
                <LayoutDashboard className="w-5 h-5" />
                User Panel
              </Link>
            )}
            {user?.role === 'ADMIN' && !isAdmin && (
              <Link
                href="/admin"
                className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 mb-2"
              >
                <Settings className="w-5 h-5" />
                Admin Panel
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
