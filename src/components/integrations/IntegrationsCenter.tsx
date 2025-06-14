
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Database, 
  Brain, 
  Cloud, 
  Zap, 
  Github, 
  Code, 
  Key, 
  Globe, 
  Monitor,
  Settings,
  CheckCircle,
  AlertCircle,
  ExternalLink
} from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: any;
  status: 'connected' | 'disconnected' | 'error';
  category: 'database' | 'ai' | 'cloud' | 'automation' | 'development' | 'security';
  features: string[];
}

export const IntegrationsCenter = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const integrations: Integration[] = [
    {
      id: 'supabase',
      name: 'Supabase',
      description: 'Database, Authentication, and Backend services',
      icon: Database,
      status: 'connected',
      category: 'database',
      features: ['Database', 'Auth', 'Storage', 'Edge Functions']
    },
    {
      id: 'openai',
      name: 'OpenAI',
      description: 'GPT models and AI capabilities',
      icon: Brain,
      status: 'disconnected',
      category: 'ai',
      features: ['GPT-4', 'DALL-E', 'Embeddings', 'Fine-tuning']
    },
    {
      id: 'vercel',
      name: 'Vercel',
      description: 'Deployment and hosting platform',
      icon: Globe,
      status: 'disconnected',
      category: 'cloud',
      features: ['Deployment', 'Analytics', 'Edge Functions', 'Domains']
    },
    {
      id: 'make',
      name: 'Make (Integromat)',
      description: 'Visual automation platform',
      icon: Zap,
      status: 'disconnected',
      category: 'automation',
      features: ['Workflows', 'API Integrations', 'Scheduling', 'Data Processing']
    },
    {
      id: 'github',
      name: 'GitHub',
      description: 'Code repository and collaboration',
      icon: Github,
      status: 'disconnected',
      category: 'development',
      features: ['Repositories', 'Actions', 'Issues', 'Pull Requests']
    },
    {
      id: 'vscode',
      name: 'VS Code',
      description: 'Code editor integration',
      icon: Code,
      status: 'disconnected',
      category: 'development',
      features: ['Remote Development', 'Extensions', 'Debugging', 'Git Integration']
    },
    {
      id: 'azure',
      name: 'Microsoft Azure',
      description: 'Cloud computing services',
      icon: Cloud,
      status: 'disconnected',
      category: 'cloud',
      features: ['Virtual Machines', 'AI Services', 'Storage', 'Kubernetes']
    },
    {
      id: 'aws',
      name: 'Amazon AWS',
      description: 'Cloud computing platform',
      icon: Cloud,
      status: 'disconnected',
      category: 'cloud',
      features: ['EC2', 'S3', 'Lambda', 'RDS']
    },
    {
      id: 'anthropic',
      name: 'Anthropic Claude',
      description: 'Advanced AI assistant capabilities',
      icon: Brain,
      status: 'disconnected',
      category: 'ai',
      features: ['Claude 3', 'Large Context', 'Code Analysis', 'Research']
    },
    {
      id: 'zapier',
      name: 'Zapier',
      description: 'Automation between apps',
      icon: Zap,
      status: 'disconnected',
      category: 'automation',
      features: ['Triggers', 'Actions', 'Multi-step Zaps', 'Webhooks']
    }
  ];

  const categories = [
    { id: 'all', label: 'All Integrations', icon: Settings },
    { id: 'database', label: 'Database', icon: Database },
    { id: 'ai', label: 'AI Services', icon: Brain },
    { id: 'cloud', label: 'Cloud Platforms', icon: Cloud },
    { id: 'automation', label: 'Automation', icon: Zap },
    { id: 'development', label: 'Development', icon: Code },
    { id: 'security', label: 'Security', icon: Key }
  ];

  const filteredIntegrations = activeCategory === 'all' 
    ? integrations 
    : integrations.filter(integration => integration.category === activeCategory);

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
    <div className="space-y-6">
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-700">
            <Settings className="w-5 h-5" />
            Integrations Hub
          </CardTitle>
          <CardDescription className="text-blue-600">
            Manage all your external service connections and API integrations
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-blue-50">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-700">
                {integrations.filter(i => i.status === 'connected').length}
              </p>
              <p className="text-sm text-blue-600">Connected</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-orange-50">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-700">
                {integrations.filter(i => i.status === 'disconnected').length}
              </p>
              <p className="text-sm text-orange-600">Available</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-green-50">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-700">
                {categories.length - 1}
              </p>
              <p className="text-sm text-green-600">Categories</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-purple-50">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-700">
                {integrations.reduce((sum, i) => sum + i.features.length, 0)}
              </p>
              <p className="text-sm text-purple-600">Features</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="integrations" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="integrations">All Integrations</TabsTrigger>
          <TabsTrigger value="api-keys">API Key Manager</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
        </TabsList>

        <TabsContent value="integrations" className="space-y-6">
          <div className="flex gap-2 mb-6 overflow-x-auto">
            {categories.map(({ id, label, icon: Icon }) => (
              <Button
                key={id}
                variant={activeCategory === id ? "default" : "outline"}
                onClick={() => setActiveCategory(id)}
                className="flex items-center gap-2 whitespace-nowrap"
              >
                <Icon className="w-4 h-4" />
                {label}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIntegrations.map((integration) => {
              const IconComponent = integration.icon;
              return (
                <Card key={integration.id} className="hover:shadow-lg transition-shadow">
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
            })}
          </div>
        </TabsContent>

        <TabsContent value="api-keys" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="w-5 h-5" />
                API Key Manager
              </CardTitle>
              <CardDescription>
                Securely store and manage your API keys for various services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="service">Service</Label>
                  <Input id="service" placeholder="e.g., OpenAI" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <Input id="api-key" type="password" placeholder="Enter your API key" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Input id="description" placeholder="Brief description of this key's purpose" />
              </div>
              <Button>Add API Key</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Stored API Keys</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">OpenAI API Key</p>
                    <p className="text-sm text-gray-500">For GPT models and AI features</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Edit</Button>
                    <Button size="sm" variant="destructive">Delete</Button>
                  </div>
                </div>
                <div className="text-center py-8 text-gray-500">
                  No API keys stored yet. Add your first key above.
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Webhook Manager
              </CardTitle>
              <CardDescription>
                Configure webhooks for real-time integrations and notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="webhook-name">Webhook Name</Label>
                    <Input id="webhook-name" placeholder="e.g., GitHub Deploy Hook" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="webhook-url">Webhook URL</Label>
                    <Input id="webhook-url" placeholder="https://your-service.com/webhook" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="events">Trigger Events</Label>
                  <Input id="events" placeholder="e.g., user.signup, task.completed" />
                </div>
                <Button>Create Webhook</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
