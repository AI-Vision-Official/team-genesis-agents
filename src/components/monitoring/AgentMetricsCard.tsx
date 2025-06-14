
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import type { AgentMetric } from '@/types/monitoring';

interface AgentMetricsCardProps {
  agent: AgentMetric;
}

export const AgentMetricsCard = ({ agent }: AgentMetricsCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-blue-600 bg-blue-100';
      case 'idle': return 'text-gray-600 bg-gray-100';
      case 'overloaded': return 'text-orange-600 bg-orange-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getUsageColor = (usage: number) => {
    if (usage >= 80) return 'bg-red-500';
    if (usage >= 60) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
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
  );
};
