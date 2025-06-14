
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart as PieChartIcon, 
  Activity,
  Users,
  Zap,
  Target,
  Clock,
  Award,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

interface AnalyticsData {
  agentPerformance: AgentPerformanceData[];
  taskMetrics: TaskMetricData[];
  systemHealth: SystemHealthData[];
  collaborationStats: CollaborationData[];
  trendAnalysis: TrendData[];
}

interface AgentPerformanceData {
  name: string;
  efficiency: number;
  tasksCompleted: number;
  successRate: number;
  collaborationScore: number;
  trend: 'up' | 'down' | 'stable';
}

interface TaskMetricData {
  category: string;
  completed: number;
  pending: number;
  inProgress: number;
  averageTime: number;
}

interface SystemHealthData {
  timestamp: string;
  cpuUsage: number;
  memoryUsage: number;
  activeAgents: number;
  responsiveness: number;
}

interface CollaborationData {
  date: string;
  collaborations: number;
  successfulCollaborations: number;
  averageDuration: number;
}

interface TrendData {
  period: string;
  agentSpawns: number;
  taskCompletions: number;
  systemUptime: number;
  userSatisfaction: number;
}

export const AdvancedAnalyticsDashboard = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading analytics data
    const loadAnalyticsData = () => {
      setTimeout(() => {
        setAnalyticsData({
          agentPerformance: [
            {
              name: 'DataAnalyst-Alpha',
              efficiency: 94,
              tasksCompleted: 47,
              successRate: 96,
              collaborationScore: 89,
              trend: 'up'
            },
            {
              name: 'CodeReviewer-Beta',
              efficiency: 89,
              tasksCompleted: 23,
              successRate: 92,
              collaborationScore: 78,
              trend: 'stable'
            },
            {
              name: 'ProjectManager-Gamma',
              efficiency: 97,
              tasksCompleted: 156,
              successRate: 98,
              collaborationScore: 95,
              trend: 'up'
            }
          ],
          taskMetrics: [
            { category: 'Data Analysis', completed: 45, pending: 12, inProgress: 8, averageTime: 120 },
            { category: 'Code Review', completed: 23, pending: 5, inProgress: 3, averageTime: 85 },
            { category: 'Project Management', completed: 67, pending: 18, inProgress: 12, averageTime: 200 }
          ],
          systemHealth: [
            { timestamp: '00:00', cpuUsage: 45, memoryUsage: 62, activeAgents: 12, responsiveness: 98 },
            { timestamp: '04:00', cpuUsage: 38, memoryUsage: 58, activeAgents: 10, responsiveness: 99 },
            { timestamp: '08:00', cpuUsage: 52, memoryUsage: 65, activeAgents: 15, responsiveness: 97 },
            { timestamp: '12:00', cpuUsage: 67, memoryUsage: 72, activeAgents: 18, responsiveness: 95 },
            { timestamp: '16:00', cpuUsage: 78, memoryUsage: 76, activeAgents: 20, responsiveness: 94 },
            { timestamp: '20:00', cpuUsage: 56, memoryUsage: 68, activeAgents: 16, responsiveness: 96 }
          ],
          collaborationStats: [
            { date: 'Mon', collaborations: 12, successfulCollaborations: 11, averageDuration: 45 },
            { date: 'Tue', collaborations: 15, successfulCollaborations: 14, averageDuration: 38 },
            { date: 'Wed', collaborations: 18, successfulCollaborations: 17, averageDuration: 42 },
            { date: 'Thu', collaborations: 14, successfulCollaborations: 13, averageDuration: 40 },
            { date: 'Fri', collaborations: 20, successfulCollaborations: 19, averageDuration: 35 },
            { date: 'Sat', collaborations: 8, successfulCollaborations: 8, averageDuration: 50 },
            { date: 'Sun', collaborations: 6, successfulCollaborations: 6, averageDuration: 55 }
          ],
          trendAnalysis: [
            { period: 'Week 1', agentSpawns: 8, taskCompletions: 145, systemUptime: 99.2, userSatisfaction: 87 },
            { period: 'Week 2', agentSpawns: 12, taskCompletions: 189, systemUptime: 99.5, userSatisfaction: 89 },
            { period: 'Week 3', agentSpawns: 15, taskCompletions: 234, systemUptime: 99.1, userSatisfaction: 91 },
            { period: 'Week 4', agentSpawns: 18, taskCompletions: 278, systemUptime: 99.7, userSatisfaction: 93 }
          ]
        });
        setIsLoading(false);
      }, 1500);
    };

    loadAnalyticsData();
  }, [selectedTimeframe]);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-50 animate-pulse" />
            <p className="text-slate-600">Loading advanced analytics...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-purple-500" />
            Advanced Analytics
          </h2>
          <p className="text-slate-600 mt-1">Deep insights into agent performance and system metrics</p>
        </div>
        <div className="flex gap-2">
          {['24h', '7d', '30d', '90d'].map((timeframe) => (
            <Button
              key={timeframe}
              variant={selectedTimeframe === timeframe ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTimeframe(timeframe)}
            >
              {timeframe}
            </Button>
          ))}
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Active Agents</p>
                    <p className="text-2xl font-bold">18</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-500" />
                </div>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">+12%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Tasks Completed</p>
                    <p className="text-2xl font-bold">278</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">+18%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">System Uptime</p>
                    <p className="text-2xl font-bold">99.7%</p>
                  </div>
                  <Activity className="w-8 h-8 text-purple-500" />
                </div>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">+0.2%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Efficiency Score</p>
                    <p className="text-2xl font-bold">93%</p>
                  </div>
                  <Award className="w-8 h-8 text-yellow-500" />
                </div>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">+5%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* System Health Chart */}
          <Card>
            <CardHeader>
              <CardTitle>System Health Over Time</CardTitle>
              <CardDescription>Real-time monitoring of system resources</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={analyticsData?.systemHealth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="cpuUsage" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="memoryUsage" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          {/* Agent Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Agent Performance Metrics</CardTitle>
              <CardDescription>Individual agent efficiency and success rates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData?.agentPerformance.map((agent) => (
                  <div key={agent.name} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <h4 className="font-medium">{agent.name}</h4>
                        {getTrendIcon(agent.trend)}
                      </div>
                      <Badge variant="outline">{agent.tasksCompleted} tasks</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-slate-600">Efficiency</p>
                        <Progress value={agent.efficiency} className="mt-1" />
                        <p className="text-xs text-right mt-1">{agent.efficiency}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">Success Rate</p>
                        <Progress value={agent.successRate} className="mt-1" />
                        <p className="text-xs text-right mt-1">{agent.successRate}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">Collaboration</p>
                        <Progress value={agent.collaborationScore} className="mt-1" />
                        <p className="text-xs text-right mt-1">{agent.collaborationScore}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4">
          {/* Task Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Task Distribution</CardTitle>
                <CardDescription>Breakdown by category</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analyticsData?.taskMetrics}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ category, value }) => `${category}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="completed"
                    >
                      {analyticsData?.taskMetrics.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Task Completion Times</CardTitle>
                <CardDescription>Average time by category</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analyticsData?.taskMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="averageTime" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="collaboration" className="space-y-4">
          {/* Collaboration Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Agent Collaboration Trends</CardTitle>
              <CardDescription>Weekly collaboration patterns and success rates</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analyticsData?.collaborationStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="collaborations" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="successfulCollaborations" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          {/* Long-term Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Trends</CardTitle>
              <CardDescription>Long-term system and agent performance analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={analyticsData?.trendAnalysis}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="agentSpawns" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="taskCompletions" stroke="#10b981" strokeWidth={2} />
                  <Line type="monotone" dataKey="userSatisfaction" stroke="#f59e0b" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
