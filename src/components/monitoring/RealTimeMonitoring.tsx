
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity, 
  Zap, 
  Cpu, 
  HardDrive, 
  Wifi, 
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Clock,
  RefreshCw,
  Eye,
  Settings
} from 'lucide-react';

interface SystemMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  timestamp: Date;
}

interface AgentMetric {
  agentId: string;
  agentName: string;
  cpuUsage: number;
  memoryUsage: number;
  taskQueue: number;
  responseTime: number;
  status: 'active' | 'idle' | 'overloaded' | 'error';
  lastUpdate: Date;
}

export const RealTimeMonitoring = () => {
  const [systemMetrics, setSystemMetrics] = useState<SystemMetric[]>([]);
  const [agentMetrics, setAgentMetrics] = useState<AgentMetric[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(2000);

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

  const getMetricIcon = (metricId: string) => {
    switch (metricId) {
      case 'cpu': return <Cpu className="w-4 h-4" />;
      case 'memory': return <Activity className="w-4 h-4" />;
      case 'disk': return <HardDrive className="w-4 h-4" />;
      case 'network': return <Wifi className="w-4 h-4" />;
      case 'tasks': return <Zap className="w-4 h-4" />;
      case 'response': return <Clock className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      case 'active': return 'text-blue-600 bg-blue-100';
      case 'idle': return 'text-gray-600 bg-gray-100';
      case 'overloaded': return 'text-orange-600 bg-orange-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-3 h-3 text-red-500" />;
      case 'down': return <TrendingDown className="w-3 h-3 text-green-500" />;
      case 'stable': return <div className="w-3 h-3 bg-gray-400 rounded-full" />;
      default: return null;
    }
  };

  const getUsageColor = (usage: number) => {
    if (usage >= 80) return 'bg-red-500';
    if (usage >= 60) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent flex items-center gap-3">
            <Activity className="w-8 h-8 text-blue-600" />
            Real-Time Performance Monitoring
          </h2>
          <p className="text-slate-600 mt-2">Live system and agent performance metrics</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={() => setIsMonitoring(!isMonitoring)}
            className={isMonitoring ? 'text-green-600' : 'text-red-600'}
          >
            {isMonitoring ? <Eye className="w-4 h-4 mr-2" /> : <RefreshCw className="w-4 h-4 mr-2" />}
            {isMonitoring ? 'Monitoring' : 'Paused'}
          </Button>
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Configure
          </Button>
        </div>
      </div>

      <Tabs defaultValue="system" className="w-full">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="system">System Metrics</TabsTrigger>
          <TabsTrigger value="agents">Agent Performance</TabsTrigger>
          <TabsTrigger value="alerts">Alerts & Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="system" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {systemMetrics.map((metric) => (
              <Card key={metric.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      {getMetricIcon(metric.id)}
                      <h3 className="font-medium">{metric.name}</h3>
                    </div>
                    <div className="flex items-center gap-1">
                      {getTrendIcon(metric.trend)}
                      <Badge className={getStatusColor(metric.status)}>
                        {metric.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-baseline">
                      <span className="text-2xl font-bold">{metric.value.toFixed(1)}</span>
                      <span className="text-sm text-slate-600">{metric.unit}</span>
                    </div>
                    
                    {metric.unit === '%' && (
                      <Progress 
                        value={metric.value} 
                        className={`h-2 ${getUsageColor(metric.value)}`}
                      />
                    )}
                    
                    <p className="text-xs text-slate-500">
                      Last updated: {metric.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="agents" className="space-y-6">
          <div className="grid gap-4">
            {agentMetrics.map((agent) => (
              <Card key={agent.agentId} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{agent.agentName}</h3>
                      <p className="text-sm text-slate-600">Agent ID: {agent.agentId}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(agent.status)}>
                        {agent.status}
                      </Badge>
                      <span className="text-xs text-slate-500">
                        {agent.lastUpdate.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">CPU Usage</p>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{agent.cpuUsage.toFixed(1)}%</span>
                        <Progress 
                          value={agent.cpuUsage} 
                          className={`h-2 flex-1 ${getUsageColor(agent.cpuUsage)}`}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Memory</p>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{agent.memoryUsage.toFixed(1)}%</span>
                        <Progress 
                          value={agent.memoryUsage} 
                          className={`h-2 flex-1 ${getUsageColor(agent.memoryUsage)}`}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Task Queue</p>
                      <span className="font-medium text-lg">{agent.taskQueue}</span>
                    </div>
                    
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Response Time</p>
                      <span className="font-medium text-lg">{agent.responseTime.toFixed(0)}ms</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Active Alerts
              </CardTitle>
              <CardDescription>System and agent alerts requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-yellow-800">High Response Time Detected</h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        Average system response time has exceeded 200ms threshold
                      </p>
                      <p className="text-xs text-yellow-600 mt-2">2 minutes ago</p>
                    </div>
                    <Badge className="bg-yellow-500 text-white">Warning</Badge>
                  </div>
                </div>
                
                <div className="p-4 border border-orange-200 bg-orange-50 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-orange-800">Agent Overload</h4>
                      <p className="text-sm text-orange-700 mt-1">
                        SecurityGuard-Gamma is experiencing high CPU usage (89%)
                      </p>
                      <p className="text-xs text-orange-600 mt-2">5 minutes ago</p>
                    </div>
                    <Badge className="bg-orange-500 text-white">High</Badge>
                  </div>
                </div>
                
                <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-blue-800">Performance Optimization</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        System has automatically scaled resources to handle increased load
                      </p>
                      <p className="text-xs text-blue-600 mt-2">10 minutes ago</p>
                    </div>
                    <Badge className="bg-blue-500 text-white">Info</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
