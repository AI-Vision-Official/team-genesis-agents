import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Video, 
  Upload, 
  Play, 
  Pause,
  Square, 
  Scissors, 
  Layers,
  Wand2,
  Zap,
  Globe,
  Settings,
  Download,
  Share2,
  Eye,
  Mic,
  Image,
  Type,
  Palette,
  Brain,
  Heart,
  Shield,
  Sparkles,
  FileVideo,
  Music,
  Target,
  Maximize,
  RotateCcw,
  Trash2,
  HardDrive,
  Wifi,
  WifiOff,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { VideoEditor } from './video/VideoEditor';
import { LogoRemovalTool } from './video/LogoRemovalTool';
import { FractalEffects } from './video/FractalEffects';
import { AudioReactiveEffects } from './video/AudioReactiveEffects';
import { AIProcessing } from './video/AIProcessing';
import { SocialMediaPublisher } from './video/SocialMediaPublisher';
import { VoiceCommandsVideo } from './video/VoiceCommandsVideo';
import { ProjectManager } from './video/ProjectManager';
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
  const [isProcessing, setIsProcessing] = useState(false);
  const [renderProgress, setRenderProgress] = useState(0);
  const [uploadedVideos, setUploadedVideos] = useState<UploadedVideo[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [useLocalStorage, setUseLocalStorage] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  const handleFileUpload = async (files: FileList) => {
    const videoFiles = Array.from(files).filter(file => 
      file.type.startsWith('video/') || 
      ['.mp4', '.mov', '.webm', '.avi'].some(ext => file.name.toLowerCase().endsWith(ext))
    );

    if (videoFiles.length === 0) {
      toast.error('Upload geldige videobestanden (.mp4, .mov, .webm)');
      return;
    }

    setIsUploading(true);

    for (const file of videoFiles) {
      try {
        const videoId = `video-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        
        // Check file size for Supabase (50MB limit)
        const maxSupabaseSize = 50 * 1024 * 1024; // 50MB
        const shouldUseLocal = useLocalStorage || file.size > maxSupabaseSize || offlineMode;

        let videoUrl: string;
        let storageType: 'local' | 'supabase' = 'local';

        if (shouldUseLocal) {
          // Use local file URL for large files or offline mode
          videoUrl = URL.createObjectURL(file);
          storageType = 'local';
          
          if (file.size > maxSupabaseSize) {
            toast.info(`Groot bestand (${formatFileSize(file.size)}) wordt lokaal opgeslagen`);
          }
        } else {
          // Upload to Supabase for smaller files
          const fileName = `videos/${videoId}-${file.name}`;
          
          const { data, error } = await supabase.storage
            .from('media-files')
            .upload(fileName, file);

          if (error) throw error;

          const { data: { publicUrl } } = supabase.storage
            .from('media-files')
            .getPublicUrl(fileName);

          videoUrl = publicUrl;
          storageType = 'supabase';
        }

        const newVideo: UploadedVideo = {
          id: videoId,
          file,
          url: videoUrl,
          name: file.name,
          size: file.size,
          uploaded: true,
          storageType,
          localPath: storageType === 'local' ? videoUrl : undefined
        };

        setUploadedVideos(prev => [...prev, newVideo]);
        toast.success(`Video geüpload: ${file.name} (${storageType === 'local' ? 'lokaal' : 'cloud'})`);
      } catch (error) {
        console.error('Upload error:', error);
        toast.error(`Upload mislukt: ${file.name}`);
      }
    }

    setIsUploading(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const deleteVideo = async (videoId: string) => {
    const video = uploadedVideos.find(v => v.id === videoId);
    if (video) {
      try {
        if (video.storageType === 'supabase') {
          // Delete from Supabase Storage
          const fileName = `videos/${videoId}-${video.name}`;
          await supabase.storage.from('media-files').remove([fileName]);
        } else if (video.localPath) {
          // Revoke local object URL to free memory
          URL.revokeObjectURL(video.localPath);
        }
        
        setUploadedVideos(prev => prev.filter(v => v.id !== videoId));
        toast.success('Video verwijderd');
      } catch (error) {
        console.error('Delete error:', error);
        toast.error('Verwijderen mislukt');
      }
    }
  };

  const startEditing = (videoId: string) => {
    setActiveTab('editor');
    toast.info('Video-editor wordt geopend...');
  };

  const videoModules = [
    {
      id: 'editor',
      title: 'Timeline Editor',
      description: 'Multi-layer video, audio, effects timeline',
      icon: Video,
      color: 'bg-blue-500',
      status: 'active',
      agents: 3
    },
    {
      id: 'logo-removal',
      title: 'Logo Replacement',
      description: 'AI-powered logo removal and branding',
      icon: Target,
      color: 'bg-green-500',
      status: 'active',
      agents: 2
    },
    {
      id: 'fractals',
      title: 'Fractals Effects',
      description: 'Mandelbrot/Julia sets with stable zoom',
      icon: Zap,
      color: 'bg-purple-500',
      status: 'active',
      agents: 1
    },
    {
      id: 'audio-reactive',
      title: 'Audio-Reactive FX',
      description: 'Music-synchronized visual effects',
      icon: Music,
      color: 'bg-orange-500',
      status: 'active',
      agents: 2
    },
    {
      id: 'ai-processing',
      title: 'AI Processing',
      description: 'Object detection, background removal',
      icon: Brain,
      color: 'bg-indigo-500',
      status: 'active',
      agents: 4
    },
    {
      id: 'social-publisher',
      title: 'Social Publisher',
      description: 'Multi-platform publishing automation',
      icon: Share2,
      color: 'bg-pink-500',
      status: 'active',
      agents: 2
    },
    {
      id: 'voice-commands',
      title: 'Voice Commands',
      description: 'Hands-free editing and control',
      icon: Mic,
      color: 'bg-cyan-500',
      status: 'beta',
      agents: 1
    },
    {
      id: 'projects',
      title: 'Project Manager',
      description: 'Version control and collaboration',
      icon: FileVideo,
      color: 'bg-teal-500',
      status: 'active',
      agents: 1
    }
  ];

  const renderStorageSettings = () => (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Opslag Instellingen
        </CardTitle>
        <CardDescription>
          Kies hoe je video's wilt opslaan en verwerken
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HardDrive className="w-4 h-4" />
            <Label htmlFor="local-storage">Lokale Opslag (Grote bestanden)</Label>
          </div>
          <Switch
            id="local-storage"
            checked={useLocalStorage}
            onCheckedChange={setUseLocalStorage}
          />
        </div>
        <p className="text-sm text-gray-600">
          {useLocalStorage 
            ? "Video's worden lokaal op je computer opgeslagen en verwerkt" 
            : "Kleine video's (<50MB) worden in de cloud opgeslagen"
          }
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <WifiOff className="w-4 h-4" />
            <Label htmlFor="offline-mode">Offline Modus</Label>
          </div>
          <Switch
            id="offline-mode"
            checked={offlineMode}
            onCheckedChange={setOfflineMode}
          />
        </div>
        <p className="text-sm text-gray-600">
          {offlineMode 
            ? "Alle functies werken volledig offline met lokale AI-modellen" 
            : "Online functies beschikbaar voor cloud-processing"
          }
        </p>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="flex items-center gap-2 text-sm">
            {useLocalStorage ? (
              <>
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Geen bestandsgrootte limiet</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>Max 50MB per bestand</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm">
            {offlineMode ? (
              <>
                <WifiOff className="w-4 h-4 text-blue-600" />
                <span>Volledig offline</span>
              </>
            ) : (
              <>
                <Wifi className="w-4 h-4 text-green-600" />
                <span>Online functies actief</span>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderUploadSection = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="w-5 h-5" />
          Video Upload
          {useLocalStorage && (
            <Badge variant="outline" className="ml-2">
              <HardDrive className="w-3 h-3 mr-1" />
              Lokaal
            </Badge>
          )}
        </CardTitle>
        <CardDescription>
          Upload je video's (.mp4, .mov, .webm) om te beginnen met bewerken
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          ref={dropZoneRef}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-lg mb-2">Sleep video's hierheen</p>
          <p className="text-gray-500 mb-4">of klik om bestanden te kiezen</p>
          <Button>
            <Upload className="w-4 h-4 mr-2" />
            Kies Video's
          </Button>
          {useLocalStorage && (
            <p className="text-xs text-green-600 mt-2">
              ✓ Geen bestandsgrootte limiet - werkt volledig lokaal
            </p>
          )}
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="video/*,.mp4,.mov,.webm"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
        />

        {isUploading && (
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <span>Video's uploaden...</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderVideoLibrary = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Video className="w-5 h-5" />
          Video Bibliotheek ({uploadedVideos.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {uploadedVideos.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Video className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Nog geen video's geüpload</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {uploadedVideos.map((video) => (
              <Card key={video.id} className="overflow-hidden">
                <div className="aspect-video bg-gray-900 relative">
                  <video
                    src={video.url}
                    className="w-full h-full object-cover"
                    controls={playingVideo === video.id}
                    poster=""
                  />
                  {playingVideo !== video.id && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button
                        size="lg"
                        className="rounded-full w-16 h-16 bg-black/50 hover:bg-black/70"
                        onClick={() => setPlayingVideo(video.id)}
                      >
                        <Play className="w-8 h-8 text-white" />
                      </Button>
                    </div>
                  )}
                  <div className="absolute top-2 right-2 flex gap-2">
                    <Badge variant={video.storageType === 'local' ? 'default' : 'secondary'} className="text-xs">
                      {video.storageType === 'local' ? (
                        <>
                          <HardDrive className="w-3 h-3 mr-1" />
                          Lokaal
                        </>
                      ) : (
                        <>
                          <Globe className="w-3 h-3 mr-1" />
                          Cloud
                        </>
                      )}
                    </Badge>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteVideo(video.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h4 className="font-medium truncate">{video.name}</h4>
                  <p className="text-sm text-gray-500">{formatFileSize(video.size)}</p>
                  <div className="flex gap-2 mt-3">
                    <Button 
                      size="sm" 
                      className="flex-1"
                      onClick={() => startEditing(video.id)}
                    >
                      <Scissors className="w-4 h-4 mr-2" />
                      Bewerken
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderOverview = () => (
    <div className="space-y-6">
      {renderStorageSettings()}
      {renderUploadSection()}
      {renderVideoLibrary()}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600">Active Projects</p>
                <p className="text-2xl font-bold text-blue-700">12</p>
              </div>
              <Video className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-50 to-green-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600">Video Agents</p>
                <p className="text-2xl font-bold text-green-700">{agents.length}</p>
              </div>
              <Brain className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-50 to-purple-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600">Platforms</p>
                <p className="text-2xl font-bold text-purple-700">8</p>
              </div>
              <Globe className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
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
          <VideoEditor settings={settings} />
        </TabsContent>

        <TabsContent value="logo-removal">
          <LogoRemovalTool settings={settings} />
        </TabsContent>

        <TabsContent value="fractals">
          <FractalEffects settings={settings} />
        </TabsContent>

        <TabsContent value="audio-reactive">
          <AudioReactiveEffects settings={settings} />
        </TabsContent>

        <TabsContent value="ai-processing">
          <AIProcessing settings={settings} />
        </TabsContent>

        <TabsContent value="social-publisher">
          <SocialMediaPublisher settings={settings} />
        </TabsContent>

        <TabsContent value="voice-commands">
          <VoiceCommandsVideo settings={settings} />
        </TabsContent>

        <TabsContent value="projects">
          <ProjectManager settings={settings} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
