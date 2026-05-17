/**
 * Profile Page
 * 
 * Premium dark theme user profile view and edit page.
 */

import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { DashboardLayout } from '../components/layout';
import { Button, Input, Badge, LoadingScreen, Modal } from '../components/ui';
import {
    User, Mail, Calendar, Shield, Edit2, Save, X, Key,
    Wallet, ShoppingBag, MessageSquare, Code2,
    ChevronRight, Lock, Eye, EyeOff, Check, Camera, Trash2, Upload, AlertTriangle,
    Sparkles, Target
} from 'lucide-react';
import api from '../lib/api';
import { formatCurrency, formatDate, getProfileImageUrl } from '../lib/utils';
import useAuthStore from '../store/authStore';
import { useDeleteAccount } from '../hooks/useApi';

// Prevent toast spam for rate-limit errors
let lastRateLimitToastAt = 0;
function toastRateLimitedOnce(message = 'Too many requests, please try again later.') {
    const now = Date.now();
    if (now - lastRateLimitToastAt < 8000) return; // 8s cooldown
    lastRateLimitToastAt = now;
    toast.error(message);
}

export default function ProfilePage() {
    const [isEditing, setIsEditing] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [profilePictureFile, setProfilePictureFile] = useState(null);
    const [profilePicturePreview, setProfilePicturePreview] = useState(null);
    const [profileImageError, setProfileImageError] = useState(false);
    const [formData, setFormData] = useState({ username: '' });
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const usernamePattern = /^[a-zA-Z0-9._ -]+$/;
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState('');
    const [showImageModal, setShowImageModal] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const router = useRouter();

    const queryClient = useQueryClient();
    const { updateUser, logout } = useAuthStore();

    // Fetch profile
    const { data: profile, isLoading } = useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            const response = await api.get('/v1/users/profile');
            return response.data.data;
        },
    });

    // Update profile mutation
    const updateProfile = useMutation({
        mutationFn: async (data) => {
            const response = await api.patch('/v1/users/profile', data);
            return response.data.data;
        },
        retry: false, // Don't retry on failure to avoid multiple requests
        onSuccess: (data) => {
            // Update query cache directly instead of invalidating to avoid refetch
            queryClient.setQueryData(['profile'], (old) => {
                return { ...old, ...data };
            });
            updateUser(data);
            // Sync formData with updated profile
            setFormData({ username: data.username || '' });
            toast.success('Profile updated successfully');
            setIsEditing(false);
        },
        onError: (error) => {
            if (error?.response?.status === 429) {
                toastRateLimitedOnce(error.response?.data?.message);
                return;
            }
            toast.error(error.response?.data?.message || 'Failed to update profile');
        },
    });

    // Change password mutation
    const changePassword = useMutation({
        mutationFn: async (data) => {
            await api.patch('/v1/users/password', data);
        },
        onSuccess: () => {
            toast.success('Password changed successfully');
            setIsChangingPassword(false);
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to change password');
        },
    });

    // Upload profile picture mutation
    const uploadProfilePicture = useMutation({
        mutationFn: async (file) => {
            const formData = new FormData();
            formData.append('profilePicture', file);
            const response = await api.post('/v1/users/profile/picture', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return response.data.data;
        },
        retry: false, // Don't retry on failure to avoid multiple requests
        onSuccess: (data) => {
            toast.success('Profile picture updated successfully');
            // Clear preview first
            setProfilePictureFile(null);
            setProfilePicturePreview(null);
            // Update auth store with new data immediately
            updateUser(data);
            // Merge with existing profile data to preserve _count and other fields
            queryClient.setQueryData(['profile'], (old) => {
                return { ...old, ...data };
            });
            // Reset image error state AFTER cache update to allow new image to load
            setProfileImageError(false);
        },
        onError: (error) => {
            if (error?.response?.status === 429) {
                toastRateLimitedOnce(error.response?.data?.message);
                return;
            }
            toast.error(error.response?.data?.message || 'Failed to upload profile picture');
        },
    });

    // Delete account mutation
    const deleteAccount = useDeleteAccount();

    // Handle account deletion
    const handleDeleteAccount = async () => {
        if (confirmDelete !== 'DELETE') {
            toast.error('Please type DELETE to confirm');
            return;
        }

        try {
            await deleteAccount.mutateAsync();
            // Logout and redirect
            logout();
            router.push('/login');
        } catch (error) {
            // Error already handled by mutation
        }
    };

    // Delete profile picture mutation
    const deleteProfilePicture = useMutation({
        mutationFn: async () => {
            const response = await api.delete('/v1/users/profile/picture');
            return response.data.data;
        },
        onSuccess: (data) => {
            toast.success('Profile picture removed');
            // Reset image error state
            setProfileImageError(false);
            // Clear any preview state
            setProfilePictureFile(null);
            setProfilePicturePreview(null);
            // Update auth store
            updateUser(data);
            // Update query cache immediately
            queryClient.setQueryData(['profile'], data);
            // Force refetch profile data immediately
            queryClient.invalidateQueries(['profile']);
            queryClient.refetchQueries(['profile']);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to delete profile picture');
        },
    });

    const handleEditProfile = () => {
        // Ensure we have the latest profile data
        const currentUsername = profile?.username || '';
        setFormData({ username: currentUsername });
        setIsEditing(true);
    };

    const handleSaveProfile = () => {
        // Prevent multiple simultaneous submissions
        if (updateProfile.isPending) {
            return;
        }

        const trimmedUsername = formData.username.trim();
        if (!trimmedUsername) {
            toast.error('Username is required');
            return;
        }
        if (!usernamePattern.test(trimmedUsername)) {
            toast.error('Username can only use letters, numbers, spaces, dots, dashes, and underscores');
            return;
        }

        // Check if username actually changed
        if (trimmedUsername === profile?.username) {
            // react-hot-toast doesn't support toast.info in some versions
            toast('No changes to save');
            setIsEditing(false);
            return;
        }

        updateProfile.mutate({ username: trimmedUsername });
    };

    const handleProfilePictureChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                toast.error('Please select an image file');
                return;
            }
            // Validate file size (15MB)
            if (file.size > 15 * 1024 * 1024) {
                toast.error('Image size must be less than 15MB');
                return;
            }
            setProfileImageError(false);
            setProfilePictureFile(file);
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicturePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUploadProfilePicture = () => {
        // Prevent multiple simultaneous uploads
        if (uploadProfilePicture.isPending) {
            return;
        }

        if (!profilePictureFile) {
            toast.error('Please select an image file first');
            return;
        }

        uploadProfilePicture.mutate(profilePictureFile);
    };

    const handleDeleteProfilePicture = () => {
        if (confirm('Are you sure you want to remove your profile picture?')) {
            deleteProfilePicture.mutate();
        }
    };

    const handleChangePassword = () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        if (passwordData.newPassword.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }
        changePassword.mutate({
            currentPassword: passwordData.currentPassword,
            newPassword: passwordData.newPassword,
        });
    };

    // Initialize formData when profile first loads
    useEffect(() => {
        if (profile && profile.username !== undefined && (!formData.username || (formData.username === '' && profile.username !== ''))) {
            setFormData({ username: profile.username || '' });
        }
    }, [profile]); // Initialize when profile data is available

    useEffect(() => {
        // Reset image error when profile picture changes - CRITICAL for new uploads
        if (profile?.profilePicture) {
            // Profile picture exists, always reset error to allow loading
            setProfileImageError(false);
        } else if (profile?.profilePicture === null || profile?.profilePicture === undefined) {
            // Profile picture was deleted, reset error state
            setProfileImageError(false);
        }
    }, [profile?.profilePicture]); // Only depend on profilePicture, not updatedAt

    if (isLoading) {
        return <LoadingScreen />;
    }

    const stats = [
        {
            label: 'Balance',
            value: formatCurrency(profile?.balance || 0),
            icon: Wallet,
            gradient: 'from-emerald-500 to-cyan-500',
            bgGradient: 'from-emerald-500/10 to-cyan-500/10',
            iconBg: 'bg-emerald-500/20',
            iconColor: 'text-emerald-400',
            ring: 'ring-emerald-500/30',
        },
        {
            label: 'Total Orders',
            value: profile?._count?.orders || 0,
            icon: ShoppingBag,
            gradient: 'from-violet-500 to-purple-500',
            bgGradient: 'from-violet-500/10 to-purple-500/10',
            iconBg: 'bg-violet-500/20',
            iconColor: 'text-violet-400',
            ring: 'ring-violet-500/30',
        },
        {
            label: 'Tickets',
            value: profile?._count?.tickets || 0,
            icon: MessageSquare,
            gradient: 'from-fuchsia-500 to-pink-500',
            bgGradient: 'from-fuchsia-500/10 to-pink-500/10',
            iconBg: 'bg-fuchsia-500/20',
            iconColor: 'text-fuchsia-400',
            ring: 'ring-fuchsia-500/30',
        },
        {
            label: 'API Keys',
            value: profile?._count?.apiKeys || 0,
            icon: Code2,
            gradient: 'from-amber-500 to-orange-500',
            bgGradient: 'from-amber-500/10 to-orange-500/10',
            iconBg: 'bg-amber-500/20',
            iconColor: 'text-amber-400',
            ring: 'ring-amber-500/30',
        },
    ];

    return (
        <div className="space-y-6">
            {/* Premium Hero Header */}
            <div className="relative overflow-visible rounded-3xl border border-slate-200 dark:border-slate-700/50 bg-gradient-to-br from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-800/90 dark:to-slate-900 shadow-xl dark:shadow-2xl p-8 pb-14 mb-4">
                {/* Animated Background Effects */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl">
                    <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-gradient-to-br from-cyan-500/20 dark:from-cyan-500/30 to-blue-500/10 dark:to-blue-500/20 blur-3xl animate-pulse" />
                    <div className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-gradient-to-br from-violet-500/10 dark:from-violet-500/20 to-fuchsia-500/5 dark:to-fuchsia-500/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-gradient-to-br from-amber-500/5 dark:from-amber-500/10 to-orange-500/5 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
                    {/* Grid Pattern */}
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiLz48cGF0aCBkPSJNNDAgMEgwdjQwaDQwVjB6TTEgMXYzOGgzOFYxSDF6IiBmaWxsPSJyZ2JhKDAsMCwwLDAuMDMpIi8+PC9nPjwvc3ZnPg==')] dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiLz48cGF0aCBkPSJNNDAgMEgwdjQwaDQwVjB6TTEgMXYzOGgzOFYxSDF6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIi8+PC9nPjwvc3ZnPg==')] opacity-50" />
                </div>

                <div className="relative flex flex-col md:flex-row items-center gap-6">
                    <div className="flex flex-col items-center md:items-start">
                        {/* Avatar with gradient ring and upload */}
                        <div className="relative group" style={{ isolation: 'isolate' }}>
                            {/* Gradient ring background - z-0 */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500 rounded-full opacity-75 blur group-hover:opacity-100 transition duration-300" style={{ zIndex: 0 }} />

                            {/* Avatar container with image */}
                            <div
                                className="relative w-28 h-28 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-full flex items-center justify-center ring-4 ring-slate-200 dark:ring-slate-700/50 overflow-hidden cursor-pointer"
                                onClick={(e) => {
                                    if (profile?.profilePicture && !profilePicturePreview && !profileImageError) {
                                        e.stopPropagation();
                                        const fullUrl = getProfileImageUrl(profile.profilePicture);
                                        setImageUrl(fullUrl);
                                        setShowImageModal(true);
                                    }
                                }}
                            >
                                {profilePicturePreview ? (
                                    <img src={profilePicturePreview} alt="Profile Preview" className="w-full h-full object-cover pointer-events-none" />
                                ) : profile?.profilePicture && !profileImageError ? (
                                    <img
                                        key={profile.profilePicture}
                                        src={`${getProfileImageUrl(profile.profilePicture)}?t=${profile.updatedAt ? new Date(profile.updatedAt).getTime() : Date.now()}`}
                                        alt="Profile"
                                        className="w-full h-full object-cover pointer-events-none"
                                        title="Click to view full size"
                                        onError={() => {
                                            setProfileImageError(true);
                                        }}
                                        onLoad={() => {
                                            setProfileImageError(false);
                                        }}
                                    />
                                ) : (
                                    <span className="text-slate-900 dark:text-white text-4xl font-bold">
                                        {profile?.username?.[0]?.toUpperCase() || profile?.email?.[0]?.toUpperCase() || 'U'}
                                    </span>
                                )}
                            </div>

                            {/* Upload button */}
                            <label
                                htmlFor="profile-picture-upload"
                                className="absolute p-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full cursor-pointer hover:from-cyan-400 hover:to-blue-500 hover:scale-110 transition-all shadow-xl ring-2 ring-white dark:ring-slate-800"
                                style={{ zIndex: 999, bottom: '-10px', left: '-10px' }}
                            >
                                <Camera className="w-4 h-4 text-slate-900 dark:text-white" />
                                <input
                                    id="profile-picture-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleProfilePictureChange}
                                    className="hidden"
                                />
                            </label>

                            {/* Delete button */}
                            {profile?.profilePicture && !profilePicturePreview && (
                                <button
                                    onClick={handleDeleteProfilePicture}
                                    className="absolute p-2 bg-red-500 rounded-full hover:bg-red-600 hover:scale-110 transition-all shadow-xl ring-2 ring-slate-800 opacity-0 group-hover:opacity-100"
                                    style={{ zIndex: 999, top: '-10px', right: '-10px' }}
                                    title="Remove profile picture"
                                >
                                    <Trash2 className="w-4 h-4 text-slate-900 dark:text-white" />
                                </button>
                            )}

                            {/* Admin badge */}
                            {profile?.role === 'ADMIN' && (
                                <div className="absolute w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center ring-2 ring-white dark:ring-slate-800" style={{ zIndex: 999, bottom: '-4px', right: '-4px' }}>
                                    <Shield className="w-4 h-4 text-slate-900 dark:text-white" />
                                </div>
                            )}
                        </div>

                        {/* Profile Picture Upload Preview Actions */}
                        {profilePicturePreview && (
                            <div className="mt-4 flex flex-wrap justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/80 p-3 backdrop-blur-md">
                                <Button
                                    onClick={handleUploadProfilePicture}
                                    isLoading={uploadProfilePicture.isPending}
                                    disabled={uploadProfilePicture.isPending || !profilePictureFile}
                                    size="sm"
                                    className="bg-emerald-500 hover:bg-emerald-400 text-white border-none"
                                >
                                    <Upload className="w-4 h-4 mr-2" />
                                    Upload
                                </Button>
                                <Button
                                    onClick={() => {
                                        setProfilePictureFile(null);
                                        setProfilePicturePreview(null);
                                    }}
                                    size="sm"
                                    variant="secondary"
                                    className="bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-600/50 text-slate-900 dark:text-white border-slate-300 dark:border-slate-600"
                                >
                                    <X className="w-4 h-4 mr-2" />
                                    Cancel
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* User Info */}
                    <div className="text-center md:text-left flex-1">
                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-500 dark:from-white dark:via-white dark:to-slate-400 bg-clip-text text-transparent">
                                {profile?.username || 'User'}
                            </h1>
                            <span className={`self-center md:self-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${profile?.role === 'ADMIN' ? 'bg-amber-500/20 text-amber-400 ring-1 ring-amber-500/30' : 'bg-cyan-500/20 text-cyan-400 ring-1 ring-cyan-500/30'}`}>
                                <Sparkles className="w-3 h-3" />
                                {profile?.role}
                            </span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 dark:text-slate-400 mt-1">{profile?.email}</p>
                        <p className="text-slate-500 dark:text-slate-400 dark:text-slate-500 text-sm mt-2 flex items-center justify-center md:justify-start gap-1">
                            <Calendar className="w-4 h-4" />
                            Member since {formatDate(profile?.createdAt)}
                        </p>
                    </div>

                    {/* Edit Button */}
                    {!isEditing ? (
                        <Button
                            onClick={handleEditProfile}
                            className="bg-white/5 hover:bg-white/10 border border-white/20 text-slate-900 dark:text-white backdrop-blur-sm"
                        >
                            <Edit2 className="w-4 h-4 mr-2" />
                            Edit Profile
                        </Button>
                    ) : (
                        <div className="flex gap-2">
                            <Button
                                variant="secondary"
                                onClick={() => {
                                    setFormData({ username: profile?.username || '' });
                                    setIsEditing(false);
                                }}
                                className="bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-600/50 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white"
                            >
                                <X className="w-4 h-4 mr-2" />
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSaveProfile}
                                isLoading={updateProfile.isPending}
                                className="bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-semibold hover:from-amber-300 hover:to-orange-400 border-none"
                            >
                                <Save className="w-4 h-4 mr-2" />
                                Save
                            </Button>
                        </div>
                    )}
                </div>

                {/* Editable Username Field */}
                    {isEditing && (
                    <div className="mt-6 max-w-md">
                        <label className="text-slate-500 dark:text-slate-400 dark:text-slate-400 text-sm mb-2 block">Username</label>
                        <input
                            type="text"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            placeholder="Enter username"
                            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 backdrop-blur-sm"
                        />
                        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500">
                            Letters, numbers, spaces, dots, dashes, and underscores only.
                        </p>
                    </div>
                )}
            </div>

            {/* Premium Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 p-5 backdrop-blur-sm transition-all duration-500 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 hover:-translate-y-1"
                    >
                        {/* Hover Gradient Effect */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                        <div className="relative flex items-start justify-between">
                            <div>
                                <p className="text-slate-500 dark:text-slate-400 dark:text-slate-400 text-sm group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">{stat.label}</p>
                                <p className={`text-2xl font-bold mt-1 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                                    {stat.value}
                                </p>
                            </div>
                            <div className={`p-2.5 rounded-xl ${stat.iconBg} ring-1 ${stat.ring} group-hover:scale-110 transition-transform duration-300`}>
                                <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                            </div>
                        </div>

                        {/* Bottom Accent Line */}
                        <div className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${stat.gradient} group-hover:w-full transition-all duration-500`} />
                    </div>
                ))}
            </div>

            {/* Profile Details Card */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 backdrop-blur-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-700/50 bg-gradient-to-r from-slate-50 dark:from-slate-800/50 to-white dark:to-slate-800/30">
                    <h2 className="text-lg font-bold flex items-center gap-2 text-slate-800 dark:text-white">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/20 ring-1 ring-cyan-500/30">
                            <User className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
                        </div>
                        Account Details
                    </h2>
                </div>
                <div className="divide-y divide-slate-200 dark:divide-slate-700/50">
                    {/* Username */}
                    <div className="flex items-center justify-between px-6 py-5 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-all group cursor-default">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-slate-100 dark:bg-slate-700/50 rounded-xl group-hover:scale-110 transition-transform ring-1 ring-slate-200 dark:ring-slate-600/50">
                                <User className="w-5 h-5 text-slate-500 dark:text-slate-400 dark:text-slate-400" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-wider">Username</p>
                                <p className="font-bold text-slate-800 dark:text-white text-base mt-0.5">{profile?.username || 'Not set'}</p>
                            </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-500 dark:text-slate-400 dark:text-slate-600 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors" />
                    </div>

                    {/* Email */}
                    <div className="flex items-center justify-between px-6 py-5 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-all group cursor-default">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-slate-100 dark:bg-slate-700/50 rounded-xl group-hover:scale-110 transition-transform ring-1 ring-slate-200 dark:ring-slate-600/50">
                                <Mail className="w-5 h-5 text-slate-500 dark:text-slate-400 dark:text-slate-400" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-wider">Email Address</p>
                                <p className="font-bold text-slate-800 dark:text-white text-base mt-0.5">{profile?.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-[11px] font-extrabold px-2.5 py-1 bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-lg flex items-center gap-1.5 uppercase tracking-wide ring-1 ring-emerald-500/30">
                                <Check className="w-3.5 h-3.5" /> Verified
                            </span>
                            <ChevronRight className="w-5 h-5 text-slate-500 dark:text-slate-400 dark:text-slate-600 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors" />
                        </div>
                    </div>

                    {/* Role */}
                    <div className="flex items-center justify-between px-6 py-5 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-all group cursor-default">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-slate-100 dark:bg-slate-700/50 rounded-xl group-hover:scale-110 transition-transform ring-1 ring-slate-200 dark:ring-slate-600/50">
                                <Shield className="w-5 h-5 text-slate-500 dark:text-slate-400 dark:text-slate-400" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-wider">Account Type</p>
                                <p className="font-bold text-slate-800 dark:text-white text-base mt-0.5">{profile?.role === 'ADMIN' ? 'Administrator' : 'Standard User'}</p>
                            </div>
                        </div>
                        <span className={`px-3 py-1 font-extrabold uppercase tracking-widest text-[10px] rounded-lg ring-1 ${profile?.role === 'ADMIN' ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400 ring-amber-500/30' : 'bg-slate-100 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 dark:text-slate-400 ring-slate-200 dark:ring-slate-600/50'}`}>
                            {profile?.role}
                        </span>
                    </div>

                    {/* Member Since */}
                    <div className="flex items-center justify-between px-6 py-5 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-all group cursor-default">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-slate-100 dark:bg-slate-700/50 rounded-xl group-hover:scale-110 transition-transform ring-1 ring-slate-200 dark:ring-slate-600/50">
                                <Calendar className="w-5 h-5 text-slate-500 dark:text-slate-400 dark:text-slate-400" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-wider">Member Since</p>
                                <p className="font-bold text-slate-800 dark:text-white text-base mt-0.5">{formatDate(profile?.createdAt)}</p>
                            </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-500 dark:text-slate-400 dark:text-slate-600 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors" />
                    </div>
                </div>
            </div>

            {/* Security Section */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 backdrop-blur-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-700/50 flex items-center justify-between bg-gradient-to-r from-slate-50 dark:from-slate-800/50 to-white dark:to-slate-800/30">
                    <h2 className="text-lg font-bold flex items-center gap-2 text-slate-800 dark:text-white">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/20 ring-1 ring-violet-500/30">
                            <Lock className="w-4 h-4 text-violet-500 dark:text-violet-400" />
                        </div>
                        Security Settings
                    </h2>
                    {!isChangingPassword && (
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => setIsChangingPassword(true)}
                            className="group font-bold text-xs uppercase tracking-widest bg-slate-100 dark:bg-slate-700/50 hover:bg-violet-500/20 hover:text-violet-600 dark:hover:text-violet-400 transition-all border border-slate-200 dark:border-slate-600/50 hover:border-violet-500/30"
                        >
                            <Key className="w-3.5 h-3.5 mr-2 group-hover:rotate-12 transition-transform" />
                            Change Password
                        </Button>
                    )}
                </div>

                {isChangingPassword ? (
                    <div className="p-8 space-y-6">
                        <div className="max-w-xl space-y-6">
                            {/* Passwords grid */}
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Current Password */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                        Current Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showCurrentPassword ? 'text' : 'password'}
                                            value={passwordData.currentPassword}
                                            onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                            placeholder="••••••••"
                                            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/50 rounded-xl text-slate-900 dark:text-white placeholder-slate-500 focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 outline-none transition-all font-medium"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:text-violet-500 dark:hover:text-violet-400 transition-colors"
                                        >
                                            {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>

                                {/* New Password */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                                        New Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showNewPassword ? 'text' : 'password'}
                                            value={passwordData.newPassword}
                                            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                            placeholder="••••••••"
                                            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/50 rounded-xl text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 outline-none transition-all font-medium"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:text-violet-500 dark:hover:text-violet-400 transition-colors"
                                        >
                                            {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                                    Confirm New Password
                                </label>
                                <input
                                    type="password"
                                    value={passwordData.confirmPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/50 rounded-xl text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 outline-none transition-all font-medium"
                                />
                                {passwordData.confirmPassword && passwordData.newPassword !== passwordData.confirmPassword && (
                                    <p className="text-red-400 text-[11px] font-bold mt-1 uppercase tracking-wider ml-1">Passwords do not match</p>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4 pt-4">
                                <Button
                                    variant="secondary"
                                    onClick={() => {
                                        setIsChangingPassword(false);
                                        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                                    }}
                                    className="px-6 py-6 rounded-xl font-bold uppercase tracking-widest text-xs bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-600/50 border border-slate-200 dark:border-slate-600/50 text-slate-700 dark:text-white"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleChangePassword}
                                    isLoading={changePassword.isPending}
                                    className="flex-1 py-6 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-400 hover:to-purple-500 shadow-xl shadow-violet-500/20 font-bold uppercase tracking-widest text-xs border-none"
                                >
                                    <Lock className="w-4 h-4 mr-2" />
                                    Update Password
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="px-6 py-12 text-center relative overflow-hidden">
                        {/* Background subtle decoration */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/5 dark:bg-violet-500/10 rounded-full blur-3xl -mr-16 -mt-16" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-fuchsia-500/5 dark:bg-fuchsia-500/10 rounded-full blur-3xl -ml-16 -mb-16" />

                        <div className="inline-flex items-center justify-center p-6 bg-slate-100 dark:bg-slate-900/50 rounded-3xl mb-6 shadow-inner ring-1 ring-slate-200 dark:ring-slate-700/50">
                            <Lock className="w-10 h-10 text-slate-500 dark:text-slate-400 dark:text-slate-500" />
                        </div>
                        <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Account Security</h4>
                        <p className="text-slate-500 dark:text-slate-400 dark:text-slate-400 max-w-sm mx-auto text-sm leading-relaxed">
                            Maintain your account safety by regularly updating your credentials with a strong, unconventional password.
                        </p>
                        <div className="inline-flex items-center gap-2 mt-6 px-4 py-1.5 bg-slate-100 dark:bg-slate-900/50 rounded-full ring-1 ring-slate-200 dark:ring-slate-700/50">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest">Secure Connection Active</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Delete Account Section */}
            <div className="rounded-2xl border border-red-200 dark:border-red-800/30 bg-white dark:bg-slate-800/50 backdrop-blur-sm shadow-xl overflow-hidden">
                <div className="px-6 py-12 text-center relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 dark:bg-red-500/10 rounded-full blur-3xl -mr-16 -mt-16" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-500/5 dark:bg-orange-500/10 rounded-full blur-3xl -ml-16 -mb-16" />

                    <div className="inline-flex items-center justify-center p-6 bg-red-100 dark:bg-red-900/20 rounded-3xl mb-6 shadow-inner ring-1 ring-red-200 dark:ring-red-800/50">
                        <AlertTriangle className="w-10 h-10 text-red-500 dark:text-red-400" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Delete Account</h4>
                    <p className="text-slate-500 dark:text-slate-400 dark:text-slate-400 max-w-md mx-auto text-sm leading-relaxed mb-4">
                        Permanently delete your account. This action cannot be undone.
                    </p>
                    {parseFloat(profile?.balance || 0) > 0 ? (
                        <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-red-900/30 rounded-lg ring-1 ring-red-800/50">
                            <AlertTriangle className="w-4 h-4 text-red-400" />
                            <span className="text-sm font-semibold text-red-300">
                                Cannot delete account with remaining balance ({formatCurrency(profile?.balance || 0)})
                            </span>
                        </div>
                    ) : (
                        <Button
                            variant="outline"
                            onClick={() => setShowDeleteModal(true)}
                            className="mt-6 border-red-700/50 text-red-400 hover:bg-red-900/20 hover:border-red-600/50"
                        >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Account
                        </Button>
                    )}
                </div>
            </div>

            {/* Delete Account Confirmation Modal */}
            <Modal
                isOpen={showDeleteModal}
                onClose={() => {
                    setShowDeleteModal(false);
                    setConfirmDelete('');
                }}
                title="Delete Account"
            >
                <div className="space-y-4">
                    <div className="flex items-start gap-3 p-4 bg-red-900/20 rounded-lg ring-1 ring-red-800/50">
                        <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-red-200">
                            <p className="font-semibold mb-1">Warning: This action is permanent</p>
                            <p>Once you delete your account, there is no going back. All your data, orders, and history will be permanently removed.</p>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
                            Type <span className="font-mono font-bold text-red-400">DELETE</span> to confirm:
                        </label>
                        <Input
                            type="text"
                            value={confirmDelete}
                            onChange={(e) => setConfirmDelete(e.target.value)}
                            placeholder="DELETE"
                            className="font-mono bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700/50 text-slate-900 dark:text-white"
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <Button
                            variant="outline"
                            onClick={() => {
                                setShowDeleteModal(false);
                                setConfirmDelete('');
                            }}
                            className="flex-1 border-slate-300 dark:border-slate-600/50 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50"
                            disabled={deleteAccount.isPending}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleDeleteAccount}
                            isLoading={deleteAccount.isPending}
                            className="flex-1 bg-red-600 hover:bg-red-500 text-white border-none"
                            disabled={confirmDelete !== 'DELETE'}
                        >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Account
                        </Button>
                    </div>
                </div>
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
                <div className="flex items-center justify-center p-8 bg-slate-50 dark:bg-slate-900/50">
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt="Profile Picture"
                            className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                            onError={(e) => {
                                console.error('Failed to load image:', imageUrl);
                            }}
                        />
                    ) : (
                        <div className="text-center text-slate-500 dark:text-slate-400">
                            No image to display
                        </div>
                    )}
                </div>
            </Modal>
        </div>
    );
}

ProfilePage.getLayout = (page) => {
    return <DashboardLayout>{page}</DashboardLayout>;
};
