
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  Cpu, 
  HardDrive, 
  Wifi, 
  Zap,
  Clock,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import type { SystemMetric } from '@/types/monitoring';

interface SystemMetricsCardProps {
  metric: SystemMetric;
}

export const SystemMetricsCard = ({ metric }: SystemMetricsCardProps) => {
  const getMetricIcon = (metricId: string) => {
    switch (metricId) {
      case 'cpu': return <Cpu className="w-4 h-4" />;
      case 'memory': return <Activity className="w-4 h-4" />;
      case 'disk': return <HardDrive className="w-4 h-4" />;
      case 'network': return <Wifi className="w-4 h-4" />;
      case 'tasks': return <Zap className="w-4 h-4" />;
      case 'response': return <Clock className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-3 h-3 text-red-500" />;
      case 'down': return <TrendingDown className="w-3 h-3 text-green-500" />;
      case 'stable': return <div className="w-3 h-3 bg-gray-400 rounded-full" />;
      default: return null;
    }
  };

  const getUsageColor = (usage: number) => {
    if (usage >= 80) return 'bg-red-500';
    if (usage >= 60) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {getMetricIcon(metric.id)}
            <h3 className="font-medium">{metric.name}</h3>
          </div>
          <div className="flex items-center gap-1">
            {getTrendIcon(metric.trend)}
            <Badge className={getStatusColor(metric.status)}>
              {metric.status}
            </Badge>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-baseline">
            <span className="text-2xl font-bold">{metric.value.toFixed(1)}</span>
            <span className="text-sm text-slate-600">{metric.unit}</span>
          </div>
          
          {metric.unit === '%' && (
            <Progress 
              value={metric.value} 
              className={`h-2 ${getUsageColor(metric.value)}`}
            />
          )}
          
          <p className="text-xs text-slate-500">
            Last updated: {metric.timestamp.toLocaleTimeString()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
