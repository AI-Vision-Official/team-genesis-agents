
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Bot, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle,
  Users,
  Brain,
  Zap
} from 'lucide-react';
import type { SpawnRequest, Agent } from '@/types/agentFramework';

interface SpawnManagementProps {
  spawnRequests: SpawnRequest[];
  agents: Agent[];
  onApproveSpawn: (id: string) => void;
  onRejectSpawn: (id: string) => void;
}

export const SpawnManagement = ({ spawnRequests, agents, onApproveSpawn, onRejectSpawn }: SpawnManagementProps) => {
  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'spawning': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRequestingAgent = (agentId: string) => {
    return agents.find(a => a.id === agentId);
  };

  const pendingRequests = spawnRequests.filter(r => r.status === 'pending');
  const recentRequests = spawnRequests.filter(r => r.status !== 'pending').slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Agent Spawning Management</h2>
          <p className="text-slate-600">Review and manage autonomous agent creation requests</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {pendingRequests.length} Pending
          </Badge>
        </div>
      </div>

      {/* Pending Requests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            Pending Spawn Requests
          </CardTitle>
          <CardDescription>Requests requiring your approval for new agent creation</CardDescription>
        </CardHeader>
        <CardContent>
          {pendingRequests.length === 0 ? (
            <div className="text-center py-8">
              <Bot className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600">No pending spawn requests</p>
              <p className="text-sm text-slate-500">Your agents will request new team members as needed</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingRequests.map((request) => {
                const requestingAgent = getRequestingAgent(request.requestingAgentId);
                return (
                  <Card key={request.id} className="border-l-4 border-l-orange-400">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Bot className="w-5 h-5 text-blue-600" />
                            <h4 className="font-semibold">{request.requestedRole.name}</h4>
                            <Badge className={getUrgencyColor(request.urgency)}>
                              {request.urgency}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600 mb-2">
                            Requested by: <span className="font-medium">{requestingAgent?.name}</span>
                          </p>
                          <p className="text-sm text-slate-700 mb-3">{request.justification}</p>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium">Department:</span> {request.requestedRole.department}
                            </div>
                            <div>
                              <span className="font-medium">Type:</span> {request.requestedRole.type}
                            </div>
                            <div>
                              <span className="font-medium">Duration:</span> {request.estimatedDuration}
                            </div>
                            <div>
                              <span className="font-medium">Autonomy:</span> {request.requestedRole.autonomyLevel}
                            </div>
                          </div>

                          {request.requiredCapabilities.length > 0 && (
                            <div className="mt-3">
                              <span className="text-sm font-medium">Required Capabilities:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {request.requiredCapabilities.map((capability, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {capability}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            onClick={() => onApproveSpawn(request.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => onRejectSpawn(request.id)}
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Requests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            Recent Spawn Activity
          </CardTitle>
          <CardDescription>History of recent agent spawning decisions</CardDescription>
        </CardHeader>
        <CardContent>
          {recentRequests.length === 0 ? (
            <div className="text-center py-8">
              <Clock className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600">No recent spawn activity</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentRequests.map((request) => {
                const requestingAgent = getRequestingAgent(request.requestingAgentId);
                return (
                  <div key={request.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Bot className="w-5 h-5 text-slate-600" />
                      <div>
                        <div className="font-medium">{request.requestedRole.name}</div>
                        <div className="text-sm text-slate-600">
                          Requested by {requestingAgent?.name}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(request.status)}>
                        {request.status}
                      </Badge>
                      <span className="text-sm text-slate-500">
                        {request.createdAt.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Spawning Guidelines */}
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-600" />
            Autonomous Spawning Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">Automatic Approval Criteria:</h4>
              <ul className="space-y-1 text-slate-600">
                <li>• Workload exceeds 85% for 24+ hours</li>
                <li>• Critical tasks waiting for {'>'}2 hours</li>
                <li>• Specialized skills gap identified</li>
                <li>• Emergency response scenarios</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Manual Review Required:</h4>
              <ul className="space-y-1 text-slate-600">
                <li>• High security clearance requests</li>
                <li>• Long-term agent deployment</li>
                <li>• Budget implications {'>'} $1000/month</li>
                <li>• New department creation</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
