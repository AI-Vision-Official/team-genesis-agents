
export interface SpecializedAgent {
  id: string;
  name: string;
  type: 'ethics_privacy' | 'emotional_wellness' | 'continuity_recovery' | 'community_feedback' | 'learning_development';
  status: 'active' | 'monitoring' | 'alerting' | 'responding' | 'idle';
  autonomyLevel: 'low' | 'medium' | 'high' | 'full';
  currentActivity: string;
  monitoringMetrics: MonitoringMetric[];
  alerts: AgentAlert[];
  capabilities: string[];
  performanceScore: number;
  lastAction: Date;
  createdAt: Date;
}

export interface MonitoringMetric {
  id: string;
  name: string;
  value: number;
  threshold: number;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  trend: 'increasing' | 'decreasing' | 'stable';
  lastUpdated: Date;
}

export interface AgentAlert {
  id: string;
  agentId: string;
  type: 'ethics_violation' | 'privacy_concern' | 'wellness_warning' | 'system_threat' | 'feedback_critical' | 'learning_opportunity';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  recommendations: string[];
  timestamp: Date;
  acknowledged: boolean;
  resolved: boolean;
  autoResponse?: string;
}

export interface EthicsPrivacyMetrics {
  dataAccessEvents: number;
  privacyComplianceScore: number;
  ethicsViolations: number;
  dataRetentionCompliance: number;
  consentManagement: number;
  auditScore: number;
}

export interface WellnessMetrics {
  teamWorkloadAverage: number;
  stressIndicators: number;
  breakReminders: number;
  positiveInteractions: number;
  burnoutRisk: number;
  workLifeBalance: number;
}

export interface ContinuityMetrics {
  systemUptime: number;
  backupStatus: number;
  securityThreats: number;
  recoveryReadiness: number;
  dataIntegrity: number;
  emergencyProtocols: number;
}

export interface FeedbackMetrics {
  feedbackVolume: number;
  satisfactionScore: number;
  criticalIssues: number;
  featureRequests: number;
  responseTime: number;
  implementationRate: number;
}

export interface LearningMetrics {
  skillAssessments: number;
  trainingProgress: number;
  resourceUtilization: number;
  knowledgeGaps: number;
  certificationProgress: number;
  mentorshipSessions: number;
}
