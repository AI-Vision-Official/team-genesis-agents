
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Users, ExternalLink, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import type { NetworkAnalysisResult, ScreeningReport } from '@/types/trustScreening';

interface NetworkAnalyzerProps {
  activeReport: ScreeningReport | null;
  onCreateReport: (subject: string) => ScreeningReport;
  onUpdateReport: (reportId: string, updates: Partial<ScreeningReport>) => void;
}

export const NetworkAnalyzer = ({ activeReport, onCreateReport, onUpdateReport }: NetworkAnalyzerProps) => {
  const [nameInput, setNameInput] = useState('');
  const [result, setResult] = useState<NetworkAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!nameInput.trim()) return;

    setIsAnalyzing(true);
    
    // Simulate API call with realistic data
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const mockResult: NetworkAnalysisResult = {
      name: nameInput,
      linkedPlatforms: [
        {
          name: 'LinkedIn',
          url: 'https://linkedin.com/in/example',
          verified: true,
          activity: 'active',
          joinDate: '2018-03-15'
        },
        {
          name: 'Twitter/X',
          url: 'https://x.com/example',
          verified: false,
          activity: 'active',
          joinDate: '2019-07-22'
        },
        {
          name: 'GitHub',
          url: 'https://github.com/example',
          verified: true,
          activity: 'active',
          joinDate: '2017-01-10'
        },
        {
          name: 'Facebook',
          verified: false,
          activity: 'inactive',
          joinDate: '2015-05-08'
        },
        {
          name: 'Instagram',
          verified: false,
          activity: 'suspended',
          joinDate: '2020-11-12'
        }
      ],
      redFlags: nameInput.toLowerCase().includes('scam') ? [
        {
          type: 'scam_alias',
          severity: 'high',
          description: 'Name appears in known scammer database',
          source: 'Community Reports'
        },
        {
          type: 'multiple_identities',
          severity: 'medium',
          description: 'Multiple conflicting profiles with same name',
          source: 'Cross-platform Analysis'
        }
      ] : [],
      confidence: Math.floor(Math.random() * 40) + 60,
      lastUpdated: new Date().toISOString()
    };

    setResult(mockResult);

    // Update or create report
    let reportToUpdate = activeReport;
    if (!reportToUpdate) {
      reportToUpdate = onCreateReport(nameInput);
    }

    onUpdateReport(reportToUpdate.id, {
      subject: nameInput,
      networkAnalysis: mockResult
    });

    setIsAnalyzing(false);
  };

  const getActivityIcon = (activity: string) => {
    switch (activity) {
      case 'active': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'inactive': return <Clock className="w-4 h-4 text-gray-500" />;
      case 'suspended': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-yellow-600 bg-yellow-100';
      case 'medium': return 'text-orange-600 bg-orange-100';
      case 'high': return 'text-red-600 bg-red-100';
      case 'critical': return 'text-red-800 bg-red-200';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Name-to-Network Analyzer
          </CardTitle>
          <CardDescription>
            Map an individual's digital footprint across social platforms and detect red flags
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name-input">Full Name or Alias</Label>
            <Input
              id="name-input"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="John Doe or @username"
            />
          </div>

          <Button 
            onClick={handleAnalyze} 
            disabled={!nameInput.trim() || isAnalyzing}
            className="w-full"
          >
            {isAnalyzing ? 'Analyzing Network...' : 'Analyze Digital Footprint'}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Network Analysis Results
                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    Confidence: {result.confidence}%
                  </Badge>
                  <Badge variant="outline">
                    {result.linkedPlatforms.length} Platforms Found
                  </Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {result.linkedPlatforms.map((platform, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{platform.name}</h4>
                        {platform.verified && (
                          <CheckCircle className="w-4 h-4 text-blue-500" />
                        )}
                      </div>
                      {getActivityIcon(platform.activity)}
                    </div>
                    
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Status:</span>
                        <Badge 
                          variant={platform.activity === 'active' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {platform.activity}
                        </Badge>
                      </div>
                      {platform.joinDate && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Joined:</span>
                          <span>{new Date(platform.joinDate).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>

                    {platform.url && (
                      <Button variant="ghost" size="sm" className="w-full mt-2" asChild>
                        <a href={platform.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-3 h-3 mr-1" />
                          View Profile
                        </a>
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {result.redFlags.length > 0 && (
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <AlertTriangle className="w-5 h-5" />
                  Red Flags Detected ({result.redFlags.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {result.redFlags.map((flag, index) => (
                    <div key={index} className="border border-red-200 rounded-lg p-4 bg-red-50">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-red-800">
                          {flag.type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </h4>
                        <Badge className={getSeverityColor(flag.severity)}>
                          {flag.severity}
                        </Badge>
                      </div>
                      <p className="text-red-700 mb-1">{flag.description}</p>
                      <p className="text-xs text-red-600">Source: {flag.source}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <h4 className="font-semibold text-blue-800 mb-2">Platform Timeline</h4>
              <div className="space-y-2">
                {result.linkedPlatforms
                  .filter(p => p.joinDate)
                  .sort((a, b) => new Date(a.joinDate!).getTime() - new Date(b.joinDate!).getTime())
                  .map((platform, index) => (
                    <div key={index} className="flex items-center gap-3 text-sm">
                      <span className="text-blue-600 font-mono">
                        {new Date(platform.joinDate!).getFullYear()}
                      </span>
                      <span className="text-blue-800">
                        Joined {platform.name}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {platform.activity}
                      </Badge>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
