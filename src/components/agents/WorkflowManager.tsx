
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Workflow, 
  Play, 
  Pause, 
  Settings, 
  Plus,
  Clock,
  Users,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

export const WorkflowManager = () => {
  // Mock workflow data
  const workflows = [
    {
      id: 'wf-1',
      name: 'Agent Onboarding',
      description: 'Complete workflow for new agent integration and training',
      status: 'active',
      progress: 75,
      steps: 8,
      completedSteps: 6,
      involvedAgents: 3,
      estimatedTime: '2 hours',
      triggerConditions: ['New agent spawned', 'Manual trigger'],
      automated: true
    },
    {
      id: 'wf-2',
      name: 'Crisis Response',
      description: 'Emergency response protocol with automatic agent allocation',
      status: 'standby',
      progress: 100,
      steps: 12,
      completedSteps: 12,
      involvedAgents: 8,
      estimatedTime: '30 minutes',
      triggerConditions: ['Crisis alert detected', 'Manual emergency trigger'],
      automated: true
    },
    {
      id: 'wf-3',
      name: 'Task Escalation',
      description: 'Automatic task escalation when deadlines approach',
      status: 'running',
      progress: 45,
      steps: 5,
      completedSteps: 2,
      involvedAgents: 2,
      estimatedTime: '1 hour',
      triggerConditions: ['Task deadline < 2 hours', 'Task blocked > 1 hour'],
      automated: true
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Play className="w-4 h-4 text-green-600" />;
      case 'running': return <Play className="w-4 h-4 text-blue-600" />;
      case 'standby': return <Pause className="w-4 h-4 text-yellow-600" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-purple-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'running': return 'bg-blue-100 text-blue-800';
      case 'standby': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Workflow Management</h2>
          <p className="text-slate-600">Automated workflows and task orchestration</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
          <Plus className="w-4 h-4 mr-2" />
          Create Workflow
        </Button>
      </div>

      {/* Active Workflows */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {workflows.map((workflow) => (
          <Card key={workflow.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {getStatusIcon(workflow.status)}
                  <div>
                    <CardTitle className="text-lg">{workflow.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {workflow.description}
                    </CardDescription>
                  </div>
                </div>
                <Badge className={getStatusColor(workflow.status)}>
                  {workflow.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{workflow.completedSteps}/{workflow.steps} steps</span>
                </div>
                <Progress value={workflow.progress} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="flex items-center gap-1 text-slate-600">
                    <Users className="w-3 h-3" />
                    <span>Agents</span>
                  </div>
                  <div className="font-medium">{workflow.involvedAgents}</div>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-slate-600">
                    <Clock className="w-3 h-3" />
                    <span>Est. Time</span>
                  </div>
                  <div className="font-medium">{workflow.estimatedTime}</div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Trigger Conditions:</h4>
                <div className="space-y-1">
                  {workflow.triggerConditions.map((condition, index) => (
                    <div key={index} className="text-xs bg-slate-100 rounded px-2 py-1">
                      {condition}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1">
                  {workflow.automated ? (
                    <>
                      <CheckCircle className="w-3 h-3 text-green-600" />
                      <span className="text-green-600">Automated</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-3 h-3 text-orange-600" />
                      <span className="text-orange-600">Manual</span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button size="sm" className="flex-1">
                  <Workflow className="w-4 h-4 mr-1" />
                  View Details
                </Button>
                <Button size="sm" variant="outline">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Workflow Templates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Workflow Templates
          </CardTitle>
          <CardDescription>Pre-built workflows for common scenarios</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              'Security Incident Response',
              'Project Deployment',
              'Performance Review',
              'Resource Scaling',
              'Quality Assurance',
              'Customer Support Escalation'
            ].map((template, index) => (
              <div key={index} className="p-4 border border-dashed border-slate-300 rounded-lg hover:border-blue-400 transition-colors cursor-pointer">
                <div className="flex items-center gap-2 mb-2">
                  <Workflow className="w-4 h-4 text-slate-600" />
                  <span className="font-medium">{template}</span>
                </div>
                <p className="text-sm text-slate-600">
                  Ready-to-use workflow template
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Workflow Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Active Workflows</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <Play className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Avg Completion</p>
                <p className="text-2xl font-bold">94%</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Time Saved</p>
                <p className="text-2xl font-bold">18h</p>
              </div>
              <Clock className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
