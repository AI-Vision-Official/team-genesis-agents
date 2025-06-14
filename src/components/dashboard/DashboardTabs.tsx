
import { AgentCard } from '@/components/AgentCard';
import { TaskBoard } from '@/components/TaskBoard';
import { TeamPanel } from '@/components/TeamPanel';
import { EvaluationSystem } from '@/components/evaluation/EvaluationSystem';
import { MissionControlCenter } from '@/components/missionControl/MissionControlCenter';
import { MarketingAICenter } from '@/components/marketing/MarketingAICenter';
import { WebDevelopmentCenter } from '@/components/webDevelopment/WebDevelopmentCenter';
import { HumanitarianCenter } from '@/components/humanitarian/HumanitarianCenter';
import { CreativeCenter } from '@/components/creative/CreativeCenter';
import { SocialMediaCenter } from '@/components/socialMedia/SocialMediaCenter';
import { BoardroomCenter } from '@/components/boardroom/BoardroomCenter';
import { IFTTTCenter } from '@/components/ifttt/IFTTTCenter';
import { AgentFrameworkCenter } from '@/components/agents/AgentFrameworkCenter';
import { SpecializedAgentsCenter } from '@/components/agents/SpecializedAgentsCenter';
import { InventionCenter } from '@/components/invention/InventionCenter';
import { IntegrationsCenter } from '@/components/integrations/IntegrationsCenter';
import { SecurityCenter } from '@/components/security/SecurityCenter';
import { DashboardOverview } from './DashboardOverview';

// Import mock data
import { mockWebAgents, mockWebProjects } from '@/data/mockWebData';
import { mockHumanitarianProjects, mockCrisisAlerts } from '@/data/mockHumanitarianData';
import { mockCreativeAgents } from '@/data/mockCreativeData';
import { mockSocialMediaAgents } from '@/data/mockSocialMediaData';
import { mockIFTTTRules, mockIFTTTPlatforms, mockIFTTTLogs, mockIFTTTStats } from '@/data/mockIFTTTData';

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
    
    case 'boardroom':
      return <BoardroomCenter settings={{
        dyslexiaFont: false,
        highContrast: false,
        reducedMotion: false,
        largeText: false,
        voiceToText: false,
        textToSpeech: false,
        quietMode: false,
        focusMode: false
      }} />;
    
    case 'agent-framework':
      return <AgentFrameworkCenter />;
    
    case 'invention':
      return <InventionCenter />;
    
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
    
    case 'ifttt':
      return <IFTTTCenter 
        rules={mockIFTTTRules}
        platforms={mockIFTTTPlatforms}
        executionLogs={mockIFTTTLogs}
        stats={mockIFTTTStats}
      />;
    
    case 'integrations':
      return <IntegrationsCenter />;
    
    case 'creative':
      return <CreativeCenter agents={mockCreativeAgents} />;
    
    case 'social-media':
      return <SocialMediaCenter agents={mockSocialMediaAgents} />;
    
    case 'marketing':
      return <MarketingAICenter />;
    
    case 'web-development':
      return <WebDevelopmentCenter agents={mockWebAgents} projects={mockWebProjects} />;
    
    case 'humanitarian':
      return <HumanitarianCenter projects={mockHumanitarianProjects} alerts={mockCrisisAlerts} />;
    
    case 'evaluation':
      return <EvaluationSystem agents={mockAgents} tasks={mockTasks} />;
    
    case 'security':
      return <SecurityCenter />;
    
    default:
      return <DashboardOverview />;
  }
};
