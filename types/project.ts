export type ProjectStatus = 'active' | 'pending' | 'planning';
export type ProjectType = 'vendor' | 'ownbuild' | 'platform' | 'genai' | 'governance';
export type BusinessUnit = 'farm' | 'factory' | 'corporate';
export type RiskLevel = 'low' | 'medium' | 'high';

export interface KpiMetric {
  label: string;
  value: string;
  highlight?: 'green' | 'blue';
}

export interface Benefit {
  title: string;
  description: string;
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
  benefits: Benefit[];
  metricNote: string;

  research: ResearchMethodology;

  timeline: TimelinePhase[];
  risks: RiskItem[];
  budget: BudgetItem[];

  dependsOn: number[];
  feedsInto: number[];
  relatedProjects: number[];

  // Optional admin-managed content
  researchHtml?: string;
  paperPdf?: string;
}
