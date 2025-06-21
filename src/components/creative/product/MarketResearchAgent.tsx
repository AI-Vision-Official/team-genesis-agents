
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Search, 
  TrendingUp, 
  Target, 
  BarChart3, 
  Users, 
  DollarSign,
  Brain,
  Zap,
  Star,
  RefreshCw
} from 'lucide-react';
import type { AccessibilityOptions } from '@/types/creative';

interface MarketResearchAgentProps {
  settings: AccessibilityOptions;
}

export const MarketResearchAgent = ({ settings }: MarketResearchAgentProps) => {
  const [researchQuery, setResearchQuery] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [researchProgress, setResearchProgress] = useState(0);

  const trendingNiches = [
    {
      id: 'autism-sensory',
      name: 'Autism & Sensory-Friendly Products',
      demand: 94,
      competition: 'Medium',
      potential: 'High',
      keywords: ['autism', 'sensory friendly', 'large print', 'special needs'],
      avgPrice: '€15-25',
      marketSize: '2.3M searches/month'
    },
    {
      id: 'gothic-healing',
      name: 'Gothic Healing & Dark Academia',
      demand: 87,
      competition: 'Low',
      potential: 'Very High',
      keywords: ['gothic', 'dark academia', 'healing', 'poetry'],
      avgPrice: '€12-20',
      marketSize: '1.8M searches/month'
    },
    {
      id: 'trauma-recovery',
      name: 'Trauma Recovery & Mindfulness',
      demand: 91,
      competition: 'High',
      potential: 'Medium',
      keywords: ['trauma recovery', 'PTSD', 'mindfulness', 'therapy'],
      avgPrice: '€10-18',
      marketSize: '3.1M searches/month'
    }
  ];

  const competitorAnalysis = [
    {
      name: 'Healing Arts Books',
      rating: 4.2,
      reviews: 1847,
      priceRange: '€8-15',
      strengths: ['Good design', 'Affordable'],
      weaknesses: ['Limited customization', 'Poor paper quality']
    },
    {
      name: 'Mindful Creations',
      rating: 4.7,
      reviews: 892,
      priceRange: '€12-22',
      strengths: ['Premium quality', 'Great reviews'],
      weaknesses: ['Higher price', 'Limited variety']
    }
  ];

  const handleResearch = async () => {
    setAnalyzing(true);
    setResearchProgress(0);

    // Simulate research process
    const interval = setInterval(() => {
      setResearchProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setAnalyzing(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className={`text-xl font-bold ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            AI Market Research Agent
          </h3>
          <p className={`text-gray-600 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            Intelligent market analysis and niche discovery
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline">Live Data</Badge>
          <Badge variant="outline">AI Powered</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Research Input */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              Research Query
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Product Idea or Niche</label>
              <Textarea
                placeholder="e.g., 'gothic healing journals for trauma survivors' or 'large print puzzle books for autism'"
                value={researchQuery}
                onChange={(e) => setResearchQuery(e.target.value)}
                className={`mt-1 ${settings.dyslexiaFont ? 'font-mono' : ''}`}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Quick Niches</label>
              <div className="flex flex-wrap gap-2">
                {['Gothic poetry', 'Autism-friendly', 'Trauma healing', 'Dark academia', 'Mindfulness'].map((niche) => (
                  <Button
                    key={niche}
                    size="sm"
                    variant="outline"
                    onClick={() => setResearchQuery(niche + ' products')}
                  >
                    {niche}
                  </Button>
                ))}
              </div>
            </div>

            <Button 
              onClick={handleResearch} 
              disabled={!researchQuery || analyzing}
              className="w-full"
            >
              {analyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing Market...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Start Research
                </>
              )}
            </Button>

            {analyzing && (
              <div className="space-y-2">
                <Progress value={researchProgress} />
                <p className="text-sm text-gray-500">
                  Analyzing demand, competition, and trends...
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Trending Niches */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Trending Product Niches
            </CardTitle>
            <CardDescription>
              High-potential markets identified by AI analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trendingNiches.map((niche) => (
                <div key={niche.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium">{niche.name}</h4>
                      <p className="text-sm text-gray-500">{niche.marketSize}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={niche.potential === 'Very High' ? 'default' : 'outline'}>
                        {niche.potential}
                      </Badge>
                      <div className="text-right">
                        <div className="text-sm font-medium">{niche.demand}/100</div>
                        <div className="text-xs text-gray-500">Demand Score</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <div className="text-sm font-medium">Competition</div>
                      <div className="text-sm text-gray-600">{niche.competition}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Price Range</div>
                      <div className="text-sm text-gray-600">{niche.avgPrice}</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {niche.keywords.map((keyword) => (
                      <Badge key={keyword} variant="secondary" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Market Analysis Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Competitor Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {competitorAnalysis.map((competitor, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{competitor.name}</h4>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm">{competitor.rating}</span>
                      <span className="text-xs text-gray-500">({competitor.reviews})</span>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-2">
                    Price Range: {competitor.priceRange}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <div className="font-medium text-green-600">Strengths</div>
                      {competitor.strengths.map((strength, i) => (
                        <div key={i}>• {strength}</div>
                      ))}
                    </div>
                    <div>
                      <div className="font-medium text-red-600">Weaknesses</div>
                      {competitor.weaknesses.map((weakness, i) => (
                        <div key={i}>• {weakness}</div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Market Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-lg p-4 bg-green-50">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-green-600" />
                  <span className="font-medium text-green-800">High Opportunity</span>
                </div>
                <h4 className="font-medium">Large Print Gothic Journals</h4>
                <p className="text-sm text-gray-600">
                  Underserved market combining accessibility with gothic aesthetic
                </p>
                <div className="mt-2">
                  <Badge variant="outline" className="text-xs">
                    Low competition • High demand
                  </Badge>
                </div>
              </div>

              <div className="border rounded-lg p-4 bg-blue-50">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-blue-800">Emerging Trend</span>
                </div>
                <h4 className="font-medium">AI-Generated Affirmation Books</h4>
                <p className="text-sm text-gray-600">
                  Personalized content is becoming increasingly popular
                </p>
                <div className="mt-2">
                  <Badge variant="outline" className="text-xs">
                    Growing demand • Tech advantage
                  </Badge>
                </div>
              </div>

              <div className="border rounded-lg p-4 bg-purple-50">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-4 h-4 text-purple-600" />
                  <span className="font-medium text-purple-800">Revenue Potential</span>
                </div>
                <h4 className="font-medium">Trauma Recovery Workbooks</h4>
                <p className="text-sm text-gray-600">
                  High-value niche with strong purchasing intent
                </p>
                <div className="mt-2">
                  <Badge variant="outline" className="text-xs">
                    Premium pricing • Loyal customers
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
