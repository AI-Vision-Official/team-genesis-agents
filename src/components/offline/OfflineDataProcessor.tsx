
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Database, HardDrive, Zap, Search, FileText, Brain } from 'lucide-react';

interface CacheEntry {
  id: string;
  query: string;
  response: string;
  frequency: number;
  lastAccessed: Date;
  computeTime: number;
  confidence: number;
}

interface IndexedData {
  id: string;
  type: 'document' | 'knowledge' | 'context';
  title: string;
  content: string;
  vectors: number[];
  metadata: Record<string, any>;
  size: number;
}

interface PrecomputedResult {
  id: string;
  domain: string;
  query: string;
  result: string;
  relevanceScore: number;
  createdAt: Date;
}

export const OfflineDataProcessor = () => {
  const [cacheEntries] = useState<CacheEntry[]>([
    {
      id: '1',
      query: 'What is machine learning?',
      response: 'Machine learning is a subset of artificial intelligence...',
      frequency: 47,
      lastAccessed: new Date(),
      computeTime: 1200,
      confidence: 92
    },
    {
      id: '2',
      query: 'How to write a grant proposal?',
      response: 'A grant proposal should include clear objectives...',
      frequency: 23,
      lastAccessed: new Date(Date.now() - 3600000),
      computeTime: 2100,
      confidence: 89
    },
    {
      id: '3',
      query: 'NGO impact measurement strategies',
      response: 'Impact measurement for NGOs involves...',
      frequency: 31,
      lastAccessed: new Date(Date.now() - 7200000),
      computeTime: 1800,
      confidence: 94
    }
  ]);

  const [indexedData] = useState<IndexedData[]>([
    {
      id: '1',
      type: 'document',
      title: 'UN Sustainable Development Goals',
      content: 'The 17 SDGs are an urgent call for action...',
      vectors: [0.1, 0.3, 0.7, 0.2, 0.9],
      metadata: { source: 'UN', year: 2023, language: 'en' },
      size: 2.1
    },
    {
      id: '2',
      type: 'knowledge',
      title: 'Grant Writing Best Practices',
      content: 'Effective grant writing requires clear articulation...',
      vectors: [0.4, 0.6, 0.2, 0.8, 0.3],
      metadata: { source: 'Internal', category: 'fundraising' },
      size: 1.8
    },
    {
      id: '3',
      type: 'context',
      title: 'Humanitarian Crisis Response Protocols',
      content: 'Emergency response requires coordinated efforts...',
      vectors: [0.7, 0.1, 0.9, 0.4, 0.6],
      metadata: { urgency: 'high', region: 'global' },
      size: 3.2
    }
  ]);

  const [precomputedResults] = useState<PrecomputedResult[]>([
    {
      id: '1',
      domain: 'humanitarian',
      query: 'disaster response coordination',
      result: 'Effective disaster response requires multi-agency coordination...',
      relevanceScore: 0.94,
      createdAt: new Date()
    },
    {
      id: '2',
      domain: 'fundraising',
      query: 'donor engagement strategies',
      result: 'Successful donor engagement involves personalized approaches...',
      relevanceScore: 0.87,
      createdAt: new Date()
    }
  ]);

  const [cacheUtilization, setCacheUtilization] = useState(67);
  const [indexingProgress, setIndexingProgress] = useState(85);
  const [isOptimizing, setIsOptimizing] = useState(false);

  useEffect(() => {
    // Simulate cache optimization
    const interval = setInterval(() => {
      setCacheUtilization(prev => Math.min(100, prev + Math.random() * 2 - 1));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const optimizeCache = async () => {
    setIsOptimizing(true);
    
    // Simulate cache optimization process
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setIndexingProgress(i);
    }
    
    setIsOptimizing(false);
  };

  const totalCacheSize = cacheEntries.reduce((acc, entry) => acc + entry.query.length + entry.response.length, 0) / 1024;
  const totalIndexSize = indexedData.reduce((acc, data) => acc + data.size, 0);
  const avgResponseTime = cacheEntries.reduce((acc, entry) => acc + entry.computeTime, 0) / cacheEntries.length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700">Cache Hit Rate</p>
                <p className="text-2xl font-bold text-blue-900">{cacheUtilization}%</p>
              </div>
              <Database className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700">Indexed Data</p>
                <p className="text-2xl font-bold text-green-900">{totalIndexSize.toFixed(1)} MB</p>
              </div>
              <HardDrive className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700">Avg Response</p>
                <p className="text-2xl font-bold text-purple-900">{(avgResponseTime / 1000).toFixed(1)}s</p>
              </div>
              <Zap className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-700">Cache Entries</p>
                <p className="text-2xl font-bold text-orange-900">{cacheEntries.length}</p>
              </div>
              <Brain className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Intelligent Caching System
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Cache Utilization</span>
              <span className="text-sm font-medium">{cacheUtilization}%</span>
            </div>
            <Progress value={cacheUtilization} className="h-2" />
          </div>

          <div className="space-y-3">
            {cacheEntries.slice(0, 3).map((entry) => (
              <div key={entry.id} className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">{entry.query}</span>
                  <Badge variant="outline" className="text-xs">
                    {entry.frequency} hits
                  </Badge>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs text-gray-600">
                  <span>Confidence: {entry.confidence}%</span>
                  <span>Time: {(entry.computeTime / 1000).toFixed(1)}s</span>
                  <span>Last: {entry.lastAccessed.toLocaleTimeString()}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Button onClick={optimizeCache} disabled={isOptimizing} variant="outline">
              {isOptimizing ? 'Optimizing...' : 'Optimize Cache'}
            </Button>
            <Button variant="outline">
              <Search className="w-4 h-4 mr-2" />
              Search Cache
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Indexed Knowledge Base
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {indexedData.map((data) => (
              <div key={data.id} className="border rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge className={
                      data.type === 'document' ? 'bg-blue-100 text-blue-800' :
                      data.type === 'knowledge' ? 'bg-green-100 text-green-800' :
                      'bg-purple-100 text-purple-800'
                    }>
                      {data.type}
                    </Badge>
                    <span className="font-medium">{data.title}</span>
                  </div>
                  <span className="text-sm text-gray-600">{data.size} MB</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{data.content.substring(0, 100)}...</p>
                <div className="flex flex-wrap gap-1">
                  {Object.entries(data.metadata).slice(0, 3).map(([key, value]) => (
                    <Badge key={key} variant="outline" className="text-xs">
                      {key}: {value}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Indexing Progress</span>
              <span className="text-sm">{indexingProgress}%</span>
            </div>
            <Progress value={indexingProgress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Precomputed Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {precomputedResults.map((result) => (
              <div key={result.id} className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-3 rounded-lg border border-yellow-200">
                <div className="flex items-center justify-between mb-2">
                  <Badge className="bg-yellow-200 text-yellow-800">{result.domain}</Badge>
                  <span className="text-sm text-gray-600">
                    Relevance: {(result.relevanceScore * 100).toFixed(0)}%
                  </span>
                </div>
                <p className="font-medium text-sm mb-1">{result.query}</p>
                <p className="text-sm text-gray-600">{result.result.substring(0, 120)}...</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
