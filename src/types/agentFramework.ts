
export interface AgentRole {
  id: string;
  name: string;
  type: 'leader' | 'specialist' | 'coordinator' | 'support' | 'analyst' | 'executor';
  department: 'marketing' | 'development' | 'humanitarian' | 'creative' | 'operations' | 'security' | 'research';
  responsibilities: string[];
  requiredCapabilities: string[];
  autonomyLevel: 'low' | 'medium' | 'high' | 'full';
  canSpawnAgents: boolean;
  maxSubordinates: number;
  communicationChannels: CommunicationChannel[];
  securityClearance: 'public' | 'internal' | 'confidential' | 'restricted';
}

export interface Agent {
  id: string;
  name: string;
  role: AgentRole;
  status: 'active' | 'idle' | 'spawning' | 'training' | 'offline' | 'error';
  parentAgentId?: string;
  subordinateIds: string[];
  currentTasks: Task[];
  workload: number; // 0-100%
  efficiency: number; // 0-100%
  specializations: string[];
  createdAt: Date;
  lastActive: Date;
  communicationPreferences: CommunicationPreference[];
  aiModel?: string;
  version: string;
  metrics: AgentMetrics;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical' | 'emergency';
  status: 'pending' | 'assigned' | 'in_progress' | 'review' | 'completed' | 'blocked';
  assignedToId: string;
  createdById: string;
  estimatedHours: number;
  actualHours?: number;
  deadline?: Date;
  dependencies: string[];
  tags: string[];
  securityLevel: 'public' | 'internal' | 'confidential' | 'restricted';
  communicationLog: CommunicationEntry[];
  progress: number; // 0-100%
  requiredCapabilities: string[];
}

export interface CommunicationChannel {
  type: 'email' | 'sms' | 'slack' | 'discord' | 'telegram' | 'whatsapp' | 'internal' | 'secure_encrypted';
  config: Record<string, any>;
  enabled: boolean;
  securityLevel: 'public' | 'internal' | 'confidential' | 'restricted';
  regions: string[];
}

export interface CommunicationPreference {
  channelType: string;
  priority: number;
  conditions: string[];
  enabled: boolean;
}

export interface CommunicationEntry {
  id: string;
  fromAgentId: string;
  toAgentId: string;
  channel: string;
  message: string;
  timestamp: Date;
  securityLevel: 'public' | 'internal' | 'confidential' | 'restricted';
  urgent: boolean;
  read: boolean;
}

export interface AgentMetrics {
  tasksCompleted: number;
  averageTaskTime: number;
  successRate: number;
  collaborationScore: number;
  innovationIndex: number;
  agentsSpawned: number;
  communicationEfficiency: number;
  uptime: number;
}

export interface SpawnRequest {
  id: string;
  requestingAgentId: string;
  requestedRole: Partial<AgentRole>;
  justification: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  estimatedDuration: 'temporary' | 'short_term' | 'long_term' | 'permanent';
  requiredCapabilities: string[];
  budget?: number;
  status: 'pending' | 'approved' | 'rejected' | 'spawning' | 'completed';
  createdAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
  spawnedAgentId?: string;
}

export interface WorkflowProtocol {
  id: string;
  name: string;
  description: string;
  triggerConditions: string[];
  steps: WorkflowStep[];
  involvedRoles: string[];
  securityRequirements: string[];
  escalationRules: EscalationRule[];
  automated: boolean;
}

export interface WorkflowStep {
  id: string;
  order: number;
  action: string;
  assignedRole: string;
  estimatedTime: number;
  requiredCapabilities: string[];
  dependencies: string[];
  outputs: string[];
}

export interface EscalationRule {
  condition: string;
  targetRole: string;
  timeThreshold: number;
  notificationChannels: string[];
  automated: boolean;
}

export interface SecurityPolicy {
  id: string;
  name: string;
  level: 'public' | 'internal' | 'confidential' | 'restricted';
  accessRoles: string[];
  dataHandlingRules: string[];
  communicationRestrictions: string[];
  auditRequirements: string[];
  complianceStandards: string[];
}

export interface DashboardAlert {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success' | 'security';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  source: string;
  timestamp: Date;
  read: boolean;
  actionRequired: boolean;
  suggestedActions: string[];
  affectedAgents: string[];
}

export interface AIDecisionSuggestion {
  id: string;
  category: 'resource_allocation' | 'task_prioritization' | 'agent_spawning' | 'workflow_optimization' | 'risk_management';
  title: string;
  description: string;
  confidence: number; // 0-1
  impact: 'low' | 'medium' | 'high';
  reasoning: string[];
  dataPoints: string[];
  suggestedActions: string[];
  alternatives: string[];
  timestamp: Date;
  status: 'pending' | 'accepted' | 'rejected' | 'implemented';
}

export interface ManualOverride {
  id: string;
  type: 'task_reassignment' | 'priority_change' | 'agent_spawn_approval' | 'workflow_modification' | 'security_exception';
  description: string;
  originalState: any;
  newState: any;
  reason: string;
  timestamp: Date;
  authorizedBy: string;
  affectedEntities: string[];
}
