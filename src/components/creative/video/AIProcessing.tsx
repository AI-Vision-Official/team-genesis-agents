
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Eye, Upload, Settings } from 'lucide-react';
import type { AccessibilityOptions } from '@/types/creative';

interface UploadedVideo {
  id: string;
  file: File;
  url: string;
  name: string;
  size: number;
  duration?: number;
  uploaded: boolean;
  storageType: 'local' | 'supabase';
  localPath?: string;
}

interface AIProcessingProps {
  settings: AccessibilityOptions;
  selectedVideo?: UploadedVideo | null;
}

export const AIProcessing = ({ settings, selectedVideo }: AIProcessingProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className={`text-xl font-bold ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            AI Video Processing
          </h3>
          <p className={`text-gray-600 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            Object detection, background removal, and captioning
            {selectedVideo && (
              <span className="ml-2 text-blue-600">
                • Video: {selectedVideo.name}
              </span>
            )}
          </p>
        </div>
        <Badge variant="outline">TensorFlow</Badge>
      </div>

      <Card>
        <CardContent className="flex items-center justify-center h-96">
          <div className="text-center">
            <Brain className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">AI Processing Coming Soon</h3>
            <p className="text-gray-600">Automated object detection and background removal</p>
            <div className="flex gap-2 mt-4 justify-center">
              <Button size="sm" disabled={!selectedVideo}>
                <Upload className="w-4 h-4 mr-2" />
                Process Video
              </Button>
              <Button size="sm" variant="outline">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
            {!selectedVideo && (
              <p className="text-sm text-gray-500 mt-2">
                Select a video from the Overview tab
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
