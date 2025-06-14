
export interface IFTTTRule {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  createdBy: string;
  createdAt: Date;
  lastTriggered?: Date;
  triggerCount: number;
  trigger: Trigger;
  conditions: Condition[];
  actions: Action[];
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: 'productivity' | 'social_media' | 'marketing' | 'humanitarian' | 'system' | 'custom';
}

export interface Trigger {
  id: string;
  type: TriggerType;
  platform: string;
  event: string;
  parameters: Record<string, any>;
  schedule?: Schedule;
}

export type TriggerType = 
  | 'webhook'
  | 'schedule'
  | 'email_received'
  | 'social_media_mention'
  | 'social_media_post'
  | 'task_completed'
  | 'agent_status_change'
  | 'mission_update'
  | 'crisis_alert'
  | 'performance_threshold'
  | 'user_action'
  | 'data_change'
  | 'file_upload'
  | 'form_submission'
  | 'api_call'
  | 'weather_change'
  | 'news_event'
  | 'stock_price'
  | 'custom';

export interface Schedule {
  type: 'once' | 'recurring';
  datetime?: Date;
  frequency?: 'hourly' | 'daily' | 'weekly' | 'monthly';
  days?: number[];
  time?: string;
}

export interface Condition {
  id: string;
  field: string;
  operator: 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'contains' | 'starts_with' | 'ends_with' | 'regex';
  value: any;
  logicalOperator?: 'AND' | 'OR';
}

export interface Action {
  id: string;
  type: ActionType;
  platform: string;
  operation: string;
  parameters: Record<string, any>;
  delay?: number;
}

export type ActionType = 
  | 'send_email'
  | 'send_sms'
  | 'post_social_media'
  | 'create_task'
  | 'assign_agent'
  | 'update_database'
  | 'send_webhook'
  | 'generate_report'
  | 'send_notification'
  | 'update_status'
  | 'create_file'
  | 'backup_data'
  | 'trigger_api'
  | 'schedule_meeting'
  | 'send_slack_message'
  | 'update_calendar'
  | 'create_ticket'
  | 'custom_script'
  | 'ai_analysis'
  | 'translation'
  | 'content_generation';

export interface Platform {
  id: string;
  name: string;
  type: 'social_media' | 'email' | 'messaging' | 'productivity' | 'analytics' | 'storage' | 'api' | 'system';
  icon: string;
  connected: boolean;
  authRequired: boolean;
  availableTriggers: string[];
  availableActions: string[];
  credentials?: Record<string, string>;
}

export interface RuleTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  popularity: number;
  trigger: Partial<Trigger>;
  actions: Partial<Action>[];
  tags: string[];
}

export interface ExecutionLog {
  id: string;
  ruleId: string;
  ruleName: string;
  timestamp: Date;
  status: 'success' | 'failed' | 'partial' | 'skipped';
  triggerData: any;
  executedActions: string[];
  errorMessage?: string;
  executionTime: number;
}

export interface IFTTTStats {
  totalRules: number;
  activeRules: number;
  totalExecutions: number;
  successRate: number;
  topCategories: Array<{ category: string; count: number }>;
  recentExecutions: ExecutionLog[];
  performanceMetrics: {
    averageExecutionTime: number;
    totalDataProcessed: number;
    apiCallsMade: number;
  };
}
