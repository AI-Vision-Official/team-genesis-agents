
export interface MarketingAgent {
  id: string;
  name: string;
  specialization: 'content_strategy' | 'seo_specialist' | 'audience_analyst' | 'campaign_manager' | 'creative_director' | 'data_analyst';
  status: 'active' | 'idle' | 'analyzing' | 'creating' | 'optimizing';
  currentProject: string;
  expertise: string[];
  performanceScore: number;
  campaignsCompleted: number;
  creativityRating: number;
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  type: 'content_series' | 'seo_campaign' | 'social_media' | 'experiential' | 'interactive' | 'storytelling';
  status: 'planning' | 'active' | 'analyzing' | 'completed' | 'paused';
  platforms: Platform[];
  targetAudience: AudienceSegment;
  assignedAgents: string[];
  timeline: CampaignTimeline;
  metrics: CampaignMetrics;
  creativeElements: CreativeElement[];
  unconventionalChannels: string[];
}

export interface Platform {
  name: string;
  type: 'social' | 'search' | 'content' | 'email' | 'video' | 'interactive' | 'emerging';
  priority: 'high' | 'medium' | 'low';
  contentTypes: string[];
  scheduledPosts: number;
  engagement: number;
}

export interface AudienceSegment {
  id: string;
  name: string;
  demographics: {
    ageRange: string;
    interests: string[];
    behaviors: string[];
    platforms: string[];
  };
  psychographics: {
    values: string[];
    motivations: string[];
    painPoints: string[];
    contentPreferences: string[];
  };
  size: number;
  engagement: number;
  conversionRate: number;
}

export interface CampaignTimeline {
  startDate: Date;
  endDate: Date;
  phases: CampaignPhase[];
  milestones: Milestone[];
}

export interface CampaignPhase {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  deliverables: string[];
  status: 'upcoming' | 'active' | 'completed';
}

export interface Milestone {
  id: string;
  title: string;
  date: Date;
  description: string;
  achieved: boolean;
  kpi: string;
  target: number;
  actual?: number;
}

export interface CampaignMetrics {
  reach: number;
  engagement: number;
  conversions: number;
  roi: number;
  brandLift: number;
  organicReach: number;
  searchRanking: SEORanking[];
  sentiment: number;
  viralityScore: number;
}

export interface SEORanking {
  keyword: string;
  position: number;
  volume: number;
  difficulty: number;
  trend: 'rising' | 'stable' | 'declining';
}

export interface CreativeElement {
  id: string;
  type: 'video' | 'image' | 'audio' | 'interactive' | 'ar_vr' | 'text' | 'experiential';
  title: string;
  description: string;
  platform: string;
  status: 'concept' | 'production' | 'review' | 'approved' | 'published';
  innovationScore: number;
  emotionalImpact: number;
  engagementPrediction: number;
}

export interface ContentStrategy {
  id: string;
  title: string;
  description: string;
  targetAudience: string[];
  contentPillars: ContentPillar[];
  toneOfVoice: ToneOfVoice;
  distributionStrategy: DistributionStrategy;
  seoStrategy: SEOStrategy;
  unconventionalApproaches: string[];
}

export interface ContentPillar {
  name: string;
  description: string;
  percentage: number;
  contentTypes: string[];
  keyMessages: string[];
}

export interface ToneOfVoice {
  personality: string[];
  style: string;
  emotionalTone: string;
  language: string;
  examples: string[];
}

export interface DistributionStrategy {
  primaryChannels: string[];
  secondaryChannels: string[];
  unconventionalChannels: string[];
  crossPlatformSynergy: string[];
  timing: PostingSchedule[];
}

export interface PostingSchedule {
  platform: string;
  frequency: string;
  optimalTimes: string[];
  contentMix: { [key: string]: number };
}

export interface SEOStrategy {
  primaryKeywords: string[];
  longTailKeywords: string[];
  contentGaps: string[];
  competitorAnalysis: CompetitorInsight[];
  technicalOptimizations: string[];
  linkBuildingStrategy: string[];
}

export interface CompetitorInsight {
  competitor: string;
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  keywordGaps: string[];
}

export interface MarketingInsight {
  id: string;
  type: 'audience_behavior' | 'trend_analysis' | 'competitor_move' | 'performance_anomaly' | 'opportunity';
  title: string;
  description: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  urgency: 'immediate' | 'short_term' | 'long_term';
  actionable: boolean;
  suggestedActions: string[];
  dataSource: string;
  timestamp: Date;
  relevantCampaigns: string[];
}
