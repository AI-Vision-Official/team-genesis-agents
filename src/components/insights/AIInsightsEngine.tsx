
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  Lightbulb, 
  TrendingUp, 
  Target, 
  Zap, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Star,
  ArrowRight,
  BarChart3,
  Users,
  DollarSign,
  Settings,
  Sparkles,
  Bot
} from 'lucide-react';

interface Insight {
  id: string;
  type: 'optimization' | 'opportunity' | 'risk' | 'automation' | 'performance';
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  impact: string;
  confidence: number;
  suggestedActions: string[];
  estimatedValue: number;
  timeToImplement: string;
  category: string;
  timestamp: Date;
  status: 'new' | 'reviewing' | 'implementing' | 'completed' | 'dismissed';
}

interface Recommendation {
  id: string;
  title: string;
  description: string;
  type: 'agent_optimization' | 'workflow_improvement' | 'cost_reduction' | 'performance_boost';
  impact: 'low' | 'medium' | 'high';
  effort: 'low' | 'medium' | 'high';
  roi: number;
  timeline: string;
}

export const AIInsightsEngine = () => {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [autoInsights, setAutoInsights] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    // Mock AI-generated insights
    const mockInsights: Insight[] = [
      {
        id: '1',
        type: 'optimization',
        priority: 'high',
        title: 'Agent Resource Optimization Opportunity',
        description: 'DataAnalyst-Alpha is underutilized during peak hours. Redistributing tasks could increase efficiency by 23%.',
        impact: 'Improved throughput and cost efficiency',
        confidence: 87,
        suggestedActions: [
          'Redistribute tasks from overloaded agents',
          'Implement dynamic load balancing',
          'Schedule intensive tasks during low-traffic periods'
        ],
        estimatedValue: 15000,
        timeToImplement: '2-3 days',
        category: 'Performance',
        timestamp: new Date(),
        status: 'new'
      },
      {
        id: '2',
        type: 'opportunity',
        priority: 'critical',
        title: 'Market Expansion Potential Detected',
        description: 'AI analysis of market trends shows 340% growth opportunity in enterprise automation tools.',
        impact: 'Significant revenue growth potential',
        confidence: 92,
        suggestedActions: [
          'Develop enterprise-focused features',
          'Create B2B marketing campaign',
          'Research competitor pricing strategies'
        ],
        estimatedValue: 250000,
        timeToImplement: '4-6 weeks',
        category: 'Business',
        timestamp: new Date(),
        status: 'new'
      },
      {
        id: '3',
        type: 'risk',
        priority: 'medium',
        title: 'Potential Performance Bottleneck',
        description: 'API response times are trending upward. Without intervention, user experience may degrade.',
        impact: 'User satisfaction and retention risk',
        confidence: 78,
        suggestedActions: [
          'Optimize database queries',
          'Implement caching layer',
          'Scale infrastructure resources'
        ],
        estimatedValue: -50000,
        timeToImplement: '1-2 weeks',
        category: 'Technical',
        timestamp: new Date(),
        status: 'reviewing'
      }
    ];

    const mockRecommendations: Recommendation[] = [
      {
        id: '1',
        title: 'Implement Agent Learning Feedback Loop',
        description: 'Create automated learning system to improve agent performance over time',
        type: 'agent_optimization',
        impact: 'high',
        effort: 'medium',
        roi: 3.2,
        timeline: '3-4 weeks'
      },
      {
        id: '2',
        title: 'Automate Routine Task Distribution',
        description: 'Use AI to automatically assign tasks based on agent capabilities and current workload',
        type: 'workflow_improvement',
        impact: 'medium',
        effort: 'low',
        roi: 2.1,
        timeline: '1-2 weeks'
      }
    ];

    setInsights(mockInsights);
    setRecommendations(mockRecommendations);
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'optimization': return <TrendingUp className="w-4 h-4" />;
      case 'opportunity': return <Target className="w-4 h-4" />;
      case 'risk': return <AlertTriangle className="w-4 h-4" />;
      case 'automation': return <Zap className="w-4 h-4" />;
      case 'performance': return <BarChart3 className="w-4 h-4" />;
      default: return <Lightbulb className="w-4 h-4" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const implementInsight = (insightId: string) => {
    setInsights(prev => prev.map(insight => 
      insight.id === insightId 
        ? { ...insight, status: 'implementing' }
        : insight
    ));
    console.log(`Implementing insight: ${insightId}`);
  };

  const dismissInsight = (insightId: string) => {
    setInsights(prev => prev.map(insight => 
      insight.id === insightId 
        ? { ...insight, status: 'dismissed' }
        : insight
    ));
  };

  const filteredInsights = selectedCategory === 'all' 
    ? insights 
    : insights.filter(insight => insight.category.toLowerCase() === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-3">
            <Brain className="w-8 h-8 text-purple-600" />
            AI-Powered Insights Engine
          </h2>
          <p className="text-slate-600 mt-2">Automated analysis and intelligent recommendations</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant={autoInsights ? "default" : "outline"}
            onClick={() => setAutoInsights(!autoInsights)}
            className={autoInsights ? "bg-gradient-to-r from-purple-600 to-pink-600" : ""}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            {autoInsights ? 'Auto-Insights ON' : 'Manual Mode'}
          </Button>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
            <Bot className="w-4 h-4 mr-2" />
            Generate Insights
          </Button>
        </div>
      </div>

      {/* AI Insights Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-green-700">
                  {insights.filter(i => i.type === 'opportunity').length}
                </p>
                <p className="text-sm text-green-600">Opportunities</p>
              </div>
              <Target className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-blue-700">
                  {insights.filter(i => i.type === 'optimization').length}
                </p>
                <p className="text-sm text-blue-600">Optimizations</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-orange-700">
                  {insights.filter(i => i.type === 'risk').length}
                </p>
                <p className="text-sm text-orange-600">Risk Alerts</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-purple-700">
                  ${insights.reduce((sum, i) => sum + Math.abs(i.estimatedValue), 0).toLocaleString()}
                </p>
                <p className="text-sm text-purple-600">Potential Value</p>
              </div>
              <DollarSign className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="insights" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="analytics">Predictive Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="insights" className="space-y-6">
          {/* Category Filter */}
          <div className="flex gap-2 flex-wrap">
            {['all', 'performance', 'business', 'technical'].map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>

          {/* Insights List */}
          <div className="grid gap-4">
            {filteredInsights.map((insight) => (
              <Card key={insight.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(insight.type)}
                        <CardTitle className="text-lg">{insight.title}</CardTitle>
                        <Badge className={getPriorityColor(insight.priority)}>
                          {insight.priority}
                        </Badge>
                      </div>
                      <CardDescription>{insight.description}</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-medium">{insight.confidence}%</span>
                      </div>
                      <span className="text-xs text-slate-500">confidence</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Impact:</span>
                        <p className="text-slate-600">{insight.impact}</p>
                      </div>
                      <div>
                        <span className="font-medium">Estimated Value:</span>
                        <p className={insight.estimatedValue >= 0 ? 'text-green-600' : 'text-red-600'}>
                          ${Math.abs(insight.estimatedValue).toLocaleString()}
                          {insight.estimatedValue < 0 && ' (risk)'}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium">Timeline:</span>
                        <p className="text-slate-600">{insight.timeToImplement}</p>
                      </div>
                    </div>

                    <div>
                      <span className="font-medium text-sm">Suggested Actions:</span>
                      <ul className="mt-2 space-y-1">
                        {insight.suggestedActions.map((action, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-slate-600">
                            <ArrowRight className="w-3 h-3" />
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button 
                        onClick={() => implementInsight(insight.id)}
                        disabled={insight.status !== 'new'}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Implement
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => dismissInsight(insight.id)}
                        disabled={insight.status === 'dismissed'}
                      >
                        Dismiss
                      </Button>
                      <Badge variant="outline" className="ml-auto">
                        {insight.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <div className="grid gap-4">
            {recommendations.map((rec) => (
              <Card key={rec.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{rec.title}</CardTitle>
                  <CardDescription>{rec.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Impact:</span>
                        <Badge className={getImpactColor(rec.impact)}>{rec.impact}</Badge>
                      </div>
                      <div>
                        <span className="font-medium">Effort:</span>
                        <Badge className={getImpactColor(rec.effort)}>{rec.effort}</Badge>
                      </div>
                      <div>
                        <span className="font-medium">ROI:</span>
                        <span className="text-green-600 font-medium">{rec.roi}x</span>
                      </div>
                      <div>
                        <span className="font-medium">Timeline:</span>
                        <span className="text-slate-600">{rec.timeline}</span>
                      </div>
                    </div>
                    <Button className="w-full">
                      Start Implementation
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Predictive Analytics Dashboard
              </CardTitle>
              <CardDescription>
                AI-powered forecasting and trend analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Performance Forecast</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Next 30 Days</span>
                      <span className="text-green-600">+15% efficiency</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Resource Needs</span>
                      <span className="text-blue-600">Scale recommended</span>
                    </div>
                    <Progress value={72} className="h-2" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium">Risk Assessment</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>System Stability</span>
                      <span className="text-green-600">Low Risk</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Market Volatility</span>
                      <span className="text-yellow-600">Medium Risk</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
