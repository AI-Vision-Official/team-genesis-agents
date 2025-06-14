
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HealthMetrics } from './HealthMetrics';
import { 
  CheckCircle, 
  AlertTriangle, 
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

interface AgentStatusCardProps {
  agent: AgentHealth;
}

export const AgentStatusCard = ({ agent }: AgentStatusCardProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'critical': return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'offline': return <WifiOff className="w-5 h-5 text-gray-600" />;
      default: return <CheckCircle className="w-5 h-5 text-blue-600" />;
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

  return (
    <Card className={`border-l-4 ${
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
        <HealthMetrics
          cpuUsage={agent.cpuUsage}
          memoryUsage={agent.memoryUsage}
          currentTasks={agent.currentTasks}
          maxTasks={agent.maxTasks}
          successRate={agent.successRate}
        />

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
  );
};
