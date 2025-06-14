
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Heart, Smile, Coffee, Sun, TrendingUp } from 'lucide-react';

export const EmotionalWellnessDashboard = () => {
  const wellnessMetrics = {
    teamMorale: 85,
    stressLevel: 25,
    workLifeBalance: 78,
    positiveInteractions: 234,
    breakReminders: 18,
    burnoutRisk: 15
  };

  const teamMembers = [
    { name: 'Alex', wellness: 92, status: 'excellent' },
    { name: 'Jordan', wellness: 78, status: 'good' },
    { name: 'Sam', wellness: 65, status: 'needs_attention' },
    { name: 'Casey', wellness: 88, status: 'good' }
  ];

  const getWellnessColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5" />
            Emotional Wellness Guardian
          </CardTitle>
          <CardDescription>
            Supporting team wellbeing and sustainable work practices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Team Morale</span>
                <span>{wellnessMetrics.teamMorale}%</span>
              </div>
              <Progress value={wellnessMetrics.teamMorale} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Work-Life Balance</span>
                <span>{wellnessMetrics.workLifeBalance}%</span>
              </div>
              <Progress value={wellnessMetrics.workLifeBalance} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Burnout Risk</span>
                <span>{wellnessMetrics.burnoutRisk}%</span>
              </div>
              <Progress value={wellnessMetrics.burnoutRisk} className="h-2 bg-red-100" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smile className="w-5 h-5" />
              Today's Wellness Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Positive Interactions</span>
                <Badge className="bg-green-100 text-green-800">
                  {wellnessMetrics.positiveInteractions}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Break Reminders Sent</span>
                <Badge variant="outline">{wellnessMetrics.breakReminders}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Current Stress Level</span>
                <Badge className={wellnessMetrics.stressLevel > 50 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}>
                  {wellnessMetrics.stressLevel}%
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Team Wellness Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {teamMembers.map((member, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="font-medium">{member.name}</span>
                  <div className="flex items-center gap-2">
                    <Badge className={getWellnessColor(member.wellness)}>
                      {member.wellness}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Wellness Support Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Coffee className="w-4 h-4" />
              Send Break Reminder
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Wellness Check-in
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Smile className="w-4 h-4" />
              Positive Reinforcement
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Sun className="w-4 h-4" />
              Mindfulness Session
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
