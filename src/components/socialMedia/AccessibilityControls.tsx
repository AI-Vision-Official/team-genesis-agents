
import { Button } from '@/components/ui/button';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, Settings } from 'lucide-react';
import type { SocialAccessibilityOptions } from '@/types/socialMedia';

interface AccessibilityControlsProps {
  settings: SocialAccessibilityOptions;
  onUpdate: (settings: SocialAccessibilityOptions) => void;
}

export const AccessibilityControls = ({ settings, onUpdate }: AccessibilityControlsProps) => {
  const updateSetting = (key: keyof SocialAccessibilityOptions, value: any) => {
    onUpdate({ ...settings, [key]: value });
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
        <div className="space-y-4">
          <h4 className="font-medium">Accessibility Settings</h4>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="dyslexia-font" className="text-sm">
                Dyslexia-friendly font
              </Label>
              <Switch
                id="dyslexia-font"
                checked={settings.dyslexiaFont}
                onCheckedChange={(checked) => updateSetting('dyslexiaFont', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="high-contrast" className="text-sm">
                High contrast mode
              </Label>
              <Switch
                id="high-contrast"
                checked={settings.highContrast}
                onCheckedChange={(checked) => updateSetting('highContrast', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="quiet-mode" className="text-sm">
                Quiet mode
              </Label>
              <Switch
                id="quiet-mode"
                checked={settings.quietMode}
                onCheckedChange={(checked) => updateSetting('quietMode', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="minimal-ui" className="text-sm">
                Minimalist UI
              </Label>
              <Switch
                id="minimal-ui"
                checked={settings.minimalistUI}
                onCheckedChange={(checked) => updateSetting('minimalistUI', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="reduced-motion" className="text-sm">
                Reduced motion
              </Label>
              <Switch
                id="reduced-motion"
                checked={settings.reducedMotion}
                onCheckedChange={(checked) => updateSetting('reducedMotion', checked)}
              />
            </div>

            <div>
              <Label className="text-sm">Font size</Label>
              <Select 
                value={settings.fontSize} 
                onValueChange={(value: 'small' | 'medium' | 'large') => updateSetting('fontSize', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
