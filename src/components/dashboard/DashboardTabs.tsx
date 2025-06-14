
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
import { DashboardOverview } from './DashboardOverview';
import type { WebAgent, WebProject } from '@/types/webDevelopment';
import type { HumanitarianProject, CrisisAlert } from '@/types/humanitarian';
import type { CreativeAgent } from '@/types/creative';
import type { SocialMediaAgent } from '@/types/socialMedia';

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

  // Mock data for humanitarian projects
  const mockHumanitarianProjects: HumanitarianProject[] = [
    {
      id: '1',
      name: 'Community Education Initiative',
      description: 'Providing educational resources and literacy programs to underserved communities worldwide',
      status: 'active',
      phase: 'Implementation',
      startDate: new Date('2024-01-15'),
      targetDate: new Date('2024-12-31'),
      region: ['Kenya', 'Guatemala', 'Philippines'],
      languages: ['English', 'Swahili', 'Spanish', 'Tagalog'],
      priority: 'high',
      ethicsAlignment: 94,
      impact: {
        peopleHelped: 2840,
        regionsReached: 3,
        languagesServed: 4,
        storiesShared: 12,
        emotionalReach: 8500,
        educationalImpact: 2840
      },
      resources: {
        budget: 45000,
        spent: 28500,
        donations: [
          { id: '1', amount: 15000, currency: 'USD', donor: 'Anonymous', date: new Date(), purpose: 'Educational Materials', allocated: true },
          { id: '2', amount: 10000, currency: 'USD', donor: 'Local Community', date: new Date(), purpose: 'Teacher Training', allocated: true }
        ],
        materials: [
          { id: '1', type: 'Books', quantity: 500, value: 5000, source: 'Publisher Donation', allocated: true }
        ],
        transparency: {
          lastUpdated: new Date(),
          breakdown: [
            { category: 'Educational Materials', amount: 18000, percentage: 63 },
            { category: 'Teacher Training', amount: 8500, percentage: 30 },
            { category: 'Operations', amount: 2000, percentage: 7 }
          ]
        }
      },
      milestones: [
        { id: '1', title: 'Phase 1 Launch', description: 'Initial rollout in Kenya', dueDate: new Date('2024-03-01'), completed: true, completionDate: new Date('2024-02-28'), assignedTo: ['volunteer-1'] },
        { id: '2', title: 'Teacher Training Program', description: 'Train 50 local teachers', dueDate: new Date('2024-06-01'), completed: true, completionDate: new Date('2024-05-15'), assignedTo: ['volunteer-2'] },
        { id: '3', title: 'Expand to Guatemala', description: 'Launch program in second region', dueDate: new Date('2024-09-01'), completed: false, assignedTo: ['volunteer-3'] }
      ],
      volunteers: [
        { id: 'v1', name: 'Sarah Chen', type: 'human', skills: ['Education', 'Project Management'], availability: 'Full-time', currentTasks: ['Training coordination'] },
        { id: 'v2', name: 'Content Creator AI', type: 'ai', skills: ['Content Generation', 'Translation'], availability: '24/7', currentTasks: ['Material translation'] }
      ]
    }
  ];

  const mockCrisisAlerts: CrisisAlert[] = [
    {
      id: '1',
      type: 'natural_disaster',
      location: 'Philippines - Mindanao',
      severity: 'high',
      title: 'Typhoon Displacement Crisis',
      description: 'Typhoon has displaced thousands of families, immediate shelter and food assistance needed',
      affectedPopulation: 15000,
      urgency: 8,
      feasibility: 6,
      detectedAt: new Date(),
      suggestedActions: [
        'Coordinate with local NGOs for shelter setup',
        'Launch emergency donation campaign',
        'Deploy multilingual communication support',
        'Establish family reunification center'
      ],
      status: 'new'
    }
  ];

  // Mock data for creative agents
  const mockCreativeAgents: CreativeAgent[] = [
    {
      id: '1',
      name: 'ContentMaster-Alpha',
      specialization: 'content_writer',
      status: 'active',
      currentProject: 'Blog Series: AI in Education',
      expertise: ['Technical Writing', 'SEO Content', 'Creative Writing', 'Multilingual'],
      performanceScore: 96,
      projectsCompleted: 142,
      creativityRating: 94
    },
    {
      id: '2',
      name: 'VisualArtist-Beta',
      specialization: 'visual_designer',
      status: 'creating',
      currentProject: 'Brand Identity Package',
      expertise: ['Logo Design', 'Illustration', 'UI/UX Design', 'Digital Art'],
      performanceScore: 91,
      projectsCompleted: 87,
      creativityRating: 98
    },
    {
      id: '3',
      name: 'VideoProducer-Gamma',
      specialization: 'video_creator',
      status: 'processing',
      currentProject: 'Social Media Campaign Videos',
      expertise: ['Motion Graphics', 'Video Editing', 'Animation', 'Storytelling'],
      performanceScore: 89,
      projectsCompleted: 56,
      creativityRating: 92
    },
    {
      id: '4',
      name: 'AudioMaestro-Delta',
      specialization: 'audio_specialist',
      status: 'idle',
      currentProject: 'Podcast Intro Music',
      expertise: ['Music Composition', 'Sound Design', 'Voice Synthesis', 'Audio Editing'],
      performanceScore: 93,
      projectsCompleted: 73,
      creativityRating: 95
    }
  ];

  // Mock data for social media agents
  const mockSocialMediaAgents: SocialMediaAgent[] = [
    {
      id: '1',
      name: 'SocialMaster-Alpha',
      specialization: 'content_creator',
      status: 'active',
      currentTask: 'Creating multi-platform campaign content',
      platforms: [
        { id: '1', name: 'Twitter/X', type: 'mainstream', region: ['Global'], censored: false, connected: true, followers: 15420, engagementRate: 3.2, lastPost: new Date() },
        { id: '2', name: 'LinkedIn', type: 'mainstream', region: ['Global'], censored: false, connected: true, followers: 8930, engagementRate: 4.7, lastPost: new Date() }
      ],
      languages: ['English', 'Spanish', 'French', 'Dutch'],
      performanceScore: 94,
      postsCreated: 156,
      engagementRate: 4.2
    },
    {
      id: '2',
      name: 'EngagementBot-Beta',
      specialization: 'engagement_manager',
      status: 'monitoring',
      currentTask: 'Monitoring global engagement and sentiment',
      platforms: [
        { id: '3', name: 'Instagram', type: 'mainstream', region: ['Global'], censored: false, connected: true, followers: 12300, engagementRate: 5.8, lastPost: new Date() },
        { id: '4', name: 'TikTok', type: 'mainstream', region: ['Global'], censored: true, connected: false, followers: 0, engagementRate: 0, lastPost: new Date() }
      ],
      languages: ['English', 'Chinese', 'Japanese'],
      performanceScore: 89,
      postsCreated: 89,
      engagementRate: 6.1
    },
    {
      id: '3',
      name: 'TrendScout-Gamma',
      specialization: 'trend_monitor',
      status: 'analyzing',
      currentTask: 'Analyzing emerging trends in AI and technology',
      platforms: [
        { id: '5', name: 'Reddit', type: 'alternative', region: ['Global'], censored: false, connected: true, followers: 5400, engagementRate: 7.2, lastPost: new Date() },
        { id: '6', name: 'Discord', type: 'messaging', region: ['Global'], censored: false, connected: true, followers: 3200, engagementRate: 12.4, lastPost: new Date() }
      ],
      languages: ['English', 'German', 'Russian'],
      performanceScore: 92,
      postsCreated: 67,
      engagementRate: 8.3
    }
  ];

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
    
    default:
      return <DashboardOverview />;
  }
};
