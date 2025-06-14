
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: any;
  status: 'connected' | 'disconnected' | 'error';
  category: 'database' | 'ai' | 'cloud' | 'automation' | 'development' | 'security';
  features: string[];
}

interface IntegrationCardProps {
  integration: Integration;
}

export const IntegrationCard = ({ integration }: IntegrationCardProps) => {
  const IconComponent = integration.icon;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return <Badge variant="default" className="bg-green-100 text-green-800">Connected</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge variant="secondary">Not Connected</Badge>;
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <IconComponent className="w-6 h-6" />
            </div>
            <div>
              <CardTitle className="text-lg">{integration.name}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                {getStatusIcon(integration.status)}
                {getStatusBadge(integration.status)}
              </div>
            </div>
          </div>
        </div>
        <CardDescription>{integration.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Features</Label>
            <div className="flex flex-wrap gap-1 mt-2">
              {integration.features.map((feature) => (
                <Badge key={feature} variant="outline" className="text-xs">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              className="flex-1"
              variant={integration.status === 'connected' ? 'outline' : 'default'}
            >
              {integration.status === 'connected' ? 'Manage' : 'Connect'}
            </Button>
            <Button size="sm" variant="outline">
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
