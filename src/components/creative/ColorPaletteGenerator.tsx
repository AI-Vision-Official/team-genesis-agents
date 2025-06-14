
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Palette } from 'lucide-react';
import type { AccessibilityOptions } from '@/types/creative';

interface ColorPaletteGeneratorProps {
  settings: AccessibilityOptions;
}

export const ColorPaletteGenerator = ({ settings }: ColorPaletteGeneratorProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className={`text-2xl font-bold ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
          🎨 Color Palette Generator
        </h2>
        <p className={`text-gray-600 mt-1 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
          Accessible color schemes with contrast and colorblind checks
        </p>
      </div>

      <Card>
        <CardContent className="flex items-center justify-center h-96">
          <div className="text-center">
            <Palette className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">Color Palette Generator Coming Soon</h3>
            <p className="text-gray-600">Generate accessible color palettes with WCAG compliance</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
