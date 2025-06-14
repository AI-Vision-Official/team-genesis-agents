
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Calendar, 
  TrendingUp, 
  AlertTriangle, 
  Lightbulb,
  Plus,
  User,
  Bot
} from 'lucide-react';
import type { BoardroomAccessibilityOptions } from '@/types/boardroom';

interface DailyLogManagerProps {
  settings: BoardroomAccessibilityOptions;
}

export const DailyLogManager = ({ settings }: DailyLogManagerProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            📊 Daily Logs & Milestones
          </h2>
          <p className={`text-gray-600 mt-1 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            Track progress, celebrate wins, and learn from challenges
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Entry
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            <Calendar className="w-5 h-5" />
            Today's Log Entry
          </CardTitle>
          <CardDescription>
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className={`font-medium mb-3 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
              🏆 Achievements & Wins
            </h4>
            <Textarea 
              placeholder="What went well today? Celebrate the wins, big and small..."
              className={settings.dyslexiaFont ? 'font-mono' : ''}
            />
          </div>

          <div>
            <h4 className={`font-medium mb-3 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
              🔧 Challenges & Learning
            </h4>
            <Textarea 
              placeholder="What challenges did we face? What can we improve tomorrow?"
              className={settings.dyslexiaFont ? 'font-mono' : ''}
            />
          </div>

          <div>
            <h4 className={`font-medium mb-3 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
              🚀 Next Steps & Priorities
            </h4>
            <Textarea 
              placeholder="What are our key priorities for tomorrow?"
              className={settings.dyslexiaFont ? 'font-mono' : ''}
            />
          </div>

          <Button className="w-full">
            Save Today's Log
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
              <TrendingUp className="w-5 h-5" />
              Recent Achievements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              {
                title: 'Successfully launched social media automation',
                author: 'AI-SocialMaster',
                type: 'ai',
                date: 'Yesterday',
                impact: 'high'
              },
              {
                title: 'Completed accessibility audit for boardroom',
                author: 'Human-Marcus',
                type: 'human',
                date: '2 days ago',
                impact: 'medium'
              }
            ].map((achievement, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                {achievement.type === 'ai' ? (
                  <Bot className="w-5 h-5 text-blue-500 mt-0.5" />
                ) : (
                  <User className="w-5 h-5 text-green-500 mt-0.5" />
                )}
                <div className="flex-1">
                  <p className={`font-medium ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                    {achievement.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-sm text-gray-600 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                      {achievement.author}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {achievement.date}
                    </Badge>
                    <Badge variant={achievement.impact === 'high' ? 'default' : 'secondary'} className="text-xs">
                      {achievement.impact} impact
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
              <Lightbulb className="w-5 h-5" />
              Key Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className={`text-sm ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                "AI-human collaboration is most effective when AI agents provide detailed context 
                for their decisions, allowing humans to provide strategic guidance."
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Bot className="w-4 h-4 text-blue-500" />
                <span className={`text-xs text-gray-600 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                  AI-Analytics • Pattern Recognition
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
