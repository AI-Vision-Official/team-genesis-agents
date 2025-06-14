
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Lock, 
  Key,
  Database,
  RefreshCw,
  Download
} from 'lucide-react';
import type { WebProject } from '@/types/webDevelopment';

interface SecurityCenterProps {
  projects: WebProject[];
}

export const SecurityCenter = ({ projects }: SecurityCenterProps) => {
  const mockVulnerabilities = [
    {
      id: '1',
      projectId: '1',
      type: 'dependency',
      severity: 'high',
      description: 'Outdated React version with known security vulnerabilities',
      cve: 'CVE-2024-12345',
      autoFixable: true,
      fixInstructions: 'Update React to version 18.2.0 or higher'
    },
    {
      id: '2', 
      projectId: '2',
      type: 'code',
      severity: 'medium',
      description: 'SQL injection vulnerability in user input validation',
      autoFixable: false,
      fixInstructions: 'Implement parameterized queries and input sanitization'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getVulnerabilityIcon = (type: string) => {
    switch (type) {
      case 'dependency': return <Database className="w-4 h-4" />;
      case 'code': return <AlertTriangle className="w-4 h-4" />;
      case 'config': return <Key className="w-4 h-4" />;
      default: return <Shield className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Security Score</p>
                <p className="text-2xl font-bold text-green-600">87/100</p>
              </div>
              <Shield className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Vulnerabilities</p>
                <p className="text-2xl font-bold text-orange-600">{mockVulnerabilities.length}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">SSL Status</p>
                <p className="text-2xl font-bold text-green-600">Valid</p>
              </div>
              <Lock className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Last Scan</p>
                <p className="text-2xl font-bold">2h ago</p>
              </div>
              <RefreshCw className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vulnerability Assessment */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Security Vulnerabilities
              </CardTitle>
              <CardDescription>Automated security scanning and threat detection</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Rescan
              </Button>
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                Auto-Fix All
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockVulnerabilities.map((vuln) => (
              <div key={vuln.id} className={`p-4 border rounded-lg ${getSeverityColor(vuln.severity)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getVulnerabilityIcon(vuln.type)}
                      <h4 className="font-medium">{vuln.description}</h4>
                      <Badge className={`text-xs ${
                        vuln.severity === 'critical' ? 'bg-red-600' : 
                        vuln.severity === 'high' ? 'bg-orange-600' :
                        vuln.severity === 'medium' ? 'bg-yellow-600' : 'bg-green-600'
                      }`}>
                        {vuln.severity}
                      </Badge>
                      {vuln.autoFixable && (
                        <Badge variant="outline" className="text-xs bg-blue-50">
                          Auto-fixable
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm mb-2">
                      Project: {projects.find(p => p.id === vuln.projectId)?.name || 'Unknown'}
                    </p>
                    {vuln.cve && (
                      <p className="text-xs text-slate-600 mb-2">CVE: {vuln.cve}</p>
                    )}
                    <p className="text-sm bg-white bg-opacity-50 p-2 rounded">
                      Fix: {vuln.fixInstructions}
                    </p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    {vuln.autoFixable && (
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Auto-Fix
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security Status by Project */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Project Security Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">{project.name}</h4>
                  <div className="flex items-center gap-2">
                    <Badge className={project.security.securityScore >= 80 ? 'bg-green-100 text-green-800' : 
                                     project.security.securityScore >= 60 ? 'bg-yellow-100 text-yellow-800' :
                                     'bg-red-100 text-red-800'}>
                      Score: {project.security.securityScore}/100
                    </Badge>
                    {project.security.sslStatus === 'valid' ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-slate-600">Vulnerabilities</p>
                    <p className="font-medium">{project.security.vulnerabilities.length}</p>
                  </div>
                  <div>
                    <p className="text-slate-600">SSL Status</p>
                    <p className="font-medium capitalize">{project.security.sslStatus}</p>
                  </div>
                  <div>
                    <p className="text-slate-600">Last Backup</p>
                    <p className="font-medium capitalize">{project.security.backupStatus}</p>
                  </div>
                </div>
                
                <div className="mt-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Security Score</span>
                    <span>{project.security.securityScore}%</span>
                  </div>
                  <Progress value={project.security.securityScore} className="h-2" />
                </div>
                
                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Backup Now
                  </Button>
                  <Button size="sm" variant="outline">
                    Security Report
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
