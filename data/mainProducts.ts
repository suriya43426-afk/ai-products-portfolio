import type { ProductIconName } from '@/components/ui/ProductIcon';
import type { BuTone } from '@/lib/bu';

export interface MainProduct {
  slug: string;
  category: string;
  title: string;
  subtitle: string;
  blurb: string;
  progress: number;
  trl: number;
  stage: string;
  stats: { label: string; value: string }[];
  tone: BuTone;
  icon: ProductIconName;
}

export const MAIN_PRODUCTS: MainProduct[] = [
  {
    slug: 'precision-farming',
    category: 'AI Smart Farm',
    title: 'Precision Farming',
    subtitle: 'Geospatial intelligence for millions of rai',
    blurb: 'Sentinel-2 NDVI zoning + VRT guidance across contract farms.',
    progress: 72,
    trl: 8,
    stage: 'In Production',
    stats: [
      { label: 'Model', value: 'CNN + XGBoost' },
      { label: 'TRL', value: '8' },
    ],
    tone: 'green',
    icon: 'leaf',
  },
  {
    slug: 'cane-volume-prediction',
    category: 'AI Smart Farm',
    title: 'Cane Volume Prediction',
    subtitle: 'Forecast tonnage before crushing season',
    blurb: 'Time-series + geospatial fusion for sourcing & logistics planning.',
    progress: 58,
    trl: 7,
    stage: 'Productionizing',
    stats: [
      { label: 'Model', value: 'LSTM + XGBoost' },
      { label: 'MAPE', value: '<6%' },
    ],
    tone: 'green',
    icon: 'chart',
  },
  {
    slug: 'ai-apc-own-build',
    category: 'AI Smart Manufacturing',
    title: 'AI APC Own-Build',
    subtitle: 'In-house advanced process control',
    blurb: 'RL + MPC layer over OSIsoft PI to eliminate vendor lock-in.',
    progress: 30,
    trl: 4,
    stage: 'Experiment',
    stats: [
      { label: 'Model', value: 'Soft-actor-critic RL' },
      { label: 'TRL', value: '4' },
    ],
    tone: 'blue',
    icon: 'cog',
  },
  {
    slug: 'data-management-tool',
    category: 'Data Governance',
    title: 'Data Platform',
    subtitle: 'Medallion lakehouse with lineage',
    blurb: 'Shared Gold Zone feeding every product with governed data.',
    progress: 85,
    trl: 9,
    stage: 'Scaling',
    stats: [
      { label: 'Stack', value: 'Iceberg · dbt' },
      { label: 'TRL', value: '9' },
    ],
    tone: 'violet',
    icon: 'stack',
  },
  {
    slug: 'agentic-ai',
    category: 'Corporate AI',
    title: 'Agentic AI',
    subtitle: 'Multi-LLM orchestration for the enterprise',
    blurb: 'LangChain + n8n flows for finance, procurement, and HR ops.',
    progress: 45,
    trl: 6,
    stage: 'Pilot',
    stats: [
      { label: 'Orchestrator', value: 'LangChain · n8n' },
      { label: 'TRL', value: '6' },
    ],
    tone: 'violet',
    icon: 'spark',
  },
  {
    slug: 'ai-sugarcane-weight',
    category: 'CaneAI Connect',
    title: 'AI Sugarcane Weight + Dump',
    subtitle: 'Computer vision at the weighbridge & yard',
    blurb: 'End-to-end CV pipeline: weight estimation + dump-station QA.',
    progress: 50,
    trl: 6,
    stage: 'Field Trial',
    stats: [
      { label: 'Model', value: 'YOLOv11 · VLM' },
      { label: 'TRL', value: '6' },
    ],
    tone: 'blue',
    icon: 'eye',
  },
];
