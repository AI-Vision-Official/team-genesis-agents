
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Video } from 'lucide-react';
import type { CreativeAgent, AccessibilityOptions } from '@/types/creative';

interface VideoCreatorProps {
  agents: CreativeAgent[];
  settings: AccessibilityOptions;
}

export const VideoCreator = ({ agents, settings }: VideoCreatorProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            🎬 Video Creator
          </h2>
          <p className={`text-gray-600 mt-1 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            Create short videos, social clips & professional templates
          </p>
        </div>
        <Badge variant="outline">
          {agents.length} Video Agents Active
        </Badge>
      </div>

      <Card>
        <CardContent className="flex items-center justify-center h-96">
          <div className="text-center">
            <Video className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">Video Creator Coming Soon</h3>
            <p className="text-gray-600">Advanced video creation tools with templates and automation</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
