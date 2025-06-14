
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Hash, 
  Globe, 
  Zap,
  Eye,
  AlertTriangle
} from 'lucide-react';
import type { SocialAccessibilityOptions } from '@/types/socialMedia';

interface TrendMonitorProps {
  settings: SocialAccessibilityOptions;
}

export const TrendMonitor = ({ settings }: TrendMonitorProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            📈 Trend Monitor
          </h2>
          <p className={`text-gray-600 mt-1 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            Global trend analysis and hashtag monitoring
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="flex items-center justify-center h-96">
          <div className="text-center">
            <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <h3 className={`text-lg font-medium mb-2 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
              Trend Monitor Coming Soon
            </h3>
            <p className={`text-gray-600 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
              Real-time trend detection and opportunity identification
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
