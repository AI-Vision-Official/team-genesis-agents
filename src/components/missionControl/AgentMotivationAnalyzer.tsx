
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import { Heart, TrendingUp, TrendingDown, AlertTriangle, Users } from 'lucide-react';
import type { AgentPerformanceMetrics } from '@/types/missionControl';

interface AgentMotivationAnalyzerProps {
  agents: any[];
}

export const AgentMotivationAnalyzer = ({ agents }: AgentMotivationAnalyzerProps) => {
  const [agentMetrics, setAgentMetrics] = useState<AgentPerformanceMetrics[]>([]);

  useEffect(() => {
    // Generate mock metrics for demonstration
    const mockMetrics: AgentPerformanceMetrics[] = agents.map((agent, index) => ({
      agentId: agent.id,
      agentName: agent.name,
      efficiency: 85 + Math.random() * 15,
      motivation: 70 + Math.random() * 25,
      collaboration: 80 + Math.random() * 20,
      innovationScore: 75 + Math.random() * 20,
      burnoutRisk: Math.random() * 0.3,
      performanceTrend: index % 3 === 0 ? 'improving' : index % 3 === 1 ? 'stable' : 'declining',
      recommendedActions: [
        'Increase task variety',
        'Provide skill development opportunities',
        'Enhance team collaboration'
      ].slice(0, Math.floor(Math.random() * 3) + 1)
    }));

    setAgentMetrics(mockMetrics);
  }, [agents]);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'declining': return <TrendingDown className="w-4 h-4 text-red-600" />;
      default: return <div className="w-4 h-4 bg-yellow-600 rounded-full" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'improving': return 'text-green-600';
      case 'declining': return 'text-red-600';
      default: return 'text-yellow-600';
    }
  };

  const getBurnoutRiskColor = (risk: number) => {
    if (risk > 0.7) return 'bg-red-500';
    if (risk > 0.4) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getRadarData = (metrics: AgentPerformanceMetrics) => [
    { subject: 'Efficiency', value: metrics.efficiency },
    { subject: 'Motivation', value: metrics.motivation },
    { subject: 'Collaboration', value: metrics.collaboration },
    { subject: 'Innovation', value: metrics.innovationScore },
  ];

  const teamAverages = {
    efficiency: agentMetrics.reduce((acc, agent) => acc + agent.efficiency, 0) / agentMetrics.length,
    motivation: agentMetrics.reduce((acc, agent) => acc + agent.motivation, 0) / agentMetrics.length,
    collaboration: agentMetrics.reduce((acc, agent) => acc + agent.collaboration, 0) / agentMetrics.length,
    innovation: agentMetrics.reduce((acc, agent) => acc + agent.innovationScore, 0) / agentMetrics.length,
    burnoutRisk: agentMetrics.reduce((acc, agent) => acc + agent.burnoutRisk, 0) / agentMetrics.length
  };

  return (
    <div className="space-y-6">
      {/* Team Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700">Team Efficiency</p>
                <p className="text-2xl font-bold text-blue-900">{teamAverages.efficiency.toFixed(1)}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700">Avg Motivation</p>
                <p className="text-2xl font-bold text-purple-900">{teamAverages.motivation.toFixed(1)}%</p>
              </div>
              <Heart className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700">Collaboration</p>
                <p className="text-2xl font-bold text-green-900">{teamAverages.collaboration.toFixed(1)}%</p>
              </div>
              <Users className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-700">Burnout Risk</p>
                <p className="text-2xl font-bold text-orange-900">{(teamAverages.burnoutRisk * 100).toFixed(1)}%</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Individual Agent Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5" />
            Agent Motivation & Performance Analysis
          </CardTitle>
          <CardDescription>Individual metrics and recommended interventions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {agentMetrics.map((metrics) => (
              <Card key={metrics.agentId} className="hover:shadow-md transition-shadow">
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
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
