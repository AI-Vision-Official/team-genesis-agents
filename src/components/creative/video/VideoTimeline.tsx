
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Layers } from 'lucide-react';

interface VideoTimelineProps {
  duration: number;
  currentTime: number;
  selectedLayer: string;
  onLayerSelect: (layerId: string) => void;
  isVideoReady: boolean;
}

const formatTime = (seconds: number) => {
  if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const VideoTimeline = ({
  duration,
  currentTime,
  selectedLayer,
  onLayerSelect,
  isVideoReady
}: VideoTimelineProps) => {
  const layers = [
    { id: 'video', name: 'Video Track', type: 'video', color: 'bg-blue-500', duration: duration },
    { id: 'audio', name: 'Audio Track', type: 'audio', color: 'bg-green-500', duration: duration },
    { id: 'effects', name: 'Effects Layer', type: 'effects', color: 'bg-purple-500', duration: duration * 0.5 },
    { id: 'overlay', name: 'Text Overlay', type: 'overlay', color: 'bg-orange-500', duration: duration * 0.25 }
  ];

  return (
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
            onClick={() => onLayerSelect(layer.id)}
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
                style={{ width: duration > 0 ? `${Math.min(100, (layer.duration / duration) * 100)}%` : '0%' }}
              />
              {layer.id === 'video' && isVideoReady && (
                <div 
                  className="absolute top-0 w-1 h-full bg-red-500"
                  style={{ left: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%' }}
                />
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
