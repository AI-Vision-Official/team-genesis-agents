
import { Card, CardContent } from '@/components/ui/card';
import { Target, Brain, DollarSign, Activity } from 'lucide-react';

interface MissionStatsCardsProps {
  activeMissionsCount: number;
}

export const MissionStatsCards = ({ activeMissionsCount }: MissionStatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-700">Active Missions</p>
              <p className="text-2xl font-bold text-green-900">{activeMissionsCount}</p>
            </div>
            <Target className="w-8 h-8 text-green-600" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-700">AI Decisions Today</p>
              <p className="text-2xl font-bold text-blue-900">47</p>
            </div>
            <Brain className="w-8 h-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-700">Revenue Impact</p>
              <p className="text-2xl font-bold text-purple-900">+$125k</p>
            </div>
            <DollarSign className="w-8 h-8 text-purple-600" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-700">System Efficiency</p>
              <p className="text-2xl font-bold text-orange-900">94%</p>
            </div>
            <Activity className="w-8 h-8 text-orange-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
