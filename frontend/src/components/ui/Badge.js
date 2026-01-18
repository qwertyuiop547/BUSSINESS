/**
 * Badge Component
 */

import { cn, getStatusColor } from '../../lib/utils';

export default function Badge({ children, variant, status, className = '' }) {
  // If status prop is provided, auto-determine variant
  const badgeClass = status ? getStatusColor(status) : `badge-${variant || 'gray'}`;

  return (
    <span className={cn('badge', badgeClass, className)}>
      {children}
    </span>
  );
}
