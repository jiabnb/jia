export type ClassValue =
  | string
  | number
  | null
  | undefined
  | false
  | ClassValue[]
  | Record<string, boolean | undefined | null>;

export type PoolStatus =
  | "Due Diligence"
  | "Open for Eligible Users"
  | "Fully Allocated"
  | "Closed";

export type RiskLevel = "Low" | "Medium" | "High";

export type AssetType = "Villa" | "Residence" | "Hotel Apartment" | "Commercial";

export type DocumentStatus = "Available" | "Pending" | "Under Review";

export type AuditStatus = "Audited" | "In Audit" | "Not Started";

export interface PropertyDocument {
  name: string;
  status: DocumentStatus;
  lastUpdated: string;
  /** When true, the "View" action is a live link; otherwise it is a disabled mock. */
  href?: string;
}

export interface PropertySpec {
  label: string;
  value: string;
}

export interface RiskFactor {
  title: string;
  detail: string;
}

export interface TimelineStep {
  phase: string;
  description: string;
  state: "complete" | "active" | "upcoming";
}

export interface Property {
  id: string;
  slug: string;
  name: string;
  location: string;
  jurisdiction: string;
  assetType: AssetType;
  /** One-line card summary. */
  tagline: string;
  /** Longer, professional description for the detail page. */
  description: string;
  image: string;
  gallery: string[];
  targetBnb: number;
  raisedBnb: number;
  minParticipationBnb: number;
  status: PoolStatus;
  riskLevel: RiskLevel;
  /** When true, the pool is not open for interaction and is shown locked. */
  locked: boolean;
  kycRequired: boolean;
  documentsAvailable: number;
  contractAddress: string | null;
  auditStatus: AuditStatus;
  legalWrapper: string;
  legalReviewStatus: string;
  expectedTimeline: string;
  specs: PropertySpec[];
  documents: PropertyDocument[];
  risks: RiskFactor[];
  timeline: TimelineStep[];
  faq: { question: string; answer: string }[];
}
