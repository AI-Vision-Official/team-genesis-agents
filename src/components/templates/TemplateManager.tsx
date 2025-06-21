
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  FileText, 
  Download, 
  Upload, 
  Plus, 
  Search, 
  Mic, 
  Home, 
  Briefcase, 
  GraduationCap, 
  BookOpen, 
  Shield, 
  Zap,
  Settings,
  Eye,
  Edit,
  Copy,
  Trash2
} from 'lucide-react';
import { TemplateBuilder } from './TemplateBuilder';
import { TemplateLibrary } from './TemplateLibrary';
import { VoiceTemplateCreator } from './VoiceTemplateCreator';
import { TemplateExporter } from './TemplateExporter';

export const TemplateManager = () => {
  const [activeTemplate, setActiveTemplate] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const templateCategories = [
    {
      id: 'personal',
      name: 'Personal Use',
      description: 'Planners, budgets, trackers, emergency cards',
      icon: Home,
      color: 'bg-blue-500',
      templates: 24
    },
    {
      id: 'business',
      name: 'Business',
      description: 'Invoices, contracts, NDAs, client communications',
      icon: Briefcase,
      color: 'bg-purple-500',
      templates: 18
    },
    {
      id: 'education',
      name: 'Education',
      description: 'Study planners, note structures, goal trackers',
      icon: GraduationCap,
      color: 'bg-green-500',
      templates: 15
    },
    {
      id: 'publishing',
      name: 'Publishing',
      description: 'Book layouts, social posts, lyric formatting',
      icon: BookOpen,
      color: 'bg-orange-500',
      templates: 21
    },
    {
      id: 'emergency',
      name: 'Disaster Tools',
      description: 'Evacuation plans, emergency cards, checklists',
      icon: Shield,
      color: 'bg-red-500',
      templates: 12
    },
    {
      id: 'ai-prompts',
      name: 'AI Prompt Templates',
      description: 'Reusable prompt shells for creative generation',
      icon: Zap,
      color: 'bg-cyan-500',
      templates: 8
    }
  ];

  const featuredTemplates = [
    {
      id: 'monthly-budget',
      title: 'Monthly Budget Planner',
      category: 'Personal Use',
      description: 'Comprehensive budget tracker with AI-assisted categorization',
      lastModified: '2 days ago',
      usage: 156
    },
    {
      id: 'invoice-generator',
      title: 'Professional Invoice',
      category: 'Business',
      description: 'Auto-calculating invoice with tax support',
      lastModified: '1 week ago',
      usage: 89
    },
    {
      id: 'emergency-card',
      title: 'ICE Emergency Card',
      category: 'Disaster Tools',
      description: 'In-case-of-emergency contact and medical info',
      lastModified: '3 days ago',
      usage: 67
    },
    {
      id: 'lyric-formatter',
      title: 'Gothic Lyric Template',
      category: 'Publishing',
      description: 'Structured template for dark poetry and lyrics',
      lastModified: '5 hours ago',
      usage: 43
    }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">🧾 Template Creation Toolkit</h2>
          <p className="text-gray-600 mt-1">
            Generate, edit, and reuse smart templates for any task with AI assistance
          </p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Template
          </Button>
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600">Total Templates</p>
                <p className="text-2xl font-bold text-blue-700">98</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-50 to-green-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600">Used This Month</p>
                <p className="text-2xl font-bold text-green-700">247</p>
              </div>
              <Eye className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-50 to-purple-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600">AI Generated</p>
                <p className="text-2xl font-bold text-purple-700">34</p>
              </div>
              <Zap className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-orange-50 to-orange-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600">Voice Created</p>
                <p className="text-2xl font-bold text-orange-700">12</p>
              </div>
              <Mic className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Template Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templateCategories.map((category) => (
          <Card 
            key={category.id} 
            className="cursor-pointer hover:shadow-lg transition-shadow border-l-4"
            style={{ borderLeftColor: category.color.replace('bg-', '').replace('-500', '') }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${category.color} text-white`}>
                  <category.icon className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle className="text-base">{category.name}</CardTitle>
                  <Badge variant="secondary" className="text-xs mt-1">
                    {category.templates} templates
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>{category.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Featured Templates */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Featured Templates</CardTitle>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64"
              />
              <Button variant="outline" size="sm">
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {featuredTemplates.map((template) => (
              <div key={template.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <h4 className="font-medium">{template.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <Badge variant="outline" className="text-xs">
                      {template.category}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      Used {template.usage} times • Modified {template.lastModified}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline">
                    <Copy className="w-4 h-4 mr-2" />
                    Clone
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="builder">Template Builder</TabsTrigger>
          <TabsTrigger value="library">Template Library</TabsTrigger>
          <TabsTrigger value="voice">Voice Creator</TabsTrigger>
          <TabsTrigger value="export">Export & Share</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {renderOverview()}
        </TabsContent>

        <TabsContent value="builder">
          <TemplateBuilder activeTemplate={activeTemplate} />
        </TabsContent>

        <TabsContent value="library">
          <TemplateLibrary categories={templateCategories} />
        </TabsContent>

        <TabsContent value="voice">
          <VoiceTemplateCreator />
        </TabsContent>

        <TabsContent value="export">
          <TemplateExporter />
        </TabsContent>
      </Tabs>
    </div>
  );
};
