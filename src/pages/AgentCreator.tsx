
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Bot, Brain, Zap, Users, Settings, Plus, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AgentCreator = () => {
  const { toast } = useToast();
  const [agentName, setAgentName] = useState('');
  const [agentType, setAgentType] = useState('');
  const [description, setDescription] = useState('');
  const [capabilities, setCapabilities] = useState<string[]>([]);
  const [newCapability, setNewCapability] = useState('');
  const [canSpawnAgents, setCanSpawnAgents] = useState(false);
  const [maxSpawnedAgents, setMaxSpawnedAgents] = useState(5);
  const [autonomyLevel, setAutonomyLevel] = useState('medium');
  const [teamRole, setTeamRole] = useState('');

  const predefinedCapabilities = [
    'Data Analysis', 'Code Review', 'Content Creation', 'Project Management',
    'Quality Assurance', 'Marketing Research', 'Customer Support', 'Security Analysis',
    'Performance Optimization', 'Report Generation', 'API Integration', 'Database Management'
  ];

  const agentTypes = [
    'Data Analyst', 'Software Engineer', 'Project Manager', 'QA Specialist',
    'Marketing Specialist', 'Content Creator', 'Security Expert', 'DevOps Engineer',
    'Business Analyst', 'Customer Success', 'Research Assistant', 'System Administrator'
  ];

  const addCapability = (capability: string) => {
    if (capability && !capabilities.includes(capability)) {
      setCapabilities([...capabilities, capability]);
      setNewCapability('');
    }
  };

  const removeCapability = (capability: string) => {
    setCapabilities(capabilities.filter(cap => cap !== capability));
  };

  const handleCreateAgent = () => {
    if (!agentName || !agentType || !description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Agent Created Successfully!",
      description: `${agentName} has been created and is initializing...`,
    });

    // Reset form
    setAgentName('');
    setAgentType('');
    setDescription('');
    setCapabilities([]);
    setCanSpawnAgents(false);
    setMaxSpawnedAgents(5);
    setAutonomyLevel('medium');
    setTeamRole('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              AI Agent Creator
            </h1>
            <p className="text-slate-600 text-lg">Design and deploy intelligent agents with custom capabilities</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="w-5 h-5 text-purple-600" />
                    Basic Information
                  </CardTitle>
                  <CardDescription>Define your agent's core identity and purpose</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="agentName">Agent Name *</Label>
                      <Input
                        id="agentName"
                        placeholder="e.g., DataAnalyst-Alpha"
                        value={agentName}
                        onChange={(e) => setAgentName(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="agentType">Agent Type *</Label>
                      <Select value={agentType} onValueChange={setAgentType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select agent type" />
                        </SelectTrigger>
                        <SelectContent>
                          {agentTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe what this agent does and its primary responsibilities..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Capabilities */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-blue-600" />
                    Capabilities
                  </CardTitle>
                  <CardDescription>Select or add custom capabilities for your agent</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Predefined Capabilities</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {predefinedCapabilities.map((capability) => (
                        <Badge
                          key={capability}
                          variant={capabilities.includes(capability) ? "default" : "outline"}
                          className={`cursor-pointer transition-colors ${
                            capabilities.includes(capability)
                              ? 'bg-purple-600 hover:bg-purple-700'
                              : 'hover:bg-slate-100'
                          }`}
                          onClick={() => {
                            if (capabilities.includes(capability)) {
                              removeCapability(capability);
                            } else {
                              addCapability(capability);
                            }
                          }}
                        >
                          {capability}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="customCapability">Add Custom Capability</Label>
                    <div className="flex gap-2">
                      <Input
                        id="customCapability"
                        placeholder="Enter custom capability"
                        value={newCapability}
                        onChange={(e) => setNewCapability(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addCapability(newCapability)}
                      />
                      <Button
                        type="button"
                        onClick={() => addCapability(newCapability)}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {capabilities.length > 0 && (
                    <div>
                      <Label>Selected Capabilities</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {capabilities.map((capability) => (
                          <Badge key={capability} className="bg-green-100 text-green-800 border-green-300">
                            {capability}
                            <X
                              className="w-3 h-3 ml-1 cursor-pointer"
                              onClick={() => removeCapability(capability)}
                            />
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Advanced Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5 text-orange-600" />
                    Advanced Settings
                  </CardTitle>
                  <CardDescription>Configure autonomy level and spawning capabilities</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="autonomyLevel">Autonomy Level</Label>
                      <Select value={autonomyLevel} onValueChange={setAutonomyLevel}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low - Requires approval for actions</SelectItem>
                          <SelectItem value="medium">Medium - Independent with oversight</SelectItem>
                          <SelectItem value="high">High - Fully autonomous</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="teamRole">Team Role</Label>
                      <Select value={teamRole} onValueChange={setTeamRole}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="leader">Team Leader</SelectItem>
                          <SelectItem value="specialist">Specialist</SelectItem>
                          <SelectItem value="support">Support</SelectItem>
                          <SelectItem value="coordinator">Coordinator</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="canSpawnAgents"
                        checked={canSpawnAgents}
                        onCheckedChange={setCanSpawnAgents}
                      />
                      <Label htmlFor="canSpawnAgents" className="text-sm font-medium">
                        Enable agent spawning capabilities
                      </Label>
                    </div>
                    
                    {canSpawnAgents && (
                      <div>
                        <Label htmlFor="maxSpawnedAgents">Maximum Spawned Agents</Label>
                        <Input
                          id="maxSpawnedAgents"
                          type="number"
                          min="1"
                          max="20"
                          value={maxSpawnedAgents}
                          onChange={(e) => setMaxSpawnedAgents(parseInt(e.target.value))}
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Preview Panel */}
            <div className="space-y-6">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-green-600" />
                    Agent Preview
                  </CardTitle>
                  <CardDescription>Live preview of your agent configuration</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border">
                    <div className="flex items-center gap-2 mb-2">
                      <Bot className="w-5 h-5 text-purple-600" />
                      <h3 className="font-semibold">{agentName || 'Agent Name'}</h3>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">{agentType || 'Agent Type'}</p>
                    <p className="text-sm text-slate-700 mb-3">
                      {description || 'Agent description will appear here...'}
                    </p>
                    
                    {capabilities.length > 0 && (
                      <div className="mb-3">
                        <p className="text-xs font-medium text-slate-600 mb-1">Capabilities:</p>
                        <div className="flex flex-wrap gap-1">
                          {capabilities.slice(0, 3).map((cap) => (
                            <Badge key={cap} variant="outline" className="text-xs">
                              {cap}
                            </Badge>
                          ))}
                          {capabilities.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{capabilities.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-xs text-slate-600">
                      <span>Autonomy: {autonomyLevel}</span>
                      {canSpawnAgents && (
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          Can spawn agents
                        </span>
                      )}
                    </div>
                  </div>

                  <Button
                    onClick={handleCreateAgent}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    disabled={!agentName || !agentType || !description}
                  >
                    <Bot className="w-4 h-4 mr-2" />
                    Create Agent
                  </Button>

                  <div className="text-xs text-slate-500 text-center">
                    Agent will be initialized and deployed to your workspace
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentCreator;
