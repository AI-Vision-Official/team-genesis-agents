
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, MapPin, Users, Clock, CheckCircle, X, Eye } from 'lucide-react';
import type { CrisisAlert, AccessibilitySettings } from '@/types/humanitarian';

interface CrisisResponseProps {
  alerts: CrisisAlert[];
  settings: AccessibilitySettings;
}

export const CrisisResponse = ({ alerts, settings }: CrisisResponseProps) => {
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'natural_disaster': return '🌪️';
      case 'conflict': return '⚔️';
      case 'displacement': return '🏃‍♀️';
      case 'health_emergency': return '🏥';
      default: return '⚠️';
    }
  };

  const getUrgencyLevel = (urgency: number, feasibility: number) => {
    const score = (urgency + feasibility) / 2;
    if (score >= 8) return { level: 'Immediate Action', color: 'text-red-600' };
    if (score >= 6) return { level: 'High Priority', color: 'text-orange-600' };
    if (score >= 4) return { level: 'Monitor Closely', color: 'text-yellow-600' };
    return { level: 'Awareness', color: 'text-blue-600' };
  };

  const pendingAlerts = alerts.filter(a => a.status === 'new' || a.status === 'reviewing');
  const activeResponses = alerts.filter(a => a.status === 'responding');

  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-red-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🆘 Crisis Detection & Response Engine
          </CardTitle>
          <CardDescription>
            AI-powered global monitoring with ethical response suggestions for humanitarian action
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-red-50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {alerts.filter(a => a.severity === 'critical').length}
            </div>
            <div className="text-sm text-red-700">Critical Alerts</div>
          </CardContent>
        </Card>
        <Card className="bg-orange-50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {pendingAlerts.length}
            </div>
            <div className="text-sm text-orange-700">Pending Review</div>
          </CardContent>
        </Card>
        <Card className="bg-green-50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {activeResponses.length}
            </div>
            <div className="text-sm text-green-700">Active Responses</div>
          </CardContent>
        </Card>
        <Card className="bg-blue-50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {alerts.reduce((sum, a) => sum + a.affectedPopulation, 0).toLocaleString()}
            </div>
            <div className="text-sm text-blue-700">People Affected</div>
          </CardContent>
        </Card>
      </div>

      {/* Crisis Alerts */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Active Crisis Alerts</h3>
        
        {pendingAlerts.map((alert) => {
          const urgency = getUrgencyLevel(alert.urgency, alert.feasibility);
          return (
            <Card key={alert.id} className={`border-l-4 ${
              alert.severity === 'critical' ? 'border-l-red-500' : 
              alert.severity === 'high' ? 'border-l-orange-500' : 
              'border-l-yellow-500'
            }`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">{getTypeIcon(alert.type)}</span>
                      <CardTitle className="text-lg">{alert.title}</CardTitle>
                      <Badge className={getSeverityColor(alert.severity)}>
                        {alert.severity}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {alert.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {alert.affectedPopulation.toLocaleString()} affected
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {new Date(alert.detectedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-medium ${urgency.color}`}>
                      {urgency.level}
                    </div>
                    <div className="text-xs text-slate-500">
                      Urgency: {alert.urgency}/10 | Feasibility: {alert.feasibility}/10
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className={`${settings.readingLevel === 'simple' ? 'text-base' : 'text-sm'} text-slate-700`}>
                  {alert.description}
                </p>
                
                <div className="space-y-2">
                  <h5 className="font-medium">Suggested Actions:</h5>
                  <ul className="list-disc list-inside space-y-1">
                    {alert.suggestedActions.map((action, index) => (
                      <li key={index} className="text-sm text-slate-600">{action}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => setSelectedAlert(alert.id)}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Start Response
                  </Button>
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    Monitor
                  </Button>
                  <Button size="sm" variant="outline">
                    <X className="w-4 h-4 mr-2" />
                    Dismiss
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Crisis Scripts Generator */}
      <Card>
        <CardHeader>
          <CardTitle>Emergency Action Guides</CardTitle>
          <CardDescription>
            Auto-generated, simple-language guides for different crisis types
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h5 className="font-medium">For Affected Persons:</h5>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm">
                  <strong>🌪️ Natural Disaster Response:</strong><br />
                  1. Ensure immediate safety<br />
                  2. Contact emergency services<br />
                  3. Find shelter and clean water<br />
                  4. Document damage for aid<br />
                  5. Connect with family/friends
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <h5 className="font-medium">For Helpers:</h5>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm">
                  <strong>🤝 How to Help:</strong><br />
                  1. Donate to verified organizations<br />
                  2. Share accurate information<br />
                  3. Volunteer with local groups<br />
                  4. Provide emotional support<br />
                  5. Advocate for policy changes
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex gap-2">
            <Button size="sm" variant="outline">Generate Custom Guide</Button>
            <Button size="sm" variant="outline">Translate to Local Language</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
