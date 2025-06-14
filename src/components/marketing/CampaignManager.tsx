
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Target, 
  Users, 
  Calendar, 
  TrendingUp, 
  Lightbulb, 
  Play, 
  Pause, 
  BarChart3,
  Eye,
  Star,
  Zap
} from 'lucide-react';
import type { Campaign, MarketingAgent } from '@/types/marketing';

interface CampaignManagerProps {
  campaigns: Campaign[];
  agents: MarketingAgent[];
}

export const CampaignManager = ({ campaigns, agents }: CampaignManagerProps) => {
  const [activeView, setActiveView] = useState('active');

  // Mock campaign data
  const mockCampaigns: Campaign[] = [
    {
      id: '1',
      title: 'Breakthrough Brand Revolution',
      description: 'Revolutionary storytelling campaign combining AR experiences with emotional narratives',
      type: 'experiential',
      status: 'active',
      platforms: [
        { name: 'Instagram', type: 'social', priority: 'high', contentTypes: ['Stories', 'Reels', 'AR Filters'], scheduledPosts: 24, engagement: 8.7 },
        { name: 'TikTok', type: 'social', priority: 'high', contentTypes: ['Short Videos', 'Challenges'], scheduledPosts: 18, engagement: 12.3 },
        { name: 'Website', type: 'content', priority: 'medium', contentTypes: ['Interactive Experiences'], scheduledPosts: 6, engagement: 15.2 }
      ],
      targetAudience: {
        id: 'tech_innovators',
        name: 'Tech Innovators',
        demographics: {
          ageRange: '25-40',
          interests: ['Technology', 'Innovation', 'Startups'],
          behaviors: ['Early Adopters', 'Content Creators', 'Influencers'],
          platforms: ['Instagram', 'TikTok', 'LinkedIn']
        },
        psychographics: {
          values: ['Innovation', 'Creativity', 'Progress'],
          motivations: ['Status', 'Learning', 'Achievement'],
          painPoints: ['Information Overload', 'FOMO', 'Time Constraints'],
          contentPreferences: ['Video', 'Interactive', 'Educational']
        },
        size: 250000,
        engagement: 9.2,
        conversionRate: 4.8
      },
      assignedAgents: ['CreativeGenius-Alpha', 'CampaignMaestro-Delta'],
      timeline: {
        startDate: new Date('2024-06-01'),
        endDate: new Date('2024-08-31'),
        phases: [],
        milestones: []
      },
      metrics: {
        reach: 1250000,
        engagement: 9.7,
        conversions: 15420,
        roi: 3.4,
        brandLift: 23,
        organicReach: 380000,
        searchRanking: [],
        sentiment: 87,
        viralityScore: 8.9
      },
      creativeElements: [
        {
          id: '1',
          type: 'ar_vr',
          title: 'Brand Story AR Experience',
          description: 'Immersive AR filter that tells brand story through interactive elements',
          platform: 'Instagram',
          status: 'approved',
          innovationScore: 95,
          emotionalImpact: 92,
          engagementPrediction: 89
        }
      ],
      unconventionalChannels: ['AR Billboards', 'Voice Assistant Integration', 'Podcast Sponsorships']
    },
    {
      id: '2',
      title: 'SEO Content Domination',
      description: 'Comprehensive SEO-driven content strategy targeting emerging keywords',
      type: 'seo_campaign',
      status: 'planning',
      platforms: [
        { name: 'Blog', type: 'content', priority: 'high', contentTypes: ['Long-form Articles', 'Guides'], scheduledPosts: 16, engagement: 6.4 },
        { name: 'YouTube', type: 'video', priority: 'medium', contentTypes: ['Educational Videos'], scheduledPosts: 8, engagement: 11.2 }
      ],
      targetAudience: {
        id: 'seo_learners',
        name: 'SEO Learners',
        demographics: {
          ageRange: '28-45',
          interests: ['Digital Marketing', 'SEO', 'Content Marketing'],
          behaviors: ['Researchers', 'Learners', 'Implementers'],
          platforms: ['Google', 'YouTube', 'LinkedIn']
        },
        psychographics: {
          values: ['Knowledge', 'Growth', 'Results'],
          motivations: ['Career Advancement', 'Skill Development', 'Problem Solving'],
          painPoints: ['Algorithm Changes', 'Competition', 'Time Management'],
          contentPreferences: ['Educational', 'Data-Driven', 'Actionable']
        },
        size: 180000,
        engagement: 7.8,
        conversionRate: 6.2
      },
      assignedAgents: ['SEOMaster-Beta'],
      timeline: {
        startDate: new Date('2024-07-01'),
        endDate: new Date('2024-12-31'),
        phases: [],
        milestones: []
      },
      metrics: {
        reach: 850000,
        engagement: 7.1,
        conversions: 8940,
        roi: 2.8,
        brandLift: 18,
        organicReach: 520000,
        searchRanking: [
          { keyword: 'AI marketing tools', position: 3, volume: 12000, difficulty: 65, trend: 'rising' },
          { keyword: 'content optimization', position: 7, volume: 8500, difficulty: 58, trend: 'stable' }
        ],
        sentiment: 81,
        viralityScore: 6.2
      },
      creativeElements: [],
      unconventionalChannels: ['Podcast Guest Appearances', 'Reddit AMAs', 'Industry Newsletters']
    }
  ];

  const getCampaignTypeColor = (type: string) => {
    switch (type) {
      case 'experiential': return 'bg-purple-100 text-purple-800';
      case 'seo_campaign': return 'bg-green-100 text-green-800';
      case 'social_media': return 'bg-blue-100 text-blue-800';
      case 'content_series': return 'bg-orange-100 text-orange-800';
      case 'interactive': return 'bg-pink-100 text-pink-800';
      case 'storytelling': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'planning': return 'bg-blue-500';
      case 'analyzing': return 'bg-yellow-500';
      case 'completed': return 'bg-purple-500';
      case 'paused': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Campaign Management</h2>
          <p className="text-slate-600">Orchestrate breakthrough marketing campaigns</p>
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
          <Lightbulb className="w-4 h-4 mr-2" />
          Create Campaign
        </Button>
      </div>

      <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
        <TabsList>
          <TabsTrigger value="active">Active Campaigns</TabsTrigger>
          <TabsTrigger value="planning">In Planning</TabsTrigger>
          <TabsTrigger value="analytics">Performance Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          <div className="grid gap-6">
            {mockCampaigns.filter(c => c.status === 'active').map((campaign) => (
              <Card key={campaign.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(campaign.status)}`} />
                        <CardTitle className="text-xl">{campaign.title}</CardTitle>
                        <Badge className={getCampaignTypeColor(campaign.type)}>
                          {campaign.type.replace('_', ' ')}
                        </Badge>
                      </div>
                      <CardDescription className="text-base">{campaign.description}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Pause className="w-4 h-4" />
                      </Button>
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{(campaign.metrics.reach / 1000000).toFixed(1)}M</div>
                      <div className="text-sm text-slate-600">Reach</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{campaign.metrics.engagement}%</div>
                      <div className="text-sm text-slate-600">Engagement</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{campaign.metrics.roi}x</div>
                      <div className="text-sm text-slate-600">ROI</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">{campaign.metrics.viralityScore}</div>
                      <div className="text-sm text-slate-600">Virality Score</div>
                    </div>
                  </div>

                  {/* Platforms */}
                  <div>
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Active Platforms
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {campaign.platforms.map((platform, index) => (
                        <div key={index} className="p-3 bg-slate-50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{platform.name}</span>
                            <Badge variant="outline" className={
                              platform.priority === 'high' ? 'border-red-500 text-red-700' :
                              platform.priority === 'medium' ? 'border-yellow-500 text-yellow-700' :
                              'border-green-500 text-green-700'
                            }>
                              {platform.priority}
                            </Badge>
                          </div>
                          <div className="text-sm text-slate-600">
                            <div>Posts: {platform.scheduledPosts}</div>
                            <div>Engagement: {platform.engagement}%</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Assigned Team */}
                  <div>
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Assigned Team
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {campaign.assignedAgents.map((agentName, index) => (
                        <Badge key={index} className="bg-purple-100 text-purple-800">
                          {agentName}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Unconventional Channels */}
                  <div>
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      Breakthrough Channels
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {campaign.unconventionalChannels.map((channel, index) => (
                        <Badge key={index} variant="outline" className="border-purple-300 text-purple-700">
                          {channel}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Progress & Timeline */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Campaign Progress</span>
                      <span className="text-sm text-slate-600">
                        {campaign.timeline.startDate.toLocaleDateString()} - {campaign.timeline.endDate.toLocaleDateString()}
                      </span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="planning">
          <div className="grid gap-6">
            {mockCampaigns.filter(c => c.status === 'planning').map((campaign) => (
              <Card key={campaign.id} className="hover:shadow-lg transition-shadow border-dashed">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(campaign.status)}`} />
                        <CardTitle className="text-xl">{campaign.title}</CardTitle>
                        <Badge className={getCampaignTypeColor(campaign.type)}>
                          {campaign.type.replace('_', ' ')}
                        </Badge>
                      </div>
                      <CardDescription className="text-base">{campaign.description}</CardDescription>
                    </div>
                    <Button className="bg-green-600 hover:bg-green-700">
                      <Play className="w-4 h-4 mr-2" />
                      Launch Campaign
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Planning Status</h4>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Strategy Complete
                        </span>
                        <span className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          Content in Progress
                        </span>
                        <span className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                          Testing Pending
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Target Audience</h4>
                      <div className="text-sm text-slate-600">
                        {campaign.targetAudience.name} • {(campaign.targetAudience.size / 1000).toFixed(0)}k reach • {campaign.targetAudience.engagement}% engagement
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Campaign Performance Analytics
              </CardTitle>
              <CardDescription>Deep insights into campaign effectiveness and ROI</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-slate-500">
                <TrendingUp className="w-12 h-12 mx-auto mb-4" />
                <p>Advanced analytics dashboard coming soon...</p>
                <p className="text-sm">Track performance, engagement, and ROI across all campaigns</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
