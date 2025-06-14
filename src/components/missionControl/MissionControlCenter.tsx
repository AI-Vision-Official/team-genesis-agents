
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  Target, 
  TrendingUp, 
  AlertTriangle, 
  Bot, 
  Activity,
  DollarSign,
  Search,
  Zap
} from 'lucide-react';
import { AutonomousDecisionEngine } from './AutonomousDecisionEngine';
import { RealTimeDashboard } from './RealTimeDashboard';
import { ProactiveAlerts } from './ProactiveAlerts';
import { ScenarioSimulator } from './ScenarioSimulator';
import { IntelligentKnowledgeBase } from './IntelligentKnowledgeBase';
import { AgentMotivationAnalyzer } from './AgentMotivationAnalyzer';
import type { Mission, DataInsight, AlertNotification } from '@/types/missionControl';

interface MissionControlCenterProps {
  agents: any[];
  tasks: any[];
}

export const MissionControlCenter = ({ agents, tasks }: MissionControlCenterProps) => {
  const [activeMissions, setActiveMissions] = useState<Mission[]>([]);
  const [recentInsights, setRecentInsights] = useState<DataInsight[]>([]);
  const [criticalAlerts, setCriticalAlerts] = useState<AlertNotification[]>([]);
  const [autonomousMode, setAutonomousMode] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for demonstration
  useEffect(() => {
    const mockMissions: Mission[] = [
      {
        id: '1',
        title: 'Market Expansion Analysis',
        description: 'Autonomous research and analysis of new market opportunities in Southeast Asia',
        type: 'business',
        status: 'active',
        priority: 'high',
        assignedAgents: ['DataAnalyst-Alpha', 'MarketResearcher-Beta'],
        autonomousDecisions: [],
        insights: [],
        nextActions: [],
        startDate: new Date(),
        estimatedCompletion: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        budget: 50000,
        currentSpend: 15000,
        roi: 0.23
      },
      {
        id: '2',
        title: 'Crisis Response - Supply Chain',
        description: 'Real-time monitoring and autonomous response to supply chain disruptions',
        type: 'crisis_response',
        status: 'active',
        priority: 'critical',
        assignedAgents: ['LogisticsAgent-Gamma', 'DataAnalyst-Alpha', 'CommunicationAgent-Delta'],
        autonomousDecisions: [],
        insights: [],
        nextActions: [],
        startDate: new Date(),
        budget: 25000,
        currentSpend: 8000
      }
    ];

    const mockInsights: DataInsight[] = [
      {
        id: '1',
        source: 'market_analysis',
        title: 'Emerging Demand in AI Tools Sector',
        description: 'Web research indicates 340% increase in AI tool searches in Q4',
        importance: 'high',
        actionable: true,
        suggestedActions: ['Launch targeted marketing campaign', 'Develop new AI features'],
        timestamp: new Date(),
        relevantMissions: ['1'],
        data: { searchVolume: 45000, growthRate: 3.4 }
      },
      {
        id: '2',
        source: 'sales_data',
        title: 'Revenue Stream Optimization Opportunity',
        description: 'Subscription model showing 15% higher retention than one-time purchases',
        importance: 'medium',
        actionable: true,
        suggestedActions: ['Migrate customers to subscription', 'Enhance subscription benefits'],
        timestamp: new Date(),
        relevantMissions: ['1'],
        data: { retention: 0.85, revenue: 120000 }
      }
    ];

    const mockAlerts: AlertNotification[] = [
      {
        id: '1',
        type: 'market_opportunity',
        severity: 'warning',
        title: 'New Market Opportunity Detected',
        message: 'AI automation tools showing 250% growth in enterprise sector',
        actionRequired: true,
        suggestedActions: ['Research enterprise needs', 'Develop B2B strategy'],
        timestamp: new Date(),
        acknowledged: false,
        relatedMissions: ['1']
      }
    ];

    setActiveMissions(mockMissions);
    setRecentInsights(mockInsights);
    setCriticalAlerts(mockAlerts);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'planning': return 'bg-blue-500';
      case 'emergency': return 'bg-red-500';
      case 'paused': return 'bg-yellow-500';
      case 'completed': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'emergency': return 'bg-red-600 text-white';
      case 'critical': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent flex items-center gap-3">
            <Brain className="w-8 h-8 text-purple-600" />
            Mission Control Center
          </h1>
          <p className="text-slate-600 mt-2">Autonomous AI decision-making and mission orchestration</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant={autonomousMode ? "default" : "outline"}
            onClick={() => setAutonomousMode(!autonomousMode)}
            className={autonomousMode ? "bg-gradient-to-r from-green-600 to-blue-600" : ""}
          >
            <Zap className="w-4 h-4 mr-2" />
            {autonomousMode ? 'Autonomous Mode ON' : 'Manual Mode'}
          </Button>
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
            <Target className="w-4 h-4 mr-2" />
            New Mission
          </Button>
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-6 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="missions">Missions</TabsTrigger>
          <TabsTrigger value="decisions">AI Decisions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="knowledge">Knowledge</TabsTrigger>
          <TabsTrigger value="simulations">Simulations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <RealTimeDashboard />
          <ProactiveAlerts alerts={criticalAlerts} />
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-700">Active Missions</p>
                    <p className="text-2xl font-bold text-green-900">{activeMissions.length}</p>
                  </div>
                  <Target className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-700">AI Decisions Today</p>
                    <p className="text-2xl font-bold text-blue-900">47</p>
                  </div>
                  <Brain className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-purple-700">Revenue Impact</p>
                    <p className="text-2xl font-bold text-purple-900">+$125k</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-orange-700">System Efficiency</p>
                    <p className="text-2xl font-bold text-orange-900">94%</p>
                  </div>
                  <Activity className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Latest AI Insights
              </CardTitle>
              <CardDescription>Real-time analysis and recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentInsights.map((insight) => (
                  <div key={insight.id} className="flex items-start justify-between p-4 bg-slate-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium">{insight.title}</h4>
                        <Badge className={insight.importance === 'high' ? 'bg-red-500' : insight.importance === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}>
                          {insight.importance}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600 mb-2">{insight.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {insight.suggestedActions.map((action, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {action}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Act on Insight
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="missions" className="space-y-6">
          <div className="grid gap-4">
            {activeMissions.map((mission) => (
              <Card key={mission.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(mission.status)}`} />
                        <CardTitle className="text-lg">{mission.title}</CardTitle>
                        <Badge className={getPriorityColor(mission.priority)}>
                          {mission.priority}
                        </Badge>
                      </div>
                      <CardDescription>{mission.description}</CardDescription>
                    </div>
                    <Badge variant="outline">{mission.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span>Budget: ${mission.currentSpend?.toLocaleString()} / ${mission.budget?.toLocaleString()}</span>
                    </div>
                    <Progress value={(mission.currentSpend! / mission.budget!) * 100} />
                    
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <span>Agents: {mission.assignedAgents.length}</span>
                      {mission.roi && <span>ROI: {(mission.roi * 100).toFixed(1)}%</span>}
                      <span>Est. Completion: {mission.estimatedCompletion?.toLocaleDateString()}</span>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">View Details</Button>
                      <Button size="sm" variant="outline">Monitor Progress</Button>
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                        AI Analysis
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="decisions">
          <AutonomousDecisionEngine missions={activeMissions} />
        </TabsContent>

        <TabsContent value="analytics">
          <RealTimeDashboard />
          <AgentMotivationAnalyzer agents={agents} />
        </TabsContent>

        <TabsContent value="knowledge">
          <IntelligentKnowledgeBase />
        </TabsContent>

        <TabsContent value="simulations">
          <ScenarioSimulator />
        </TabsContent>
      </Tabs>
    </div>
  );
};
