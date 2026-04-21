import type { ProjectStatus, ProjectType } from '@/types/project';

export const NAV_ITEMS = [
  { href: '/#about', label: 'About' },
  { href: '/#portfolio', label: 'Portfolio' },
];

export const STATUS_CONFIG: Record<
  ProjectStatus,
  { label: string; dotClass: string; textClass: string; bgClass: string }
> = {
  active: {
    label: 'Active',
    dotClass: 'bg-green',
    textClass: 'text-green',
    bgClass: 'bg-[color:var(--color-green)]/10',
  },
  pending: {
    label: 'Pending',
    dotClass: 'bg-amber',
    textClass: 'text-amber',
    bgClass: 'bg-[color:var(--color-amber)]/10',
  },
  planning: {
    label: 'Planning',
    dotClass: 'bg-violet',
    textClass: 'text-violet',
    bgClass: 'bg-[color:var(--color-violet)]/10',
  },
};

export const TYPE_LABEL: Record<ProjectType, string> = {
  vendor: 'Vendor',
  ownbuild: 'Own-Build',
  platform: 'Platform',
  genai: 'GenAI',
  governance: 'Governance',
};

export const MITRPHOL_LOGO =
  'https://images.crunchbase.com/image/upload/c_pad,f_auto,q_auto:eco,dpr_1/tra4wmxjkrwkhulzao8v';
