
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Zap
} from 'lucide-react';
import type { IFTTTStats, ExecutionLog, IFTTTRule } from '@/types/ifttt';

interface IFTTTDashboardProps {
  stats: IFTTTStats;
  recentExecutions: ExecutionLog[];
  activeRules: IFTTTRule[];
}

export const IFTTTDashboard = ({ stats, recentExecutions, activeRules }: IFTTTDashboardProps) => {
  const categoryColors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00ff00'];

  const executionData = [
    { name: 'Success', value: Math.round(stats.totalExecutions * stats.successRate / 100), color: '#10b981' },
    { name: 'Failed', value: Math.round(stats.totalExecutions * (100 - stats.successRate) / 100), color: '#ef4444' }
  ];

  return (
    <div className="space-y-6">
      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Success Rate:</span>
                <span className="font-medium">{stats.successRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Avg Execution Time:</span>
                <span className="font-medium">{stats.performanceMetrics.averageExecutionTime}ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">API Calls:</span>
                <span className="font-medium">{stats.performanceMetrics.apiCallsMade}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-500" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {recentExecutions.slice(0, 3).map((execution) => (
                <div key={execution.id} className="flex items-center justify-between">
                  <span className="text-sm truncate">{execution.ruleName}</span>
                  {execution.status === 'success' ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-500" />
              Top Rules
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {activeRules
                .sort((a, b) => b.triggerCount - a.triggerCount)
                .slice(0, 3)
                .map((rule) => (
                  <div key={rule.id} className="flex items-center justify-between">
                    <span className="text-sm truncate">{rule.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {rule.triggerCount}
                    </Badge>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Rule Categories</CardTitle>
            <CardDescription>Distribution of rules by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stats.topCategories}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                  label={({ category, count }) => `${category}: ${count}`}
                >
                  {stats.topCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={categoryColors[index % categoryColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Execution Success Rate</CardTitle>
            <CardDescription>Success vs failed executions</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={executionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Executions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Executions</CardTitle>
          <CardDescription>Latest automation executions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentExecutions.map((execution) => (
              <div key={execution.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {execution.status === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                  )}
                  <div>
                    <p className="font-medium">{execution.ruleName}</p>
                    <p className="text-sm text-muted-foreground">
                      {execution.timestamp.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge 
                    className={
                      execution.status === 'success' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }
                  >
                    {execution.status}
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-1">
                    {execution.executionTime}ms
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
