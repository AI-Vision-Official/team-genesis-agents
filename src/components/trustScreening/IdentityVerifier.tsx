
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Search, Shield, AlertTriangle, CheckCircle, ExternalLink } from 'lucide-react';
import type { IdentityVerificationRequest, IdentityVerificationResult, ScreeningReport } from '@/types/trustScreening';

interface IdentityVerifierProps {
  activeReport: ScreeningReport | null;
  onCreateReport: (subject: string) => ScreeningReport;
  onUpdateReport: (reportId: string, updates: Partial<ScreeningReport>) => void;
}

export const IdentityVerifier = ({ activeReport, onCreateReport, onUpdateReport }: IdentityVerifierProps) => {
  const [request, setRequest] = useState<IdentityVerificationRequest>({
    name: '',
    email: '',
    phone: '',
    photo: ''
  });
  const [result, setResult] = useState<IdentityVerificationResult | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = async () => {
    if (!request.name.trim()) return;

    setIsVerifying(true);
    
    // Simulate API call with realistic data
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockResult: IdentityVerificationResult = {
      matches: [
        {
          platform: 'LinkedIn',
          profileUrl: 'https://linkedin.com/in/example',
          confidence: 85,
          lastSeen: '2024-01-15',
          verified: true
        },
        {
          platform: 'Facebook',
          profileUrl: 'https://facebook.com/example',
          confidence: 72,
          lastSeen: '2024-01-10',
          verified: false
        },
        {
          platform: 'GitHub',
          confidence: 45,
          lastSeen: '2023-12-20',
          verified: true
        }
      ],
      riskScore: 25,
      summary: `Found ${request.name} across multiple platforms with moderate confidence. Profile appears consistent across LinkedIn and Facebook. No major red flags detected, but email appears in 1 data breach from 2022.`,
      breachRecords: request.email ? [
        {
          source: 'Example Corp Data Breach',
          date: '2022-08-15',
          type: 'email',
          severity: 'medium'
        }
      ] : [],
      confidence: 78
    };

    setResult(mockResult);

    // Update or create report
    let reportToUpdate = activeReport;
    if (!reportToUpdate) {
      reportToUpdate = onCreateReport(request.name);
    }

    onUpdateReport(reportToUpdate.id, {
      subject: request.name,
      identity: mockResult
    });

    setIsVerifying(false);
  };

  const getRiskColor = (score: number) => {
    if (score < 30) return 'text-green-600 bg-green-100';
    if (score < 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'low': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'medium': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'high': return <Shield className="w-4 h-4 text-red-500" />;
      default: return <CheckCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Basic Identity Verifier
          </CardTitle>
          <CardDescription>
            Cross-reference identity information across platforms and databases
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={request.name}
                onChange={(e) => setRequest(prev => ({ ...prev, name: e.target.value }))}
                placeholder="John Doe"
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={request.email}
                onChange={(e) => setRequest(prev => ({ ...prev, email: e.target.value }))}
                placeholder="john@example.com"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={request.phone}
                onChange={(e) => setRequest(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div>
              <Label htmlFor="photo">Photo URL (optional)</Label>
              <Input
                id="photo"
                value={request.photo}
                onChange={(e) => setRequest(prev => ({ ...prev, photo: e.target.value }))}
                placeholder="https://example.com/photo.jpg"
              />
            </div>
          </div>

          <Button 
            onClick={handleVerify} 
            disabled={!request.name.trim() || isVerifying}
            className="w-full"
          >
            {isVerifying ? 'Verifying Identity...' : 'Verify Identity'}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Verification Results
                <Badge className={getRiskColor(result.riskScore)}>
                  Risk Score: {result.riskScore}/100
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Summary</h4>
                  <p className="text-gray-700">{result.summary}</p>
                  <div className="mt-2">
                    <Badge variant="outline">
                      Confidence: {result.confidence}%
                    </Badge>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Platform Matches ({result.matches.length})</h4>
                  <div className="space-y-2">
                    {result.matches.map((match, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Badge variant={match.verified ? 'default' : 'secondary'}>
                            {match.platform}
                          </Badge>
                          <span className="text-sm text-gray-600">
                            {match.confidence}% confidence
                          </span>
                          {match.lastSeen && (
                            <span className="text-xs text-gray-500">
                              Last seen: {match.lastSeen}
                            </span>
                          )}
                        </div>
                        {match.profileUrl && (
                          <Button variant="ghost" size="sm" asChild>
                            <a href={match.profileUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {result.breachRecords.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2 text-red-600">Data Breach Records</h4>
                    <div className="space-y-2">
                      {result.breachRecords.map((breach, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 border border-red-200 rounded-lg bg-red-50">
                          {getSeverityIcon(breach.severity)}
                          <div className="flex-1">
                            <div className="font-medium">{breach.source}</div>
                            <div className="text-sm text-gray-600">
                              {breach.type} data exposed on {breach.date}
                            </div>
                          </div>
                          <Badge variant={breach.severity === 'high' ? 'destructive' : 'secondary'}>
                            {breach.severity}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
