/**
 * Header Component
 */

import Link from 'next/link';
import { Menu, Search, DollarSign } from 'lucide-react';
import { ThemeToggle, CurrencyToggle } from '../ui';
import NotificationDropdown from './NotificationDropdown';
import UserDropdown from './UserDropdown';
import useAuthStore from '../../store/authStore';
import useCurrencyStore from '../../store/currencyStore';

export default function Header({ onMenuClick }) {
  const { user } = useAuthStore();
  const { formatAmount } = useCurrencyStore();

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Search (desktop) */}
          <div className="hidden md:flex items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search services..."
                className="w-64 pl-10 pr-4 py-2 text-sm bg-gray-100 dark:bg-gray-700/50 border-0 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Balance */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-primary-500/5 dark:bg-primary-500/10 border border-primary-500/10 dark:border-primary-500/20 rounded-xl shadow-sm">
            <div className="w-6 h-6 bg-primary-500/10 rounded-lg flex items-center justify-center">
              <span className="text-primary-600 dark:text-primary-400 text-xs font-bold">₱</span>
            </div>
            <div className="flex flex-col -space-y-1">
              <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Balance</span>
              <span className="text-sm font-extrabold text-primary-600 dark:text-primary-400">
                {formatAmount(user?.balance || 0)}
              </span>
            </div>
          </div>

          {/* Currency Toggle */}
          <CurrencyToggle />

          {/* Dark Mode Toggle */}
          <ThemeToggle />

          {/* Notifications */}
          <NotificationDropdown />

          {/* User Profile Dropdown */}
          <UserDropdown />
        </div>
      </div>
    </header>
  );
}

