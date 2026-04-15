export type DataProductBu =
  | 'Farming'
  | 'Sugar'
  | 'Biopower'
  | 'Biofuel'
  | 'Solimate'
  | 'RGS'
  | 'PNP'
  | 'Other';

export type DataProductStatus = 'published' | 'draft' | 'deprecated';

export interface DataOwner {
  name: string;
  email: string;
}

export interface DataProduct {
  id: string;
  slug: string;
  title: string;
  description: string;
  bu: DataProductBu;
  supportFunction: string;
  tags: string[];

  fileCount: number;
  rowCount: number;
  columnCount: number;
  size: string;
  format: string;
  lastUpdated: string;
  usabilityScore: number;
  downloads: number;

  ownerTeam: string;
  owner: DataOwner;

  status: DataProductStatus;
}
