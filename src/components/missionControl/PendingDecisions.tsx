
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock } from 'lucide-react';
import { getDecisionTypeIcon, getDecisionTypeColor } from './DecisionUtils';
import type { AutonomousDecision } from '@/types/missionControl';

interface PendingDecisionsProps {
  decisions: AutonomousDecision[];
}

export const PendingDecisions = ({ decisions }: PendingDecisionsProps) => {
  if (decisions.length === 0) {
    return null;
  }

  return (
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
          {decisions.map((decision) => (
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
  );
};
