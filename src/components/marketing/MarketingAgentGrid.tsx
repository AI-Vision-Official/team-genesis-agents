
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  Palette, 
  Search, 
  Users, 
  Target, 
  BarChart3, 
  Megaphone,
  Settings,
  TrendingUp,
  Star
} from 'lucide-react';
import type { MarketingAgent } from '@/types/marketing';

interface MarketingAgentGridProps {
  agents: MarketingAgent[];
}

export const MarketingAgentGrid = ({ agents }: MarketingAgentGridProps) => {
  const getSpecializationIcon = (specialization: string) => {
    switch (specialization) {
      case 'creative_director': return <Palette className="w-5 h-5 text-purple-600" />;
      case 'seo_specialist': return <Search className="w-5 h-5 text-green-600" />;
      case 'audience_analyst': return <Users className="w-5 h-5 text-blue-600" />;
      case 'campaign_manager': return <Target className="w-5 h-5 text-orange-600" />;
      case 'content_strategy': return <Brain className="w-5 h-5 text-indigo-600" />;
      case 'data_analyst': return <BarChart3 className="w-5 h-5 text-pink-600" />;
      default: return <Megaphone className="w-5 h-5 text-gray-600" />;
    }
  };

  const getSpecializationColor = (specialization: string) => {
    switch (specialization) {
      case 'creative_director': return 'from-purple-50 to-purple-100 border-purple-200';
      case 'seo_specialist': return 'from-green-50 to-green-100 border-green-200';
      case 'audience_analyst': return 'from-blue-50 to-blue-100 border-blue-200';
      case 'campaign_manager': return 'from-orange-50 to-orange-100 border-orange-200';
      case 'content_strategy': return 'from-indigo-50 to-indigo-100 border-indigo-200';
      case 'data_analyst': return 'from-pink-50 to-pink-100 border-pink-200';
      default: return 'from-gray-50 to-gray-100 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'creating': return 'bg-purple-100 text-purple-800';
      case 'analyzing': return 'bg-blue-100 text-blue-800';
      case 'optimizing': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSpecializationTitle = (specialization: string) => {
    switch (specialization) {
      case 'creative_director': return 'Creative Director';
      case 'seo_specialist': return 'SEO Specialist';
      case 'audience_analyst': return 'Audience Analyst';
      case 'campaign_manager': return 'Campaign Manager';
      case 'content_strategy': return 'Content Strategist';
      case 'data_analyst': return 'Data Analyst';
      default: return 'Marketing Specialist';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Marketing AI Agents</h2>
          <p className="text-slate-600">Manage your specialized marketing team</p>
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
          <Brain className="w-4 h-4 mr-2" />
          Create New Agent
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <Card key={agent.id} className={`hover:shadow-lg transition-shadow bg-gradient-to-br ${getSpecializationColor(agent.specialization)}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {getSpecializationIcon(agent.specialization)}
                  <div>
                    <CardTitle className="text-lg">{agent.name}</CardTitle>
                    <CardDescription className="font-medium">
                      {getSpecializationTitle(agent.specialization)}
                    </CardDescription>
                  </div>
                </div>
                <Badge className={getStatusColor(agent.status)}>
                  {agent.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-sm mb-1">Current Project</h4>
                <p className="text-sm text-slate-600">{agent.currentProject}</p>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Performance Score</span>
                    <span>{agent.performanceScore}%</span>
                  </div>
                  <Progress value={agent.performanceScore} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Creativity Rating</span>
                    <span>{agent.creativityRating}%</span>
                  </div>
                  <Progress value={agent.creativityRating} className="h-2" />
                </div>
              </div>

              <div>
                <h4 className="font-medium text-sm mb-2">Core Expertise</h4>
                <div className="flex flex-wrap gap-1">
                  {agent.expertise.slice(0, 3).map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {agent.expertise.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{agent.expertise.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-slate-600">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  <span>{agent.campaignsCompleted} campaigns</span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>Trending up</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700">
                  View Details
                </Button>
                <Button size="sm" variant="outline">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Agent Creation Prompt */}
      <Card className="border-dashed border-2 border-slate-300 hover:border-purple-400 transition-colors">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <Brain className="w-12 h-12 text-slate-400 mb-4" />
          <h3 className="text-lg font-medium text-slate-600 mb-2">Create Your Next Marketing Specialist</h3>
          <p className="text-sm text-slate-500 mb-4 max-w-md">
            Add a new AI agent with specialized skills in content creation, SEO, audience analysis, or campaign management
          </p>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
            <Brain className="w-4 h-4 mr-2" />
            Create Marketing Agent
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
