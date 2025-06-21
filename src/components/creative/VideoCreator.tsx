
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Video, 
  Upload, 
  Play, 
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
  RotateCcw
} from 'lucide-react';
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

export const VideoCreator = ({ agents, settings }: VideoCreatorProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isProcessing, setIsProcessing] = useState(false);
  const [renderProgress, setRenderProgress] = useState(0);

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
      title: 'Fractal Effects',
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

  const renderOverview = () => (
    <div className="space-y-6">
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
                <p className="text-2xl font-bold text-green-700">
                  {videoModules.reduce((acc, m) => acc + m.agents, 0)}
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
                <p className="text-sm text-purple-600">Platforms</p>
                <p className="text-2xl font-bold text-purple-700">8</p>
              </div>
              <Globe className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {videoModules.map((module) => (
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
            <Video className="w-5 h-5" />
            Quick Video Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setIsProcessing(!isProcessing)}
              className={isProcessing ? 'bg-red-500 hover:bg-red-600' : ''}
            >
              {isProcessing ? <Square className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {isProcessing ? 'Stop Render' : 'Start Render'}
            </Button>
            <div className="flex-1">
              <div className="flex items-center justify-between text-sm mb-1">
                <span>Render Progress</span>
                <span>{renderProgress}%</span>
              </div>
              <Progress value={renderProgress} className="h-2" />
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Import Media
            </Button>
            <Button size="sm" variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Video
            </Button>
            <Button size="sm" variant="outline">
              <Layers className="w-4 h-4 mr-2" />
              Timeline
            </Button>
            <Button size="sm" variant="outline">
              <Wand2 className="w-4 h-4 mr-2" />
              AI Enhance
            </Button>
            <Button size="sm" variant="outline">
              <Share2 className="w-4 h-4 mr-2" />
              Publish
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
