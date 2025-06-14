
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Globe, 
  Link, 
  Unlink, 
  CheckCircle, 
  AlertCircle,
  Settings
} from 'lucide-react';
import type { Platform } from '@/types/ifttt';

interface PlatformConnectionsProps {
  platforms: Platform[];
}

export const PlatformConnections = ({ platforms }: PlatformConnectionsProps) => {
  const connectedPlatforms = platforms.filter(p => p.connected);
  const availablePlatforms = platforms.filter(p => !p.connected);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Connected Platforms</h3>
        <p className="text-muted-foreground mb-4">
          {connectedPlatforms.length} platforms connected
        </p>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {connectedPlatforms.map((platform) => (
            <Card key={platform.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    {platform.name}
                  </CardTitle>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <Badge variant="outline" className="w-fit">
                  {platform.type}
                </Badge>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium">Available Triggers:</p>
                    <p className="text-sm text-muted-foreground">
                      {platform.availableTriggers.length} triggers
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Available Actions:</p>
                    <p className="text-sm text-muted-foreground">
                      {platform.availableActions.length} actions
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-1" />
                      Configure
                    </Button>
                    <Button variant="destructive" size="sm">
                      <Unlink className="w-4 h-4 mr-1" />
                      Disconnect
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Available Platforms</h3>
        <p className="text-muted-foreground mb-4">
          Connect to more platforms to expand your automation possibilities
        </p>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {availablePlatforms.map((platform) => (
            <Card key={platform.id} className="border-dashed">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    {platform.name}
                  </CardTitle>
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                </div>
                <Badge variant="outline" className="w-fit">
                  {platform.type}
                </Badge>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium">Triggers Available:</p>
                    <p className="text-sm text-muted-foreground">
                      {platform.availableTriggers.length} triggers
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Actions Available:</p>
                    <p className="text-sm text-muted-foreground">
                      {platform.availableActions.length} actions
                    </p>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Link className="w-4 h-4 mr-2" />
                    Connect Platform
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
