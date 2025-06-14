
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
  // Mock data for components that need specific props
  const mockIFTTTRules = [
    {
      id: '1',
      name: 'Auto Social Media Post',
      description: 'Automatically post to social media when a new blog is published',
      enabled: true,
      createdBy: 'system',
      createdAt: new Date(),
      triggerCount: 15,
      trigger: {
        id: '1',
        type: 'webhook' as const,
        platform: 'blog',
        event: 'post_published',
        parameters: {}
      },
      conditions: [],
      actions: [{
        id: '1',
        type: 'post_social_media' as const,
        platform: 'twitter',
        operation: 'create_post',
        parameters: {}
      }],
      priority: 'medium' as const,
      category: 'social_media' as const
    }
  ];

  const mockPlatforms = [
    {
      id: '1',
      name: 'Twitter',
      type: 'social_media' as const,
      icon: '🐦',
      connected: true,
      authRequired: true,
      availableTriggers: ['mention', 'follow'],
      availableActions: ['post', 'reply']
    }
  ];

  const mockExecutionLogs = [
    {
      id: '1',
      ruleId: '1',
      ruleName: 'Auto Social Media Post',
      timestamp: new Date(),
      status: 'success' as const,
      triggerData: {},
      executedActions: ['post_social_media'],
      executionTime: 150
    }
  ];

  const mockIFTTTStats = {
    totalRules: 5,
    activeRules: 3,
    totalExecutions: 45,
    successRate: 92,
    topCategories: [
      { category: 'social_media', count: 15 },
      { category: 'productivity', count: 10 }
    ],
    recentExecutions: mockExecutionLogs,
    performanceMetrics: {
      averageExecutionTime: 180,
      totalDataProcessed: 1024,
      apiCallsMade: 150
    }
  };

  const mockBoardroomSettings = {
    workspaceTheme: 'professional' as const,
    notificationLevel: 'important' as const,
    autoSave: true,
    collaborationMode: 'team' as const
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview agents={mockAgents} tasks={mockTasks} />;
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
          platforms={mockPlatforms} 
          executionLogs={mockExecutionLogs} 
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
        return <EvaluationSystem agents={mockAgents} tasks={mockTasks} />;
      case 'health':
        return <AgentHealthDashboard />;
      case 'notifications':
        return <SmartNotificationSystem />;
      case 'actions':
        return <QuickActionsPanel />;
      default:
        return <DashboardOverview agents={mockAgents} tasks={mockTasks} />;
    }
  };

  return (
    <div className="mt-6">
      {renderTabContent()}
    </div>
  );
};
