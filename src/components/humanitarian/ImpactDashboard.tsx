
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Globe, Users, Heart, BookOpen, Share2, Smile } from 'lucide-react';
import type { HumanitarianProject, AccessibilitySettings } from '@/types/humanitarian';

interface ImpactDashboardProps {
  projects: HumanitarianProject[];
  settings: AccessibilitySettings;
}

export const ImpactDashboard = ({ projects, settings }: ImpactDashboardProps) => {
  const totalImpact = projects.reduce(
    (acc, project) => ({
      peopleHelped: acc.peopleHelped + project.impact.peopleHelped,
      regionsReached: acc.regionsReached + project.impact.regionsReached,
      languagesServed: acc.languagesServed + project.impact.languagesServed,
      storiesShared: acc.storiesShared + project.impact.storiesShared,
      emotionalReach: acc.emotionalReach + project.impact.emotionalReach,
      educationalImpact: acc.educationalImpact + project.impact.educationalImpact,
    }),
    { peopleHelped: 0, regionsReached: 0, languagesServed: 0, storiesShared: 0, emotionalReach: 0, educationalImpact: 0 }
  );

  const impactMetrics = [
    {
      title: 'People Helped',
      value: totalImpact.peopleHelped,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'Lives directly touched by our initiatives'
    },
    {
      title: 'Regions Reached',
      value: totalImpact.regionsReached,
      icon: Globe,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: 'Geographic areas where we have active presence'
    },
    {
      title: 'Languages Served',
      value: totalImpact.languagesServed,
      icon: Heart,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      description: 'Cultural bridges built through communication'
    },
    {
      title: 'Stories Shared',
      value: totalImpact.storiesShared,
      icon: Share2,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      description: 'Narratives that inspire and educate'
    },
    {
      title: 'Educational Impact',
      value: totalImpact.educationalImpact,
      icon: BookOpen,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      description: 'Learning opportunities created'
    },
    {
      title: 'Emotional Reach',
      value: totalImpact.emotionalReach,
      icon: Smile,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      description: 'Hearts touched through our work'
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-green-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📊 Impact Meter - Ethical Focus
          </CardTitle>
          <CardDescription>
            Measuring meaningful change beyond numbers - emphasizing human dignity and sustainable impact
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {impactMetrics.map((metric) => (
          <Card key={metric.title} className={metric.bgColor}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <metric.icon className={`w-8 h-8 ${metric.color}`} />
                <div className="text-right">
                  <p className={`text-3xl font-bold ${metric.color}`}>
                    {metric.value.toLocaleString()}
                  </p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-1">{metric.title}</h4>
                <p className={`text-sm ${settings.readingLevel === 'simple' ? 'text-base' : 'text-sm'} text-slate-600`}>
                  {metric.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Project Impact Distribution</CardTitle>
            <CardDescription>How impact is spread across active projects</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{project.name}</span>
                  <span>{project.impact.peopleHelped} people</span>
                </div>
                <Progress 
                  value={(project.impact.peopleHelped / totalImpact.peopleHelped) * 100} 
                  className="h-2" 
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ethical Impact Assessment</CardTitle>
            <CardDescription>Values-based evaluation of our work</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Dignity Preservation</span>
                <span className="text-green-600 font-semibold">97%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Cultural Sensitivity</span>
                <span className="text-green-600 font-semibold">94%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Sustainable Solutions</span>
                <span className="text-green-600 font-semibold">89%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Community Empowerment</span>
                <span className="text-green-600 font-semibold">92%</span>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-700">
                🌱 <strong>Values Alignment:</strong> Your projects consistently prioritize human dignity, 
                cultural respect, and sustainable impact over purely numerical metrics.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {!settings.minimumUI && (
        <Card>
          <CardHeader>
            <CardTitle>Story Impact & Engagement</CardTitle>
            <CardDescription>How your narratives create awareness and connection</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  {totalImpact.storiesShared}
                </div>
                <div className="text-sm text-blue-700">Stories Published</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-2">
                  {Math.round(totalImpact.emotionalReach / 1000)}K
                </div>
                <div className="text-sm text-green-700">People Reached</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 mb-2">
                  {totalImpact.languagesServed}
                </div>
                <div className="text-sm text-purple-700">Languages</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
