
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, CheckCircle, Clock, TrendingUp, AlertTriangle } from 'lucide-react';
import type { Mission, AutonomousDecision } from '@/types/missionControl';

interface AutonomousDecisionEngineProps {
  missions: Mission[];
}

export const AutonomousDecisionEngine = ({ missions }: AutonomousDecisionEngineProps) => {
  const [recentDecisions, setRecentDecisions] = useState<AutonomousDecision[]>([]);
  const [pendingDecisions, setPendingDecisions] = useState<AutonomousDecision[]>([]);
  const [decisionStats, setDecisionStats] = useState({
    totalToday: 0,
    successRate: 0,
    averageConfidence: 0,
    impactScore: 0
  });

  useEffect(() => {
    // Mock autonomous decisions for demonstration
    const mockDecisions: AutonomousDecision[] = [
      {
        id: '1',
        missionId: '1',
        decisionType: 'agent_assignment',
        description: 'Assigned specialized MarketAnalyst-Epsilon to analyze competitor pricing strategies',
        reasoning: 'Detected 23% price variance in target market. Epsilon has 94% accuracy in competitive analysis.',
        confidence: 0.89,
        dataPoints: ['Market price data', 'Competitor analysis', 'Agent performance history'],
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        outcome: 'successful',
        impact: 0.7
      },
      {
        id: '2',
        missionId: '2',
        decisionType: 'priority_adjustment',
        description: 'Elevated supply chain mission priority from High to Critical',
        reasoning: 'Real-time monitoring detected 15% increase in shipping delays affecting 3 major clients.',
        confidence: 0.95,
        dataPoints: ['Shipping data', 'Client impact analysis', 'Historical patterns'],
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        outcome: 'successful',
        impact: 0.8
      },
      {
        id: '3',
        missionId: '1',
        decisionType: 'resource_allocation',
        description: 'Reallocated $15k from general marketing to AI-powered social media campaigns',
        reasoning: 'Social media ROI showing 340% higher conversion than traditional channels.',
        confidence: 0.82,
        dataPoints: ['ROI analysis', 'Conversion rates', 'Budget efficiency metrics'],
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
        outcome: 'pending',
        impact: 0.6
      }
    ];

    const mockPending: AutonomousDecision[] = [
      {
        id: '4',
        missionId: '1',
        decisionType: 'strategy_change',
        description: 'Proposed shift to focus on enterprise clients based on market analysis',
        reasoning: 'Enterprise segment showing 280% higher lifetime value and 45% lower churn rate.',
        confidence: 0.76,
        dataPoints: ['Customer lifetime value', 'Churn analysis', 'Market segmentation'],
        timestamp: new Date(),
        outcome: 'pending'
      }
    ];

    setRecentDecisions(mockDecisions);
    setPendingDecisions(mockPending);
    setDecisionStats({
      totalToday: 47,
      successRate: 0.89,
      averageConfidence: 0.84,
      impactScore: 0.73
    });
  }, []);

  const getDecisionTypeIcon = (type: string) => {
    switch (type) {
      case 'agent_assignment': return <Brain className="w-4 h-4" />;
      case 'priority_adjustment': return <AlertTriangle className="w-4 h-4" />;
      case 'resource_allocation': return <TrendingUp className="w-4 h-4" />;
      case 'strategy_change': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getDecisionTypeColor = (type: string) => {
    switch (type) {
      case 'agent_assignment': return 'bg-blue-500';
      case 'priority_adjustment': return 'bg-red-500';
      case 'resource_allocation': return 'bg-green-500';
      case 'strategy_change': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getOutcomeColor = (outcome?: string) => {
    switch (outcome) {
      case 'successful': return 'text-green-600';
      case 'failed': return 'text-red-600';
      case 'pending': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Decision Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700">Decisions Today</p>
                <p className="text-2xl font-bold text-blue-900">{decisionStats.totalToday}</p>
              </div>
              <Brain className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700">Success Rate</p>
                <p className="text-2xl font-bold text-green-900">{(decisionStats.successRate * 100).toFixed(1)}%</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700">Avg Confidence</p>
                <p className="text-2xl font-bold text-purple-900">{(decisionStats.averageConfidence * 100).toFixed(1)}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-700">Impact Score</p>
                <p className="text-2xl font-bold text-orange-900">{(decisionStats.impactScore * 100).toFixed(1)}%</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Decisions */}
      {pendingDecisions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-yellow-600" />
              Pending AI Decisions
            </CardTitle>
            <CardDescription>Decisions awaiting approval or execution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingDecisions.map((decision) => (
                <div key={decision.id} className="p-4 border border-yellow-200 rounded-lg bg-yellow-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`p-1 rounded ${getDecisionTypeColor(decision.decisionType)} text-white`}>
                          {getDecisionTypeIcon(decision.decisionType)}
                        </div>
                        <h4 className="font-medium">{decision.description}</h4>
                        <Badge variant="outline">
                          {(decision.confidence * 100).toFixed(0)}% confidence
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600 mb-3">{decision.reasoning}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {decision.dataPoints.map((point, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {point}
                          </Badge>
                        ))}
                      </div>
                      <Progress value={decision.confidence * 100} className="h-2" />
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Approve
                      </Button>
                      <Button size="sm" variant="outline">
                        Review
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Decisions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            Recent AI Decisions
          </CardTitle>
          <CardDescription>Latest autonomous decisions and their outcomes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentDecisions.map((decision) => (
              <div key={decision.id} className="p-4 bg-slate-50 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`p-1 rounded ${getDecisionTypeColor(decision.decisionType)} text-white`}>
                        {getDecisionTypeIcon(decision.decisionType)}
                      </div>
                      <h4 className="font-medium">{decision.description}</h4>
                      <Badge variant="outline">
                        {(decision.confidence * 100).toFixed(0)}% confidence
                      </Badge>
                      {decision.outcome && (
                        <Badge className={getOutcomeColor(decision.outcome)}>
                          {decision.outcome}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 mb-3">{decision.reasoning}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {decision.dataPoints.map((point, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {point}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span>{decision.timestamp.toLocaleString()}</span>
                      {decision.impact && (
                        <span>Impact: {(decision.impact * 100).toFixed(0)}%</span>
                      )}
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
