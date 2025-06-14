
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Bot, 
  TrendingUp, 
  MessageSquare, 
  BarChart3, 
  AlertTriangle,
  Plus,
  Settings,
  Play,
  Pause
} from 'lucide-react';
import type { SocialMediaAgent, SocialAccessibilityOptions } from '@/types/socialMedia';

interface AgentDashboardProps {
  agents: SocialMediaAgent[];
  settings: SocialAccessibilityOptions;
}

export const AgentDashboard = ({ agents, settings }: AgentDashboardProps) => {
  const getSpecializationIcon = (specialization: string) => {
    switch (specialization) {
      case 'content_creator': return <MessageSquare className="w-5 h-5" />;
      case 'engagement_manager': return <TrendingUp className="w-5 h-5" />;
      case 'analytics_specialist': return <BarChart3 className="w-5 h-5" />;
      case 'crisis_communicator': return <AlertTriangle className="w-5 h-5" />;
      case 'trend_monitor': return <TrendingUp className="w-5 h-5" />;
      default: return <Bot className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'posting': return 'bg-blue-100 text-blue-800';
      case 'analyzing': return 'bg-purple-100 text-purple-800';
      case 'monitoring': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            🤖 Social Media Agents
          </h2>
          <p className={`text-gray-600 mt-1 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            AI specialists managing your global social media presence
          </p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Agent
          </Button>
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Team Settings
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <Card key={agent.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    {getSpecializationIcon(agent.specialization)}
                  </div>
                  <div>
                    <CardTitle className={`text-lg ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                      {agent.name}
                    </CardTitle>
                    <CardDescription className={settings.dyslexiaFont ? 'font-mono' : ''}>
                      {agent.specialization.replace('_', ' ').toUpperCase()}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost">
                    <Play className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                  Status
                </span>
                <Badge className={getStatusColor(agent.status)}>
                  {agent.status}
                </Badge>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className={settings.dyslexiaFont ? 'font-mono' : ''}>Performance</span>
                  <span className={settings.dyslexiaFont ? 'font-mono' : ''}>{agent.performanceScore}%</span>
                </div>
                <Progress value={agent.performanceScore} className="h-2" />
              </div>

              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span className={`text-gray-600 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>Current Task:</span>
                  <span className={`font-medium ${settings.dyslexiaFont ? 'font-mono' : ''}`}>Processing</span>
                </div>
                <p className={`text-gray-700 text-xs ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                  {agent.currentTask}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className={`text-gray-600 block ${settings.dyslexiaFont ? 'font-mono' : ''}`}>Posts Created</span>
                  <span className={`font-bold text-lg ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                    {agent.postsCreated}
                  </span>
                </div>
                <div>
                  <span className={`text-gray-600 block ${settings.dyslexiaFont ? 'font-mono' : ''}`}>Engagement</span>
                  <span className={`font-bold text-lg ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                    {agent.engagementRate.toFixed(1)}%
                  </span>
                </div>
              </div>

              <div>
                <span className={`text-sm text-gray-600 block mb-2 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                  Platforms ({agent.platforms.length})
                </span>
                <div className="flex flex-wrap gap-1">
                  {agent.platforms.slice(0, 3).map((platform) => (
                    <Badge key={platform.id} variant="outline" className="text-xs">
                      {platform.name}
                    </Badge>
                  ))}
                  {agent.platforms.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{agent.platforms.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              <div>
                <span className={`text-sm text-gray-600 block mb-2 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                  Languages ({agent.languages.length})
                </span>
                <div className="flex flex-wrap gap-1">
                  {agent.languages.slice(0, 3).map((lang) => (
                    <Badge key={lang} variant="secondary" className="text-xs">
                      {lang}
                    </Badge>
                  ))}
                  {agent.languages.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{agent.languages.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
