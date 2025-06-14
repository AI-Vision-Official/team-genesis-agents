
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MonitoringHeader } from './MonitoringHeader';
import { SystemMetricsCard } from './SystemMetricsCard';
import { AgentMetricsCard } from './AgentMetricsCard';
import { AlertsPanel } from './AlertsPanel';
import { AgentHealthDashboard } from './AgentHealthDashboard';
import { SmartNotificationSystem } from '../notifications/SmartNotificationSystem';
import { QuickActionsPanel } from '../quickActions/QuickActionsPanel';
import type { SystemMetric, AgentMetric } from '@/types/monitoring';

export const RealTimeMonitoring = () => {
  const [systemMetrics, setSystemMetrics] = useState<SystemMetric[]>([]);
  const [agentMetrics, setAgentMetrics] = useState<AgentMetric[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(true);
  const [refreshInterval] = useState(2000);

  useEffect(() => {
    // Initialize mock data
    const initializeData = () => {
      const mockSystemMetrics: SystemMetric[] = [
        {
          id: 'cpu',
          name: 'CPU Usage',
          value: 45,
          unit: '%',
          status: 'normal',
          trend: 'stable',
          timestamp: new Date()
        },
        {
          id: 'memory',
          name: 'Memory Usage',
          value: 68,
          unit: '%',
          status: 'normal',
          trend: 'up',
          timestamp: new Date()
        },
        {
          id: 'disk',
          name: 'Disk Usage',
          value: 34,
          unit: '%',
          status: 'normal',
          trend: 'stable',
          timestamp: new Date()
        },
        {
          id: 'network',
          name: 'Network I/O',
          value: 156,
          unit: 'MB/s',
          status: 'normal',
          trend: 'down',
          timestamp: new Date()
        },
        {
          id: 'tasks',
          name: 'Active Tasks',
          value: 23,
          unit: 'tasks',
          status: 'normal',
          trend: 'up',
          timestamp: new Date()
        },
        {
          id: 'response',
          name: 'Avg Response Time',
          value: 245,
          unit: 'ms',
          status: 'warning',
          trend: 'up',
          timestamp: new Date()
        }
      ];

      const mockAgentMetrics: AgentMetric[] = [
        {
          agentId: '1',
          agentName: 'DataAnalyst-Alpha',
          cpuUsage: 78,
          memoryUsage: 45,
          taskQueue: 3,
          responseTime: 180,
          status: 'active',
          lastUpdate: new Date()
        },
        {
          agentId: '2',
          agentName: 'CreativeDirector-Beta',
          cpuUsage: 34,
          memoryUsage: 52,
          taskQueue: 1,
          responseTime: 320,
          status: 'active',
          lastUpdate: new Date()
        },
        {
          agentId: '3',
          agentName: 'SecurityGuard-Gamma',
          cpuUsage: 89,
          memoryUsage: 67,
          taskQueue: 7,
          responseTime: 95,
          status: 'overloaded',
          lastUpdate: new Date()
        },
        {
          agentId: '4',
          agentName: 'ProjectManager-Delta',
          cpuUsage: 12,
          memoryUsage: 23,
          taskQueue: 0,
          responseTime: 150,
          status: 'idle',
          lastUpdate: new Date()
        }
      ];

      setSystemMetrics(mockSystemMetrics);
      setAgentMetrics(mockAgentMetrics);
    };

    initializeData();

    // Simulate real-time updates
    const interval = setInterval(() => {
      if (isMonitoring) {
        setSystemMetrics(prev => prev.map(metric => ({
          ...metric,
          value: Math.max(0, metric.value + (Math.random() - 0.5) * 10),
          timestamp: new Date()
        })));

        setAgentMetrics(prev => prev.map(agent => ({
          ...agent,
          cpuUsage: Math.max(0, Math.min(100, agent.cpuUsage + (Math.random() - 0.5) * 15)),
          memoryUsage: Math.max(0, Math.min(100, agent.memoryUsage + (Math.random() - 0.5) * 10)),
          responseTime: Math.max(50, agent.responseTime + (Math.random() - 0.5) * 50),
          lastUpdate: new Date()
        })));
      }
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [isMonitoring, refreshInterval]);

  return (
    <div className="space-y-6">
      <MonitoringHeader 
        isMonitoring={isMonitoring} 
        onToggleMonitoring={() => setIsMonitoring(!isMonitoring)} 
      />

      <Tabs defaultValue="health" className="w-full">
        <TabsList className="grid grid-cols-6 w-full">
          <TabsTrigger value="health">Agent Health</TabsTrigger>
          <TabsTrigger value="system">System Metrics</TabsTrigger>
          <TabsTrigger value="agents">Agent Performance</TabsTrigger>
          <TabsTrigger value="notifications">Smart Alerts</TabsTrigger>
          <TabsTrigger value="actions">Quick Actions</TabsTrigger>
          <TabsTrigger value="alerts">Legacy Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="health" className="space-y-6">
          <AgentHealthDashboard />
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {systemMetrics.map((metric) => (
              <SystemMetricsCard key={metric.id} metric={metric} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="agents" className="space-y-6">
          <div className="grid gap-4">
            {agentMetrics.map((agent) => (
              <AgentMetricsCard key={agent.agentId} agent={agent} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <SmartNotificationSystem />
        </TabsContent>

        <TabsContent value="actions" className="space-y-6">
          <QuickActionsPanel />
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <AlertsPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
};
