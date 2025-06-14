
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertTriangle, Calendar, Clock, CheckCircle, Bell, X } from 'lucide-react';
import type { ExpirationAlert } from '@/types/education';

interface ExpirationAlertsProps {
  alerts: ExpirationAlert[];
}

export const ExpirationAlerts = ({ alerts: initialAlerts }: ExpirationAlertsProps) => {
  const [alerts, setAlerts] = useState(initialAlerts);
  
  const acknowledgeAlert = (alertId: string) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId 
          ? { ...alert, acknowledged: true }
          : alert
      )
    );
  };

  const dismissAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const getSeverityColor = (days: number) => {
    if (days <= 7) return 'bg-red-100 text-red-800 border-red-200';
    if (days <= 30) return 'bg-orange-100 text-orange-800 border-orange-200';
    if (days <= 90) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-blue-100 text-blue-800 border-blue-200';
  };

  const getSeverityIcon = (days: number) => {
    if (days <= 7) return <AlertTriangle className="w-4 h-4 text-red-600" />;
    if (days <= 30) return <Clock className="w-4 h-4 text-orange-600" />;
    return <Bell className="w-4 h-4 text-yellow-600" />;
  };

  const unacknowledgedAlerts = alerts.filter(alert => !alert.acknowledged);
  const acknowledgedAlerts = alerts.filter(alert => alert.acknowledged);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Certificate Expiration Alerts
          </CardTitle>
          <CardDescription>
            Stay on top of certificate renewals and avoid lapses in your credentials
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-8 h-8 text-red-600" />
              <div>
                <div className="text-2xl font-bold">
                  {alerts.filter(a => a.daysUntilExpiration <= 7).length}
                </div>
                <div className="text-sm text-muted-foreground">Critical (≤7 days)</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-8 h-8 text-orange-600" />
              <div>
                <div className="text-2xl font-bold">
                  {alerts.filter(a => a.daysUntilExpiration > 7 && a.daysUntilExpiration <= 30).length}
                </div>
                <div className="text-sm text-muted-foreground">High (≤30 days)</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Bell className="w-8 h-8 text-yellow-600" />
              <div>
                <div className="text-2xl font-bold">
                  {alerts.filter(a => a.daysUntilExpiration > 30 && a.daysUntilExpiration <= 90).length}
                </div>
                <div className="text-sm text-muted-foreground">Medium (≤90 days)</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold">{acknowledgedAlerts.length}</div>
                <div className="text-sm text-muted-foreground">Acknowledged</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Unacknowledged Alerts */}
      {unacknowledgedAlerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Active Alerts</CardTitle>
            <CardDescription>
              {unacknowledgedAlerts.length} certificate{unacknowledgedAlerts.length !== 1 ? 's' : ''} requiring attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {unacknowledgedAlerts
                .sort((a, b) => a.daysUntilExpiration - b.daysUntilExpiration)
                .map((alert) => (
                <div 
                  key={alert.id} 
                  className={`p-4 rounded-lg border-2 ${getSeverityColor(alert.daysUntilExpiration)}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      {getSeverityIcon(alert.daysUntilExpiration)}
                      <div className="flex-1">
                        <h4 className="font-semibold">{alert.certificate.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {alert.certificate.issuingOrganization}
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-sm flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Expires: {new Date(alert.certificate.expirationDate!).toLocaleDateString()}
                          </span>
                          <Badge variant="outline">
                            {alert.daysUntilExpiration} day{alert.daysUntilExpiration !== 1 ? 's' : ''} left
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => acknowledgeAlert(alert.id)}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Acknowledge
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => dismissAlert(alert.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Acknowledged Alerts */}
      {acknowledgedAlerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Acknowledged Alerts</CardTitle>
            <CardDescription>
              Previously acknowledged expiration alerts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {acknowledgedAlerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <span className="font-medium">{alert.certificate.title}</span>
                      <span className="text-sm text-muted-foreground ml-2">
                        - {alert.certificate.issuingOrganization}
                      </span>
                    </div>
                  </div>
                  <Badge variant="outline">
                    {alert.daysUntilExpiration} days left
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {alerts.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">All Clear!</h3>
            <p className="text-muted-foreground">
              No certificates are expiring soon. Great job staying on top of your credentials!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
