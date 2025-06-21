
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BookOpen, 
  Shirt, 
  FileText, 
  Palette, 
  Wand2, 
  RefreshCw,
  Download,
  Eye,
  Settings,
  Sparkles,
  Image,
  Type
} from 'lucide-react';
import type { AccessibilityOptions } from '@/types/creative';

interface CreativeGeneratorStudioProps {
  settings: AccessibilityOptions;
}

export const CreativeGeneratorStudio = ({ settings }: CreativeGeneratorStudioProps) => {
  const [selectedCategory, setSelectedCategory] = useState('books');
  const [generating, setGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [productTitle, setProductTitle] = useState('');
  const [productDescription, setProductDescription] = useState('');

  const productTypes = [
    {
      id: 'books',
      name: 'Books & Journals',
      icon: BookOpen,
      templates: ['Healing Journal', 'Puzzle Book', 'Poetry Collection', 'Workbook', 'Planner']
    },
    {
      id: 'merchandise',
      name: 'T-Shirts & Merch',
      icon: Shirt,
      templates: ['Quote Shirt', 'Graphic Tee', 'Minimalist Design', 'Lyric Shirt', 'Inspirational']
    },
    {
      id: 'printables',
      name: 'Digital Downloads',
      icon: FileText,
      templates: ['Checklist', 'Planner Pages', 'Art Prints', 'Worksheets', 'Templates']
    }
  ];

  const bookTemplates = [
    {
      id: 'healing-journal',
      name: 'Gothic Healing Journal',
      description: 'Dark aesthetic with healing prompts and reflection pages',
      pages: 120,
      features: ['Daily prompts', 'Mood tracking', 'Gothic artwork', 'Large print option']
    },
    {
      id: 'autism-puzzle',
      name: 'Autism-Friendly Puzzle Book',
      description: 'Large print puzzles designed for sensory sensitivity',
      pages: 100,
      features: ['Large fonts', 'Simple layouts', 'Calming colors', 'Clear instructions']
    },
    {
      id: 'trauma-coloring',
      name: 'Trauma Recovery Coloring Book',
      description: 'Gentle, therapeutic coloring pages for healing',
      pages: 80,
      features: ['Calming designs', 'Affirmations', 'Progress tracking', 'Mindfulness quotes']
    }
  ];

  const shirtDesigns = [
    {
      id: 'gothic-lyrics',
      name: '"Please Hear Me" Gothic Collection',
      description: 'Brigitte\'s gothic poetry and lyrics on premium apparel',
      styles: ['Classic Tee', 'Tank Top', 'Hoodie', 'Long Sleeve'],
      colors: ['Black', 'Dark Purple', 'Charcoal', 'Burgundy']
    },
    {
      id: 'healing-quotes',
      name: 'Healing Affirmations',
      description: 'Inspirational quotes for mental health awareness',
      styles: ['Comfort Tee', 'Fitted Tee', 'Crewneck', 'V-Neck'],
      colors: ['Soft Pink', 'Sage Green', 'Lavender', 'Cream']
    }
  ];

  const handleGenerate = async () => {
    setGenerating(true);
    setGenerationProgress(0);

    // Simulate generation process
    const steps = [
      'Analyzing market data...',
      'Generating content ideas...',
      'Creating layouts...',
      'Applying design elements...',
      'Optimizing for print...',
      'Finalizing product...'
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setGenerationProgress((i + 1) * (100 / steps.length));
    }

    setGenerating(false);
  };

  const renderBookGenerator = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {bookTemplates.map((template) => (
          <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-base">{template.name}</CardTitle>
              <CardDescription>{template.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="font-medium">Pages:</span> {template.pages}
                </div>
                <div className="flex flex-wrap gap-1">
                  {template.features.map((feature) => (
                    <Badge key={feature} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
                <Button size="sm" className="w-full mt-3">
                  <Wand2 className="w-4 h-4 mr-2" />
                  Generate This Book
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Custom Book Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Book Title</label>
              <Input
                placeholder="e.g., My Gothic Healing Journey"
                value={productTitle}
                onChange={(e) => setProductTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Page Count</label>
              <Select defaultValue="120">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="80">80 pages</SelectItem>
                  <SelectItem value="120">120 pages</SelectItem>
                  <SelectItem value="200">200 pages</SelectItem>
                  <SelectItem value="300">300 pages</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Theme & Content</label>
            <Textarea
              placeholder="Describe the theme, target audience, and content style..."
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">Style</label>
              <Select defaultValue="gothic">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gothic">Gothic</SelectItem>
                  <SelectItem value="minimalist">Minimalist</SelectItem>
                  <SelectItem value="colorful">Colorful</SelectItem>
                  <SelectItem value="vintage">Vintage</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Accessibility</label>
              <Select defaultValue="standard">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="large-print">Large Print</SelectItem>
                  <SelectItem value="dyslexia-friendly">Dyslexia Friendly</SelectItem>
                  <SelectItem value="high-contrast">High Contrast</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Language</label>
              <Select defaultValue="english">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="dutch">Dutch</SelectItem>
                  <SelectItem value="bilingual">Bilingual</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderShirtGenerator = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {shirtDesigns.map((design) => (
          <Card key={design.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-base">{design.name}</CardTitle>
              <CardDescription>{design.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-medium mb-1">Styles</div>
                  <div className="flex flex-wrap gap-1">
                    {design.styles.map((style) => (
                      <Badge key={style} variant="outline" className="text-xs">
                        {style}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-1">Colors</div>
                  <div className="flex flex-wrap gap-1">
                    {design.colors.map((color) => (
                      <Badge key={color} variant="secondary" className="text-xs">
                        {color}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button size="sm" className="w-full">
                  <Palette className="w-4 h-4 mr-2" />
                  Design This Shirt
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Type className="w-5 h-5" />
            Custom Quote/Lyric Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Quote or Lyric</label>
            <Textarea
              placeholder="Enter your quote, lyric, or let AI generate one..."
              className="min-h-24"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">Font Style</label>
              <Select defaultValue="gothic">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gothic">Gothic</SelectItem>
                  <SelectItem value="script">Script</SelectItem>
                  <SelectItem value="modern">Modern</SelectItem>
                  <SelectItem value="bold">Bold</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Shirt Color</label>
              <Select defaultValue="black">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="black">Black</SelectItem>
                  <SelectItem value="white">White</SelectItem>
                  <SelectItem value="gray">Gray</SelectItem>
                  <SelectItem value="navy">Navy</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Print Position</label>
              <Select defaultValue="center">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="left-chest">Left Chest</SelectItem>
                  <SelectItem value="back">Back</SelectItem>
                  <SelectItem value="sleeve">Sleeve</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1">
              <Sparkles className="w-4 h-4 mr-2" />
              AI Generate Quote
            </Button>
            <Button className="flex-1">
              <Image className="w-4 h-4 mr-2" />
              Create Design
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className={`text-xl font-bold ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            Creative Generator Studio
          </h3>
          <p className={`text-gray-600 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            AI-powered product creation and design generation
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline">AI Generated</Badge>
          <Badge variant="outline">Print Ready</Badge>
        </div>
      </div>

      {/* Product Type Selection */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-2 mb-4">
            {productTypes.map((type) => (
              <Button
                key={type.id}
                variant={selectedCategory === type.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(type.id)}
                className="flex items-center gap-2"
              >
                <type.icon className="w-4 h-4" />
                {type.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Generation Progress */}
      {generating && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <RefreshCw className="w-6 h-6 animate-spin text-blue-500" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Generating your product...</span>
                  <span className="text-sm text-gray-500">{Math.round(generationProgress)}%</span>
                </div>
                <Progress value={generationProgress} className="w-full" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Content Based on Selection */}
      {selectedCategory === 'books' && renderBookGenerator()}
      {selectedCategory === 'merchandise' && renderShirtGenerator()}
      {selectedCategory === 'printables' && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">Printables Generator</h3>
            <p className="text-gray-600">Digital downloads and printable content creation coming soon</p>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Button onClick={handleGenerate} disabled={generating}>
              <Wand2 className="w-4 h-4 mr-2" />
              Generate Product
            </Button>
            <Button variant="outline">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Files
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
