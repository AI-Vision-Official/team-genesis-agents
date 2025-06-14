
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Bot, Clock, MessageSquare } from 'lucide-react';
import type { HumanitarianProject, AccessibilitySettings } from '@/types/humanitarian';

interface VolunteerTrackerProps {
  projects: HumanitarianProject[];
  settings: AccessibilitySettings;
}

export const VolunteerTracker = ({ projects, settings }: VolunteerTrackerProps) => {
  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-purple-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🧑‍🤝‍🧑 Volunteer & AI-Agent Collaboration
          </CardTitle>
          <CardDescription>
            Coordinate human volunteers and AI assistants for maximum impact
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600">Human Volunteers</p>
                <p className="text-2xl font-bold text-blue-700">24</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-purple-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600">AI Assistants</p>
                <p className="text-2xl font-bold text-purple-700">8</p>
              </div>
              <Bot className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Team Members</CardTitle>
          <CardDescription>Current volunteers and AI agents working on projects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {projects.slice(0, 3).map((project) => (
              <div key={project.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">{project.name}</h4>
                  <Badge variant="outline">{project.volunteers.length} team members</Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.volunteers.map((volunteer) => (
                    <Badge
                      key={volunteer.id}
                      variant={volunteer.type === 'human' ? 'default' : 'secondary'}
                      className="flex items-center gap-1"
                    >
                      {volunteer.type === 'human' ? <Users className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                      {volunteer.name}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
