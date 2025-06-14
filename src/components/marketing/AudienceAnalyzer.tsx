
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Users, TrendingUp, Target, Brain, Heart, Eye } from 'lucide-react';

export const AudienceAnalyzer = () => {
  const audienceSegments = [
    {
      id: '1',
      name: 'Tech Innovators',
      size: 250000,
      engagement: 9.2,
      conversionRate: 4.8,
      growth: 23,
      demographics: ['25-40 years', 'Urban', 'High Income'],
      interests: ['AI/ML', 'Startups', 'Innovation'],
      preferredContent: ['Video Tutorials', 'Case Studies', 'Interactive Demos']
    },
    {
      id: '2',
      name: 'Creative Professionals',
      size: 180000,
      engagement: 11.5,
      conversionRate: 6.2,
      growth: 31,
      demographics: ['28-45 years', 'Urban/Suburban', 'Medium-High Income'],
      interests: ['Design', 'Content Creation', 'Marketing'],
      preferredContent: ['Visual Content', 'Behind-the-Scenes', 'Tool Reviews']
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Audience Intelligence</h2>
        <p className="text-slate-600">Deep behavioral analysis and emerging market insights</p>
      </div>

      <div className="grid gap-6">
        {audienceSegments.map((segment) => (
          <Card key={segment.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    {segment.name}
                  </CardTitle>
                  <CardDescription>
                    {(segment.size / 1000).toFixed(0)}k audience • {segment.engagement}% engagement
                  </CardDescription>
                </div>
                <Badge className="bg-green-100 text-green-800">
                  +{segment.growth}% growth
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Demographics
                  </h4>
                  <div className="space-y-1">
                    {segment.demographics.map((demo, index) => (
                      <Badge key={index} variant="outline" className="text-xs mr-1">
                        {demo}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    Core Interests
                  </h4>
                  <div className="space-y-1">
                    {segment.interests.map((interest, index) => (
                      <Badge key={index} variant="outline" className="text-xs mr-1 border-purple-300 text-purple-700">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    Content Preferences
                  </h4>
                  <div className="space-y-1">
                    {segment.preferredContent.map((content, index) => (
                      <Badge key={index} variant="outline" className="text-xs mr-1 border-green-300 text-green-700">
                        {content}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Engagement Rate</span>
                    <span>{segment.engagement}%</span>
                  </div>
                  <Progress value={segment.engagement * 10} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Conversion Rate</span>
                    <span>{segment.conversionRate}%</span>
                  </div>
                  <Progress value={segment.conversionRate * 20} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            Emerging Audience Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-slate-500">
            <TrendingUp className="w-8 h-8 mx-auto mb-3" />
            <p>Advanced audience intelligence coming soon...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
