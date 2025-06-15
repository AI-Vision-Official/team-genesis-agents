
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Heart, 
  Users, 
  Globe, 
  HandHeart, 
  Lightbulb, 
  Shield,
  Compass,
  Star,
  TrendingUp,
  MapPin
} from 'lucide-react';

export const HealTheWorldDashboard = () => {
  const projects = [
    {
      id: '1',
      title: 'Community Unity Bridge',
      description: 'Bringing divided communities together through shared experiences',
      region: 'Global',
      impact: 'High',
      people: 12500,
      status: 'Active'
    },
    {
      id: '2',
      title: 'Disaster Response Network',
      description: 'Coordinating humanitarian aid in crisis zones',
      region: 'Southeast Asia',
      impact: 'Critical',
      people: 45000,
      status: 'Emergency'
    },
    {
      id: '3',
      title: 'Digital Inclusion Initiative',
      description: 'Bridging the digital divide in underserved communities',
      region: 'Africa',
      impact: 'Medium',
      people: 8700,
      status: 'Active'
    }
  ];

  const initiatives = [
    {
      icon: HandHeart,
      title: 'Humanitarian Coordination',
      description: 'Real-time crisis response and aid distribution',
      metrics: '45K lives impacted'
    },
    {
      icon: Users,
      title: 'Community Building',
      description: 'Fostering connections and understanding between people',
      metrics: '234 communities united'
    },
    {
      icon: Shield,
      title: 'Protection & Safety',
      description: 'Ensuring safety and security for vulnerable populations',
      metrics: '15K people protected'
    },
    {
      icon: Lightbulb,
      title: 'Education & Awareness',
      description: 'Spreading knowledge and building awareness',
      metrics: '67K people educated'
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-green-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-700">
            <Heart className="w-6 h-6" />
            Heal the World Project Dashboard
          </CardTitle>
          <CardDescription>
            Brigitte's mission to make the world more beautiful and bring people together
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-100">
          <CardContent className="p-4 text-center">
            <Heart className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-green-800">47</h3>
            <p className="text-green-600">Active Projects</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-blue-800">127K</h3>
            <p className="text-blue-600">Lives Touched</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="p-4 text-center">
            <Globe className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-purple-800">67</h3>
            <p className="text-purple-600">Countries Reached</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100">
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-orange-800">89%</h3>
            <p className="text-orange-600">Success Rate</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="projects" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="projects">Active Projects</TabsTrigger>
          <TabsTrigger value="initiatives">Core Initiatives</TabsTrigger>
          <TabsTrigger value="impact">Global Impact</TabsTrigger>
          <TabsTrigger value="collaboration">Collaboration Hub</TabsTrigger>
        </TabsList>

        <TabsContent value="projects">
          <div className="space-y-4">
            {projects.map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{project.title}</h3>
                      <p className="text-gray-600">{project.description}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        project.status === 'Emergency' 
                          ? 'bg-red-100 text-red-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{project.region}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{project.people.toLocaleString()} people</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{project.impact} Impact</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      View Details
                    </Button>
                    <Button size="sm" variant="outline">
                      Support Project
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="initiatives">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {initiatives.map((initiative, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <initiative.icon className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">{initiative.title}</h3>
                      <p className="text-gray-600 mb-3">{initiative.description}</p>
                      <div className="bg-green-50 p-2 rounded text-sm font-medium text-green-800">
                        {initiative.metrics}
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
                Global Impact Visualization
              </CardTitle>
              <CardDescription>
                Real-time view of how the Heal the World project is making a difference
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Globe className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">
                  Interactive World Impact Map
                </h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  See real-time updates of projects, communities helped, and lives touched across the globe.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="collaboration">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Compass className="w-5 h-5" />
                Global Collaboration Network
              </CardTitle>
              <CardDescription>
                Connect with like-minded individuals and organizations worldwide
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-blue-50">
                  <CardContent className="p-4 text-center">
                    <Users className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">Community Leaders</h4>
                    <p className="text-sm text-gray-600 mb-3">Connect with local community champions</p>
                    <Button size="sm" variant="outline" className="w-full">Join Network</Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-green-50">
                  <CardContent className="p-4 text-center">
                    <HandHeart className="w-8 h-8 text-green-600 mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">NGO Partners</h4>
                    <p className="text-sm text-gray-600 mb-3">Collaborate with humanitarian organizations</p>
                    <Button size="sm" variant="outline" className="w-full">Partner Up</Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-purple-50">
                  <CardContent className="p-4 text-center">
                    <Lightbulb className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">Innovation Hubs</h4>
                    <p className="text-sm text-gray-600 mb-3">Work with tech innovators for good</p>
                    <Button size="sm" variant="outline" className="w-full">Innovate</Button>
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
