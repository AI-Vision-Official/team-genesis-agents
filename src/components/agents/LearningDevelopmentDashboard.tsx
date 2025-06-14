
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { GraduationCap, BookOpen, Target, Award, TrendingUp, Users } from 'lucide-react';

export const LearningDevelopmentDashboard = () => {
  const learningMetrics = {
    activePrograms: 12,
    completionRate: 78,
    skillAssessments: 24,
    mentorshipSessions: 156,
    certificationsEarned: 8,
    knowledgeGapsClosed: 15
  };

  const learningPaths = [
    {
      name: 'AI Ethics & Privacy',
      progress: 85,
      participants: 8,
      difficulty: 'intermediate'
    },
    {
      name: 'Advanced System Security',
      progress: 62,
      participants: 5,
      difficulty: 'advanced'
    },
    {
      name: 'Community Management',
      progress: 93,
      participants: 12,
      difficulty: 'beginner'
    },
    {
      name: 'Crisis Response Protocols',
      progress: 41,
      participants: 6,
      difficulty: 'intermediate'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5" />
            Learning & Development Guardian
          </CardTitle>
          <CardDescription>
            Supporting continuous growth and skill development for the team
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-700">{learningMetrics.activePrograms}</p>
              <p className="text-sm text-purple-600">Active Programs</p>
            </div>
            
            <div className="text-center">
              <p className="text-2xl font-bold text-green-700">{learningMetrics.completionRate}%</p>
              <p className="text-sm text-green-600">Completion Rate</p>
            </div>
            
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-700">{learningMetrics.certificationsEarned}</p>
              <p className="text-sm text-blue-600">Certifications Earned</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Learning Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Skill Assessments</span>
                <Badge className="bg-blue-100 text-blue-800">
                  {learningMetrics.skillAssessments}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Mentorship Sessions</span>
                <Badge className="bg-green-100 text-green-800">
                  {learningMetrics.mentorshipSessions}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Knowledge Gaps Closed</span>
                <Badge className="bg-purple-100 text-purple-800">
                  {learningMetrics.knowledgeGapsClosed}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Active Learning Paths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {learningPaths.map((path, index) => (
                <div key={index} className="p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{path.name}</span>
                    <div className="flex gap-2">
                      <Badge className={getDifficultyColor(path.difficulty)}>
                        {path.difficulty}
                      </Badge>
                      <Badge variant="outline">
                        {path.participants} learners
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Progress</span>
                      <span>{path.progress}%</span>
                    </div>
                    <Progress value={path.progress} className="h-1" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Learning Support Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Skill Assessment
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Create Learning Path
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Schedule Mentorship
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              Track Certifications
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
