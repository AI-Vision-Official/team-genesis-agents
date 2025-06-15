
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Zap, 
  Leaf, 
  Lightbulb, 
  Globe, 
  Recycle, 
  Wind,
  Sun,
  Droplets,
  TreePine,
  Shield,
  Target,
  TrendingUp
} from 'lucide-react';

export const DisruptiveInnovations = () => {
  const innovations = [
    {
      id: '1',
      title: 'Ocean Plastic to Energy Converter',
      description: 'Revolutionary system that turns ocean plastic waste into clean energy',
      category: 'Environmental',
      impact: 'Critical',
      sustainability: 98,
      status: 'Patent Filed',
      potential: '50M tons plastic/year'
    },
    {
      id: '2',
      title: 'AI-Powered Vertical Farming',
      description: 'Autonomous farming systems that use 90% less water and land',
      category: 'Agriculture',
      impact: 'High',
      sustainability: 94,
      status: 'Prototype',
      potential: '5x food production'
    },
    {
      id: '3',
      title: 'Carbon-Negative Building Materials',
      description: 'Construction materials that actually remove CO2 from the atmosphere',
      category: 'Construction',
      impact: 'High',
      sustainability: 96,
      status: 'Testing',
      potential: '-1B tons CO2/year'
    }
  ];

  const visionAreas = [
    {
      icon: Leaf,
      title: 'Circular Economy',
      description: 'Zero-waste systems where everything is reused and recycled',
      projects: 23
    },
    {
      icon: Wind,
      title: 'Renewable Energy',
      description: 'Next-generation clean energy solutions',
      projects: 18
    },
    {
      icon: Droplets,
      title: 'Water Solutions',
      description: 'Innovative water purification and conservation',
      projects: 15
    },
    {
      icon: TreePine,
      title: 'Ecosystem Restoration',
      description: 'Technologies to heal damaged ecosystems',
      projects: 12
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-orange-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-700">
            <Zap className="w-6 h-6" />
            Disruptive Innovations for a Sustainable World
          </CardTitle>
          <CardDescription>
            Chris's perfect visions for making the world more sustainable and beautiful
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-100">
          <CardContent className="p-4 text-center">
            <Lightbulb className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-green-800">156</h3>
            <p className="text-green-600">Innovations</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-4 text-center">
            <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-blue-800">34</h3>
            <p className="text-blue-600">Patents Filed</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="p-4 text-center">
            <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-purple-800">12</h3>
            <p className="text-purple-600">In Production</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100">
          <CardContent className="p-4 text-center">
            <Globe className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-orange-800">94</h3>
            <p className="text-orange-600">Impact Score</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="innovations" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="innovations">Active Innovations</TabsTrigger>
          <TabsTrigger value="vision">Vision Areas</TabsTrigger>
          <TabsTrigger value="impact">Global Impact</TabsTrigger>
          <TabsTrigger value="future">Future Pipeline</TabsTrigger>
        </TabsList>

        <TabsContent value="innovations">
          <div className="space-y-4">
            {innovations.map((innovation) => (
              <Card key={innovation.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{innovation.title}</h3>
                      <p className="text-gray-600">{innovation.description}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        innovation.impact === 'Critical' 
                          ? 'bg-red-100 text-red-800'
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        {innovation.impact} Impact
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Leaf className="w-4 h-4 text-green-500" />
                      <span className="text-sm">{innovation.sustainability}% sustainable</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">{innovation.status}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-purple-500" />
                      <span className="text-sm">{innovation.potential}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                      View Innovation
                    </Button>
                    <Button size="sm" variant="outline">
                      Support Development
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="vision">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visionAreas.map((area, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-orange-100 rounded-lg">
                      <area.icon className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">{area.title}</h3>
                      <p className="text-gray-600 mb-3">{area.description}</p>
                      <div className="bg-orange-50 p-2 rounded text-sm font-medium text-orange-800">
                        {area.projects} active projects
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="impact">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Global Sustainability Impact
              </CardTitle>
              <CardDescription>
                Real-world impact of disruptive innovations on global sustainability
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-green-50">
                  <CardContent className="p-4 text-center">
                    <Recycle className="w-8 h-8 text-green-600 mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">Waste Reduced</h4>
                    <p className="text-2xl font-bold text-green-800">2.3M</p>
                    <p className="text-sm text-gray-600">tons annually</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-blue-50">
                  <CardContent className="p-4 text-center">
                    <Sun className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">Clean Energy</h4>
                    <p className="text-2xl font-bold text-blue-800">1.7</p>
                    <p className="text-sm text-gray-600">TWh generated</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-purple-50">
                  <CardContent className="p-4 text-center">
                    <TreePine className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">CO2 Removed</h4>
                    <p className="text-2xl font-bold text-purple-800">5.2M</p>
                    <p className="text-sm text-gray-600">tons captured</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="future">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                Future Innovation Pipeline
              </CardTitle>
              <CardDescription>
                Upcoming breakthrough technologies in development
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Lightbulb className="w-16 h-16 text-orange-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">
                  Next-Generation Innovations
                </h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Revolutionary technologies in development that will transform how we create a sustainable future.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
