
import { useState, useEffect } from 'react';
import { DecisionStatsCards } from './DecisionStatsCards';
import { PendingDecisions } from './PendingDecisions';
import { RecentDecisions } from './RecentDecisions';
import type { Mission, AutonomousDecision } from '@/types/missionControl';

interface AutonomousDecisionEngineProps {
  missions: Mission[];
}

export const AutonomousDecisionEngine = ({ missions }: AutonomousDecisionEngineProps) => {
  const [recentDecisions, setRecentDecisions] = useState<AutonomousDecision[]>([]);
  const [pendingDecisions, setPendingDecisions] = useState<AutonomousDecision[]>([]);
  const [decisionStats, setDecisionStats] = useState({
    totalToday: 0,
    successRate: 0,
    averageConfidence: 0,
    impactScore: 0
  });

  useEffect(() => {
    // Mock autonomous decisions for demonstration
    const mockDecisions: AutonomousDecision[] = [
      {
        id: '1',
        missionId: '1',
        decisionType: 'agent_assignment',
        description: 'Assigned specialized MarketAnalyst-Epsilon to analyze competitor pricing strategies',
        reasoning: 'Detected 23% price variance in target market. Epsilon has 94% accuracy in competitive analysis.',
        confidence: 0.89,
        dataPoints: ['Market price data', 'Competitor analysis', 'Agent performance history'],
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        outcome: 'successful',
        impact: 0.7
      },
      {
        id: '2',
        missionId: '2',
        decisionType: 'priority_adjustment',
        description: 'Elevated supply chain mission priority from High to Critical',
        reasoning: 'Real-time monitoring detected 15% increase in shipping delays affecting 3 major clients.',
        confidence: 0.95,
        dataPoints: ['Shipping data', 'Client impact analysis', 'Historical patterns'],
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        outcome: 'successful',
        impact: 0.8
      },
      {
        id: '3',
        missionId: '1',
        decisionType: 'resource_allocation',
        description: 'Reallocated $15k from general marketing to AI-powered social media campaigns',
        reasoning: 'Social media ROI showing 340% higher conversion than traditional channels.',
        confidence: 0.82,
        dataPoints: ['ROI analysis', 'Conversion rates', 'Budget efficiency metrics'],
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
        outcome: 'pending',
        impact: 0.6
      }
    ];

    const mockPending: AutonomousDecision[] = [
      {
        id: '4',
        missionId: '1',
        decisionType: 'strategy_change',
        description: 'Proposed shift to focus on enterprise clients based on market analysis',
        reasoning: 'Enterprise segment showing 280% higher lifetime value and 45% lower churn rate.',
        confidence: 0.76,
        dataPoints: ['Customer lifetime value', 'Churn analysis', 'Market segmentation'],
        timestamp: new Date(),
        outcome: 'pending'
      }
    ];

    setRecentDecisions(mockDecisions);
    setPendingDecisions(mockPending);
    setDecisionStats({
      totalToday: 47,
      successRate: 0.89,
      averageConfidence: 0.84,
      impactScore: 0.73
    });
  }, []);

  return (
    <div className="space-y-6">
      <DecisionStatsCards stats={decisionStats} />
      <PendingDecisions decisions={pendingDecisions} />
      <RecentDecisions decisions={recentDecisions} />
    </div>
  );
};
