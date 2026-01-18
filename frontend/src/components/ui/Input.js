/**
 * Input Component
 */

import { forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '../../lib/utils';

const Input = forwardRef(
  ({ label, error, className = '', type = 'text', showToggle = false, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordToggle = type === 'password' && showToggle;
    const resolvedType = isPasswordToggle && showPassword ? 'text' : type;

    return (
      <div className="w-full">
        {label && <label className="label">{label}</label>}
        <div className="relative">
          <input
            ref={ref}
            type={resolvedType}
            className={cn(
              error ? 'input-error' : 'input',
              isPasswordToggle && 'pr-10',
              className
            )}
            {...props}
          />
          {isPasswordToggle && (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          )}
        </div>
        {error && (
          <p className="mt-1 text-xs text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
