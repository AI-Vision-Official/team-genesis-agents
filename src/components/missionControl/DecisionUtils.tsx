
import { Brain, CheckCircle, Clock, TrendingUp, AlertTriangle } from 'lucide-react';

export const getDecisionTypeIcon = (type: string) => {
  switch (type) {
    case 'agent_assignment': return <Brain className="w-4 h-4" />;
    case 'priority_adjustment': return <AlertTriangle className="w-4 h-4" />;
    case 'resource_allocation': return <TrendingUp className="w-4 h-4" />;
    case 'strategy_change': return <CheckCircle className="w-4 h-4" />;
    default: return <Clock className="w-4 h-4" />;
  }
};

export const getDecisionTypeColor = (type: string) => {
  switch (type) {
    case 'agent_assignment': return 'bg-blue-500';
    case 'priority_adjustment': return 'bg-red-500';
    case 'resource_allocation': return 'bg-green-500';
    case 'strategy_change': return 'bg-purple-500';
    default: return 'bg-gray-500';
  }
};

export const getOutcomeColor = (outcome?: string) => {
  switch (outcome) {
    case 'successful': return 'text-green-600';
    case 'failed': return 'text-red-600';
    case 'pending': return 'text-yellow-600';
    default: return 'text-gray-600';
  }
};
