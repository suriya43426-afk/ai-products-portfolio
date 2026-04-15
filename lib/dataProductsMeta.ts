// Client-safe constants for Data Products (no fs/server-only imports)

export const SUPPORT_FUNCTIONS = [
  'Raw Material',
  'Production / Operations',
  'Maintenance',
  'Logistics & Supply Chain',
  'Human Resources (HR)',
  'Marketing & Sales',
  'Accounting',
  'Finance & Treasury',
  'R&D / Innovation',
  'IT & Digital Transformation',
  'Sustainability & ESG',
] as const;

export const DP_BU_NAMES = ['Farming', 'Sugar', 'Biopower', 'Biofuel', 'Solimate', 'RGS', 'PNP', 'Other'] as const;

export const DP_BU_COLORS: Record<string, { from: string; to: string }> = {
  Farming: { from: '#4ade80', to: '#16a34a' },
  Sugar: { from: '#fbbf24', to: '#d97706' },
  Biopower: { from: '#34d399', to: '#059669' },
  Biofuel: { from: '#60a5fa', to: '#2563eb' },
  Solimate: { from: '#f472b6', to: '#db2777' },
  RGS: { from: '#a78bfa', to: '#7c3aed' },
  PNP: { from: '#fb923c', to: '#ea580c' },
  Other: { from: '#94a3b8', to: '#475569' },
};
