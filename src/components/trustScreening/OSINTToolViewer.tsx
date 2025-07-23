import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ExternalLink, ArrowLeft, Shield, Maximize2, Minimize2,
  AlertTriangle, Globe, Loader2
} from 'lucide-react';

interface OSINTTool {
  id: string;
  name: string;
  description: string;
  url: string;
  type: 'iframe' | 'external' | 'deep-link';
  instructions: string;
  category: string;
}

interface OSINTToolViewerProps {
  tool: OSINTTool | null;
  onBack: () => void;
}

export const OSINTToolViewer = ({ tool, onBack }: OSINTToolViewerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState('tool');

  if (!tool) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <Shield className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No tool selected</h3>
          <p className="text-muted-foreground">
            Select a tool from the grid to view it here
          </p>
        </CardContent>
      </Card>
    );
  }

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const openInNewTab = () => {
    window.open(tool.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={`space-y-4 ${isFullscreen ? 'fixed inset-0 z-50 bg-background p-4' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tools
          </Button>
          <div>
            <h2 className="text-xl font-semibold">{tool.name}</h2>
            <p className="text-sm text-muted-foreground">{tool.description}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="capitalize">
            {tool.category}
          </Badge>
          <Button variant="outline" size="sm" onClick={openInNewTab}>
            <ExternalLink className="w-4 h-4 mr-2" />
            Open in New Tab
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFullscreen(!isFullscreen)}
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="tool">Tool Interface</TabsTrigger>
          <TabsTrigger value="instructions">Instructions</TabsTrigger>
          <TabsTrigger value="tips">Tips & Best Practices</TabsTrigger>
        </TabsList>

        <TabsContent value="tool" className="space-y-4">
          {tool.type === 'iframe' ? (
            <Card className="relative">
              <CardContent className="p-0">
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Loading tool...</span>
                    </div>
                  </div>
                )}
                <iframe
                  src={tool.url}
                  className={`w-full border-0 ${isFullscreen ? 'h-[calc(100vh-200px)]' : 'h-[600px]'}`}
                  onLoad={handleIframeLoad}
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                  title={tool.name}
                />
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Globe className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">External Tool</h3>
                <p className="text-muted-foreground mb-6">
                  This tool opens in a new window or requires installation
                </p>
                <Button onClick={openInNewTab} size="lg">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Open {tool.name}
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="instructions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>How to Use {tool.name}</CardTitle>
              <CardDescription>Step-by-step instructions for this tool</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="prose prose-sm max-w-none">
                <p>{tool.instructions}</p>
              </div>
              
              {tool.type === 'external' && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-800 mb-1">External Tool Notice</h4>
                      <p className="text-sm text-blue-700">
                        This tool requires installation or runs externally. Follow the provided 
                        instructions to set it up on your system.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tips" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Best Practices & Tips</CardTitle>
              <CardDescription>Professional guidance for effective OSINT</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-green-800">✅ Do</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Verify information from multiple sources</li>
                    <li>• Keep detailed notes and screenshots</li>
                    <li>• Respect rate limits and terms of service</li>
                    <li>• Use VPN for privacy protection</li>
                    <li>• Document your investigation timeline</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-red-800">❌ Don't</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Rely on single-source information</li>
                    <li>• Violate privacy laws or terms of service</li>
                    <li>• Share personal information without consent</li>
                    <li>• Use tools for harassment or stalking</li>
                    <li>• Assume all results are accurate</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-yellow-800 mb-1">Legal Reminder</h4>
                    <p className="text-sm text-yellow-700">
                      Always ensure your investigations comply with local laws, privacy regulations, 
                      and ethical standards. When in doubt, consult with legal professionals.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};