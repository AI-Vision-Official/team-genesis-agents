
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';
import type { AccessibilityOptions } from '@/types/creative';

interface IdeaBoardProps {
  settings: AccessibilityOptions;
}

export const IdeaBoard = ({ settings }: IdeaBoardProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className={`text-2xl font-bold ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
          💡 Idea Board
        </h2>
        <p className={`text-gray-600 mt-1 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
          Brainstorming tools and visual mind mapping
        </p>
      </div>

      <Card>
        <CardContent className="flex items-center justify-center h-96">
          <div className="text-center">
            <Lightbulb className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">Idea Board Coming Soon</h3>
            <p className="text-gray-600">Visual brainstorming and mind mapping tools</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
