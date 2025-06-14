
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Cpu, 
  Heart, 
  RefreshCw,
  TrendingUp,
  Wifi,
  WifiOff
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'critical': return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'offline': return <WifiOff className="w-5 h-5 text-gray-600" />;
      default: return <Activity className="w-5 h-5 text-blue-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-100 text-green-800 border-green-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'offline': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700">Healthy</p>
                <p className="text-2xl font-bold text-green-900">{healthyAgents}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-700">Warning</p>
                <p className="text-2xl font-bold text-yellow-900">{warningAgents}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-700">Critical</p>
                <p className="text-2xl font-bold text-red-900">{criticalAgents}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700">Avg Response</p>
                <p className="text-2xl font-bold text-blue-900">{avgResponseTime.toFixed(0)}ms</p>
              </div>
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700">Avg Uptime</p>
                <p className="text-2xl font-bold text-purple-900">{avgUptime.toFixed(1)}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Agent Details */}
      <div className="grid gap-4">
        {agents.map((agent) => (
          <Card key={agent.id} className={`border-l-4 ${
            agent.status === 'healthy' ? 'border-l-green-500' :
            agent.status === 'warning' ? 'border-l-yellow-500' :
            agent.status === 'critical' ? 'border-l-red-500' : 'border-l-gray-500'
          }`}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getStatusIcon(agent.status)}
                  <div>
                    <CardTitle className="text-lg">{agent.name}</CardTitle>
                    <CardDescription>{agent.type}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(agent.status)}>
                    {agent.status.toUpperCase()}
                  </Badge>
                  {Date.now() - agent.lastHeartbeat.getTime() < 60000 ? (
                    <Wifi className="w-4 h-4 text-green-600" />
                  ) : (
                    <WifiOff className="w-4 h-4 text-red-600" />
                  )}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* CPU Usage */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="flex items-center gap-1">
                      <Cpu className="w-3 h-3" />
                      CPU
                    </span>
                    <span className={agent.cpuUsage > 80 ? 'text-red-600 font-medium' : ''}>{agent.cpuUsage}%</span>
                  </div>
                  <Progress value={agent.cpuUsage} className="h-2" />
                </div>

                {/* Memory Usage */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Memory</span>
                    <span className={agent.memoryUsage > 80 ? 'text-red-600 font-medium' : ''}>{agent.memoryUsage}%</span>
                  </div>
                  <Progress value={agent.memoryUsage} className="h-2" />
                </div>

                {/* Task Load */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Tasks</span>
                    <span>{agent.currentTasks}/{agent.maxTasks}</span>
                  </div>
                  <Progress value={(agent.currentTasks / agent.maxTasks) * 100} className="h-2" />
                </div>

                {/* Success Rate */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Success Rate</span>
                    <span className={agent.successRate < 90 ? 'text-yellow-600 font-medium' : 'text-green-600'}>{agent.successRate}%</span>
                  </div>
                  <Progress value={agent.successRate} className="h-2" />
                </div>
              </div>

              <div className="flex justify-between text-sm text-slate-600">
                <span>Response Time: {agent.responseTime}ms</span>
                <span>Uptime: {agent.uptime}%</span>
                <span>Errors: {agent.errorCount}</span>
                <span>Last Heartbeat: {new Date(agent.lastHeartbeat).toLocaleTimeString()}</span>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline">View Logs</Button>
                <Button size="sm" variant="outline">Restart Agent</Button>
                {agent.status === 'critical' && (
                  <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                    Emergency Stop
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
