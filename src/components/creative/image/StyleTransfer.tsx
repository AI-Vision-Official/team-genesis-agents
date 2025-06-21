
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { 
  Palette, 
  Brush, 
  Sparkles, 
  Image as ImageIcon, 
  Download,
  RefreshCw,
  Settings,
  Wand2
} from 'lucide-react';
import type { AccessibilityOptions } from '@/types/creative';

interface StyleTransferProps {
  settings: AccessibilityOptions;
}

export const StyleTransfer = ({ settings }: StyleTransferProps) => {
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [intensity, setIntensity] = useState(75);
  const [processing, setProcessing] = useState(false);

  const artisticStyles = [
    {
      id: 'van-gogh',
      name: 'Van Gogh - Starry Night',
      preview: '/placeholder.svg?height=100&width=100&text=Van+Gogh',
      description: 'Post-impressionist swirls and bold colors'
    },
    {
      id: 'picasso',
      name: 'Picasso - Cubism',
      preview: '/placeholder.svg?height=100&width=100&text=Picasso',
      description: 'Geometric abstraction and fragmented forms'
    },
    {
      id: 'monet',
      name: 'Monet - Impressionism',
      preview: '/placeholder.svg?height=100&width=100&text=Monet',
      description: 'Soft brushstrokes and light effects'
    },
    {
      id: 'kandinsky',
      name: 'Kandinsky - Abstract',
      preview: '/placeholder.svg?height=100&width=100&text=Kandinsky',
      description: 'Bold abstract compositions'
    },
    {
      id: 'hokusai',
      name: 'Hokusai - Japanese Art',
      preview: '/placeholder.svg?height=100&width=100&text=Hokusai',
      description: 'Traditional Japanese woodblock style'
    },
    {
      id: 'dali',
      name: 'Dalí - Surrealism',
      preview: '/placeholder.svg?height=100&width=100&text=Dali',
      description: 'Dreamlike surreal compositions'
    }
  ];

  const photographicStyles = [
    {
      id: 'vintage',
      name: 'Vintage Film',
      preview: '/placeholder.svg?height=100&width=100&text=Vintage',
      description: 'Warm tones and film grain'
    },
    {
      id: 'noir',
      name: 'Film Noir',
      preview: '/placeholder.svg?height=100&width=100&text=Noir',
      description: 'High contrast black and white'
    },
    {
      id: 'cyberpunk',
      name: 'Cyberpunk',
      preview: '/placeholder.svg?height=100&width=100&text=Cyber',
      description: 'Neon colors and futuristic aesthetic'
    },
    {
      id: 'sepia',
      name: 'Sepia Tone',
      preview: '/placeholder.svg?height=100&width=100&text=Sepia',
      description: 'Classic sepia monochrome'
    }
  ];

  const handleApplyStyle = async () => {
    if (!selectedStyle) return;
    
    setProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setProcessing(false);
    }, 3000);
  };

  const StyleGrid = ({ styles, title }: { styles: typeof artisticStyles, title: string }) => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="w-5 h-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {styles.map((style) => (
            <div
              key={style.id}
              className={`cursor-pointer rounded-lg border-2 transition-all ${
                selectedStyle === style.id 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedStyle(style.id)}
            >
              <div className="aspect-square">
                <img
                  src={style.preview}
                  alt={style.name}
                  className="w-full h-full object-cover rounded-t-lg"
                />
              </div>
              <div className="p-3">
                <h4 className="font-medium text-sm">{style.name}</h4>
                <p className="text-xs text-gray-500 mt-1">{style.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className={`text-xl font-bold ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            Style Transfer & Effects
          </h3>
          <p className={`text-gray-600 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            Apply artistic styles and creative effects to your images
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline">Neural Style Transfer</Badge>
          <Badge variant="outline">Real-time</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <StyleGrid styles={artisticStyles} title="Artistic Styles" />
          <StyleGrid styles={photographicStyles} title="Photographic Effects" />
        </div>

        <div className="space-y-6">
          {/* Preview and Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5" />
                Style Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                {processing ? (
                  <div className="text-center">
                    <RefreshCw className="w-8 h-8 mx-auto mb-4 animate-spin text-blue-500" />
                    <p className="text-gray-600">Applying style transfer...</p>
                  </div>
                ) : (
                  <div className="text-center text-gray-500">
                    <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Style preview will appear here</p>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Style Intensity</label>
                  <Slider
                    value={[intensity]}
                    onValueChange={(value) => setIntensity(value[0])}
                    max={100}
                    min={0}
                    step={5}
                    className="mt-2"
                  />
                  <div className="text-sm text-gray-500 mt-1">{intensity}%</div>
                </div>

                <Button 
                  onClick={handleApplyStyle}
                  disabled={!selectedStyle || processing}
                  className="w-full"
                >
                  {processing ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4 mr-2" />
                      Apply Style Transfer
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Creative Effects */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Creative Effects
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Button size="sm" variant="outline">
                  <Brush className="w-4 h-4 mr-2" />
                  Oil Painting
                </Button>
                <Button size="sm" variant="outline">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Watercolor
                </Button>
                <Button size="sm" variant="outline">
                  <Palette className="w-4 h-4 mr-2" />
                  Sketch
                </Button>
                <Button size="sm" variant="outline">
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Cartoon
                </Button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium">Color Temperature</label>
                  <Slider defaultValue={[0]} max={100} min={-100} />
                </div>
                <div>
                  <label className="text-sm font-medium">Saturation</label>
                  <Slider defaultValue={[0]} max={100} min={-100} />
                </div>
                <div>
                  <label className="text-sm font-medium">Contrast</label>
                  <Slider defaultValue={[0]} max={100} min={-100} />
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Settings className="w-4 h-4 mr-2" />
                  Advanced
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
