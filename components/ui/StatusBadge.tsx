import { STATUS_CONFIG } from '@/lib/constants';
import type { ProjectStatus } from '@/types/project';
import { cn } from '@/lib/utils';

export function StatusBadge({
  status,
  label,
  className,
}: {
  status: ProjectStatus;
  label?: string;
  className?: string;
}) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold',
        cfg.bgClass,
        cfg.textClass,
        className,
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', cfg.dotClass)} />
      {label ?? cfg.label}
    </span>
  );
}
