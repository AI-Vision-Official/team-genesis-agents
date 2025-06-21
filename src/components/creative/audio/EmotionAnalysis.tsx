
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Brain, Upload } from 'lucide-react';
import type { AccessibilityOptions } from '@/types/creative';

interface EmotionAnalysisProps {
  settings: AccessibilityOptions;
}

export const EmotionAnalysis = ({ settings }: EmotionAnalysisProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className={`text-xl font-bold ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            Emotional Tone Analysis
          </h3>
          <p className={`text-gray-600 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            AI-powered emotion detection and tagging
          </p>
        </div>
        <Badge variant="outline">ML Analysis</Badge>
      </div>

      <Card>
        <CardContent className="flex items-center justify-center h-96">
          <div className="text-center">
            <Heart className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">Emotion Analysis Coming Soon</h3>
            <p className="text-gray-600">Detect emotional tone and context in voice recordings</p>
            <div className="flex gap-2 mt-4 justify-center">
              <Button size="sm"><Upload className="w-4 h-4 mr-2" />Analyze Audio</Button>
              <Button size="sm" variant="outline"><Brain className="w-4 h-4 mr-2" />AI Settings</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
