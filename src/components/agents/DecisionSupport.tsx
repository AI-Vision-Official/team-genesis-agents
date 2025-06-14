
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  TrendingUp, 
  CheckCircle, 
  XCircle,
  AlertTriangle,
  Lightbulb,
  BarChart3,
  Target
} from 'lucide-react';
import type { AIDecisionSuggestion } from '@/types/agentFramework';

interface DecisionSupportProps {
  suggestions: AIDecisionSuggestion[];
}

export const DecisionSupport = ({ suggestions }: DecisionSupportProps) => {
  // Mock AI suggestions data
  const mockSuggestions: AIDecisionSuggestion[] = [
    {
      id: 'suggestion-1',
      category: 'agent_spawning',
      title: 'Spawn Security Specialist',
      description: 'Current security workload exceeds optimal capacity. Recommend spawning specialized security agent.',
      confidence: 0.89,
      impact: 'high',
      reasoning: [
        'Security tasks increased 340% this week',
        'Current security agent at 95% capacity',
        'Average response time to security incidents: 45 minutes (target: 15 minutes)'
      ],
      dataPoints: [
        'Security incidents: 23 (vs. avg 7)',
        'Security agent workload: 95%',
        'Response time: 45min (target: 15min)'
      ],
      suggestedActions: [
        'Create new SecuritySpecialist agent with restricted clearance',
        'Transfer 60% of current security workload',
        'Implement automated threat detection protocols'
      ],
      alternatives: [
        'Increase automation for current security agent',
        'Temporarily reassign general agents to security tasks'
      ],
      timestamp: new Date(),
      status: 'pending'
    },
    {
      id: 'suggestion-2',
      category: 'resource_allocation',
      title: 'Optimize Development Team Structure',
      description: 'Frontend development bottleneck identified. Recommend team restructuring.',
      confidence: 0.76,
      impact: 'medium',
      reasoning: [
        'Frontend tasks accumulating in backlog',
        'Backend agents underutilized (65% avg workload)',
        'Project delivery delayed by 2.3 days on average'
      ],
      dataPoints: [
        'Frontend backlog: 18 tasks',
        'Backend utilization: 65%',
        'Delivery delay: +2.3 days'
      ],
      suggestedActions: [
        'Cross-train backend agents for frontend tasks',
        'Implement shared component library',
        'Adjust task distribution algorithms'
      ],
      alternatives: [
        'Spawn additional frontend specialist',
        'Outsource frontend overflow tasks'
      ],
      timestamp: new Date(),
      status: 'pending'
    }
  ];

  const allSuggestions = [...suggestions, ...mockSuggestions];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'resource_allocation': return <Target className="w-5 h-5 text-blue-600" />;
      case 'agent_spawning': return <Brain className="w-5 h-5 text-purple-600" />;
      case 'task_prioritization': return <BarChart3 className="w-5 h-5 text-green-600" />;
      case 'workflow_optimization': return <TrendingUp className="w-5 h-5 text-orange-600" />;
      case 'risk_management': return <AlertTriangle className="w-5 h-5 text-red-600" />;
      default: return <Lightbulb className="w-5 h-5 text-gray-600" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600';
    if (confidence >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleAcceptSuggestion = (id: string) => {
    console.log('Accepting suggestion:', id);
  };

  const handleRejectSuggestion = (id: string) => {
    console.log('Rejecting suggestion:', id);
  };

  const pendingSuggestions = allSuggestions.filter(s => s.status === 'pending');
  const implementedSuggestions = allSuggestions.filter(s => s.status === 'implemented');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">AI Decision Support</h2>
          <p className="text-slate-600">Intelligent recommendations for optimal agent framework management</p>
        </div>
        <Badge variant="outline" className="flex items-center gap-1">
          <Brain className="w-3 h-3" />
          {pendingSuggestions.length} Active Suggestions
        </Badge>
      </div>

      {/* Decision Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700">Pending</p>
                <p className="text-2xl font-bold text-blue-900">{pendingSuggestions.length}</p>
              </div>
              <Brain className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700">Implemented</p>
                <p className="text-2xl font-bold text-green-900">{implementedSuggestions.length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700">Avg Confidence</p>
                <p className="text-2xl font-bold text-purple-900">
                  {((allSuggestions.reduce((acc, s) => acc + s.confidence, 0) / allSuggestions.length) * 100).toFixed(0)}%
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-700">High Impact</p>
                <p className="text-2xl font-bold text-orange-900">
                  {allSuggestions.filter(s => s.impact === 'high').length}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-orange-600" />
            Pending Recommendations
          </CardTitle>
          <CardDescription>AI-generated suggestions awaiting your decision</CardDescription>
        </CardHeader>
        <CardContent>
          {pendingSuggestions.length === 0 ? (
            <div className="text-center py-8">
              <Brain className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600">No pending suggestions</p>
              <p className="text-sm text-slate-500">The AI will analyze your system and provide recommendations</p>
            </div>
          ) : (
            <div className="space-y-6">
              {pendingSuggestions.map((suggestion) => (
                <Card key={suggestion.id} className="border-l-4 border-l-blue-400">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {getCategoryIcon(suggestion.category)}
                        <div>
                          <h4 className="font-semibold text-lg">{suggestion.title}</h4>
                          <p className="text-slate-600">{suggestion.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getImpactColor(suggestion.impact)}>
                          {suggestion.impact} impact
                        </Badge>
                        <Badge variant="outline" className={getConfidenceColor(suggestion.confidence)}>
                          {(suggestion.confidence * 100).toFixed(0)}% confidence
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h5 className="font-medium mb-2">AI Reasoning:</h5>
                        <ul className="space-y-1 text-sm text-slate-700">
                          {suggestion.reasoning.map((reason, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-blue-600 mt-1">•</span>
                              <span>{reason}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 className="font-medium mb-2">Supporting Data:</h5>
                        <div className="space-y-1">
                          {suggestion.dataPoints.map((dataPoint, index) => (
                            <div key={index} className="text-sm bg-slate-100 rounded px-2 py-1">
                              {dataPoint}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h5 className="font-medium mb-2">Suggested Actions:</h5>
                      <div className="space-y-2">
                        {suggestion.suggestedActions.map((action, index) => (
                          <div key={index} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>{action}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t">
                      <div className="text-sm text-slate-500">
                        Generated {suggestion.timestamp.toLocaleString()}
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleRejectSuggestion(suggestion.id)}
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleAcceptSuggestion(suggestion.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Implement
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
