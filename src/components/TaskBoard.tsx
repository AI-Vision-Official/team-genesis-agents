
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Bot, Clock, AlertCircle, CheckCircle, GitBranch } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  status: 'pending' | 'in-progress' | 'spawning-agents' | 'completed' | 'active';
  priority: 'low' | 'medium' | 'high' | 'critical';
  progress: number;
  spawnedAgents: string[];
}

interface TaskBoardProps {
  tasks: Task[];
}

export const TaskBoard = ({ tasks }: TaskBoardProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'in-progress': return <Clock className="w-4 h-4 text-blue-600" />;
      case 'spawning-agents': return <GitBranch className="w-4 h-4 text-purple-600" />;
      case 'active': return <Bot className="w-4 h-4 text-green-600" />;
      default: return <AlertCircle className="w-4 h-4 text-yellow-600" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'in-progress': return 'In Progress';
      case 'spawning-agents': return 'Spawning Agents';
      case 'active': return 'Active';
      default: return 'Pending';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Task Management</h2>
        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
          Create New Task
        </Button>
      </div>

      <div className="grid gap-4">
        {tasks.map((task) => (
          <Card key={task.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {getStatusIcon(task.status)}
                    <CardTitle className="text-lg">{task.title}</CardTitle>
                    <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                      {task.priority.toUpperCase()}
                    </Badge>
                  </div>
                  <CardDescription className="text-slate-600">
                    {task.description}
                  </CardDescription>
                </div>
                <Badge variant="outline" className="ml-4">
                  {getStatusText(task.status)}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Assignment and Progress */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium">Assigned to:</span>
                  <Badge variant="secondary">{task.assignedTo}</Badge>
                </div>
                <span className="text-sm text-slate-600">{task.progress}% Complete</span>
              </div>

              <Progress value={task.progress} className="h-2" />

              {/* Spawned Agents */}
              {task.spawnedAgents.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <GitBranch className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium">Spawned Agents:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {task.spawnedAgents.map((agent, index) => (
                      <Badge key={index} variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                        {agent}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline">
                  View Details
                </Button>
                <Button size="sm" variant="outline">
                  Monitor Progress
                </Button>
                {task.status === 'spawning-agents' && (
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                    View Agent Creation
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
