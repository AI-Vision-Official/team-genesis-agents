
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, AlertTriangle, Heart, Shield, MessageSquare } from 'lucide-react';
import type { TrustProfile, ScreeningReport } from '@/types/trustScreening';

interface TrustProfileGeneratorProps {
  activeReport: ScreeningReport | null;
  onCreateReport: (subject: string) => ScreeningReport;
  onUpdateReport: (reportId: string, updates: Partial<ScreeningReport>) => void;
}

export const TrustProfileGenerator = ({ activeReport, onCreateReport, onUpdateReport }: TrustProfileGeneratorProps) => {
  const [conversationLog, setConversationLog] = useState('');
  const [profile, setProfile] = useState<TrustProfile | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!conversationLog.trim()) return;

    setIsAnalyzing(true);
    
    // Simulate AI analysis with realistic data
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Analyze conversation for red flags
    const hasLoveBombing = conversationLog.toLowerCase().includes('love') || conversationLog.toLowerCase().includes('perfect');
    const hasUrgency = conversationLog.toLowerCase().includes('urgent') || conversationLog.toLowerCase().includes('quickly');
    const hasFinancial = conversationLog.toLowerCase().includes('money') || conversationLog.toLowerCase().includes('invest');
    
    const mockProfile: TrustProfile = {
      overallScore: hasLoveBombing || hasUrgency || hasFinancial ? 35 : 75,
      empathyScore: conversationLog.toLowerCase().includes('sorry') || conversationLog.toLowerCase().includes('understand') ? 80 : 45,
      manipulationMarkers: [
        ...(hasLoveBombing ? [{
          type: 'love_bombing' as const,
          confidence: 85,
          evidence: ['Excessive compliments early in conversation', 'Claims of instant connection']
        }] : []),
        ...(hasUrgency ? [{
          type: 'urgency_pressure' as const,
          confidence: 75,
          evidence: ['Repeated use of urgent language', 'Pressure for quick decisions']
        }] : []),
        ...(hasFinancial ? [{
          type: 'financial_pressure' as const,
          confidence: 90,
          evidence: ['Discussion of money/investments', 'Financial opportunity mentions']
        }] : [])
      ],
      emotionalIndicators: [
        {
          type: 'boundary_violation',
          level: hasLoveBombing ? 'high' : 'low',
          description: hasLoveBombing ? 'Shows signs of pushing personal boundaries too quickly' : 'Appears to respect conversational boundaries'
        },
        {
          type: 'control_seeking',
          level: hasUrgency ? 'medium' : 'low',
          description: hasUrgency ? 'Attempts to control conversation pace and direction' : 'Normal conversational flow'
        }
      ],
      summary: `Analysis of conversation patterns suggests ${hasLoveBombing || hasUrgency || hasFinancial ? 'potential red flags' : 'relatively normal interaction'}. ${hasLoveBombing ? 'Love bombing patterns detected.' : ''} ${hasUrgency ? 'Urgency pressure tactics identified.' : ''} ${hasFinancial ? 'Financial manipulation indicators present.' : ''} Overall trust score indicates ${hasLoveBombing || hasUrgency || hasFinancial ? 'caution advised' : 'moderate trustworthiness'}.`,
      recommendations: [
        ...(hasLoveBombing ? ['Take time to process the relationship pace - healthy relationships develop gradually'] : []),
        ...(hasUrgency ? ['Be wary of pressure for quick decisions - legitimate opportunities allow time for consideration'] : []),
        ...(hasFinancial ? ['Never share financial information or send money to someone you have not met in person'] : []),
        'Verify identity through video calls and multiple platforms',
        'Trust your instincts - if something feels off, it probably is',
        'Share concerns with trusted friends or family members'
      ]
    };

    setProfile(mockProfile);

    // Update or create report
    let reportToUpdate = activeReport;
    if (!reportToUpdate) {
      reportToUpdate = onCreateReport('Trust Profile Analysis');
    }

    onUpdateReport(reportToUpdate.id, {
      trustProfile: mockProfile
    });

    setIsAnalyzing(false);
  };

  const getScoreColor = (score: number) => {
    if (score < 40) return 'text-red-600';
    if (score < 70) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            AI Trust Profile Generator
          </CardTitle>
          <CardDescription>
            Analyze conversation patterns to identify potential manipulation, emotional instability, and trust indicators
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="conversation">Conversation Log or Description</Label>
            <Textarea
              id="conversation"
              value={conversationLog}
              onChange={(e) => setConversationLog(e.target.value)}
              placeholder="Paste conversation text or describe the interaction patterns you've observed..."
              rows={6}
            />
          </div>

          <Button 
            onClick={handleAnalyze} 
            disabled={!conversationLog.trim() || isAnalyzing}
            className="w-full"
          >
            {isAnalyzing ? 'Analyzing Patterns...' : 'Generate Trust Profile'}
          </Button>

          <div className="text-xs text-gray-500 space-y-1">
            <p>• AI analyzes communication patterns for manipulation tactics</p>
            <p>• Looks for emotional pressure, boundary violations, and consistency</p>
            <p>• Results are guidance only - always trust your own instincts</p>
          </div>
        </CardContent>
      </Card>

      {profile && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Trust Profile Analysis
                <Badge className={getScoreColor(profile.overallScore)}>
                  Trust Score: {profile.overallScore}/100
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Score Breakdown</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Overall Trust</span>
                        <span className={`text-sm font-semibold ${getScoreColor(profile.overallScore)}`}>
                          {profile.overallScore}/100
                        </span>
                      </div>
                      <Progress value={profile.overallScore} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Empathy Score</span>
                        <span className={`text-sm font-semibold ${getScoreColor(profile.empathyScore)}`}>
                          {profile.empathyScore}/100
                        </span>
                      </div>
                      <Progress value={profile.empathyScore} className="h-2" />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">AI Summary</h4>
                  <p className="text-gray-700 p-4 bg-gray-50 rounded-lg">
                    {profile.summary}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {profile.manipulationMarkers.length > 0 && (
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <AlertTriangle className="w-5 h-5" />
                  Manipulation Markers Detected ({profile.manipulationMarkers.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profile.manipulationMarkers.map((marker, index) => (
                    <div key={index} className="border border-red-200 rounded-lg p-4 bg-red-50">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-red-800">
                          {marker.type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </h4>
                        <Badge variant="destructive">
                          {marker.confidence}% confidence
                        </Badge>
                      </div>
                      <ul className="space-y-1">
                        {marker.evidence.map((evidence, idx) => (
                          <li key={idx} className="text-sm text-red-700 flex items-center gap-2">
                            <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                            {evidence}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Emotional Indicators
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {profile.emotionalIndicators.map((indicator, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">
                        {indicator.type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </h4>
                      <p className="text-sm text-gray-600">{indicator.description}</p>
                    </div>
                    <Badge className={getLevelColor(indicator.level)}>
                      {indicator.level}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <Shield className="w-5 h-5" />
                Safety Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {profile.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start gap-2 text-blue-700">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    {recommendation}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
