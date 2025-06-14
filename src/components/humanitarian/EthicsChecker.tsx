
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, Heart, Users, CheckCircle, AlertTriangle } from 'lucide-react';
import type { HumanitarianProject, AccessibilitySettings } from '@/types/humanitarian';

interface EthicsCheckerProps {
  projects: HumanitarianProject[];
  settings: AccessibilitySettings;
}

export const EthicsChecker = ({ projects, settings }: EthicsCheckerProps) => {
  const ethicsMetrics = [
    { name: 'Dignity Preservation', score: 97, icon: Heart, color: 'text-red-600' },
    { name: 'Cultural Sensitivity', score: 94, icon: Users, color: 'text-blue-600' },
    { name: 'Sustainable Impact', score: 89, icon: Shield, color: 'text-green-600' },
    { name: 'Community Empowerment', score: 92, icon: CheckCircle, color: 'text-purple-600' }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-indigo-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            ⚖️ Ethics & Values Checker
          </CardTitle>
          <CardDescription>
            Ensure all actions align with humanitarian principles and values
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ethicsMetrics.map((metric) => (
          <Card key={metric.name} className="bg-slate-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <metric.icon className={`w-6 h-6 ${metric.color}`} />
                  <span className="font-medium">{metric.name}</span>
                </div>
                <span className={`text-2xl font-bold ${metric.color}`}>
                  {metric.score}%
                </span>
              </div>
              <Progress value={metric.score} className="h-2" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Ethics Review</CardTitle>
          <CardDescription>Individual project alignment with core values</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projects.slice(0, 3).map((project) => (
              <div key={project.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">{project.name}</h4>
                  <Badge 
                    className={
                      project.ethicsAlignment >= 95 ? 'bg-green-100 text-green-800' :
                      project.ethicsAlignment >= 85 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }
                  >
                    {project.ethicsAlignment}% aligned
                  </Badge>
                </div>
                <div className="space-y-2">
                  <Progress value={project.ethicsAlignment} className="h-2" />
                  {project.ethicsAlignment < 90 && (
                    <div className="flex items-center gap-2 text-sm text-yellow-700">
                      <AlertTriangle className="w-4 h-4" />
                      Consider reviewing cultural sensitivity aspects
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-green-50">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
            <div>
              <h4 className="font-medium text-green-900 mb-2">Values Alignment Report</h4>
              <p className="text-sm text-green-700">
                Your Heal the World Project consistently demonstrates strong ethical alignment. 
                All current initiatives prioritize human dignity, cultural respect, and sustainable community empowerment.
              </p>
              <Button size="sm" className="mt-3 bg-green-600 hover:bg-green-700">
                Generate Detailed Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
