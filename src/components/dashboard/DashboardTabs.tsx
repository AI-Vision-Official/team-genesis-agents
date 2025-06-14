
import { AgentCard } from '@/components/AgentCard';
import { TaskBoard } from '@/components/TaskBoard';
import { TeamPanel } from '@/components/TeamPanel';
import { EvaluationSystem } from '@/components/evaluation/EvaluationSystem';
import { MissionControlCenter } from '@/components/missionControl/MissionControlCenter';
import { MarketingAICenter } from '@/components/marketing/MarketingAICenter';
import { WebDevelopmentCenter } from '@/components/webDevelopment/WebDevelopmentCenter';
import { DashboardOverview } from './DashboardOverview';
import type { WebAgent, WebProject } from '@/types/webDevelopment';

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
  // Mock data for web development
  const mockWebAgents: WebAgent[] = [
    {
      id: '1',
      name: 'ReactDev-Alpha',
      type: 'frontend',
      status: 'active',
      currentProject: 'E-commerce Platform Redesign',
      specializations: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
      efficiency: 94,
      projectsCompleted: 23,
      bugsFixed: 156
    },
    {
      id: '2',
      name: 'NodeAPI-Beta',
      type: 'backend',
      status: 'developing',
      currentProject: 'API Gateway Development',
      specializations: ['Node.js', 'PostgreSQL', 'GraphQL', 'Docker'],
      efficiency: 89,
      projectsCompleted: 18,
      bugsFixed: 89
    },
    {
      id: '3',
      name: 'MobileApp-Gamma',
      type: 'mobile',
      status: 'testing',
      currentProject: 'Cross-platform Mobile App',
      specializations: ['React Native', 'PWA', 'Capacitor', 'iOS/Android'],
      efficiency: 91,
      projectsCompleted: 12,
      bugsFixed: 67
    }
  ];

  const mockWebProjects: WebProject[] = [
    {
      id: '1',
      name: 'E-commerce Platform',
      type: 'web_app',
      status: 'development',
      progress: 75,
      assignedAgents: ['1', '2'],
      features: [],
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      accessibility: {
        wcagLevel: 'AA',
        score: 87,
        issues: [],
        neurodiversityFriendly: true,
        darkModeSupport: true,
        dyslexiaFriendly: true
      },
      performance: {
        coreWebVitals: { lcp: 2.1, fid: 45, cls: 0.05 },
        pageSpeed: 92,
        mobileScore: 89,
        desktopScore: 95,
        recommendations: []
      },
      security: {
        vulnerabilities: [],
        sslStatus: 'valid',
        lastSecurityScan: new Date(),
        securityScore: 94,
        backupStatus: 'current'
      },
      lastUpdated: new Date(),
      deploymentUrl: 'https://ecommerce.example.com'
    }
  ];

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
    
    case 'web-development':
      return <WebDevelopmentCenter agents={mockWebAgents} projects={mockWebProjects} />;
    
    case 'evaluation':
      return <EvaluationSystem agents={mockAgents} tasks={mockTasks} />;
    
    default:
      return <DashboardOverview />;
  }
};
