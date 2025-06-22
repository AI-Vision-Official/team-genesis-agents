
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Share2, Upload, Calendar, Settings } from 'lucide-react';
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

interface SocialMediaPublisherProps {
  settings: AccessibilityOptions;
  selectedVideo?: UploadedVideo | null;
}

export const SocialMediaPublisher = ({ settings, selectedVideo }: SocialMediaPublisherProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className={`text-xl font-bold ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            Social Media Publisher
          </h3>
          <p className={`text-gray-600 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            Multi-platform publishing with automated metadata
            {selectedVideo && (
              <span className="ml-2 text-blue-600">
                • Video: {selectedVideo.name}
              </span>
            )}
          </p>
        </div>
        <Badge variant="outline">API Integration</Badge>
      </div>

      <Card>
        <CardContent className="flex items-center justify-center h-96">
          <div className="text-center">
            <Share2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">Social Publisher Coming Soon</h3>
            <p className="text-gray-600">Direct upload to YouTube, TikTok, Instagram, and more</p>
            <div className="flex gap-2 mt-4 justify-center">
              <Button size="sm" disabled={!selectedVideo}>
                <Upload className="w-4 h-4 mr-2" />
                Publish
              </Button>
              <Button size="sm" variant="outline" disabled={!selectedVideo}>
                <Calendar className="w-4 h-4" />
                Schedule
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
