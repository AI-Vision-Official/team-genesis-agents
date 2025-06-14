
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  Settings, 
  Brain,
  Zap,
  Play,
  Pause,
  Square
} from 'lucide-react';

interface VoiceCommand {
  id: string;
  phrase: string;
  action: string;
  category: 'navigation' | 'agent' | 'mission' | 'system';
  description: string;
  confidence?: number;
  timestamp?: Date;
}

interface VoiceSession {
  isListening: boolean;
  isProcessing: boolean;
  currentTranscript: string;
  lastCommand: string | null;
  confidence: number;
}

export const VoiceCommandInterface = () => {
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [session, setSession] = useState<VoiceSession>({
    isListening: false,
    isProcessing: false,
    currentTranscript: '',
    lastCommand: null,
    confidence: 0
  });
  const [recentCommands, setRecentCommands] = useState<VoiceCommand[]>([]);
  const [volume, setVolume] = useState(80);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Available voice commands
  const availableCommands: VoiceCommand[] = [
    {
      id: 'nav-overview',
      phrase: 'show overview',
      action: 'navigate_overview',
      category: 'navigation',
      description: 'Navigate to dashboard overview'
    },
    {
      id: 'nav-agents',
      phrase: 'show agents',
      action: 'navigate_agents',
      category: 'navigation',
      description: 'Navigate to agent management'
    },
    {
      id: 'agent-spawn',
      phrase: 'spawn new agent',
      action: 'spawn_agent',
      category: 'agent',
      description: 'Create a new AI agent'
    },
    {
      id: 'agent-status',
      phrase: 'agent status',
      action: 'show_agent_status',
      category: 'agent',
      description: 'Display all agent statuses'
    },
    {
      id: 'mission-start',
      phrase: 'start mission',
      action: 'start_mission',
      category: 'mission',
      description: 'Begin a new mission'
    },
    {
      id: 'system-health',
      phrase: 'system health',
      action: 'show_health',
      category: 'system',
      description: 'Display system health dashboard'
    },
    {
      id: 'emergency-stop',
      phrase: 'emergency stop',
      action: 'emergency_stop',
      category: 'system',
      description: 'Stop all agents immediately'
    }
  ];

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      if (recognitionRef.current) {
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onstart = () => {
          setSession(prev => ({ ...prev, isListening: true }));
        };

        recognitionRef.current.onresult = (event) => {
          let interimTranscript = '';
          let finalTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript;
            } else {
              interimTranscript += transcript;
            }
          }

          setSession(prev => ({
            ...prev,
            currentTranscript: finalTranscript || interimTranscript,
            confidence: event.results[0]?.[0]?.confidence || 0
          }));

          if (finalTranscript) {
            processVoiceCommand(finalTranscript.trim());
          }
        };

        recognitionRef.current.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          setSession(prev => ({ ...prev, isListening: false, isProcessing: false }));
        };

        recognitionRef.current.onend = () => {
          setSession(prev => ({ ...prev, isListening: false }));
        };
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const processVoiceCommand = (transcript: string) => {
    setSession(prev => ({ ...prev, isProcessing: true }));

    // Find matching command
    const matchedCommand = availableCommands.find(cmd => 
      transcript.toLowerCase().includes(cmd.phrase.toLowerCase())
    );

    if (matchedCommand) {
      const commandWithDetails: VoiceCommand = {
        ...matchedCommand,
        confidence: session.confidence * 100,
        timestamp: new Date()
      };

      setRecentCommands(prev => [commandWithDetails, ...prev.slice(0, 4)]);
      setSession(prev => ({ 
        ...prev, 
        lastCommand: matchedCommand.phrase,
        isProcessing: false,
        currentTranscript: ''
      }));

      // Execute command (in real implementation, this would trigger actual actions)
      executeCommand(matchedCommand.action);
    } else {
      setSession(prev => ({ 
        ...prev, 
        isProcessing: false,
        currentTranscript: ''
      }));
    }
  };

  const executeCommand = (action: string) => {
    // Simulate command execution
    console.log(`Executing voice command: ${action}`);
    
    // In a real implementation, this would integrate with the actual dashboard functions
    switch (action) {
      case 'navigate_overview':
        console.log('Navigating to overview...');
        break;
      case 'spawn_agent':
        console.log('Spawning new agent...');
        break;
      case 'emergency_stop':
        console.log('Emergency stop activated!');
        break;
      default:
        console.log(`Unknown action: ${action}`);
    }
  };

  const startListening = () => {
    if (recognitionRef.current && isVoiceEnabled) {
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const toggleVoiceControl = () => {
    setIsVoiceEnabled(!isVoiceEnabled);
    if (session.isListening) {
      stopListening();
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'navigation': return 'bg-blue-100 text-blue-800';
      case 'agent': return 'bg-green-100 text-green-800';
      case 'mission': return 'bg-purple-100 text-purple-800';
      case 'system': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Mic className="w-6 h-6 text-purple-500" />
            Voice Command Interface
          </h2>
          <p className="text-slate-600 mt-1">Hands-free control of the AI agent platform</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Configure
          </Button>
          <Button
            variant={isVoiceEnabled ? "default" : "outline"}
            onClick={toggleVoiceControl}
            className={isVoiceEnabled ? "bg-green-600" : ""}
          >
            {isVoiceEnabled ? <Volume2 className="w-4 h-4 mr-2" /> : <MicOff className="w-4 h-4 mr-2" />}
            {isVoiceEnabled ? 'Voice Enabled' : 'Voice Disabled'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Voice Control Panel */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              Voice Control
            </CardTitle>
            <CardDescription>Current voice session status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Status Indicator */}
            <div className="text-center p-6 bg-slate-50 rounded-lg">
              <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center ${
                session.isListening ? 'bg-green-500 animate-pulse' :
                session.isProcessing ? 'bg-blue-500' : 'bg-gray-300'
              }`}>
                {session.isListening ? <Mic className="w-8 h-8 text-white" /> :
                 session.isProcessing ? <Brain className="w-8 h-8 text-white animate-spin" /> :
                 <MicOff className="w-8 h-8 text-gray-600" />}
              </div>
              <p className="font-medium">
                {session.isListening ? 'Listening...' :
                 session.isProcessing ? 'Processing...' : 'Ready'}
              </p>
              {session.currentTranscript && (
                <p className="text-sm text-slate-600 mt-2">"{session.currentTranscript}"</p>
              )}
            </div>

            {/* Controls */}
            <div className="flex gap-2">
              <Button 
                onClick={startListening} 
                disabled={!isVoiceEnabled || session.isListening}
                className="flex-1"
              >
                <Play className="w-4 h-4 mr-2" />
                Start
              </Button>
              <Button 
                onClick={stopListening} 
                disabled={!session.isListening}
                variant="outline"
                className="flex-1"
              >
                <Square className="w-4 h-4 mr-2" />
                Stop
              </Button>
            </div>

            {/* Confidence Meter */}
            {session.confidence > 0 && (
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Confidence</span>
                  <span>{(session.confidence * 100).toFixed(0)}%</span>
                </div>
                <Progress value={session.confidence * 100} className="h-2" />
              </div>
            )}

            {/* Last Command */}
            {session.lastCommand && (
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-green-800">
                  <strong>Last Command:</strong> "{session.lastCommand}"
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Available Commands */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Available Commands
            </CardTitle>
            <CardDescription>Say these phrases to control the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {availableCommands.map((command) => (
                <div key={command.id} className="p-3 border rounded-lg hover:bg-slate-50">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={getCategoryColor(command.category)}>
                      {command.category}
                    </Badge>
                  </div>
                  <h4 className="font-medium text-sm mb-1">"{command.phrase}"</h4>
                  <p className="text-xs text-slate-600">{command.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Commands */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Voice Commands</CardTitle>
          <CardDescription>Recently executed voice commands and their results</CardDescription>
        </CardHeader>
        <CardContent>
          {recentCommands.length > 0 ? (
            <div className="space-y-2">
              {recentCommands.map((command, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge className={getCategoryColor(command.category)}>
                      {command.category}
                    </Badge>
                    <div>
                      <p className="font-medium text-sm">"{command.phrase}"</p>
                      <p className="text-xs text-slate-600">{command.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{command.confidence?.toFixed(0)}%</p>
                    <p className="text-xs text-slate-500">
                      {command.timestamp?.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-500">
              <Mic className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No voice commands executed yet</p>
              <p className="text-sm">Enable voice control and start speaking commands</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
