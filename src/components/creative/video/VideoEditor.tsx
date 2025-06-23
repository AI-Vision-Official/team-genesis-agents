
import { useState, useRef, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { VideoPreview } from './VideoPreview';
import { VideoTimeline } from './VideoTimeline';
import { VideoEditingTools } from './VideoEditingTools';
import { VideoExportSettings } from './VideoExportSettings';
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

interface VideoEditorProps {
  settings: AccessibilityOptions;
  selectedVideo?: UploadedVideo | null;
}

export const VideoEditor = ({ settings, selectedVideo }: VideoEditorProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [selectedLayer, setSelectedLayer] = useState('video');
  const [playbackSpeed, setPlaybackSpeed] = useState([1]);
  const [volume, setVolume] = useState([75]);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (selectedVideo && videoRef.current) {
      console.log('Loading video:', selectedVideo.name, selectedVideo.url);
      setCurrentTime(0);
      setIsPlaying(false);
      setIsVideoReady(false);
      setVideoError(null);
      
      // Reset video element
      const video = videoRef.current;
      video.pause();
      video.currentTime = 0;
      
      // Set video properties before loading
      video.crossOrigin = 'anonymous';
      video.preload = 'metadata';
      video.muted = true; // Start muted to avoid autoplay issues
      
      // Set the src
      video.src = selectedVideo.url;
      video.load();
    }
  }, [selectedVideo]);

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      const videoDuration = videoRef.current.duration;
      setDuration(videoDuration || 0);
      setIsVideoReady(true);
      setVideoError(null);
      console.log('Video metadata loaded successfully, duration:', videoDuration);
      toast.success('Video loaded successfully');
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handlePlayPause = () => {
    if (videoRef.current && isVideoReady) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        // Unmute when user manually plays
        videoRef.current.muted = false;
        const playPromise = videoRef.current.play();
        if (playPromise) {
          playPromise.then(() => {
            setIsPlaying(true);
          }).catch(error => {
            console.error('Video play error:', error);
            setVideoError(`Playback failed: ${error.message}`);
            toast.error('Failed to play video. The file might be corrupted or in an unsupported format.');
          });
        }
      }
    } else if (!isVideoReady) {
      toast.error('Video is still loading, please wait...');
    } else {
      toast.error('No video selected');
    }
  };

  const handleSeek = (value: number[]) => {
    const time = value[0];
    if (videoRef.current && isVideoReady && !isNaN(time)) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleSpeedChange = (value: number[]) => {
    setPlaybackSpeed(value);
    if (videoRef.current && isVideoReady) {
      videoRef.current.playbackRate = value[0];
    }
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value);
    if (videoRef.current) {
      videoRef.current.volume = value[0] / 100;
      // Unmute if volume is set above 0
      if (value[0] > 0) {
        videoRef.current.muted = false;
      }
    }
  };

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error('Video error event:', e);
    const video = videoRef.current;
    if (video?.error) {
      const errorMessages = {
        1: 'Video loading was aborted',
        2: 'Network error occurred while loading video',
        3: 'Video file appears to be corrupted or in unsupported format',
        4: 'Video format is not supported by this browser'
      };
      
      const errorCode = video.error.code as keyof typeof errorMessages;
      const errorMessage = errorMessages[errorCode] || `Unknown video error (code: ${errorCode})`;
      
      console.error('Video error details:', {
        code: video.error.code,
        message: video.error.message,
        url: selectedVideo?.url,
        fileType: selectedVideo?.file.type,
        fileName: selectedVideo?.name
      });
      
      setVideoError(errorMessage);
      setIsVideoReady(false);
      toast.error(errorMessage);
    }
  };

  const handleCanPlay = () => {
    console.log('Video can play - ready for playback');
    setIsVideoReady(true);
    setVideoError(null);
  };

  const handleWaiting = () => {
    console.log('Video is buffering...');
  };

  const handleLoadStart = () => {
    console.log('Video load started');
    setIsVideoReady(false);
    setVideoError(null);
  };

  const skipBackward = () => {
    if (videoRef.current && isVideoReady) {
      const newTime = Math.max(0, currentTime - 10);
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const skipForward = () => {
    if (videoRef.current && isVideoReady) {
      const newTime = Math.min(duration, currentTime + 10);
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleRetry = () => {
    if (videoRef.current && selectedVideo) {
      videoRef.current.src = selectedVideo.url;
      videoRef.current.load();
      setVideoError(null);
    }
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
            {selectedVideo && (
              <span className="ml-2 text-blue-600">
                • Editing: {selectedVideo.name}
              </span>
            )}
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline">FFmpeg</Badge>
          <Badge variant="outline">OpenCV</Badge>
          <Badge variant="outline">WebAssembly</Badge>
        </div>
      </div>

      <VideoPreview
        selectedVideo={selectedVideo}
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        volume={volume}
        isVideoReady={isVideoReady}
        videoError={videoError}
        onPlayPause={handlePlayPause}
        onSeek={handleSeek}
        onVolumeChange={handleVolumeChange}
        onSkipBackward={skipBackward}
        onSkipForward={skipForward}
        onRetry={handleRetry}
        videoRef={videoRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onVideoError={handleVideoError}
        onCanPlay={handleCanPlay}
        onWaiting={handleWaiting}
        onLoadStart={handleLoadStart}
      />

      <VideoTimeline
        duration={duration}
        currentTime={currentTime}
        selectedLayer={selectedLayer}
        onLayerSelect={setSelectedLayer}
        isVideoReady={isVideoReady}
      />

      <VideoEditingTools
        selectedVideo={selectedVideo}
        isVideoReady={isVideoReady}
        playbackSpeed={playbackSpeed}
        volume={volume}
        onSpeedChange={handleSpeedChange}
        onVolumeChange={handleVolumeChange}
      />

      <VideoExportSettings
        selectedVideo={selectedVideo}
        isVideoReady={isVideoReady}
        videoError={videoError}
      />
    </div>
  );
};
