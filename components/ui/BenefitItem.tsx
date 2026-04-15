import type { Benefit } from '@/types/project';

export function BenefitItem({ benefit }: { benefit: Benefit }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
          <path
            fillRule="evenodd"
            d="M16.704 5.29a1 1 0 010 1.42l-7.5 7.5a1 1 0 01-1.42 0l-3.5-3.5a1 1 0 111.42-1.42l2.79 2.79 6.79-6.79a1 1 0 011.42 0z"
            clipRule="evenodd"
          />
        </svg>
      </span>
      <div>
        <div className="text-sm font-semibold text-navy-900">{benefit.title}</div>
        <div className="text-sm text-slate-600">{benefit.description}</div>
      </div>
    </li>
  );
}
