
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Bot, 
  Users, 
  Settings, 
  Shield, 
  Brain, 
  Zap,
  AlertTriangle,
  TrendingUp,
  Network,
  Eye,
  MessageSquare
} from 'lucide-react';
import { AgentGrid } from './AgentGrid';
import { SpawnManagement } from './SpawnManagement';
import { CommunicationCenter } from './CommunicationCenter';
import { WorkflowManager } from './WorkflowManager';
import { SecurityCenter } from './SecurityCenter';
import { DecisionSupport } from './DecisionSupport';
import { DashboardOverview } from './DashboardOverview';
import type { Agent, SpawnRequest, DashboardAlert, AIDecisionSuggestion } from '@/types/agentFramework';

export const AgentFrameworkCenter = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [agents, setAgents] = useState<Agent[]>([]);
  const [spawnRequests, setSpawnRequests] = useState<SpawnRequest[]>([]);
  const [alerts, setAlerts] = useState<DashboardAlert[]>([]);
  const [suggestions, setSuggestions] = useState<AIDecisionSuggestion[]>([]);

  useEffect(() => {
    // Initialize mock data
    initializeAgentFramework();
  }, []);

  const initializeAgentFramework = () => {
    // Mock agents data
    const mockAgents: Agent[] = [
      {
        id: 'agent-1',
        name: 'MasterCoordinator-Alpha',
        role: {
          id: 'coordinator-role',
          name: 'Master Coordinator',
          type: 'leader',
          department: 'operations',
          responsibilities: ['Team oversight', 'Resource allocation', 'Strategic planning'],
          requiredCapabilities: ['Leadership', 'Decision Making', 'Resource Management'],
          autonomyLevel: 'full',
          canSpawnAgents: true,
          maxSubordinates: 10,
          communicationChannels: [],
          securityClearance: 'restricted'
        },
        status: 'active',
        subordinateIds: ['agent-2', 'agent-3'],
        currentTasks: [],
        workload: 75,
        efficiency: 94,
        specializations: ['Team Management', 'Strategic Planning', 'Resource Optimization'],
        createdAt: new Date('2024-01-01'),
        lastActive: new Date(),
        communicationPreferences: [],
        version: '2.1.0',
        metrics: {
          tasksCompleted: 156,
          averageTaskTime: 4.2,
          successRate: 97,
          collaborationScore: 95,
          innovationIndex: 88,
          agentsSpawned: 8,
          communicationEfficiency: 92,
          uptime: 99.8
        }
      },
      {
        id: 'agent-2',
        name: 'DevOpsSpecialist-Beta',
        role: {
          id: 'devops-role',
          name: 'DevOps Specialist',
          type: 'specialist',
          department: 'development',
          responsibilities: ['Infrastructure management', 'Deployment automation', 'System monitoring'],
          requiredCapabilities: ['DevOps', 'Cloud Management', 'Automation'],
          autonomyLevel: 'high',
          canSpawnAgents: true,
          maxSubordinates: 5,
          communicationChannels: [],
          securityClearance: 'confidential'
        },
        status: 'active',
        parentAgentId: 'agent-1',
        subordinateIds: [],
        currentTasks: [],
        workload: 68,
        efficiency: 91,
        specializations: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
        createdAt: new Date('2024-01-15'),
        lastActive: new Date(),
        communicationPreferences: [],
        version: '1.8.2',
        metrics: {
          tasksCompleted: 89,
          averageTaskTime: 6.1,
          successRate: 94,
          collaborationScore: 88,
          innovationIndex: 82,
          agentsSpawned: 3,
          communicationEfficiency: 89,
          uptime: 98.5
        }
      }
    ];

    const mockSpawnRequests: SpawnRequest[] = [
      {
        id: 'spawn-1',
        requestingAgentId: 'agent-1',
        requestedRole: {
          name: 'Security Analyst',
          type: 'specialist',
          department: 'security',
          responsibilities: ['Threat detection', 'Security auditing'],
          requiredCapabilities: ['Cybersecurity', 'Risk Assessment'],
          autonomyLevel: 'medium',
          canSpawnAgents: false,
          maxSubordinates: 0,
          securityClearance: 'restricted'
        },
        justification: 'Increased security workload requires dedicated specialist',
        urgency: 'high',
        estimatedDuration: 'long_term',
        requiredCapabilities: ['Cybersecurity', 'Compliance'],
        status: 'pending',
        createdAt: new Date()
      }
    ];

    const mockAlerts: DashboardAlert[] = [
      {
        id: 'alert-1',
        type: 'warning',
        severity: 'medium',
        title: 'High Workload Detected',
        message: 'Agent MasterCoordinator-Alpha is operating at 75% capacity',
        source: 'Workload Monitor',
        timestamp: new Date(),
        read: false,
        actionRequired: true,
        suggestedActions: ['Consider spawning support agent', 'Redistribute tasks'],
        affectedAgents: ['agent-1']
      }
    ];

    setAgents(mockAgents);
    setSpawnRequests(mockSpawnRequests);
    setAlerts(mockAlerts);
  };

  const stats = {
    totalAgents: agents.length,
    activeAgents: agents.filter(a => a.status === 'active').length,
    avgWorkload: agents.reduce((acc, agent) => acc + agent.workload, 0) / agents.length || 0,
    avgEfficiency: agents.reduce((acc, agent) => acc + agent.efficiency, 0) / agents.length || 0,
    pendingSpawns: spawnRequests.filter(r => r.status === 'pending').length,
    unreadAlerts: alerts.filter(a => !a.read).length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-3">
            <Bot className="w-8 h-8 text-blue-600" />
            Autonomous Agent Framework
          </h1>
          <p className="text-slate-600 mt-2">Self-scaling AI team with autonomous spawning and management</p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
            <Brain className="w-4 h-4 mr-2" />
            AI Insights
          </Button>
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Configure
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700">Total Agents</p>
                <p className="text-2xl font-bold text-blue-900">{stats.totalAgents}</p>
              </div>
              <Bot className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700">Active</p>
                <p className="text-2xl font-bold text-green-900">{stats.activeAgents}</p>
              </div>
              <Zap className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-700">Avg Workload</p>
                <p className="text-2xl font-bold text-orange-900">{stats.avgWorkload.toFixed(0)}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700">Efficiency</p>
                <p className="text-2xl font-bold text-purple-900">{stats.avgEfficiency.toFixed(0)}%</p>
              </div>
              <Brain className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-700">Pending Spawns</p>
                <p className="text-2xl font-bold text-yellow-900">{stats.pendingSpawns}</p>
              </div>
              <Users className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-700">Alerts</p>
                <p className="text-2xl font-bold text-red-900">{stats.unreadAlerts}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-7 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="agents">Agents</TabsTrigger>
          <TabsTrigger value="spawning">Spawning</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
          <TabsTrigger value="workflows">Workflows</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="decisions">AI Decisions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <DashboardOverview 
            agents={agents} 
            alerts={alerts} 
            suggestions={suggestions}
            spawnRequests={spawnRequests}
          />
        </TabsContent>

        <TabsContent value="agents">
          <AgentGrid agents={agents} />
        </TabsContent>

        <TabsContent value="spawning">
          <SpawnManagement 
            spawnRequests={spawnRequests}
            agents={agents}
            onApproveSpawn={(id) => console.log('Approve spawn:', id)}
            onRejectSpawn={(id) => console.log('Reject spawn:', id)}
          />
        </TabsContent>

        <TabsContent value="communication">
          <CommunicationCenter agents={agents} />
        </TabsContent>

        <TabsContent value="workflows">
          <WorkflowManager />
        </TabsContent>

        <TabsContent value="security">
          <SecurityCenter agents={agents} />
        </TabsContent>

        <TabsContent value="decisions">
          <DecisionSupport suggestions={suggestions} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
