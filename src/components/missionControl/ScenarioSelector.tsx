
import { IconButton } from '@/components/ui/icon-button';
import { BarChart3, TrendingUp, Users, DollarSign, Zap, Target } from 'lucide-react';
import { predefinedScenarios } from './ScenarioUtils';

interface ScenarioSelectorProps {
  onRunSimulation: (scenario: string) => void;
  isRunning: boolean;
}

const scenarioIcons: Record<string, React.ReactNode> = {
  'AI Product Launch': <Zap className="w-6 h-6" />,
  'Market Expansion': <TrendingUp className="w-6 h-6" />,
  'Competitor Response': <Target className="w-6 h-6" />,
  'Economic Downturn': <BarChart3 className="w-6 h-6" />,
  'Technology Disruption': <Zap className="w-6 h-6" />,
  'Customer Acquisition Campaign': <Users className="w-6 h-6" />
};

export const ScenarioSelector = ({ onRunSimulation, isRunning }: ScenarioSelectorProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
      {predefinedScenarios.map((scenario) => (
        <IconButton
          key={scenario}
          icon={scenarioIcons[scenario] || <BarChart3 className="w-6 h-6" />}
          label={scenario}
          onClick={() => onRunSimulation(scenario)}
          disabled={isRunning}
          variant="outline"
          className="h-auto min-h-[80px]"
        />
      ))}
    </div>
  );
};
