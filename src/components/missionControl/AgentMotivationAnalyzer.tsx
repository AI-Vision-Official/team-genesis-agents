
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart } from 'lucide-react';
import { TeamOverviewCards } from './TeamOverviewCards';
import { IndividualAgentCard } from './IndividualAgentCard';
import { generateMockMetrics } from './AgentMotivationUtils';
import type { AgentPerformanceMetrics } from '@/types/missionControl';

interface AgentMotivationAnalyzerProps {
  agents: any[];
}

export const AgentMotivationAnalyzer = ({ agents }: AgentMotivationAnalyzerProps) => {
  const [agentMetrics, setAgentMetrics] = useState<AgentPerformanceMetrics[]>([]);

  useEffect(() => {
    const mockMetrics = generateMockMetrics(agents);
    setAgentMetrics(mockMetrics);
  }, [agents]);

  return (
    <div className="space-y-6">
      {/* Team Overview */}
      <TeamOverviewCards agentMetrics={agentMetrics} />

      {/* Individual Agent Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5" />
            Agent Motivation & Performance Analysis
          </CardTitle>
          <CardDescription>Individual metrics and recommended interventions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {agentMetrics.map((metrics) => (
              <IndividualAgentCard key={metrics.agentId} metrics={metrics} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
