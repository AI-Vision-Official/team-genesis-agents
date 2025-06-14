
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Calendar, MapPin, Users, Heart, CheckCircle, Clock, Plus } from 'lucide-react';
import type { HumanitarianProject, AccessibilitySettings } from '@/types/humanitarian';

interface ProjectOverviewProps {
  projects: HumanitarianProject[];
  settings: AccessibilitySettings;
}

export const ProjectOverview = ({ projects, settings }: ProjectOverviewProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'idea': return 'bg-gray-100 text-gray-800';
      case 'planning': return 'bg-blue-100 text-blue-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-purple-100 text-purple-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'emergency': return '🚨';
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  const getProgressPercentage = (project: HumanitarianProject) => {
    const completedMilestones = project.milestones.filter(m => m.completed).length;
    return project.milestones.length > 0 ? (completedMilestones / project.milestones.length) * 100 : 0;
  };

  if (settings.quietMode) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Daily Project Summary</h3>
          <Button size="sm" className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>
        <div className="grid gap-3">
          {projects.slice(0, 3).map((project) => (
            <Card key={project.id} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{project.name}</h4>
                  <p className="text-sm text-slate-600">{project.region.join(', ')}</p>
                </div>
                <div className="text-right">
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                  <p className="text-sm text-slate-600 mt-1">
                    {project.impact.peopleHelped} helped
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">Project Timeline & Tracker</h3>
          <p className="text-slate-600">Organized view of all humanitarian initiatives</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      <div className="grid gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{getPriorityIcon(project.priority)}</span>
                    <CardTitle className="text-xl">{project.name}</CardTitle>
                    <Badge className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                  </div>
                  <CardDescription className="text-base">
                    {project.description}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-sm text-slate-600">Ethics Alignment</div>
                  <div className="text-2xl font-bold text-green-600">
                    {project.ethicsAlignment}%
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-600" />
                  <span className="text-sm">{project.region.join(', ')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-slate-600" />
                  <span className="text-sm">{project.impact.peopleHelped} people helped</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-slate-600" />
                  <span className="text-sm">{project.languages.length} languages</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{Math.round(getProgressPercentage(project))}%</span>
                </div>
                <Progress value={getProgressPercentage(project)} className="h-2" />
              </div>

              <div className="space-y-2">
                <h5 className="font-medium">Upcoming Milestones</h5>
                <div className="space-y-1">
                  {project.milestones
                    .filter(m => !m.completed)
                    .slice(0, 3)
                    .map((milestone) => (
                      <div key={milestone.id} className="flex items-center gap-2 text-sm">
                        <Clock className="w-3 h-3 text-slate-600" />
                        <span>{milestone.title}</span>
                        <span className="text-slate-500">
                          ({new Date(milestone.dueDate).toLocaleDateString()})
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule
                </Button>
                <Button size="sm" variant="outline">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Update Progress
                </Button>
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
