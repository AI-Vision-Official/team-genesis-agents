
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  WifiOff, 
  Database, 
  Bot, 
  FileText, 
  Search, 
  Download, 
  Upload,
  Globe,
  HardDrive,
  Zap,
  CheckCircle,
  AlertCircle,
  Play,
  Pause,
  Settings
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
      localModel: 'Llama-7B-Chat',
      memoryUsage: 3.2,
      lastActive: new Date(),
      tasksCompleted: 127
    },
    {
      id: '2',
      name: 'CodeHelper-Beta',
      type: 'Programming Assistant',
      status: 'idle',
      capabilities: ['Code Review', 'Bug Detection', 'Documentation'],
      localModel: 'CodeT5-Base',
      memoryUsage: 1.8,
      lastActive: new Date(Date.now() - 30000),
      tasksCompleted: 89
    },
    {
      id: '3',
      name: 'DataProcessor-Gamma',
      type: 'Data Analysis',
      status: 'active',
      capabilities: ['Data Mining', 'Statistical Analysis', 'Report Generation'],
      localModel: 'DistilBERT-Base',
      memoryUsage: 2.1,
      lastActive: new Date(),
      tasksCompleted: 56
    }
  ]);

  const [kiwixResources, setKiwixResources] = useState<KiwixResource[]>([
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

  const [selectedAgent, setSelectedAgent] = useState<OfflineAgent | null>(null);
  const [isAgentDialogOpen, setIsAgentDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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

  const toggleAgentStatus = (agentId: string) => {
    setOfflineAgents(agents => 
      agents.map(agent => 
        agent.id === agentId 
          ? { 
              ...agent, 
              status: agent.status === 'active' ? 'paused' : 'active',
              lastActive: new Date()
            }
          : agent
      )
    );
  };

  const startResourceDownload = (resourceId: string) => {
    setKiwixResources(resources =>
      resources.map(resource =>
        resource.id === resourceId
          ? { ...resource, downloadProgress: 0 }
          : resource
      )
    );

    // Simulate download progress
    const interval = setInterval(() => {
      setKiwixResources(resources =>
        resources.map(resource => {
          if (resource.id === resourceId && resource.downloadProgress !== undefined) {
            const newProgress = resource.downloadProgress + Math.random() * 10;
            if (newProgress >= 100) {
              clearInterval(interval);
              toast({
                title: "Download Complete",
                description: `${resource.name} is now available offline.`
              });
              return { ...resource, isDownloaded: true, downloadProgress: undefined };
            }
            return { ...resource, downloadProgress: Math.min(newProgress, 100) };
          }
          return resource;
        })
      );
    }, 500);
  };

  const getStatusColor = (status: OfflineAgent['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'idle': return 'bg-yellow-100 text-yellow-800';
      case 'paused': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
            Offline Command Center
          </h1>
          <p className="text-slate-600 mt-2">
            Maintain productivity when internet connectivity is limited or unavailable
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant={isOnline ? "default" : "destructive"} className="px-3 py-1">
            {isOnline ? (
              <>
                <Globe className="w-4 h-4 mr-2" />
                Online
              </>
            ) : (
              <>
                <WifiOff className="w-4 h-4 mr-2" />
                Offline Mode
              </>
            )}
          </Badge>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Bot className="w-4 h-4 text-blue-600" />
              Active Agents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{activeAgents.length}</div>
            <p className="text-xs text-slate-600">of {offlineAgents.length} total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-green-600" />
              Memory Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{totalMemoryUsage.toFixed(1)} GB</div>
            <p className="text-xs text-slate-600">Local models</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Database className="w-4 h-4 text-purple-600" />
              Offline Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{downloadedResources.length}</div>
            <p className="text-xs text-slate-600">Available locally</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">Operational</div>
            <p className="text-xs text-slate-600">All systems ready</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="agents" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="agents">Offline Agents</TabsTrigger>
          <TabsTrigger value="resources">Kiwix Resources</TabsTrigger>
          <TabsTrigger value="search">Local Search</TabsTrigger>
        </TabsList>

        <TabsContent value="agents" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offlineAgents.map((agent) => (
              <Card key={agent.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Bot className="w-5 h-5 text-blue-600" />
                        {agent.name}
                      </CardTitle>
                      <CardDescription>{agent.type}</CardDescription>
                    </div>
                    <Badge className={getStatusColor(agent.status)}>
                      {agent.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-slate-700">Local Model:</p>
                      <p className="text-sm text-slate-600">{agent.localModel}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700">Memory Usage:</p>
                      <p className="text-sm text-slate-600">{agent.memoryUsage} GB</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700">Tasks Completed:</p>
                      <p className="text-sm text-slate-600">{agent.tasksCompleted}</p>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {agent.capabilities.slice(0, 2).map((capability, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {capability}
                        </Badge>
                      ))}
                      {agent.capabilities.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{agent.capabilities.length - 2} more
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleAgentStatus(agent.id)}
                        className="flex-1"
                      >
                        {agent.status === 'active' ? (
                          <Pause className="w-4 h-4 mr-2" />
                        ) : (
                          <Play className="w-4 h-4 mr-2" />
                        )}
                        {agent.status === 'active' ? 'Pause' : 'Activate'}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedAgent(agent);
                          setIsAgentDialogOpen(true);
                        }}
                      >
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {kiwixResources.map((resource) => (
              <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Database className="w-5 h-5 text-purple-600" />
                        {resource.name}
                      </CardTitle>
                      <CardDescription>{resource.description}</CardDescription>
                    </div>
                    {resource.isDownloaded ? (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Downloaded
                      </Badge>
                    ) : (
                      <Badge variant="outline">
                        <Download className="w-3 h-3 mr-1" />
                        Available
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Size:</span>
                      <span className="font-medium">{resource.size}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Language:</span>
                      <span className="font-medium">{resource.language}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Category:</span>
                      <Badge variant="secondary" className="text-xs">
                        {resource.category}
                      </Badge>
                    </div>
                    
                    {resource.downloadProgress !== undefined && (
                      <div className="space-y-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${resource.downloadProgress}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-slate-600 text-center">
                          Downloading... {Math.round(resource.downloadProgress)}%
                        </p>
                      </div>
                    )}
                    
                    <div className="pt-2">
                      {resource.isDownloaded ? (
                        <Button variant="outline" className="w-full" disabled>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Available Offline
                        </Button>
                      ) : resource.downloadProgress !== undefined ? (
                        <Button variant="outline" className="w-full" disabled>
                          <Download className="w-4 h-4 mr-2" />
                          Downloading...
                        </Button>
                      ) : (
                        <Button 
                          onClick={() => startResourceDownload(resource.id)}
                          className="w-full"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="search" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5 text-blue-600" />
                Local Knowledge Search
              </CardTitle>
              <CardDescription>
                Search through your offline resources and local knowledge base
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Search offline resources..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Button>
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="text-sm text-slate-600">
                  <p className="mb-2">Available offline resources for search:</p>
                  <ul className="space-y-1">
                    {downloadedResources.map((resource) => (
                      <li key={resource.id} className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-green-600" />
                        {resource.name}
                      </li>
                    ))}
                  </ul>
                  {downloadedResources.length === 0 && (
                    <p className="text-slate-500 italic">
                      No offline resources downloaded yet. Visit the Resources tab to download content.
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Agent Details Dialog */}
      <Dialog open={isAgentDialogOpen} onOpenChange={setIsAgentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agent Configuration</DialogTitle>
            <DialogDescription>
              Configure settings for {selectedAgent?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedAgent && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Agent Name</Label>
                <Input value={selectedAgent.name} readOnly />
              </div>
              <div className="space-y-2">
                <Label>Type</Label>
                <Input value={selectedAgent.type} readOnly />
              </div>
              <div className="space-y-2">
                <Label>Local Model</Label>
                <Input value={selectedAgent.localModel} readOnly />
              </div>
              <div className="space-y-2">
                <Label>Capabilities</Label>
                <div className="flex flex-wrap gap-2">
                  {selectedAgent.capabilities.map((capability, index) => (
                    <Badge key={index} variant="secondary">
                      {capability}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAgentDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
