
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Globe, 
  Smartphone, 
  Monitor, 
  Plus, 
  ExternalLink,
  Settings,
  Activity,
  Shield,
  Zap
} from 'lucide-react';
import type { WebProject, WebAgent } from '@/types/webDevelopment';

interface ProjectManagerProps {
  projects: WebProject[];
  agents: WebAgent[];
  onProjectSelect: (projectId: string) => void;
}

export const ProjectManager = ({ projects, agents, onProjectSelect }: ProjectManagerProps) => {
  const getProjectIcon = (type: string) => {
    switch (type) {
      case 'website': return <Globe className="w-5 h-5" />;
      case 'web_app': return <Monitor className="w-5 h-5" />;
      case 'mobile_app': return <Smartphone className="w-5 h-5" />;
      case 'pwa': return <Activity className="w-5 h-5" />;
      default: return <Globe className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'deployed': return 'bg-green-100 text-green-800';
      case 'development': return 'bg-blue-100 text-blue-800';
      case 'testing': return 'bg-yellow-100 text-yellow-800';
      case 'maintenance': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">Active Projects</h3>
        <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => onProjectSelect(project.id)}>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getProjectIcon(project.type)}
                  <div>
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <CardDescription className="capitalize">
                      {project.type.replace('_', ' ')}
                    </CardDescription>
                  </div>
                </div>
                <Badge className={getStatusColor(project.status)}>
                  {project.status}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Zap className="w-4 h-4" />
                    <span className={getPerformanceColor(project.performance.pageSpeed)}>
                      {project.performance.pageSpeed}
                    </span>
                  </div>
                  <p className="text-slate-600 text-xs">Performance</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Shield className="w-4 h-4" />
                    <span className={getPerformanceColor(project.security.securityScore)}>
                      {project.security.securityScore}
                    </span>
                  </div>
                  <p className="text-slate-600 text-xs">Security</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Activity className="w-4 h-4" />
                    <span className={getPerformanceColor(project.accessibility.score)}>
                      {project.accessibility.score}
                    </span>
                  </div>
                  <p className="text-slate-600 text-xs">Accessibility</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-slate-600 mb-2">Technologies:</p>
                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 4).map((tech, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.technologies.length - 4}
                    </Badge>
                  )}
                </div>
              </div>
              
              <div>
                <p className="text-sm text-slate-600 mb-2">
                  Assigned Agents ({project.assignedAgents.length}):
                </p>
                <div className="flex -space-x-2">
                  {project.assignedAgents.slice(0, 4).map((agentId, index) => {
                    const agent = agents.find(a => a.id === agentId);
                    return (
                      <div key={index} 
                           className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center text-white text-xs border-2 border-white"
                           title={agent?.name}>
                        {agent?.name.charAt(0) || 'A'}
                      </div>
                    );
                  })}
                  {project.assignedAgents.length > 4 && (
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 text-xs border-2 border-white">
                      +{project.assignedAgents.length - 4}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex gap-2">
                {project.deploymentUrl && (
                  <Button size="sm" variant="outline" className="flex-1">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Live
                  </Button>
                )}
                <Button size="sm" variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Configure
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
