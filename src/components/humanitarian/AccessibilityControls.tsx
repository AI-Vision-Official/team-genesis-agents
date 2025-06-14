
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Volume2, Palette, Type, Moon, Minimize2 } from 'lucide-react';
import type { AccessibilitySettings } from '@/types/humanitarian';

interface AccessibilityControlsProps {
  settings: AccessibilitySettings;
  onUpdate: (settings: AccessibilitySettings) => void;
}

export const AccessibilityControls = ({ settings, onUpdate }: AccessibilityControlsProps) => {
  const toggleSetting = (key: keyof AccessibilitySettings, value?: any) => {
    onUpdate({
      ...settings,
      [key]: value !== undefined ? value : !settings[key]
    });
  };

  return (
    <Card className="w-80">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Accessibility Settings</h4>
            <Badge variant="outline" className="text-xs">
              Neurodiverse-Friendly
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <Button
              size="sm"
              variant={settings.dyslexiaFont ? "default" : "outline"}
              onClick={() => toggleSetting('dyslexiaFont')}
              className="justify-start"
            >
              <Type className="w-4 h-4 mr-2" />
              Dyslexia Font
            </Button>
            
            <Button
              size="sm"
              variant={settings.lowContrast ? "default" : "outline"}
              onClick={() => toggleSetting('lowContrast')}
              className="justify-start"
            >
              <Eye className="w-4 h-4 mr-2" />
              Low Contrast
            </Button>
            
            <Button
              size="sm"
              variant={settings.quietMode ? "default" : "outline"}
              onClick={() => toggleSetting('quietMode')}
              className="justify-start"
            >
              <Volume2 className="w-4 h-4 mr-2" />
              Quiet Mode
            </Button>
            
            <Button
              size="sm"
              variant={settings.minimumUI ? "default" : "outline"}
              onClick={() => toggleSetting('minimumUI')}
              className="justify-start"
            >
              <Minimize2 className="w-4 h-4 mr-2" />
              Minimal UI
            </Button>
          </div>
          
          <div className="space-y-2">
            <div className="text-sm font-medium">Reading Level:</div>
            <div className="flex gap-1">
              {['simple', 'standard', 'advanced'].map((level) => (
                <Button
                  key={level}
                  size="sm"
                  variant={settings.readingLevel === level ? "default" : "outline"}
                  onClick={() => toggleSetting('readingLevel', level)}
                  className="flex-1 text-xs"
                >
                  {level}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="text-sm font-medium">Color Vision:</div>
            <div className="flex gap-1">
              {['none', 'protanopia', 'deuteranopia', 'tritanopia'].map((mode) => (
                <Button
                  key={mode}
                  size="sm"
                  variant={settings.colorBlindMode === mode ? "default" : "outline"}
                  onClick={() => toggleSetting('colorBlindMode', mode)}
                  className="flex-1 text-xs"
                >
                  {mode === 'none' ? 'Standard' : mode}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
