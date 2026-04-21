export type ProjectStatus = 'active' | 'pending' | 'planning';
export type ProjectType = 'vendor' | 'ownbuild' | 'platform' | 'genai' | 'governance';
export type BusinessUnit = 'farm' | 'factory' | 'corporate';
export type RiskLevel = 'low' | 'medium' | 'high';

export interface KpiMetric {
  label: string;
  value: string;
  highlight?: 'green' | 'blue';
}

export interface ResearchPhase {
  name: string;
  duration: string;
  activities: string[];
  deliverables: string[];
}

export interface MethodologyApproach {
  type: string;
  framework: string;
  description: string;
  phases: ResearchPhase[];
}

export interface DataSource {
  name: string;
  type: string;
  description: string;
  format: string;
}

export interface DataCollection {
  sources: DataSource[];
  volume: string;
  frequency: string;
  preprocessing: string[];
}

export interface AnalysisMethod {
  primary: string;
  secondary?: string;
  tools: string[];
  metrics: string[];
}

export interface ValidationStrategy {
  method: string;
  baseline: string;
  successCriteria: string[];
}

export interface ResearchMethodology {
  problemStatement: string;
  objectives: string[];
  scope: string;
  approach: MethodologyApproach;
  dataCollection: DataCollection;
  analysisMethod: AnalysisMethod;
  validation: ValidationStrategy;
  ethicsAndGovernance?: string;
}

export interface RiskItem {
  risk: string;
  impact: RiskLevel;
  probability: RiskLevel;
  mitigation: string;
}

export interface BudgetItem {
  category: string;
  amount: string;
  note?: string;
}

export interface TimelinePhase {
  phase: string;
  startDate: string;
  endDate: string;
  milestones: string[];
}

export interface TechStackItem {
  category: string;
  technologies: string[];
}

export interface AiMethodology {
  problemFraming?: string;
  data?: {
    sources: string[];
    volume?: string;
    sampling?: string;
  };
  features?: string[];
  model?: {
    family: string;
    architecture?: string;
    hyperparams?: Record<string, string>;
  };
  training?: {
    protocol?: string;
    split?: string;
    hardware?: string;
  };
  evaluation?: {
    metrics: { name: string; value: string; baseline?: string }[];
    notes?: string;
  };
  deployment?: {
    topology?: string;
    monitoring?: string[];
  };
  limitations?: string[];
}

export type PaperStatus = 'draft' | 'internal' | 'published';

export interface PaperRevision {
  version: string;
  uploadedAt: string;
  author: string;
  changelog: string;
  pdfUrl: string;
  sha256?: string;
  status: PaperStatus;
}

export interface Reference {
  id: string;
  citation: string;
  url?: string;
}

export type TrlLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface ProgressSnapshot {
  percent: number;
  stage: string;
  milestone?: string;
  trl?: TrlLevel;
  updatedAt?: string;
}

export interface ProjectData {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  heroImage: string;

  type: ProjectType;
  businessUnit: BusinessUnit;
  status: ProjectStatus;
  statusLabel: string;

  techTags: string[];
  techStack: TechStackItem[];

  kpis: KpiMetric[];
  metricNote: string;

  research: ResearchMethodology;

  timeline: TimelinePhase[];
  risks: RiskItem[];
  budget: BudgetItem[];

  dependsOn: number[];
  feedsInto: number[];
  relatedProjects: number[];

  // IEEE-style extensions
  abstract?: string;
  aiMethodology?: AiMethodology;
  papers?: PaperRevision[];
  references?: Reference[];
  progress?: ProgressSnapshot;
}
