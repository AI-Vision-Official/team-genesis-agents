
import type { ScenarioSimulation } from '@/types/missionControl';

export const predefinedScenarios = [
  'AI Product Launch',
  'Market Expansion',
  'Competitor Response',
  'Economic Downturn',
  'Technology Disruption',
  'Customer Acquisition Campaign'
];

export const generateMockSimulation = (scenario: string): ScenarioSimulation => {
  return {
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
};
