
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { 
  Video, 
  Play, 
  Pause, 
  Square, 
  Scissors, 
  Layers, 
  Volume2, 
  Upload,
  Download,
  RotateCcw,
  Maximize,
  Settings
} from 'lucide-react';
import type { AccessibilityOptions } from '@/types/creative';

interface VideoEditorProps {
  settings: AccessibilityOptions;
}

export const VideoEditor = ({ settings }: VideoEditorProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(120); // 2 minutes
  const [selectedLayer, setSelectedLayer] = useState('video');

  const layers = [
    { id: 'video', name: 'Video Track', type: 'video', color: 'bg-blue-500', duration: 120 },
    { id: 'audio', name: 'Audio Track', type: 'audio', color: 'bg-green-500', duration: 120 },
    { id: 'effects', name: 'Effects Layer', type: 'effects', color: 'bg-purple-500', duration: 60 },
    { id: 'overlay', name: 'Text Overlay', type: 'overlay', color: 'bg-orange-500', duration: 30 }
  ];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className={`text-xl font-bold ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            Multi-Layer Timeline Editor
          </h3>
          <p className={`text-gray-600 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            Professional video editing with FFmpeg backend
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline">FFmpeg</Badge>
          <Badge variant="outline">OpenCV</Badge>
          <Badge variant="outline">WebAssembly</Badge>
        </div>
      </div>

      {/* Video Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="w-5 h-5" />
            Preview Window
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center relative">
            <div className="text-white text-center">
              <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">Video Preview</p>
              <p className="text-sm opacity-75">1920x1080 • 30fps</p>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center gap-4 bg-black/50 rounded-lg px-4 py-2">
                <Button
                  size="sm"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-white/20 hover:bg-white/30"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
                <div className="flex-1">
                  <Progress value={(currentTime / duration) * 100} className="h-2" />
                </div>
                <span className="text-white text-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layers className="w-5 h-5" />
            Timeline Layers
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {layers.map((layer) => (
            <div 
              key={layer.id}
              className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                selectedLayer === layer.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}
              onClick={() => setSelectedLayer(layer.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded ${layer.color}`} />
                  <span className="font-medium">{layer.name}</span>
                  <Badge variant="outline" className="text-xs">{layer.type}</Badge>
                </div>
                <span className="text-sm text-gray-500">{formatTime(layer.duration)}</span>
              </div>
              <div className="relative h-6 bg-gray-100 rounded">
                <div 
                  className={`h-full rounded ${layer.color} opacity-60`}
                  style={{ width: `${(layer.duration / duration) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Editing Tools */}
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
              <Button size="sm" variant="outline">
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
                Zoom Fit
              </Button>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Playback Speed</label>
              <Slider defaultValue={[1]} max={3} min={0.25} step={0.25} />
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
              <label className="text-sm font-medium">Master Volume</label>
              <Slider defaultValue={[75]} max={100} min={0} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Audio Track</label>
              <Slider defaultValue={[80]} max={100} min={0} />
            </div>
            <Button size="sm" variant="outline" className="w-full">
              <Settings className="w-4 h-4 mr-2" />
              Advanced Audio
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Export Options */}
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
              <select className="w-full mt-1 p-2 border rounded-md">
                <option>1920x1080 (1080p)</option>
                <option>1280x720 (720p)</option>
                <option>3840x2160 (4K)</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Format</label>
              <select className="w-full mt-1 p-2 border rounded-md">
                <option>MP4 (H.264)</option>
                <option>WebM (VP9)</option>
                <option>MOV (ProRes)</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Quality</label>
              <select className="w-full mt-1 p-2 border rounded-md">
                <option>High (8 Mbps)</option>
                <option>Medium (4 Mbps)</option>
                <option>Low (2 Mbps)</option>
              </select>
            </div>
          </div>
          <Button className="w-full mt-4">
            <Download className="w-4 h-4 mr-2" />
            Export Video
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
