
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { 
  Video, 
  Play, 
  Pause, 
  Volume2, 
  SkipBack,
  SkipForward,
  RotateCcw
} from 'lucide-react';
import { toast } from 'sonner';

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

interface VideoPreviewProps {
  selectedVideo: UploadedVideo | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number[];
  isVideoReady: boolean;
  videoError: string | null;
  onPlayPause: () => void;
  onSeek: (value: number[]) => void;
  onVolumeChange: (value: number[]) => void;
  onSkipBackward: () => void;
  onSkipForward: () => void;
  onRetry: () => void;
  videoRef: React.RefObject<HTMLVideoElement>;
  onTimeUpdate: () => void;
  onLoadedMetadata: () => void;
  onVideoError: (e: React.SyntheticEvent<HTMLVideoElement, Event>) => void;
  onCanPlay: () => void;
  onWaiting: () => void;
  onLoadStart: () => void;
}

const formatTime = (seconds: number) => {
  if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const VideoPreview = ({
  selectedVideo,
  isPlaying,
  currentTime,
  duration,
  volume,
  isVideoReady,
  videoError,
  onPlayPause,
  onSeek,
  onVolumeChange,
  onSkipBackward,
  onSkipForward,
  onRetry,
  videoRef,
  onTimeUpdate,
  onLoadedMetadata,
  onVideoError,
  onCanPlay,
  onWaiting,
  onLoadStart
}: VideoPreviewProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Video className="w-5 h-5" />
          Preview Window
          {selectedVideo && (
            <Badge variant="secondary" className="ml-2">
              {selectedVideo.storageType === 'local' ? 'Local' : 'Cloud'}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center relative">
          {selectedVideo ? (
            <>
              <video
                ref={videoRef}
                src={selectedVideo.url}
                className="w-full h-full object-contain rounded-lg"
                onTimeUpdate={onTimeUpdate}
                onLoadedMetadata={onLoadedMetadata}
                onError={onVideoError}
                onPlay={() => {}}
                onPause={() => {}}
                onCanPlay={onCanPlay}
                onWaiting={onWaiting}
                onLoadStart={onLoadStart}
                preload="metadata"
                crossOrigin="anonymous"
                playsInline
              />
              
              {/* Video Controls Overlay */}
              {isVideoReady && !videoError && (
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-4 bg-black/70 rounded-lg px-4 py-2 backdrop-blur-sm">
                    <Button
                      size="sm"
                      onClick={onPlayPause}
                      className="bg-white/20 hover:bg-white/30"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    
                    <Button
                      size="sm"
                      onClick={onSkipBackward}
                      className="bg-white/20 hover:bg-white/30"
                      disabled={!isVideoReady}
                    >
                      <SkipBack className="w-4 h-4" />
                    </Button>
                    
                    <Button
                      size="sm"
                      onClick={onSkipForward}
                      className="bg-white/20 hover:bg-white/30"
                      disabled={!isVideoReady}
                    >
                      <SkipForward className="w-4 h-4" />
                    </Button>
                    
                    <div className="flex-1">
                      <Slider
                        value={[currentTime]}
                        max={duration || 100}
                        step={0.1}
                        onValueChange={onSeek}
                        className="h-2"
                        disabled={!isVideoReady}
                      />
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Volume2 className="w-4 h-4 text-white" />
                      <Slider
                        value={volume}
                        max={100}
                        step={1}
                        onValueChange={onVolumeChange}
                        className="w-20 h-2"
                        disabled={!isVideoReady}
                      />
                    </div>
                    
                    <span className="text-white text-sm whitespace-nowrap">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>
                </div>
              )}
              
              {/* Loading indicator */}
              {!isVideoReady && !videoError && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <div className="text-white text-center">
                    <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    <p>Loading video...</p>
                    <p className="text-sm opacity-75 mt-1">Processing {selectedVideo.name}</p>
                  </div>
                </div>
              )}
              
              {/* Error indicator */}
              {videoError && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <div className="text-white text-center max-w-md px-4">
                    <div className="w-8 h-8 border-2 border-red-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <span className="text-red-500">!</span>
                    </div>
                    <p className="text-red-400 mb-2">Video Error</p>
                    <p className="text-sm opacity-75">{videoError}</p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-3"
                      onClick={onRetry}
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Retry
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-white text-center">
              <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">Select a video to start editing</p>
              <p className="text-sm opacity-75">Upload from the Overview tab</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
