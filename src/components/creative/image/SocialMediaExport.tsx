
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Share2, 
  Instagram, 
  Twitter, 
  Facebook, 
  Youtube,
  Calendar,
  Hash,
  Upload,
  Settings,
  Eye,
  Download
} from 'lucide-react';
import type { AccessibilityOptions } from '@/types/creative';

interface SocialMediaExportProps {
  settings: AccessibilityOptions;
}

export const SocialMediaExport = ({ settings }: SocialMediaExportProps) => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [isScheduled, setIsScheduled] = useState(false);

  const platforms = [
    {
      id: 'instagram',
      name: 'Instagram',
      icon: Instagram,
      color: 'bg-pink-500',
      formats: ['1080x1080', '1080x1350', '1920x1080'],
      maxSize: '8MB'
    },
    {
      id: 'twitter',
      name: 'Twitter/X',
      icon: Twitter,
      color: 'bg-blue-500',
      formats: ['1200x675', '1080x1080'],
      maxSize: '5MB'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-600',
      formats: ['1200x630', '1080x1080'],
      maxSize: '10MB'
    },
    {
      id: 'youtube',
      name: 'YouTube',
      icon: Youtube,
      color: 'bg-red-500',
      formats: ['1280x720', '1920x1080'],
      maxSize: '2MB'
    }
  ];

  const suggestedHashtags = [
    '#photography', '#art', '#design', '#creative', '#digital',
    '#inspiration', '#beauty', '#style', '#aesthetic', '#visual'
  ];

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className={`text-xl font-bold ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            Social Media Export
          </h3>
          <p className={`text-gray-600 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            Optimize and publish to multiple platforms
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline">Auto-resize</Badge>
          <Badge variant="outline">Metadata</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Platform Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share2 className="w-5 h-5" />
              Select Platforms
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {platforms.map((platform) => (
              <div
                key={platform.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedPlatforms.includes(platform.id)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => togglePlatform(platform.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${platform.color} text-white`}>
                      <platform.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">{platform.name}</h4>
                      <p className="text-sm text-gray-500">Max: {platform.maxSize}</p>
                    </div>
                  </div>
                  {selectedPlatforms.includes(platform.id) && (
                    <Badge variant="default">Selected</Badge>
                  )}
                </div>
                <div className="mt-3">
                  <p className="text-xs text-gray-500">
                    Supported formats: {platform.formats.join(', ')}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Content & Metadata */}
        <Card>
          <CardHeader>
            <CardTitle>Content & Metadata</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Caption</label>
              <Textarea
                placeholder="Write your caption..."
                className={`mt-1 ${settings.dyslexiaFont ? 'font-mono' : ''}`}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Hashtags</label>
              <div className="flex flex-wrap gap-2 mt-2 mb-2">
                {suggestedHashtags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="cursor-pointer hover:bg-blue-50"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <Input placeholder="Add custom hashtags..." />
            </div>

            <div>
              <label className="text-sm font-medium">Alt Text (Accessibility)</label>
              <Input
                placeholder="Describe the image for screen readers..."
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Category</label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="art">Art & Design</SelectItem>
                    <SelectItem value="photography">Photography</SelectItem>
                    <SelectItem value="lifestyle">Lifestyle</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Visibility</label>
                <Select defaultValue="public">
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="unlisted">Unlisted</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Preview & Export Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Preview & Export
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {selectedPlatforms.map((platformId) => {
              const platform = platforms.find(p => p.id === platformId);
              if (!platform) return null;
              
              return (
                <div key={platformId} className="text-center">
                  <div className="aspect-square bg-gray-100 rounded-lg mb-2 flex items-center justify-center">
                    <platform.icon className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-sm font-medium">{platform.name}</p>
                  <p className="text-xs text-gray-500">{platform.formats[0]}</p>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="outline"
              onClick={() => setIsScheduled(!isScheduled)}
            >
              <Calendar className="w-4 h-4 mr-2" />
              {isScheduled ? 'Schedule Post' : 'Post Now'}
            </Button>
            
            {isScheduled && (
              <div className="flex gap-2">
                <Input type="date" className="w-auto" />
                <Input type="time" className="w-auto" />
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Button 
              className="flex-1"
              disabled={selectedPlatforms.length === 0}
            >
              <Upload className="w-4 h-4 mr-2" />
              {isScheduled ? 'Schedule Posts' : 'Publish Now'}
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Only
            </Button>
            <Button variant="outline">
              <Settings className="w-4 h-4" />
            </Button>
          </div>

          {selectedPlatforms.length === 0 && (
            <p className="text-sm text-gray-500 text-center mt-4">
              Select at least one platform to continue
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
