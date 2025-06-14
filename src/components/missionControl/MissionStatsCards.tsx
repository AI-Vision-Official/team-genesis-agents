
import { StatusCard } from '@/components/ui/status-card';
import { Target, Brain, DollarSign, Activity } from 'lucide-react';

interface MissionStatsCardsProps {
  activeMissionsCount: number;
}

export const MissionStatsCards = ({ activeMissionsCount }: MissionStatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatusCard
        title="Active Missions"
        value={activeMissionsCount}
        status="active"
        icon={<Target className="w-5 h-5" />}
        trend="up"
        description="Currently running"
      />

      <StatusCard
        title="AI Decisions Today"
        value={47}
        status="success"
        icon={<Brain className="w-5 h-5" />}
        trend="up"
        description="Automated choices"
      />

      <StatusCard
        title="Revenue Impact"
        value="+$125k"
        status="success"
        icon={<DollarSign className="w-5 h-5" />}
        trend="up"
        description="This month"
      />

      <StatusCard
        title="System Efficiency"
        value="94%"
        status="active"
        icon={<Activity className="w-5 h-5" />}
        trend="stable"
        description="Overall performance"
      />
    </div>
  );
};
