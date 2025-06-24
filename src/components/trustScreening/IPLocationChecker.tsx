
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Globe, MapPin, Shield, AlertTriangle, Server, Wifi } from 'lucide-react';
import type { IPLocationResult, ScreeningReport } from '@/types/trustScreening';

interface IPLocationCheckerProps {
  activeReport: ScreeningReport | null;
  onCreateReport: (subject: string) => ScreeningReport;
  onUpdateReport: (reportId: string, updates: Partial<ScreeningReport>) => void;
}

export const IPLocationChecker = ({ activeReport, onCreateReport, onUpdateReport }: IPLocationCheckerProps) => {
  const [ipInput, setIpInput] = useState('');
  const [result, setResult] = useState<IPLocationResult | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const handleCheck = async () => {
    if (!ipInput.trim()) return;

    setIsChecking(true);
    
    // Simulate API call with realistic data
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockResult: IPLocationResult = {
      ip: ipInput,
      country: 'United States',
      region: 'California',
      city: 'San Francisco',
      isp: 'Cloudflare Inc.',
      isProxy: false,
      isVPN: ipInput.includes('vpn') || Math.random() > 0.7,
      threatScore: Math.floor(Math.random() * 40),
      hostingProvider: 'Amazon Web Services',
      organization: 'AWS EC2'
    };

    setResult(mockResult);

    // Update or create report
    let reportToUpdate = activeReport;
    if (!reportToUpdate) {
      reportToUpdate = onCreateReport(`IP: ${ipInput}`);
    }

    onUpdateReport(reportToUpdate.id, {
      ipLocation: mockResult
    });

    setIsChecking(false);
  };

  const getThreatColor = (score: number) => {
    if (score < 20) return 'text-green-600 bg-green-100';
    if (score < 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            IP & Location Checker
          </CardTitle>
          <CardDescription>
            Analyze IP addresses for location, hosting, proxy/VPN detection, and threat assessment
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="ip-input">IP Address or URL</Label>
            <Input
              id="ip-input"
              value={ipInput}
              onChange={(e) => setIpInput(e.target.value)}
              placeholder="192.168.1.1 or https://example.com"
            />
          </div>

          <Button 
            onClick={handleCheck} 
            disabled={!ipInput.trim() || isChecking}
            className="w-full"
          >
            {isChecking ? 'Analyzing IP...' : 'Check IP Location & Security'}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Location Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500">IP Address</div>
                  <div className="font-mono font-semibold">{result.ip}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Country</div>
                  <div className="font-semibold">{result.country}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Region</div>
                  <div className="font-semibold">{result.region}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">City</div>
                  <div className="font-semibold">{result.city}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="w-5 h-5" />
                Network Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="text-sm text-gray-500">ISP</div>
                <div className="font-semibold">{result.isp}</div>
              </div>
              {result.hostingProvider && (
                <div>
                  <div className="text-sm text-gray-500">Hosting Provider</div>
                  <div className="font-semibold">{result.hostingProvider}</div>
                </div>
              )}
              {result.organization && (
                <div>
                  <div className="text-sm text-gray-500">Organization</div>
                  <div className="font-semibold">{result.organization}</div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Security Analysis
                </span>
                <Badge className={getThreatColor(result.threatScore)}>
                  Threat Score: {result.threatScore}/100
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <Wifi className="w-5 h-5" />
                  <div>
                    <div className="font-semibold">Proxy Detection</div>
                    <Badge variant={result.isProxy ? 'destructive' : 'default'}>
                      {result.isProxy ? 'Proxy Detected' : 'No Proxy'}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <Shield className="w-5 h-5" />
                  <div>
                    <div className="font-semibold">VPN Detection</div>
                    <Badge variant={result.isVPN ? 'destructive' : 'default'}>
                      {result.isVPN ? 'VPN Detected' : 'No VPN'}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <AlertTriangle className="w-5 h-5" />
                  <div>
                    <div className="font-semibold">Risk Level</div>
                    <Badge className={getThreatColor(result.threatScore)}>
                      {result.threatScore < 20 ? 'Low' : result.threatScore < 60 ? 'Medium' : 'High'}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Analysis Summary</h4>
                <p className="text-blue-700">
                  {result.isVPN || result.isProxy 
                    ? `⚠️ This IP shows signs of anonymization through ${result.isVPN ? 'VPN' : 'proxy'} services. Exercise caution when dealing with users from this IP.`
                    : `✅ This appears to be a legitimate residential/business IP from ${result.isp}. No major red flags detected.`
                  }
                  {result.threatScore > 60 && ' High threat score indicates potential malicious activity associated with this IP range.'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
