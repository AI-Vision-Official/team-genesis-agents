
import { Progress } from '@/components/ui/progress';

interface SimulationProgressProps {
  isRunning: boolean;
  progress: number;
}

export const SimulationProgress = ({ isRunning, progress }: SimulationProgressProps) => {
  if (!isRunning) return null;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">Running simulation...</span>
        <span className="text-sm text-slate-600">{progress}%</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
};
