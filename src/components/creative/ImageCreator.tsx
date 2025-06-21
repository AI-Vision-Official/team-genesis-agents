
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Image, Download, Share, RefreshCw, Palette, Zap, Layers, Brain, Wand2, Share2 } from 'lucide-react';
import { ImageEditor } from './image/ImageEditor';
import { AIImageProcessor } from './image/AIImageProcessor';
import { StyleTransfer } from './image/StyleTransfer';
import { SmartSelection } from './image/SmartSelection';
import { SocialMediaExport } from './image/SocialMediaExport';
import type { CreativeAgent, ImageRequest, AccessibilityOptions } from '@/types/creative';

interface ImageCreatorProps {
  agents: CreativeAgent[];
  settings: AccessibilityOptions;
}

export const ImageCreator = ({ agents, settings }: ImageCreatorProps) => {
  const [request, setRequest] = useState<Partial<ImageRequest>>({
    style: 'realistic',
    dimensions: '1:1',
    mood: 'bright',
    language: 'English'
  });
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('generator');

  const styles = [
    { value: 'realistic', label: 'Realistic' },
    { value: 'artistic', label: 'Artistic' },
    { value: 'cartoon', label: 'Cartoon' },
    { value: 'abstract', label: 'Abstract' },
    { value: 'minimal', label: 'Minimal' },
    { value: 'vintage', label: 'Vintage' }
  ];

  const dimensions = [
    { value: '1:1', label: 'Square (1:1)' },
    { value: '16:9', label: 'Landscape (16:9)' },
    { value: '9:16', label: 'Portrait (9:16)' },
    { value: '4:3', label: 'Traditional (4:3)' },
    { value: '3:4', label: 'Portrait (3:4)' }
  ];

  const moods = [
    { value: 'bright', label: 'Bright & Cheerful' },
    { value: 'dark', label: 'Dark & Moody' },
    { value: 'neutral', label: 'Neutral & Balanced' },
    { value: 'vibrant', label: 'Vibrant & Energetic' },
    { value: 'pastel', label: 'Soft & Pastel' }
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Simulate image generation
    setTimeout(() => {
      const mockImages = [
        '/placeholder.svg?height=400&width=400&text=Generated+Image+1',
        '/placeholder.svg?height=400&width=400&text=Generated+Image+2',
        '/placeholder.svg?height=400&width=400&text=Generated+Image+3',
        '/placeholder.svg?height=400&width=400&text=Generated+Image+4'
      ];
      setGeneratedImages(mockImages);
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            🎨 Advanced Image Toolkit
          </h2>
          <p className={`text-gray-600 mt-1 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            Comprehensive image creation, editing, and AI processing suite
          </p>
        </div>
        <Badge variant="outline">
          {agents.length} Visual Agents Active
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="generator" className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Generator
          </TabsTrigger>
          <TabsTrigger value="editor" className="flex items-center gap-2">
            <Layers className="w-4 h-4" />
            Editor
          </TabsTrigger>
          <TabsTrigger value="ai-processor" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            AI Tools
          </TabsTrigger>
          <TabsTrigger value="style-transfer" className="flex items-center gap-2">
            <Wand2 className="w-4 h-4" />
            Effects
          </TabsTrigger>
          <TabsTrigger value="selection" className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Selection
          </TabsTrigger>
          <TabsTrigger value="export" className="flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            Export
          </TabsTrigger>
        </TabsList>

        <TabsContent value="generator">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Image Configuration</CardTitle>
                <CardDescription>
                  Describe your vision and set style preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="prompt">Image Description</Label>
                  <Textarea
                    id="prompt"
                    placeholder="Describe the image you want to create in detail..."
                    value={request.prompt || ''}
                    onChange={(e) => setRequest(prev => ({ ...prev, prompt: e.target.value }))}
                    className={`min-h-32 ${settings.dyslexiaFont ? 'font-mono' : ''}`}
                  />
                </div>

                <div>
                  <Label htmlFor="style">Art Style</Label>
                  <Select value={request.style} onValueChange={(value) => setRequest(prev => ({ ...prev, style: value as any }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {styles.map((style) => (
                        <SelectItem key={style.value} value={style.value}>
                          {style.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="dimensions">Dimensions</Label>
                  <Select value={request.dimensions} onValueChange={(value) => setRequest(prev => ({ ...prev, dimensions: value as any }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {dimensions.map((dim) => (
                        <SelectItem key={dim.value} value={dim.value}>
                          {dim.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="mood">Mood & Atmosphere</Label>
                  <Select value={request.mood} onValueChange={(value) => setRequest(prev => ({ ...prev, mood: value as any }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {moods.map((mood) => (
                        <SelectItem key={mood.value} value={mood.value}>
                          {mood.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="colors">Color Scheme (optional)</Label>
                  <Input
                    id="colors"
                    placeholder="e.g., blue, gold, warm tones..."
                    onChange={(e) => setRequest(prev => ({ ...prev, colorScheme: e.target.value.split(',').map(c => c.trim()) }))}
                  />
                </div>

                <Button 
                  onClick={handleGenerate} 
                  disabled={isGenerating || !request.prompt}
                  className="w-full"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Generating Images...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Generate Images
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Generated Images</CardTitle>
                <CardDescription>
                  Your AI-generated images with download options
                </CardDescription>
              </CardHeader>
              <CardContent>
                {generatedImages.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4">
                    {generatedImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Generated image ${index + 1}`}
                          className="w-full h-48 object-cover rounded-lg border"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                          <Button size="sm" variant="secondary">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                          <Button size="sm" variant="secondary">
                            <Share className="w-4 h-4 mr-2" />
                            Share
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-96 text-gray-500">
                    <div className="text-center">
                      <Image className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Describe your image and click "Generate Images" to begin</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="editor">
          <ImageEditor settings={settings} />
        </TabsContent>

        <TabsContent value="ai-processor">
          <AIImageProcessor settings={settings} />
        </TabsContent>

        <TabsContent value="style-transfer">
          <StyleTransfer settings={settings} />
        </TabsContent>

        <TabsContent value="selection">
          <SmartSelection settings={settings} />
        </TabsContent>

        <TabsContent value="export">
          <SocialMediaExport settings={settings} />
        </TabsContent>
      </Tabs>

      {/* Image Gallery */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Creations</CardTitle>
          <CardDescription>Your image generation and editing history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} className="relative group cursor-pointer">
                <img
                  src={`/placeholder.svg?height=150&width=150&text=Image+${i + 1}`}
                  alt={`Recent image ${i + 1}`}
                  className="w-full h-24 object-cover rounded-lg border hover:shadow-md transition-shadow"
                />
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Badge variant="secondary" className="text-xs">
                    {['realistic', 'artistic', 'minimal'][i % 3]}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
