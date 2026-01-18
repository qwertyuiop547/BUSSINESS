/**
 * Theme Store (Zustand)
 * 
 * Global theme state management for dark/light mode.
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useThemeStore = create(
    persist(
        (set, get) => ({
            theme: 'light', // 'light' | 'dark' | 'system'

            // Initialize theme on app load
            initializeTheme: () => {
                const { theme } = get();
                applyTheme(theme);
            },

            // Set theme
            setTheme: (newTheme) => {
                set({ theme: newTheme });
                applyTheme(newTheme);
            },

            // Toggle between light and dark
            toggleTheme: () => {
                const { theme } = get();
                const newTheme = theme === 'dark' ? 'light' : 'dark';
                set({ theme: newTheme });
                applyTheme(newTheme);
            },
        }),
        {
            name: 'theme-storage',
        }
    )
);

// Helper function to apply theme to document
function applyTheme(theme) {
    if (typeof window === 'undefined') return;

    const root = window.document.documentElement;

    if (theme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        root.classList.toggle('dark', systemTheme === 'dark');
    } else {
        root.classList.toggle('dark', theme === 'dark');
    }
}

export default useThemeStore;
