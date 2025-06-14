
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Globe, 
  Shield, 
  Users, 
  TrendingUp, 
  Settings,
  Plus,
  ExternalLink
} from 'lucide-react';
import type { SocialPlatform, SocialAccessibilityOptions } from '@/types/socialMedia';

interface PlatformManagerProps {
  platforms: SocialPlatform[];
  settings: SocialAccessibilityOptions;
}

export const PlatformManager = ({ platforms, settings }: PlatformManagerProps) => {
  const getPlatformTypeColor = (type: string) => {
    switch (type) {
      case 'mainstream': return 'bg-blue-100 text-blue-800';
      case 'alternative': return 'bg-purple-100 text-purple-800';
      case 'regional': return 'bg-green-100 text-green-800';
      case 'messaging': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            🌐 Platform Manager
          </h2>
          <p className={`text-gray-600 mt-1 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            Manage connections to social media platforms worldwide
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Platform
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {platforms.map((platform) => (
          <Card key={platform.id} className={`hover:shadow-lg transition-shadow ${
            platform.censored ? 'border-red-200' : platform.connected ? 'border-green-200' : ''
          }`}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className={`text-lg ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                    {platform.name}
                  </CardTitle>
                  <CardDescription className={settings.dyslexiaFont ? 'font-mono' : ''}>
                    {platform.region.join(', ')}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={platform.connected} />
                  {platform.censored && <Shield className="w-4 h-4 text-red-500" />}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge className={getPlatformTypeColor(platform.type)}>
                  {platform.type}
                </Badge>
                <Badge variant={platform.connected ? "default" : "secondary"}>
                  {platform.connected ? 'Connected' : 'Disconnected'}
                </Badge>
              </div>

              {platform.connected && (
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className={`text-gray-600 block ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                      Followers
                    </span>
                    <span className={`font-bold text-lg ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                      {platform.followers.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className={`text-gray-600 block ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                      Engagement
                    </span>
                    <span className={`font-bold text-lg ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                      {platform.engagementRate.toFixed(1)}%
                    </span>
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Settings className="w-4 h-4 mr-1" />
                  Configure
                </Button>
                <Button size="sm" variant="outline">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>

              {platform.censored && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className={`text-xs text-red-800 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                    ⚠️ This platform may be censored in certain regions. 
                    Alternative access methods available.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
