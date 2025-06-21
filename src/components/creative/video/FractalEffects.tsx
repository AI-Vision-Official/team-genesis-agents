
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { 
  Zap, 
  Play, 
  Settings, 
  Palette, 
  RotateCcw,
  Download,
  RefreshCw,
  Maximize
} from 'lucide-react';
import type { AccessibilityOptions } from '@/types/creative';

interface FractalEffectsProps {
  settings: AccessibilityOptions;
}

export const FractalEffects = ({ settings }: FractalEffectsProps) => {
  const [selectedFractal, setSelectedFractal] = useState('mandelbrot');
  const [isAnimating, setIsAnimating] = useState(false);
  const [zoomLevel, setZoomLevel] = useState([1]);
  const [iterations, setIterations] = useState([100]);

  const fractalTypes = [
    { id: 'mandelbrot', name: 'Mandelbrot Set', description: 'Classic fractal with infinite detail' },
    { id: 'julia', name: 'Julia Set', description: 'Smooth, flowing patterns' },
    { id: 'burning-ship', name: 'Burning Ship', description: 'Ship-like structures' },
    { id: 'tricorn', name: 'Tricorn', description: 'Three-pointed symmetry' }
  ];

  const colorSchemes = [
    { id: 'sunset', name: 'Sunset', colors: ['#FF6B35', '#F7931E', '#FFD23F'] },
    { id: 'ocean', name: 'Ocean Depths', colors: ['#0077BE', '#00A8CC', '#7FDBFF'] },
    { id: 'galaxy', name: 'Galaxy', colors: ['#2C1810', '#8B4513', '#FFD700'] },
    { id: 'neon', name: 'Neon Dreams', colors: ['#FF1493', '#00FFFF', '#ADFF2F'] }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className={`text-xl font-bold ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            Fractal Video Effects
          </h3>
          <p className={`text-gray-600 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            Mathematical beauty with stable zoom transitions
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline">WebGL</Badge>
          <Badge variant="outline">GPU Accelerated</Badge>
          <Badge variant="outline">4K Ready</Badge>
        </div>
      </div>

      {/* Fractal Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Fractal Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-video bg-gradient-to-br from-purple-900 via-blue-900 to-black rounded-lg flex items-center justify-center relative overflow-hidden">
            {/* Simulated fractal pattern */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-purple-500/20 to-blue-900/40" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-400/30 via-red-500/20 to-transparent animate-pulse" />
            
            <div className="text-white text-center z-10">
              <Zap className="w-16 h-16 mx-auto mb-4 opacity-75" />
              <p className="text-lg font-semibold">Mandelbrot Set</p>
              <p className="text-sm opacity-75">Zoom: {zoomLevel[0]}x • Iterations: {iterations[0]}</p>
            </div>
            
            {/* Animation controls overlay */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center gap-4 bg-black/50 rounded-lg px-4 py-2">
                <Button
                  size="sm"
                  onClick={() => setIsAnimating(!isAnimating)}
                  className="bg-white/20 hover:bg-white/30"
                >
                  {isAnimating ? <RotateCcw className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
                <span className="text-white text-sm">
                  {isAnimating ? 'Animating...' : 'Static Preview'}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fractal Type Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Fractal Type
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {fractalTypes.map((fractal) => (
              <div
                key={fractal.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedFractal === fractal.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
                onClick={() => setSelectedFractal(fractal.id)}
              >
                <h4 className="font-medium">{fractal.name}</h4>
                <p className="text-sm text-gray-600">{fractal.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Fractal Parameters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Maximize className="w-5 h-5" />
              Zoom & Navigation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Zoom Level</label>
              <Slider 
                value={zoomLevel} 
                onValueChange={setZoomLevel}
                max={1000}
                min={1}
                step={1}
                className="mt-2"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1x</span>
                <span>{zoomLevel[0]}x</span>
                <span>1000x</span>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium">Center X</label>
              <input 
                type="number" 
                step="0.001"
                defaultValue="-0.5"
                className="w-full mt-1 p-2 border rounded-md"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Center Y</label>
              <input 
                type="number" 
                step="0.001"
                defaultValue="0"
                className="w-full mt-1 p-2 border rounded-md"
              />
            </div>
            
            <Button variant="outline" className="w-full">
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset to Origin
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Rendering Quality
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Iterations</label>
              <Slider 
                value={iterations} 
                onValueChange={setIterations}
                max={500}
                min={50}
                step={10}
                className="mt-2"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>50</span>
                <span>{iterations[0]}</span>
                <span>500</span>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium">Anti-aliasing</label>
              <select className="w-full mt-1 p-2 border rounded-md">
                <option>None</option>
                <option>2x MSAA</option>
                <option>4x MSAA</option>
                <option>8x MSAA</option>
              </select>
            </div>
            
            <div>
              <label className="text-sm font-medium">Precision</label>
              <select className="w-full mt-1 p-2 border rounded-md">
                <option>Single (32-bit)</option>
                <option>Double (64-bit)</option>
                <option>Arbitrary Precision</option>
              </select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Color Schemes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Color Schemes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {colorSchemes.map((scheme) => (
              <div 
                key={scheme.id}
                className="p-3 rounded-lg border-2 cursor-pointer hover:border-blue-500 transition-all"
              >
                <div className="flex gap-1 mb-2">
                  {scheme.colors.map((color, idx) => (
                    <div 
                      key={idx}
                      className="w-8 h-8 rounded"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <p className="text-sm font-medium">{scheme.name}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Animation Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="w-5 h-5" />
            Animation Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">Animation Type</label>
              <select className="w-full mt-1 p-2 border rounded-md">
                <option>Smooth Zoom In</option>
                <option>Spiral Zoom</option>
                <option>Parameter Morph</option>
                <option>Color Cycle</option>
              </select>
            </div>
            
            <div>
              <label className="text-sm font-medium">Duration (seconds)</label>
              <input 
                type="number" 
                min="1"
                max="300"
                defaultValue="30"
                className="w-full mt-1 p-2 border rounded-md"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Frame Rate</label>
              <select className="w-full mt-1 p-2 border rounded-md">
                <option>24 fps</option>
                <option>30 fps</option>
                <option>60 fps</option>
              </select>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button className="flex-1">
              <Play className="w-4 h-4 mr-2" />
              Generate Animation
            </Button>
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Advanced
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
