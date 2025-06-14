
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, TrendingDown, TrendingUp, Bell } from 'lucide-react';
import type { AlertNotification } from '@/types/missionControl';

interface ProactiveAlertsProps {
  alerts: AlertNotification[];
}

export const ProactiveAlerts = ({ alerts }: ProactiveAlertsProps) => {
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'emergency': return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'critical': return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'warning': return <TrendingDown className="w-5 h-5 text-yellow-500" />;
      default: return <Bell className="w-5 h-5 text-blue-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'emergency': return 'border-red-600 bg-red-50';
      case 'critical': return 'border-red-500 bg-red-50';
      case 'warning': return 'border-yellow-500 bg-yellow-50';
      default: return 'border-blue-500 bg-blue-50';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Proactive Alerts & Notifications
        </CardTitle>
        <CardDescription>AI-detected situations requiring attention</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className={`p-4 border-l-4 rounded-lg ${getSeverityColor(alert.severity)}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {getSeverityIcon(alert.severity)}
                    <h4 className="font-medium">{alert.title}</h4>
                    <Badge className={`text-xs ${alert.severity === 'emergency' ? 'bg-red-600' : alert.severity === 'critical' ? 'bg-red-500' : alert.severity === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'}`}>
                      {alert.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">{alert.message}</p>
                  {alert.suggestedActions.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {alert.suggestedActions.map((action, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {action}
                        </Badge>
                      ))}
                    </div>
                  )}
                  <p className="text-xs text-slate-500">{alert.timestamp.toLocaleString()}</p>
                </div>
                <div className="flex gap-2 ml-4">
                  {alert.actionRequired && (
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                      Take Action
                    </Button>
                  )}
                  <Button size="sm" variant="outline">
                    Acknowledge
                  </Button>
                </div>
              </div>
            </div>
          ))}
          {alerts.length === 0 && (
            <div className="text-center py-8 text-slate-500">
              <Bell className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No active alerts. System running smoothly.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
