
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Palette, 
  FileText, 
  Image, 
  Video, 
  Lightbulb, 
  Template,
  Shirt,
  Music,
  Search,
  Zap,
  Eye,
  Settings
} from 'lucide-react';
import { ContentGenerator } from './ContentGenerator';
import { ImageCreator } from './ImageCreator';
import { VideoCreator } from './VideoCreator';
import { TemplateManager } from './TemplateManager';
import { ProductDesigner } from './ProductDesigner';
import { ColorPaletteGenerator } from './ColorPaletteGenerator';
import { FractalCreator } from './FractalCreator';
import { IdeaBoard } from './IdeaBoard';
import { AudioTools } from './AudioTools';
import { ResearchAssistant } from './ResearchAssistant';
import { AccessibilityControls } from './AccessibilityControls';
import type { CreativeAgent, AccessibilityOptions } from '@/types/creative';

interface CreativeCenterProps {
  agents: CreativeAgent[];
}

export const CreativeCenter = ({ agents }: CreativeCenterProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [accessibilitySettings, setAccessibilitySettings] = useState<AccessibilityOptions>({
    dyslexiaFont: false,
    highContrast: false,
    colorBlindMode: 'none',
    quietMode: false,
    minimalistUI: false,
    readingLevel: 'standard',
    fontSize: 'medium'
  });

  const creativeTools = [
    {
      id: 'content',
      title: 'Content Generator',
      description: 'Articles, poetry, scripts, books & social content',
      icon: FileText,
      color: 'bg-blue-500',
      projects: 24
    },
    {
      id: 'images',
      title: 'Image Creator',
      description: 'AI-powered image generation with instant previews',
      icon: Image,
      color: 'bg-green-500',
      projects: 18
    },
    {
      id: 'videos',
      title: 'Video Creator',
      description: 'Short videos, social clips & templates',
      icon: Video,
      color: 'bg-purple-500',
      projects: 12
    },
    {
      id: 'templates',
      title: 'Template Manager',
      description: 'Documents, presentations & social templates',
      icon: Template,
      color: 'bg-orange-500',
      projects: 31
    },
    {
      id: 'products',
      title: 'Product Designer',
      description: 'Logos, t-shirts, business cards & book covers',
      icon: Shirt,
      color: 'bg-pink-500',
      projects: 15
    },
    {
      id: 'colors',
      title: 'Color Palettes',
      description: 'Accessible color schemes & contrast checks',
      icon: Palette,
      color: 'bg-indigo-500',
      projects: 8
    },
    {
      id: 'fractals',
      title: 'Fractal Creator',
      description: 'Mandelbrot & visual inspiration designs',
      icon: Zap,
      color: 'bg-cyan-500',
      projects: 6
    },
    {
      id: 'ideas',
      title: 'Idea Board',
      description: 'Brainstorming & mind mapping tools',
      icon: Lightbulb,
      color: 'bg-yellow-500',
      projects: 19
    },
    {
      id: 'audio',
      title: 'Audio Tools',
      description: 'Music, jingles & text-to-speech',
      icon: Music,
      color: 'bg-red-500',
      projects: 9
    },
    {
      id: 'research',
      title: 'Research Assistant',
      description: 'AI-powered research & insights',
      icon: Search,
      color: 'bg-teal-500',
      projects: 14
    }
  ];

  const getAgentsBySpecialization = (spec: string) => {
    return agents.filter(agent => agent.specialization === spec);
  };

  const renderToolGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {creativeTools.map((tool) => (
        <Card 
          key={tool.id} 
          className={`cursor-pointer transition-all hover:shadow-lg border-l-4 ${
            accessibilitySettings.minimalistUI ? 'shadow-none border-gray-200' : ''
          }`}
          style={{
            borderLeftColor: tool.color.replace('bg-', '').replace('-500', ''),
          }}
          onClick={() => setActiveTab(tool.id)}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className={`p-2 rounded-lg ${tool.color} text-white`}>
                <tool.icon className="w-5 h-5" />
              </div>
              <Badge variant="secondary" className="text-xs">
                {tool.projects} projects
              </Badge>
            </div>
            <CardTitle className={`text-base ${accessibilitySettings.dyslexiaFont ? 'font-mono' : ''}`}>
              {tool.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className={accessibilitySettings.dyslexiaFont ? 'font-mono' : ''}>
              {tool.description}
            </CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold ${accessibilitySettings.dyslexiaFont ? 'font-mono' : ''}`}>
            🎨 Creative Center
          </h2>
          <p className={`text-gray-600 mt-1 ${accessibilitySettings.dyslexiaFont ? 'font-mono' : ''}`}>
            Comprehensive creative tools for content, visuals, and templates
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Preferences
          </Button>
          <AccessibilityControls 
            settings={accessibilitySettings}
            onUpdate={setAccessibilitySettings}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600">Active Projects</p>
                <p className="text-2xl font-bold text-blue-700">156</p>
              </div>
              <Zap className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-50 to-green-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600">Creative Agents</p>
                <p className="text-2xl font-bold text-green-700">{agents.length}</p>
              </div>
              <Eye className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-50 to-purple-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600">Languages</p>
                <p className="text-2xl font-bold text-purple-700">12</p>
              </div>
              <Palette className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {renderToolGrid()}
    </div>
  );

  return (
    <div className={`space-y-6 ${accessibilitySettings.minimalistUI ? 'max-w-4xl mx-auto' : ''}`}>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6 lg:grid-cols-11">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="fractals">Fractals</TabsTrigger>
          <TabsTrigger value="ideas">Ideas</TabsTrigger>
          <TabsTrigger value="audio">Audio</TabsTrigger>
          <TabsTrigger value="research">Research</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {renderOverview()}
        </TabsContent>

        <TabsContent value="content">
          <ContentGenerator 
            agents={getAgentsBySpecialization('content_writer')}
            settings={accessibilitySettings}
          />
        </TabsContent>

        <TabsContent value="images">
          <ImageCreator 
            agents={getAgentsBySpecialization('visual_designer')}
            settings={accessibilitySettings}
          />
        </TabsContent>

        <TabsContent value="videos">
          <VideoCreator 
            agents={getAgentsBySpecialization('video_creator')}
            settings={accessibilitySettings}
          />
        </TabsContent>

        <TabsContent value="templates">
          <TemplateManager 
            agents={getAgentsBySpecialization('template_designer')}
            settings={accessibilitySettings}
          />
        </TabsContent>

        <TabsContent value="products">
          <ProductDesigner 
            agents={getAgentsBySpecialization('product_designer')}
            settings={accessibilitySettings}
          />
        </TabsContent>

        <TabsContent value="colors">
          <ColorPaletteGenerator 
            settings={accessibilitySettings}
          />
        </TabsContent>

        <TabsContent value="fractals">
          <FractalCreator 
            settings={accessibilitySettings}
          />
        </TabsContent>

        <TabsContent value="ideas">
          <IdeaBoard 
            settings={accessibilitySettings}
          />
        </TabsContent>

        <TabsContent value="audio">
          <AudioTools 
            agents={getAgentsBySpecialization('audio_specialist')}
            settings={accessibilitySettings}
          />
        </TabsContent>

        <TabsContent value="research">
          <ResearchAssistant 
            agents={getAgentsBySpecialization('research_assistant')}
            settings={accessibilitySettings}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
