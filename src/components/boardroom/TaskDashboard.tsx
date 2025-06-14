
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  Clock, 
  User, 
  Bot,
  Plus,
  Filter,
  Calendar
} from 'lucide-react';
import type { BoardroomAccessibilityOptions, TaskAssignment } from '@/types/boardroom';

interface TaskDashboardProps {
  settings: BoardroomAccessibilityOptions;
}

export const TaskDashboard = ({ settings }: TaskDashboardProps) => {
  const [filter, setFilter] = useState('all');

  const mockTasks: TaskAssignment[] = [
    {
      id: '1',
      title: 'Implement multi-language content adaptation',
      description: 'Create AI system for automatic content localization across platforms',
      assignedTo: 'AI-ContentMaster',
      assignedBy: 'Human-Sarah',
      priority: 'high',
      status: 'in_progress',
      deadline: new Date('2024-07-20'),
      estimatedHours: 8,
      actualHours: 5,
      dependencies: [],
      tags: ['social-media', 'ai-development'],
      relatedObjective: '1'
    },
    {
      id: '2',
      title: 'Design accessibility controls for boardroom',
      description: 'Create dyslexia-friendly and high-contrast options for better collaboration',
      assignedTo: 'Human-Marcus',
      assignedBy: 'AI-Alpha',
      priority: 'medium',
      status: 'assigned',
      deadline: new Date('2024-07-18'),
      estimatedHours: 6,
      dependencies: [],
      tags: ['accessibility', 'ui-design'],
      relatedObjective: '1'
    },
    {
      id: '3',
      title: 'Research censorship workaround strategies',
      description: 'Investigate VPN and proxy solutions for global platform access',
      assignedTo: 'AI-ResearchBot',
      assignedBy: 'Human-Sarah',
      priority: 'high',
      status: 'completed',
      deadline: new Date('2024-07-15'),
      estimatedHours: 4,
      actualHours: 3,
      dependencies: [],
      tags: ['research', 'global-access'],
      relatedObjective: '2'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in_progress': return 'bg-blue-500';
      case 'assigned': return 'bg-yellow-500';
      case 'blocked': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'destructive';
      case 'high': return 'default';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'secondary';
    }
  };

  const filteredTasks = filter === 'all' ? mockTasks : mockTasks.filter(task => task.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            ✅ Task Dashboard
          </h2>
          <p className={`text-gray-600 mt-1 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            Daily goals and task assignments for AI-Human teams
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Task
          </Button>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {['all', 'assigned', 'in_progress', 'review', 'completed'].map((status) => (
          <Button
            key={status}
            variant={filter === status ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(status)}
          >
            {status.replace('_', ' ')}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTasks.map((task) => (
          <Card key={task.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className={`text-lg ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                    {task.title}
                  </CardTitle>
                  <CardDescription className={`mt-1 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                    {task.description}
                  </CardDescription>
                </div>
                <div className={`w-3 h-3 rounded-full ${getStatusColor(task.status)}`}></div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                {task.assignedTo.includes('AI-') ? (
                  <Bot className="w-4 h-4 text-blue-500" />
                ) : (
                  <User className="w-4 h-4 text-green-500" />
                )}
                <span className={`text-sm ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                  {task.assignedTo}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className={`text-sm text-gray-600 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                  Due: {task.deadline.toLocaleDateString()}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className={`text-sm text-gray-600 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                  {task.actualHours || 0}h / {task.estimatedHours}h
                </span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${Math.min(((task.actualHours || 0) / task.estimatedHours) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant={getPriorityColor(task.priority)}>
                  {task.priority}
                </Badge>
                <Badge variant="outline">
                  {task.status.replace('_', ' ')}
                </Badge>
              </div>

              <div className="flex gap-1 flex-wrap">
                {task.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1">
                  View Details
                </Button>
                {task.status !== 'completed' && (
                  <Button size="sm" className="flex-1">
                    Update Status
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <Card>
          <CardContent className="flex items-center justify-center h-48">
            <div className="text-center">
              <CheckCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className={`text-gray-500 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                No tasks found for the selected filter
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
