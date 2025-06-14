
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Volume2, Palette, Type, Moon, Minimize2, Settings } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import type { AccessibilityOptions } from '@/types/creative';

interface AccessibilityControlsProps {
  settings: AccessibilityOptions;
  onUpdate: (settings: AccessibilityOptions) => void;
}

export const AccessibilityControls = ({ settings, onUpdate }: AccessibilityControlsProps) => {
  const toggleSetting = (key: keyof AccessibilityOptions, value?: any) => {
    onUpdate({
      ...settings,
      [key]: value !== undefined ? value : !settings[key]
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          <Eye className="w-4 h-4 mr-2" />
          Accessibility
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
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
              variant={settings.highContrast ? "default" : "outline"}
              onClick={() => toggleSetting('highContrast')}
              className="justify-start"
            >
              <Eye className="w-4 h-4 mr-2" />
              High Contrast
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
              variant={settings.minimalistUI ? "default" : "outline"}
              onClick={() => toggleSetting('minimalistUI')}
              className="justify-start"
            >
              <Minimize2 className="w-4 h-4 mr-2" />
              Minimal UI
            </Button>
          </div>
          
          <div className="space-y-2">
            <div className="text-sm font-medium">Font Size:</div>
            <div className="flex gap-1">
              {['small', 'medium', 'large', 'extra-large'].map((size) => (
                <Button
                  key={size}
                  size="sm"
                  variant={settings.fontSize === size ? "default" : "outline"}
                  onClick={() => toggleSetting('fontSize', size)}
                  className="flex-1 text-xs"
                >
                  {size === 'extra-large' ? 'XL' : size.charAt(0).toUpperCase()}
                </Button>
              ))}
            </div>
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
                  {mode === 'none' ? 'Standard' : mode.substring(0, 4)}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
