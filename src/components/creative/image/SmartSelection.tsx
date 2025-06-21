
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { 
  Wand2, 
  Square, 
  Circle, 
  Lasso, 
  Eye, 
  Scissors,
  Copy,
  Trash2,
  RotateCcw,
  Settings,
  Brain
} from 'lucide-react';
import type { AccessibilityOptions } from '@/types/creative';

interface SmartSelectionProps {
  settings: AccessibilityOptions;
}

export const SmartSelection = ({ settings }: SmartSelectionProps) => {
  const [selectedTool, setSelectedTool] = useState('magic-wand');
  const [tolerance, setTolerance] = useState(20);
  const [featherRadius, setFeatherRadius] = useState(2);
  const [hasSelection, setHasSelection] = useState(false);

  const selectionTools = [
    {
      id: 'magic-wand',
      name: 'Magic Wand',
      icon: Wand2,
      description: 'AI-powered smart selection'
    },
    {
      id: 'rectangle',
      name: 'Rectangle',
      icon: Square,
      description: 'Rectangular selection'
    },
    {
      id: 'ellipse',
      name: 'Ellipse',
      icon: Circle,
      description: 'Elliptical selection'
    },
    {
      i: 'lasso',
      name: 'Lasso',
      icon: Lasso,
      description: 'Freehand selection'
    }
  ];

  const aiSelectionPresets = [
    {
      id: 'person',
      name: 'Person Detection',
      description: 'Automatically select people in the image'
    },
    {
      id: 'object',
      name: 'Object Detection',
      description: 'Select specific objects using AI'
    },
    {
      id: 'sky',
      name: 'Sky Selection',
      description: 'Automatically select sky areas'
    },
    {
      id: 'background',
      name: 'Background',
      description: 'Select background elements'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className={`text-xl font-bold ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            Smart Selection & Masking
          </h3>
          <p className={`text-gray-600 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            AI-powered selection tools with advanced masking
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline">AI Detection</Badge>
          <Badge variant="outline">Edge Detection</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Selection Tools */}
        <Card>
          <CardHeader>
            <CardTitle>Selection Tools</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {selectionTools.map((tool) => (
                <Button
                  key={tool.id}
                  size="sm"
                  variant={selectedTool === tool.id ? "default" : "outline"}
                  onClick={() => setSelectedTool(tool.id)}
                  className="flex-col h-16"
                >
                  <tool.icon className="w-4 h-4 mb-1" />
                  <span className="text-xs">{tool.name}</span>
                </Button>
              ))}
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium">Tolerance</label>
                <Slider
                  value={[tolerance]}
                  onValueChange={(value) => setTolerance(value[0])}
                  max={100}
                  min={0}
                />
                <div className="text-xs text-gray-500 mt-1">{tolerance}%</div>
              </div>

              <div>
                <label className="text-sm font-medium">Feather Radius</label>
                <Slider
                  value={[featherRadius]}
                  onValueChange={(value) => setFeatherRadius(value[0])}
                  max={50}
                  min={0}
                />
                <div className="text-xs text-gray-500 mt-1">{featherRadius}px</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Selection Presets */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              AI Selection
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {aiSelectionPresets.map((preset) => (
              <Button
                key={preset.id}
                variant="outline"
                className="w-full justify-start h-auto p-3"
                onClick={() => setHasSelection(true)}
              >
                <div className="text-left">
                  <div className="font-medium text-sm">{preset.name}</div>
                  <div className="text-xs text-gray-500">{preset.description}</div>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Selection Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Selection Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <Button size="sm" variant="outline" disabled={!hasSelection}>
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
              <Button size="sm" variant="outline" disabled={!hasSelection}>
                <Scissors className="w-4 h-4 mr-2" />
                Cut
              </Button>
              <Button size="sm" variant="outline" disabled={!hasSelection}>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
              <Button size="sm" variant="outline" disabled={!hasSelection}>
                <Eye className="w-4 h-4 mr-2" />
                Mask
              </Button>
            </div>

            <div className="space-y-2">
              <Button size="sm" variant="outline" className="w-full" disabled={!hasSelection}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Invert Selection
              </Button>
              <Button size="sm" variant="outline" className="w-full" disabled={!hasSelection}>
                Expand Selection
              </Button>
              <Button size="sm" variant="outline" className="w-full" disabled={!hasSelection}>
                Contract Selection
              </Button>
            </div>

            <Button size="sm" className="w-full" disabled={!hasSelection}>
              <Settings className="w-4 h-4 mr-2" />
              Refine Edge
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Selection Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Selection Preview</CardTitle>
          <CardDescription>
            Preview your selections and masks in real-time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
            {hasSelection ? (
              <div className="text-center">
                <Eye className="w-12 h-12 mx-auto mb-4 text-blue-500" />
                <p className="text-gray-600 font-medium">Active Selection</p>
                <p className="text-sm text-gray-500">Marching ants indicate selected area</p>
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <Wand2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Make a selection to see preview</p>
                <p className="text-sm">Use tools above or AI presets</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
