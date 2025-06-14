
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { AgentPerformanceMetrics } from '@/types/missionControl';

export const getTrendIcon = (trend: string) => {
  switch (trend) {
    case 'improving': return <TrendingUp className="w-4 h-4 text-green-600" />;
    case 'declining': return <TrendingDown className="w-4 h-4 text-red-600" />;
    default: return <div className="w-4 h-4 bg-yellow-600 rounded-full" />;
  }
};

export const getTrendColor = (trend: string) => {
  switch (trend) {
    case 'improving': return 'text-green-600';
    case 'declining': return 'text-red-600';
    default: return 'text-yellow-600';
  }
};

export const getBurnoutRiskColor = (risk: number) => {
  if (risk > 0.7) return 'bg-red-500';
  if (risk > 0.4) return 'bg-yellow-500';
  return 'bg-green-500';
};

export const getRadarData = (metrics: AgentPerformanceMetrics) => [
  { subject: 'Efficiency', value: metrics.efficiency },
  { subject: 'Motivation', value: metrics.motivation },
  { subject: 'Collaboration', value: metrics.collaboration },
  { subject: 'Innovation', value: metrics.innovationScore },
];

export const generateMockMetrics = (agents: any[]): AgentPerformanceMetrics[] => {
  return agents.map((agent, index) => ({
    agentId: agent.id,
    agentName: agent.name,
    efficiency: 85 + Math.random() * 15,
    motivation: 70 + Math.random() * 25,
    collaboration: 80 + Math.random() * 20,
    innovationScore: 75 + Math.random() * 20,
    burnoutRisk: Math.random() * 0.3,
    performanceTrend: index % 3 === 0 ? 'improving' : index % 3 === 1 ? 'stable' : 'declining',
    recommendedActions: [
      'Increase task variety',
      'Provide skill development opportunities',
      'Enhance team collaboration'
    ].slice(0, Math.floor(Math.random() * 3) + 1)
  }));
};
