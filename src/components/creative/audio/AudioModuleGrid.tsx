
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { AccessibilityOptions } from '@/types/creative';

interface AudioModule {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  status: string;
  agents: number;
}

interface AudioModuleGridProps {
  audioModules: AudioModule[];
  settings: AccessibilityOptions;
  onModuleClick: (moduleId: string) => void;
}

export const AudioModuleGrid = ({ audioModules, settings, onModuleClick }: AudioModuleGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {audioModules.map((module) => (
        <Card 
          key={module.id}
          className="cursor-pointer hover:shadow-lg transition-all duration-200 border-l-4"
          style={{ borderLeftColor: module.color.replace('bg-', '').replace('-500', '') }}
          onClick={() => onModuleClick(module.id)}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className={`p-2 rounded-lg ${module.color} text-white`}>
                <module.icon className="w-5 h-5" />
              </div>
              <div className="flex gap-1">
                <Badge 
                  variant={module.status === 'active' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {module.status}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {module.agents} agents
                </Badge>
              </div>
            </div>
            <CardTitle className={`text-base ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
              {module.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className={settings.dyslexiaFont ? 'font-mono' : ''}>
              {module.description}
            </CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
