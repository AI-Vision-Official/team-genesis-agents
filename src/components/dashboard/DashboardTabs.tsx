
import { DashboardOverview } from './DashboardOverview';
import { SocialMediaCenter } from '../socialMedia/SocialMediaCenter';
import { MissionControlCenter } from '../missionControl/MissionControlCenter';
import { HumanitarianCenter } from '../humanitarian/HumanitarianCenter';
import { WebDevelopmentCenter } from '../webDevelopment/WebDevelopmentCenter';
import { EducationCenter } from '../education/EducationCenter';
import { CreativeCenter } from '../creative/CreativeCenter';
import { MarketingAICenter } from '../marketing/MarketingAICenter';
import { InventionCenter } from '../invention/InventionCenter';
import { IntegrationsCenter } from '../integrations/IntegrationsCenter';
import { IFTTTCenter } from '../ifttt/IFTTTCenter';
import { BoardroomCenter } from '../boardroom/BoardroomCenter';
import { AgentFrameworkCenter } from '../agents/AgentFrameworkCenter';
import { SpecializedAgentsCenter } from '../agents/SpecializedAgentsCenter';
import { SecurityCenter } from '../security/SecurityCenter';
import { EvaluationSystem } from '../evaluation/EvaluationSystem';
import { AgentHealthDashboard } from '../monitoring/AgentHealthDashboard';
import { SmartNotificationSystem } from '../notifications/SmartNotificationSystem';
import { QuickActionsPanel } from '../quickActions/QuickActionsPanel';
import { mockSocialMediaAgents } from '@/data/mockSocialMediaData';
import { mockHumanitarianProjects, mockCrisisAlerts } from '@/data/mockHumanitarianData';
import { mockWebAgents, mockWebProjects } from '@/data/mockWebData';
import { mockCreativeAgents } from '@/data/mockCreativeData';
import { 
  mockIFTTTRules, 
  mockIFTTTPlatforms, 
  mockIFTTTLogs, 
  mockIFTTTStats 
} from '@/data/mockIFTTTData';

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
  const mockBoardroomSettings = {
    workspaceTheme: 'professional' as const,
    notificationLevel: 'important' as const,
    autoSave: true,
    collaborationMode: 'team' as const,
    dyslexiaFont: false,
    highContrast: false,
    reducedMotion: false,
    largeText: false,
    keyboardNavigation: false,
    screenReader: false,
    colorBlindSupport: false,
    focusIndicators: true,
    voiceToText: false,
    textToSpeech: false,
    quietMode: false,
    focusMode: false
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview />;
      case 'social':
        return <SocialMediaCenter agents={mockSocialMediaAgents} />;
      case 'mission':
        return <MissionControlCenter agents={mockAgents} tasks={mockTasks} />;
      case 'humanitarian':
        return <HumanitarianCenter projects={mockHumanitarianProjects} alerts={mockCrisisAlerts} />;
      case 'web':
        return <WebDevelopmentCenter agents={mockWebAgents} projects={mockWebProjects} />;
      case 'education':
        return <EducationCenter />;
      case 'creative':
        return <CreativeCenter agents={mockCreativeAgents} />;
      case 'marketing':
        return <MarketingAICenter />;
      case 'invention':
        return <InventionCenter />;
      case 'integrations':
        return <IntegrationsCenter />;
      case 'ifttt':
        return <IFTTTCenter 
          rules={mockIFTTTRules} 
          platforms={mockIFTTTPlatforms} 
          executionLogs={mockIFTTTLogs} 
          stats={mockIFTTTStats} 
        />;
      case 'boardroom':
        return <BoardroomCenter settings={mockBoardroomSettings} />;
      case 'agents':
        return <AgentFrameworkCenter />;
      case 'specialized':
        return <SpecializedAgentsCenter />;
      case 'security':
        return <SecurityCenter />;
      case 'evaluation':
        return <EvaluationSystem />;
      case 'health':
        return <AgentHealthDashboard />;
      case 'notifications':
        return <SmartNotificationSystem />;
      case 'actions':
        return <QuickActionsPanel />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="mt-6">
      {renderTabContent()}
    </div>
  );
};
