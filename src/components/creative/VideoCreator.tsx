
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield,
  Heart,
  Sparkles
} from 'lucide-react';
import { toast } from 'sonner';
import { VideoEditor } from './video/VideoEditor';
import { LogoRemovalTool } from './video/LogoRemovalTool';
import { FractalEffects } from './video/FractalEffects';
import { AudioReactiveEffects } from './video/AudioReactiveEffects';
import { AIProcessing } from './video/AIProcessing';
import { SocialMediaPublisher } from './video/SocialMediaPublisher';
import { VoiceCommandsVideo } from './video/VoiceCommandsVideo';
import { ProjectManager } from './video/ProjectManager';
import { VideoUploadSection } from './video/VideoUploadSection';
import { VideoLibrary } from './video/VideoLibrary';
import { StorageSettings } from './video/StorageSettings';
import { VideoContextProvider } from './video/VideoContextProvider';
import type { CreativeAgent, AccessibilityOptions } from '@/types/creative';

interface VideoCreatorProps {
  agents: CreativeAgent[];
  settings: AccessibilityOptions;
}

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

export const VideoCreator = ({ agents, settings }: VideoCreatorProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [uploadedVideos, setUploadedVideos] = useState<UploadedVideo[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<UploadedVideo | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [useLocalStorage, setUseLocalStorage] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);

  const handleVideosUploaded = (newVideos: UploadedVideo[]) => {
    setUploadedVideos(prev => [...prev, ...newVideos]);
  };

  const handleVideoDelete = (videoId: string) => {
    setUploadedVideos(prev => prev.filter(v => v.id !== videoId));
    if (selectedVideo?.id === videoId) {
      setSelectedVideo(null);
    }
  };

  const startEditing = (video: UploadedVideo) => {
    setSelectedVideo(video);
    setActiveTab('editor');
    toast.info('Opening video editor...');
  };

  const selectVideoForProcessing = (video: UploadedVideo, tab: string) => {
    setSelectedVideo(video);
    setActiveTab(tab);
    toast.info(`Opening ${tab} with selected video...`);
  };

  const handleVideoPlay = (videoId: string) => {
    setPlayingVideo(videoId);
  };

  const handleVideoPause = (videoId: string) => {
    setPlayingVideo(null);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <StorageSettings
        useLocalStorage={useLocalStorage}
        offlineMode={offlineMode}
        onLocalStorageChange={setUseLocalStorage}
        onOfflineModeChange={setOfflineMode}
      />
      <VideoUploadSection
        useLocalStorage={useLocalStorage}
        offlineMode={offlineMode}
        isUploading={isUploading}
        onVideosUploaded={handleVideosUploaded}
        onUploadingChange={setIsUploading}
      />
      <VideoLibrary
        videos={uploadedVideos}
        selectedVideo={selectedVideo}
        playingVideo={playingVideo}
        onVideoSelect={setSelectedVideo}
        onVideoDelete={handleVideoDelete}
        onVideoEdit={startEditing}
        onVideoPlay={handleVideoPlay}
        onVideoPause={handleVideoPause}
        onVideoProcessing={selectVideoForProcessing}
      />
    </div>
  );

  return (
    <VideoContextProvider 
      videos={uploadedVideos}
      selectedVideo={selectedVideo}
      setSelectedVideo={setSelectedVideo}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className={`text-2xl font-bold ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
              🎬 Professional Video Toolkit
            </h2>
            <p className={`text-gray-600 mt-1 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
              AI-powered video creation, editing, and publishing platform
            </p>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="bg-green-50 text-green-700">
              <Shield className="w-3 h-3 mr-1" />
              Open Source
            </Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              <Heart className="w-3 h-3 mr-1" />
              Humanitarian
            </Badge>
            <Badge variant="outline" className="bg-purple-50 text-purple-700">
              <Sparkles className="w-3 h-3 mr-1" />
              AI-Enhanced
            </Badge>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-9">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="logo-removal">Logo Fix</TabsTrigger>
            <TabsTrigger value="fractals">Fractals</TabsTrigger>
            <TabsTrigger value="audio-reactive">Audio FX</TabsTrigger>
            <TabsTrigger value="ai-processing">AI Tools</TabsTrigger>
            <TabsTrigger value="social-publisher">Publish</TabsTrigger>
            <TabsTrigger value="voice-commands">Voice</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            {renderOverview()}
          </TabsContent>

          <TabsContent value="editor">
            <VideoEditor settings={settings}selectedVideo={selectedVideo} />
          </TabsContent>

          <TabsContent value="logo-removal">
            <LogoRemovalTool settings={settings} selectedVideo={selectedVideo} />
          </TabsContent>

          <TabsContent value="fractals">
            <FractalEffects settings={settings} selectedVideo={selectedVideo} />
          </TabsContent>

          <TabsContent value="audio-reactive">
            <AudioReactiveEffects settings={settings} selectedVideo={selectedVideo} />
          </TabsContent>

          <TabsContent value="ai-processing">
            <AIProcessing settings={settings} selectedVideo={selectedVideo} />
          </TabsContent>

          <TabsContent value="social-publisher">
            <SocialMediaPublisher settings={settings} selectedVideo={selectedVideo} />
          </TabsContent>

          <TabsContent value="voice-commands">
            <VoiceCommandsVideo settings={settings} selectedVideo={selectedVideo} />
          </TabsContent>

          <TabsContent value="projects">
            <ProjectManager settings={settings} selectedVideo={selectedVideo} />
          </TabsContent>
        </Tabs>
      </div>
    </VideoContextProvider>
  );
};
