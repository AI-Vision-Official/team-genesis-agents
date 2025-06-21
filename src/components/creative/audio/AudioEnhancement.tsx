
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Sliders, Zap, Brain, Upload, Download, Play } from 'lucide-react';
import type { AccessibilityOptions } from '@/types/creative';

interface AudioEnhancementProps {
  settings: AccessibilityOptions;
}

export const AudioEnhancement = ({ settings }: AudioEnhancementProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [bassLevel, setBassLevel] = useState([0]);
  const [trebleLevel, setTrebleLevel] = useState([0]);
  const [compressionLevel, setCompressionLevel] = useState([30]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className={`text-xl font-bold ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            AI-Assisted Audio Enhancement
          </h3>
          <p className={`text-gray-600 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            Professional mastering and EQ with intelligent processing
          </p>
        </div>
        <Badge variant="outline">FFmpeg + AI</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sliders className="w-5 h-5" />
              Manual EQ Controls
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">Bass</label>
                <span className="text-sm text-gray-600">{bassLevel[0]} dB</span>
              </div>
              <Slider
                value={bassLevel}
                onValueChange={setBassLevel}
                min={-12}
                max={12}
                step={0.5}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">Treble</label>
                <span className="text-sm text-gray-600">{trebleLevel[0]} dB</span>
              </div>
              <Slider
                value={trebleLevel}
                onValueChange={setTrebleLevel}
                min={-12}
                max={12}
                step={0.5}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">Compression</label>
                <span className="text-sm text-gray-600">{compressionLevel[0]}%</span>
              </div>
              <Slider
                value={compressionLevel}
                onValueChange={setCompressionLevel}
                min={0}
                max={100}
                step={1}
                className="w-full"
              />
            </div>

            <div className="flex gap-2">
              <Button className="flex-1">
                <Play className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button variant="outline">Reset</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              AI Enhancement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Auto Mastering</span>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Vocal Enhancement</span>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Stereo Widening</span>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Loudness Normalization</span>
                <Switch defaultChecked />
              </div>
            </div>

            <Button 
              className="w-full"
              onClick={() => setIsProcessing(!isProcessing)}
              disabled={isProcessing}
            >
              <Zap className="w-4 h-4 mr-2" />
              {isProcessing ? 'Processing...' : 'Apply AI Enhancement'}
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Audio File Processing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-gray-600">
              Drop audio files here or click to browse
            </p>
            <Button className="mt-2" size="sm">
              Select Files
            </Button>
          </div>

          <div className="flex gap-2">
            <Button className="flex-1">
              <Zap className="w-4 h-4 mr-2" />
              Process All
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download Enhanced
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
