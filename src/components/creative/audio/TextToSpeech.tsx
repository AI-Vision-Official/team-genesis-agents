
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { MessageSquare, Play, Square, Download, Globe, Heart, Brain } from 'lucide-react';
import type { AccessibilityOptions } from '@/types/creative';

interface TextToSpeechProps {
  settings: AccessibilityOptions;
}

export const TextToSpeech = ({ settings }: TextToSpeechProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState([100]);
  const [pitch, setPitch] = useState([100]);
  const [emotion, setEmotion] = useState([50]);

  const languages = [
    { code: 'en', name: 'English', voices: 12 },
    { code: 'es', name: 'Spanish', voices: 8 },
    { code: 'fr', name: 'French', voices: 6 },
    { code: 'de', name: 'German', voices: 5 },
    { code: 'it', name: 'Italian', voices: 4 },
    { code: 'pt', name: 'Portuguese', voices: 4 },
    { code: 'ar', name: 'Arabic', voices: 3 },
    { code: 'zh', name: 'Chinese', voices: 4 },
    { code: 'ja', name: 'Japanese', voices: 3 },
    { code: 'hi', name: 'Hindi', voices: 2 }
  ];

  const emotionalProfiles = [
    { name: 'Neutral', description: 'Standard professional tone' },
    { name: 'Warm', description: 'Friendly and approachable' },
    { name: 'Calm', description: 'Soothing and peaceful' },
    { name: 'Excited', description: 'Energetic and enthusiastic' },
    { name: 'Compassionate', description: 'Caring and empathetic' },
    { name: 'Confident', description: 'Strong and assertive' },
    { name: 'Gentle', description: 'Soft and tender' },
    { name: 'Inspiring', description: 'Motivational and uplifting' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className={`text-xl font-bold ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            Emotional Text-to-Speech
          </h3>
          <p className={`text-gray-600 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            Multilingual TTS with emotional modulation for humanitarian impact
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline">
            OpenTTS + Bark
          </Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700">
            <Globe className="w-3 h-3 mr-1" />
            47 Languages
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Text Input
            </CardTitle>
            <CardDescription>
              Enter text with optional SSML markup for advanced control
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <textarea
              className="w-full h-40 p-3 border rounded-lg resize-none"
              placeholder="Enter your text here... 

You can use SSML markup for advanced control:
<speak>
  <prosody rate='slow' pitch='low'>
    This text will be spoken slowly and with a low pitch.
  </prosody>
  <break time='1s'/>
  <emphasis level='strong'>This is emphasized!</emphasis>
</speak>"
            />
            
            <div className="flex gap-2">
              <Button 
                className={`flex-1 ${isPlaying ? 'bg-red-500 hover:bg-red-600' : ''}`}
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Square className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isPlaying ? 'Stop' : 'Play'} Preview
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Audio
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5" />
              Voice & Emotion
            </CardTitle>
            <CardDescription>
              Configure voice characteristics and emotional tone
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Language & Voice</label>
              <div className="grid grid-cols-2 gap-2">
                <select className="p-2 border rounded-lg">
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name} ({lang.voices} voices)
                    </option>
                  ))}
                </select>
                <select className="p-2 border rounded-lg">
                  <option>Sarah (Female, Warm)</option>
                  <option>David (Male, Professional)</option>
                  <option>Emma (Female, Gentle)</option>
                  <option>Alex (Neutral, Clear)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Emotional Profile</label>
              <select className="w-full p-2 border rounded-lg">
                {emotionalProfiles.map((profile) => (
                  <option key={profile.name} value={profile.name}>
                    {profile.name} - {profile.description}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Speech Speed</label>
                  <span className="text-sm text-gray-600">{speed[0]}%</span>
                </div>
                <Slider
                  value={speed}
                  onValueChange={setSpeed}
                  min={50}
                  max={200}
                  step={5}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Pitch</label>
                  <span className="text-sm text-gray-600">{pitch[0]}%</span>
                </div>
                <Slider
                  value={pitch}
                  onValueChange={setPitch}
                  min={50}
                  max={200}
                  step={5}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Emotional Intensity</label>
                  <span className="text-sm text-gray-600">{emotion[0]}%</span>
                </div>
                <Slider
                  value={emotion}
                  onValueChange={setEmotion}
                  min={0}
                  max={100}
                  step={5}
                  className="w-full"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            AI-Powered Features
          </CardTitle>
          <CardDescription>
            Intelligent text processing and accessibility enhancements
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium">Text Processing</h4>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked />
                  <span className="text-sm">Auto-punctuation detection</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked />
                  <span className="text-sm">Abbreviation expansion</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  <span className="text-sm">Number normalization</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked />
                  <span className="text-sm">Emotional context analysis</span>
                </label>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Accessibility</h4>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked />
                  <span className="text-sm">Dyslexia-friendly pacing</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  <span className="text-sm">ADHD attention breaks</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked />
                  <span className="text-sm">Clear pronunciation mode</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  <span className="text-sm">Anxiety-reducing tone</span>
                </label>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
            <div className="flex items-start gap-2">
              <Heart className="w-5 h-5 text-purple-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-purple-900">Humanitarian Impact</h4>
                <p className="text-sm text-purple-700 mt-1">
                  This TTS system is designed to support vulnerable populations, providing 
                  accessible communication tools that adapt to individual needs and cultural contexts.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
