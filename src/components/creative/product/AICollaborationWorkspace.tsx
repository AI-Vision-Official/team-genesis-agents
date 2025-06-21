
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  MessageSquare, 
  Mic, 
  Lock, 
  Unlock, 
  Lightbulb,
  Users,
  Zap,
  RefreshCw,
  Settings,
  Play,
  Pause,
  Eye
} from 'lucide-react';
import type { CreativeAgent, AccessibilityOptions } from '@/types/creative';

interface AICollaborationWorkspaceProps {
  agents: CreativeAgent[];
  settings: AccessibilityOptions;
  currentProject: any;
  onProjectUpdate: (project: any) => void;
}

export const AICollaborationWorkspace = ({ 
  agents, 
  settings, 
  currentProject, 
  onProjectUpdate 
}: AICollaborationWorkspaceProps) => {
  const [collaborationMode, setCollaborationMode] = useState<'suggest' | 'lock' | 'autonomous'>('suggest');
  const [voiceActive, setVoiceActive] = useState(false);
  const [aiWorking, setAiWorking] = useState(false);
  const [chatMessage, setChatMessage] = useState('');

  const collaborationModes = [
    {
      id: 'suggest',
      name: 'AI Suggests',
      description: 'AI provides suggestions, human makes decisions',
      icon: Lightbulb,
      color: 'bg-blue-500'
    },
    {
      id: 'lock',
      name: 'Locked Sections',
      description: 'Lock/unlock parts for AI or human control',
      icon: Lock,
      color: 'bg-yellow-500'
    },
    {
      id: 'autonomous',
      name: 'AI Autonomous',
      description: 'AI works independently with approval checkpoints',
      icon: Brain,
      color: 'bg-purple-500'
    }
  ];

  const activeAgents = agents.filter(agent => 
    ['visual_designer', 'content_writer', 'product_designer'].includes(agent.specialization)
  );

  const recentSuggestions = [
    {
      id: 1,
      agent: 'Content Writer AI',
      suggestion: 'Consider adding a "Personal Reflection" section to your healing journal',
      type: 'content',
      confidence: 92
    },
    {
      id: 2,
      agent: 'Visual Designer AI',
      suggestion: 'Gothic font would enhance the dark academia aesthetic',
      type: 'design',
      confidence: 87
    },
    {
      id: 3,
      agent: 'Market Research AI',
      suggestion: 'Add "large print" option - 34% higher demand in this niche',
      type: 'market',
      confidence: 95
    }
  ];

  const voiceCommands = [
    'Create a new gothic journal project',
    'Generate a t-shirt design with my latest poem',
    'Add healing prompts to the current book',
    'Change the color scheme to dark purple',
    'Export this design for Amazon Merch'
  ];

  const handleVoiceToggle = () => {
    setVoiceActive(!voiceActive);
    // Simulate voice recognition
    if (!voiceActive) {
      setTimeout(() => {
        setChatMessage('Create a gothic healing journal with large print accessibility features');
        setVoiceActive(false);
      }, 3000);
    }
  };

  const handleAIWorkflow = async () => {
    setAiWorking(true);
    // Simulate AI working
    setTimeout(() => {
      setAiWorking(false);
    }, 4000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className={`text-xl font-bold ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            AI Collaboration Workspace
          </h3>
          <p className={`text-gray-600 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            Work together with AI agents to create amazing products
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline">{activeAgents.length} AI Agents</Badge>
          <Badge variant="outline">Live Collaboration</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Collaboration Mode Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Collaboration Mode
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {collaborationModes.map((mode) => (
              <Button
                key={mode.id}
                variant={collaborationMode === mode.id ? "default" : "outline"}
                onClick={() => setCollaborationMode(mode.id as any)}
                className="w-full justify-start h-auto p-3"
              >
                <div className={`p-2 rounded mr-3 ${mode.color} text-white`}>
                  <mode.icon className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-sm">{mode.name}</div>
                  <div className="text-xs text-gray-500">{mode.description}</div>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Active Agents */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              Active AI Agents
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {activeAgents.map((agent) => (
              <div key={agent.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium text-sm">{agent.name}</div>
                  <div className="text-xs text-gray-500">{agent.specialization.replace('_', ' ')}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={agent.status === 'active' ? 'default' : 'outline'}
                    className="text-xs"
                  >
                    {agent.status}
                  </Badge>
                  <Button size="sm" variant="outline">
                    {agent.status === 'active' ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Voice Commands */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mic className="w-5 h-5" />
              Voice Commands
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={handleVoiceToggle}
              variant={voiceActive ? "default" : "outline"}
              className={`w-full ${voiceActive ? 'bg-red-500 hover:bg-red-600' : ''}`}
            >
              <Mic className="w-4 h-4 mr-2" />
              {voiceActive ? 'Listening...' : 'Start Voice Command'}
            </Button>

            <div className="space-y-2">
              <div className="text-sm font-medium">Try saying:</div>
              {voiceCommands.slice(0, 3).map((command, index) => (
                <div key={index} className="text-xs text-gray-600 p-2 bg-gray-50 rounded">
                  "{command}"
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            AI Suggestions
          </CardTitle>
          <CardDescription>
            Smart recommendations from your AI agents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentSuggestions.map((suggestion) => (
              <div key={suggestion.id} className="flex items-start justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{suggestion.agent}</span>
                    <Badge variant="outline" className="text-xs">
                      {suggestion.confidence}% confidence
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-700">{suggestion.suggestion}</p>
                  <Badge variant="secondary" className="text-xs mt-2">
                    {suggestion.type}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button size="sm">
                    Apply
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            AI Collaboration Chat
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border rounded-lg p-4 h-48 overflow-y-auto bg-gray-50">
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                  AI
                </div>
                <div className="flex-1">
                  <div className="bg-white p-3 rounded-lg">
                    <p className="text-sm">Hello! I'm ready to help you create amazing products. What would you like to work on today?</p>
                  </div>
                </div>
              </div>
              {chatMessage && (
                <div className="flex gap-3 justify-end">
                  <div className="flex-1 max-w-xs">
                    <div className="bg-blue-500 text-white p-3 rounded-lg">
                      <p className="text-sm">{chatMessage}</p>
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs">
                    You
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="Ask AI agents anything about your product..."
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleAIWorkflow} disabled={aiWorking}>
              {aiWorking ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Zap className="w-4 h-4" />
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* AI Work Progress */}
      {aiWorking && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Brain className="w-6 h-6 text-purple-500" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">AI agents are working on your request...</span>
                  <span className="text-sm text-gray-500">Processing</span>
                </div>
                <Progress value={75} className="w-full" />
                <div className="text-sm text-gray-500 mt-1">
                  Content Writer is generating healing prompts, Visual Designer is creating layouts...
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
