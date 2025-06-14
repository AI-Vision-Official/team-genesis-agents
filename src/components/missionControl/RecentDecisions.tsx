
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain } from 'lucide-react';
import { getDecisionTypeIcon, getDecisionTypeColor, getOutcomeColor } from './DecisionUtils';
import type { AutonomousDecision } from '@/types/missionControl';

interface RecentDecisionsProps {
  decisions: AutonomousDecision[];
}

export const RecentDecisions = ({ decisions }: RecentDecisionsProps) => {
  return (
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
          {decisions.map((decision) => (
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
  );
};
