
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap } from 'lucide-react';
import type { AccessibilityOptions } from '@/types/creative';

interface FractalCreatorProps {
  settings: AccessibilityOptions;
}

export const FractalCreator = ({ settings }: FractalCreatorProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className={`text-2xl font-bold ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
          ✨ Fractal Creator
        </h2>
        <p className={`text-gray-600 mt-1 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
          Mandelbrot sets and visual inspiration designs
        </p>
      </div>

      <Card>
        <CardContent className="flex items-center justify-center h-96">
          <div className="text-center">
            <Zap className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">Fractal Creator Coming Soon</h3>
            <p className="text-gray-600">Create beautiful mathematical art and patterns</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
