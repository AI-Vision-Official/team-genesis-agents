
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Palette, Video, Image, Mic, Sparkles, Play, Star } from 'lucide-react';

export const CreativeStudio = () => {
  const creativeProjects = [
    {
      id: '1',
      title: 'AR Brand Experience',
      type: 'Interactive',
      status: 'In Production',
      platform: 'Instagram/TikTok',
      innovationScore: 95,
      emotionalImpact: 92,
      description: 'Immersive AR filter that transforms user environment into brand story'
    },
    {
      id: '2',
      title: 'AI-Generated Video Series',
      type: 'Video Content',
      status: 'Concept',
      platform: 'YouTube/LinkedIn',
      innovationScore: 88,
      emotionalImpact: 85,
      description: 'Personalized video content generated in real-time based on viewer preferences'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Production': return 'bg-blue-100 text-blue-800';
      case 'Concept': return 'bg-purple-100 text-purple-800';
      case 'Review': return 'bg-yellow-100 text-yellow-800';
      case 'Published': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Creative Studio</h2>
          <p className="text-slate-600">Breakthrough content that breaks traditional molds</p>
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
          <Sparkles className="w-4 h-4 mr-2" />
          New Creative Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4 text-center">
            <Video className="w-8 h-8 mx-auto mb-2 text-purple-600" />
            <h3 className="font-medium">Video Content</h3>
            <p className="text-sm text-slate-600">Interactive & Immersive</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200">
          <CardContent className="p-4 text-center">
            <Image className="w-8 h-8 mx-auto mb-2 text-pink-600" />
            <h3 className="font-medium">Visual Design</h3>
            <p className="text-sm text-slate-600">AI-Enhanced Graphics</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4 text-center">
            <Mic className="w-8 h-8 mx-auto mb-2 text-orange-600" />
            <h3 className="font-medium">Audio Experiences</h3>
            <p className="text-sm text-slate-600">Podcasts & Voice</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4 text-center">
            <Sparkles className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <h3 className="font-medium">AR/VR Content</h3>
            <p className="text-sm text-slate-600">Experiential Marketing</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6">
        {creativeProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="w-5 h-5 text-purple-600" />
                    {project.title}
                  </CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </div>
                <Badge className={getStatusColor(project.status)}>
                  {project.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Platform: {project.platform}</span>
                <span className="text-sm">Type: {project.type}</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>Innovation Score</span>
                    <span>{project.innovationScore}/100</span>
                  </div>
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(project.innovationScore / 20)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>Emotional Impact</span>
                    <span>{project.emotionalImpact}/100</span>
                  </div>
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(project.emotionalImpact / 20)
                            ? 'text-red-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                  <Play className="w-4 h-4 mr-2" />
                  Preview
                </Button>
                <Button size="sm" variant="outline">
                  Edit Project
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
