/**
 * Textarea Component
 */

import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

const Textarea = forwardRef(
  ({ label, error, className = '', rows = 4, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && <label className="label">{label}</label>}
        <textarea
          ref={ref}
          rows={rows}
          className={cn(
            'input resize-none',
            error && 'input-error',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-xs text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
