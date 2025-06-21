
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Mic, Settings } from 'lucide-react';
import type { AccessibilityOptions } from '@/types/creative';

interface VoiceCommandsProps {
  settings: AccessibilityOptions;
}

export const VoiceCommands = ({ settings }: VoiceCommandsProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className={`text-xl font-bold ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            Voice-to-Command Bridge
          </h3>
          <p className={`text-gray-600 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            Natural language audio control system
          </p>
        </div>
        <Badge variant="outline">DeepSpeech</Badge>
      </div>

      <Card>
        <CardContent className="flex items-center justify-center h-96">
          <div className="text-center">
            <Brain className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">Voice Commands Coming Soon</h3>
            <p className="text-gray-600">Say "enhance clarity" or "reduce noise" to control audio</p>
            <div className="flex gap-2 mt-4 justify-center">
              <Button size="sm"><Mic className="w-4 h-4 mr-2" />Start Listening</Button>
              <Button size="sm" variant="outline"><Settings className="w-4 h-4" /></Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
