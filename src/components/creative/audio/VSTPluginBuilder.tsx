
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Settings, Code, Download, Play, Sparkles } from 'lucide-react';
import type { AccessibilityOptions } from '@/types/creative';

interface VSTPluginBuilderProps {
  settings: AccessibilityOptions;
}

export const VSTPluginBuilder = ({ settings }: VSTPluginBuilderProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [isBuilding, setIsBuilding] = useState(false);

  const pluginTemplates = [
    {
      id: 'reverb',
      name: 'Reverb Effect',
      type: 'Effect',
      description: 'Algorithmic reverb with multiple room types',
      complexity: 'Intermediate',
      framework: 'JUCE'
    },
    {
      id: 'compressor',
      name: 'Compressor',
      type: 'Effect',
      description: 'Dynamic range compressor with vintage modeling',
      complexity: 'Advanced',
      framework: 'JUCE'
    },
    {
      id: 'synth',
      name: 'Wavetable Synth',
      type: 'Instrument',
      description: 'Polyphonic synthesizer with wavetable oscillators',
      complexity: 'Expert',
      framework: 'JUCE'
    },
    {
      id: 'eq',
      name: 'Parametric EQ',
      type: 'Effect',
      description: '8-band parametric equalizer with analyzer',
      complexity: 'Beginner',
      framework: 'iPlug2'
    },
    {
      id: 'distortion',
      name: 'Tube Distortion',
      type: 'Effect',
      description: 'Analog-modeled tube saturation and distortion',
      complexity: 'Intermediate',
      framework: 'JUCE'
    }
  ];

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-orange-100 text-orange-800';
      case 'Expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className={`text-xl font-bold ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            VST Plugin Builder
          </h3>
          <p className={`text-gray-600 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            Create professional VST/VST3 plugins with JUCE and iPlug2
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline">JUCE</Badge>
          <Badge variant="outline">iPlug2</Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700">Beta</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Plugin Templates
            </CardTitle>
            <CardDescription>
              Choose a starting template for your VST plugin
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {pluginTemplates.map((template) => (
              <div 
                key={template.id}
                className={`p-3 border rounded-lg cursor-pointer transition-all ${
                  selectedTemplate === template.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedTemplate(template.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{template.name}</h4>
                  <div className="flex gap-1">
                    <Badge variant="outline" className="text-xs">
                      {template.type}
                    </Badge>
                    <Badge className={`text-xs ${getComplexityColor(template.complexity)}`}>
                      {template.complexity}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Framework: {template.framework}</span>
                  {selectedTemplate === template.id && (
                    <Badge variant="default" className="text-xs">Selected</Badge>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="w-5 h-5" />
              Plugin Configuration
            </CardTitle>
            <CardDescription>
              Customize your plugin settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Plugin Name</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded-lg" 
                placeholder="My Audio Plugin"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Company Name</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded-lg" 
                placeholder="Your Company"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Export Formats</label>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked />
                  <span className="text-sm">VST3 (.vst3)</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  <span className="text-sm">Audio Unit (.au)</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  <span className="text-sm">AAX (.aax)</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Target Platform</label>
              <select className="w-full p-2 border rounded-lg">
                <option>Windows & macOS</option>
                <option>Windows Only</option>
                <option>macOS Only</option>
                <option>Linux</option>
              </select>
            </div>

            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-1">AI Assistant</h4>
              <p className="text-sm text-blue-700">
                Our AI can help generate code, suggest parameter ranges, and create 
                presets based on genre keywords or mood tags.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Build & Export</CardTitle>
          <CardDescription>
            Generate your VST plugin code and binaries
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Build Mode</label>
              <select className="w-full p-2 border rounded-lg">
                <option>Debug (Development)</option>
                <option>Release (Distribution)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Optimization</label>
              <select className="w-full p-2 border rounded-lg">
                <option>Standard</option>
                <option>Size Optimized</option>
                <option>Speed Optimized</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              className="flex-1"
              onClick={() => setIsBuilding(!isBuilding)}
              disabled={!selectedTemplate || isBuilding}
            >
              <Code className="w-4 h-4 mr-2" />
              {isBuilding ? 'Building...' : 'Generate Code'}
            </Button>
            <Button variant="outline">
              <Play className="w-4 h-4 mr-2" />
              Test Plugin
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
            <div className="flex items-start gap-2">
              <Sparkles className="w-5 h-5 text-purple-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-purple-900">Preset Generation</h4>
                <p className="text-sm text-purple-700 mt-1">
                  Generate intelligent presets based on genre keywords like "warm jazz", 
                  "aggressive rock", or "ambient chill" using AI analysis.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
