
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  Lock, 
  Eye, 
  AlertTriangle,
  CheckCircle,
  Key,
  FileText,
  Globe,
  Users
} from 'lucide-react';
import type { Agent } from '@/types/agentFramework';

interface SecurityCenterProps {
  agents: Agent[];
}

export const SecurityCenter = ({ agents }: SecurityCenterProps) => {
  // Mock security data
  const securityMetrics = {
    overallScore: 94,
    encryptedChannels: 8,
    auditLogs: 1247,
    complianceScore: 97,
    vulnerabilities: 2,
    accessControls: 45
  };

  const securityPolicies = [
    {
      id: 'policy-1',
      name: 'Data Encryption Policy',
      level: 'restricted',
      compliance: 100,
      appliedTo: 15,
      lastUpdated: new Date('2024-06-10')
    },
    {
      id: 'policy-2',
      name: 'Communication Security',
      level: 'confidential',
      compliance: 95,
      appliedTo: 12,
      lastUpdated: new Date('2024-06-08')
    },
    {
      id: 'policy-3',
      name: 'Access Control Matrix',
      level: 'internal',
      compliance: 98,
      appliedTo: 20,
      lastUpdated: new Date('2024-06-12')
    }
  ];

  const auditTrail = [
    {
      id: 'audit-1',
      action: 'Agent spawned with security clearance',
      agent: 'SecuritySpecialist-Gamma',
      timestamp: new Date(),
      severity: 'info',
      details: 'New security agent created with restricted access'
    },
    {
      id: 'audit-2',
      action: 'Encryption key rotated',
      agent: 'System',
      timestamp: new Date(Date.now() - 3600000),
      severity: 'info',
      details: 'Automatic key rotation completed successfully'
    },
    {
      id: 'audit-3',
      action: 'Unauthorized access attempt blocked',
      agent: 'SecurityMonitor-Beta',
      timestamp: new Date(Date.now() - 7200000),
      severity: 'warning',
      details: 'Failed authentication from unknown source'
    }
  ];

  const getSecurityLevelColor = (level: string) => {
    switch (level) {
      case 'public': return 'bg-green-100 text-green-800';
      case 'internal': return 'bg-blue-100 text-blue-800';
      case 'confidential': return 'bg-orange-100 text-orange-800';
      case 'restricted': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'info': return 'bg-blue-100 text-blue-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'critical': return 'bg-red-600 text-white';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const agentsByClearance = {
    public: agents.filter(a => a.role.securityClearance === 'public').length,
    internal: agents.filter(a => a.role.securityClearance === 'internal').length,
    confidential: agents.filter(a => a.role.securityClearance === 'confidential').length,
    restricted: agents.filter(a => a.role.securityClearance === 'restricted').length
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Security & Compliance Center</h2>
          <p className="text-slate-600">Monitor security policies and compliance across the agent framework</p>
        </div>
        <Button className="bg-gradient-to-r from-red-600 to-orange-600">
          <Shield className="w-4 h-4 mr-2" />
          Security Scan
        </Button>
      </div>

      {/* Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700">Security Score</p>
                <p className="text-2xl font-bold text-green-900">{securityMetrics.overallScore}%</p>
              </div>
              <Shield className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700">Encrypted Channels</p>
                <p className="text-2xl font-bold text-blue-900">{securityMetrics.encryptedChannels}</p>
              </div>
              <Lock className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700">Audit Logs</p>
                <p className="text-2xl font-bold text-purple-900">{securityMetrics.auditLogs}</p>
              </div>
              <FileText className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-700">Compliance</p>
                <p className="text-2xl font-bold text-orange-900">{securityMetrics.complianceScore}%</p>
              </div>
              <CheckCircle className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-700">Vulnerabilities</p>
                <p className="text-2xl font-bold text-red-900">{securityMetrics.vulnerabilities}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-indigo-700">Access Controls</p>
                <p className="text-2xl font-bold text-indigo-900">{securityMetrics.accessControls}</p>
              </div>
              <Key className="w-8 h-8 text-indigo-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Security Clearance Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Agent Security Clearance
            </CardTitle>
            <CardDescription>Distribution of security clearances across agents</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-100 text-green-800">Public</Badge>
                  <span className="text-sm">General access</span>
                </div>
                <span className="font-medium">{agentsByClearance.public} agents</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-100 text-blue-800">Internal</Badge>
                  <span className="text-sm">Internal operations</span>
                </div>
                <span className="font-medium">{agentsByClearance.internal} agents</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge className="bg-orange-100 text-orange-800">Confidential</Badge>
                  <span className="text-sm">Sensitive data</span>
                </div>
                <span className="font-medium">{agentsByClearance.confidential} agents</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge className="bg-red-100 text-red-800">Restricted</Badge>
                  <span className="text-sm">Highest security</span>
                </div>
                <span className="font-medium">{agentsByClearance.restricted} agents</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Policies */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Security Policies
            </CardTitle>
            <CardDescription>Active security policies and compliance status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {securityPolicies.map((policy) => (
              <div key={policy.id} className="p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{policy.name}</h4>
                  <Badge className={getSecurityLevelColor(policy.level)}>
                    {policy.level}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Compliance</span>
                    <span>{policy.compliance}%</span>
                  </div>
                  <Progress value={policy.compliance} className="h-2" />
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>Applied to {policy.appliedTo} agents</span>
                    <span>Updated {policy.lastUpdated.toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Audit Trail */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Security Audit Trail
          </CardTitle>
          <CardDescription>Recent security events and actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {auditTrail.map((entry) => (
              <div key={entry.id} className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                <div className="mt-1">
                  <Badge className={getSeverityColor(entry.severity)}>
                    {entry.severity}
                  </Badge>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{entry.action}</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-sm text-slate-600">{entry.agent}</span>
                  </div>
                  <p className="text-sm text-slate-700 mb-1">{entry.details}</p>
                  <span className="text-xs text-slate-500">
                    {entry.timestamp.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
