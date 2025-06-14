
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bot, Users, Zap, Activity } from 'lucide-react';

export const DashboardOverview = () => {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Active Agents</CardTitle>
            <Bot className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">24</div>
            <p className="text-xs text-purple-600">+3 spawned today</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Tasks Completed</CardTitle>
            <Zap className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">156</div>
            <p className="text-xs text-blue-600">+12% from last week</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Team Efficiency</CardTitle>
            <Activity className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">94%</div>
            <p className="text-xs text-green-600">+2% improvement</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Agent Teams</CardTitle>
            <Users className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">7</div>
            <p className="text-xs text-orange-600">2 new teams formed</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Agent Activity</CardTitle>
          <CardDescription>Latest actions and spawned agents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                agent: 'ProjectManager-Gamma',
                action: 'Spawned MarketingAgent-1 for campaign analysis',
                time: '2 minutes ago',
                type: 'spawn'
              },
              {
                agent: 'DataAnalyst-Alpha',
                action: 'Completed Q4 sales report analysis',
                time: '15 minutes ago',
                type: 'complete'
              },
              {
                agent: 'CodeReviewer-Beta',
                action: 'Created TestWriter-1 for automated testing',
                time: '1 hour ago',
                type: 'spawn'
              }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'spawn' ? 'bg-blue-500' : 'bg-green-500'
                  }`} />
                  <div>
                    <p className="font-medium">{activity.agent}</p>
                    <p className="text-sm text-slate-600">{activity.action}</p>
                  </div>
                </div>
                <span className="text-xs text-slate-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
