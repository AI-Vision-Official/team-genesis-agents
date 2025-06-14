
export interface MasterPlan {
  id: string;
  title: string;
  version: string;
  lastUpdated: Date;
  objectives: Objective[];
  strategies: Strategy[];
  milestones: Milestone[];
  resources: Resource[];
  risks: Risk[];
  successMetrics: SuccessMetric[];
  collaborators: Collaborator[];
}

export interface Objective {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'planned' | 'in_progress' | 'completed' | 'blocked';
  targetDate: Date;
  assignedTo: string[];
  progress: number;
}

export interface Strategy {
  id: string;
  title: string;
  description: string;
  relatedObjectives: string[];
  tactics: Tactic[];
  status: 'draft' | 'approved' | 'implementing' | 'completed';
  success: boolean | null;
}

export interface Tactic {
  id: string;
  title: string;
  description: string;
  resources: string[];
  timeline: string;
  responsible: string;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  targetDate: Date;
  actualDate?: Date;
  status: 'upcoming' | 'in_progress' | 'completed' | 'missed';
  impact: 'low' | 'medium' | 'high' | 'critical';
  celebration?: string;
}

export interface Resource {
  id: string;
  type: 'human' | 'ai_agent' | 'technology' | 'budget' | 'time' | 'knowledge';
  name: string;
  description: string;
  availability: 'available' | 'limited' | 'unavailable';
  allocation: string[];
  cost?: number;
}

export interface Risk {
  id: string;
  title: string;
  description: string;
  probability: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high' | 'critical';
  mitigation: string;
  status: 'identified' | 'monitoring' | 'mitigating' | 'resolved';
}

export interface SuccessMetric {
  id: string;
  name: string;
  description: string;
  target: number;
  current: number;
  unit: string;
  trend: 'improving' | 'declining' | 'stable';
}

export interface Collaborator {
  id: string;
  name: string;
  type: 'human' | 'ai_agent';
  role: string;
  expertise: string[];
  status: 'active' | 'busy' | 'offline';
  lastSeen: Date;
}

export interface DailyLog {
  id: string;
  date: Date;
  author: string;
  authorType: 'human' | 'ai_agent';
  achievements: Achievement[];
  challenges: Challenge[];
  insights: string[];
  nextSteps: string[];
  mood: 'excellent' | 'good' | 'neutral' | 'challenging' | 'difficult';
  collaborationHighlights: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  collaborators: string[];
  celebrationWorthy: boolean;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  severity: 'minor' | 'moderate' | 'major' | 'critical';
  supportNeeded: string;
  proposedSolutions: string[];
}

export interface TaskAssignment {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  assignedBy: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'assigned' | 'in_progress' | 'review' | 'completed' | 'blocked';
  deadline: Date;
  estimatedHours: number;
  actualHours?: number;
  dependencies: string[];
  tags: string[];
  relatedObjective?: string;
}

export interface MotivationalBoost {
  id: string;
  from: string;
  to: string;
  message: string;
  type: 'compliment' | 'encouragement' | 'appreciation' | 'achievement_recognition';
  timestamp: Date;
  public: boolean;
}

export interface Meeting {
  id: string;
  title: string;
  type: 'strategic_planning' | 'daily_standup' | 'crisis_response' | 'brainstorming' | 'retrospective';
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  startTime: Date;
  endTime?: Date;
  participants: string[];
  agenda: AgendaItem[];
  decisions: Decision[];
  actionItems: ActionItem[];
  transcript?: string;
  summary?: string;
}

export interface AgendaItem {
  id: string;
  title: string;
  description: string;
  timeAllocation: number;
  presenter: string;
  status: 'pending' | 'discussing' | 'completed';
}

export interface Decision {
  id: string;
  title: string;
  description: string;
  rationale: string;
  decisionMaker: string;
  timestamp: Date;
  impact: 'low' | 'medium' | 'high' | 'critical';
  followUpRequired: boolean;
}

export interface ActionItem {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  dueDate: Date;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'completed';
}

export interface BoardroomAccessibilityOptions {
  dyslexiaFont: boolean;
  highContrast: boolean;
  reducedMotion: boolean;
  largeText: boolean;
  voiceToText: boolean;
  textToSpeech: boolean;
  quietMode: boolean;
  focusMode: boolean;
}
