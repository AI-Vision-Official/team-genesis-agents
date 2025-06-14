
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  Users, 
  Lightbulb, 
  Target,
  User,
  Bot,
  Send
} from 'lucide-react';
import type { BoardroomAccessibilityOptions } from '@/types/boardroom';

interface CollaborationSpaceProps {
  settings: BoardroomAccessibilityOptions;
  meetingStatus: 'inactive' | 'active' | 'logging';
}

export const CollaborationSpace = ({ settings, meetingStatus }: CollaborationSpaceProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            🤝 Collaboration Space
          </h2>
          <p className={`text-gray-600 mt-1 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            Real-time brainstorming and strategic discussions
          </p>
        </div>
      </div>

      {meetingStatus === 'active' && (
        <Card className="border-l-4 border-l-green-500 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className={`text-green-700 font-medium ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                Live Collaboration Session Active
              </span>
              <Badge variant="secondary">
                3 AI Agents • 2 Humans
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
              <MessageCircle className="w-5 h-5" />
              Active Discussion
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {[
                {
                  author: 'Human-Sarah',
                  type: 'human',
                  message: 'I think we should prioritize the accessibility features for our next sprint. The dyslexia-friendly options will make a huge difference.',
                  timestamp: '2 min ago'
                },
                {
                  author: 'AI-StrategicMind',
                  type: 'ai',
                  message: 'Excellent point, Sarah. I\'ve analyzed our user feedback data and accessibility improvements show 73% higher engagement rates. I suggest we also include voice-to-text capabilities.',
                  timestamp: '1 min ago'
                },
                {
                  author: 'Human-Marcus',
                  type: 'human',
                  message: 'Great idea! I can handle the UI implementation. AI-StrategicMind, could you research the best voice recognition APIs for our use case?',
                  timestamp: '30 sec ago'
                }
              ].map((message, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex-shrink-0">
                    {message.type === 'ai' ? (
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4 text-blue-600" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-green-600" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`font-medium text-sm ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                        {message.author}
                      </span>
                      <span className={`text-xs text-gray-500 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                        {message.timestamp}
                      </span>
                    </div>
                    <p className={`text-sm text-gray-700 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                      {message.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2 pt-4 border-t">
              <input 
                type="text" 
                placeholder="Share your thoughts, ideas, or questions..."
                className={`flex-1 px-3 py-2 border rounded-md ${settings.dyslexiaFont ? 'font-mono' : ''}`}
              />
              <Button size="sm">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                <Users className="w-5 h-5" />
                Active Participants
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: 'Human-Sarah', type: 'human', role: 'Project Lead', status: 'active' },
                { name: 'Human-Marcus', type: 'human', role: 'UI Designer', status: 'active' },
                { name: 'AI-StrategicMind', type: 'ai', role: 'Strategic Analyst', status: 'active' },
                { name: 'AI-ContentMaster', type: 'ai', role: 'Content Specialist', status: 'thinking' },
                { name: 'AI-ResearchBot', type: 'ai', role: 'Research Assistant', status: 'active' }
              ].map((participant) => (
                <div key={participant.name} className="flex items-center gap-3">
                  {participant.type === 'ai' ? (
                    <Bot className="w-5 h-5 text-blue-500" />
                  ) : (
                    <User className="w-5 h-5 text-green-500" />
                  )}
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                      {participant.name}
                    </p>
                    <p className={`text-xs text-gray-600 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                      {participant.role}
                    </p>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${
                    participant.status === 'active' ? 'bg-green-500' : 
                    participant.status === 'thinking' ? 'bg-yellow-500 animate-pulse' : 'bg-gray-300'
                  }`}></div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                <Lightbulb className="w-5 h-5" />
                Ideas & Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className={`text-sm font-medium ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                  Voice Commands for Navigation
                </p>
                <p className={`text-xs text-gray-600 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                  Suggested by AI-StrategicMind
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className={`text-sm font-medium ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                  Collaborative Whiteboard
                </p>
                <p className={`text-xs text-gray-600 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                  Suggested by Human-Marcus
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
