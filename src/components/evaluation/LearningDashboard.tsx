
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { TrendingUp, Target, CheckCircle, Clock, Brain, Lightbulb } from 'lucide-react';
import { LearningAdjustment } from '@/types/evaluation';

interface LearningDashboardProps {
  agents: any[];
}

export const LearningDashboard = ({ agents }: LearningDashboardProps) => {
  // Mock learning data
  const [learningAdjustments] = useState<LearningAdjustment[]>([
    {
      id: '1',
      agentId: 'DataAnalyst-Alpha',
      basedOnReviewId: 'review-1',
      adjustmentType: 'output_quality',
      description: 'Improve data visualization clarity based on peer feedback',
      implementationPlan: 'Implement more descriptive chart titles and legends, add contextual annotations',
      measurableGoals: ['Increase chart readability score by 20%', 'Reduce clarification requests by 30%'],
      implemented: true,
      effectivenessMeasure: 0.85
    },
    {
      id: '2',
      agentId: 'CodeReviewer-Beta',
      basedOnReviewId: 'review-2',
      adjustmentType: 'collaboration',
      description: 'Enhance communication frequency during code review process',
      implementationPlan: 'Provide interim progress updates every 2 hours, create summary reports',
      measurableGoals: ['Increase team satisfaction score by 15%', 'Reduce review cycle time by 25%'],
      implemented: false
    },
    {
      id: '3',
      agentId: 'ProjectManager-Gamma',
      basedOnReviewId: 'review-3',
      adjustmentType: 'approach',
      description: 'Adopt more flexible project timeline management',
      implementationPlan: 'Implement buffer time allocation, create contingency plans',
      measurableGoals: ['Reduce project delays by 40%', 'Improve team stress levels by 20%'],
      implemented: true,
      effectivenessMeasure: 0.92
    }
  ]);

  const getAdjustmentTypeIcon = (type: string) => {
    switch (type) {
      case 'output_quality': return <Target className="w-4 h-4 text-blue-600" />;
      case 'collaboration': return <Brain className="w-4 h-4 text-green-600" />;
      case 'approach': return <Lightbulb className="w-4 h-4 text-yellow-600" />;
      default: return <TrendingUp className="w-4 h-4 text-purple-600" />;
    }
  };

  const getAdjustmentTypeColor = (type: string) => {
    switch (type) {
      case 'output_quality': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'collaboration': return 'bg-green-100 text-green-800 border-green-200';
      case 'approach': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-purple-100 text-purple-800 border-purple-200';
    }
  };

  const implementedAdjustments = learningAdjustments.filter(adj => adj.implemented);
  const pendingAdjustments = learningAdjustments.filter(adj => !adj.implemented);
  const averageEffectiveness = implementedAdjustments.reduce((sum, adj) => sum + (adj.effectivenessMeasure || 0), 0) / implementedAdjustments.length;

  return (
    <div className="space-y-6">
      {/* Learning Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-green-700 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Implemented Changes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{implementedAdjustments.length}</div>
            <p className="text-xs text-green-600">Learning adjustments applied</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-yellow-700 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Pending Changes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-900">{pendingAdjustments.length}</div>
            <p className="text-xs text-yellow-600">Awaiting implementation</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-purple-700 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Effectiveness
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">
              {Math.round(averageEffectiveness * 100)}%
            </div>
            <p className="text-xs text-purple-600">Average improvement impact</p>
          </CardContent>
        </Card>
      </div>

      {/* Agent Learning Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Agent Learning Progress</CardTitle>
          <CardDescription>Individual improvement journeys and implemented changes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {agents.map((agent) => {
              const agentAdjustments = learningAdjustments.filter(adj => adj.agentId === agent.name);
              const agentImplemented = agentAdjustments.filter(adj => adj.implemented);
              const agentEffectiveness = agentImplemented.length > 0 
                ? agentImplemented.reduce((sum, adj) => sum + (adj.effectivenessMeasure || 0), 0) / agentImplemented.length 
                : 0;

              return (
                <div key={agent.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-purple-500 text-white">
                        {agent.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{agent.name}</p>
                      <p className="text-sm text-slate-600">
                        {agentAdjustments.length} learning adjustments • {agentImplemented.length} implemented
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">Learning Effectiveness</p>
                      <p className="text-2xl font-bold text-purple-600">
                        {Math.round(agentEffectiveness * 100)}%
                      </p>
                    </div>
                    <Progress value={agentEffectiveness * 100} className="w-24 h-3" />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Learning Adjustments */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Learning Adjustments</CardTitle>
          <CardDescription>Specific improvements based on peer feedback</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {learningAdjustments.map((adjustment) => (
              <div key={adjustment.id} className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getAdjustmentTypeIcon(adjustment.adjustmentType)}
                    <div>
                      <p className="font-medium">{adjustment.description}</p>
                      <p className="text-sm text-slate-600">{adjustment.agentId}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getAdjustmentTypeColor(adjustment.adjustmentType)}>
                      {adjustment.adjustmentType.replace('_', ' ')}
                    </Badge>
                    {adjustment.implemented ? (
                      <Badge className="bg-green-500 text-white">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Implemented
                      </Badge>
                    ) : (
                      <Badge variant="outline">
                        <Clock className="w-3 h-3 mr-1" />
                        Pending
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-lg mb-3">
                  <h4 className="font-medium text-sm mb-1">Implementation Plan</h4>
                  <p className="text-sm text-slate-700">{adjustment.implementationPlan}</p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Measurable Goals</h4>
                  <div className="flex flex-wrap gap-2">
                    {adjustment.measurableGoals.map((goal, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        <Target className="w-3 h-3 mr-1" />
                        {goal}
                      </Badge>
                    ))}
                  </div>
                </div>

                {adjustment.implemented && adjustment.effectivenessMeasure && (
                  <div className="mt-3 p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-green-700">Implementation Effectiveness</span>
                      <span className="text-lg font-bold text-green-800">
                        {Math.round(adjustment.effectivenessMeasure * 100)}%
                      </span>
                    </div>
                    <Progress value={adjustment.effectivenessMeasure * 100} className="mt-2 h-2" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
