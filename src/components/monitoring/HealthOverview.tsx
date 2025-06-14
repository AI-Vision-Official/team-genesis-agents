
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, AlertTriangle, Clock, TrendingUp } from 'lucide-react';

interface HealthOverviewProps {
  healthyAgents: number;
  warningAgents: number;
  criticalAgents: number;
  avgResponseTime: number;
  avgUptime: number;
}

export const HealthOverview = ({
  healthyAgents,
  warningAgents,
  criticalAgents,
  avgResponseTime,
  avgUptime
}: HealthOverviewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-700">Healthy</p>
              <p className="text-2xl font-bold text-green-900">{healthyAgents}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-700">Warning</p>
              <p className="text-2xl font-bold text-yellow-900">{warningAgents}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-600" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-red-50 border-red-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-700">Critical</p>
              <p className="text-2xl font-bold text-red-900">{criticalAgents}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-700">Avg Response</p>
              <p className="text-2xl font-bold text-blue-900">{avgResponseTime.toFixed(0)}ms</p>
            </div>
            <Clock className="w-8 h-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-purple-50 border-purple-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-700">Avg Uptime</p>
              <p className="text-2xl font-bold text-purple-900">{avgUptime.toFixed(1)}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
