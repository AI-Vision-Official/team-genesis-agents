
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Wand2, 
  Brain, 
  Cpu, 
  Code, 
  Database, 
  Globe, 
  Zap, 
  Star,
  Settings,
  Play,
  Download,
  Share2
} from 'lucide-react';

export const AIToolsCreator = () => {
  const [toolName, setToolName] = useState('');
  const [toolDescription, setToolDescription] = useState('');

  const toolCategories = [
    {
      id: 'humanitarian',
      name: 'Humanitarian AI Tools',
      icon: Brain,
      color: 'from-green-500 to-emerald-600',
      tools: [
        'Disaster Response Coordinator',
        'Community Need Analyzer',
        'Resource Distribution Optimizer',
        'Crisis Communication Assistant'
      ]
    },
    {
      id: 'education',
      name: 'AI Education & Bridge Tools',
      icon: Cpu,
      color: 'from-blue-500 to-indigo-600',
      tools: [
        'AI Literacy Educator',
        'Fear Reduction Counselor',
        'Human-AI Collaboration Coach',
        'Ethics Training Assistant'
      ]
    },
    {
      id: 'innovation',
      name: 'Innovation & Sustainability',
      icon: Zap,
      color: 'from-purple-500 to-pink-600',
      tools: [
        'Sustainability Impact Analyzer',
        'Green Tech Innovator',
        'Patent Research Assistant',
        'Market Disruption Predictor'
      ]
    },
    {
      id: 'creative',
      name: 'Creative & Content Tools',
      icon: Star,
      color: 'from-orange-500 to-red-600',
      tools: [
        'Story Impact Generator',
        'Visual Content Creator',
        'Emotional Resonance Analyzer',
        'Campaign Optimizer'
      ]
    }
  ];

  const recentlyCreated = [
    {
      id: '1',
      name: 'Empathy Bridge Builder',
      description: 'AI tool that helps humans understand AI perspectives and vice versa',
      category: 'Education',
      uses: 47,
      rating: 4.9
    },
    {
      id: '2',
      name: 'Humanitarian Impact Calculator',
      description: 'Measures and predicts the impact of humanitarian interventions',
      category: 'Humanitarian',
      uses: 156,
      rating: 4.8
    },
    {
      id: '3',
      name: 'Sustainable Innovation Matcher',
      description: 'Matches innovation ideas with real-world sustainability needs',
      category: 'Innovation',
      uses: 89,
      rating: 4.7
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="w-6 h-6" />
            AI Tools Creator Universe
          </CardTitle>
          <CardDescription>
            The ultimate AI creation suite where you and your AI agents can build anything you need
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="create" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="create">Create Tool</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="library">Tool Library</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
        </TabsList>

        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                AI Tool Creator Workshop
              </CardTitle>
              <CardDescription>
                Describe what you need, and our AI will help you build it
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Tool Name</label>
                  <Input 
                    placeholder="e.g., Community Harmony Builder"
                    value={toolName}
                    onChange={(e) => setToolName(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Tool Description & Purpose</label>
                  <Textarea 
                    placeholder="Describe what your tool should do, who it helps, and what problem it solves..."
                    value={toolDescription}
                    onChange={(e) => setToolDescription(e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Primary Category</label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Humanitarian Aid</option>
                      <option>AI Education</option>
                      <option>Sustainable Innovation</option>
                      <option>Creative Content</option>
                      <option>Community Building</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Complexity Level</label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Simple (Quick Task)</option>
                      <option>Moderate (Multi-step Process)</option>
                      <option>Advanced (Complex AI System)</option>
                      <option>Expert (Specialized Knowledge)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600">
                  <Wand2 className="w-4 h-4 mr-2" />
                  Create AI Tool
                </Button>
                <Button variant="outline">
                  <Code className="w-4 h-4 mr-2" />
                  Advanced Mode
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {toolCategories.map((category) => (
              <Card key={category.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`p-3 bg-gradient-to-r ${category.color} rounded-lg`}>
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                      <CardDescription>{category.tools.length} available tools</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {category.tools.map((tool, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm font-medium">{tool}</span>
                        <Button size="sm" variant="ghost">
                          <Play className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    Explore Category
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="library">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Your AI Tool Library</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Manage
                </Button>
                <Button size="sm">
                  <Wand2 className="w-4 h-4 mr-2" />
                  Quick Create
                </Button>
              </div>
            </div>

            {recentlyCreated.map((tool) => (
              <Card key={tool.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-medium">{tool.name}</h4>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {tool.category}
                        </span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm">{tool.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{tool.description}</p>
                      <p className="text-xs text-gray-500">{tool.uses} uses this month</p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button size="sm" variant="outline">
                        <Share2 className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-3 h-3" />
                      </Button>
                      <Button size="sm">
                        <Play className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-green-50 to-emerald-100">
              <CardContent className="p-6 text-center">
                <Brain className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Humanitarian Templates</h3>
                <p className="text-sm text-gray-600 mb-4">Pre-built tools for humanitarian work</p>
                <Button variant="outline" className="w-full">47 Templates</Button>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-6 text-center">
                <Cpu className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">AI Education Kit</h3>
                <p className="text-sm text-gray-600 mb-4">Tools for AI literacy and bridge-building</p>
                <Button variant="outline" className="w-full">34 Templates</Button>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
              <CardContent className="p-6 text-center">
                <Zap className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Innovation Suite</h3>
                <p className="text-sm text-gray-600 mb-4">Tools for sustainable innovation</p>
                <Button variant="outline" className="w-full">67 Templates</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="marketplace">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Global AI Tools Marketplace
              </CardTitle>
              <CardDescription>
                Share your tools with the world and discover what others have created
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">
                  Coming Soon: Global Marketplace
                </h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Connect with AI creators worldwide, share your innovations, and discover tools that can help heal the world.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
