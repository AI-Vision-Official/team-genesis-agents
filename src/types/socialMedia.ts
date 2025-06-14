
export interface SocialMediaAgent {
  id: string;
  name: string;
  specialization: 'content_creator' | 'engagement_manager' | 'analytics_specialist' | 'crisis_communicator' | 'trend_monitor';
  status: 'active' | 'idle' | 'posting' | 'analyzing' | 'monitoring';
  currentTask: string;
  platforms: SocialPlatform[];
  languages: string[];
  performanceScore: number;
  postsCreated: number;
  engagementRate: number;
}

export interface SocialPlatform {
  id: string;
  name: string;
  type: 'mainstream' | 'alternative' | 'messaging' | 'regional';
  region: string[];
  censored: boolean;
  connected: boolean;
  followers: number;
  engagementRate: number;
  lastPost: Date;
}

export interface SocialPost {
  id: string;
  content: string;
  platforms: string[];
  status: 'draft' | 'scheduled' | 'posted' | 'failed' | 'review_needed';
  scheduledTime: Date;
  createdBy: string;
  language: string;
  adaptations: PlatformAdaptation[];
  engagement: PostEngagement;
  ethicsScore: number;
  requiresApproval: boolean;
}

export interface PlatformAdaptation {
  platform: string;
  adaptedContent: string;
  hashtags: string[];
  media: MediaAttachment[];
  culturalNotes: string[];
}

export interface MediaAttachment {
  id: string;
  type: 'image' | 'video' | 'gif' | 'audio';
  url: string;
  altText: string;
  platformOptimized: boolean;
}

export interface PostEngagement {
  likes: number;
  shares: number;
  comments: number;
  reach: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  crisisAlert: boolean;
}

export interface CensorshipWorkaround {
  id: string;
  country: string;
  blockedPlatforms: string[];
  alternatives: string[];
  vpnRecommendations: string[];
  mirrorSites: string[];
  lastUpdated: Date;
}

export interface SocialCampaign {
  id: string;
  name: string;
  objective: string;
  targetAudience: AudienceSegment[];
  platforms: string[];
  startDate: Date;
  endDate: Date;
  budget: number;
  kpis: CampaignKPI[];
  posts: string[];
  performance: CampaignPerformance;
}

export interface AudienceSegment {
  id: string;
  name: string;
  demographics: {
    ageRange: string;
    location: string[];
    languages: string[];
    interests: string[];
  };
  platforms: string[];
  size: number;
}

export interface CampaignKPI {
  name: string;
  target: number;
  current: number;
  unit: string;
}

export interface CampaignPerformance {
  reach: number;
  engagement: number;
  conversions: number;
  roi: number;
  costPerEngagement: number;
}

export interface TrendAnalysis {
  id: string;
  trend: string;
  platforms: string[];
  regions: string[];
  urgency: 'low' | 'medium' | 'high' | 'crisis';
  sentiment: number;
  volume: number;
  relatedHashtags: string[];
  suggestedActions: string[];
  detectedAt: Date;
}

export interface SocialAccessibilityOptions {
  dyslexiaFont: boolean;
  highContrast: boolean;
  quietMode: boolean;
  minimalistUI: boolean;
  fontSize: 'small' | 'medium' | 'large';
  reducedMotion: boolean;
  screenReader: boolean;
}
