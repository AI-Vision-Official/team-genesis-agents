
import { AgentCard } from '@/components/AgentCard';
import { TaskBoard } from '@/components/TaskBoard';
import { TeamPanel } from '@/components/TeamPanel';
import { EvaluationSystem } from '@/components/evaluation/EvaluationSystem';
import { MissionControlCenter } from '@/components/missionControl/MissionControlCenter';
import { MarketingAICenter } from '@/components/marketing/MarketingAICenter';
import { DashboardOverview } from './DashboardOverview';

interface Agent {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'idle' | 'spawning' | 'error';
  capabilities: string[];
  currentTask: string;
  efficiency: number;
  tasksCompleted: number;
  spawnedAgents: number;
}

interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  status: 'active' | 'pending' | 'in-progress' | 'spawning-agents' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  progress: number;
  spawnedAgents: string[];
}

interface DashboardTabsProps {
  activeTab: string;
  mockAgents: Agent[];
  mockTasks: Task[];
}

export const DashboardTabs = ({ activeTab, mockAgents, mockTasks }: DashboardTabsProps) => {
  switch (activeTab) {
    case 'overview':
      return <DashboardOverview />;
    
    case 'mission-control':
      return <MissionControlCenter agents={mockAgents} tasks={mockTasks} />;
    
    case 'agents':
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {mockAgents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      );
    
    case 'teams':
      return <TeamPanel />;
    
    case 'tasks':
      return <TaskBoard tasks={mockTasks} />;
    
    case 'marketing':
      return <MarketingAICenter />;
    
    case 'evaluation':
      return <EvaluationSystem agents={mockAgents} tasks={mockTasks} />;
    
    default:
      return <DashboardOverview />;
  }
};
