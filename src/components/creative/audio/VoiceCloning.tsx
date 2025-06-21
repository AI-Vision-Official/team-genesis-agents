
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Mic, Upload, Play, Square, Download, Settings, Users, Brain } from 'lucide-react';
import type { AccessibilityOptions } from '@/types/creative';

interface VoiceCloningProps {
  settings: AccessibilityOptions;
}

export const VoiceCloning = ({ settings }: VoiceCloningProps) => {
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);

  const voiceModels = [
    {
      id: '1',
      name: 'Professional Narrator',
      language: 'English',
      quality: 95,
      trainingData: '2.5 hours',
      status: 'ready',
      ethical: true
    },
    {
      id: '2',
      name: 'Multilingual Assistant',
      language: 'Multi',
      quality: 88,
      trainingData: '4.2 hours',
      status: 'training',
      ethical: true
    },
    {
      id: '3',
      name: 'Accessibility Reader',
      language: 'English',
      quality: 92,
      trainingData: '1.8 hours',
      status: 'ready',
      ethical: true
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className={`text-xl font-bold ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            Voice Cloning & Synthesis
          </h3>
          <p className={`text-gray-600 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            Ethical AI voice synthesis for accessibility and humanitarian purposes
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-700">
            Ethical AI
          </Badge>
          <Badge variant="outline">
            Coqui TTS + Bark
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mic className="w-5 h-5" />
              Voice Training
            </CardTitle>
            <CardDescription>
              Create ethical voice models with consent-based training
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-600">
                Upload audio samples (minimum 30 minutes for quality results)
              </p>
              <Button className="mt-2" size="sm">
                Select Audio Files
              </Button>
            </div>
            
            {isTraining && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Training Progress</span>
                  <span>{trainingProgress}%</span>
                </div>
                <Progress value={trainingProgress} />
                <p className="text-xs text-gray-500">
                  Estimated time remaining: 45 minutes
                </p>
              </div>
            )}
            
            <div className="flex gap-2">
              <Button 
                onClick={() => setIsTraining(!isTraining)}
                className="flex-1"
                disabled={isTraining}
              >
                {isTraining ? <Square className="w-4 h-4 mr-2" /> : <Brain className="w-4 h-4 mr-2" />}
                {isTraining ? 'Training...' : 'Start Training'}
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
              <Users className="w-5 h-5" />
              Voice Models
            </CardTitle>
            <CardDescription>
              Available trained voice models
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {voiceModels.map((model) => (
              <div key={model.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">{model.name}</h4>
                  <p className="text-sm text-gray-600">
                    {model.language} • {model.trainingData} • Quality: {model.quality}%
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {model.ethical && (
                    <Badge variant="outline" className="bg-green-50 text-green-700 text-xs">
                      Ethical
                    </Badge>
                  )}
                  <Badge 
                    variant={model.status === 'ready' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {model.status}
                  </Badge>
                  <Button size="sm" variant="outline">
                    <Play className="w-3 h-3 mr-1" />
                    Test
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Voice Synthesis</CardTitle>
          <CardDescription>
            Generate speech with emotional modulation and multilingual support
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <textarea
            className="w-full h-32 p-3 border rounded-lg resize-none"
            placeholder="Enter text to synthesize (supports SSML markup for emotional control)..."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Voice Model</label>
              <select className="w-full p-2 border rounded-lg">
                <option>Professional Narrator</option>
                <option>Accessibility Reader</option>
                <option>Multilingual Assistant</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Emotion</label>
              <select className="w-full p-2 border rounded-lg">
                <option>Neutral</option>
                <option>Warm</option>
                <option>Calm</option>
                <option>Excited</option>
                <option>Compassionate</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Speed</label>
              <select className="w-full p-2 border rounded-lg">
                <option>Normal</option>
                <option>Slow (Accessibility)</option>
                <option>Fast</option>
              </select>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button className="flex-1">
              <Play className="w-4 h-4 mr-2" />
              Generate Speech
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
