
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { 
  Brain, 
  Wand2, 
  Eraser, 
  Palette, 
  Eye, 
  Scissors, 
  Upload,
  Download,
  Settings,
  RefreshCw
} from 'lucide-react';
import type { AccessibilityOptions } from '@/types/creative';

interface AIImageProcessorProps {
  settings: AccessibilityOptions;
}

export const AIImageProcessor = ({ settings }: AIImageProcessorProps) => {
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeTask, setActiveTask] = useState<string | null>(null);

  const aiTools = [
    {
      id: 'object-removal',
      name: 'Object Removal',
      description: 'AI-powered inpainting to remove unwanted objects',
      icon: Eraser,
      color: 'bg-red-500'
    },
    {
      id: 'background-removal',
      name: 'Background Removal',
      description: 'Smart background detection and removal',
      icon: Scissors,
      color: 'bg-blue-500'
    },
    {
      id: 'style-transfer',
      name: 'Style Transfer',
      description: 'Apply artistic styles to your images',
      icon: Palette,
      color: 'bg-purple-500'
    },
    {
      id: 'upscaling',
      name: 'AI Upscaling',
      description: 'Enhance resolution with AI super-resolution',
      icon: Eye,
      color: 'bg-green-500'
    },
    {
      id: 'face-enhancement',
      name: 'Face Enhancement',
      description: 'Facial recognition and retouching',
      icon: Wand2,
      color: 'bg-orange-500'
    },
    {
      id: 'image-generation',
      name: 'Image Generation',
      description: 'Create new images from text prompts',
      icon: Brain,
      color: 'bg-indigo-500'
    }
  ];

  const handleProcessing = async (toolId: string) => {
    setActiveTask(toolId);
    setProcessing(true);
    setProgress(0);

    // Simulate AI processing
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setProcessing(false);
          setActiveTask(null);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className={`text-xl font-bold ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            AI Image Processing
          </h3>
          <p className={`text-gray-600 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            Advanced AI-powered image enhancement and generation
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline">Stable Diffusion</Badge>
          <Badge variant="outline">ESRGAN</Badge>
          <Badge variant="outline">OpenCV</Badge>
        </div>
      </div>

      {/* AI Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {aiTools.map((tool) => (
          <Card key={tool.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${tool.color} text-white`}>
                  <tool.icon className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle className="text-base">{tool.name}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                {tool.description}
              </CardDescription>
              <Button 
                size="sm" 
                className="w-full"
                onClick={() => handleProcessing(tool.id)}
                disabled={processing}
              >
                {activeTask === tool.id && processing ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <tool.icon className="w-4 h-4 mr-2" />
                    Apply
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Processing Status */}
      {processing && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <RefreshCw className="w-6 h-6 animate-spin text-blue-500" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Processing image...</span>
                  <span className="text-sm text-gray-500">{progress}%</span>
                </div>
                <Progress value={progress} className="w-full" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Generation Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            AI Image Generation
          </CardTitle>
          <CardDescription>
            Generate new images from text descriptions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Describe the image you want to create... (e.g., 'A serene mountain landscape at sunset with a crystal clear lake')"
            className={`min-h-24 ${settings.dyslexiaFont ? 'font-mono' : ''}`}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Style</label>
              <select className="w-full mt-1 p-2 border rounded-md">
                <option>Photorealistic</option>
                <option>Artistic</option>
                <option>Digital Art</option>
                <option>Oil Painting</option>
                <option>Watercolor</option>
                <option>Sketch</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Quality</label>
              <select className="w-full mt-1 p-2 border rounded-md">
                <option>Standard</option>
                <option>High</option>
                <option>Ultra</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button className="flex-1">
              <Brain className="w-4 h-4 mr-2" />
              Generate Image
            </Button>
            <Button variant="outline">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Batch Processing */}
      <Card>
        <CardHeader>
          <CardTitle>Batch Processing</CardTitle>
          <CardDescription>
            Apply AI effects to multiple images at once
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
            <Upload className="w-8 h-8 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600">Drop multiple images here for batch processing</p>
            <p className="text-sm text-gray-500 mt-2">Supports JPEG, PNG, TIFF, GIF formats</p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1">
              <Upload className="w-4 h-4 mr-2" />
              Select Files
            </Button>
            <Button variant="outline" className="flex-1">
              <Settings className="w-4 h-4 mr-2" />
              Batch Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
