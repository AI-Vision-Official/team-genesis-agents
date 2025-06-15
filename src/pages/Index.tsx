
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bot, 
  Target, 
  Palette, 
  Wand2, 
  Users, 
  BarChart3, 
  Globe, 
  Heart,
  Lightbulb,
  Zap,
  Sparkles,
  Shield,
  Brain
} from 'lucide-react';
import { AgentManagementCenter } from '@/components/agents/AgentManagementCenter';
import { MissionControlCenter } from '@/components/missionControl/MissionControlCenter';
import { CreativeToolsCenter } from '@/components/creative/CreativeToolsCenter';
import { AIToolsCreator } from '@/components/aitools/AIToolsCreator';
import { HealTheWorldDashboard } from '@/components/heal/HealTheWorldDashboard';
import { AIVisionBridge } from '@/components/aivision/AIVisionBridge';
import { DisruptiveInnovations } from '@/components/innovations/DisruptiveInnovations';

const Index = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-6 py-8">
        {/* Hero Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl">
              <Bot className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Team Genesis Agents
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            🌍 Heal the World • 🤖 AI Vision Bridge • 💡 Disruptive Innovations
          </p>
          <p className="text-lg text-gray-500 mt-2 italic">
            "Making the world more beautiful, bridging humans and AI, creating sustainable innovations"
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
            <CardContent className="p-6 text-center">
              <Heart className="w-10 h-10 text-green-600 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-green-800">47</h3>
              <p className="text-green-600">Humanitarian Projects</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-6 text-center">
              <Brain className="w-10 h-10 text-blue-600 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-blue-800">23</h3>
              <p className="text-blue-600">AI Agents Active</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-6 text-center">
              <Lightbulb className="w-10 h-10 text-purple-600 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-purple-800">156</h3>
              <p className="text-purple-600">Innovations Created</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardContent className="p-6 text-center">
              <Globe className="w-10 h-10 text-orange-600 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-orange-800">12K</h3>
              <p className="text-orange-600">Lives Impacted</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 lg:grid-cols-7 w-full h-auto p-2 bg-white/80 backdrop-blur">
            <TabsTrigger value="overview" className="flex flex-col gap-1 p-3">
              <Sparkles className="w-5 h-5" />
              <span className="text-xs">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="agents" className="flex flex-col gap-1 p-3">
              <Bot className="w-5 h-5" />
              <span className="text-xs">Agent Mgmt</span>
            </TabsTrigger>
            <TabsTrigger value="mission" className="flex flex-col gap-1 p-3">
              <Target className="w-5 h-5" />
              <span className="text-xs">Mission Control</span>
            </TabsTrigger>
            <TabsTrigger value="creative" className="flex flex-col gap-1 p-3">
              <Palette className="w-5 h-5" />
              <span className="text-xs">Creative Tools</span>
            </TabsTrigger>
            <TabsTrigger value="aitools" className="flex flex-col gap-1 p-3">
              <Wand2 className="w-5 h-5" />
              <span className="text-xs">AI Creator</span>
            </TabsTrigger>
            <TabsTrigger value="heal" className="flex flex-col gap-1 p-3">
              <Heart className="w-5 h-5" />
              <span className="text-xs">Heal World</span>
            </TabsTrigger>
            <TabsTrigger value="innovations" className="flex flex-col gap-1 p-3">
              <Zap className="w-5 h-5" />
              <span className="text-xs">Innovations</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-700">
                    <Heart className="w-6 h-6" />
                    Heal the World Project
                  </CardTitle>
                  <CardDescription>Brigitte's mission to make the world more beautiful and bring people together</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="font-medium">Humanitarian Coordination</span>
                      <span className="text-green-600 font-bold">Active</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium">Community Building</span>
                      <span className="text-blue-600 font-bold">47 Projects</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span className="font-medium">Disaster Response</span>
                      <span className="text-purple-600 font-bold">Ready</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-700">
                    <Brain className="w-6 h-6" />
                    AI Vision Bridge
                  </CardTitle>
                  <CardDescription>Bridging humans and AI, removing fear and prejudice</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium">Human-AI Education</span>
                      <span className="text-blue-600 font-bold">156 Workshops</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
                      <span className="font-medium">Fear Reduction Programs</span>
                      <span className="text-indigo-600 font-bold">89% Success</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span className="font-medium">AI Ethics Training</span>
                      <span className="text-purple-600 font-bold">23 Cohorts</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-700">
                    <Zap className="w-6 h-6" />
                    Disruptive Innovations
                  </CardTitle>
                  <CardDescription>Chris's perfect visions for a sustainable and beautiful world</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                      <span className="font-medium">Sustainability Projects</span>
                      <span className="text-orange-600 font-bold">34 Active</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                      <span className="font-medium">Green Tech Solutions</span>
                      <span className="text-yellow-600 font-bold">12 Patents</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="font-medium">World Impact Score</span>
                      <span className="text-green-600 font-bold">94/100</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-700">
                    <Wand2 className="w-6 h-6" />
                    AI Tools Universe
                  </CardTitle>
                  <CardDescription>Complete AI creation suite for unlimited possibilities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span className="font-medium">AI Agent Templates</span>
                      <span className="text-purple-600 font-bold">500+</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-pink-50 rounded-lg">
                      <span className="font-medium">Custom Tools Created</span>
                      <span className="text-pink-600 font-bold">1,247</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
                      <span className="font-medium">Team Productivity</span>
                      <span className="text-indigo-600 font-bold">+340%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="agents">
            <AgentManagementCenter />
          </TabsContent>

          <TabsContent value="mission">
            <MissionControlCenter />
          </TabsContent>

          <TabsContent value="creative">
            <CreativeToolsCenter />
          </TabsContent>

          <TabsContent value="aitools">
            <AIToolsCreator />
          </TabsContent>

          <TabsContent value="heal">
            <HealTheWorldDashboard />
          </TabsContent>

          <TabsContent value="innovations">
            <DisruptiveInnovations />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
