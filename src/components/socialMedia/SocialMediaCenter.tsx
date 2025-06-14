
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Share2, 
  Users, 
  TrendingUp, 
  Shield, 
  Globe, 
  Zap,
  Eye,
  AlertTriangle,
  Settings,
  Play,
  Pause
} from 'lucide-react';
import { AgentDashboard } from './AgentDashboard';
import { PostScheduler } from './PostScheduler';
import { PlatformManager } from './PlatformManager';
import { EngagementMonitor } from './EngagementMonitor';
import { CensorshipManager } from './CensorshipManager';
import { TrendMonitor } from './TrendMonitor';
import { CampaignManager } from './CampaignManager';
import { AccessibilityControls } from './AccessibilityControls';
import type { SocialMediaAgent, SocialPost, SocialPlatform, SocialAccessibilityOptions } from '@/types/socialMedia';

interface SocialMediaCenterProps {
  agents: SocialMediaAgent[];
}

export const SocialMediaCenter = ({ agents }: SocialMediaCenterProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isAutoMode, setIsAutoMode] = useState(true);
  const [accessibilitySettings, setAccessibilitySettings] = useState<SocialAccessibilityOptions>({
    dyslexiaFont: false,
    highContrast: false,
    quietMode: false,
    minimalistUI: false,
    fontSize: 'medium',
    reducedMotion: false,
    screenReader: false
  });

  // Mock data for demonstration
  const [platforms] = useState<SocialPlatform[]>([
    {
      id: '1',
      name: 'Twitter/X',
      type: 'mainstream',
      region: ['Global'],
      censored: false,
      connected: true,
      followers: 15420,
      engagementRate: 3.2,
      lastPost: new Date()
    },
    {
      id: '2', 
      name: 'LinkedIn',
      type: 'mainstream',
      region: ['Global'],
      censored: false,
      connected: true,
      followers: 8930,
      engagementRate: 4.7,
      lastPost: new Date()
    },
    {
      id: '3',
      name: 'VK',
      type: 'regional',
      region: ['Russia', 'Eastern Europe'],
      censored: false,
      connected: false,
      followers: 0,
      engagementRate: 0,
      lastPost: new Date()
    },
    {
      id: '4',
      name: 'WeChat',
      type: 'regional',
      region: ['China'],
      censored: true,
      connected: false,
      followers: 0,
      engagementRate: 0,
      lastPost: new Date()
    }
  ]);

  const connectedPlatforms = platforms.filter(p => p.connected);
  const totalFollowers = platforms.reduce((sum, p) => sum + p.followers, 0);
  const avgEngagement = platforms.reduce((sum, p) => sum + p.engagementRate, 0) / platforms.length;

  const teamStats = {
    totalAgents: agents.length,
    activeAgents: agents.filter(a => a.status === 'active').length,
    avgPerformance: agents.reduce((acc, agent) => acc + agent.performanceScore, 0) / agents.length,
    totalPosts: agents.reduce((acc, agent) => acc + agent.postsCreated, 0),
    avgEngagement: agents.reduce((acc, agent) => acc + agent.engagementRate, 0) / agents.length
  };

  return (
    <div className={`space-y-6 ${accessibilitySettings.minimalistUI ? 'max-w-6xl mx-auto' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-3 ${
            accessibilitySettings.dyslexiaFont ? 'font-mono' : ''
          }`}>
            <Share2 className="w-8 h-8 text-blue-600" />
            Social Media Command Center
          </h1>
          <p className={`text-slate-600 mt-2 ${accessibilitySettings.dyslexiaFont ? 'font-mono' : ''}`}>
            Global multi-agent social media management with censorship workarounds
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant={isAutoMode ? "default" : "outline"}
            onClick={() => setIsAutoMode(!isAutoMode)}
            className={isAutoMode ? "bg-green-600" : ""}
          >
            {isAutoMode ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
            {isAutoMode ? 'Auto Mode' : 'Manual Mode'}
          </Button>
          <AccessibilityControls 
            settings={accessibilitySettings}
            onUpdate={setAccessibilitySettings}
          />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm text-blue-700 ${accessibilitySettings.dyslexiaFont ? 'font-mono' : ''}`}>
                  Active Agents
                </p>
                <p className={`text-2xl font-bold text-blue-900 ${accessibilitySettings.dyslexiaFont ? 'font-mono' : ''}`}>
                  {teamStats.activeAgents}/{teamStats.totalAgents}
                </p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm text-green-700 ${accessibilitySettings.dyslexiaFont ? 'font-mono' : ''}`}>
                  Connected Platforms
                </p>
                <p className={`text-2xl font-bold text-green-900 ${accessibilitySettings.dyslexiaFont ? 'font-mono' : ''}`}>
                  {connectedPlatforms.length}
                </p>
              </div>
              <Globe className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm text-purple-700 ${accessibilitySettings.dyslexiaFont ? 'font-mono' : ''}`}>
                  Total Followers
                </p>
                <p className={`text-2xl font-bold text-purple-900 ${accessibilitySettings.dyslexiaFont ? 'font-mono' : ''}`}>
                  {totalFollowers.toLocaleString()}
                </p>
              </div>
              <Eye className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm text-orange-700 ${accessibilitySettings.dyslexiaFont ? 'font-mono' : ''}`}>
                  Avg Engagement
                </p>
                <p className={`text-2xl font-bold text-orange-900 ${accessibilitySettings.dyslexiaFont ? 'font-mono' : ''}`}>
                  {avgEngagement.toFixed(1)}%
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm text-red-700 ${accessibilitySettings.dyslexiaFont ? 'font-mono' : ''}`}>
                  Posts Today
                </p>
                <p className={`text-2xl font-bold text-red-900 ${accessibilitySettings.dyslexiaFont ? 'font-mono' : ''}`}>
                  24
                </p>
              </div>
              <Zap className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 lg:grid-cols-8 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="agents">Agents</TabsTrigger>
          <TabsTrigger value="scheduler">Scheduler</TabsTrigger>
          <TabsTrigger value="platforms">Platforms</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="censorship">Censorship</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${accessibilitySettings.dyslexiaFont ? 'font-mono' : ''}`}>
                  <Users className="w-5 h-5" />
                  Agent Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {agents.slice(0, 4).map((agent) => (
                    <div key={agent.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div>
                        <h4 className={`font-medium ${accessibilitySettings.dyslexiaFont ? 'font-mono' : ''}`}>
                          {agent.name}
                        </h4>
                        <p className={`text-sm text-slate-600 ${accessibilitySettings.dyslexiaFont ? 'font-mono' : ''}`}>
                          {agent.currentTask}
                        </p>
                      </div>
                      <Badge className={
                        agent.status === 'active' ? 'bg-green-100 text-green-800' :
                        agent.status === 'posting' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }>
                        {agent.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${accessibilitySettings.dyslexiaFont ? 'font-mono' : ''}`}>
                  <Shield className="w-5 h-5" />
                  Global Access Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {platforms.map((platform) => (
                    <div key={platform.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          platform.connected ? 'bg-green-500' : 
                          platform.censored ? 'bg-red-500' : 'bg-gray-500'
                        }`} />
                        <div>
                          <h4 className={`font-medium ${accessibilitySettings.dyslexiaFont ? 'font-mono' : ''}`}>
                            {platform.name}
                          </h4>
                          <p className={`text-sm text-slate-600 ${accessibilitySettings.dyslexiaFont ? 'font-mono' : ''}`}>
                            {platform.region.join(', ')}
                          </p>
                        </div>
                      </div>
                      {platform.censored && (
                        <Badge variant="destructive">Censored</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="agents">
          <AgentDashboard agents={agents} settings={accessibilitySettings} />
        </TabsContent>

        <TabsContent value="scheduler">
          <PostScheduler settings={accessibilitySettings} platforms={platforms} />
        </TabsContent>

        <TabsContent value="platforms">
          <PlatformManager platforms={platforms} settings={accessibilitySettings} />
        </TabsContent>

        <TabsContent value="engagement">
          <EngagementMonitor settings={accessibilitySettings} />
        </TabsContent>

        <TabsContent value="censorship">
          <CensorshipManager settings={accessibilitySettings} />
        </TabsContent>

        <TabsContent value="trends">
          <TrendMonitor settings={accessibilitySettings} />
        </TabsContent>

        <TabsContent value="campaigns">
          <CampaignManager settings={accessibilitySettings} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
