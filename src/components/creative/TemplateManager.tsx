
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText } from 'lucide-react';
import type { CreativeAgent, AccessibilityOptions } from '@/types/creative';

interface TemplateManagerProps {
  agents: CreativeAgent[];
  settings: AccessibilityOptions;
}

export const TemplateManager = ({ agents, settings }: TemplateManagerProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            📄 Template Manager
          </h2>
          <p className={`text-gray-600 mt-1 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            Documents, presentations & social media templates
          </p>
        </div>
        <Badge variant="outline">
          {agents.length} Template Agents Active
        </Badge>
      </div>

      <Card>
        <CardContent className="flex items-center justify-center h-96">
          <div className="text-center">
            <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">Template Manager Coming Soon</h3>
            <p className="text-gray-600">Professional templates for all your creative needs</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
