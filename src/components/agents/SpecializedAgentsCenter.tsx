
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  Heart, 
  Zap, 
  MessageSquare, 
  GraduationCap,
  AlertTriangle,
  Activity,
  TrendingUp,
  Eye,
  Settings
} from 'lucide-react';
import { EthicsPrivacyDashboard } from './EthicsPrivacyDashboard';
import { EmotionalWellnessDashboard } from './EmotionalWellnessDashboard';
import { ContinuityRecoveryDashboard } from './ContinuityRecoveryDashboard';
import { CommunityFeedbackDashboard } from './CommunityFeedbackDashboard';
import { LearningDevelopmentDashboard } from './LearningDevelopmentDashboard';
import type { SpecializedAgent, AgentAlert } from '@/types/specializedAgents';

export const SpecializedAgentsCenter = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [agents, setAgents] = useState<SpecializedAgent[]>([]);
  const [criticalAlerts, setCriticalAlerts] = useState<AgentAlert[]>([]);

  useEffect(() => {
    initializeSpecializedAgents();
  }, []);

  const initializeSpecializedAgents = () => {
    const mockAgents: SpecializedAgent[] = [
      {
        id: 'ethics-1',
        name: 'EthicsGuardian-Alpha',
        type: 'ethics_privacy',
        status: 'monitoring',
        autonomyLevel: 'full',
        currentActivity: 'Scanning data access patterns for privacy compliance',
        monitoringMetrics: [],
        alerts: [],
        capabilities: ['Privacy Compliance', 'Ethics Monitoring', 'Data Protection', 'Audit Logging'],
        performanceScore: 98,
        lastAction: new Date(),
        createdAt: new Date()
      },
      {
        id: 'wellness-1',
        name: 'WellnessCompanion-Beta',
        type: 'emotional_wellness',
        status: 'active',
        autonomyLevel: 'high',
        currentActivity: 'Monitoring team workload and suggesting break reminders',
        monitoringMetrics: [],
        alerts: [],
        capabilities: ['Stress Detection', 'Wellness Coaching', 'Break Reminders', 'Positive Reinforcement'],
        performanceScore: 94,
        lastAction: new Date(),
        createdAt: new Date()
      },
      {
        id: 'continuity-1',
        name: 'ContinuityShield-Gamma',
        type: 'continuity_recovery',
        status: 'monitoring',
        autonomyLevel: 'full',
        currentActivity: 'Maintaining backup protocols and monitoring system integrity',
        monitoringMetrics: [],
        alerts: [],
        capabilities: ['Disaster Recovery', 'Backup Management', 'Security Response', 'System Monitoring'],
        performanceScore: 96,
        lastAction: new Date(),
        createdAt: new Date()
      },
      {
        id: 'feedback-1',
        name: 'CommunityVoice-Delta',
        type: 'community_feedback',
        status: 'active',
        autonomyLevel: 'medium',
        currentActivity: 'Analyzing user feedback and prioritizing feature requests',
        monitoringMetrics: [],
        alerts: [],
        capabilities: ['Feedback Analysis', 'Sentiment Monitoring', 'Feature Prioritization', 'User Engagement'],
        performanceScore: 91,
        lastAction: new Date(),
        createdAt: new Date()
      },
      {
        id: 'learning-1',
        name: 'LearningMentor-Epsilon',
        type: 'learning_development',
        status: 'active',
        autonomyLevel: 'high',
        currentActivity: 'Curating personalized learning paths for team members',
        monitoringMetrics: [],
        alerts: [],
        capabilities: ['Skill Assessment', 'Learning Recommendations', 'Progress Tracking', 'Mentorship'],
        performanceScore: 93,
        lastAction: new Date(),
        createdAt: new Date()
      }
    ];

    const mockAlerts: AgentAlert[] = [
      {
        id: 'alert-1',
        agentId: 'wellness-1',
        type: 'wellness_warning',
        severity: 'medium',
        title: 'Increased Team Stress Detected',
        description: 'Multiple team members showing signs of elevated stress levels',
        recommendations: ['Schedule team wellness check-in', 'Consider workload redistribution'],
        timestamp: new Date(),
        acknowledged: false,
        resolved: false
      }
    ];

    setAgents(mockAgents);
    setCriticalAlerts(mockAlerts);
  };

  const getAgentIcon = (type: string) => {
    switch (type) {
      case 'ethics_privacy': return <Shield className="w-5 h-5" />;
      case 'emotional_wellness': return <Heart className="w-5 h-5" />;
      case 'continuity_recovery': return <Zap className="w-5 h-5" />;
      case 'community_feedback': return <MessageSquare className="w-5 h-5" />;
      case 'learning_development': return <GraduationCap className="w-5 h-5" />;
      default: return <Activity className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'monitoring': return 'bg-blue-100 text-blue-800';
      case 'alerting': return 'bg-yellow-100 text-yellow-800';
      case 'responding': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = {
    totalAgents: agents.length,
    activeAgents: agents.filter(a => a.status === 'active' || a.status === 'monitoring').length,
    criticalAlerts: criticalAlerts.filter(a => a.severity === 'critical' && !a.resolved).length,
    avgPerformance: agents.reduce((acc, agent) => acc + agent.performanceScore, 0) / agents.length || 0
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent flex items-center gap-3">
            <Shield className="w-8 h-8 text-purple-600" />
            Specialized AI Guardian Network
          </h1>
          <p className="text-slate-600 mt-2">Ethics, wellness, continuity, feedback, and learning specialists</p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
            <Eye className="w-4 h-4 mr-2" />
            System Health
          </Button>
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Configure
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700">Guardian Agents</p>
                <p className="text-2xl font-bold text-green-900">{stats.totalAgents}</p>
              </div>
              <Shield className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700">Active</p>
                <p className="text-2xl font-bold text-blue-900">{stats.activeAgents}</p>
              </div>
              <Activity className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-700">Critical Alerts</p>
                <p className="text-2xl font-bold text-red-900">{stats.criticalAlerts}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700">Performance</p>
                <p className="text-2xl font-bold text-purple-900">{stats.avgPerformance.toFixed(0)}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Critical Alerts Banner */}
      {criticalAlerts.filter(a => !a.resolved).length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-red-800 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Active Alerts Requiring Attention
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {criticalAlerts.filter(a => !a.resolved).map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                  <div>
                    <p className="font-medium text-red-900">{alert.title}</p>
                    <p className="text-sm text-red-700">{alert.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge className="bg-red-500 text-white">{alert.severity}</Badge>
                    <Button size="sm" variant="outline">Review</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-6 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="ethics">Ethics & Privacy</TabsTrigger>
          <TabsTrigger value="wellness">Wellness</TabsTrigger>
          <TabsTrigger value="continuity">Continuity</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="learning">Learning</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4">
            {agents.map((agent) => (
              <Card key={agent.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getAgentIcon(agent.type)}
                      <div>
                        <CardTitle className="text-lg">{agent.name}</CardTitle>
                        <CardDescription>{agent.currentActivity}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(agent.status)}>
                        {agent.status}
                      </Badge>
                      <Badge variant="outline">{agent.autonomyLevel} autonomy</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Performance Score</span>
                        <span>{agent.performanceScore}%</span>
                      </div>
                      <Progress value={agent.performanceScore} className="h-2" />
                    </div>
                    
                    <div>
                      <p className="text-sm text-slate-600 mb-2">Capabilities:</p>
                      <div className="flex flex-wrap gap-1">
                        {agent.capabilities.map((capability, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {capability}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">View Details</Button>
                      <Button size="sm" variant="outline">Configure</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ethics">
          <EthicsPrivacyDashboard />
        </TabsContent>

        <TabsContent value="wellness">
          <EmotionalWellnessDashboard />
        </TabsContent>

        <TabsContent value="continuity">
          <ContinuityRecoveryDashboard />
        </TabsContent>

        <TabsContent value="feedback">
          <CommunityFeedbackDashboard />
        </TabsContent>

        <TabsContent value="learning">
          <LearningDevelopmentDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
};
