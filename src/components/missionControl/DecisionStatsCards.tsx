
import { Card, CardContent } from '@/components/ui/card';
import { Brain, CheckCircle, TrendingUp, AlertTriangle } from 'lucide-react';

interface DecisionStats {
  totalToday: number;
  successRate: number;
  averageConfidence: number;
  impactScore: number;
}

interface DecisionStatsCardsProps {
  stats: DecisionStats;
}

export const DecisionStatsCards = ({ stats }: DecisionStatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-700">Decisions Today</p>
              <p className="text-2xl font-bold text-blue-900">{stats.totalToday}</p>
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
              <p className="text-2xl font-bold text-green-900">{(stats.successRate * 100).toFixed(1)}%</p>
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
              <p className="text-2xl font-bold text-purple-900">{(stats.averageConfidence * 100).toFixed(1)}%</p>
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
              <p className="text-2xl font-bold text-orange-900">{(stats.impactScore * 100).toFixed(1)}%</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-orange-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
