
export interface SystemMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  timestamp: Date;
}

export interface AgentMetric {
  agentId: string;
  agentName: string;
  cpuUsage: number;
  memoryUsage: number;
  taskQueue: number;
  responseTime: number;
  status: 'active' | 'idle' | 'overloaded' | 'error';
  lastUpdate: Date;
}

export interface Alert {
  id: string;
  title: string;
  description: string;
  type: 'warning' | 'error' | 'info';
  timestamp: Date;
  priority: 'low' | 'medium' | 'high' | 'critical';
}
