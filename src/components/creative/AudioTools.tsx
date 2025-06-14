
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Music } from 'lucide-react';
import type { CreativeAgent, AccessibilityOptions } from '@/types/creative';

interface AudioToolsProps {
  agents: CreativeAgent[];
  settings: AccessibilityOptions;
}

export const AudioTools = ({ agents, settings }: AudioToolsProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            🎵 Audio Tools
          </h2>
          <p className={`text-gray-600 mt-1 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            Music generation, jingles & text-to-speech
          </p>
        </div>
        <Badge variant="outline">
          {agents.length} Audio Agents Active
        </Badge>
      </div>

      <Card>
        <CardContent className="flex items-center justify-center h-96">
          <div className="text-center">
            <Music className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">Audio Tools Coming Soon</h3>
            <p className="text-gray-600">AI-powered music and voice generation</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
