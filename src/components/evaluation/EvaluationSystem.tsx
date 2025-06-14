
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, MessageSquare, TrendingUp, Users, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { EvaluationSession, AgentReview } from '@/types/evaluation';
import { ReviewForm } from './ReviewForm';
import { LearningDashboard } from './LearningDashboard';
import { ReviewHistory } from './ReviewHistory';

interface EvaluationSystemProps {
  agents: any[];
  tasks: any[];
}

export const EvaluationSystem = ({ agents, tasks }: EvaluationSystemProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeSessions, setActiveSessions] = useState<EvaluationSession[]>([]);
  const [pendingReviews, setPendingReviews] = useState<AgentReview[]>([]);

  // Mock data for demonstration
  useEffect(() => {
    const mockSessions: EvaluationSession[] = [
      {
        id: '1',
        taskId: '1',
        participantAgents: ['DataAnalyst-Alpha', 'CodeReviewer-Beta'],
        reviewPairs: [
          { reviewerId: 'DataAnalyst-Alpha', revieweeId: 'CodeReviewer-Beta', status: 'completed' },
          { reviewerId: 'CodeReviewer-Beta', revieweeId: 'DataAnalyst-Alpha', status: 'in_progress' }
        ],
        sessionType: 'peer_review',
        startTime: new Date(),
        status: 'active',
        learningOutcomes: []
      }
    ];

    const mockPendingReviews: AgentReview[] = [
      {
        id: '1',
        reviewerId: 'CodeReviewer-Beta',
        revieweeId: 'DataAnalyst-Alpha',
        taskId: '1',
        criteria: [],
        scores: [],
        feedback: {
          strengths: [],
          improvements: [],
          specificSuggestions: [],
          collaborationNotes: '',
          overallRating: 0
        },
        timestamp: new Date(),
        status: 'pending'
      }
    ];

    setActiveSessions(mockSessions);
    setPendingReviews(mockPendingReviews);
  }, []);

  const getSessionStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Clock className="w-4 h-4 text-blue-600" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'analyzing': return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Self-Evaluation Loop</h2>
          <p className="text-slate-600">Peer review system for continuous agent improvement</p>
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
          Start New Evaluation Session
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-blue-700 flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Active Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{activeSessions.length}</div>
            <p className="text-xs text-blue-600">Ongoing evaluations</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-yellow-700 flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Pending Reviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-900">{pendingReviews.length}</div>
            <p className="text-xs text-yellow-600">Awaiting feedback</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-green-700 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Learning Adjustments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">12</div>
            <p className="text-xs text-green-600">Improvements implemented</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-purple-700 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Collaboration Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">8.7</div>
            <p className="text-xs text-purple-600">Average team rating</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="reviews">Active Reviews</TabsTrigger>
          <TabsTrigger value="learning">Learning Dashboard</TabsTrigger>
          <TabsTrigger value="history">Review History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Active Evaluation Sessions */}
          <Card>
            <CardHeader>
              <CardTitle>Active Evaluation Sessions</CardTitle>
              <CardDescription>Ongoing peer review sessions and their progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeSessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      {getSessionStatusIcon(session.status)}
                      <div>
                        <p className="font-medium">Session {session.id}</p>
                        <p className="text-sm text-slate-600">
                          {session.participantAgents.join(' ↔ ')} • {session.sessionType}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">{session.status}</Badge>
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {session.reviewPairs.filter(pair => pair.status === 'completed').length}/
                          {session.reviewPairs.length} Reviews Complete
                        </p>
                        <Progress 
                          value={(session.reviewPairs.filter(pair => pair.status === 'completed').length / session.reviewPairs.length) * 100} 
                          className="w-24 h-2 mt-1"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews">
          <ReviewForm agents={agents} tasks={tasks} />
        </TabsContent>

        <TabsContent value="learning">
          <LearningDashboard agents={agents} />
        </TabsContent>

        <TabsContent value="history">
          <ReviewHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
};
