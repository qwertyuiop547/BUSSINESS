/**
 * Stats Card Component
 */

import { cn } from '../../lib/utils';

export default function StatsCard({
  title,
  value,
  icon: Icon,
  change,
  changeType = 'neutral',
  className = '',
}) {
  const changeColors = {
    positive: 'text-emerald-400 bg-emerald-500/20',
    negative: 'text-rose-400 bg-rose-500/20',
    neutral: 'text-slate-400 bg-slate-700',
  };

  return (
    <div className={cn('card p-6', className)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-400">
            {title}
          </p>
          <p className="mt-1 text-2xl font-bold text-white">
            {value}
          </p>
        </div>
        {Icon && (
          <div className="p-3 rounded-xl bg-cyan-500/20">
            <Icon className="w-6 h-6 text-cyan-400" />
          </div>
        )}
      </div>
      {change && (
        <div className="mt-4">
          <span
            className={cn(
              'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
              changeColors[changeType]
            )}
          >
            {changeType === 'positive' && '↑'}
            {changeType === 'negative' && '↓'}
            {change}
          </span>
        </div>
      )}
    </div>
  );
}
