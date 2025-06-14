
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Search, TrendingUp, Target, BarChart3, Zap, Eye } from 'lucide-react';

export const SEOOptimizer = () => {
  const seoMetrics = {
    organicTraffic: 145000,
    avgPosition: 3.2,
    totalKeywords: 2847,
    rankingKeywords: 1923,
    clickThroughRate: 8.7,
    conversionRate: 4.2
  };

  const keywordOpportunities = [
    {
      keyword: 'AI marketing automation',
      volume: 18500,
      difficulty: 52,
      position: 8,
      opportunity: 'high',
      trend: 'rising'
    },
    {
      keyword: 'content strategy AI',
      volume: 12000,
      difficulty: 45,
      position: 12,
      opportunity: 'medium',
      trend: 'stable'
    },
    {
      keyword: 'SEO optimization tools',
      volume: 24000,
      difficulty: 68,
      position: 6,
      opportunity: 'high',
      trend: 'rising'
    }
  ];

  const contentGaps = [
    'AI-powered content creation guide',
    'Advanced SEO strategies for 2024',
    'Marketing automation workflows',
    'Voice search optimization techniques'
  ];

  const getOpportunityColor = (opportunity: string) => {
    switch (opportunity) {
      case 'high': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'rising' ? (
      <TrendingUp className="w-3 h-3 text-green-600" />
    ) : (
      <div className="w-3 h-3 bg-gray-400 rounded-full" />
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">SEO Command Center</h2>
          <p className="text-slate-600">Advanced optimization for maximum organic reach</p>
        </div>
        <Button className="bg-gradient-to-r from-green-600 to-blue-600">
          <Zap className="w-4 h-4 mr-2" />
          Optimize Content
        </Button>
      </div>

      {/* SEO Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700">Organic Traffic</p>
                <p className="text-2xl font-bold text-green-900">{(seoMetrics.organicTraffic / 1000).toFixed(0)}k</p>
              </div>
              <Search className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700">Avg Position</p>
                <p className="text-2xl font-bold text-blue-900">{seoMetrics.avgPosition}</p>
              </div>
              <Target className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700">Keywords Ranking</p>
                <p className="text-2xl font-bold text-purple-900">{seoMetrics.rankingKeywords}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Keyword Opportunities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            High-Impact Keyword Opportunities
          </CardTitle>
          <CardDescription>AI-identified keywords with maximum growth potential</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {keywordOpportunities.map((keyword, index) => (
              <div key={index} className="p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <h4 className="font-medium">{keyword.keyword}</h4>
                    <Badge className={getOpportunityColor(keyword.opportunity)}>
                      {keyword.opportunity} opportunity
                    </Badge>
                    <div className="flex items-center gap-1">
                      {getTrendIcon(keyword.trend)}
                      <span className="text-xs text-slate-600">{keyword.trend}</span>
                    </div>
                  </div>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <Eye className="w-4 h-4 mr-2" />
                    Optimize
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-slate-600">Volume:</span>
                    <span className="font-medium ml-1">{keyword.volume.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-slate-600">Difficulty:</span>
                    <span className="font-medium ml-1">{keyword.difficulty}/100</span>
                  </div>
                  <div>
                    <span className="text-slate-600">Position:</span>
                    <span className="font-medium ml-1">#{keyword.position}</span>
                  </div>
                  <div>
                    <span className="text-slate-600">Est. Traffic:</span>
                    <span className="font-medium ml-1">{Math.round(keyword.volume * 0.15)}</span>
                  </div>
                </div>
                
                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Optimization Progress</span>
                    <span>{Math.round((11 - keyword.position) * 10)}%</span>
                  </div>
                  <Progress value={(11 - keyword.position) * 10} className="h-1" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Content Gaps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Content Gap Analysis
          </CardTitle>
          <CardDescription>AI-detected content opportunities to capture market share</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {contentGaps.map((gap, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="font-medium">{gap}</span>
                <Button size="sm" variant="outline">
                  Create Content
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Technical SEO Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Technical SEO Health
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Page Speed Score</span>
                <span>94/100</span>
              </div>
              <Progress value={94} className="h-2 mb-4" />
              
              <div className="flex justify-between text-sm mb-2">
                <span>Mobile Optimization</span>
                <span>98/100</span>
              </div>
              <Progress value={98} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Core Web Vitals</span>
                <span>89/100</span>
              </div>
              <Progress value={89} className="h-2 mb-4" />
              
              <div className="flex justify-between text-sm mb-2">
                <span>Schema Markup</span>
                <span>76/100</span>
              </div>
              <Progress value={76} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
