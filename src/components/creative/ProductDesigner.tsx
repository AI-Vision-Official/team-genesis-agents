
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Shirt, 
  BookOpen, 
  Palette, 
  Search, 
  Brain, 
  Upload,
  Download,
  Eye,
  Settings,
  Lightbulb,
  TrendingUp,
  Star,
  Zap
} from 'lucide-react';
import { MarketResearchAgent } from './product/MarketResearchAgent';
import { CreativeGeneratorStudio } from './product/CreativeGeneratorStudio';
import { MockupPreviewCenter } from './product/MockupPreviewCenter';
import { ProductExportHub } from './product/ProductExportHub';
import { AICollaborationWorkspace } from './product/AICollaborationWorkspace';
import type { CreativeAgent, AccessibilityOptions } from '@/types/creative';

interface ProductDesignerProps {
  agents: CreativeAgent[];
  settings: AccessibilityOptions;
}

export const ProductDesigner = ({ agents, settings }: ProductDesignerProps) => {
  const [activeWorkflow, setActiveWorkflow] = useState('overview');
  const [currentProject, setCurrentProject] = useState<any>(null);

  const productCategories = [
    {
      id: 'books',
      name: 'Books & Journals',
      description: 'Low-content books, healing journals, puzzle books',
      icon: BookOpen,
      color: 'bg-blue-500',
      products: 156
    },
    {
      id: 'merchandise',
      name: 'T-Shirts & Merch',
      description: 'Quote shirts, gothic designs, inspirational wear',
      icon: Shirt,
      color: 'bg-purple-500',
      products: 89
    },
    {
      id: 'printables',
      name: 'Digital Downloads',
      description: 'Printable planners, checklists, activities',
      icon: Download,
      color: 'bg-green-500',
      products: 203
    },
    {
      id: 'custom',
      name: 'Custom Products',
      description: 'Mixed media, packaging, specialized items',
      icon: Palette,
      color: 'bg-orange-500',
      products: 67
    }
  ];

  const aiWorkflows = [
    {
      id: 'autonomous',
      name: 'AI-Only Generation',
      description: 'Full automation from idea to market-ready product',
      icon: Brain,
      mode: 'ai-only'
    },
    {
      id: 'collaborative',
      name: 'AI-Human Collaboration',
      description: 'Co-creation with AI suggestions and human control',
      icon: Zap,
      mode: 'collaborative'
    },
    {
      id: 'manual',
      name: 'Human-Only Design',
      description: 'Full manual control with AI tools available',
      icon: Eye,
      mode: 'manual'
    }
  ];

  const demoProducts = [
    {
      id: 'gothic-shirts',
      title: 'Gothic "Please Hear Me" Lyric Collection',
      category: 'merchandise',
      status: 'ready',
      marketScore: 8.4,
      keywords: ['gothic', 'healing', 'poetry', 'dark academia']
    },
    {
      id: 'autism-puzzles',
      title: 'Large Print Autism-Friendly Puzzle Books',
      category: 'books',
      status: 'generating',
      marketScore: 9.1,
      keywords: ['autism', 'sensory friendly', 'large print', 'puzzles']
    },
    {
      id: 'trauma-coloring',
      title: 'Calm Coloring for Trauma Survivors',
      category: 'printables',
      status: 'research',
      marketScore: 7.8,
      keywords: ['trauma recovery', 'coloring therapy', 'mindfulness']
    }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            🎨 Product Creation Toolkit
          </h2>
          <p className={`text-gray-600 mt-1 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            From idea to market-ready products with AI-powered research and generation
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline">{agents.length} AI Agents</Badge>
          <Badge variant="outline">515 Products Created</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600">Active Projects</p>
                <p className="text-2xl font-bold text-blue-700">24</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-50 to-green-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600">Market Score Avg</p>
                <p className="text-2xl font-bold text-green-700">8.3/10</p>
              </div>
              <Star className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-50 to-purple-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600">Revenue Potential</p>
                <p className="text-2xl font-bold text-purple-700">€12.4K</p>
              </div>
              <Lightbulb className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Product Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {productCategories.map((category) => (
          <Card 
            key={category.id} 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setActiveWorkflow(category.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${category.color} text-white`}>
                  <category.icon className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle className="text-base">{category.name}</CardTitle>
                  <Badge variant="secondary" className="text-xs mt-1">
                    {category.products} created
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

      {/* AI Workflow Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            AI Workflow Modes
          </CardTitle>
          <CardDescription>
            Choose how you want to collaborate with AI agents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {aiWorkflows.map((workflow) => (
              <Button
                key={workflow.id}
                variant="outline"
                className="h-auto p-4 flex-col items-start"
                onClick={() => setActiveWorkflow('collaboration')}
              >
                <div className="flex items-center gap-2 mb-2">
                  <workflow.icon className="w-5 h-5" />
                  <span className="font-medium">{workflow.name}</span>
                </div>
                <p className="text-sm text-gray-600 text-left">{workflow.description}</p>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Demo Products */}
      <Card>
        <CardHeader>
          <CardTitle>Featured Product Ideas</CardTitle>
          <CardDescription>
            AI-generated product concepts ready for development
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {demoProducts.map((product) => (
              <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{product.title}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {product.category}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500" />
                      <span className="text-sm font-medium">{product.marketScore}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {product.keywords.map((keyword) => (
                      <Badge key={keyword} variant="secondary" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={product.status === 'ready' ? 'default' : 'outline'}
                    className="text-xs"
                  >
                    {product.status}
                  </Badge>
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
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
    <div className={`space-y-6 ${settings.minimalistUI ? 'max-w-6xl mx-auto' : ''}`}>
      <Tabs value={activeWorkflow} onValueChange={setActiveWorkflow}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="research">Research</TabsTrigger>
          <TabsTrigger value="create">Create</TabsTrigger>
          <TabsTrigger value="mockup">Mockup</TabsTrigger>
          <TabsTrigger value="export">Export</TabsTrigger>
          <TabsTrigger value="collaboration">AI Studio</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {renderOverview()}
        </TabsContent>

        <TabsContent value="research">
          <MarketResearchAgent settings={settings} />
        </TabsContent>

        <TabsContent value="create">
          <CreativeGeneratorStudio settings={settings} />
        </TabsContent>

        <TabsContent value="mockup">
          <MockupPreviewCenter settings={settings} />
        </TabsContent>

        <TabsContent value="export">
          <ProductExportHub settings={settings} />
        </TabsContent>

        <TabsContent value="collaboration">
          <AICollaborationWorkspace 
            agents={agents} 
            settings={settings}
            currentProject={currentProject}
            onProjectUpdate={setCurrentProject}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
