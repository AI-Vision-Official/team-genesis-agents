
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Bot, 
  Users, 
  Zap, 
  Shield, 
  Brain,
  TrendingUp,
  Network,
  Settings,
  Eye,
  AlertTriangle
} from 'lucide-react';
import type { Agent } from '@/types/agentFramework';

interface AgentGridProps {
  agents: Agent[];
}

export const AgentGrid = ({ agents }: AgentGridProps) => {
  const getRoleIcon = (type: string) => {
    switch (type) {
      case 'leader': return <Users className="w-5 h-5 text-purple-600" />;
      case 'specialist': return <Brain className="w-5 h-5 text-blue-600" />;
      case 'coordinator': return <Network className="w-5 h-5 text-green-600" />;
      case 'support': return <Zap className="w-5 h-5 text-orange-600" />;
      case 'analyst': return <TrendingUp className="w-5 h-5 text-indigo-600" />;
      case 'executor': return <Bot className="w-5 h-5 text-gray-600" />;
      default: return <Bot className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'idle': return 'bg-yellow-100 text-yellow-800';
      case 'spawning': return 'bg-blue-100 text-blue-800';
      case 'training': return 'bg-purple-100 text-purple-800';
      case 'offline': return 'bg-gray-100 text-gray-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getWorkloadColor = (workload: number) => {
    if (workload < 50) return 'text-green-600';
    if (workload < 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getDepartmentColor = (department: string) => {
    switch (department) {
      case 'marketing': return 'from-pink-50 to-pink-100 border-pink-200';
      case 'development': return 'from-blue-50 to-blue-100 border-blue-200';
      case 'humanitarian': return 'from-green-50 to-green-100 border-green-200';
      case 'creative': return 'from-purple-50 to-purple-100 border-purple-200';
      case 'operations': return 'from-orange-50 to-orange-100 border-orange-200';
      case 'security': return 'from-red-50 to-red-100 border-red-200';
      case 'research': return 'from-indigo-50 to-indigo-100 border-indigo-200';
      default: return 'from-gray-50 to-gray-100 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Agent Fleet Management</h2>
          <p className="text-slate-600">Monitor and manage your autonomous AI agents</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
          <Bot className="w-4 h-4 mr-2" />
          Spawn New Agent
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <Card key={agent.id} className={`hover:shadow-lg transition-shadow bg-gradient-to-br ${getDepartmentColor(agent.role.department)}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {getRoleIcon(agent.role.type)}
                  <div>
                    <CardTitle className="text-lg">{agent.name}</CardTitle>
                    <CardDescription className="font-medium">
                      {agent.role.name}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <Badge className={getStatusColor(agent.status)}>
                    {agent.status}
                  </Badge>
                  {agent.role.canSpawnAgents && (
                    <Badge variant="outline" className="text-xs">
                      <Users className="w-3 h-3 mr-1" />
                      Spawner
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Workload</span>
                    <span className={getWorkloadColor(agent.workload)}>{agent.workload}%</span>
                  </div>
                  <Progress value={agent.workload} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Efficiency</span>
                    <span>{agent.efficiency}%</span>
                  </div>
                  <Progress value={agent.efficiency} className="h-2" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Department:</span>
                  <Badge variant="secondary">{agent.role.department}</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Autonomy:</span>
                  <Badge variant="outline">{agent.role.autonomyLevel}</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Security:</span>
                  <div className="flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    <span className="text-xs">{agent.role.securityClearance}</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-1">Specializations:</p>
                <div className="flex flex-wrap gap-1">
                  {agent.specializations.slice(0, 3).map((spec, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {spec}
                    </Badge>
                  ))}
                  {agent.specializations.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{agent.specializations.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs text-center">
                <div>
                  <div className="font-medium">{agent.metrics.tasksCompleted}</div>
                  <div className="text-slate-600">Tasks</div>
                </div>
                <div>
                  <div className="font-medium">{agent.metrics.agentsSpawned}</div>
                  <div className="text-slate-600">Spawned</div>
                </div>
                <div>
                  <div className="font-medium">{agent.metrics.uptime.toFixed(1)}%</div>
                  <div className="text-slate-600">Uptime</div>
                </div>
              </div>

              {agent.subordinateIds.length > 0 && (
                <div className="pt-2 border-t">
                  <div className="flex items-center gap-2 text-sm">
                    <Network className="w-4 h-4 text-slate-600" />
                    <span>Managing {agent.subordinateIds.length} subordinates</span>
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <Button size="sm" className="flex-1">
                  <Eye className="w-4 h-4 mr-1" />
                  Details
                </Button>
                <Button size="sm" variant="outline">
                  <Settings className="w-4 h-4" />
                </Button>
                {agent.workload > 80 && (
                  <Button size="sm" variant="outline" className="text-orange-600">
                    <AlertTriangle className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Agent Creation Prompt */}
      <Card className="border-dashed border-2 border-slate-300 hover:border-blue-400 transition-colors">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <Bot className="w-12 h-12 text-slate-400 mb-4" />
          <h3 className="text-lg font-medium text-slate-600 mb-2">Deploy New Agent</h3>
          <p className="text-sm text-slate-500 mb-4 max-w-md">
            Create specialized AI agents for specific roles or let existing agents spawn new team members automatically
          </p>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
            <Bot className="w-4 h-4 mr-2" />
            Create Agent
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
