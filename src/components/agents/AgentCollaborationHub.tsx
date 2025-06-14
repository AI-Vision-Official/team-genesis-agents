
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { 
  Users, 
  MessageSquare, 
  Target, 
  Clock, 
  Brain,
  Share2,
  Zap,
  CheckCircle,
  AlertCircle,
  ArrowRight
} from 'lucide-react';

interface CollaborationSession {
  id: string;
  name: string;
  participants: string[];
  objective: string;
  status: 'planning' | 'active' | 'paused' | 'completed';
  progress: number;
  startTime: Date;
  messages: CollaborationMessage[];
  sharedResources: SharedResource[];
}

interface CollaborationMessage {
  id: string;
  agentId: string;
  agentName: string;
  message: string;
  timestamp: Date;
  type: 'info' | 'proposal' | 'decision' | 'request';
}

interface SharedResource {
  id: string;
  name: string;
  type: 'data' | 'tool' | 'knowledge' | 'task';
  owner: string;
  accessLevel: 'read' | 'write' | 'admin';
  lastUpdated: Date;
}

export const AgentCollaborationHub = () => {
  const [activeSessions, setActiveSessions] = useState<CollaborationSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Mock collaboration sessions
    const mockSessions: CollaborationSession[] = [
      {
        id: 'collab-1',
        name: 'Market Analysis Project',
        participants: ['DataAnalyst-Alpha', 'ResearchBot-Beta', 'InsightGen-Gamma'],
        objective: 'Analyze emerging market trends for Q1 strategy',
        status: 'active',
        progress: 67,
        startTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
        messages: [
          {
            id: 'msg-1',
            agentId: 'data-alpha',
            agentName: 'DataAnalyst-Alpha',
            message: 'I\'ve completed the initial data collection. Found 15% growth in AI tool adoption.',
            timestamp: new Date(Date.now() - 30 * 60 * 1000),
            type: 'info'
          },
          {
            id: 'msg-2',
            agentId: 'research-beta',
            agentName: 'ResearchBot-Beta',
            message: 'Proposing we focus on enterprise segment - showing highest conversion rates.',
            timestamp: new Date(Date.now() - 15 * 60 * 1000),
            type: 'proposal'
          }
        ],
        sharedResources: [
          {
            id: 'res-1',
            name: 'Market Data Q1',
            type: 'data',
            owner: 'DataAnalyst-Alpha',
            accessLevel: 'read',
            lastUpdated: new Date()
          }
        ]
      },
      {
        id: 'collab-2',
        name: 'Customer Support Optimization',
        participants: ['ChatBot-Delta', 'AnalyticsAgent-Epsilon'],
        objective: 'Reduce response time and improve satisfaction scores',
        status: 'planning',
        progress: 23,
        startTime: new Date(),
        messages: [],
        sharedResources: []
      }
    ];
    
    setActiveSessions(mockSessions);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'planning': return 'bg-blue-500';
      case 'paused': return 'bg-yellow-500';
      case 'completed': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getMessageTypeIcon = (type: string) => {
    switch (type) {
      case 'proposal': return <Brain className="w-4 h-4 text-purple-600" />;
      case 'decision': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'request': return <AlertCircle className="w-4 h-4 text-orange-600" />;
      default: return <MessageSquare className="w-4 h-4 text-blue-600" />;
    }
  };

  const selectedSessionData = activeSessions.find(s => s.id === selectedSession);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-500" />
            Agent Collaboration Hub
          </h2>
          <p className="text-slate-600 mt-1">Real-time collaboration and coordination between AI agents</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
          <Share2 className="w-4 h-4 mr-2" />
          Start New Session
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Sessions */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Active Sessions
              </CardTitle>
              <CardDescription>Ongoing collaboration projects</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {activeSessions.map((session) => (
                <div 
                  key={session.id} 
                  className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                    selectedSession === session.id ? 'bg-blue-50 border-blue-300' : 'bg-slate-50 hover:bg-slate-100'
                  }`}
                  onClick={() => setSelectedSession(session.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">{session.name}</h4>
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(session.status)}`} />
                  </div>
                  <p className="text-xs text-slate-600 mb-2">{session.objective}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span>{session.participants.length} agents</span>
                    <span>{session.progress}%</span>
                  </div>
                  <Progress value={session.progress} className="h-1 mt-1" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Session Details */}
        <div className="lg:col-span-2">
          {selectedSessionData ? (
            <div className="space-y-4">
              {/* Session Header */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{selectedSessionData.name}</CardTitle>
                      <CardDescription>{selectedSessionData.objective}</CardDescription>
                    </div>
                    <Badge className={`${getStatusColor(selectedSessionData.status)} text-white`}>
                      {selectedSessionData.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-600">Participants:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedSessionData.participants.map((agent) => (
                          <Badge key={agent} variant="outline" className="text-xs">
                            {agent}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-600">Progress:</span>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress value={selectedSessionData.progress} className="flex-1 h-2" />
                        <span className="text-sm font-medium">{selectedSessionData.progress}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Messages */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Collaboration Feed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {selectedSessionData.messages.map((message) => (
                      <div key={message.id} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                        {getMessageTypeIcon(message.type)}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{message.agentName}</span>
                            <Badge variant="outline" className="text-xs">
                              {message.type}
                            </Badge>
                            <span className="text-xs text-slate-500">
                              {message.timestamp.toLocaleTimeString()}
                            </span>
                          </div>
                          <p className="text-sm text-slate-700">{message.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 flex gap-2">
                    <Textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Add to the collaboration..."
                      rows={2}
                      className="flex-1"
                    />
                    <Button className="self-end">
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Shared Resources */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Share2 className="w-5 h-5" />
                    Shared Resources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {selectedSessionData.sharedResources.map((resource) => (
                      <div key={resource.id} className="flex items-center justify-between p-2 bg-slate-50 rounded">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${
                            resource.type === 'data' ? 'bg-blue-500' :
                            resource.type === 'tool' ? 'bg-green-500' :
                            resource.type === 'knowledge' ? 'bg-purple-500' : 'bg-orange-500'
                          }`} />
                          <span className="text-sm font-medium">{resource.name}</span>
                          <Badge variant="outline" className="text-xs">{resource.type}</Badge>
                        </div>
                        <div className="text-xs text-slate-600">
                          {resource.accessLevel} • {resource.owner}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card className="h-96 flex items-center justify-center">
              <div className="text-center text-slate-500">
                <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Select a collaboration session to view details</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
