/**
 * User Dropdown Component
 */

import { useState, useEffect, useRef } from 'react';
import { User, Settings, LogOut, Wallet, Shield, ChevronDown } from 'lucide-react';
import useAuthStore from '../../store/authStore';
import { getProfileImageUrl } from '../../lib/utils';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useMaintenanceMode } from '../../hooks/useMaintenanceMode';
import toast from 'react-hot-toast';

export default function UserDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const [imageError, setImageError] = useState(false);
    const dropdownRef = useRef(null);
    const { user, logout } = useAuthStore();
    const router = useRouter();
    const { isMaintenanceMode } = useMaintenanceMode();

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        setImageError(false);
    }, [user?.profilePicture]);

    const handleToggle = () => setIsOpen(!isOpen);

    const handleLogout = async () => {
        // Prevent logout for admin users when maintenance mode is active
        if (user?.role === 'ADMIN' && isMaintenanceMode) {
            toast.error('Cannot logout during maintenance mode. Please disable maintenance mode first.');
            setIsOpen(false);
            return;
        }
        
        await logout();
        router.replace('/');
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Trigger Button */}
            <button
                onClick={handleToggle}
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all border border-transparent hover:border-gray-200 dark:hover:border-gray-600 group"
            >
                <div className="relative">
                    {/* Gradient ring same as profile page */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full opacity-75 group-hover:opacity-100 blur-[2px] transition duration-300" />
                    <div className="relative w-8 h-8 bg-gray-800 dark:bg-gray-900 rounded-full flex items-center justify-center ring-2 ring-white dark:ring-gray-800 overflow-hidden">
                        {user?.profilePicture && !imageError ? (
                            <img
                                src={getProfileImageUrl(user.profilePicture)}
                                alt="Profile"
                                className="w-full h-full object-cover"
                                onError={() => setImageError(true)}
                            />
                        ) : (
                            <span className="text-white text-xs font-bold">
                                {user?.username?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
                            </span>
                        )}
                    </div>
                </div>
                <div className="hidden lg:block text-left mr-2 ml-1">
                    <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight">
                        {user?.username || 'User'}
                    </p>
                    <p className="text-[10px] font-medium text-gray-500 dark:text-gray-400">
                        {user?.role === 'ADMIN' ? 'Administrator' : 'Standard User'}
                    </p>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                    {/* Header with User Info */}
                    <div className="p-5 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/20">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg overflow-hidden">
                                {user?.profilePicture && !imageError ? (
                                    <img
                                        src={getProfileImageUrl(user.profilePicture)}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                        onError={() => setImageError(true)}
                                    />
                                ) : (
                                    <span className="text-white text-xl font-bold">
                                        {user?.username?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
                                    </span>
                                )}
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                                    {user?.username || 'User'}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                    {user?.email}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2">
                        <Link
                            href="/profile"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 rounded-xl transition-all group"
                        >
                            <User className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            My Profile
                        </Link>
                        <Link
                            href="/wallet"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 rounded-xl transition-all group"
                        >
                            <Wallet className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            My Wallet
                        </Link>
                        {user?.role === 'ADMIN' && (
                            <Link
                                href="/admin"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-600 dark:hover:text-amber-400 rounded-xl transition-all group"
                            >
                                <Shield className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                Admin Panel
                            </Link>
                        )}
                        <Link
                            href="/profile" // Should usually be /settings if you have one
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 rounded-xl transition-all group"
                        >
                            <Settings className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                            Settings
                        </Link>
                    </div>

                    {/* Logout */}
                    <div className="p-2 border-t border-gray-100 dark:border-gray-700">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
                        >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
