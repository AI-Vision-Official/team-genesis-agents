
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import type { CreativeAgent, AccessibilityOptions } from '@/types/creative';

interface ResearchAssistantProps {
  agents: CreativeAgent[];
  settings: AccessibilityOptions;
}

export const ResearchAssistant = ({ agents, settings }: ResearchAssistantProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            🔍 Research Assistant
          </h2>
          <p className={`text-gray-600 mt-1 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            AI-powered research and insights gathering
          </p>
        </div>
        <Badge variant="outline">
          {agents.length} Research Agents Active
        </Badge>
      </div>

      <Card>
        <CardContent className="flex items-center justify-center h-96">
          <div className="text-center">
            <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">Research Assistant Coming Soon</h3>
            <p className="text-gray-600">Intelligent research and data gathering tools</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
