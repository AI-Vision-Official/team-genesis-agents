
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Bot, Zap, GitBranch, Settings, Play, Pause } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'idle' | 'spawning' | 'error';
  capabilities: string[];
  currentTask: string;
  efficiency: number;
  tasksCompleted: number;
  spawnedAgents: number;
}

interface AgentCardProps {
  agent: Agent;
}

export const AgentCard = ({ agent }: AgentCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'spawning': return 'bg-blue-500';
      case 'idle': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Active';
      case 'spawning': return 'Spawning Agents';
      case 'idle': return 'Idle';
      case 'error': return 'Error';
      default: return 'Unknown';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-slate-200 bg-white">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-purple-600" />
            <CardTitle className="text-lg">{agent.name}</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${getStatusColor(agent.status)}`} />
            <Badge variant="secondary" className="text-xs">
              {getStatusText(agent.status)}
            </Badge>
          </div>
        </div>
        <CardDescription className="text-slate-600">{agent.type}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Current Task */}
        <div>
          <h4 className="font-medium text-sm mb-2">Current Task</h4>
          <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">
            {agent.currentTask}
          </p>
        </div>

        {/* Capabilities */}
        <div>
          <h4 className="font-medium text-sm mb-2">Capabilities</h4>
          <div className="flex flex-wrap gap-1">
            {agent.capabilities.map((capability, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {capability}
              </Badge>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-slate-600">Efficiency</span>
              <span className="font-medium">{agent.efficiency}%</span>
            </div>
            <Progress value={agent.efficiency} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <Zap className="w-4 h-4 text-blue-600" />
                <span className="font-bold text-lg">{agent.tasksCompleted}</span>
              </div>
              <p className="text-xs text-slate-600">Tasks Done</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <GitBranch className="w-4 h-4 text-green-600" />
                <span className="font-bold text-lg">{agent.spawnedAgents}</span>
              </div>
              <p className="text-xs text-slate-600">Spawned</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button 
            size="sm" 
            className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            {agent.status === 'active' ? <Pause className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
            {agent.status === 'active' ? 'Pause' : 'Start'}
          </Button>
          <Button size="sm" variant="outline">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
