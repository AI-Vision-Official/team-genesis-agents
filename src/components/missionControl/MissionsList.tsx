
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import type { Mission } from '@/types/missionControl';

interface MissionsListProps {
  missions: Mission[];
}

export const MissionsList = ({ missions }: MissionsListProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'planning': return 'bg-blue-500';
      case 'emergency': return 'bg-red-500';
      case 'paused': return 'bg-yellow-500';
      case 'completed': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'emergency': return 'bg-red-600 text-white';
      case 'critical': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="grid gap-4">
      {missions.map((mission) => (
        <Card key={mission.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(mission.status)}`} />
                  <CardTitle className="text-lg">{mission.title}</CardTitle>
                  <Badge className={getPriorityColor(mission.priority)}>
                    {mission.priority}
                  </Badge>
                </div>
                <CardDescription>{mission.description}</CardDescription>
              </div>
              <Badge variant="outline">{mission.type}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span>Progress</span>
                <span>Budget: ${mission.currentSpend?.toLocaleString()} / ${mission.budget?.toLocaleString()}</span>
              </div>
              <Progress value={(mission.currentSpend! / mission.budget!) * 100} />
              
              <div className="flex items-center gap-4 text-sm text-slate-600">
                <span>Agents: {mission.assignedAgents.length}</span>
                {mission.roi && <span>ROI: {(mission.roi * 100).toFixed(1)}%</span>}
                <span>Est. Completion: {mission.estimatedCompletion?.toLocaleDateString()}</span>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline">View Details</Button>
                <Button size="sm" variant="outline">Monitor Progress</Button>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                  AI Analysis
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
