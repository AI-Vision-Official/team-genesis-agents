
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  Shield, 
  AlertTriangle, 
  Eye, 
  Lock, 
  Key, 
  FileText, 
  Globe, 
  Activity, 
  Zap,
  Users,
  Settings,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  Monitor,
  Smartphone,
  Mail,
  Phone,
  MapPin,
  Download,
  Upload
} from 'lucide-react';

interface SecurityThreat {
  id: string;
  type: 'intrusion' | 'malware' | 'phishing' | 'unauthorized' | 'data-breach';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  timestamp: string;
  status: 'active' | 'mitigated' | 'investigating';
  aiResponse?: string;
}

interface AuditLogEntry {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  details: string;
  risk: 'low' | 'medium' | 'high';
}

export const SecurityCenter = () => {
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [systemStatus, setSystemStatus] = useState<'secure' | 'warning' | 'critical'>('secure');

  const mockThreats: SecurityThreat[] = [
    {
      id: '1',
      type: 'intrusion',
      severity: 'high',
      description: 'Multiple failed login attempts from unknown IP',
      timestamp: '2024-06-14 10:30:00',
      status: 'mitigated',
      aiResponse: 'IP automatically banned for 24 hours'
    },
    {
      id: '2',
      type: 'unauthorized',
      severity: 'medium',
      description: 'Agent attempted to access restricted data',
      timestamp: '2024-06-14 09:15:00',
      status: 'investigating'
    }
  ];

  const mockAuditLog: AuditLogEntry[] = [
    {
      id: '1',
      action: 'User Login',
      user: 'admin@company.com',
      timestamp: '2024-06-14 11:00:00',
      details: 'Successful login from trusted device',
      risk: 'low'
    },
    {
      id: '2',
      action: 'API Key Modified',
      user: 'dev@company.com',
      timestamp: '2024-06-14 10:45:00',
      details: 'OpenAI API key updated',
      risk: 'medium'
    }
  ];

  const activateEmergencyMode = () => {
    setEmergencyMode(true);
    setSystemStatus('critical');
    // In real implementation, this would trigger actual emergency protocols
    console.log('EMERGENCY MODE ACTIVATED');
  };

  const deactivateEmergencyMode = () => {
    setEmergencyMode(false);
    setSystemStatus('secure');
    console.log('Emergency mode deactivated');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'secure': return 'text-green-600 bg-green-50';
      case 'warning': return 'text-yellow-600 bg-yellow-50';
      case 'critical': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-blue-100 text-blue-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Emergency Alert Banner */}
      {emergencyMode && (
        <Alert className="border-red-500 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-500" />
          <AlertTitle className="text-red-700">EMERGENCY MODE ACTIVE</AlertTitle>
          <AlertDescription className="text-red-600">
            All non-critical agents disabled. External APIs frozen. Team alerted.
            <Button 
              onClick={deactivateEmergencyMode} 
              className="ml-4 bg-red-600 hover:bg-red-700"
              size="sm"
            >
              Deactivate Emergency Mode
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Security Header */}
      <Card className="border-l-4 border-l-red-500">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-red-700">
                <Shield className="w-5 h-5" />
                Security Command Center
              </CardTitle>
              <CardDescription className="text-red-600">
                Comprehensive digital security monitoring and incident response
              </CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <Badge className={getStatusColor(systemStatus)}>
                System Status: {systemStatus.toUpperCase()}
              </Badge>
              <Button 
                onClick={activateEmergencyMode}
                variant="destructive"
                className="bg-red-600 hover:bg-red-700"
                disabled={emergencyMode}
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Emergency Kill Switch
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Security Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-green-700">99.8%</p>
                <p className="text-sm text-green-600">System Integrity</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-blue-700">247</p>
                <p className="text-sm text-blue-600">Threats Blocked</p>
              </div>
              <Shield className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-orange-700">3</p>
                <p className="text-sm text-orange-600">Active Alerts</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-purple-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-purple-700">12</p>
                <p className="text-sm text-purple-600">Active Agents</p>
              </div>
              <Activity className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="monitoring" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="monitoring">Real-time Monitoring</TabsTrigger>
          <TabsTrigger value="threats">Threat Detection</TabsTrigger>
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
          <TabsTrigger value="passwords">Password Manager</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="settings">Security Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="monitoring" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="w-5 h-5" />
                  System Health Monitor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Agent Activity</span>
                    <Badge className="bg-green-100 text-green-800">Normal</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Network Security</span>
                    <Badge className="bg-green-100 text-green-800">Secure</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Data Integrity</span>
                    <Badge className="bg-green-100 text-green-800">Verified</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>API Endpoints</span>
                    <Badge className="bg-yellow-100 text-yellow-800">Monitoring</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Global Threat Map
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-green-500" />
                    <span className="text-sm">USA: Low Risk</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm">Europe: Medium Risk</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-red-500" />
                    <span className="text-sm">Asia-Pacific: High Risk</span>
                  </div>
                  <Button size="sm" variant="outline" className="w-full mt-4">
                    View Detailed Risk Assessment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="threats" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Active Threat Detection
              </CardTitle>
              <CardDescription>
                AI-driven monitoring of system integrity and security threats
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockThreats.map((threat) => (
                  <div key={threat.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge className={getSeverityColor(threat.severity)}>
                            {threat.severity.toUpperCase()}
                          </Badge>
                          <Badge variant="outline">{threat.type}</Badge>
                          <span className="text-sm text-gray-500">{threat.timestamp}</span>
                        </div>
                        <p className="font-medium">{threat.description}</p>
                        {threat.aiResponse && (
                          <p className="text-sm text-blue-600">AI Response: {threat.aiResponse}</p>
                        )}
                      </div>
                      <Badge 
                        variant={threat.status === 'mitigated' ? 'default' : 'destructive'}
                        className={threat.status === 'mitigated' ? 'bg-green-100 text-green-800' : ''}
                      >
                        {threat.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Security Audit Logs
              </CardTitle>
              <CardDescription>
                Complete history of system changes and user activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockAuditLog.map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{entry.action}</span>
                        <Badge className={getSeverityColor(entry.risk)}>{entry.risk}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">{entry.details}</p>
                      <p className="text-xs text-gray-500">by {entry.user} at {entry.timestamp}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="passwords" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="w-5 h-5" />
                Secure Password Manager
              </CardTitle>
              <CardDescription>
                Centralized credential management with encryption
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button className="flex items-center gap-2 h-auto p-4">
                    <Lock className="w-5 h-5" />
                    <div className="text-left">
                      <p className="font-medium">Generate Secure Password</p>
                      <p className="text-sm opacity-70">Create strong passwords</p>
                    </div>
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2 h-auto p-4">
                    <Download className="w-5 h-5" />
                    <div className="text-left">
                      <p className="font-medium">Export Vault</p>
                      <p className="text-sm opacity-70">Secure backup</p>
                    </div>
                  </Button>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-3">Stored Credentials</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 border rounded">
                      <span>OpenAI API Key</span>
                      <Button size="sm" variant="outline">Manage</Button>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded">
                      <span>Database Password</span>
                      <Button size="sm" variant="outline">Manage</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>NDA Creator & Signature Portal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full">Create New NDA</Button>
                  <Button variant="outline" className="w-full">View Signed NDAs</Button>
                  <Button variant="outline" className="w-full">NDA Templates</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Copyright & Patent Scanner</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full">Scan for Violations</Button>
                  <Button variant="outline" className="w-full">View Reports</Button>
                  <Button variant="outline" className="w-full">Configure Monitoring</Button>
                  <div className="mt-4 p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-700">Last scan: No violations detected</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Emergency Response Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Emergency Contacts</label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 p-2 border rounded">
                        <Mail className="w-4 h-4" />
                        <span className="text-sm">admin@company.com</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 border rounded">
                        <Phone className="w-4 h-4" />
                        <span className="text-sm">+1 (555) 123-4567</span>
                      </div>
                    </div>
                  </div>
                  <Button>Configure Alert Protocols</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Emergency Override 2FA</span>
                    <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Team Member 2FA</span>
                    <Badge className="bg-green-100 text-green-800">Required</Badge>
                  </div>
                  <Button variant="outline">Configure 2FA Settings</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
