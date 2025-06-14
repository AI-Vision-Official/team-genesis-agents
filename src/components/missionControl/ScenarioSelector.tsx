
import { Button } from '@/components/ui/button';
import { BarChart3 } from 'lucide-react';
import { predefinedScenarios } from './ScenarioUtils';

interface ScenarioSelectorProps {
  onRunSimulation: (scenario: string) => void;
  isRunning: boolean;
}

export const ScenarioSelector = ({ onRunSimulation, isRunning }: ScenarioSelectorProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
      {predefinedScenarios.map((scenario) => (
        <Button
          key={scenario}
          variant="outline"
          className="h-auto p-4 text-center"
          onClick={() => onRunSimulation(scenario)}
          disabled={isRunning}
        >
          <div>
            <BarChart3 className="w-6 h-6 mx-auto mb-2" />
            <p className="text-sm">{scenario}</p>
          </div>
        </Button>
      ))}
    </div>
  );
};
