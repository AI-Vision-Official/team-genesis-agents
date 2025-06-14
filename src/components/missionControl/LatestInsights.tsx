
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp } from 'lucide-react';
import type { DataInsight } from '@/types/missionControl';

interface LatestInsightsProps {
  insights: DataInsight[];
}

export const LatestInsights = ({ insights }: LatestInsightsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Latest AI Insights
        </CardTitle>
        <CardDescription>Real-time analysis and recommendations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight) => (
            <div key={insight.id} className="flex items-start justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-medium">{insight.title}</h4>
                  <Badge className={insight.importance === 'high' ? 'bg-red-500' : insight.importance === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}>
                    {insight.importance}
                  </Badge>
                </div>
                <p className="text-sm text-slate-600 mb-2">{insight.description}</p>
                <div className="flex flex-wrap gap-1">
                  {insight.suggestedActions.map((action, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {action}
                    </Badge>
                  ))}
                </div>
              </div>
              <Button size="sm" variant="outline">
                Act on Insight
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
