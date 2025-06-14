import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Bot, Users, Zap, Activity, Plus, Settings, Eye, Brain } from 'lucide-react';
import { AgentCard } from '@/components/AgentCard';
import { TaskBoard } from '@/components/TaskBoard';
import { TeamPanel } from '@/components/TeamPanel';
import { EvaluationSystem } from '@/components/evaluation/EvaluationSystem';
import { MissionControlCenter } from '@/components/missionControl/MissionControlCenter';

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

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const mockAgents: Agent[] = [
    {
      id: '1',
      name: 'DataAnalyst-Alpha',
      type: 'Data Analyst',
      status: 'active',
      capabilities: ['Data Processing', 'Statistical Analysis', 'Report Generation'],
      currentTask: 'Analyzing sales data for Q4 report',
      efficiency: 94,
      tasksCompleted: 47,
      spawnedAgents: 3
    },
    {
      id: '2',
      name: 'CodeReviewer-Beta',
      type: 'Code Reviewer',
      status: 'spawning',
      capabilities: ['Code Analysis', 'Bug Detection', 'Performance Optimization'],
      currentTask: 'Creating specialized testing agents',
      efficiency: 89,
      tasksCompleted: 23,
      spawnedAgents: 1
    },
    {
      id: '3',
      name: 'ProjectManager-Gamma',
      type: 'Project Manager',
      status: 'active',
      capabilities: ['Task Delegation', 'Resource Management', 'Timeline Planning'],
      currentTask: 'Coordinating team of 5 agents for product launch',
      efficiency: 97,
      tasksCompleted: 156,
      spawnedAgents: 12
    }
  ];

  const mockTasks: Task[] = [
    {
      id: '1',
      title: 'Customer Sentiment Analysis',
      description: 'Analyze customer feedback from Q4 surveys',
      assignedTo: 'DataAnalyst-Alpha',
      status: 'in-progress',
      priority: 'high',
      progress: 65,
      spawnedAgents: ['SentimentAnalyzer-1', 'DataCleaner-2']
    },
    {
      id: '2',
      title: 'Automated Testing Suite',
      description: 'Create comprehensive test coverage for new features',
      assignedTo: 'CodeReviewer-Beta',
      status: 'spawning-agents',
      priority: 'medium',
      progress: 30,
      spawnedAgents: ['TestWriter-1']
    },
    {
      id: '3',
      title: 'Product Launch Coordination',
      description: 'Manage all aspects of product launch across teams',
      assignedTo: 'ProjectManager-Gamma',
      status: 'active',
      priority: 'critical',
      progress: 45,
      spawnedAgents: ['MarketingAgent-1', 'QAAgent-2', 'DocumentationAgent-3']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              AI Agent Command Center
            </h1>
            <p className="text-slate-600 mt-2">Orchestrate intelligent agents to accomplish complex tasks</p>
          </div>
          <div className="flex gap-3">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Agent
            </Button>
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8">
          {[
            { id: 'overview', label: 'Overview', icon: Activity },
            { id: 'mission-control', label: 'Mission Control', icon: Brain },
            { id: 'agents', label: 'Agents', icon: Bot },
            { id: 'teams', label: 'Teams', icon: Users },
            { id: 'tasks', label: 'Tasks', icon: Zap },
            { id: 'evaluation', label: 'Evaluation', icon: Eye }
          ].map(({ id, label, icon: Icon }) => (
            <Button
              key={id}
              variant={activeTab === id ? "default" : "ghost"}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 ${
                activeTab === id 
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' 
                  : 'hover:bg-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-purple-700">Active Agents</CardTitle>
                  <Bot className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-900">24</div>
                  <p className="text-xs text-purple-600">+3 spawned today</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-blue-700">Tasks Completed</CardTitle>
                  <Zap className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-900">156</div>
                  <p className="text-xs text-blue-600">+12% from last week</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-green-700">Team Efficiency</CardTitle>
                  <Activity className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-900">94%</div>
                  <p className="text-xs text-green-600">+2% improvement</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-orange-700">Agent Teams</CardTitle>
                  <Users className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-900">7</div>
                  <p className="text-xs text-orange-600">2 new teams formed</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Agent Activity</CardTitle>
                <CardDescription>Latest actions and spawned agents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      agent: 'ProjectManager-Gamma',
                      action: 'Spawned MarketingAgent-1 for campaign analysis',
                      time: '2 minutes ago',
                      type: 'spawn'
                    },
                    {
                      agent: 'DataAnalyst-Alpha',
                      action: 'Completed Q4 sales report analysis',
                      time: '15 minutes ago',
                      type: 'complete'
                    },
                    {
                      agent: 'CodeReviewer-Beta',
                      action: 'Created TestWriter-1 for automated testing',
                      time: '1 hour ago',
                      type: 'spawn'
                    }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.type === 'spawn' ? 'bg-blue-500' : 'bg-green-500'
                        }`} />
                        <div>
                          <p className="font-medium">{activity.agent}</p>
                          <p className="text-sm text-slate-600">{activity.action}</p>
                        </div>
                      </div>
                      <span className="text-xs text-slate-500">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Mission Control Tab */}
        {activeTab === 'mission-control' && (
          <MissionControlCenter agents={mockAgents} tasks={mockTasks} />
        )}

        {/* Agents Tab */}
        {activeTab === 'agents' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {mockAgents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        )}

        {/* Teams Tab */}
        {activeTab === 'teams' && (
          <TeamPanel />
        )}

        {/* Tasks Tab */}
        {activeTab === 'tasks' && (
          <TaskBoard tasks={mockTasks} />
        )}

        {/* Evaluation Tab */}
        {activeTab === 'evaluation' && (
          <EvaluationSystem agents={mockAgents} tasks={mockTasks} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
