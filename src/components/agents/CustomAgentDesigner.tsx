
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { 
  Palette, 
  Brain, 
  Settings, 
  Zap, 
  Shield, 
  Users, 
  Target,
  Plus,
  X,
  Wand2,
  Save,
  Play
} from 'lucide-react';

interface AgentCapability {
  id: string;
  name: string;
  description: string;
  category: 'cognitive' | 'technical' | 'creative' | 'analytical' | 'communication';
}

interface AgentTemplate {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  capabilities: string[];
  defaultConfig: any;
}

export const CustomAgentDesigner = () => {
  const [agentName, setAgentName] = useState('');
  const [agentDescription, setAgentDescription] = useState('');
  const [agentType, setAgentType] = useState('');
  const [selectedCapabilities, setSelectedCapabilities] = useState<string[]>([]);
  const [autonomyLevel, setAutonomyLevel] = useState([75]);
  const [creativityLevel, setCreativityLevel] = useState([60]);
  const [learningRate, setLearningRate] = useState([50]);
  const [canSpawnAgents, setCanSpawnAgents] = useState(false);
  const [maxSubordinates, setMaxSubordinates] = useState([3]);
  const [securityClearance, setSecurityClearance] = useState('internal');
  const [customInstructions, setCustomInstructions] = useState('');

  const availableCapabilities: AgentCapability[] = [
    { id: '1', name: 'Natural Language Processing', description: 'Advanced text understanding and generation', category: 'cognitive' },
    { id: '2', name: 'Data Analysis', description: 'Statistical analysis and pattern recognition', category: 'analytical' },
    { id: '3', name: 'Creative Writing', description: 'Content creation and storytelling', category: 'creative' },
    { id: '4', name: 'Code Generation', description: 'Programming and software development', category: 'technical' },
    { id: '5', name: 'Problem Solving', description: 'Complex reasoning and solution finding', category: 'cognitive' },
    { id: '6', name: 'Image Recognition', description: 'Visual analysis and interpretation', category: 'technical' },
    { id: '7', name: 'Team Coordination', description: 'Multi-agent collaboration and management', category: 'communication' },
    { id: '8', name: 'Real-time Decision Making', description: 'Quick response to changing conditions', category: 'cognitive' },
    { id: '9', name: 'Emotional Intelligence', description: 'Understanding and responding to emotions', category: 'communication' },
    { id: '10', name: 'Security Monitoring', description: 'Threat detection and prevention', category: 'technical' }
  ];

  const agentTemplates: AgentTemplate[] = [
    {
      id: 'analyst',
      name: 'Data Analyst',
      description: 'Specialized in data processing and insights',
      icon: <Target className="w-6 h-6" />,
      capabilities: ['2', '5', '8'],
      defaultConfig: { autonomy: 80, creativity: 40, learning: 70 }
    },
    {
      id: 'creative',
      name: 'Creative Director',
      description: 'Focused on content creation and design',
      icon: <Palette className="w-6 h-6" />,
      capabilities: ['3', '6', '9'],
      defaultConfig: { autonomy: 60, creativity: 95, learning: 50 }
    },
    {
      id: 'coordinator',
      name: 'Team Coordinator',
      description: 'Manages team collaboration and workflows',
      icon: <Users className="w-6 h-6" />,
      capabilities: ['7', '8', '9'],
      defaultConfig: { autonomy: 85, creativity: 50, learning: 60 }
    },
    {
      id: 'security',
      name: 'Security Specialist',
      description: 'Monitors and protects system integrity',
      icon: <Shield className="w-6 h-6" />,
      capabilities: ['10', '8', '2'],
      defaultConfig: { autonomy: 90, creativity: 30, learning: 80 }
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'cognitive': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'technical': return 'bg-green-100 text-green-800 border-green-200';
      case 'creative': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'analytical': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'communication': return 'bg-pink-100 text-pink-800 border-pink-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const toggleCapability = (capabilityId: string) => {
    setSelectedCapabilities(prev => 
      prev.includes(capabilityId) 
        ? prev.filter(id => id !== capabilityId)
        : [...prev, capabilityId]
    );
  };

  const applyTemplate = (template: AgentTemplate) => {
    setAgentName(template.name);
    setAgentDescription(template.description);
    setAgentType(template.id);
    setSelectedCapabilities(template.capabilities);
    setAutonomyLevel([template.defaultConfig.autonomy]);
    setCreativityLevel([template.defaultConfig.creativity]);
    setLearningRate([template.defaultConfig.learning]);
  };

  const handleCreateAgent = () => {
    const newAgent = {
      name: agentName,
      description: agentDescription,
      type: agentType,
      capabilities: selectedCapabilities,
      autonomyLevel: autonomyLevel[0],
      creativityLevel: creativityLevel[0],
      learningRate: learningRate[0],
      canSpawnAgents,
      maxSubordinates: maxSubordinates[0],
      securityClearance,
      customInstructions
    };
    
    console.log('Creating new agent:', newAgent);
    // Here you would typically send this to your backend
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent flex items-center gap-3">
            <Wand2 className="w-8 h-8 text-purple-600" />
            Custom Agent Designer
          </h2>
          <p className="text-slate-600 mt-2">Create and configure specialized AI agents for your needs</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </Button>
          <Button onClick={handleCreateAgent} className="bg-gradient-to-r from-purple-600 to-blue-600">
            <Play className="w-4 h-4 mr-2" />
            Create Agent
          </Button>
        </div>
      </div>

      <Tabs defaultValue="templates" className="w-full">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="capabilities">Capabilities</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Choose a Template</CardTitle>
              <CardDescription>Start with a pre-configured agent template or build from scratch</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {agentTemplates.map((template) => (
                  <Card key={template.id} className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-purple-300" onClick={() => applyTemplate(template)}>
                    <CardContent className="p-6 text-center">
                      <div className="mb-4 flex justify-center">
                        {template.icon}
                      </div>
                      <h3 className="font-semibold mb-2">{template.name}</h3>
                      <p className="text-sm text-slate-600 mb-4">{template.description}</p>
                      <div className="flex flex-wrap gap-1 justify-center">
                        {template.capabilities.slice(0, 2).map((capId) => {
                          const capability = availableCapabilities.find(c => c.id === capId);
                          return capability ? (
                            <Badge key={capId} variant="outline" className="text-xs">
                              {capability.name.split(' ')[0]}
                            </Badge>
                          ) : null;
                        })}
                        {template.capabilities.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{template.capabilities.length - 2}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Define your agent's identity and purpose</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="agentName">Agent Name</Label>
                <Input
                  id="agentName"
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                  placeholder="e.g., DataAnalyst-Alpha"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="agentDescription">Description</Label>
                <Textarea
                  id="agentDescription"
                  value={agentDescription}
                  onChange={(e) => setAgentDescription(e.target.value)}
                  placeholder="Describe what this agent does and its primary purpose..."
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="agentType">Agent Type</Label>
                <Select value={agentType} onValueChange={setAgentType}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select agent type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="analyst">Data Analyst</SelectItem>
                    <SelectItem value="creative">Creative Director</SelectItem>
                    <SelectItem value="coordinator">Team Coordinator</SelectItem>
                    <SelectItem value="security">Security Specialist</SelectItem>
                    <SelectItem value="support">Support Agent</SelectItem>
                    <SelectItem value="custom">Custom Type</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="capabilities" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Agent Capabilities</CardTitle>
              <CardDescription>Select the skills and abilities your agent will have</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {['cognitive', 'technical', 'creative', 'analytical', 'communication'].map((category) => (
                  <div key={category}>
                    <h4 className="font-semibold mb-3 capitalize">{category} Capabilities</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {availableCapabilities
                        .filter(cap => cap.category === category)
                        .map((capability) => (
                          <Card 
                            key={capability.id} 
                            className={`cursor-pointer transition-all border-2 ${
                              selectedCapabilities.includes(capability.id) 
                                ? 'border-purple-400 bg-purple-50' 
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => toggleCapability(capability.id)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h5 className="font-medium">{capability.name}</h5>
                                  <p className="text-sm text-slate-600 mt-1">{capability.description}</p>
                                </div>
                                <Badge className={`ml-2 ${getCategoryColor(capability.category)}`}>
                                  {capability.category}
                                </Badge>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Parameters</CardTitle>
                <CardDescription>Fine-tune your agent's behavior and capabilities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Autonomy Level: {autonomyLevel[0]}%</Label>
                  <Slider
                    value={autonomyLevel}
                    onValueChange={setAutonomyLevel}
                    max={100}
                    step={5}
                    className="mt-2"
                  />
                  <p className="text-sm text-slate-600 mt-1">How independently can this agent make decisions?</p>
                </div>
                
                <div>
                  <Label>Creativity Level: {creativityLevel[0]}%</Label>
                  <Slider
                    value={creativityLevel}
                    onValueChange={setCreativityLevel}
                    max={100}
                    step={5}
                    className="mt-2"
                  />
                  <p className="text-sm text-slate-600 mt-1">How innovative and creative should responses be?</p>
                </div>
                
                <div>
                  <Label>Learning Rate: {learningRate[0]}%</Label>
                  <Slider
                    value={learningRate}
                    onValueChange={setLearningRate}
                    max={100}
                    step={5}
                    className="mt-2"
                  />
                  <p className="text-sm text-slate-600 mt-1">How quickly should the agent adapt and learn?</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Agent Permissions</CardTitle>
                <CardDescription>Configure what this agent can do and access</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Can Spawn Sub-Agents</Label>
                    <p className="text-sm text-slate-600">Allow this agent to create helper agents</p>
                  </div>
                  <Switch
                    checked={canSpawnAgents}
                    onCheckedChange={setCanSpawnAgents}
                  />
                </div>
                
                {canSpawnAgents && (
                  <div>
                    <Label>Max Subordinates: {maxSubordinates[0]}</Label>
                    <Slider
                      value={maxSubordinates}
                      onValueChange={setMaxSubordinates}
                      min={1}
                      max={10}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                )}
                
                <div>
                  <Label>Security Clearance</Label>
                  <Select value={securityClearance} onValueChange={setSecurityClearance}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="internal">Internal</SelectItem>
                      <SelectItem value="confidential">Confidential</SelectItem>
                      <SelectItem value="restricted">Restricted</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Custom Instructions</CardTitle>
              <CardDescription>Provide specific guidelines and behavior instructions</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={customInstructions}
                onChange={(e) => setCustomInstructions(e.target.value)}
                placeholder="Enter specific instructions, constraints, or behavioral guidelines for this agent..."
                rows={6}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
