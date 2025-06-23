
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface VideoExportSettingsProps {
  selectedVideo: any;
  isVideoReady: boolean;
  videoError: string | null;
}

export const VideoExportSettings = ({
  selectedVideo,
  isVideoReady,
  videoError
}: VideoExportSettingsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="w-5 h-5" />
          Export Settings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium">Resolution</label>
            <select className="w-full mt-1 p-2 border rounded-md" disabled={!selectedVideo || !isVideoReady}>
              <option>1920x1080 (1080p)</option>
              <option>1280x720 (720p)</option>
              <option>3840x2160 (4K)</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Format</label>
            <select className="w-full mt-1 p-2 border rounded-md" disabled={!selectedVideo || !isVideoReady}>
              <option>MP4 (H.264)</option>
              <option>WebM (VP9)</option>
              <option>MOV (ProRes)</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Quality</label>
            <select className="w-full mt-1 p-2 border rounded-md" disabled={!selectedVideo || !isVideoReady}>
              <option>High (8 Mbps)</option>
              <option>Medium (4 Mbps)</option>
              <option>Low (2 Mbps)</option>
            </select>
          </div>
        </div>
        <Button className="w-full mt-4" disabled={!selectedVideo || !isVideoReady}>
          <Download className="w-4 h-4 mr-2" />
          Export Video
        </Button>
        {!selectedVideo && (
          <p className="text-sm text-gray-500 text-center mt-2">
            Select a video from the Overview tab to enable export
          </p>
        )}
        {selectedVideo && !isVideoReady && !videoError && (
          <p className="text-sm text-amber-600 text-center mt-2">
            Video is loading... Please wait
          </p>
        )}
        {videoError && (
          <p className="text-sm text-red-600 text-center mt-2">
            Video error: {videoError}
          </p>
        )}
      </CardContent>
    </Card>
  );
};
