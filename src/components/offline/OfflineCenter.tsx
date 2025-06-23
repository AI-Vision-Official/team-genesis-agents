
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  WifiOff, 
  Database, 
  Bot, 
  Brain,
  HardDrive,
  Zap,
  Activity,
  Settings,
  Download
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ModelOrchestrator } from './ModelOrchestrator';
import { OfflineDataProcessor } from './OfflineDataProcessor';

interface OfflineAgent {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'idle' | 'paused';
  capabilities: string[];
  localModel: string;
  memoryUsage: number;
  lastActive: Date;
  tasksCompleted: number;
}

interface KiwixResource {
  id: string;
  name: string;
  description: string;
  size: string;
  language: string;
  category: string;
  isDownloaded: boolean;
  downloadProgress?: number;
}

export const OfflineCenter = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [offlineAgents, setOfflineAgents] = useState<OfflineAgent[]>([
    {
      id: '1',
      name: 'LocalAssist-Alpha',
      type: 'General Assistant',
      status: 'active',
      capabilities: ['Text Processing', 'Code Analysis', 'Local Search'],
      localModel: 'Llama-13B-Chat',
      memoryUsage: 8.2,
      lastActive: new Date(),
      tasksCompleted: 127
    },
    {
      id: '2',
      name: 'CodeHelper-Beta',
      type: 'Programming Assistant',
      status: 'active',
      capabilities: ['Code Review', 'Bug Detection', 'Documentation'],
      localModel: 'CodeT5-Large',
      memoryUsage: 4.1,
      lastActive: new Date(Date.now() - 30000),
      tasksCompleted: 89
    },
    {
      id: '3',
      name: 'DataProcessor-Gamma',
      type: 'Data Analysis',
      status: 'active',
      capabilities: ['Data Mining', 'Statistical Analysis', 'Report Generation'],
      localModel: 'DistilBERT-Multilingual',
      memoryUsage: 2.3,
      lastActive: new Date(),
      tasksCompleted: 56
    }
  ]);

  const [kiwixResources] = useState<KiwixResource[]>([
    {
      id: '1',
      name: 'Wikipedia (English)',
      description: 'Complete English Wikipedia offline',
      size: '95 GB',
      language: 'English',
      category: 'Encyclopedia',
      isDownloaded: true
    },
    {
      id: '2',
      name: 'Stack Overflow',
      description: 'Programming Q&A database',
      size: '12 GB',
      language: 'English',
      category: 'Programming',
      isDownloaded: false,
      downloadProgress: 0
    },
    {
      id: '3',
      name: 'MDN Web Docs',
      description: 'Web development documentation',
      size: '2.3 GB',
      language: 'English',
      category: 'Documentation',
      isDownloaded: true
    },
    {
      id: '4',
      name: 'OpenStreetMap',
      description: 'Offline maps and navigation',
      size: '45 GB',
      language: 'Multiple',
      category: 'Maps',
      isDownloaded: false,
      downloadProgress: 0
    }
  ]);

  const { toast } = useToast();

  useEffect(() => {
    const handleOnlineStatus = () => {
      setIsOnline(navigator.onLine);
      if (!navigator.onLine) {
        toast({
          title: "Offline Mode Activated",
          description: "You're now offline. Local agents and resources are available.",
          variant: "default"
        });
      } else {
        toast({
          title: "Back Online",
          description: "Internet connection restored. Online features are now available.",
          variant: "default"
        });
      }
    };

    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);

    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, [toast]);

  const activeAgents = offlineAgents.filter(agent => agent.status === 'active');
  const totalMemoryUsage = offlineAgents.reduce((total, agent) => total + agent.memoryUsage, 0);
  const downloadedResources = kiwixResources.filter(resource => resource.isDownloaded);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent flex items-center gap-3">
            <WifiOff className="w-8 h-8 text-orange-600" />
            Offline AI Command Center
          </h1>
          <p className="text-slate-600 mt-2">Autonomous AI agents and resources for offline operation</p>
        </div>
        <div className="flex gap-3">
          <Badge className={isOnline ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
            {isOnline ? 'Online' : 'Offline'}
          </Badge>
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Configure
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700">Active Agents</p>
                <p className="text-2xl font-bold text-blue-900">{activeAgents.length}</p>
              </div>
              <Bot className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700">Memory Usage</p>
                <p className="text-2xl font-bold text-green-900">{totalMemoryUsage.toFixed(1)} GB</p>
              </div>
              <HardDrive className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700">Downloaded Resources</p>
                <p className="text-2xl font-bold text-purple-900">{downloadedResources.length}</p>
              </div>
              <Database className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-700">System Status</p>
                <p className="text-2xl font-bold text-orange-900">Optimal</p>
              </div>
              <Activity className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="orchestrator" className="w-full">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="orchestrator">Model Orchestrator</TabsTrigger>
          <TabsTrigger value="dataprocessor">Data Processing</TabsTrigger>
          <TabsTrigger value="agents">Local Agents</TabsTrigger>
          <TabsTrigger value="resources">Offline Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="orchestrator">
          <ModelOrchestrator />
        </TabsContent>

        <TabsContent value="dataprocessor">
          <OfflineDataProcessor />
        </TabsContent>

        <TabsContent value="agents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                Local AI Agents
              </CardTitle>
              <CardDescription>
                Autonomous agents running locally without internet dependency
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {offlineAgents.map((agent) => (
                  <Card key={agent.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                          <Brain className="w-6 h-6 text-white" />
                        </div>
                        
                        <div>
                          <h4 className="font-medium">{agent.name}</h4>
                          <p className="text-sm text-gray-500">{agent.type} • {agent.localModel}</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {agent.capabilities.slice(0, 2).map((capability, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {capability}
                              </Badge>
                            ))}
                            {agent.capabilities.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{agent.capabilities.length - 2}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`w-2 h-2 rounded-full ${
                            agent.status === 'active' ? 'bg-green-500' :
                            agent.status === 'idle' ? 'bg-yellow-500' : 'bg-gray-400'
                          }`} />
                          <Badge className={
                            agent.status === 'active' ? 'bg-green-100 text-green-800' :
                            agent.status === 'idle' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }>
                            {agent.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600">
                          {agent.memoryUsage} GB • {agent.tasksCompleted} tasks
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Offline Knowledge Resources
              </CardTitle>
              <CardDescription>
                Downloaded resources for offline access and research
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {kiwixResources.map((resource) => (
                  <Card key={resource.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{resource.name}</h4>
                        <p className="text-sm text-gray-500 mb-2">{resource.description}</p>
                        <div className="flex gap-2">
                          <Badge variant="outline" className="text-xs">{resource.category}</Badge>
                          <Badge variant="outline" className="text-xs">{resource.language}</Badge>
                          <Badge variant="outline" className="text-xs">{resource.size}</Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {resource.isDownloaded ? (
                          <Badge className="bg-green-100 text-green-800">Downloaded</Badge>
                        ) : (
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
