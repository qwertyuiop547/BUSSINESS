/**
 * Next.js App Component
 */

import { useEffect } from 'react';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import useThemeStore from '../store/themeStore';
import useCurrencyStore from '../store/currencyStore';
import MaintenanceMode from '../components/MaintenanceMode';
import '../styles/globals.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnMount: false, // Prevent refetch on mount to reduce flickering
      refetchOnReconnect: false, // Prevent refetch on reconnect
    },
  },
});

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const { initializeTheme } = useThemeStore();
  // Initialize theme on app load
  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>SMB Panel - Cheapest & Fastest SMM Services</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>
      {getLayout(<Component {...pageProps} />)}
      <MaintenanceMode />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1f2937',
            color: '#fff',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </QueryClientProvider>
  );
}
