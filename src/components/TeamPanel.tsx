
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Users, Bot, Target, TrendingUp, Plus, Settings } from 'lucide-react';

export const TeamPanel = () => {
  const teams = [
    {
      id: '1',
      name: 'Data Analytics Squad',
      description: 'Specialized team for data processing and insights',
      leader: 'DataAnalyst-Alpha',
      members: [
        { name: 'DataAnalyst-Alpha', role: 'Lead', status: 'active' },
        { name: 'DataCleaner-1', role: 'Specialist', status: 'active' },
        { name: 'ReportGenerator-1', role: 'Specialist', status: 'active' },
        { name: 'StatisticsBot-2', role: 'Specialist', status: 'idle' }
      ],
      efficiency: 92,
      tasksActive: 5,
      tasksCompleted: 23,
      objective: 'Process Q4 data and generate comprehensive business insights'
    },
    {
      id: '2',
      name: 'Product Launch Team',
      description: 'Cross-functional team managing product launch',
      leader: 'ProjectManager-Gamma',
      members: [
        { name: 'ProjectManager-Gamma', role: 'Lead', status: 'active' },
        { name: 'MarketingAgent-1', role: 'Marketing', status: 'active' },
        { name: 'QAAgent-2', role: 'Quality', status: 'active' },
        { name: 'DocumentationAgent-3', role: 'Documentation', status: 'active' },
        { name: 'SocialMediaBot-1', role: 'Social', status: 'spawning' }
      ],
      efficiency: 87,
      tasksActive: 12,
      tasksCompleted: 8,
      objective: 'Successfully launch Product v2.0 with full market coverage'
    },
    {
      id: '3',
      name: 'Code Quality Guardians',
      description: 'Ensuring code quality and automated testing',
      leader: 'CodeReviewer-Beta',
      members: [
        { name: 'CodeReviewer-Beta', role: 'Lead', status: 'active' },
        { name: 'TestWriter-1', role: 'Testing', status: 'active' },
        { name: 'SecurityScanner-1', role: 'Security', status: 'active' }
      ],
      efficiency: 95,
      tasksActive: 3,
      tasksCompleted: 15,
      objective: 'Maintain 95%+ code coverage and zero critical vulnerabilities'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'spawning': return 'bg-blue-500';
      case 'idle': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Agent Teams</h2>
        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Form New Team
        </Button>
      </div>

      <div className="grid gap-6">
        {teams.map((team) => (
          <Card key={team.id} className="hover:shadow-lg transition-shadow bg-white border-slate-200">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-purple-600" />
                    <CardTitle className="text-xl">{team.name}</CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      {team.members.length} Members
                    </Badge>
                  </div>
                  <CardDescription className="text-slate-600 mb-3">
                    {team.description}
                  </CardDescription>
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-slate-700">Objective:</span>
                    <span className="text-sm text-slate-600">{team.objective}</span>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Team Stats */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 rounded-lg">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="font-bold text-lg text-green-700">{team.efficiency}%</span>
                  </div>
                  <p className="text-xs text-slate-600">Efficiency</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Bot className="w-4 h-4 text-blue-600" />
                    <span className="font-bold text-lg text-blue-700">{team.tasksActive}</span>
                  </div>
                  <p className="text-xs text-slate-600">Active Tasks</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Target className="w-4 h-4 text-purple-600" />
                    <span className="font-bold text-lg text-purple-700">{team.tasksCompleted}</span>
                  </div>
                  <p className="text-xs text-slate-600">Completed</p>
                </div>
              </div>

              {/* Team Leader */}
              <div>
                <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                  <Bot className="w-4 h-4 text-gold-600" />
                  Team Leader
                </h4>
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-yellow-500 text-white text-xs">
                      {team.leader.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{team.leader}</p>
                    <p className="text-xs text-slate-600">Leading team operations</p>
                  </div>
                  <Badge className="bg-yellow-500 text-white">Leader</Badge>
                </div>
              </div>

              {/* Team Members */}
              <div>
                <h4 className="font-medium text-sm mb-2">Team Members</h4>
                <div className="space-y-2">
                  {team.members.filter(member => member.name !== team.leader).map((member, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg transition-colors">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="bg-purple-500 text-white text-xs">
                          {member.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{member.name}</p>
                        <p className="text-xs text-slate-500">{member.role}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(member.status)}`} />
                        <Badge variant="outline" className="text-xs">
                          {member.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Team Efficiency */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-600">Team Efficiency</span>
                  <span className="font-medium">{team.efficiency}%</span>
                </div>
                <Progress value={team.efficiency} className="h-2" />
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button size="sm" className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  View Team Dashboard
                </Button>
                <Button size="sm" variant="outline">
                  Add Member
                </Button>
                <Button size="sm" variant="outline">
                  Assign Task
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
