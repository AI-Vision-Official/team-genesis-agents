
import { Progress } from '@/components/ui/progress';
import { Cpu } from 'lucide-react';

interface HealthMetricsProps {
  cpuUsage: number;
  memoryUsage: number;
  currentTasks: number;
  maxTasks: number;
  successRate: number;
}

export const HealthMetrics = ({
  cpuUsage,
  memoryUsage,
  currentTasks,
  maxTasks,
  successRate
}: HealthMetricsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* CPU Usage */}
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span className="flex items-center gap-1">
            <Cpu className="w-3 h-3" />
            CPU
          </span>
          <span className={cpuUsage > 80 ? 'text-red-600 font-medium' : ''}>{cpuUsage}%</span>
        </div>
        <Progress value={cpuUsage} className="h-2" />
      </div>

      {/* Memory Usage */}
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span>Memory</span>
          <span className={memoryUsage > 80 ? 'text-red-600 font-medium' : ''}>{memoryUsage}%</span>
        </div>
        <Progress value={memoryUsage} className="h-2" />
      </div>

      {/* Task Load */}
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span>Tasks</span>
          <span>{currentTasks}/{maxTasks}</span>
        </div>
        <Progress value={(currentTasks / maxTasks) * 100} className="h-2" />
      </div>

      {/* Success Rate */}
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span>Success Rate</span>
          <span className={successRate < 90 ? 'text-yellow-600 font-medium' : 'text-green-600'}>{successRate}%</span>
        </div>
        <Progress value={successRate} className="h-2" />
      </div>
    </div>
  );
};
