
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Download, 
  Upload, 
  FileText, 
  Image, 
  Package, 
  ShoppingCart,
  Globe,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Settings
} from 'lucide-react';
import type { AccessibilityOptions } from '@/types/creative';

interface ProductExportHubProps {
  settings: AccessibilityOptions;
}

export const ProductExportHub = ({ settings }: ProductExportHubProps) => {
  const [exportProgress, setExportProgress] = useState(0);
  const [exporting, setExporting] = useState(false);
  const [selectedFormats, setSelectedFormats] = useState<string[]>(['pdf', 'png']);

  const exportFormats = [
    {
      id: 'pdf',
      name: 'Print-Ready PDF',
      description: 'High-resolution PDF for professional printing',
      size: '300 DPI',
      icon: FileText,
      platforms: ['Amazon KDP', 'Local Printing']
    },
    {
      id: 'png',
      name: 'High-Res PNG',
      description: 'Transparent background for merchandise',
      size: '4500x5400px',
      icon: Image,
      platforms: ['Amazon Merch', 'Print on Demand']
    },
    {
      id: 'jpg',
      name: 'JPEG Images',
      description: 'Compressed images for web listings',
      size: '2000x2000px',
      icon: Image,
      platforms: ['Etsy', 'Website', 'Social Media']
    },
    {
      id: 'svg',
      name: 'Vector Graphics',
      description: 'Scalable vector format',
      size: 'Infinite',
      icon: Package,
      platforms: ['Professional Printing', 'Large Format']
    }
  ];

  const platformIntegrations = [
    {
      id: 'amazon-kdp',
      name: 'Amazon KDP',
      description: 'Kindle Direct Publishing for books',
      status: 'connected',
      icon: '📚',
      features: ['Auto-upload', 'Metadata sync', 'Royalty tracking']
    },
    {
      id: 'amazon-merch',
      name: 'Amazon Merch',
      description: 'Print-on-demand t-shirts and merchandise',
      status: 'disconnected',
      icon: '👕',
      features: ['Design upload', 'Product creation', 'Listing optimization']
    },
    {
      id: 'etsy',
      name: 'Etsy Marketplace',
      description: 'Handmade and creative products',
      status: 'connected',
      icon: '💫',
      features: ['Listing creation', 'Photo upload', 'SEO optimization']
    },
    {
      id: 'redbubble',
      name: 'RedBubble',
      description: 'Print-on-demand artwork and designs',
      status: 'disconnected',
      icon: '🎨',
      features: ['Bulk upload', 'Portfolio sync', 'Trend analysis']
    }
  ];

  const exportPackages = [
    {
      id: 'complete-book',
      name: 'Complete Book Package',
      description: 'Everything needed for book publishing',
      files: [
        'Interior PDF (300 DPI)',
        'Cover PDF (300 DPI)',
        'Spine calculations',
        'Metadata file',
        'Marketing images'
      ]
    },
    {
      id: 'merch-collection',
      name: 'Merchandise Collection',
      description: 'T-shirt and merchandise bundle',
      files: [
        'Design PNG (transparent)',
        'Mockup images',
        'Size variations',
        'Color options',
        'Product descriptions'
      ]
    },
    {
      id: 'digital-bundle',
      name: 'Digital Download Bundle',
      description: 'Printable content package',
      files: [
        'High-res printables',
        'Different sizes',
        'Usage instructions',
        'Commercial license',
        'Preview images'
      ]
    }
  ];

  const handleExport = async () => {
    setExporting(true);
    setExportProgress(0);

    // Simulate export process
    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setExporting(false);
          return 100;
        }
        return prev + 8;
      });
    }, 200);
  };

  const handleFormatToggle = (formatId: string) => {
    setSelectedFormats(prev => 
      prev.includes(formatId)
        ? prev.filter(id => id !== formatId)
        : [...prev, formatId]
    );
  };

  const StatusBadge = ({ status }: { status: string }) => (
    <Badge 
      variant={status === 'connected' ? 'default' : 'outline'}
      className={status === 'connected' ? 'bg-green-500' : ''}
    >
      {status === 'connected' ? (
        <CheckCircle className="w-3 h-3 mr-1" />
      ) : (
        <AlertCircle className="w-3 h-3 mr-1" />
      )}
      {status}
    </Badge>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className={`text-xl font-bold ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            Product Export Hub
          </h3>
          <p className={`text-gray-600 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            Export and publish to multiple platforms
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline">4 Platforms</Badge>
          <Badge variant="outline">Auto-Upload</Badge>
        </div>
      </div>

      {/* Export Progress */}
      {exporting && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <RefreshCw className="w-6 h-6 animate-spin text-blue-500" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Exporting files...</span>
                  <span className="text-sm text-gray-500">{exportProgress}%</span>
                </div>
                <Progress value={exportProgress} className="w-full" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Export Formats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="w-5 h-5" />
              Export Formats
            </CardTitle>
            <CardDescription>
              Select the file formats you need
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {exportFormats.map((format) => (
              <div key={format.id} className="flex items-start gap-3 p-3 border rounded-lg">
                <Checkbox
                  checked={selectedFormats.includes(format.id)}
                  onCheckedChange={() => handleFormatToggle(format.id)}
                />
                <format.icon className="w-5 h-5 mt-0.5 text-gray-600" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium">{format.name}</h4>
                    <span className="text-sm text-gray-500">{format.size}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{format.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {format.platforms.map((platform) => (
                      <Badge key={platform} variant="secondary" className="text-xs">
                        {platform}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Platform Integrations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Platform Publishing
            </CardTitle>
            <CardDescription>
              Connected platforms for direct publishing
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {platformIntegrations.map((platform) => (
              <div key={platform.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{platform.icon}</span>
                    <span className="font-medium">{platform.name}</span>
                  </div>
                  <StatusBadge status={platform.status} />
                </div>
                <p className="text-sm text-gray-600 mb-3">{platform.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {platform.features.map((feature) => (
                    <Badge key={feature} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
                <Button 
                  size="sm" 
                  variant={platform.status === 'connected' ? 'outline' : 'default'}
                  className="w-full"
                >
                  {platform.status === 'connected' ? 'Manage' : 'Connect'}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Export Packages */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Export Packages
          </CardTitle>
          <CardDescription>
            Pre-configured export bundles for different use cases
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {exportPackages.map((pkg) => (
              <div key={pkg.id} className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">{pkg.name}</h4>
                <p className="text-sm text-gray-600 mb-3">{pkg.description}</p>
                <div className="space-y-1 mb-4">
                  {pkg.files.map((file, index) => (
                    <div key={index} className="text-xs text-gray-500 flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      {file}
                    </div>
                  ))}
                </div>
                <Button size="sm" variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Export Package
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Export Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Export Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Button onClick={handleExport} disabled={exporting || selectedFormats.length === 0}>
              <Download className="w-4 h-4 mr-2" />
              Export Selected Formats
            </Button>
            <Button variant="outline">
              <Globe className="w-4 h-4 mr-2" />
              Publish to All Platforms
            </Button>
            <Button variant="outline">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Create Listings
            </Button>
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Export Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
