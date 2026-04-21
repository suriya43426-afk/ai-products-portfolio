export type LiteratureStatus = 'draft' | 'fetched' | 'summarized';

export interface LiteratureEntry {
  id: string;
  projectSlug: string;

  // Core bibliographic data
  group: string;
  no: number;
  title: string;
  authors: string[];
  year: number;
  venue: string;
  doiUrl: string;

  // Hand-written relevance (as in CSV)
  relevance: string;

  // Auto-fetched content
  abstract?: string;
  introduction?: string;
  fetchedAt?: string;
  fetchError?: string;

  // LLM-generated
  aiSummary?: string;
  aiSummarizedAt?: string;
  aiModel?: string;

  // Extras
  pdfUrl?: string;
  tags?: string[];

  status: LiteratureStatus;
  createdAt: string;
  updatedAt: string;
}
