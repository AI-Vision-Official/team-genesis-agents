
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Database, 
  Brain, 
  Cloud, 
  Zap, 
  Github, 
  Code, 
  Key, 
  Settings
} from 'lucide-react';
import { IntegrationsOverview } from './IntegrationsOverview';
import { IntegrationCard } from './IntegrationCard';
import { APIKeyManager } from './APIKeyManager';
import { WebhookManager } from './WebhookManager';

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
      icon: Cloud,
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

  const connectedCount = integrations.filter(i => i.status === 'connected').length;
  const availableCount = integrations.filter(i => i.status === 'disconnected').length;
  const categoriesCount = categories.length - 1;
  const featuresCount = integrations.reduce((sum, i) => sum + i.features.length, 0);

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

      <IntegrationsOverview
        connectedCount={connectedCount}
        availableCount={availableCount}
        categoriesCount={categoriesCount}
        featuresCount={featuresCount}
      />

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
            {filteredIntegrations.map((integration) => (
              <IntegrationCard key={integration.id} integration={integration} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="api-keys" className="space-y-6">
          <APIKeyManager />
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-6">
          <WebhookManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};
