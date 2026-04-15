import { cn } from '@/lib/utils';

export function TechPill({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700',
        className,
      )}
    >
      {children}
    </span>
  );
}
