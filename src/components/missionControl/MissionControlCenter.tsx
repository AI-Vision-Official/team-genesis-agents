import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MissionControlHeader } from './MissionControlHeader';
import { MissionStatsCards } from './MissionStatsCards';
import { LatestInsights } from './LatestInsights';
import { MissionsList } from './MissionsList';
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

  return (
    <div className="space-y-6">
      <MissionControlHeader 
        autonomousMode={autonomousMode}
        onToggleAutonomousMode={() => setAutonomousMode(!autonomousMode)}
      />

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
          <MissionStatsCards activeMissionsCount={activeMissions.length} />
          <LatestInsights insights={recentInsights} />
        </TabsContent>

        <TabsContent value="missions" className="space-y-6">
          <MissionsList missions={activeMissions} />
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
