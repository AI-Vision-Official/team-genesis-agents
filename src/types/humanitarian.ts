
export interface HumanitarianProject {
  id: string;
  name: string;
  description: string;
  status: 'idea' | 'planning' | 'active' | 'completed' | 'paused';
  phase: string;
  startDate: Date;
  targetDate?: Date;
  completionDate?: Date;
  region: string[];
  languages: string[];
  priority: 'low' | 'medium' | 'high' | 'emergency';
  ethicsAlignment: number; // 0-100
  impact: ProjectImpact;
  resources: ResourceAllocation;
  milestones: Milestone[];
  volunteers: Volunteer[];
}

export interface ProjectImpact {
  peopleHelped: number;
  regionsReached: number;
  languagesServed: number;
  storiesShared: number;
  emotionalReach: number;
  educationalImpact: number;
}

export interface ResourceAllocation {
  budget: number;
  spent: number;
  donations: Donation[];
  materials: Material[];
  transparency: TransparencyReport;
}

export interface Donation {
  id: string;
  amount: number;
  currency: string;
  donor: string;
  date: Date;
  purpose: string;
  allocated: boolean;
}

export interface Material {
  id: string;
  type: string;
  quantity: number;
  value: number;
  source: string;
  allocated: boolean;
}

export interface TransparencyReport {
  lastUpdated: Date;
  publicUrl?: string;
  breakdown: {
    category: string;
    amount: number;
    percentage: number;
  }[];
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  completed: boolean;
  completionDate?: Date;
  assignedTo: string[];
}

export interface Volunteer {
  id: string;
  name: string;
  type: 'human' | 'ai';
  skills: string[];
  availability: string;
  currentTasks: string[];
  contactInfo?: string;
}

export interface CrisisAlert {
  id: string;
  type: 'natural_disaster' | 'conflict' | 'displacement' | 'health_emergency' | 'other';
  location: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  affectedPopulation: number;
  urgency: number; // 1-10
  feasibility: number; // 1-10
  detectedAt: Date;
  suggestedActions: string[];
  status: 'new' | 'reviewing' | 'responding' | 'monitoring' | 'resolved';
}

export interface GrantOpportunity {
  id: string;
  title: string;
  funder: string;
  amount: number;
  currency: string;
  deadline: Date;
  eligibility: string[];
  focus: string[];
  applicationUrl: string;
  match: number; // 0-100 relevance score
  status: 'new' | 'applying' | 'submitted' | 'awarded' | 'rejected';
}

export interface StoryContent {
  id: string;
  title: string;
  content: string;
  type: 'update' | 'story' | 'poem' | 'report';
  projectId: string;
  language: string;
  publishDate: Date;
  socialMediaGenerated: boolean;
  reach: number;
  engagement: number;
}

export interface EmergencyMessage {
  id: string;
  type: 'family_separation' | 'rescue_coordination' | 'missing_person' | 'general_help';
  message: string;
  languages: string[];
  channels: ('sms' | 'email' | 'signal' | 'telegram')[];
  recipients: string[];
  sentAt: Date;
  delivered: number;
  failed: number;
  retries: number;
}

export interface AccessibilitySettings {
  dyslexiaFont: boolean;
  colorBlindMode: string;
  lowContrast: boolean;
  readingLevel: 'simple' | 'standard' | 'advanced';
  quietMode: boolean;
  minimumUI: boolean;
}
