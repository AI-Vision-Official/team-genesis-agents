
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Target, 
  Clock, 
  DollarSign,
  Users,
  Lightbulb,
  BarChart3,
  PieChart
} from 'lucide-react';

export const InnovationAnalytics = () => {
  const analyticsData = {
    totalIdeas: 127,
    activeProjects: 8,
    completedPrototypes: 5,
    marketPotential: 92,
    avgTimeToPrototype: 45,
    totalInvestment: 125000,
    potentialRevenue: 850000,
    collaborators: 12
  };

  const categoryBreakdown = [
    { name: 'Music & Audio Tech', count: 45, percentage: 35 },
    { name: 'Software Solutions', count: 38, percentage: 30 },
    { name: 'Creative Tools', count: 25, percentage: 20 },
    { name: 'AI-Powered Innovations', count: 19, percentage: 15 }
  ];

  const recentTrends = [
    { metric: 'Idea Capture Rate', value: '+23%', trend: 'up' },
    { metric: 'Prototype Success', value: '87%', trend: 'stable' },
    { metric: 'Market Validation', value: '+15%', trend: 'up' },
    { metric: 'Investment ROI', value: '3.2x', trend: 'up' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold">Innovation Analytics</h3>
        <p className="text-gray-600">Track your innovation pipeline and performance metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Ideas</p>
                <p className="text-2xl font-bold">{analyticsData.totalIdeas}</p>
              </div>
              <Lightbulb className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Projects</p>
                <p className="text-2xl font-bold">{analyticsData.activeProjects}</p>
              </div>
              <Target className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Time to Prototype</p>
                <p className="text-2xl font-bold">{analyticsData.avgTimeToPrototype}d</p>
              </div>
              <Clock className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Market Potential</p>
                <p className="text-2xl font-bold">{analyticsData.marketPotential}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="w-5 h-5" />
            Innovation Categories
          </CardTitle>
          <CardDescription>Distribution of ideas by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categoryBreakdown.map((category) => (
              <div key={category.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{category.name}</span>
                  <span className="text-sm text-gray-500">{category.count} ideas</span>
                </div>
                <Progress value={category.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Performance Trends
          </CardTitle>
          <CardDescription>Recent innovation metrics and trends</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentTrends.map((trend) => (
              <div key={trend.metric} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">{trend.metric}</span>
                  <Badge variant={trend.trend === 'up' ? 'default' : 'secondary'}>
                    {trend.trend}
                  </Badge>
                </div>
                <p className="text-xl font-bold">{trend.value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Investment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-red-600" />
              <span className="text-lg font-bold">€{analyticsData.totalInvestment.toLocaleString()}</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">Total R&D spend</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Potential Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <span className="text-lg font-bold">€{analyticsData.potentialRevenue.toLocaleString()}</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">Projected market value</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Collaborators</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span className="text-lg font-bold">{analyticsData.collaborators}</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">Active contributors</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
