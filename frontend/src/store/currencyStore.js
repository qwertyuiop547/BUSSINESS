/**
 * Currency Store - Zustand store for currency management
 * Supports PHP and USD with conversion rates
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Exchange rates (can be updated from backend/API)
const EXCHANGE_RATES = {
    PHP: 1, // Base currency
    USD: 0.018, // Approximate: 1 PHP = 0.018 USD
};

const useCurrencyStore = create(
    persist(
        (set, get) => ({
            currency: 'PHP', // Default currency

            // Format amount based on current currency
            formatAmount: (amount) => {
                const state = get();
                const currency = state.currency || 'PHP';

                // Handle null, undefined, objects, or invalid values
                let numAmount = 0;
                
                if (amount === null || amount === undefined) {
                    numAmount = 0;
                } else if (typeof amount === 'object') {
                    // Handle Prisma Decimal objects or other objects
                    if (amount.toNumber) {
                        numAmount = amount.toNumber();
                    } else if (amount.toString) {
                        numAmount = parseFloat(amount.toString()) || 0;
                    } else {
                        numAmount = 0;
                    }
                } else if (typeof amount === 'string') {
                    numAmount = parseFloat(amount) || 0;
                } else {
                    numAmount = Number(amount);
                    if (Number.isNaN(numAmount)) numAmount = 0;
                }
                
                amount = numAmount;

                // Convert amount if needed (amounts are stored in PHP)
                let displayAmount = amount;
                if (currency === 'USD' && EXCHANGE_RATES.USD) {
                    displayAmount = amount * EXCHANGE_RATES.USD;
                }

                const locale = currency === 'USD' ? 'en-US' : 'en-PH';
                return new Intl.NumberFormat(locale, {
                    style: 'currency',
                    currency: currency,
                    minimumFractionDigits: 2,
                }).format(displayAmount);
            },

            // Get currency symbol
            getCurrencySymbol: () => {
                const state = get();
                const currency = state.currency || 'PHP';
                return currency === 'USD' ? '$' : '₱';
            },

            // Toggle between PHP and USD
            toggleCurrency: () => {
                const state = get();
                const newCurrency = state.currency === 'PHP' ? 'USD' : 'PHP';
                set({ currency: newCurrency });
            },

            // Set specific currency
            setCurrency: (currency) => {
                if (currency === 'PHP' || currency === 'USD') {
                    set({ currency });
                }
            },

            // Initialize currency (if needed)
            initializeCurrency: () => {
                // Already initialized by persist middleware
            },
        }),
        {
            name: 'currency-storage',
        }
    )
);

export default useCurrencyStore;
