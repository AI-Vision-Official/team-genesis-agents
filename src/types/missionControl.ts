
export interface Mission {
  id: string;
  title: string;
  description: string;
  type: 'humanitarian' | 'business' | 'research' | 'marketing' | 'crisis_response';
  status: 'planning' | 'active' | 'paused' | 'completed' | 'emergency';
  priority: 'low' | 'medium' | 'high' | 'critical' | 'emergency';
  assignedAgents: string[];
  autonomousDecisions: AutonomousDecision[];
  insights: DataInsight[];
  nextActions: NextAction[];
  startDate: Date;
  estimatedCompletion?: Date;
  actualCompletion?: Date;
  budget?: number;
  currentSpend?: number;
  roi?: number;
}

export interface AutonomousDecision {
  id: string;
  missionId: string;
  decisionType: 'agent_assignment' | 'resource_allocation' | 'strategy_change' | 'priority_adjustment' | 'emergency_response';
  description: string;
  reasoning: string;
  confidence: number; // 0-1
  dataPoints: string[];
  timestamp: Date;
  outcome?: 'successful' | 'failed' | 'pending';
  impact?: number; // -1 to 1
}

export interface DataInsight {
  id: string;
  source: 'web_research' | 'sales_data' | 'market_analysis' | 'social_media' | 'financial_data' | 'agent_performance';
  title: string;
  description: string;
  importance: 'low' | 'medium' | 'high' | 'critical';
  actionable: boolean;
  suggestedActions: string[];
  timestamp: Date;
  relevantMissions: string[];
  data: any;
}

export interface NextAction {
  id: string;
  title: string;
  description: string;
  assignedTo: string | null;
  agentType: string;
  estimatedDuration: number; // hours
  dependencies: string[];
  status: 'pending' | 'in_progress' | 'completed' | 'blocked';
  priority: number; // 1-10
  autonomouslyGenerated: boolean;
}

export interface AlertNotification {
  id: string;
  type: 'sales_decline' | 'market_opportunity' | 'crisis_detected' | 'performance_issue' | 'goal_achievement';
  severity: 'info' | 'warning' | 'critical' | 'emergency';
  title: string;
  message: string;
  actionRequired: boolean;
  suggestedActions: string[];
  timestamp: Date;
  acknowledged: boolean;
  relatedMissions: string[];
}

export interface FinancialMetrics {
  totalRevenue: number;
  monthlyRecurring: number;
  growthRate: number;
  profitMargin: number;
  cashFlow: number;
  projectedRevenue: number;
  revenueStreams: RevenueStream[];
  expenses: ExpenseCategory[];
}

export interface RevenueStream {
  id: string;
  name: string;
  amount: number;
  growth: number;
  forecast: number[];
  risk: 'low' | 'medium' | 'high';
}

export interface ExpenseCategory {
  category: string;
  amount: number;
  trend: 'increasing' | 'decreasing' | 'stable';
  optimization: number; // potential savings percentage
}

export interface AgentPerformanceMetrics {
  agentId: string;
  agentName: string;
  efficiency: number;
  motivation: number;
  collaboration: number;
  innovationScore: number;
  burnoutRisk: number;
  performanceTrend: 'improving' | 'declining' | 'stable';
  recommendedActions: string[];
}

export interface ScenarioSimulation {
  id: string;
  name: string;
  description: string;
  variables: Record<string, any>;
  outcomes: SimulationOutcome[];
  confidence: number;
  recommendations: string[];
  riskFactors: string[];
}

export interface SimulationOutcome {
  scenario: string;
  probability: number;
  impact: number;
  roi: number;
  timeToComplete: number;
  resourcesRequired: number;
}

export interface KnowledgeItem {
  id: string;
  title: string;
  content: string;
  tags: string[];
  category: string;
  relevanceScore: number;
  lastUpdated: Date;
  sources: string[];
  accessCount: number;
}
