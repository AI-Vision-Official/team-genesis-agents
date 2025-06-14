
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlayCircle } from 'lucide-react';
import { ScenarioSelector } from './ScenarioSelector';
import { SimulationProgress } from './SimulationProgress';
import { SimulationResults } from './SimulationResults';
import { generateMockSimulation } from './ScenarioUtils';
import type { ScenarioSimulation } from '@/types/missionControl';

export const ScenarioSimulator = () => {
  const [activeSimulation, setActiveSimulation] = useState<ScenarioSimulation | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState(0);

  const runSimulation = async (scenario: string) => {
    setIsRunning(true);
    setSimulationProgress(0);

    // Simulate progress
    const interval = setInterval(() => {
      setSimulationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRunning(false);
          const mockSimulation = generateMockSimulation(scenario);
          setActiveSimulation(mockSimulation);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PlayCircle className="w-5 h-5" />
            Scenario & Impact Simulations
          </CardTitle>
          <CardDescription>Test strategies and predict outcomes before implementation</CardDescription>
        </CardHeader>
        <CardContent>
          <ScenarioSelector onRunSimulation={runSimulation} isRunning={isRunning} />
          <SimulationProgress isRunning={isRunning} progress={simulationProgress} />
        </CardContent>
      </Card>

      {activeSimulation && <SimulationResults simulation={activeSimulation} />}
    </div>
  );
};
