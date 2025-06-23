
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { 
  Scissors, 
  Volume2, 
  Upload,
  RotateCcw,
  Maximize,
  Settings
} from 'lucide-react';

interface VideoEditingToolsProps {
  selectedVideo: any;
  isVideoReady: boolean;
  playbackSpeed: number[];
  volume: number[];
  onSpeedChange: (value: number[]) => void;
  onVolumeChange: (value: number[]) => void;
}

export const VideoEditingTools = ({
  selectedVideo,
  isVideoReady,
  playbackSpeed,
  volume,
  onSpeedChange,
  onVolumeChange
}: VideoEditingToolsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scissors className="w-5 h-5" />
            Editing Tools
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <Button size="sm" variant="outline" disabled={!selectedVideo || !isVideoReady}>
              <Scissors className="w-4 h-4 mr-2" />
              Cut
            </Button>
            <Button size="sm" variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Import
            </Button>
            <Button size="sm" variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Undo
            </Button>
            <Button size="sm" variant="outline">
              <Maximize className="w-4 h-4 mr-2" />
              Fit
            </Button>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Playback Speed: {playbackSpeed[0]}x</label>
            <Slider 
              value={playbackSpeed} 
              max={3} 
              min={0.25} 
              step={0.25} 
              onValueChange={onSpeedChange}
              disabled={!selectedVideo || !isVideoReady}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="w-5 h-5" />
            Audio Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <label className="text-sm font-medium">Master Volume: {volume[0]}%</label>
            <Slider 
              value={volume} 
              max={100} 
              min={0} 
              onValueChange={onVolumeChange}
              disabled={!selectedVideo || !isVideoReady}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Audio Track</label>
            <Slider defaultValue={[80]} max={100} min={0} disabled={!selectedVideo || !isVideoReady} />
          </div>
          <Button size="sm" variant="outline" className="w-full" disabled={!selectedVideo || !isVideoReady}>
            <Settings className="w-4 h-4 mr-2" />
            Advanced Audio
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
