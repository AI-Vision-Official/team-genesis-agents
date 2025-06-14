
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Heart, 
  Star, 
  Trophy, 
  Zap,
  User,
  Bot,
  Send,
  Plus
} from 'lucide-react';
import type { BoardroomAccessibilityOptions } from '@/types/boardroom';

interface MotivationCenterProps {
  settings: BoardroomAccessibilityOptions;
}

export const MotivationCenter = ({ settings }: MotivationCenterProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            💝 Motivation Center
          </h2>
          <p className={`text-gray-600 mt-1 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            Boost morale, share appreciation, and celebrate together
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Send Boost
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            <Send className="w-5 h-5" />
            Send a Motivational Boost
          </CardTitle>
          <CardDescription>
            Share encouragement, appreciation, or celebrate achievements
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            {[
              { type: 'compliment', icon: Heart, label: 'Compliment', color: 'bg-red-500' },
              { type: 'encouragement', icon: Zap, label: 'Encouragement', color: 'bg-yellow-500' },
              { type: 'appreciation', icon: Star, label: 'Appreciation', color: 'bg-blue-500' },
              { type: 'achievement', icon: Trophy, label: 'Achievement', color: 'bg-green-500' }
            ].map(({ type, icon: Icon, label, color }) => (
              <Button key={type} variant="outline" size="sm">
                <Icon className="w-4 h-4 mr-2" />
                {label}
              </Button>
            ))}
          </div>
          
          <Textarea 
            placeholder="Write your motivational message here... 🌟"
            className={`min-h-[100px] ${settings.dyslexiaFont ? 'font-mono' : ''}`}
          />
          
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Badge variant="outline">Public</Badge>
              <Badge variant="secondary">Private</Badge>
            </div>
            <Button>
              <Send className="w-4 h-4 mr-2" />
              Send Boost
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
              <Trophy className="w-5 h-5" />
              Recent Celebrations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                from: 'Human-Sarah',
                to: 'AI-ContentMaster',
                type: 'achievement',
                message: 'Outstanding work on the multilingual content system! The cultural adaptation features are brilliant.',
                timestamp: '2 hours ago',
                fromType: 'human'
              },
              {
                from: 'AI-Alpha',
                to: 'Human-Marcus',
                type: 'appreciation',
                message: 'Your accessibility insights have made our collaboration so much more inclusive. Thank you for your dedication!',
                timestamp: '5 hours ago',
                fromType: 'ai'
              }
            ].map((boost, index) => (
              <div key={index} className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border">
                <div className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    {boost.fromType === 'ai' ? (
                      <Bot className="w-6 h-6 text-blue-500" />
                    ) : (
                      <User className="w-6 h-6 text-green-500" />
                    )}
                    <div className="w-px h-6 bg-gray-300 my-1"></div>
                    {boost.to.includes('AI-') ? (
                      <Bot className="w-5 h-5 text-blue-400" />
                    ) : (
                      <User className="w-5 h-5 text-green-400" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`font-medium ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                        {boost.from}
                      </span>
                      <span className={`text-gray-500 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>→</span>
                      <span className={`font-medium ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                        {boost.to}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {boost.type}
                      </Badge>
                    </div>
                    
                    <p className={`text-sm ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                      {boost.message}
                    </p>
                    
                    <span className={`text-xs text-gray-500 mt-2 block ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                      {boost.timestamp}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
              <Heart className="w-5 h-5" />
              Team Morale Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                <span className="text-2xl font-bold text-green-600">94%</span>
              </div>
              <p className={`text-lg font-medium ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                Overall Team Morale
              </p>
              <p className={`text-sm text-gray-600 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                Excellent collaborative spirit!
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className={`text-sm ${settings.dyslexiaFont ? 'font-mono' : ''}`}>AI Agents</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '96%' }}></div>
                  </div>
                  <span className={`text-sm font-medium ${settings.dyslexiaFont ? 'font-mono' : ''}`}>96%</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className={`text-sm ${settings.dyslexiaFont ? 'font-mono' : ''}`}>Human Team</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                  <span className={`text-sm font-medium ${settings.dyslexiaFont ? 'font-mono' : ''}`}>92%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
