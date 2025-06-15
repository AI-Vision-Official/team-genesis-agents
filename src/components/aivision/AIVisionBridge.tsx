
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  Users, 
  Heart, 
  Shield, 
  Lightbulb, 
  BookOpen,
  Compass,
  Target,
  MessageSquare,
  TrendingUp
} from 'lucide-react';

export const AIVisionBridge = () => {
  const programs = [
    {
      id: '1',
      title: 'AI Literacy Workshops',
      description: 'Interactive sessions demystifying AI for everyone',
      participants: 1250,
      success: 94,
      status: 'Active'
    },
    {
      id: '2',
      title: 'Fear Reduction Programs',
      description: 'Addressing concerns and building trust with AI',
      participants: 890,
      success: 89,
      status: 'Active'
    },
    {
      id: '3',
      title: 'Human-AI Collaboration Training',
      description: 'Teaching effective human-AI partnership',
      participants: 567,
      success: 92,
      status: 'Expanding'
    }
  ];

  const bridges = [
    {
      icon: Heart,
      title: 'Emotional Understanding',
      description: 'Helping humans see AI as a helpful partner, not a threat',
      impact: '89% fear reduction'
    },
    {
      icon: BookOpen,
      title: 'Education & Literacy',
      description: 'Making AI knowledge accessible to everyone',
      impact: '156 workshops delivered'
    },
    {
      icon: Shield,
      title: 'Trust & Safety',
      description: 'Building confidence in AI ethics and safety',
      impact: '94% trust increase'
    },
    {
      icon: MessageSquare,
      title: 'Open Dialogue',
      description: 'Creating spaces for honest AI conversations',
      impact: '23 community forums'
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-700">
            <Brain className="w-6 h-6" />
            AI Vision Bridge Project
          </CardTitle>
          <CardDescription>
            Bridging humans and AI, removing fear and prejudice through understanding
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-100">
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-blue-800">2,847</h3>
            <p className="text-blue-600">People Educated</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-emerald-100">
          <CardContent className="p-4 text-center">
            <Heart className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-green-800">89%</h3>
            <p className="text-green-600">Fear Reduction</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="p-4 text-center">
            <Lightbulb className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-purple-800">156</h3>
            <p className="text-purple-600">Workshops</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100">
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-orange-800">94%</h3>
            <p className="text-orange-600">Trust Increase</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="programs" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="programs">Education Programs</TabsTrigger>
          <TabsTrigger value="bridges">Bridge Building</TabsTrigger>
          <TabsTrigger value="community">Community Impact</TabsTrigger>
          <TabsTrigger value="future">Future Vision</TabsTrigger>
        </TabsList>

        <TabsContent value="programs">
          <div className="space-y-4">
            {programs.map((program) => (
              <Card key={program.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{program.title}</h3>
                      <p className="text-gray-600">{program.description}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      program.status === 'Expanding' 
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {program.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{program.participants} participants</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{program.success}% success rate</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Join Program
                    </Button>
                    <Button size="sm" variant="outline">
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="bridges">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bridges.map((bridge, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <bridge.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">{bridge.title}</h3>
                      <p className="text-gray-600 mb-3">{bridge.description}</p>
                      <div className="bg-blue-50 p-2 rounded text-sm font-medium text-blue-800">
                        {bridge.impact}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="community">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Community Impact Stories
              </CardTitle>
              <CardDescription>
                Real stories of transformation and understanding
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border-l-4 border-l-green-400 pl-4">
                  <h4 className="font-semibold text-green-800">Maria, Teacher from Spain</h4>
                  <p className="text-gray-600 italic">
                    "I was terrified of AI replacing teachers. Now I use AI as my teaching assistant, 
                    and my students are learning better than ever. Brigitte's workshop changed everything."
                  </p>
                </div>
                
                <div className="border-l-4 border-l-blue-400 pl-4">
                  <h4 className="font-semibold text-blue-800">David, Small Business Owner</h4>
                  <p className="text-gray-600 italic">
                    "The AI literacy program helped me understand how to use AI ethically in my business. 
                    I'm no longer afraid - I'm empowered."
                  </p>
                </div>
                
                <div className="border-l-4 border-l-purple-400 pl-4">
                  <h4 className="font-semibold text-purple-800">Community Center, Kenya</h4>
                  <p className="text-gray-600 italic">
                    "The bridging workshop brought our whole community together. Young and old, 
                    everyone now understands AI can help us solve local problems."
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="future">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Compass className="w-5 h-5" />
                Future Vision: Human-AI Harmony
              </CardTitle>
              <CardDescription>
                Building a world where humans and AI work together beautifully
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-blue-50">
                  <CardContent className="p-4 text-center">
                    <Brain className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">Universal AI Literacy</h4>
                    <p className="text-sm text-gray-600">Every person equipped with AI understanding</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-green-50">
                  <CardContent className="p-4 text-center">
                    <Heart className="w-8 h-8 text-green-600 mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">Trust & Collaboration</h4>
                    <p className="text-sm text-gray-600">Humans and AI as true partners</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-purple-50">
                  <CardContent className="p-4 text-center">
                    <Lightbulb className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">Ethical Innovation</h4>
                    <p className="text-sm text-gray-600">AI development guided by human values</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
