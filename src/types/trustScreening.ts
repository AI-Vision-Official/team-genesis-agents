
export interface IdentityVerificationRequest {
  name: string;
  email?: string;
  phone?: string;
  photo?: string;
}

export interface IdentityVerificationResult {
  matches: IdentityMatch[];
  riskScore: number;
  summary: string;
  breachRecords: BreachRecord[];
  confidence: number;
}

export interface IdentityMatch {
  platform: string;
  profileUrl?: string;
  confidence: number;
  lastSeen?: string;
  verified: boolean;
}

export interface BreachRecord {
  source: string;
  date: string;
  type: 'email' | 'phone' | 'password' | 'personal';
  severity: 'low' | 'medium' | 'high';
}

export interface IPLocationResult {
  ip: string;
  country: string;
  region: string;
  city: string;
  isp: string;
  isProxy: boolean;
  isVPN: boolean;
  threatScore: number;
  hostingProvider?: string;
  organization?: string;
}

export interface NetworkAnalysisResult {
  name: string;
  linkedPlatforms: LinkedPlatform[];
  redFlags: RedFlag[];
  confidence: number;
  lastUpdated: string;
}

export interface LinkedPlatform {
  name: string;
  url?: string;
  verified: boolean;
  activity: 'active' | 'inactive' | 'suspended';
  joinDate?: string;
}

export interface RedFlag {
  type: 'scam_alias' | 'fraud_record' | 'multiple_identities' | 'suspicious_activity';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  source: string;
}

export interface PublicRecord {
  type: 'business' | 'sanction' | 'fraud' | 'court' | 'regulatory';
  source: string;
  title: string;
  description: string;
  date: string;
  severity: 'info' | 'warning' | 'critical';
  url?: string;
}

export interface PhotoReverseResult {
  originalUrl?: string;
  similarImages: SimilarImage[];
  platforms: string[];
  possibleClone: boolean;
  confidence: number;
}

export interface SimilarImage {
  url: string;
  platform: string;
  similarity: number;
  context?: string;
}

export interface TrustProfile {
  overallScore: number;
  empathyScore: number;
  manipulationMarkers: ManipulationMarker[];
  emotionalIndicators: EmotionalIndicator[];
  summary: string;
  recommendations: string[];
}

export interface ManipulationMarker {
  type: 'love_bombing' | 'gaslighting' | 'urgency_pressure' | 'isolation' | 'financial_pressure';
  confidence: number;
  evidence: string[];
}

export interface EmotionalIndicator {
  type: 'emotional_volatility' | 'empathy_deficit' | 'boundary_violation' | 'control_seeking';
  level: 'low' | 'medium' | 'high';
  description: string;
}

export interface ScreeningReport {
  id: string;
  subject: string;
  createdAt: Date;
  identity?: IdentityVerificationResult;
  ipLocation?: IPLocationResult;
  networkAnalysis?: NetworkAnalysisResult;
  publicRecords?: PublicRecord[];
  photoReverse?: PhotoReverseResult;
  trustProfile?: TrustProfile;
  notes: string;
}
