
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Target, 
  Upload, 
  Wand2, 
  Eye, 
  Download,
  Settings,
  Zap,
  Image,
  RefreshCw
} from 'lucide-react';
import type { AccessibilityOptions } from '@/types/creative';

interface LogoRemovalToolProps {
  settings: AccessibilityOptions;
}

export const LogoRemovalTool = ({ settings }: LogoRemovalToolProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const detectedLogos = [
    { id: '1', name: 'Suno Logo', confidence: 95, position: { x: 10, y: 10, w: 120, h: 40 }, frames: '0-1800' },
    { id: '2', name: 'Watermark', confidence: 87, position: { x: 800, y: 500, w: 200, h: 60 }, frames: '500-1200' }
  ];

  const startProcessing = () => {
    setIsProcessing(true);
    setProgress(0);
    
    // Simulate processing
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className={`text-xl font-bold ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            AI Logo Removal & Replacement
          </h3>
          <p className={`text-gray-600 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            Motion-tracked logo detection and intelligent inpainting
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline">OpenCV</Badge>
          <Badge variant="outline">YOLO</Badge>
          <Badge variant="outline">Inpainting</Badge>
        </div>
      </div>

      {/* Video Preview with Logo Detection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Logo Detection Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center relative">
            <div className="text-white text-center">
              <Target className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">Video with Detected Logos</p>
              <p className="text-sm opacity-75">AI analyzing frame by frame</p>
            </div>
            
            {/* Simulated logo detection boxes */}
            <div className="absolute top-4 left-4 w-32 h-10 border-2 border-red-500 bg-red-500/20">
              <div className="bg-red-500 text-white text-xs px-2 py-1 absolute -top-6">
                Suno Logo (95%)
              </div>
            </div>
            <div className="absolute bottom-20 right-20 w-48 h-16 border-2 border-yellow-500 bg-yellow-500/20">
              <div className="bg-yellow-500 text-black text-xs px-2 py-1 absolute -top-6">
                Watermark (87%)
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detected Logos List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Detected Logos & Watermarks
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {detectedLogos.map((logo) => (
            <div 
              key={logo.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedRegion === logo.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}
              onClick={() => setSelectedRegion(logo.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-red-500" />
                  <span className="font-medium">{logo.name}</span>
                  <Badge variant="outline">{logo.confidence}% confidence</Badge>
                </div>
                <div className="text-sm text-gray-500">
                  Frames {logo.frames}
                </div>
              </div>
              <div className="text-sm text-gray-600">
                Position: {logo.position.x}x{logo.position.y} 
                • Size: {logo.position.w}×{logo.position.h}px
              </div>
              <div className="flex gap-2 mt-2">
                <Button size="sm" variant="outline">
                  <Wand2 className="w-4 h-4 mr-2" />
                  Remove
                </Button>
                <Button size="sm" variant="outline">
                  <Image className="w-4 h-4 mr-2" />
                  Replace
                </Button>
                <Button size="sm" variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Adjust
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Processing Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wand2 className="w-5 h-5" />
              Removal Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Inpainting Method</label>
              <select className="w-full mt-1 p-2 border rounded-md">
                <option>Fast Inpainting (OpenCV)</option>
                <option>AI Inpainting (Deep Learning)</option>
                <option>Content-Aware Fill</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Tracking Precision</label>
              <select className="w-full mt-1 p-2 border rounded-md">
                <option>High (Slower)</option>
                <option>Medium (Balanced)</option>
                <option>Fast (Lower Quality)</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Feather Edge</label>
              <input 
                type="range" 
                min="0" 
                max="20" 
                defaultValue="5" 
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Image className="w-5 h-5" />
              Logo Replacement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full">
              <Upload className="w-4 h-4 mr-2" />
              Upload New Logo
            </Button>
            <div>
              <label className="text-sm font-medium">Blend Mode</label>
              <select className="w-full mt-1 p-2 border rounded-md">
                <option>Normal</option>
                <option>Multiply</option>
                <option>Screen</option>
                <option>Overlay</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Opacity</label>
              <input 
                type="range" 
                min="0" 
                max="100" 
                defaultValue="85" 
                className="w-full"
              />
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="flex-1">
                <RefreshCw className="w-4 h-4 mr-2" />
                Auto-Scale
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                <Zap className="w-4 h-4 mr-2" />
                Match Color
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Processing Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Processing Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isProcessing && (
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span>Processing video frames...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
          
          <div className="flex gap-2">
            <Button 
              onClick={startProcessing}
              disabled={isProcessing}
              className="flex-1"
            >
              <Wand2 className="w-4 h-4 mr-2" />
              {isProcessing ? 'Processing...' : 'Start Logo Removal'}
            </Button>
            <Button variant="outline">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
