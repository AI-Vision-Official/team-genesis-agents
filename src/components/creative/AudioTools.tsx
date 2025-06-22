import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Music, 
  Mic, 
  Headphones, 
  Settings, 
  Activity, 
  Volume2, 
  Play, 
  Pause,
  Square, 
  Download,
  Upload,
  Zap,
  Brain,
  Heart,
  Shield,
  Globe,
  Sliders,
  FileAudio,
  MessageSquare,
  Sparkles,
  Trash2,
  BarChart3
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { VoiceCloning } from './audio/VoiceCloning';
import { NoiseReduction } from './audio/NoiseReduction';
import { TextToSpeech } from './audio/TextToSpeech';
import { AudioEnhancement } from './audio/AudioEnhancement';
import { VSTPluginBuilder } from './audio/VSTPluginBuilder';
import { AudioStreaming } from './audio/AudioStreaming';
import { VoiceCommands } from './audio/VoiceCommands';
import { EmotionAnalysis } from './audio/EmotionAnalysis';
import type { CreativeAgent, AccessibilityOptions } from '@/types/creative';

interface AudioToolsProps {
  agents: CreativeAgent[];
  settings: AccessibilityOptions;
}

interface UploadedAudio {
  id: string;
  file: File;
  url: string;
  name: string;
  size: number;
  duration?: number;
  uploaded: boolean;
}

