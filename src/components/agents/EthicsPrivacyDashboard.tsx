
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Shield, Eye, Lock, AlertTriangle, CheckCircle } from 'lucide-react';

export const EthicsPrivacyDashboard = () => {
  const ethicsMetrics = {
    privacyComplianceScore: 98,
    dataAccessEvents: 142,
    ethicsViolations: 0,
    consentManagement: 95,
    auditScore: 97,
    dataRetentionCompliance: 100
  };

  const recentAlerts = [
    {
      id: '1',
      type: 'info',
      title: 'Privacy Policy Update Required',
      description: 'New data processing activity detected - privacy policy needs updating',
      severity: 'medium',
      timestamp: new Date()
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Ethics & Privacy Guardian
          </CardTitle>
          <CardDescription>
            Ensuring ethical compliance and privacy protection across all operations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Privacy Compliance</span>
                <span>{ethicsMetrics.privacyComplianceScore}%</span>
              </div>
              <Progress value={ethicsMetrics.privacyComplianceScore} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Consent Management</span>
                <span>{ethicsMetrics.consentManagement}%</span>
              </div>
              <Progress value={ethicsMetrics.consentManagement} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Audit Score</span>
                <span>{ethicsMetrics.auditScore}%</span>
              </div>
              <Progress value={ethicsMetrics.auditScore} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Data Access Monitoring
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Today's Access Events</span>
                <Badge variant="outline">{ethicsMetrics.dataAccessEvents}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Ethics Violations</span>
                <Badge className="bg-green-100 text-green-800">
                  {ethicsMetrics.ethicsViolations}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Data Retention Compliance</span>
                <Badge className="bg-green-100 text-green-800">
                  {ethicsMetrics.dataRetentionCompliance}%
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Ethics Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{alert.title}</p>
                    <p className="text-xs text-slate-600">{alert.description}</p>
                  </div>
                  <Badge variant="outline">{alert.severity}</Badge>
                </div>
              ))}
              {recentAlerts.length === 0 && (
                <div className="text-center py-4 text-slate-500">
                  <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-500" />
                  <p>No ethics violations detected</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Privacy Protection Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Generate Privacy Report
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Review Consent Forms
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Audit Data Access
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
