
export interface Certificate {
  id: string;
  title: string;
  issuingOrganization: string;
  issueDate: Date;
  expirationDate?: Date;
  verificationNumber?: string;
  category: CertificateCategory;
  type: CertificateType;
  status: CertificateStatus;
  description?: string;
  skills: string[];
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  createdAt: Date;
  updatedAt: Date;
}

export type CertificateCategory = 
  | 'technology'
  | 'business'
  | 'healthcare'
  | 'education'
  | 'creative'
  | 'language'
  | 'professional'
  | 'academic'
  | 'certification'
  | 'other';

export type CertificateType = 
  | 'diploma'
  | 'certificate'
  | 'license'
  | 'badge'
  | 'award'
  | 'completion';

export type CertificateStatus = 
  | 'active'
  | 'expired'
  | 'expiring_soon'
  | 'pending_renewal'
  | 'revoked';

export interface CertificateFilters {
  search?: string;
  category?: CertificateCategory;
  type?: CertificateType;
  status?: CertificateStatus;
  organization?: string;
  dateFrom?: Date;
  dateTo?: Date;
  expirationFrom?: Date;
  expirationTo?: Date;
}

export interface CertificateSummary {
  totalCertificates: number;
  activeCertificates: number;
  expiredCertificates: number;
  expiringSoon: number;
  pendingRenewal: number;
  categoryCounts: Record<CertificateCategory, number>;
  recentAchievements: Certificate[];
  milestones: Milestone[];
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  achievedDate: Date;
  certificateCount: number;
  category?: CertificateCategory;
  isGuinnessWorthy: boolean;
}

export interface ExpirationAlert {
  id: string;
  certificateId: string;
  certificate: Certificate;
  alertDate: Date;
  daysUntilExpiration: number;
  acknowledged: boolean;
  reminderSent: boolean;
}
