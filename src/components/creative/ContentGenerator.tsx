import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, BookOpen, Scroll, Newspaper, MessageSquare, Mail, Copy, Download, Share } from 'lucide-react';
import { CardDeckCreator } from './CardDeckCreator';
import type { CreativeAgent, ContentRequest, AccessibilityOptions } from '@/types/creative';

interface ContentGeneratorProps {
  agents: CreativeAgent[];
  settings: AccessibilityOptions;
}

export const ContentGenerator = ({ agents, settings }: ContentGeneratorProps) => {
  const [request, setRequest] = useState<Partial<ContentRequest>>({
    type: 'article',
    length: 'medium',
    tone: 'professional',
    language: 'English',
    targetAudience: 'General public'
  });
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const contentTypes = [
    { value: 'article', label: 'Article', icon: FileText },
    { value: 'poetry', label: 'Poetry', icon: Scroll },
    { value: 'script', label: 'Script', icon: BookOpen },
    { value: 'book', label: 'Book Chapter', icon: BookOpen },
    { value: 'social_post', label: 'Social Media Post', icon: MessageSquare },
    { value: 'newsletter', label: 'Newsletter', icon: Mail }
  ];

  const languages = [
    'English', 'Dutch', 'French', 'German', 'Spanish', 'Cantonese', 
    'Mandarin', 'Japanese', 'Italian', 'Portuguese', 'Russian', 'Arabic'
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Simulate content generation
    setTimeout(() => {
      const sampleContent = `# ${request.topic || 'Sample Content'}

This is a sample ${request.type} generated based on your specifications:

**Topic**: ${request.topic}
**Tone**: ${request.tone}
**Target Audience**: ${request.targetAudience}
**Language**: ${request.language}

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.

## Key Points

- Professional and engaging content
- Tailored to your specific requirements
- Optimized for accessibility and readability
- Available in multiple languages

This content has been generated with accessibility in mind, ensuring it's readable for neurodiverse audiences and follows best practices for inclusive communication.`;

      setGeneratedContent(sampleContent);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            📝 Content Generator
          </h2>
          <p className={`text-gray-600 mt-1 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            Create articles, poetry, scripts, books, social content, and custom card decks
          </p>
        </div>
        <Badge variant="outline">
          {agents.length} Content Agents Active
        </Badge>
      </div>

      <Tabs defaultValue="text-content" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="text-content">Text Content</TabsTrigger>
          <TabsTrigger value="card-decks">Card Deck Creator</TabsTrigger>
        </TabsList>

        <TabsContent value="text-content" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Configuration</CardTitle>
                <CardDescription>
                  Specify your content requirements and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="content-type">Content Type</Label>
                  <Select value={request.type} onValueChange={(value) => setRequest(prev => ({ ...prev, type: value as any }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select content type" />
                    </SelectTrigger>
                    <SelectContent>
                      {contentTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            <type.icon className="w-4 h-4" />
                            {type.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="topic">Topic/Subject</Label>
                  <Input
                    id="topic"
                    placeholder="Enter your topic or subject..."
                    value={request.topic || ''}
                    onChange={(e) => setRequest(prev => ({ ...prev, topic: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="length">Length</Label>
                    <Select value={request.length} onValueChange={(value) => setRequest(prev => ({ ...prev, length: value as any }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="short">Short (&lt; 500 words)</SelectItem>
                        <SelectItem value="medium">Medium (500-1500 words)</SelectItem>
                        <SelectItem value="long">Long (&gt; 1500 words)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="tone">Tone</Label>
                    <Select value={request.tone} onValueChange={(value) => setRequest(prev => ({ ...prev, tone: value as any }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="creative">Creative</SelectItem>
                        <SelectItem value="academic">Academic</SelectItem>
                        <SelectItem value="humorous">Humorous</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="language">Language</Label>
                  <Select value={request.language} onValueChange={(value) => setRequest(prev => ({ ...prev, language: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="audience">Target Audience</Label>
                  <Input
                    id="audience"
                    placeholder="e.g., Young professionals, Students, General public..."
                    value={request.targetAudience || ''}
                    onChange={(e) => setRequest(prev => ({ ...prev, targetAudience: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="keywords">Keywords (optional)</Label>
                  <Input
                    id="keywords"
                    placeholder="Separate keywords with commas..."
                    onChange={(e) => setRequest(prev => ({ ...prev, keywords: e.target.value.split(',').map(k => k.trim()) }))}
                  />
                </div>

                <Button 
                  onClick={handleGenerate} 
                  disabled={isGenerating || !request.topic}
                  className="w-full"
                >
                  {isGenerating ? 'Generating Content...' : 'Generate Content'}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Generated Content</CardTitle>
                <CardDescription>
                  Your AI-generated content will appear here
                </CardDescription>
              </CardHeader>
              <CardContent>
                {generatedContent ? (
                  <div className="space-y-4">
                    <Textarea
                      value={generatedContent}
                      onChange={(e) => setGeneratedContent(e.target.value)}
                      className={`min-h-96 ${settings.dyslexiaFont ? 'font-mono' : ''}`}
                      placeholder="Generated content will appear here..."
                    />
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-96 text-gray-500">
                    <div className="text-center">
                      <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Configure your content settings and click "Generate Content" to begin</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Content Projects</CardTitle>
              <CardDescription>Your latest generated content and drafts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { title: 'Climate Change Article', type: 'article', language: 'English', status: 'completed' },
                  { title: 'Inspirational Poetry', type: 'poetry', language: 'Dutch', status: 'draft' },
                  { title: 'Product Launch Script', type: 'script', language: 'French', status: 'in_progress' },
                  { title: 'Social Media Campaign', type: 'social_post', language: 'Spanish', status: 'completed' }
                ].map((project, index) => (
                  <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant={project.status === 'completed' ? 'default' : 'secondary'}>
                          {project.status}
                        </Badge>
                        <span className="text-xs text-gray-500">{project.language}</span>
                      </div>
                      <h4 className={`font-medium mb-1 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                        {project.title}
                      </h4>
                      <p className="text-sm text-gray-600 capitalize">{project.type.replace('_', ' ')}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="card-decks">
          <CardDeckCreator settings={settings} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
