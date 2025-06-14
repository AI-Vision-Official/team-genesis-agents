
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ChartContainer } from '@/components/ui/chart';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import { getTrendIcon, getTrendColor, getBurnoutRiskColor, getRadarData } from './AgentMotivationUtils';
import type { AgentPerformanceMetrics } from '@/types/missionControl';

interface IndividualAgentCardProps {
  metrics: AgentPerformanceMetrics;
}

export const IndividualAgentCard = ({ metrics }: IndividualAgentCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Agent Info and Metrics */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-medium">{metrics.agentName}</h4>
                <div className="flex items-center gap-2 mt-1">
                  {getTrendIcon(metrics.performanceTrend)}
                  <span className={`text-sm ${getTrendColor(metrics.performanceTrend)}`}>
                    Performance {metrics.performanceTrend}
                  </span>
                </div>
              </div>
              <Badge className={getBurnoutRiskColor(metrics.burnoutRisk)}>
                {metrics.burnoutRisk > 0.7 ? 'High' : metrics.burnoutRisk > 0.4 ? 'Medium' : 'Low'} Burnout Risk
              </Badge>
            </div>

            {/* Performance Bars */}
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Efficiency</span>
                  <span>{metrics.efficiency.toFixed(1)}%</span>
                </div>
                <Progress value={metrics.efficiency} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Motivation</span>
                  <span>{metrics.motivation.toFixed(1)}%</span>
                </div>
                <Progress value={metrics.motivation} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Collaboration</span>
                  <span>{metrics.collaboration.toFixed(1)}%</span>
                </div>
                <Progress value={metrics.collaboration} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Innovation</span>
                  <span>{metrics.innovationScore.toFixed(1)}%</span>
                </div>
                <Progress value={metrics.innovationScore} className="h-2" />
              </div>
            </div>

            {/* Recommendations */}
            <div>
              <h5 className="font-medium mb-2">AI Recommendations</h5>
              <div className="flex flex-wrap gap-2">
                {metrics.recommendedActions.map((action, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {action}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Radar Chart */}
          <div className="flex flex-col items-center">
            <h5 className="font-medium mb-2">Performance Profile</h5>
            <ChartContainer
              config={{
                value: { label: "Score", color: "#8b5cf6" }
              }}
              className="h-[200px] w-[200px]"
            >
              <ResponsiveContainer>
                <RadarChart data={getRadarData(metrics)}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
                  <PolarRadiusAxis domain={[0, 100]} tick={false} />
                  <Radar
                    name="Performance"
                    dataKey="value"
                    stroke="#8b5cf6"
                    fill="#8b5cf6"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
            Apply Interventions
          </Button>
          <Button size="sm" variant="outline">
            View History
          </Button>
          <Button size="sm" variant="outline">
            Generate Report
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
