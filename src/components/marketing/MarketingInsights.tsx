
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  AlertTriangle, 
  Lightbulb, 
  Users, 
  Target,
  Eye,
  Brain
} from 'lucide-react';
import type { MarketingInsight } from '@/types/marketing';

interface MarketingInsightsProps {
  insights: MarketingInsight[];
}

export const MarketingInsights = ({ insights }: MarketingInsightsProps) => {
  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'trend_analysis': return <TrendingUp className="w-5 h-5" />;
      case 'audience_behavior': return <Users className="w-5 h-5" />;
      case 'competitor_move': return <Target className="w-5 h-5" />;
      case 'performance_anomaly': return <AlertTriangle className="w-5 h-5" />;
      case 'opportunity': return <Lightbulb className="w-5 h-5" />;
      default: return <Brain className="w-5 h-5" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'immediate': return 'bg-red-500';
      case 'short_term': return 'bg-yellow-500';
      case 'long_term': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5" />
          AI Marketing Insights
        </CardTitle>
        <CardDescription>Real-time analysis and actionable recommendations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight) => (
            <div key={insight.id} className="p-4 bg-slate-50 rounded-lg border-l-4 border-l-purple-500">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  {getInsightIcon(insight.type)}
                  <div>
                    <h4 className="font-medium">{insight.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getImpactColor(insight.impact)}>
                        {insight.impact} impact
                      </Badge>
                      <div className="flex items-center gap-1">
                        <div className={`w-2 h-2 rounded-full ${getUrgencyColor(insight.urgency)}`} />
                        <span className="text-xs text-slate-600">{insight.urgency}</span>
                      </div>
                      <span className="text-xs text-slate-500">
                        {insight.confidence}% confidence
                      </span>
                    </div>
                  </div>
                </div>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                  <Eye className="w-4 h-4 mr-2" />
                  Act on Insight
                </Button>
              </div>
              
              <p className="text-slate-600 mb-3">{insight.description}</p>
              
              <div>
                <h5 className="text-sm font-medium mb-2">Suggested Actions:</h5>
                <div className="flex flex-wrap gap-2">
                  {insight.suggestedActions.map((action, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {action}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-3 text-xs text-slate-500">
                <span>Source: {insight.dataSource}</span>
                <span>{insight.timestamp.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
