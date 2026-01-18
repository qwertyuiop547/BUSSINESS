/**
 * Utility functions
 */

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind classes
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Format currency
 */
export function formatCurrency(amount, currency = 'PHP') {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Format number with commas
 */
export function formatNumber(num) {
  return new Intl.NumberFormat('en-US').format(num);
}

/**
 * Resolve public base URL for assets
 */
export function getPublicBaseUrl() {
  const fallback = 'http://localhost:5000';
  const rawUrl = process.env.NEXT_PUBLIC_API_URL || `${fallback}/api`;
  const withoutApi = rawUrl.endsWith('/api') ? rawUrl.slice(0, -4) : rawUrl;
  return withoutApi.replace(/\/$/, '');
}

/**
 * Profile image URL helper
 */
export function getProfileImageUrl(filename) {
  if (!filename) return '';
  if (/^https?:\/\//i.test(filename)) return filename;
  const baseUrl = getPublicBaseUrl();
  let url = '';
  if (filename.startsWith('/uploads/')) url = `${baseUrl}${filename}`;
  else if (filename.startsWith('uploads/')) url = `${baseUrl}/${filename}`;
  else if (filename.startsWith('profiles/')) url = `${baseUrl}/uploads/${filename}`;
  else url = `${baseUrl}/uploads/profiles/${filename}`;
  return url;
}

/**
 * Format date
 */
export function formatDate(date, options = {}) {
  if (!date) return 'N/A';
  
  const dateObj = new Date(date);
  
  // Check if date is valid
  if (isNaN(dateObj.getTime())) {
    return 'Invalid date';
  }

  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };

  try {
    return new Intl.DateTimeFormat('en-US', { ...defaultOptions, ...options })
      .format(dateObj);
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid date';
  }
}

/**
 * Format relative time
 */
export function formatRelativeTime(date) {
  if (!date) return 'N/A';
  
  const dateObj = new Date(date);
  
  // Check if date is valid
  if (isNaN(dateObj.getTime())) {
    return 'Invalid date';
  }

  const now = new Date();
  const diff = now - dateObj;

  // If diff is negative, date is in the future
  if (diff < 0) return 'Just now';

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return 'Just now';
}

/**
 * Truncate string
 */
export function truncate(str, length = 50) {
  if (!str) return '';
  return str.length > length ? `${str.substring(0, length)}...` : str;
}

/**
 * Get status badge color
 */
export function getStatusColor(status) {
  const colors = {
    // Order statuses
    PENDING: 'badge-warning',
    PROCESSING: 'badge-info',
    IN_PROGRESS: 'badge-info',
    COMPLETED: 'badge-success',
    PARTIAL: 'badge-warning',
    FAILED: 'badge-danger',
    CANCELED: 'badge-gray',
    REFUNDED: 'badge-gray',

    // User statuses
    ACTIVE: 'badge-success',
    BANNED: 'badge-danger',
    SUSPENDED: 'badge-warning',

    // Top-up statuses
    APPROVED: 'badge-success',
    REJECTED: 'badge-danger',

    // Ticket statuses
    OPEN: 'badge-info',
    ANSWERED: 'badge-success',
    CLOSED: 'badge-gray',

    // Provider statuses
    MAINTENANCE: 'badge-warning',
    INACTIVE: 'badge-danger',
  };

  return colors[status] || 'badge-gray';
}

/**
 * Copy to clipboard
 */
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy:', err);
    return false;
  }
}

/**
 * Generate order ID display format
 */
export function formatOrderId(id) {
  if (!id) return '';
  return `#${id.slice(-8).toUpperCase()}`;
}

/**
 * Platform icons mapping
 */
export const platformIcons = {
  INSTAGRAM: '📸',
  FACEBOOK: '📘',
  TWITTER: '🐦',
  TIKTOK: '🎵',
  YOUTUBE: '📺',
  TELEGRAM: '✈️',
  DISCORD: '💬',
  SPOTIFY: '🎧',
  TWITCH: '🎮',
  OTHER: '🌐',
};

/**
 * Get platform icon
 */
export function getPlatformIcon(platform) {
  return platformIcons[platform] || platformIcons.OTHER;
}

/**
 * Sleep utility
 */
export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Debounce function
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
