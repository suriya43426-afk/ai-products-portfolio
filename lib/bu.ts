import type { BusinessUnit } from '@/types/project';

export type BuTone = 'green' | 'blue' | 'violet';

export interface BuMeta {
  key: BusinessUnit;
  label: string;
  accent: string;
  bg: string;
  subtitle: string;
  tone: BuTone;
}

export const BU_META: Record<BusinessUnit, BuMeta> = {
  farm: {
    key: 'farm',
    label: 'Smart Agriculture',
    accent: '#16a34a',
    bg: '/images/agri_background.png',
    subtitle: 'Geospatial intelligence and predictive modeling for millions of rai.',
    tone: 'green',
  },
  factory: {
    key: 'factory',
    label: 'Smart Manufacturing',
    accent: '#3050d6',
    bg: '/images/fac_background.png',
    subtitle: 'Advanced process control and computer vision across biopower and sugar operations.',
    tone: 'blue',
  },
  corporate: {
    key: 'corporate',
    label: 'AI & Data Governance',
    accent: '#7c3aed',
    bg: '/images/gen_background.png',
    subtitle: 'Data foundation, agentic automation, and AI governance for the enterprise.',
    tone: 'violet',
  },
};

export const BU_ORDER: BusinessUnit[] = ['farm', 'factory', 'corporate'];
