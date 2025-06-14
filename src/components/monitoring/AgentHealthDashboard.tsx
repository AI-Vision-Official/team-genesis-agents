
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { HealthOverview } from './HealthOverview';
import { AgentStatusCard } from './AgentStatusCard';
import { 
  Heart, 
  RefreshCw
} from 'lucide-react';

interface AgentHealth {
  id: string;
  name: string;
  type: string;
  status: 'healthy' | 'warning' | 'critical' | 'offline';
  cpuUsage: number;
  memoryUsage: number;
  responseTime: number;
  uptime: number;
  lastHeartbeat: Date;
  errorCount: number;
  successRate: number;
  currentTasks: number;
  maxTasks: number;
}

export const AgentHealthDashboard = () => {
  const [agents, setAgents] = useState<AgentHealth[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadAgentHealthData();
    const interval = setInterval(loadAgentHealthData, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const loadAgentHealthData = async () => {
    setRefreshing(true);
    // Simulate API call - replace with actual health monitoring
    const mockHealthData: AgentHealth[] = [
      {
        id: 'social-alpha',
        name: 'SocialMedia-Alpha',
        type: 'Social Media',
        status: 'healthy',
        cpuUsage: 23,
        memoryUsage: 45,
        responseTime: 120,
        uptime: 99.8,
        lastHeartbeat: new Date(),
        errorCount: 2,
        successRate: 98.5,
        currentTasks: 3,
        maxTasks: 10
      },
      {
        id: 'data-beta',
        name: 'DataAnalyst-Beta',
        type: 'Data Analysis',
        status: 'warning',
        cpuUsage: 78,
        memoryUsage: 82,
        responseTime: 450,
        uptime: 97.2,
        lastHeartbeat: new Date(Date.now() - 5000),
        errorCount: 8,
        successRate: 94.1,
        currentTasks: 8,
        maxTasks: 10
      },
      {
        id: 'ethics-gamma',
        name: 'EthicsGuardian-Gamma',
        type: 'Ethics & Privacy',
        status: 'healthy',
        cpuUsage: 15,
        memoryUsage: 28,
        responseTime: 89,
        uptime: 99.9,
        lastHeartbeat: new Date(),
        errorCount: 0,
        successRate: 100,
        currentTasks: 1,
        maxTasks: 5
      },
      {
        id: 'mission-delta',
        name: 'MissionControl-Delta',
        type: 'Mission Control',
        status: 'critical',
        cpuUsage: 95,
        memoryUsage: 91,
        responseTime: 890,
        uptime: 85.3,
        lastHeartbeat: new Date(Date.now() - 120000),
        errorCount: 23,
        successRate: 87.2,
        currentTasks: 10,
        maxTasks: 10
      }
    ];
    
    setTimeout(() => {
      setAgents(mockHealthData);
      setRefreshing(false);
    }, 1000);
  };

  const healthyAgents = agents.filter(a => a.status === 'healthy').length;
  const warningAgents = agents.filter(a => a.status === 'warning').length;
  const criticalAgents = agents.filter(a => a.status === 'critical').length;
  const avgResponseTime = agents.reduce((acc, agent) => acc + agent.responseTime, 0) / agents.length || 0;
  const avgUptime = agents.reduce((acc, agent) => acc + agent.uptime, 0) / agents.length || 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Heart className="w-6 h-6 text-red-500" />
            Agent Health Monitoring
          </h2>
          <p className="text-slate-600 mt-1">Real-time health status of all AI agents</p>
        </div>
        <Button onClick={loadAgentHealthData} disabled={refreshing} variant="outline">
          <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* System Overview */}
      <HealthOverview
        healthyAgents={healthyAgents}
        warningAgents={warningAgents}
        criticalAgents={criticalAgents}
        avgResponseTime={avgResponseTime}
        avgUptime={avgUptime}
      />

      {/* Agent Details */}
      <div className="grid gap-4">
        {agents.map((agent) => (
          <AgentStatusCard key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
  );
};
