
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bot, 
  Activity, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  Users, 
  Zap,
  Brain,
  Settings,
  Plus
} from 'lucide-react';

export const AgentManagementCenter = () => {
  const [agents] = useState([
    {
      id: '1',
      name: 'Humanitarian Coordinator Alpha',
      type: 'Disaster Response',
      status: 'active',
      performance: 94,
      tasksCompleted: 47,
      currentTask: 'Coordinating relief efforts in flood zones',
      efficiency: 'High'
    },
    {
      id: '2',
      name: 'AI Bridge Builder Beta',
      type: 'Education & Outreach',
      status: 'active',
      performance: 89,
      tasksCompleted: 156,
      currentTask: 'Creating AI literacy workshops',
      efficiency: 'High'
    },
    {
      id: '3',
      name: 'Innovation Scout Gamma',
      type: 'Research & Development',
      status: 'analyzing',
      performance: 91,
      tasksCompleted: 67,
      currentTask: 'Analyzing sustainable tech patents',
      efficiency: 'Medium'
    },
    {
      id: '4',
      name: 'Community Weaver Delta',
      type: 'Social Impact',
      status: 'active',
      performance: 96,
      tasksCompleted: 234,
      currentTask: 'Building local community networks',
      efficiency: 'High'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'analyzing': return 'bg-blue-100 text-blue-800';
      case 'idle': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-6 h-6" />
            Agent Management Center
          </CardTitle>
          <CardDescription>
            Comprehensive dashboard for managing your AI agent team
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">Performance Dashboard</TabsTrigger>
          <TabsTrigger value="assignment">Task Assignment</TabsTrigger>
          <TabsTrigger value="status">Real-time Status</TabsTrigger>
          <TabsTrigger value="analytics">Analytics & Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {agents.map((agent) => (
              <Card key={agent.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{agent.name}</CardTitle>
                      <CardDescription>{agent.type}</CardDescription>
                    </div>
                    <Badge className={getStatusColor(agent.status)}>
                      {agent.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Performance Score</span>
                      <span>{agent.performance}%</span>
                    </div>
                    <Progress value={agent.performance} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600 block">Tasks Completed</span>
                      <span className="font-bold text-lg">{agent.tasksCompleted}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 block">Efficiency</span>
                      <span className="font-bold text-lg">{agent.efficiency}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-sm text-gray-600 block mb-1">Current Task</span>
                    <p className="text-sm font-medium">{agent.currentTask}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">View Details</Button>
                    <Button size="sm" variant="outline">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="assignment">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Smart Task Assignment System
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-green-50">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-green-800 mb-2">High Priority</h4>
                    <p className="text-2xl font-bold text-green-600">12</p>
                    <p className="text-sm text-green-600">Tasks pending</p>
                  </CardContent>
                </Card>
                <Card className="bg-blue-50">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-blue-800 mb-2">In Progress</h4>
                    <p className="text-2xl font-bold text-blue-600">23</p>
                    <p className="text-sm text-blue-600">Tasks active</p>
                  </CardContent>
                </Card>
                <Card className="bg-purple-50">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-purple-800 mb-2">Completed</h4>
                    <p className="text-2xl font-bold text-purple-600">156</p>
                    <p className="text-sm text-purple-600">This week</p>
                  </CardContent>
                </Card>
              </div>
              
              <Button className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Create New Task Assignment
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="status">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-green-50 to-emerald-100">
              <CardContent className="p-4 text-center">
                <Activity className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-green-800">4</h3>
                <p className="text-green-600">Active Agents</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-4 text-center">
                <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-blue-800">98.7%</h3>
                <p className="text-blue-600">Uptime</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
              <CardContent className="p-4 text-center">
                <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-purple-800">+23%</h3>
                <p className="text-purple-600">Performance</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-orange-50 to-orange-100">
              <CardContent className="p-4 text-center">
                <Zap className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-orange-800">1.2M</h3>
                <p className="text-orange-600">Tasks/Day</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Advanced Analytics & Performance Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">
                  Deep Learning Analytics Engine
                </h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Comprehensive performance analytics, predictive insights, and optimization recommendations for your AI agent team.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
