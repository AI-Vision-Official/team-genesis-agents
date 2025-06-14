
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  TrendingUp, 
  Users, 
  Target, 
  Lightbulb, 
  BarChart3,
  Search,
  Palette,
  Megaphone,
  Eye,
  Zap
} from 'lucide-react';
import { MarketingAgentGrid } from './MarketingAgentGrid';
import { CampaignManager } from './CampaignManager';
import { AudienceAnalyzer } from './AudienceAnalyzer';
import { CreativeStudio } from './CreativeStudio';
import { SEOOptimizer } from './SEOOptimizer';
import { MarketingInsights } from './MarketingInsights';
import type { MarketingAgent, Campaign, MarketingInsight } from '@/types/marketing';

export const MarketingAICenter = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [marketingAgents, setMarketingAgents] = useState<MarketingAgent[]>([]);
  const [activeCampaigns, setActiveCampaigns] = useState<Campaign[]>([]);
  const [insights, setInsights] = useState<MarketingInsight[]>([]);

  useEffect(() => {
    // Initialize mock data
    const mockAgents: MarketingAgent[] = [
      {
        id: '1',
        name: 'CreativeGenius-Alpha',
        specialization: 'creative_director',
        status: 'creating',
        currentProject: 'Breakthrough Brand Campaign',
        expertise: ['Storytelling', 'Visual Design', 'Brand Strategy', 'Emotional Marketing'],
        performanceScore: 96,
        campaignsCompleted: 23,
        creativityRating: 98
      },
      {
        id: '2',
        name: 'SEOMaster-Beta',
        specialization: 'seo_specialist',
        status: 'optimizing',
        currentProject: 'Organic Growth Initiative',
        expertise: ['Technical SEO', 'Content Optimization', 'Keyword Research', 'Link Building'],
        performanceScore: 94,
        campaignsCompleted: 41,
        creativityRating: 85
      },
      {
        id: '3',
        name: 'AudienceWhisperer-Gamma',
        specialization: 'audience_analyst',
        status: 'analyzing',
        currentProject: 'Emerging Market Analysis',
        expertise: ['Behavioral Analysis', 'Psychographics', 'Trend Prediction', 'Segmentation'],
        performanceScore: 92,
        campaignsCompleted: 18,
        creativityRating: 91
      },
      {
        id: '4',
        name: 'CampaignMaestro-Delta',
        specialization: 'campaign_manager',
        status: 'active',
        currentProject: 'Multi-Platform Launch',
        expertise: ['Project Management', 'Cross-Platform Strategy', 'Budget Optimization', 'Timeline Management'],
        performanceScore: 89,
        campaignsCompleted: 67,
        creativityRating: 87
      }
    ];

    const mockInsights: MarketingInsight[] = [
      {
        id: '1',
        type: 'trend_analysis',
        title: 'AI-Generated Content Surge',
        description: 'Detection of 340% increase in AI-related content engagement across target demographics',
        confidence: 95,
        impact: 'high',
        urgency: 'immediate',
        actionable: true,
        suggestedActions: ['Create AI-focused content series', 'Launch educational campaign about AI benefits'],
        dataSource: 'Social Media Analytics',
        timestamp: new Date(),
        relevantCampaigns: ['1', '2']
      },
      {
        id: '2',
        type: 'audience_behavior',
        title: 'Interactive Content Preference Shift',
        description: 'Target audience showing 280% higher engagement with interactive and experiential content',
        confidence: 89,
        impact: 'medium',
        urgency: 'short_term',
        actionable: true,
        suggestedActions: ['Develop AR/VR experiences', 'Create interactive storytelling campaigns'],
        dataSource: 'Engagement Analytics',
        timestamp: new Date(),
        relevantCampaigns: ['1']
      }
    ];

    setMarketingAgents(mockAgents);
    setInsights(mockInsights);
  }, []);

  const getSpecializationIcon = (specialization: string) => {
    switch (specialization) {
      case 'creative_director': return <Palette className="w-5 h-5" />;
      case 'seo_specialist': return <Search className="w-5 h-5" />;
      case 'audience_analyst': return <Users className="w-5 h-5" />;
      case 'campaign_manager': return <Target className="w-5 h-5" />;
      case 'content_strategy': return <Brain className="w-5 h-5" />;
      case 'data_analyst': return <BarChart3 className="w-5 h-5" />;
      default: return <Megaphone className="w-5 h-5" />;
    }
  };

  const teamStats = {
    totalAgents: marketingAgents.length,
    avgPerformance: marketingAgents.reduce((acc, agent) => acc + agent.performanceScore, 0) / marketingAgents.length,
    avgCreativity: marketingAgents.reduce((acc, agent) => acc + agent.creativityRating, 0) / marketingAgents.length,
    totalCampaigns: marketingAgents.reduce((acc, agent) => acc + agent.campaignsCompleted, 0),
    activeProjects: marketingAgents.filter(agent => agent.status === 'active' || agent.status === 'creating').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-3">
            <Megaphone className="w-8 h-8 text-purple-600" />
            Marketing AI Specialists
          </h1>
          <p className="text-slate-600 mt-2">Creative, data-driven marketing agents for breakthrough campaigns</p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
            <Lightbulb className="w-4 h-4 mr-2" />
            New Campaign
          </Button>
          <Button variant="outline">
            <Brain className="w-4 h-4 mr-2" />
            Create Agent
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700">Active Agents</p>
                <p className="text-2xl font-bold text-purple-900">{teamStats.totalAgents}</p>
              </div>
              <Brain className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-pink-700">Avg Performance</p>
                <p className="text-2xl font-bold text-pink-900">{teamStats.avgPerformance.toFixed(1)}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-pink-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-700">Creativity Score</p>
                <p className="text-2xl font-bold text-orange-900">{teamStats.avgCreativity.toFixed(1)}%</p>
              </div>
              <Palette className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700">Campaigns</p>
                <p className="text-2xl font-bold text-blue-900">{teamStats.totalCampaigns}</p>
              </div>
              <Target className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700">Active Projects</p>
                <p className="text-2xl font-bold text-green-900">{teamStats.activeProjects}</p>
              </div>
              <Zap className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-6 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="agents">Agents</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="creative">Creative Studio</TabsTrigger>
          <TabsTrigger value="seo">SEO Hub</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <MarketingInsights insights={insights} />
          
          {/* Active Agents Quick View */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Active Marketing Specialists
              </CardTitle>
              <CardDescription>Real-time status of your marketing AI team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {marketingAgents.map((agent) => (
                  <div key={agent.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      {getSpecializationIcon(agent.specialization)}
                      <div>
                        <h4 className="font-medium">{agent.name}</h4>
                        <p className="text-sm text-slate-600">{agent.currentProject}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge className={
                        agent.status === 'active' ? 'bg-green-100 text-green-800' :
                        agent.status === 'creating' ? 'bg-purple-100 text-purple-800' :
                        agent.status === 'analyzing' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }>
                        {agent.status}
                      </Badge>
                      <div className="text-right">
                        <div className="text-sm font-medium">Performance: {agent.performanceScore}%</div>
                        <div className="text-xs text-slate-600">Creativity: {agent.creativityRating}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="agents">
          <MarketingAgentGrid agents={marketingAgents} />
        </TabsContent>

        <TabsContent value="campaigns">
          <CampaignManager campaigns={activeCampaigns} agents={marketingAgents} />
        </TabsContent>

        <TabsContent value="audience">
          <AudienceAnalyzer />
        </TabsContent>

        <TabsContent value="creative">
          <CreativeStudio />
        </TabsContent>

        <TabsContent value="seo">
          <SEOOptimizer />
        </TabsContent>
      </Tabs>
    </div>
  );
};
