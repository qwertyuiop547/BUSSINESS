/**
 * Notification Dropdown Component
 * Premium Dark Theme Design
 */

import { useState, useEffect, useRef } from 'react';
import { 
    Bell, 
    Check, 
    Trash2, 
    ExternalLink, 
    X, 
    CalendarClock,
    Package,
    Wallet,
    MessageSquare,
    Megaphone,
    Sparkles,
    CheckCircle,
    Clock,
    ArrowRight,
    Activity,
} from 'lucide-react';
import useNotificationStore from '../../store/notificationStore';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import { Modal, Button } from '../ui';

export default function NotificationDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [selected, setSelected] = useState(null);
    const dropdownRef = useRef(null);

    const {
        notifications,
        unreadCount,
        fetchNotifications,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        isLoading
    } = useNotificationStore();

    useEffect(() => {
        fetchNotifications();

        // Refresh notifications every 60 seconds
        const interval = setInterval(() => {
            fetchNotifications();
        }, 60000);

        return () => clearInterval(interval);
    }, [fetchNotifications]);

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

    const handleToggle = () => setIsOpen(!isOpen);

    const openDetails = (notification) => {
        setSelected(notification);
        setShowDetails(true);
        if (!notification.isRead) {
            // Mark as read when user views details
            markAsRead(notification.id);
        }
    };

    const closeDetails = () => {
        setShowDetails(false);
        setSelected(null);
    };

    const getTypeStyles = (type) => {
        switch (type) {
            case 'ORDER_STATUS':
                return {
                    gradient: 'from-emerald-500 to-cyan-500',
                    bgColor: 'bg-emerald-500/20',
                    textColor: 'text-emerald-400',
                    ringColor: 'ring-emerald-500/30',
                    icon: Package,
                    label: 'Order Update'
                };
            case 'WALLET_TOPUP':
                return {
                    gradient: 'from-blue-500 to-violet-500',
                    bgColor: 'bg-blue-500/20',
                    textColor: 'text-blue-400',
                    ringColor: 'ring-blue-500/30',
                    icon: Wallet,
                    label: 'Wallet'
                };
            case 'TICKET_REPLY':
                return {
                    gradient: 'from-purple-500 to-pink-500',
                    bgColor: 'bg-purple-500/20',
                    textColor: 'text-purple-400',
                    ringColor: 'ring-purple-500/30',
                    icon: MessageSquare,
                    label: 'Support'
                };
            case 'SYSTEM_ANNOUNCEMENT':
                return {
                    gradient: 'from-amber-500 to-orange-500',
                    bgColor: 'bg-amber-500/20',
                    textColor: 'text-amber-400',
                    ringColor: 'ring-amber-500/30',
                    icon: Megaphone,
                    label: 'Announcement'
                };
            default:
                return {
                    gradient: 'from-slate-400 to-slate-500',
                    bgColor: 'bg-slate-500/20',
                    textColor: 'text-slate-400',
                    ringColor: 'ring-slate-500/30',
                    icon: Bell,
                    label: 'Notification'
                };
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Premium Trigger Button */}
            <button
                onClick={handleToggle}
                className="relative p-2.5 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-200 group"
                title="Notifications"
            >
                <Bell className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-rose-600 text-[10px] font-bold text-white shadow-lg shadow-red-500/30">
                            {unreadCount > 9 ? '9+' : unreadCount}
                        </span>
                    </span>
                )}
            </button>

            {/* Premium Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-3 w-[380px] sm:w-[440px] rounded-2xl border border-slate-700/50 bg-slate-900/95 backdrop-blur-xl shadow-2xl shadow-black/50 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                    {/* Premium Header with Gradient */}
                    <div className="relative overflow-hidden">
                        {/* Animated Background */}
                        <div className="absolute inset-0">
                            <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-violet-500/40 to-fuchsia-500/20 blur-3xl animate-pulse" />
                            <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-500/20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                        </div>
                        
                        <div className="relative px-5 py-5 border-b border-slate-700/50">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 shadow-lg shadow-violet-500/30">
                                        <Bell className="h-5 w-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-lg">Notifications</h3>
                                        <p className="text-slate-400 text-xs">
                                            {unreadCount > 0 ? (
                                                <span className="flex items-center gap-1.5">
                                                    <span className="relative flex h-2 w-2">
                                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                                                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
                                                    </span>
                                                    {unreadCount} unread alert{unreadCount !== 1 ? 's' : ''}
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1.5">
                                                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                                                    All caught up
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {unreadCount > 0 && (
                                        <button
                                            onClick={() => markAllAsRead()}
                                            className="px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white text-xs font-medium rounded-lg backdrop-blur-sm transition-all flex items-center gap-1.5"
                                        >
                                            <Check className="w-3.5 h-3.5" />
                                            Mark all read
                                        </button>
                                    )}
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-all"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Notification List */}
                    <div className="max-h-[420px] overflow-y-auto custom-scrollbar">
                        {isLoading && notifications.length === 0 ? (
                            <div className="p-12 text-center">
                                <div className="w-12 h-12 border-3 border-violet-500/30 border-t-violet-500 rounded-full animate-spin mx-auto mb-4"></div>
                                <p className="text-slate-400 font-medium text-sm">Loading notifications...</p>
                            </div>
                        ) : notifications.length === 0 ? (
                            <div className="p-12 text-center">
                                <div className="relative mx-auto w-20 h-20 mb-5">
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-slate-700/50 to-slate-800/50 border border-slate-600/50"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Bell className="w-9 h-9 text-slate-500" />
                                    </div>
                                    <div className="absolute -top-1 -right-1 w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                                        <Check className="w-3.5 h-3.5 text-white" />
                                    </div>
                                </div>
                                <h4 className="text-lg font-bold text-white mb-2">All caught up!</h4>
                                <p className="text-slate-400 text-sm max-w-[220px] mx-auto">
                                    No new notifications. We'll notify you when something happens.
                                </p>
                            </div>
                        ) : (
                            <div className="divide-y divide-slate-700/30">
                                {notifications.map((notification) => {
                                    const styles = getTypeStyles(notification.type);
                                    const IconComponent = styles.icon;
                                    return (
                                        <div
                                            key={notification.id}
                                            onClick={() => openDetails(notification)}
                                            className={`group relative p-4 transition-all duration-200 cursor-pointer hover:bg-slate-800/50 ${
                                                !notification.isRead ? 'bg-slate-800/30' : ''
                                            }`}
                                        >
                                            {/* Unread Indicator */}
                                            {!notification.isRead && (
                                                <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${styles.gradient}`} />
                                            )}

                                            <div className="flex gap-3.5">
                                                {/* Type Icon */}
                                                <div className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center ${styles.bgColor} ring-1 ${styles.ringColor} transition-transform duration-200 group-hover:scale-105`}>
                                                    <IconComponent className={`w-5 h-5 ${styles.textColor}`} />
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between gap-2 mb-1">
                                                        <div className="min-w-0">
                                                            <p className={`text-sm leading-tight truncate ${
                                                                !notification.isRead 
                                                                    ? 'font-bold text-white' 
                                                                    : 'font-semibold text-slate-300'
                                                            }`}>
                                                                {notification.title}
                                                            </p>
                                                        </div>
                                                        <span className="flex-shrink-0 text-[10px] font-medium text-slate-500 bg-slate-800/80 px-2 py-0.5 rounded-md">
                                                            {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: false })}
                                                        </span>
                                                    </div>
                                                    
                                                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
                                                        {notification.message}
                                                    </p>

                                                    {/* Action Buttons */}
                                                    <div className="flex items-center gap-3">
                                                        {notification.link && (
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    openDetails(notification);
                                                                }}
                                                                className={`px-2.5 py-1 ${styles.bgColor} hover:opacity-80 ${styles.textColor} text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ring-1 ${styles.ringColor}`}
                                                            >
                                                                View Details
                                                                <ExternalLink className="w-3 h-3" />
                                                            </button>
                                                        )}
                                                        {!notification.isRead && (
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    markAsRead(notification.id);
                                                                }}
                                                                className="text-slate-500 hover:text-slate-300 text-xs font-medium transition-colors flex items-center gap-1"
                                                            >
                                                                <Check className="w-3.5 h-3.5" />
                                                                Dismiss
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Delete Button on Hover */}
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        deleteNotification(notification.id);
                                                    }}
                                                    className="flex-shrink-0 p-2 rounded-lg opacity-0 group-hover:opacity-100 bg-slate-800/80 hover:bg-red-500/20 text-slate-500 hover:text-red-400 border border-slate-700/50 hover:border-red-500/30 transition-all"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {notifications.length > 0 && (
                        <div className="p-4 border-t border-slate-700/50 bg-slate-900/50">
                            <button className="w-full py-2.5 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 hover:border-slate-600/50 text-slate-400 hover:text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2">
                                <Activity className="w-4 h-4" />
                                See all activities
                                <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Premium Details Modal */}
            <Modal
                isOpen={showDetails}
                onClose={closeDetails}
                title=""
                size="md"
            >
                {selected ? (
                    <div className="space-y-5">
                        {/* Modal Header */}
                        <div className="text-center pb-4 border-b border-slate-700/50">
                            {(() => {
                                const styles = getTypeStyles(selected.type);
                                const IconComponent = styles.icon;
                                return (
                                    <>
                                        <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl ${styles.bgColor} ring-2 ${styles.ringColor} mb-4`}>
                                            <IconComponent className={`h-8 w-8 ${styles.textColor}`} />
                                        </div>
                                        <div className="flex items-center justify-center gap-2 mb-2">
                                            <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${styles.bgColor} ${styles.textColor}`}>
                                                {styles.label}
                                            </span>
                                            {!selected.isRead && (
                                                <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-red-500/20 text-red-400 ring-1 ring-red-500/30">
                                                    Unread
                                                </span>
                                            )}
                                        </div>
                                    </>
                                );
                            })()}
                            <h3 className="text-xl font-bold text-white">
                                {selected.title}
                            </h3>
                        </div>

                        {/* Message Content */}
                        <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                            <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-3">
                                <Clock className="w-3.5 h-3.5" />
                                {formatDistanceToNow(new Date(selected.createdAt), { addSuffix: true })}
                            </div>
                            <p className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
                                {selected.message}
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-2 pt-2">
                            {selected.link && (
                                <Link href={selected.link} onClick={() => { setIsOpen(false); closeDetails(); }} className="flex-1">
                                    <Button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white shadow-lg shadow-violet-500/30 border-0">
                                        Go to page <ExternalLink className="w-4 h-4" />
                                    </Button>
                                </Link>
                            )}
                            {!selected.isRead && (
                                <Button
                                    variant="ghost"
                                    className="flex-1 text-slate-300 border border-slate-600 hover:bg-slate-700/50"
                                    onClick={() => markAsRead(selected.id)}
                                >
                                    <Check className="w-4 h-4 mr-2" />
                                    Mark as read
                                </Button>
                            )}
                            <Button
                                variant="ghost"
                                className="flex-1 text-red-400 border border-red-500/30 hover:bg-red-500/20"
                                onClick={() => {
                                    deleteNotification(selected.id);
                                    closeDetails();
                                }}
                            >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="text-sm text-slate-400 text-center py-8">No notification selected.</div>
                )}
            </Modal>
        </div>
    );
}
