
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle } from 'lucide-react';

export const AlertsPanel = () => {
  const alerts = [
    {
      id: '1',
      title: 'High Response Time Detected',
      description: 'Average system response time has exceeded 200ms threshold',
      type: 'warning' as const,
      timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
      priority: 'medium' as const
    },
    {
      id: '2',
      title: 'Agent Overload',
      description: 'SecurityGuard-Gamma is experiencing high CPU usage (89%)',
      type: 'error' as const,
      timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      priority: 'high' as const
    },
    {
      id: '3',
      title: 'Performance Optimization',
      description: 'System has automatically scaled resources to handle increased load',
      type: 'info' as const,
      timestamp: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
      priority: 'low' as const
    }
  ];

  const getAlertStyle = (type: string) => {
    switch (type) {
      case 'warning':
        return 'border-yellow-200 bg-yellow-50';
      case 'error':
        return 'border-orange-200 bg-orange-50';
      case 'info':
        return 'border-blue-200 bg-blue-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const getAlertTextColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'text-yellow-800';
      case 'error':
        return 'text-orange-800';
      case 'info':
        return 'text-blue-800';
      default:
        return 'text-gray-800';
    }
  };

  const getAlertDescriptionColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'text-yellow-700';
      case 'error':
        return 'text-orange-700';
      case 'info':
        return 'text-blue-700';
      default:
        return 'text-gray-700';
    }
  };

  const getAlertTimestampColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'text-yellow-600';
      case 'error':
        return 'text-orange-600';
      case 'info':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-500 text-white';
      case 'error':
        return 'bg-orange-500 text-white';
      case 'info':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return 'Just now';
    if (diffMins === 1) return '1 minute ago';
    return `${diffMins} minutes ago`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Active Alerts
        </CardTitle>
        <CardDescription>System and agent alerts requiring attention</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className={`p-4 border rounded-lg ${getAlertStyle(alert.type)}`}>
              <div className="flex items-start justify-between">
                <div>
                  <h4 className={`font-medium ${getAlertTextColor(alert.type)}`}>
                    {alert.title}
                  </h4>
                  <p className={`text-sm mt-1 ${getAlertDescriptionColor(alert.type)}`}>
                    {alert.description}
                  </p>
                  <p className={`text-xs mt-2 ${getAlertTimestampColor(alert.type)}`}>
                    {getTimeAgo(alert.timestamp)}
                  </p>
                </div>
                <Badge className={getBadgeColor(alert.type)}>
                  {alert.priority === 'high' ? 'High' : 
                   alert.priority === 'medium' ? 'Warning' : 'Info'}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
