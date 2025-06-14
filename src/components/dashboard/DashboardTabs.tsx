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
  const mockSocialAgents = [
    {
      id: 'social-1',
      name: 'SocialPilot-Alpha',
      specialization: 'content_creator',
      status: 'active',
      performanceScore: 92,
      currentTask: 'Crafting engaging posts for Twitter',
      postsCreated: 145,
      engagementRate: 3.8,
      platforms: [
        { id: 'twitter', name: 'Twitter' },
        { id: 'facebook', name: 'Facebook' },
        { id: 'instagram', name: 'Instagram' }
      ],
      languages: ['English', 'Spanish']
    },
    {
      id: 'social-2',
      name: 'TrendTracker-Beta',
      specialization: 'trend_monitor',
      status: 'monitoring',
      performanceScore: 88,
      currentTask: 'Analyzing trending topics on TikTok',
      postsCreated: 0,
      engagementRate: 0,
      platforms: [
        { id: 'tiktok', name: 'TikTok' },
        { id: 'youtube', name: 'YouTube' }
      ],
      languages: ['English']
    }
  ];

  const mockHumanitarianProjects = [
    {
      id: 'humanitarian-1',
      name: 'Clean Water Initiative',
      description: 'Providing clean water access to rural communities',
      location: 'Sub-Saharan Africa',
      status: 'active',
      startDate: new Date(),
      endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      budget: 500000,
      impact: {
        peopleHelped: 15000,
        waterProvided: '5M liters'
      }
    },
    {
      id: 'humanitarian-2',
      name: 'Education for Girls',
      description: 'Empowering girls through education in conflict zones',
      location: 'Middle East',
      status: 'planning',
      startDate: new Date(),
      endDate: new Date(Date.now() + 730 * 24 * 60 * 60 * 1000),
      budget: 750000,
      impact: {
        peopleHelped: 5000,
        schoolsBuilt: 3
      }
    }
  ];

  const mockCrisisAlerts = [
    {
      id: 'crisis-1',
      title: 'Earthquake in Nepal',
      location: 'Kathmandu, Nepal',
      severity: 'critical',
      status: 'new',
      date: new Date(),
      description: 'A major earthquake has struck Nepal, causing widespread damage and casualties.',
      resourcesNeeded: ['Medical supplies', 'Shelter', 'Food'],
      affectedPopulation: 100000
    },
    {
      id: 'crisis-2',
      title: 'Flooding in Bangladesh',
      location: 'Dhaka, Bangladesh',
      severity: 'high',
      status: 'in progress',
      date: new Date(),
      description: 'Severe flooding has displaced thousands of people in Bangladesh.',
      resourcesNeeded: ['Clean water', 'Boats', 'Medical assistance'],
      affectedPopulation: 50000
    }
  ];

  const mockWebAgents = [
    {
      id: 'web-1',
      name: 'FrontEndDev-Alpha',
      specialization: 'front-end',
      status: 'active',
      currentTask: 'Building responsive UI components',
      projects: ['Project Phoenix', 'E-Commerce Platform'],
      efficiency: 95,
      languages: ['JavaScript', 'React', 'HTML', 'CSS']
    },
    {
      id: 'web-2',
      name: 'BackEndDev-Beta',
      specialization: 'back-end',
      status: 'idle',
      currentTask: 'Optimizing database queries',
      projects: ['API Service', 'Data Pipeline'],
      efficiency: 88,
      languages: ['Python', 'Node.js', 'SQL']
    }
  ];

  const mockWebProjects = [
    {
      id: 'project-1',
      name: 'Project Phoenix',
      description: 'Revamping legacy system with modern technologies',
      status: 'in progress',
      team: ['FrontEndDev-Alpha', 'BackEndDev-Beta'],
      startDate: new Date(),
      endDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
      budget: 250000,
      technologies: ['React', 'Node.js', 'PostgreSQL']
    },
    {
      id: 'project-2',
      name: 'E-Commerce Platform',
      description: 'Building a scalable e-commerce platform',
      status: 'planning',
      team: ['FrontEndDev-Alpha', 'BackEndDev-Beta'],
      startDate: new Date(),
      endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      budget: 500000,
      technologies: ['React', 'GraphQL', 'MongoDB']
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview agents={mockAgents} tasks={mockTasks} />;
      case 'social':
        return <SocialMediaCenter agents={mockSocialAgents} />;
      case 'mission':
        return <MissionControlCenter agents={mockAgents} tasks={mockTasks} />;
      case 'humanitarian':
        return <HumanitarianCenter projects={mockHumanitarianProjects} alerts={mockCrisisAlerts} />;
      case 'web':
        return <WebDevelopmentCenter agents={mockWebAgents} projects={mockWebProjects} />;
      case 'education':
        return <EducationCenter />;
      case 'creative':
        return <CreativeCenter />;
      case 'marketing':
        return <MarketingAICenter />;
      case 'invention':
        return <InventionCenter />;
      case 'integrations':
        return <IntegrationsCenter />;
      case 'ifttt':
        return <IFTTTCenter />;
      case 'boardroom':
        return <BoardroomCenter />;
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
        return <DashboardOverview agents={mockAgents} tasks={mockTasks} />;
    }
  };

  return (
    <div className="mt-6">
      {renderTabContent()}
    </div>
  );
};
