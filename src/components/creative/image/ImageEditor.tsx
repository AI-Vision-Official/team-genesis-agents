
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Layers, 
  Upload, 
  Download, 
  RotateCcw, 
  RotateCw,
  Crop,
  Move,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Copy,
  Settings
} from 'lucide-react';
import type { AccessibilityOptions } from '@/types/creative';

interface Layer {
  id: string;
  name: string;
  type: 'image' | 'vector' | 'text' | 'adjustment';
  visible: boolean;
  opacity: number;
  blendMode: string;
  locked: boolean;
  thumbnail?: string;
}

interface ImageEditorProps {
  settings: AccessibilityOptions;
}

export const ImageEditor = ({ settings }: ImageEditorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [layers, setLayers] = useState<Layer[]>([
    { id: '1', name: 'Background', type: 'image', visible: true, opacity: 100, blendMode: 'normal', locked: false }
  ]);
  const [selectedLayer, setSelectedLayer] = useState('1');
  const [tool, setTool] = useState('move');
  const [zoom, setZoom] = useState(100);

  const blendModes = [
    'normal', 'multiply', 'screen', 'overlay', 'soft-light', 
    'hard-light', 'color-dodge', 'color-burn', 'darken', 'lighten'
  ];

  const tools = [
    { id: 'move', name: 'Move', icon: Move },
    { id: 'crop', name: 'Crop', icon: Crop },
    { id: 'rotate-left', name: 'Rotate Left', icon: RotateCcw },
    { id: 'rotate-right', name: 'Rotate Right', icon: RotateCw }
  ];

  const handleLayerVisibility = (layerId: string) => {
    setLayers(prev => prev.map(layer => 
      layer.id === layerId ? { ...layer, visible: !layer.visible } : layer
    ));
  };

  const handleLayerOpacity = (layerId: string, opacity: number) => {
    setLayers(prev => prev.map(layer => 
      layer.id === layerId ? { ...layer, opacity } : layer
    ));
  };

  const addLayer = () => {
    const newLayer: Layer = {
      id: Date.now().toString(),
      name: `Layer ${layers.length + 1}`,
      type: 'image',
      visible: true,
      opacity: 100,
      blendMode: 'normal',
      locked: false
    };
    setLayers(prev => [...prev, newLayer]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className={`text-xl font-bold ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            Advanced Image Editor
          </h3>
          <p className={`text-gray-600 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            Layer-based editing with AI-powered tools
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline">OpenCV</Badge>
          <Badge variant="outline">ImageMagick</Badge>
          <Badge variant="outline">Layers</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Tools Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Tools
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {tools.map((t) => (
                <Button
                  key={t.id}
                  size="sm"
                  variant={tool === t.id ? "default" : "outline"}
                  onClick={() => setTool(t.id)}
                >
                  <t.icon className="w-4 h-4" />
                </Button>
              ))}
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Zoom</label>
              <Slider
                value={[zoom]}
                onValueChange={(value) => setZoom(value[0])}
                max={500}
                min={10}
                step={10}
              />
              <div className="text-sm text-gray-500">{zoom}%</div>
            </div>

            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Import
              </Button>
              <Button size="sm" variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Canvas Area */}
        <Card className="lg:col-span-2">
          <CardContent className="p-0">
            <div className="aspect-square bg-gray-100 flex items-center justify-center relative overflow-hidden">
              <canvas
                ref={canvasRef}
                className="max-w-full max-h-full border"
                style={{ transform: `scale(${zoom / 100})` }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <Upload className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Drop image here or click to upload</p>
                  <p className="text-sm">JPEG, PNG, TIFF, SVG, GIF supported</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Layers Panel */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Layers className="w-5 h-5" />
                Layers
              </CardTitle>
              <Button size="sm" onClick={addLayer}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {layers.slice().reverse().map((layer) => (
              <div
                key={layer.id}
                className={`p-3 rounded border cursor-pointer ${
                  selectedLayer === layer.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
                onClick={() => setSelectedLayer(layer.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">{layer.name}</span>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLayerVisibility(layer.id);
                      }}
                    >
                      {layer.visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Copy className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div>
                    <label className="text-xs text-gray-500">Opacity</label>
                    <Slider
                      value={[layer.opacity]}
                      onValueChange={(value) => handleLayerOpacity(layer.id, value[0])}
                      max={100}
                      min={0}
                    />
                  </div>
                  
                  <Select value={layer.blendMode}>
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {blendModes.map((mode) => (
                        <SelectItem key={mode} value={mode}>
                          {mode}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
