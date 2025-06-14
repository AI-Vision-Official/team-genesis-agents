
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { PlayCircle, BarChart3, TrendingUp, AlertTriangle } from 'lucide-react';
import type { ScenarioSimulation, SimulationOutcome } from '@/types/missionControl';

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
          // Generate mock results
          const mockSimulation: ScenarioSimulation = {
            id: Date.now().toString(),
            name: scenario,
            description: `Analysis of ${scenario} implementation strategy`,
            variables: {
              budget: 100000,
              timeframe: 6,
              marketConditions: 'favorable',
              competition: 'moderate'
            },
            outcomes: [
              {
                scenario: 'Best Case',
                probability: 0.25,
                impact: 0.85,
                roi: 2.4,
                timeToComplete: 4,
                resourcesRequired: 75000
              },
              {
                scenario: 'Most Likely',
                probability: 0.50,
                impact: 0.65,
                roi: 1.8,
                timeToComplete: 6,
                resourcesRequired: 100000
              },
              {
                scenario: 'Worst Case',
                probability: 0.25,
                impact: 0.35,
                roi: 0.9,
                timeToComplete: 8,
                resourcesRequired: 125000
              }
            ],
            confidence: 0.78,
            recommendations: [
              'Focus on early market entry to capture best-case scenario',
              'Prepare contingency plans for resource allocation',
              'Monitor competitor responses closely'
            ],
            riskFactors: [
              'Market saturation risk',
              'Technology adoption delays',
              'Regulatory changes'
            ]
          };
          setActiveSimulation(mockSimulation);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const predefinedScenarios = [
    'AI Product Launch',
    'Market Expansion',
    'Competitor Response',
    'Economic Downturn',
    'Technology Disruption',
    'Customer Acquisition Campaign'
  ];

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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
            {predefinedScenarios.map((scenario) => (
              <Button
                key={scenario}
                variant="outline"
                className="h-auto p-4 text-center"
                onClick={() => runSimulation(scenario)}
                disabled={isRunning}
              >
                <div>
                  <BarChart3 className="w-6 h-6 mx-auto mb-2" />
                  <p className="text-sm">{scenario}</p>
                </div>
              </Button>
            ))}
          </div>

          {isRunning && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Running simulation...</span>
                <span className="text-sm text-slate-600">{simulationProgress}%</span>
              </div>
              <Progress value={simulationProgress} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {activeSimulation && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Simulation Results: {activeSimulation.name}
            </CardTitle>
            <CardDescription>
              Confidence: {(activeSimulation.confidence * 100).toFixed(1)}%
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Outcomes */}
            <div>
              <h4 className="font-medium mb-3">Predicted Outcomes</h4>
              <div className="space-y-3">
                {activeSimulation.outcomes.map((outcome, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium">{outcome.scenario}</h5>
                      <Badge className={outcome.probability > 0.4 ? 'bg-green-500' : outcome.probability > 0.3 ? 'bg-yellow-500' : 'bg-red-500'}>
                        {(outcome.probability * 100).toFixed(0)}% likely
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-slate-600">ROI</p>
                        <p className="font-bold">{outcome.roi.toFixed(1)}x</p>
                      </div>
                      <div>
                        <p className="text-slate-600">Impact</p>
                        <p className="font-bold">{(outcome.impact * 100).toFixed(0)}%</p>
                      </div>
                      <div>
                        <p className="text-slate-600">Timeline</p>
                        <p className="font-bold">{outcome.timeToComplete} months</p>
                      </div>
                      <div>
                        <p className="text-slate-600">Resources</p>
                        <p className="font-bold">${outcome.resourcesRequired.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div>
              <h4 className="font-medium mb-3">AI Recommendations</h4>
              <div className="space-y-2">
                {activeSimulation.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start gap-2 p-3 bg-green-50 rounded-lg">
                    <TrendingUp className="w-4 h-4 text-green-600 mt-0.5" />
                    <p className="text-sm">{rec}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Risk Factors */}
            <div>
              <h4 className="font-medium mb-3">Risk Factors</h4>
              <div className="space-y-2">
                {activeSimulation.riskFactors.map((risk, index) => (
                  <div key={index} className="flex items-start gap-2 p-3 bg-red-50 rounded-lg">
                    <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5" />
                    <p className="text-sm">{risk}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button className="bg-purple-600 hover:bg-purple-700">
                Implement Strategy
              </Button>
              <Button variant="outline">
                Run Alternative Scenario
              </Button>
              <Button variant="outline">
                Export Report
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
