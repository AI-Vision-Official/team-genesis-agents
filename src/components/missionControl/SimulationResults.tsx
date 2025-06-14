
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, AlertTriangle } from 'lucide-react';
import type { ScenarioSimulation } from '@/types/missionControl';

interface SimulationResultsProps {
  simulation: ScenarioSimulation;
}

export const SimulationResults = ({ simulation }: SimulationResultsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Simulation Results: {simulation.name}
        </CardTitle>
        <CardDescription>
          Confidence: {(simulation.confidence * 100).toFixed(1)}%
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Outcomes */}
        <div>
          <h4 className="font-medium mb-3">Predicted Outcomes</h4>
          <div className="space-y-3">
            {simulation.outcomes.map((outcome, index) => (
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
            {simulation.recommendations.map((rec, index) => (
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
            {simulation.riskFactors.map((risk, index) => (
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
  );
};
