
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Mic, 
  MicOff, 
  Upload, 
  Save, 
  Zap, 
  Brain, 
  FileText, 
  Image,
  Tag,
  Calendar,
  Star
} from 'lucide-react';

export const IdeaCapture = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [ideaTitle, setIdeaTitle] = useState('');
  const [ideaDescription, setIdeaDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Voice recording logic would go here
  };

  const aiEnhanceIdea = () => {
    // AI enhancement logic
    console.log('Enhancing idea with AI...');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold">Idea Capture Studio</h3>
          <p className="text-gray-600">Capture inspiration through voice, text, or sketches</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import Sketch
          </Button>
          <Button>
            <Save className="w-4 h-4 mr-2" />
            Save Idea
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Voice Capture */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mic className="w-5 h-5" />
              Voice Capture
            </CardTitle>
            <CardDescription>
              Speak your ideas naturally - AI will transcribe and organize
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center p-8 border-2 border-dashed rounded-lg">
              <Button
                size="lg"
                variant={isRecording ? "destructive" : "default"}
                onClick={toggleRecording}
                className="flex items-center gap-2"
              >
                {isRecording ? (
                  <>
                    <MicOff className="w-6 h-6" />
                    Stop Recording
                  </>
                ) : (
                  <>
                    <Mic className="w-6 h-6" />
                    Start Recording
                  </>
                )}
              </Button>
            </div>
            
            {isRecording && (
              <div className="text-center">
                <div className="animate-pulse text-red-500 mb-2">● Recording...</div>
                <p className="text-sm text-gray-600">Speak clearly about your innovation idea</p>
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Recent Voice Notes</label>
              <div className="space-y-1">
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm">VST Plugin Concept - 2 min</span>
                  <Button size="sm" variant="ghost">Play</Button>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm">UI Framework Idea - 1 min</span>
                  <Button size="sm" variant="ghost">Play</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Text Input */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Written Capture
            </CardTitle>
            <CardDescription>
              Type your ideas with structured fields
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Idea Title</label>
              <Input
                value={ideaTitle}
                onChange={(e) => setIdeaTitle(e.target.value)}
                placeholder="What's your innovation called?"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <Textarea
                value={ideaDescription}
                onChange={(e) => setIdeaDescription(e.target.value)}
                placeholder="Describe your idea in detail..."
                rows={4}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Tags</label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag..."
                  onKeyPress={(e) => e.key === 'Enter' && addTag()}
                />
                <Button onClick={addTag} size="sm">
                  <Tag className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-1">
                {tags.map((tag) => (
                  <Badge 
                    key={tag} 
                    variant="secondary" 
                    className="cursor-pointer"
                    onClick={() => removeTag(tag)}
                  >
                    {tag} ×
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Enhancement Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-600" />
            AI-Powered Enhancement
          </CardTitle>
          <CardDescription>
            Let AI help develop and refine your ideas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="p-4 h-auto flex-col items-start"
              onClick={aiEnhanceIdea}
            >
              <Zap className="w-6 h-6 text-yellow-500 mb-2" />
              <span className="font-medium">Expand Concept</span>
              <span className="text-sm text-gray-600">Generate detailed features and use cases</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="p-4 h-auto flex-col items-start"
            >
              <Star className="w-6 h-6 text-blue-500 mb-2" />
              <span className="font-medium">Market Analysis</span>
              <span className="text-sm text-gray-600">Research competition and opportunities</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="p-4 h-auto flex-col items-start"
            >
              <FileText className="w-6 h-6 text-green-500 mb-2" />
              <span className="font-medium">Technical Roadmap</span>
              <span className="text-sm text-gray-600">Create implementation plan</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Ideas Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Captured Ideas Today</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <h4 className="font-medium">Emotion-Driven VST Plugin</h4>
                <p className="text-sm text-gray-600">Captured via voice • 2 hours ago</p>
              </div>
              <div className="flex gap-2">
                <Badge variant="secondary">music</Badge>
                <Badge variant="secondary">vst</Badge>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <h4 className="font-medium">Adaptive UI Framework</h4>
                <p className="text-sm text-gray-600">Written note • 5 hours ago</p>
              </div>
              <div className="flex gap-2">
                <Badge variant="secondary">software</Badge>
                <Badge variant="secondary">ui/ux</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
