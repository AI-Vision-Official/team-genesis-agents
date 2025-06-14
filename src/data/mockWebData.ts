
import type { WebAgent, WebProject } from '@/types/webDevelopment';

export const mockWebAgents: WebAgent[] = [
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

export const mockWebProjects: WebProject[] = [
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
