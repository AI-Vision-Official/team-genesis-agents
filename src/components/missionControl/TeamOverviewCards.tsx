
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Heart, Users, AlertTriangle } from 'lucide-react';
import type { AgentPerformanceMetrics } from '@/types/missionControl';

interface TeamOverviewCardsProps {
  agentMetrics: AgentPerformanceMetrics[];
}

export const TeamOverviewCards = ({ agentMetrics }: TeamOverviewCardsProps) => {
  const teamAverages = {
    efficiency: agentMetrics.reduce((acc, agent) => acc + agent.efficiency, 0) / agentMetrics.length,
    motivation: agentMetrics.reduce((acc, agent) => acc + agent.motivation, 0) / agentMetrics.length,
    collaboration: agentMetrics.reduce((acc, agent) => acc + agent.collaboration, 0) / agentMetrics.length,
    innovation: agentMetrics.reduce((acc, agent) => acc + agent.innovationScore, 0) / agentMetrics.length,
    burnoutRisk: agentMetrics.reduce((acc, agent) => acc + agent.burnoutRisk, 0) / agentMetrics.length
  };

  return (
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
  );
};
