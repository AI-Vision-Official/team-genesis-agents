
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Eye, 
  Download, 
  RefreshCw, 
  Settings, 
  Image, 
  Monitor,
  Smartphone,
  Tablet,
  Share2,
  Sparkles
} from 'lucide-react';
import type { AccessibilityOptions } from '@/types/creative';

interface MockupPreviewCenterProps {
  settings: AccessibilityOptions;
}

export const MockupPreviewCenter = ({ settings }: MockupPreviewCenterProps) => {
  const [selectedMockup, setSelectedMockup] = useState('book-table');
  const [generating, setGenerating] = useState(false);

  const mockupTemplates = [
    {
      id: 'book-table',
      name: 'Book on Table',
      category: 'books',
      description: 'Professional lifestyle shot with book on wooden table',
      preview: '/placeholder.svg?height=300&width=400&text=Book+Mockup'
    },
    {
      id: 'book-hands',
      name: 'Book in Hands',
      category: 'books',
      description: 'Person holding the book - great for emotional connection',
      preview: '/placeholder.svg?height=300&width=400&text=Book+Hands'
    },
    {
      id: 'shirt-model',
      name: 'Shirt on Model',
      category: 'shirts',
      description: 'Professional model wearing the t-shirt design',
      preview: '/placeholder.svg?height=300&width=400&text=Shirt+Model'
    },
    {
      id: 'shirt-flat',
      name: 'Flat Lay Shirt',
      category: 'shirts',
      description: 'Clean flat lay of shirt on neutral background',
      preview: '/placeholder.svg?height=300&width=400&text=Flat+Shirt'
    },
    {
      id: 'digital-devices',
      name: 'Digital on Devices',
      category: 'printables',
      description: 'Printable content displayed on various devices',
      preview: '/placeholder.svg?height=300&width=400&text=Digital+Mockup'
    }
  ];

  const backgroundScenes = [
    { id: 'cozy-home', name: 'Cozy Home Office', mood: 'Professional' },
    { id: 'coffee-shop', name: 'Coffee Shop', mood: 'Casual' },
    { id: 'minimalist', name: 'Minimalist Studio', mood: 'Clean' },
    { id: 'gothic-aesthetic', name: 'Dark Gothic Setting', mood: 'Artistic' },
    { id: 'nature', name: 'Natural Setting', mood: 'Organic' }
  ];

  const platformFormats = [
    {
      platform: 'Amazon KDP',
      dimensions: '1600x2560px',
      requirements: 'High contrast, readable text',
      icon: Monitor
    },
    {
      platform: 'Amazon Merch',
      dimensions: '4500x5400px',
      requirements: '300 DPI, transparent background',
      icon: Smartphone
    },
    {
      platform: 'Etsy Listing',
      dimensions: '2000x2000px',
      requirements: 'Lifestyle context, multiple angles',
      icon: Tablet
    },
    {
      platform: 'Social Media',
      dimensions: '1080x1080px',
      requirements: 'Eye-catching, shareable',
      icon: Share2
    }
  ];

  const handleGenerateMockup = async () => {
    setGenerating(true);
    // Simulate mockup generation
    setTimeout(() => {
      setGenerating(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className={`text-xl font-bold ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            Mockup & Preview Center
          </h3>
          <p className={`text-gray-600 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            Professional mockups and platform-ready previews
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline">AI Generated</Badge>
          <Badge variant="outline">Platform Ready</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mockup Templates */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Image className="w-5 h-5" />
              Mockup Templates
            </CardTitle>
            <CardDescription>
              Choose from professional mockup templates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {mockupTemplates.map((mockup) => (
                <div
                  key={mockup.id}
                  className={`cursor-pointer rounded-lg border-2 transition-all ${
                    selectedMockup === mockup.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedMockup(mockup.id)}
                >
                  <div className="aspect-[4/3]">
                    <img
                      src={mockup.preview}
                      alt={mockup.name}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                  </div>
                  <div className="p-3">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-sm">{mockup.name}</h4>
                      <Badge variant="secondary" className="text-xs">
                        {mockup.category}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500">{mockup.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Preview Area */}
            <div className="border rounded-lg p-4 bg-gray-50">
              <div className="aspect-video bg-white rounded border flex items-center justify-center">
                {generating ? (
                  <div className="text-center">
                    <RefreshCw className="w-8 h-8 mx-auto mb-4 animate-spin text-blue-500" />
                    <p className="text-gray-600">Generating mockup...</p>
                  </div>
                ) : (
                  <div className="text-center text-gray-500">
                    <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Mockup preview will appear here</p>
                    <p className="text-sm">Select a template and generate</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customization Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Customization
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Background Scene</label>
              <Select defaultValue="cozy-home">
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {backgroundScenes.map((scene) => (
                    <SelectItem key={scene.id} value={scene.id}>
                      {scene.name} - {scene.mood}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Lighting</label>
              <Select defaultValue="natural">
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="natural">Natural Light</SelectItem>
                  <SelectItem value="studio">Studio Lighting</SelectItem>
                  <SelectItem value="dramatic">Dramatic</SelectItem>
                  <SelectItem value="soft">Soft & Warm</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Model/Style</label>
              <Select defaultValue="lifestyle">
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lifestyle">Lifestyle</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="artistic">Artistic</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Color Scheme</label>
              <Select defaultValue="natural">
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="natural">Natural Tones</SelectItem>
                  <SelectItem value="monochrome">Monochrome</SelectItem>
                  <SelectItem value="warm">Warm Colors</SelectItem>
                  <SelectItem value="cool">Cool Colors</SelectItem>
                  <SelectItem value="gothic">Gothic Dark</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handleGenerateMockup}
              disabled={generating}
              className="w-full"
            >
              {generating ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Mockup
                </>
              )}
            </Button>

            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Platform Export Formats */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Export Formats</CardTitle>
          <CardDescription>
            Generate mockups optimized for specific platforms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {platformFormats.map((format) => (
              <div key={format.platform} className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <format.icon className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">{format.platform}</span>
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  {format.dimensions}
                </div>
                <div className="text-xs text-gray-500 mb-3">
                  {format.requirements}
                </div>
                <Button size="sm" variant="outline" className="w-full">
                  Generate for {format.platform}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Batch Generation */}
      <Card>
        <CardHeader>
          <CardTitle>Batch Mockup Generation</CardTitle>
          <CardDescription>
            Generate multiple mockups at once for different platforms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Button className="flex-1">
              <Sparkles className="w-4 h-4 mr-2" />
              Generate All Platforms
            </Button>
            <Button variant="outline" className="flex-1">
              <Settings className="w-4 h-4 mr-2" />
              Batch Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
