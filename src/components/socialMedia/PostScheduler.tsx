
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { 
  Calendar, 
  Clock, 
  Send, 
  Globe, 
  Image, 
  Hash,
  Eye,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import type { SocialPlatform, SocialAccessibilityOptions } from '@/types/socialMedia';

interface PostSchedulerProps {
  settings: SocialAccessibilityOptions;
  platforms: SocialPlatform[];
}

export const PostScheduler = ({ settings, platforms }: PostSchedulerProps) => {
  const [newPost, setNewPost] = useState({
    content: '',
    platforms: [] as string[],
    language: 'en',
    scheduledTime: '',
    requiresApproval: false,
    autoAdapt: true
  });

  const [scheduledPosts] = useState([
    {
      id: '1',
      content: 'Excited to share our latest AI breakthrough! 🚀 #AI #Innovation #Technology',
      platforms: ['Twitter/X', 'LinkedIn'],
      scheduledTime: new Date(Date.now() + 3600000),
      status: 'scheduled' as const,
      language: 'en',
      ethicsScore: 95
    },
    {
      id: '2',
      content: 'Join our webinar on sustainable technology solutions next week!',
      platforms: ['LinkedIn', 'Facebook'],
      scheduledTime: new Date(Date.now() + 7200000),
      status: 'review_needed' as const,
      language: 'en',
      ethicsScore: 88
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'review_needed': return <Eye className="w-4 h-4 text-orange-600" />;
      case 'failed': return <XCircle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const connectedPlatforms = platforms.filter(p => p.connected);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            📅 Post Scheduler
          </h2>
          <p className={`text-gray-600 mt-1 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            Schedule and manage posts across all platforms
          </p>
        </div>
        <Button>
          <Send className="w-4 h-4 mr-2" />
          Bulk Upload
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Create New Post */}
        <Card>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
              <Send className="w-5 h-5" />
              Create New Post
            </CardTitle>
            <CardDescription className={settings.dyslexiaFont ? 'font-mono' : ''}>
              Content will be automatically adapted for each platform
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="content" className={settings.dyslexiaFont ? 'font-mono' : ''}>
                Content
              </Label>
              <Textarea
                id="content"
                placeholder="What's happening? AI will adapt this for each platform..."
                value={newPost.content}
                onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                className="min-h-[120px]"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>{newPost.content.length}/280</span>
                <span>✓ Ethics Score: 95%</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className={settings.dyslexiaFont ? 'font-mono' : ''}>Language</Label>
                <Select value={newPost.language} onValueChange={(value) => setNewPost({...newPost, language: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="nl">Dutch</SelectItem>
                    <SelectItem value="ru">Russian</SelectItem>
                    <SelectItem value="zh">Chinese</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className={settings.dyslexiaFont ? 'font-mono' : ''}>Schedule Time</Label>
                <Input
                  type="datetime-local"
                  value={newPost.scheduledTime}
                  onChange={(e) => setNewPost({...newPost, scheduledTime: e.target.value})}
                />
              </div>
            </div>

            <div>
              <Label className={`block mb-2 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                Platforms ({connectedPlatforms.length} available)
              </Label>
              <div className="grid grid-cols-2 gap-2">
                {connectedPlatforms.map((platform) => (
                  <div key={platform.id} className="flex items-center space-x-2">
                    <Switch
                      id={platform.id}
                      checked={newPost.platforms.includes(platform.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setNewPost({...newPost, platforms: [...newPost.platforms, platform.id]});
                        } else {
                          setNewPost({...newPost, platforms: newPost.platforms.filter(p => p !== platform.id)});
                        }
                      }}
                    />
                    <Label htmlFor={platform.id} className={`text-sm ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                      {platform.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch
                  id="auto-adapt"
                  checked={newPost.autoAdapt}
                  onCheckedChange={(checked) => setNewPost({...newPost, autoAdapt: checked})}
                />
                <Label htmlFor="auto-adapt" className={`text-sm ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                  Auto-adapt for platforms
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="requires-approval"
                  checked={newPost.requiresApproval}
                  onCheckedChange={(checked) => setNewPost({...newPost, requiresApproval: checked})}
                />
                <Label htmlFor="requires-approval" className={`text-sm ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                  Requires approval
                </Label>
              </div>
            </div>

            <div className="flex gap-2">
              <Button className="flex-1">
                <Send className="w-4 h-4 mr-2" />
                {newPost.scheduledTime ? 'Schedule Post' : 'Post Now'}
              </Button>
              <Button variant="outline">
                <Image className="w-4 h-4 mr-2" />
                Add Media
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Scheduled Posts */}
        <Card>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
              <Calendar className="w-5 h-5" />
              Scheduled Posts
            </CardTitle>
            <CardDescription className={settings.dyslexiaFont ? 'font-mono' : ''}>
              Upcoming posts across all platforms
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {scheduledPosts.map((post) => (
                <div key={post.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className={`text-sm ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                        {post.content}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        {getStatusIcon(post.status)}
                        <span className={`text-xs text-gray-600 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                          {post.scheduledTime.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-1 ml-2">
                      <Button size="sm" variant="ghost">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <XCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {post.platforms.map((platform) => (
                        <Badge key={platform} variant="outline" className="text-xs">
                          {platform}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-3 h-3 text-gray-500" />
                      <span className={`text-xs text-gray-600 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                        {post.language.toUpperCase()}
                      </span>
                      <span className={`text-xs ${
                        post.ethicsScore >= 90 ? 'text-green-600' : 
                        post.ethicsScore >= 80 ? 'text-orange-600' : 'text-red-600'
                      } ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                        Ethics: {post.ethicsScore}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
