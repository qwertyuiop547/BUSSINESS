/**
 * Currency Toggle Component
 */

import { DollarSign } from 'lucide-react';
import useCurrencyStore from '../../store/currencyStore';

export default function CurrencyToggle({ className = '' }) {
    const { currency, toggleCurrency, getCurrencySymbol } = useCurrencyStore();

    return (
        <button
            onClick={toggleCurrency}
            className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 ${className}`}
            title={`Switch to ${currency === 'PHP' ? 'USD' : 'PHP'}`}
        >
            <div className="flex items-center gap-1.5">
                <DollarSign className="w-5 h-5 text-gray-900 dark:text-gray-100" />
                <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">{getCurrencySymbol()}</span>
            </div>
        </button>
    );
}

