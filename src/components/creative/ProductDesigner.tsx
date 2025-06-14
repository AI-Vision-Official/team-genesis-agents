
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shirt } from 'lucide-react';
import type { CreativeAgent, AccessibilityOptions } from '@/types/creative';

interface ProductDesignerProps {
  agents: CreativeAgent[];
  settings: AccessibilityOptions;
}

export const ProductDesigner = ({ agents, settings }: ProductDesignerProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            🎨 Product Designer
          </h2>
          <p className={`text-gray-600 mt-1 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            Logos, t-shirts, business cards & book covers with auto-posting
          </p>
        </div>
        <Badge variant="outline">
          {agents.length} Design Agents Active
        </Badge>
      </div>

      <Card>
        <CardContent className="flex items-center justify-center h-96">
          <div className="text-center">
            <Shirt className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">Product Designer Coming Soon</h3>
            <p className="text-gray-600">Create and schedule product designs automatically</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
