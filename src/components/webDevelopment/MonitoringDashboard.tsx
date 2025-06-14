
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Zap,
  TrendingUp,
  TrendingDown,
  RefreshCw
} from 'lucide-react';
import type { WebProject, MonitoringAlert } from '@/types/webDevelopment';

interface MonitoringDashboardProps {
  projects: WebProject[];
}

export const MonitoringDashboard = ({ projects }: MonitoringDashboardProps) => {
  const mockAlerts: MonitoringAlert[] = [
    {
      id: '1',
      type: 'performance',
      severity: 'warning',
      message: 'Page load time increased by 15% in the last hour',
      projectId: '1',
      timestamp: new Date(),
      resolved: false,
      autoFixAttempted: true,
      suggestedActions: ['Optimize images', 'Enable caching', 'Minify CSS/JS']
    },
    {
      id: '2',
      type: 'error',
      severity: 'critical',
      message: 'JavaScript error detected on checkout page',
      projectId: '2',
      timestamp: new Date(),
      resolved: false,
      autoFixAttempted: false,
      suggestedActions: ['Debug JavaScript', 'Check form validation', 'Test payment integration']
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'performance': return <Zap className="w-4 h-4" />;
      case 'error': return <AlertTriangle className="w-4 h-4" />;
      case 'downtime': return <Clock className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Active Projects</p>
                <p className="text-2xl font-bold">{projects.length}</p>
              </div>
              <Activity className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Uptime</p>
                <p className="text-2xl font-bold text-green-600">99.9%</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Avg Load Time</p>
                <p className="text-2xl font-bold">1.2s</p>
              </div>
              <Zap className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Active Alerts</p>
                <p className="text-2xl font-bold text-red-600">{mockAlerts.filter(a => !a.resolved).length}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Alerts */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Active Alerts & Issues
              </CardTitle>
              <CardDescription>Real-time monitoring and automated issue detection</CardDescription>
            </div>
            <Button size="sm" variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockAlerts.map((alert) => (
              <div key={alert.id} className={`p-4 border rounded-lg ${getSeverityColor(alert.severity)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getAlertIcon(alert.type)}
                      <h4 className="font-medium">{alert.message}</h4>
                      <Badge className={`text-xs ${alert.severity === 'critical' ? 'bg-red-600' : alert.severity === 'warning' ? 'bg-yellow-600' : 'bg-blue-600'}`}>
                        {alert.severity}
                      </Badge>
                    </div>
                    <p className="text-sm mb-3">
                      Project: {projects.find(p => p.id === alert.projectId)?.name || 'Unknown'}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {alert.suggestedActions.map((action, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {action}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-xs text-slate-600">
                      {alert.timestamp.toLocaleString()} 
                      {alert.autoFixAttempted && ' • Auto-fix attempted'}
                    </p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                      Auto-Fix
                    </Button>
                    <Button size="sm" variant="outline">
                      Investigate
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Core Web Vitals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {projects.slice(0, 3).map((project) => (
              <div key={project.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{project.name}</span>
                  <span className="text-sm text-slate-600">Overall Score: {project.performance.pageSpeed}</span>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>LCP (Largest Contentful Paint)</span>
                    <span>{project.performance.coreWebVitals.lcp}s</span>
                  </div>
                  <Progress value={Math.min(100, (2.5 / project.performance.coreWebVitals.lcp) * 100)} className="h-1" />
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>FID (First Input Delay)</span>
                    <span>{project.performance.coreWebVitals.fid}ms</span>
                  </div>
                  <Progress value={Math.min(100, (100 / project.performance.coreWebVitals.fid) * 100)} className="h-1" />
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>CLS (Cumulative Layout Shift)</span>
                    <span>{project.performance.coreWebVitals.cls}</span>
                  </div>
                  <Progress value={Math.min(100, (0.1 / project.performance.coreWebVitals.cls) * 100)} className="h-1" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 border rounded-lg">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-lg font-bold text-green-600">98.5%</span>
                </div>
                <p className="text-xs text-slate-600">Server Uptime</p>
              </div>
              <div className="text-center p-3 border rounded-lg">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Zap className="w-4 h-4 text-blue-600" />
                  <span className="text-lg font-bold text-blue-600">1.8s</span>
                </div>
                <p className="text-xs text-slate-600">Avg Response</p>
              </div>
              <div className="text-center p-3 border rounded-lg">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-lg font-bold text-green-600">99.2%</span>
                </div>
                <p className="text-xs text-slate-600">Success Rate</p>
              </div>
              <div className="text-center p-3 border rounded-lg">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <TrendingDown className="w-4 h-4 text-red-600" />
                  <span className="text-lg font-bold text-red-600">0.8%</span>
                </div>
                <p className="text-xs text-slate-600">Error Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
