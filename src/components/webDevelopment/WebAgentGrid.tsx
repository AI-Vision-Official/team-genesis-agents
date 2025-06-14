
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Monitor, 
  Server, 
  Smartphone, 
  Palette, 
  Bug, 
  Shield, 
  Search,
  Globe,
  Activity,
  PlayCircle
} from 'lucide-react';
import type { WebAgent } from '@/types/webDevelopment';

interface WebAgentGridProps {
  agents: WebAgent[];
}

export const WebAgentGrid = ({ agents }: WebAgentGridProps) => {
  const getAgentIcon = (type: string) => {
    switch (type) {
      case 'frontend': return <Monitor className="w-5 h-5" />;
      case 'backend': return <Server className="w-5 h-5" />;
      case 'mobile': return <Smartphone className="w-5 h-5" />;
      case 'uiux': return <Palette className="w-5 h-5" />;
      case 'qa': return <Bug className="w-5 h-5" />;
      case 'security': return <Shield className="w-5 h-5" />;
      case 'seo': return <Search className="w-5 h-5" />;
      case 'localization': return <Globe className="w-5 h-5" />;
      default: return <Activity className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'developing': return 'bg-blue-100 text-blue-800';
      case 'testing': return 'bg-yellow-100 text-yellow-800';
      case 'deploying': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: string) => {
    const labels = {
      frontend: 'Front-End Specialist',
      backend: 'Back-End Specialist',
      mobile: 'Mobile App Developer',
      uiux: 'UI/UX Designer',
      qa: 'QA & Testing Agent',
      security: 'Security Specialist',
      seo: 'SEO Optimizer',
      localization: 'Localization Expert'
    };
    return labels[type as keyof typeof labels] || type;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {agents.map((agent) => (
        <Card key={agent.id} className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getAgentIcon(agent.type)}
                <div>
                  <CardTitle className="text-lg">{agent.name}</CardTitle>
                  <CardDescription>{getTypeLabel(agent.type)}</CardDescription>
                </div>
              </div>
              <Badge className={getStatusColor(agent.status)}>
                {agent.status}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-slate-600 mb-2">Current Project:</p>
              <p className="font-medium">{agent.currentProject}</p>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Efficiency</span>
                <span>{agent.efficiency}%</span>
              </div>
              <Progress value={agent.efficiency} className="h-2" />
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-600">Projects</p>
                <p className="font-medium">{agent.projectsCompleted}</p>
              </div>
              <div>
                <p className="text-slate-600">Bugs Fixed</p>
                <p className="font-medium">{agent.bugsFixed}</p>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-slate-600 mb-2">Specializations:</p>
              <div className="flex flex-wrap gap-1">
                {agent.specializations.map((spec, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {spec}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button size="sm" className="flex-1">
                <PlayCircle className="w-4 h-4 mr-2" />
                Deploy Agent
              </Button>
              <Button size="sm" variant="outline">
                Configure
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
