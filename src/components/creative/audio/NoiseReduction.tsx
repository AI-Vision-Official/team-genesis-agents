
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Volume2, VolumeX, Mic, Settings, Zap, Brain } from 'lucide-react';
import type { AccessibilityOptions } from '@/types/creative';

interface NoiseReductionProps {
  settings: AccessibilityOptions;
}

export const NoiseReduction = ({ settings }: NoiseReductionProps) => {
  const [isActive, setIsActive] = useState(false);
  const [noiseLevel, setNoiseLevel] = useState([70]);
  const [sensitivity, setSensitivity] = useState([50]);
  const [adaptiveMode, setAdaptiveMode] = useState(true);

  const presets = [
    { name: 'Office Environment', noise: 60, sensitivity: 40, adaptive: true },
    { name: 'Home Recording', noise: 80, sensitivity: 60, adaptive: true },
    { name: 'Street/Outdoor', noise: 90, sensitivity: 70, adaptive: true },
    { name: 'Studio Quality', noise: 95, sensitivity: 80, adaptive: false },
    { name: 'Accessibility Focus', noise: 75, sensitivity: 45, adaptive: true }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className={`text-xl font-bold ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            Real-time Noise Reduction
          </h3>
          <p className={`text-gray-600 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            Adaptive noise gate and AI-powered audio cleaning
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline">
            FFmpeg + SoX
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            Real-time
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Volume2 className="w-5 h-5" />
              Noise Control
            </CardTitle>
            <CardDescription>
              Fine-tune noise reduction parameters
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="font-medium">Active Noise Reduction</span>
              <Switch 
                checked={isActive} 
                onCheckedChange={setIsActive}
              />
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Noise Reduction Level</label>
                  <span className="text-sm text-gray-600">{noiseLevel[0]}%</span>
                </div>
                <Slider
                  value={noiseLevel}
                  onValueChange={setNoiseLevel}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Gate Sensitivity</label>
                  <span className="text-sm text-gray-600">{sensitivity[0]}%</span>
                </div>
                <Slider
                  value={sensitivity}
                  onValueChange={setSensitivity}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Adaptive Mode</span>
                <Switch 
                  checked={adaptiveMode} 
                  onCheckedChange={setAdaptiveMode}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button 
                className={`flex-1 ${isActive ? 'bg-green-500 hover:bg-green-600' : ''}`}
                onClick={() => setIsActive(!isActive)}
              >
                {isActive ? <VolumeX className="w-4 h-4 mr-2" /> : <Volume2 className="w-4 h-4 mr-2" />}
                {isActive ? 'Disable' : 'Enable'} Noise Reduction
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Quick Presets
            </CardTitle>
            <CardDescription>
              Environment-optimized noise reduction profiles
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {presets.map((preset, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">{preset.name}</h4>
                  <p className="text-sm text-gray-600">
                    Noise: {preset.noise}% • Sensitivity: {preset.sensitivity}%
                    {preset.adaptive && ' • Adaptive'}
                  </p>
                </div>
                <Button size="sm" variant="outline">
                  Apply
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            AI Enhancement
          </CardTitle>
          <CardDescription>
            Intelligent audio processing with self-healing pipeline
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span className="text-sm font-medium">Auto-EQ</span>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span className="text-sm font-medium">Breath Removal</span>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span className="text-sm font-medium">Click Removal</span>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span className="text-sm font-medium">Reverb Reduction</span>
              <Switch />
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span className="text-sm font-medium">Wind Noise Filter</span>
              <Switch />
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span className="text-sm font-medium">Voice Enhance</span>
              <Switch defaultChecked />
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-start gap-2">
              <Mic className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900">Voice-to-Command Bridge</h4>
                <p className="text-sm text-blue-700 mt-1">
                  Say commands like "enhance clarity", "reduce background noise", or "make it warmer" 
                  to control filters in real-time.
                </p>
              </div>
            </div>
          </div>

          <Button className="w-full">
            <Brain className="w-4 h-4 mr-2" />
            Enable AI Processing Pipeline
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
