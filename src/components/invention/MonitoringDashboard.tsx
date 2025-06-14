
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Shield, Brain, Eye } from 'lucide-react';
import type { MonitoringAlert, AIAgent } from '@/types/invention';

interface MonitoringDashboardProps {
  alerts: MonitoringAlert[];
  agents: AIAgent[];
}

export const MonitoringDashboard = ({ alerts, agents }: MonitoringDashboardProps) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAgentStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'scanning': return 'bg-blue-100 text-blue-800';
      case 'analyzing': return 'bg-purple-100 text-purple-800';
      case 'idle': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">AI Monitoring Dashboard</h3>
          <p className="text-slate-600">Real-time protection and conflict detection</p>
        </div>
        <Button className="bg-gradient-to-r from-red-600 to-orange-600">
          <Shield className="w-4 h-4 mr-2" />
          Full Scan
        </Button>
      </div>

      {/* AI Agents Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            AI Protection Agents
          </CardTitle>
          <CardDescription>Status of dedicated monitoring agents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {agents.map((agent) => (
              <div key={agent.id} className="p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{agent.name}</h4>
                  <Badge className={getAgentStatusColor(agent.status)}>
                    {agent.status}
                  </Badge>
                </div>
                <div className="space-y-1 text-sm text-slate-600">
                  <p>Tasks: {agent.tasksCompleted}</p>
                  <p>Alerts: {agent.alertsGenerated}</p>
                  <p>Accuracy: {agent.accuracy}%</p>
                  <p className="text-xs">Last scan: {agent.lastScan.toLocaleTimeString()}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Security Alerts
          </CardTitle>
          <CardDescription>Recent threats and conflicts detected</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="p-4 bg-slate-50 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getSeverityColor(alert.severity)}>
                        {alert.severity}
                      </Badge>
                      <h4 className="font-medium">{alert.title}</h4>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">{alert.description}</p>
                    <div className="text-xs text-slate-500">
                      Source: {alert.source} • Risk: {alert.legalRisk}/10 • 
                      {alert.detectedAt.toLocaleString()}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm">
                      Review
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
