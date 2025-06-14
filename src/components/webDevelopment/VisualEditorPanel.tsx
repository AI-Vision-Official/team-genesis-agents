
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Monitor, 
  Tablet, 
  Smartphone, 
  Eye, 
  Code, 
  Palette,
  Save,
  Undo,
  Redo,
  Play
} from 'lucide-react';

interface VisualEditorPanelProps {
  activeProject: string | null;
}

export const VisualEditorPanel = ({ activeProject }: VisualEditorPanelProps) => {
  const [currentView, setCurrentView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [previewMode, setPreviewMode] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  if (!activeProject) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center">
            <Code className="w-12 h-12 mx-auto mb-4 text-slate-400" />
            <p className="text-slate-600">Select a project to start editing</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const mockComponents = [
    { id: '1', type: 'header', name: 'Navigation Bar', editable: true },
    { id: '2', type: 'hero', name: 'Hero Section', editable: true },
    { id: '3', type: 'features', name: 'Features Grid', editable: true },
    { id: '4', type: 'footer', name: 'Footer', editable: true }
  ];

  return (
    <div className="space-y-6">
      {/* Editor Toolbar */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5" />
                Visual Editor - Low Code Interface
              </CardTitle>
              <CardDescription>
                Drag, drop, and customize your web components without coding
              </CardDescription>
            </div>
            
            <div className="flex items-center gap-2">
              {unsavedChanges && (
                <Badge variant="outline" className="text-orange-600">
                  Unsaved changes
                </Badge>
              )}
              
              <div className="flex items-center gap-1 border rounded-lg p-1">
                <Button
                  size="sm"
                  variant={currentView === 'desktop' ? 'default' : 'ghost'}
                  onClick={() => setCurrentView('desktop')}
                >
                  <Monitor className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant={currentView === 'tablet' ? 'default' : 'ghost'}
                  onClick={() => setCurrentView('tablet')}
                >
                  <Tablet className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant={currentView === 'mobile' ? 'default' : 'ghost'}
                  onClick={() => setCurrentView('mobile')}
                >
                  <Smartphone className="w-4 h-4" />
                </Button>
              </div>
              
              <Button
                size="sm"
                variant={previewMode ? 'default' : 'outline'}
                onClick={() => setPreviewMode(!previewMode)}
              >
                <Eye className="w-4 h-4 mr-2" />
                {previewMode ? 'Edit' : 'Preview'}
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <Undo className="w-4 h-4 mr-2" />
              Undo
            </Button>
            <Button size="sm" variant="outline">
              <Redo className="w-4 h-4 mr-2" />
              Redo
            </Button>
            <Button size="sm" className="bg-green-600 hover:bg-green-700">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Play className="w-4 h-4 mr-2" />
              Deploy
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Editor Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Component Library */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Components</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="layout" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="layout">Layout</TabsTrigger>
                <TabsTrigger value="content">Content</TabsTrigger>
              </TabsList>
              
              <TabsContent value="layout" className="space-y-2">
                {['Header', 'Hero Section', 'Grid Layout', 'Sidebar', 'Footer'].map((component) => (
                  <div key={component} 
                       className="p-3 border rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
                    <p className="text-sm font-medium">{component}</p>
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="content" className="space-y-2">
                {['Text Block', 'Image', 'Button', 'Form', 'Chart'].map((component) => (
                  <div key={component} 
                       className="p-3 border rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
                    <p className="text-sm font-medium">{component}</p>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Canvas */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              Canvas - {currentView.charAt(0).toUpperCase() + currentView.slice(1)} View
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`border-2 border-dashed border-slate-300 rounded-lg bg-slate-50 ${
              currentView === 'mobile' ? 'max-w-sm mx-auto' : 
              currentView === 'tablet' ? 'max-w-md mx-auto' : 'w-full'
            }`} style={{ minHeight: '400px' }}>
              <div className="p-4 space-y-4">
                {mockComponents.map((component) => (
                  <div key={component.id} 
                       className="p-4 bg-white border border-slate-200 rounded-lg hover:border-purple-300 cursor-pointer transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{component.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {component.type}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Properties Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Properties
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Background Color</label>
              <div className="flex gap-2 mt-1">
                {['#ffffff', '#f8fafc', '#e2e8f0', '#cbd5e1'].map((color) => (
                  <div key={color} 
                       className="w-8 h-8 rounded border cursor-pointer hover:scale-110 transition-transform"
                       style={{ backgroundColor: color }} />
                ))}
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium">Typography</label>
              <div className="space-y-2 mt-1">
                <select className="w-full p-2 border rounded">
                  <option>Inter</option>
                  <option>Roboto</option>
                  <option>Open Sans</option>
                </select>
                <select className="w-full p-2 border rounded">
                  <option>16px</option>
                  <option>18px</option>
                  <option>20px</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium">Spacing</label>
              <div className="grid grid-cols-2 gap-2 mt-1">
                <input type="number" placeholder="Padding" className="p-2 border rounded text-sm" />
                <input type="number" placeholder="Margin" className="p-2 border rounded text-sm" />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium">Accessibility</label>
              <div className="space-y-2 mt-1">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">High Contrast</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Dyslexia Friendly</span>
                </label>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
