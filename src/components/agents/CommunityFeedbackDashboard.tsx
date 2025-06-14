
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { MessageSquare, ThumbsUp, TrendingUp, Star, Users, MessageCircle } from 'lucide-react';

export const CommunityFeedbackDashboard = () => {
  const feedbackMetrics = {
    totalFeedback: 1247,
    satisfactionScore: 4.3,
    responseTime: 2.4,
    implementationRate: 68,
    criticalIssues: 3,
    featureRequests: 89
  };

  const recentFeedback = [
    {
      id: '1',
      type: 'feature_request',
      message: 'Would love to see dark mode integration',
      sentiment: 'positive',
      priority: 'medium',
      votes: 23
    },
    {
      id: '2',
      type: 'bug_report',
      message: 'Authentication flow sometimes fails on mobile',
      sentiment: 'negative',
      priority: 'high',
      votes: 8
    },
    {
      id: '3',
      type: 'praise',
      message: 'The new dashboard design is fantastic!',
      sentiment: 'positive',
      priority: 'low',
      votes: 45
    }
  ];

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-green-100 text-green-800';
      case 'negative': return 'bg-red-100 text-red-800';
      case 'neutral': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Community Feedback Guardian
          </CardTitle>
          <CardDescription>
            Collecting and analyzing community input to guide improvements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-700">{feedbackMetrics.totalFeedback}</p>
              <p className="text-sm text-blue-600">Total Feedback</p>
            </div>
            
            <div className="text-center">
              <p className="text-2xl font-bold text-green-700">{feedbackMetrics.satisfactionScore}/5</p>
              <p className="text-sm text-green-600">Satisfaction Score</p>
            </div>
            
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-700">{feedbackMetrics.responseTime}h</p>
              <p className="text-sm text-purple-600">Avg Response Time</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Feedback Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Feature Requests</span>
                <Badge className="bg-blue-100 text-blue-800">
                  {feedbackMetrics.featureRequests}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Critical Issues</span>
                <Badge className={feedbackMetrics.criticalIssues > 0 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}>
                  {feedbackMetrics.criticalIssues}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Implementation Rate</span>
                  <span>{feedbackMetrics.implementationRate}%</span>
                </div>
                <Progress value={feedbackMetrics.implementationRate} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Recent Feedback
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentFeedback.map((feedback) => (
                <div key={feedback.id} className="p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex gap-2">
                      <Badge className={getSentimentColor(feedback.sentiment)}>
                        {feedback.sentiment}
                      </Badge>
                      <Badge className={getPriorityColor(feedback.priority)}>
                        {feedback.priority}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-slate-600">
                      <ThumbsUp className="w-3 h-3" />
                      {feedback.votes}
                    </div>
                  </div>
                  <p className="text-sm">{feedback.message}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Community Engagement Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              Priority Analysis
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Survey Creator
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Response Templates
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Trend Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
