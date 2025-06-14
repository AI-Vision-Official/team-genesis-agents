
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Bot, 
  TrendingUp, 
  AlertTriangle, 
  Users,
  Brain,
  Shield,
  Zap,
  Clock
} from 'lucide-react';
import type { Agent, DashboardAlert, AIDecisionSuggestion, SpawnRequest } from '@/types/agentFramework';

interface DashboardOverviewProps {
  agents: Agent[];
  alerts: DashboardAlert[];
  suggestions: AIDecisionSuggestion[];
  spawnRequests: SpawnRequest[];
}

export const DashboardOverview = ({ agents, alerts, suggestions, spawnRequests }: DashboardOverviewProps) => {
  const activeAgents = agents.filter(a => a.status === 'active');
  const highWorkloadAgents = agents.filter(a => a.workload > 80);
  const pendingAlerts = alerts.filter(a => !a.read);
  const criticalAlerts = alerts.filter(a => a.severity === 'critical');
  const pendingSpawns = spawnRequests.filter(r => r.status === 'pending');

  const systemHealth = {
    overall: 94,
    performance: 91,
    security: 97,
    efficiency: 89
  };

  return (
    <div className="space-y-6">
      {/* System Health Overview */}
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-blue-600" />
            Agent Framework Health
          </CardTitle>
          <CardDescription>Real-time system status and performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Overall Health</span>
                <span className="font-medium">{systemHealth.overall}%</span>
              </div>
              <Progress value={systemHealth.overall} className="h-3" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Performance</span>
                <span className="font-medium">{systemHealth.performance}%</span>
              </div>
              <Progress value={systemHealth.performance} className="h-3" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Security</span>
                <span className="font-medium">{systemHealth.security}%</span>
              </div>
              <Progress value={systemHealth.security} className="h-3" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Efficiency</span>
                <span className="font-medium">{systemHealth.efficiency}%</span>
              </div>
              <Progress value={systemHealth.efficiency} className="h-3" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              Active Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            {pendingAlerts.length === 0 ? (
              <div className="text-center py-4">
                <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm text-slate-600">All systems nominal</p>
              </div>
            ) : (
              <div className="space-y-2">
                {pendingAlerts.slice(0, 3).map((alert) => (
                  <div key={alert.id} className="p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={alert.severity === 'critical' ? 'destructive' : 'secondary'}>
                        {alert.severity}
                      </Badge>
                      <span className="font-medium text-sm">{alert.title}</span>
                    </div>
                    <p className="text-xs text-slate-600">{alert.message}</p>
                  </div>
                ))}
                {pendingAlerts.length > 3 && (
                  <p className="text-xs text-slate-500 text-center">
                    +{pendingAlerts.length - 3} more alerts
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              Pending Spawns
            </CardTitle>
          </CardHeader>
          <CardContent>
            {pendingSpawns.length === 0 ? (
              <div className="text-center py-4">
                <Bot className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-sm text-slate-600">No pending requests</p>
              </div>
            ) : (
              <div className="space-y-2">
                {pendingSpawns.slice(0, 3).map((request) => (
                  <div key={request.id} className="p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline">{request.urgency}</Badge>
                      <span className="font-medium text-sm">{request.requestedRole.name}</span>
                    </div>
                    <p className="text-xs text-slate-600">{request.justification}</p>
                  </div>
                ))}
                {pendingSpawns.length > 3 && (
                  <p className="text-xs text-slate-500 text-center">
                    +{pendingSpawns.length - 3} more requests
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-600" />
              AI Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            {suggestions.length === 0 ? (
              <div className="text-center py-4">
                <TrendingUp className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-sm text-slate-600">No new suggestions</p>
              </div>
            ) : (
              <div className="space-y-2">
                {suggestions.slice(0, 3).map((suggestion) => (
                  <div key={suggestion.id} className="p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline">{suggestion.impact} impact</Badge>
                      <span className="font-medium text-sm">{suggestion.title}</span>
                    </div>
                    <p className="text-xs text-slate-600">{suggestion.description}</p>
                  </div>
                ))}
                {suggestions.length > 3 && (
                  <p className="text-xs text-slate-500 text-center">
                    +{suggestions.length - 3} more suggestions
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Agent Fleet Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-5 h-5" />
            Agent Fleet Status
          </CardTitle>
          <CardDescription>Current status and workload of all active agents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {agents.slice(0, 6).map((agent) => (
              <div key={agent.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{agent.name}</h4>
                  <Badge variant={agent.status === 'active' ? 'default' : 'secondary'}>
                    {agent.status}
                  </Badge>
                </div>
                <p className="text-sm text-slate-600 mb-3">{agent.role.name}</p>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Workload</span>
                      <span className={agent.workload > 80 ? 'text-red-600' : 'text-slate-600'}>
                        {agent.workload}%
                      </span>
                    </div>
                    <Progress value={agent.workload} className="h-2" />
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Efficiency: {agent.efficiency}%</span>
                    <span>Tasks: {agent.metrics.tasksCompleted}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {agents.length > 6 && (
            <div className="text-center mt-4">
              <p className="text-sm text-slate-500">
                Showing 6 of {agents.length} agents
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Performance Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Average Agent Efficiency</span>
                <span className="font-medium text-green-600">+2.3%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Task Completion Rate</span>
                <span className="font-medium text-green-600">+5.1%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">System Uptime</span>
                <span className="font-medium text-green-600">99.8%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Communication Efficiency</span>
                <span className="font-medium text-green-600">+1.7%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-600" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-slate-400" />
                <div className="flex-1">
                  <p className="text-sm">New agent spawned: SecuritySpecialist-Gamma</p>
                  <p className="text-xs text-slate-500">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-slate-400" />
                <div className="flex-1">
                  <p className="text-sm">Workflow "Crisis Response" completed</p>
                  <p className="text-xs text-slate-500">15 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-slate-400" />
                <div className="flex-1">
                  <p className="text-sm">Security scan completed - 0 issues found</p>
                  <p className="text-xs text-slate-500">1 hour ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
