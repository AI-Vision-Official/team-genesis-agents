
import { useState } from 'react';
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
  Waveform, 
  Volume2, 
  Play, 
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
  Sparkles
} from 'lucide-react';
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

export const AudioTools = ({ agents, settings }: AudioToolsProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isRecording, setIsRecording] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);

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
      icon: Waveform,
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

  const renderOverview = () => (
    <div className="space-y-6">
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
