
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Palette, 
  ImageIcon, 
  Video, 
  Music, 
  Type, 
  Sparkles, 
  Wand2,
  Download,
  Share2,
  Heart
} from 'lucide-react';

export const CreativeToolsCenter = () => {
  const [activeProject, setActiveProject] = useState(null);

  const creativeTools = [
    {
      id: 'visual',
      name: 'Visual Content Creator',
      icon: ImageIcon,
      description: 'AI-powered graphics, illustrations, and visual storytelling',
      features: ['Logo Design', 'Social Media Graphics', 'Infographics', 'Brand Assets']
    },
    {
      id: 'video',
      name: 'Video Production Suite',
      icon: Video,
      description: 'Create compelling videos for humanitarian campaigns',
      features: ['Storytelling Videos', 'Educational Content', 'Campaign Materials', 'Documentary Style']
    },
    {
      id: 'audio',
      name: 'Audio & Music Studio',
      icon: Music,
      description: 'Compose music and create audio content',
      features: ['Background Music', 'Podcast Intros', 'Healing Soundscapes', 'Voice Synthesis']
    },
    {
      id: 'content',
      name: 'Content Writing Engine',
      icon: Type,
      description: 'Generate inspiring and impactful written content',
      features: ['Blog Posts', 'Social Content', 'Press Releases', 'Grant Proposals']
    }
  ];

  const recentProjects = [
    {
      id: '1',
      title: 'Heal the World Campaign Graphics',
      type: 'Visual Design',
      status: 'Complete',
      impact: 'High'
    },
    {
      id: '2',
      title: 'AI Education Video Series',
      type: 'Video Content',
      status: 'In Progress',
      impact: 'Medium'
    },
    {
      id: '3',
      title: 'Community Unity Soundtrack',
      type: 'Audio Production',
      status: 'Complete',
      impact: 'High'
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-6 h-6" />
            Creative Tools Center
          </CardTitle>
          <CardDescription>
            AI-powered creative suite for impactful content creation
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="tools" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="tools">Creative Tools</TabsTrigger>
          <TabsTrigger value="projects">Active Projects</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
        </TabsList>

        <TabsContent value="tools">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {creativeTools.map((tool) => (
              <Card key={tool.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg">
                      <tool.icon className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{tool.name}</CardTitle>
                      <CardDescription>{tool.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Key Features:</h4>
                    <ul className="space-y-1">
                      {tool.features.map((feature, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                          <Sparkles className="w-3 h-3 text-purple-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600">
                    <Wand2 className="w-4 h-4 mr-2" />
                    Launch {tool.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="projects">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Recent Creative Projects</h3>
              <Button>
                <Wand2 className="w-4 h-4 mr-2" />
                New Project
              </Button>
            </div>
            
            {recentProjects.map((project) => (
              <Card key={project.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{project.title}</h4>
                      <p className="text-sm text-gray-600">{project.type}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        project.status === 'Complete' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {project.status}
                      </span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Share2 className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="w-3 h-3" />
                        </Button>
                      </div>
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
                <Heart className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Humanitarian Templates</h3>
                <p className="text-sm text-gray-600 mb-4">Ready-to-use designs for humanitarian campaigns</p>
                <Button variant="outline" className="w-full">Browse Templates</Button>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-6 text-center">
                <Sparkles className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">AI Education Assets</h3>
                <p className="text-sm text-gray-600 mb-4">Educational materials about AI and technology</p>
                <Button variant="outline" className="w-full">Browse Templates</Button>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
              <CardContent className="p-6 text-center">
                <Wand2 className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Innovation Showcase</h3>
                <p className="text-sm text-gray-600 mb-4">Templates for presenting disruptive innovations</p>
                <Button variant="outline" className="w-full">Browse Templates</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="gallery">
          <Card>
            <CardHeader>
              <CardTitle>Creative Gallery</CardTitle>
              <CardDescription>Showcase of your team's creative achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Palette className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">
                  Your Creative Masterpieces
                </h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  A beautiful gallery showcasing all the impactful content created by your AI creative team.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
