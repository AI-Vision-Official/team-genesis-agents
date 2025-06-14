
import type { SocialMediaAgent } from '@/types/socialMedia';

export const mockSocialMediaAgents: SocialMediaAgent[] = [
  {
    id: '1',
    name: 'SocialMaster-Alpha',
    specialization: 'content_creator',
    status: 'active',
    currentTask: 'Creating multi-platform campaign content',
    platforms: [
      { id: '1', name: 'Twitter/X', type: 'mainstream', region: ['Global'], censored: false, connected: true, followers: 15420, engagementRate: 3.2, lastPost: new Date() },
      { id: '2', name: 'LinkedIn', type: 'mainstream', region: ['Global'], censored: false, connected: true, followers: 8930, engagementRate: 4.7, lastPost: new Date() }
    ],
    languages: ['English', 'Spanish', 'French', 'Dutch'],
    performanceScore: 94,
    postsCreated: 156,
    engagementRate: 4.2
  },
  {
    id: '2',
    name: 'EngagementBot-Beta',
    specialization: 'engagement_manager',
    status: 'monitoring',
    currentTask: 'Monitoring global engagement and sentiment',
    platforms: [
      { id: '3', name: 'Instagram', type: 'mainstream', region: ['Global'], censored: false, connected: true, followers: 12300, engagementRate: 5.8, lastPost: new Date() },
      { id: '4', name: 'TikTok', type: 'mainstream', region: ['Global'], censored: true, connected: false, followers: 0, engagementRate: 0, lastPost: new Date() }
    ],
    languages: ['English', 'Chinese', 'Japanese'],
    performanceScore: 89,
    postsCreated: 89,
    engagementRate: 6.1
  },
  {
    id: '3',
    name: 'TrendScout-Gamma',
    specialization: 'trend_monitor',
    status: 'analyzing',
    currentTask: 'Analyzing emerging trends in AI and technology',
    platforms: [
      { id: '5', name: 'Reddit', type: 'alternative', region: ['Global'], censored: false, connected: true, followers: 5400, engagementRate: 7.2, lastPost: new Date() },
      { id: '6', name: 'Discord', type: 'messaging', region: ['Global'], censored: false, connected: true, followers: 3200, engagementRate: 12.4, lastPost: new Date() }
    ],
    languages: ['English', 'German', 'Russian'],
    performanceScore: 92,
    postsCreated: 67,
    engagementRate: 8.3
  }
];
