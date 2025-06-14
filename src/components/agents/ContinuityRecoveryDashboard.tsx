
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Zap, Shield, Database, AlertTriangle, CheckCircle, Wifi } from 'lucide-react';

export const ContinuityRecoveryDashboard = () => {
  const continuityMetrics = {
    systemUptime: 99.8,
    backupStatus: 100,
    securityThreats: 2,
    recoveryReadiness: 95,
    dataIntegrity: 100,
    emergencyProtocols: 8
  };

  const systemStatus = [
    { service: 'Main Application', status: 'operational', uptime: 99.9 },
    { service: 'Database', status: 'operational', uptime: 100 },
    { service: 'API Gateway', status: 'operational', uptime: 99.7 },
    { service: 'Backup Systems', status: 'operational', uptime: 100 },
    { service: 'Security Monitoring', status: 'operational', uptime: 99.8 }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'degraded': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'down': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Continuity & Disaster Recovery
          </CardTitle>
          <CardDescription>
            Maintaining system integrity and preparing for emergency scenarios
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>System Uptime</span>
                <span>{continuityMetrics.systemUptime}%</span>
              </div>
              <Progress value={continuityMetrics.systemUptime} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Backup Status</span>
                <span>{continuityMetrics.backupStatus}%</span>
              </div>
              <Progress value={continuityMetrics.backupStatus} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Recovery Readiness</span>
                <span>{continuityMetrics.recoveryReadiness}%</span>
              </div>
              <Progress value={continuityMetrics.recoveryReadiness} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wifi className="w-5 h-5" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {systemStatus.map((service, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(service.status)}
                    <span className="font-medium">{service.service}</span>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-green-100 text-green-800">
                      {service.uptime}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Security Monitoring
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Active Threats</span>
                <Badge className={continuityMetrics.securityThreats > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}>
                  {continuityMetrics.securityThreats}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Data Integrity</span>
                <Badge className="bg-green-100 text-green-800">
                  {continuityMetrics.dataIntegrity}%
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Emergency Protocols</span>
                <Badge variant="outline">{continuityMetrics.emergencyProtocols} ready</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-800 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Emergency Response Center
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="destructive" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Emergency Kill Switch
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              Initiate Backup
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Security Lockdown
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
