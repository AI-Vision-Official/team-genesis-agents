
import { Button } from '@/components/ui/button';
import { VisualIndicator } from '@/components/ui/visual-indicator';
import { Brain, Target, Zap } from 'lucide-react';

interface MissionControlHeaderProps {
  autonomousMode: boolean;
  onToggleAutonomousMode: () => void;
}

export const MissionControlHeader = ({ autonomousMode, onToggleAutonomousMode }: MissionControlHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent flex items-center gap-3">
          <Brain className="w-8 h-8 text-purple-600" />
          Mission Control Center
          <VisualIndicator 
            type={autonomousMode ? 'active' : 'inactive'} 
            size="lg" 
            pulse={autonomousMode}
          />
        </h1>
        <p className="text-slate-600 mt-2 flex items-center gap-2">
          <span>Autonomous AI decision-making and mission orchestration</span>
          {autonomousMode && (
            <span className="inline-flex items-center gap-1 text-green-600 text-sm font-medium">
              <VisualIndicator type="active" size="sm" />
              AUTO MODE ACTIVE
            </span>
          )}
        </p>
      </div>
      <div className="flex gap-3">
        <Button
          variant={autonomousMode ? "default" : "outline"}
          onClick={onToggleAutonomousMode}
          className={autonomousMode ? "bg-gradient-to-r from-green-600 to-blue-600 shadow-lg" : "border-2 border-dashed"}
        >
          <div className="flex items-center gap-2">
            <VisualIndicator 
              type={autonomousMode ? 'active' : 'inactive'} 
              pulse={autonomousMode}
            />
            <Zap className="w-4 h-4" />
            {autonomousMode ? 'Autonomous Mode ON' : 'Manual Mode'}
          </div>
        </Button>
        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg">
          <Target className="w-4 h-4 mr-2" />
          New Mission
        </Button>
      </div>
    </div>
  );
};
