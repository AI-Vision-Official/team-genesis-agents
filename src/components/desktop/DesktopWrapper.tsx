
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Monitor, 
  Code, 
  FileImage, 
  Music, 
  Video, 
  FileText, 
  Terminal, 
  Globe, 
  Download,
  ExternalLink,
  Search,
  Star,
  Package,
  Settings,
  Zap,
  Shield,
  Palette,
  Camera,
  Archive,
  Calculator,
  Clock,
  Hash
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PortableApp {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  downloadUrl: string;
  version: string;
  size: string;
  developer: string;
  features: string[];
  isInstalled?: boolean;
  isFavorite?: boolean;
}

export const DesktopWrapper = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { toast } = useToast();

  const portableApps: PortableApp[] = [
    {
      id: '1',
      name: 'VS Code Portable',
      description: 'Lightweight but powerful source code editor',
      category: 'development',
      icon: <Code className="w-6 h-6 text-blue-600" />,
      downloadUrl: 'https://code.visualstudio.com/docs/editor/portable',
      version: '1.85.0',
      size: '95 MB',
      developer: 'Microsoft',
      features: ['IntelliSense', 'Git Integration', 'Extensions', 'Debugging'],
      isInstalled: true,
      isFavorite: true
    },
    {
      id: '2',
      name: 'GIMP Portable',
      description: 'GNU Image Manipulation Program',
      category: 'graphics',
      icon: <Palette className="w-6 h-6 text-purple-600" />,
      downloadUrl: 'https://portableapps.com/apps/graphics_pictures/gimp_portable',
      version: '2.10.34',
      size: '280 MB',
      developer: 'GIMP Team',
      features: ['Photo Editing', 'Digital Art', 'Plugins', 'Customizable UI'],
      isInstalled: false,
      isFavorite: true
    },
    {
      id: '3',
      name: 'VLC Media Player Portable',
      description: 'Free multimedia player for various audio and video formats',
      category: 'media',
      icon: <Video className="w-6 h-6 text-orange-600" />,
      downloadUrl: 'https://portableapps.com/apps/music_video/vlc_portable',
      version: '3.0.18',
      size: '40 MB',
      developer: 'VideoLAN',
      features: ['All Format Support', 'Network Streaming', 'Filters', 'Subtitles'],
      isInstalled: true,
      isFavorite: false
    },
    {
      id: '4',
      name: 'LibreOffice Portable',
      description: 'Free office suite with word processor, spreadsheet, and presentation tools',
      category: 'productivity',
      icon: <FileText className="w-6 h-6 text-green-600" />,
      downloadUrl: 'https://portableapps.com/apps/office/libreoffice_portable',
      version: '7.5.9',
      size: '350 MB',
      developer: 'The Document Foundation',
      features: ['Writer', 'Calc', 'Impress', 'Draw', 'Base', 'Math'],
      isInstalled: false,
      isFavorite: true
    },
    {
      id: '5',
      name: 'Firefox Portable',
      description: 'Fast, private & safe web browser',
      category: 'internet',
      icon: <Globe className="w-6 h-6 text-red-600" />,
      downloadUrl: 'https://portableapps.com/apps/internet/firefox_portable',
      version: '120.0',
      size: '75 MB',
      developer: 'Mozilla',
      features: ['Privacy Protection', 'Extensions', 'Sync', 'Developer Tools'],
      isInstalled: true,
      isFavorite: true
    },
    {
      id: '6',
      name: '7-Zip Portable',
      description: 'File archiver with high compression ratio',
      category: 'utilities',
      icon: <Archive className="w-6 h-6 text-gray-600" />,
      downloadUrl: 'https://portableapps.com/apps/utilities/7-zip_portable',
      version: '23.01',
      size: '1.5 MB',
      developer: '7-Zip',
      features: ['High Compression', 'Multiple Formats', 'AES-256 Encryption', 'Command Line'],
      isInstalled: true,
      isFavorite: false
    },
    {
      id: '7',
      name: 'Notepad++ Portable',
      description: 'Source code editor and Notepad replacement',
      category: 'development',
      icon: <FileText className="w-6 h-6 text-indigo-600" />,
      downloadUrl: 'https://portableapps.com/apps/development/notepadpp_portable',
      version: '8.5.8',
      size: '8 MB',
      developer: 'Don Ho',
      features: ['Syntax Highlighting', 'Plugin Support', 'Find & Replace', 'Multi-Language'],
      isInstalled: true,
      isFavorite: true
    },
    {
      id: '8',
      name: 'OBS Studio Portable',
      description: 'Free and open source software for video recording and live streaming',
      category: 'media',
      icon: <Camera className="w-6 h-6 text-black" />,
      downloadUrl: 'https://obsproject.com/download',
      version: '30.0.2',
      size: '120 MB',
      developer: 'OBS Project',
      features: ['Screen Recording', 'Live Streaming', 'Scene Composition', 'Audio Mixing'],
      isInstalled: false,
      isFavorite: false
    },
    {
      id: '9',
      name: 'Calculator Plus',
      description: 'Advanced scientific calculator',
      category: 'utilities',
      icon: <Calculator className="w-6 h-6 text-blue-500" />,
      downloadUrl: 'https://portableapps.com/apps/office/calculator_plus_portable',
      version: '1.0',
      size: '2 MB',
      developer: 'PortableApps',
      features: ['Scientific Functions', 'History', 'Unit Converter', 'Programmable'],
      isInstalled: false,
      isFavorite: false
    },
    {
      id: '10',
      name: 'HashMyFiles Portable',
      description: 'Calculate MD5/SHA1/CRC32 hashes of files',
      category: 'security',
      icon: <Hash className="w-6 h-6 text-red-500" />,
      downloadUrl: 'https://www.nirsoft.net/utils/hash_my_files.html',
      version: '2.36',
      size: '0.5 MB',
      developer: 'NirSoft',
      features: ['Multiple Hash Types', 'Batch Processing', 'Context Menu', 'Verification'],
      isInstalled: false,
      isFavorite: false
    }
  ];

  const categories = [
    { id: 'all', label: 'All Apps', icon: <Package className="w-4 h-4" /> },
    { id: 'development', label: 'Development', icon: <Code className="w-4 h-4" /> },
    { id: 'graphics', label: 'Graphics', icon: <Palette className="w-4 h-4" /> },
    { id: 'media', label: 'Media', icon: <Video className="w-4 h-4" /> },
    { id: 'productivity', label: 'Productivity', icon: <FileText className="w-4 h-4" /> },
    { id: 'internet', label: 'Internet', icon: <Globe className="w-4 h-4" /> },
    { id: 'utilities', label: 'Utilities', icon: <Settings className="w-4 h-4" /> },
    { id: 'security', label: 'Security', icon: <Shield className="w-4 h-4" /> }
  ];

  const filteredApps = portableApps.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || app.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const favoriteApps = portableApps.filter(app => app.isFavorite);
  const installedApps = portableApps.filter(app => app.isInstalled);

  const handleDownload = (app: PortableApp) => {
    window.open(app.downloadUrl, '_blank');
    toast({
      title: "Download Started",
      description: `${app.name} download has been initiated.`,
    });
  };

  const handleLaunch = (app: PortableApp) => {
    toast({
      title: "Launching Application",
      description: `${app.name} is starting up...`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-3">
            <Monitor className="w-8 h-8 text-blue-600" />
            Portable App Station
          </h1>
          <p className="text-slate-600 mt-2">
            Free and open source portable applications for enhanced productivity
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="px-3 py-1">
            <Package className="w-4 h-4 mr-2" />
            {portableApps.length} Apps Available
          </Badge>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-600" />
              Favorites
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{favoriteApps.length}</div>
            <p className="text-xs text-slate-600">Starred applications</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Download className="w-4 h-4 text-green-600" />
              Installed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{installedApps.length}</div>
            <p className="text-xs text-slate-600">Ready to launch</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Zap className="w-4 h-4 text-purple-600" />
              Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{categories.length - 1}</div>
            <p className="text-xs text-slate-600">App categories</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="browse" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="browse">Browse Apps</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="installed">Installed</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-4">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search portable apps..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex items-center gap-2"
                >
                  {category.icon}
                  {category.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Apps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredApps.map((app) => (
              <Card key={app.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {app.icon}
                      <div>
                        <CardTitle className="text-lg">{app.name}</CardTitle>
                        <CardDescription className="text-sm">v{app.version} • {app.size}</CardDescription>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      {app.isFavorite && (
                        <Badge variant="secondary" className="text-xs">
                          <Star className="w-3 h-3 mr-1" />
                          Favorite
                        </Badge>
                      )}
                      {app.isInstalled && (
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          Installed
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-slate-600">{app.description}</p>
                    <div>
                      <p className="text-xs font-medium text-slate-700 mb-1">Developer:</p>
                      <p className="text-xs text-slate-600">{app.developer}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-700 mb-1">Features:</p>
                      <div className="flex flex-wrap gap-1">
                        {app.features.slice(0, 3).map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                        {app.features.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{app.features.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      {app.isInstalled ? (
                        <Button onClick={() => handleLaunch(app)} className="flex-1">
                          <Zap className="w-4 h-4 mr-2" />
                          Launch
                        </Button>
                      ) : (
                        <Button onClick={() => handleDownload(app)} className="flex-1">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(app.downloadUrl, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="favorites" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteApps.map((app) => (
              <Card key={app.id} className="hover:shadow-lg transition-shadow border-yellow-200">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    {app.icon}
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {app.name}
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      </CardTitle>
                      <CardDescription>v{app.version}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-slate-600">{app.description}</p>
                    <div className="flex gap-2">
                      {app.isInstalled ? (
                        <Button onClick={() => handleLaunch(app)} className="flex-1">
                          <Zap className="w-4 h-4 mr-2" />
                          Launch
                        </Button>
                      ) : (
                        <Button onClick={() => handleDownload(app)} className="flex-1">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="installed" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {installedApps.map((app) => (
              <Card key={app.id} className="hover:shadow-lg transition-shadow border-green-200">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    {app.icon}
                    <div>
                      <CardTitle className="text-lg">{app.name}</CardTitle>
                      <CardDescription>Ready to launch</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Badge className="bg-green-100 text-green-800">
                      <Download className="w-3 h-3 mr-1" />
                      Installed
                    </Badge>
                    <Button onClick={() => handleLaunch(app)} className="w-full">
                      <Zap className="w-4 h-4 mr-2" />
                      Launch Application
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
