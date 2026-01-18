/**
 * Hook to check maintenance mode status
 */

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';

export function useMaintenanceMode() {
  const { data: maintenanceData, isLoading } = useQuery({
    queryKey: ['maintenanceMode'],
    queryFn: async () => {
      try {
        const response = await api.get('/v1/public/maintenance');
        return response.data.data;
      } catch (error) {
        return { maintenance: false, expiry: null, timeRemaining: null, reason: null };
      }
    },
    staleTime: 5 * 1000, // 5 seconds
    refetchInterval: 30 * 1000, // Refetch every 30 seconds
  });

  return { 
    isMaintenanceMode: maintenanceData?.maintenance || false,
    maintenanceExpiry: maintenanceData?.expiry || null,
    timeRemaining: maintenanceData?.timeRemaining || null,
    maintenanceReason: maintenanceData?.reason || null,
    isLoading 
  };
}
