
export interface Invention {
  id: string;
  title: string;
  description: string;
  category: 'hardware' | 'software' | 'process' | 'design' | 'biotech' | 'other';
  stage: 'concept' | 'development' | 'prototype' | 'testing' | 'patent_pending' | 'patented' | 'commercialized';
  priority: 'low' | 'medium' | 'high' | 'critical';
  createdAt: Date;
  lastModified: Date;
  versions: InventionVersion[];
  attachments: SecureFile[];
  patentApplications: PatentApplication[];
  collaborators: string[];
  confidentialityLevel: 'public' | 'internal' | 'confidential' | 'top_secret';
  tags: string[];
  marketPotential: number;
  developmentCost: number;
  timeToMarket: number;
}

export interface InventionVersion {
  id: string;
  version: string;
  changes: string;
  timestamp: Date;
  author: string;
  files: SecureFile[];
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  role: 'collaborator' | 'investor' | 'lawyer' | 'partner' | 'manufacturer' | 'advisor';
  relationship: 'active' | 'potential' | 'former' | 'blacklisted';
  ndaSigned: boolean;
  ndaExpiryDate?: Date;
  notes: string;
  lastContact: Date;
  trustLevel: number;
  specializations: string[];
}

export interface PatentApplication {
  id: string;
  inventionId: string;
  applicationNumber?: string;
  title: string;
  status: 'draft' | 'filed' | 'under_review' | 'approved' | 'rejected' | 'abandoned';
  filingDate?: Date;
  publicationDate?: Date;
  grantDate?: Date;
  expiryDate?: Date;
  jurisdiction: string[];
  attorney?: string;
  cost: number;
  documents: SecureFile[];
  deadlines: PatentDeadline[];
}

export interface PatentDeadline {
  id: string;
  type: 'response' | 'renewal' | 'publication' | 'grant' | 'appeal';
  dueDate: Date;
  description: string;
  completed: boolean;
  cost?: number;
}

export interface SecureFile {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: Date;
  encrypted: boolean;
  accessLevel: 'public' | 'internal' | 'confidential' | 'top_secret';
  downloadCount: number;
  lastAccessed?: Date;
  hash: string;
}

export interface LegalDocument {
  id: string;
  type: 'nda' | 'contract' | 'patent' | 'license' | 'agreement' | 'correspondence';
  title: string;
  parties: string[];
  status: 'draft' | 'sent' | 'signed' | 'executed' | 'expired' | 'terminated';
  createdDate: Date;
  signedDate?: Date;
  expiryDate?: Date;
  file: SecureFile;
  signatures: DocumentSignature[];
  relatedInventions: string[];
}

export interface DocumentSignature {
  id: string;
  signerName: string;
  signerEmail: string;
  signedAt: Date;
  ipAddress: string;
  verified: boolean;
}

export interface MonitoringAlert {
  id: string;
  type: 'copyright_infringement' | 'patent_conflict' | 'trademark_violation' | 'design_copy';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  detectedAt: Date;
  source: string;
  evidence: string[];
  relatedInvention?: string;
  status: 'new' | 'investigating' | 'confirmed' | 'false_positive' | 'resolved';
  recommendedAction: string;
  legalRisk: number;
}

export interface AIAgent {
  id: string;
  name: string;
  type: 'monitor' | 'validator' | 'analyzer' | 'assistant';
  status: 'active' | 'idle' | 'scanning' | 'analyzing';
  lastScan: Date;
  tasksCompleted: number;
  alertsGenerated: number;
  accuracy: number;
  specialization: string[];
}

export interface InvestorOutreach {
  id: string;
  contactId: string;
  inventionId: string;
  status: 'planned' | 'contacted' | 'interested' | 'declined' | 'negotiating' | 'invested';
  initialContact: Date;
  lastFollowUp?: Date;
  pitchSent: boolean;
  ndaRequired: boolean;
  ndaSigned: boolean;
  valuation?: number;
  terms?: string;
  notes: string;
}

export interface AuditEntry {
  id: string;
  timestamp: Date;
  user: string;
  action: string;
  resource: string;
  resourceId: string;
  details: string;
  ipAddress: string;
  severity: 'info' | 'warning' | 'critical';
}
