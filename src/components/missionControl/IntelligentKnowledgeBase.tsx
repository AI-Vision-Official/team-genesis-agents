
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, BookOpen, TrendingUp, Users, Lightbulb } from 'lucide-react';
import type { KnowledgeItem } from '@/types/missionControl';

export const IntelligentKnowledgeBase = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [knowledgeItems, setKnowledgeItems] = useState<KnowledgeItem[]>([
    {
      id: '1',
      title: 'AI Agent Performance Optimization',
      content: 'Best practices for improving agent efficiency and collaboration...',
      tags: ['AI', 'Performance', 'Optimization'],
      category: 'Technical',
      relevanceScore: 0.95,
      lastUpdated: new Date(),
      sources: ['Internal Research', 'Performance Data'],
      accessCount: 147
    },
    {
      id: '2',
      title: 'Market Expansion Strategies',
      content: 'Comprehensive guide to entering new markets with AI-driven insights...',
      tags: ['Strategy', 'Market', 'Expansion'],
      category: 'Business',
      relevanceScore: 0.88,
      lastUpdated: new Date(),
      sources: ['Market Research', 'Competitor Analysis'],
      accessCount: 89
    },
    {
      id: '3',
      title: 'Crisis Response Protocols',
      content: 'Step-by-step procedures for handling various crisis situations...',
      tags: ['Crisis', 'Response', 'Protocols'],
      category: 'Operations',
      relevanceScore: 0.92,
      lastUpdated: new Date(),
      sources: ['Historical Data', 'Best Practices'],
      accessCount: 203
    }
  ]);

  const categories = ['all', 'Technical', 'Business', 'Operations', 'Strategy'];

  const filteredItems = knowledgeItems.filter(item => {
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Intelligent Knowledge Base
          </CardTitle>
          <CardDescription>AI-powered search and learning from organizational knowledge</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search and Filters */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search knowledge base..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category === 'all' ? 'All' : category}
                </Button>
              ))}
            </div>
          </div>

          {/* Knowledge Items */}
          <div className="space-y-4">
            {filteredItems.map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium">{item.title}</h4>
                        <Badge variant="secondary">{item.category}</Badge>
                        <Badge className="bg-green-500">
                          {(item.relevanceScore * 100).toFixed(0)}% relevant
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600 mb-3">{item.content}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {item.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span>Updated: {item.lastUpdated.toLocaleDateString()}</span>
                        <span>Accessed: {item.accessCount} times</span>
                        <span>Sources: {item.sources.join(', ')}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button size="sm" variant="outline">
                        <BookOpen className="w-4 h-4 mr-1" />
                        Read
                      </Button>
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                        <Lightbulb className="w-4 h-4 mr-1" />
                        Apply
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-8 text-slate-500">
              <Search className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No knowledge items found matching your search.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-sm text-slate-600">Total Articles</p>
                <p className="text-2xl font-bold">{knowledgeItems.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-sm text-slate-600">Avg Relevance</p>
                <p className="text-2xl font-bold">
                  {(knowledgeItems.reduce((acc, item) => acc + item.relevanceScore, 0) / knowledgeItems.length * 100).toFixed(0)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-sm text-slate-600">Total Access</p>
                <p className="text-2xl font-bold">
                  {knowledgeItems.reduce((acc, item) => acc + item.accessCount, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
