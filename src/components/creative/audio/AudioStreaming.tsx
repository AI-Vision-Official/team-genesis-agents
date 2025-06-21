
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Waveform, Play, Square, Settings } from 'lucide-react';
import type { AccessibilityOptions } from '@/types/creative';

interface AudioStreamingProps {
  settings: AccessibilityOptions;
}

export const AudioStreaming = ({ settings }: AudioStreamingProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className={`text-xl font-bold ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            Real-time Audio Streaming
          </h3>
          <p className={`text-gray-600 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            WebRTC-based audio processing pipeline
          </p>
        </div>
        <Badge variant="outline">WebRTC</Badge>
      </div>

      <Card>
        <CardContent className="flex items-center justify-center h-96">
          <div className="text-center">
            <Waveform className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">Streaming Pipeline Coming Soon</h3>
            <p className="text-gray-600">Real-time audio processing and streaming</p>
            <div className="flex gap-2 mt-4 justify-center">
              <Button size="sm"><Play className="w-4 h-4 mr-2" />Start Stream</Button>
              <Button size="sm" variant="outline"><Settings className="w-4 h-4" /></Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