export const AudioTools = ({ agents, settings }: AudioToolsProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isRecording, setIsRecording] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [uploadedAudios, setUploadedAudios] = useState<UploadedAudio[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<{ [key: string]: boolean }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});

  const handleFileUpload = async (files: FileList) => {
    const audioFiles = Array.from(files).filter(file => 
      file.type.startsWith('audio/') || 
      ['.mp3', '.wav', '.ogg', '.m4a', '.flac'].some(ext => file.name.toLowerCase().endsWith(ext))
    );

    if (audioFiles.length === 0) {
      toast.error('Please upload valid audio files (.mp3, .wav, .ogg)');
      return;
    }

    setIsUploading(true);

    for (const file of audioFiles) {
      try {
        const audioId = `audio-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const fileName = `audio/${audioId}-${file.name}`;
        
        // Upload to Supabase Storage
        const { data, error } = await supabase.storage
          .from('media-files')
          .upload(fileName, file);

        if (error) throw error;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('media-files')
          .getPublicUrl(fileName);

        const newAudio: UploadedAudio = {
          id: audioId,
          file,
          url: publicUrl,
          name: file.name,
          size: file.size,
          uploaded: true
        };

        setUploadedAudios(prev => [...prev, newAudio]);
        toast.success(`Audio uploaded: ${file.name}`);
      } catch (error) {
        console.error('Upload error:', error);
        toast.error(`Failed to upload ${file.name}`);
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

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const deleteAudio = async (audioId: string) => {
    const audio = uploadedAudios.find(a => a.id === audioId);
    if (audio) {
      try {
        // Delete from Supabase Storage
        const fileName = `audio/${audioId}-${audio.name}`;
        await supabase.storage.from('media-files').remove([fileName]);
        
        setUploadedAudios(prev => prev.filter(a => a.id !== audioId));
        toast.success('Audio deleted');
      } catch (error) {
        console.error('Delete error:', error);
        toast.error('Failed to delete audio');
      }
    }
  };

  const togglePlayback = (audioId: string) => {
    const audioElement = audioRefs.current[audioId];
    if (!audioElement) return;

    if (isPlaying[audioId]) {
      audioElement.pause();
      setIsPlaying(prev => ({ ...prev, [audioId]: false }));
    } else {
      // Pause all other audio
      Object.keys(isPlaying).forEach(id => {
        if (id !== audioId && isPlaying[id]) {
          audioRefs.current[id]?.pause();
          setIsPlaying(prev => ({ ...prev, [id]: false }));
        }
      });
      
      audioElement.play();
      setIsPlaying(prev => ({ ...prev, [audioId]: true }));
    }
  };

  const startProcessing = (audioId: string) => {
    setActiveTab('voice-cloning');
    toast.info('Opening audio processor...');
  };

  const audioModules = [
    {
      id: 'voice-cloning',
      title: 'Voice Cloning',
      description: 'AI-powered voice synthesis and cloning',
      icon: Mic,
      color: 'bg-blue-500',
      status: 'active',
      agents: 2
    },
    {
      id: 'noise-reduction',
      title: 'Noise Reduction',
      description: 'Real-time adaptive noise gate and cleaning',
      icon: Volume2,
      color: 'bg-green-500',
      status: 'active',
      agents: 1
    },
    {
      id: 'tts',
      title: 'Text-to-Speech',
      description: 'Emotional TTS with multilingual support',
      icon: MessageSquare,
      color: 'bg-purple-500',
      status: 'active',
      agents: 3
    },
    {
      id: 'enhancement',
      title: 'Audio Enhancement',
      description: 'AI-assisted mastering and EQ',
      icon: Sliders,
      color: 'bg-orange-500',
      status: 'active',
      agents: 2
    },
    {
      id: 'vst-builder',
      title: 'VST Plugin Builder',
      description: 'JUCE-based VST/VST3 plugin creation',
      icon: Settings,
      color: 'bg-red-500',
      status: 'beta',
      agents: 1
    },
    {
      id: 'streaming',
      title: 'Audio Streaming',
      description: 'Real-time audio processing pipeline',
      icon: Activity,
      color: 'bg-cyan-500',
      status: 'active',
      agents: 2
    },
    {
      id: 'voice-commands',
      title: 'Voice Commands',
      description: 'Voice-to-command bridge system',
      icon: Brain,
      color: 'bg-indigo-500',
      status: 'active',
      agents: 1
    },
    {
      id: 'emotion-analysis',
      title: 'Emotion Analysis',
      description: 'Emotional tone detection and tagging',
      icon: Heart,
      color: 'bg-pink-500',
      status: 'active',
      agents: 2
    }
  ];

  const renderUploadSection = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="w-5 h-5" />
          Audio Upload
        </CardTitle>
        <CardDescription>
          Upload your audio files (.mp3, .wav, .ogg) to start processing
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
          <p className="text-lg mb-2">Drag & drop audio files here</p>
          <p className="text-gray-500 mb-4">or click to browse files</p>
          <Button>
            <Upload className="w-4 h-4 mr-2" />
            Choose Audio Files
          </Button>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="audio/*,.mp3,.wav,.ogg,.m4a"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
        />

        {isUploading && (
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <span>Uploading audio files...</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderAudioLibrary = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileAudio className="w-5 h-5" />
          Audio Library ({uploadedAudios.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {uploadedAudios.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <FileAudio className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No audio files uploaded yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {uploadedAudios.map((audio) => (
              <Card key={audio.id} className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <Music className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{audio.name}</h4>
                    <p className="text-sm text-gray-500">
                      {formatFileSize(audio.size)}
                      {audio.duration && ` • ${formatDuration(audio.duration)}`}
                    </p>
                    
                    {/* Waveform visualization placeholder */}
                    <div className="mt-2 h-8 bg-gray-100 rounded flex items-center px-2">
                      <div className="flex items-end gap-1 h-4">
                        {Array.from({ length: 20 }).map((_, i) => (
                          <div
                            key={i}
                            className="bg-blue-400 rounded-sm"
                            style={{
                              width: '2px',
                              height: `${Math.random() * 100}%`,
                              minHeight: '2px'
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => togglePlayback(audio.id)}
                    >
                      {isPlaying[audio.id] ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </Button>
                    
                    <Button
                      size="sm"
                      onClick={() => startProcessing(audio.id)}
                    >
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Process
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteAudio(audio.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                {/* Hidden audio element for playback */}
                <audio
                  ref={(el) => {
                    if (el) audioRefs.current[audio.id] = el;
                  }}
                  src={audio.url}
                  onEnded={() => setIsPlaying(prev => ({ ...prev, [audio.id]: false }))}
                  onLoadedMetadata={(e) => {
                    const target = e.target as HTMLAudioElement;
                    setUploadedAudios(prev => 
                      prev.map(a => 
                        a.id === audio.id 
                          ? { ...a, duration: target.duration }
                          : a
                      )
                    );
                  }}
                />
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderOverview = () => (
    <div className="space-y-6">
      {renderUploadSection()}
      {renderAudioLibrary()}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600">Active Modules</p>
                <p className="text-2xl font-bold text-blue-700">
                  {audioModules.filter(m => m.status === 'active').length}
                </p>
              </div>
              <Zap className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-50 to-green-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600">Audio Agents</p>
                <p className="text-2xl font-bold text-green-700">
                  {audioModules.reduce((acc, m) => acc + m.agents, 0)}
                </p>
              </div>
              <Brain className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-50 to-purple-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600">Languages</p>
                <p className="text-2xl font-bold text-purple-700">47</p>
              </div>
              <Globe className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {audioModules.map((module) => (
          <Card 
            key={module.id}
            className="cursor-pointer hover:shadow-lg transition-all duration-200 border-l-4"
            style={{ borderLeftColor: module.color.replace('bg-', '').replace('-500', '') }}
            onClick={() => setActiveTab(module.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg ${module.color} text-white`}>
                  <module.icon className="w-5 h-5" />
                </div>
                <div className="flex gap-1">
                  <Badge 
                    variant={module.status === 'active' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {module.status}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {module.agents} agents
                  </Badge>
                </div>
              </div>
              <CardTitle className={`text-base ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                {module.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className={settings.dyslexiaFont ? 'font-mono' : ''}>
                {module.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Headphones className="w-5 h-5" />
            Quick Audio Control
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setIsRecording(!isRecording)}
              className={isRecording ? 'bg-red-500 hover:bg-red-600' : ''}
            >
              {isRecording ? <Square className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {isRecording ? 'Stop Recording' : 'Start Recording'}
            </Button>
            <div className="flex-1">
              <div className="flex items-center justify-between text-sm mb-1">
                <span>Audio Level</span>
                <span>{audioLevel}%</span>
              </div>
              <Progress value={audioLevel} className="h-2" />
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Import Audio
            </Button>
            <Button size="sm" variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Project
            </Button>
            <Button size="sm" variant="outline">
              <FileAudio className="w-4 h-4 mr-2" />
              Load Preset
            </Button>
            <Button size="sm" variant="outline">
              <Sparkles className="w-4 h-4 mr-2" />
              AI Enhance
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            🎵 Professional Audio Toolkit
          </h2>
          <p className={`text-gray-600 mt-1 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            Modular AI-powered audio tools for creators and humanitarians
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
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-9">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="voice-cloning">Voice</TabsTrigger>
          <TabsTrigger value="noise-reduction">Noise</TabsTrigger>
          <TabsTrigger value="tts">TTS</TabsTrigger>
          <TabsTrigger value="enhancement">Enhance</TabsTrigger>
          <TabsTrigger value="vst-builder">VST</TabsTrigger>
          <TabsTrigger value="streaming">Stream</TabsTrigger>
          <TabsTrigger value="voice-commands">Commands</TabsTrigger>
          <TabsTrigger value="emotion-analysis">Emotion</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {renderOverview()}
        </TabsContent>

        <TabsContent value="voice-cloning">
          <VoiceCloning settings={settings} />
        </TabsContent>

        <TabsContent value="noise-reduction">
          <NoiseReduction settings={settings} />
        </TabsContent>

        <TabsContent value="tts">
          <TextToSpeech settings={settings} />
        </TabsContent>

        <TabsContent value="enhancement">
          <AudioEnhancement settings={settings} />
        </TabsContent>

        <TabsContent value="vst-builder">
          <VSTPluginBuilder settings={settings} />
        </TabsContent>

        <TabsContent value="streaming">
          <AudioStreaming settings={settings} />
        </TabsContent>

        <TabsContent value="voice-commands">
          <VoiceCommands settings={settings} />
        </TabsContent>

        <TabsContent value="emotion-analysis">
          <EmotionAnalysis settings={settings} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
