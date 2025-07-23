import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Search, User, Mail, Phone, Image, Shield, Globe, 
  ExternalLink, Info, Eye, Database, Link, Camera,
  Fingerprint, Users, Archive, AlertTriangle
} from 'lucide-react';

interface OSINTTool {
  id: string;
  name: string;
  description: string;
  category: 'identity' | 'email' | 'phone' | 'image' | 'network' | 'device' | 'social' | 'archive';
  url: string;
  icon: React.ElementType;
  type: 'iframe' | 'external' | 'deep-link';
  instructions: string;
  mobile?: boolean;
}

const osintTools: OSINTTool[] = [
  // Identity Tools
  {
    id: 'maigret',
    name: 'Maigret',
    description: 'Scan digital footprints by username across 400+ platforms',
    category: 'identity',
    url: 'https://github.com/soxoj/maigret',
    icon: Fingerprint,
    type: 'external',
    instructions: 'Install and run locally: pip install maigret && maigret username'
  },
  {
    id: 'namechk',
    name: 'Namechk',
    description: 'Check username availability across social networks',
    category: 'identity',
    url: 'https://namechk.com',
    icon: User,
    type: 'iframe',
    instructions: 'Enter username to check availability across platforms'
  },
  {
    id: 'sherlock',
    name: 'Sherlock',
    description: 'Find social media accounts by username',
    category: 'social',
    url: 'https://github.com/sherlock-project/sherlock',
    icon: Search,
    type: 'external',
    instructions: 'Command-line tool: python3 sherlock username',
    mobile: true
  },
  {
    id: 'social-links',
    name: 'Social Links Lite',
    description: 'Build comprehensive digital footprint profiles',
    category: 'social',
    url: 'https://www.social-links.io',
    icon: Users,
    type: 'external',
    instructions: 'Professional OSINT platform for social media intelligence'
  },

  // Email Tools
  {
    id: 'haveibeenpwned',
    name: 'HaveIBeenPwned',
    description: 'Check if email has been in data breaches',
    category: 'email',
    url: 'https://haveibeenpwned.com',
    icon: Mail,
    type: 'iframe',
    instructions: 'Enter email address to check breach history'
  },
  {
    id: 'email-osint',
    name: 'Email OSINT',
    description: 'Find identities and accounts from email addresses',
    category: 'email',
    url: 'https://epieos.com',
    icon: Mail,
    type: 'iframe',
    instructions: 'Discover accounts linked to email addresses'
  },
  {
    id: 'breach-directory',
    name: 'BreachDirectory',
    description: 'Alternative breach detection service',
    category: 'email',
    url: 'https://breachdirectory.org',
    icon: Database,
    type: 'iframe',
    instructions: 'Check email/username in breach databases'
  },
  {
    id: 'leak-lookup',
    name: 'Leak-Lookup',
    description: 'Fast email and username leak search',
    category: 'email',
    url: 'https://leak-lookup.com',
    icon: Database,
    type: 'iframe',
    instructions: 'Quick breach verification service'
  },

  // Phone Tools
  {
    id: 'phoneinfoga',
    name: 'PhoneInfoga',
    description: 'Advanced phone number intelligence gathering',
    category: 'phone',
    url: 'https://github.com/sundowndev/phoneinfoga',
    icon: Phone,
    type: 'external',
    instructions: 'Command-line tool for phone number OSINT'
  },

  // Image Tools
  {
    id: 'pimeyes',
    name: 'PimEyes',
    description: 'Face recognition reverse image search',
    category: 'image',
    url: 'https://pimeyes.com',
    icon: Eye,
    type: 'iframe',
    instructions: 'Upload image to find similar faces across the internet'
  },
  {
    id: 'social-catfish',
    name: 'Social Catfish',
    description: 'People search and reverse image lookup',
    category: 'image',
    url: 'https://socialcatfish.com',
    icon: Image,
    type: 'iframe',
    instructions: 'Comprehensive people search and image verification'
  },
  {
    id: 'exif-viewer',
    name: 'EXIF Viewer',
    description: 'Extract metadata from photos',
    category: 'image',
    url: 'https://exifdata.com',
    icon: Camera,
    type: 'iframe',
    instructions: 'Upload image to view hidden metadata and location data'
  },
  {
    id: 'google-lens',
    name: 'Google Lens',
    description: 'Analyze photos to extract intelligence',
    category: 'image',
    url: 'https://lens.google.com',
    icon: Camera,
    type: 'iframe',
    instructions: 'Upload or capture images for AI-powered analysis'
  },

  // Network & Device Tools
  {
    id: 'spiderfoot',
    name: 'SpiderFoot HX',
    description: 'Automated OSINT reconnaissance',
    category: 'network',
    url: 'https://www.spiderfoot.net',
    icon: Globe,
    type: 'external',
    instructions: 'Comprehensive automated OSINT scanning platform'
  },
  {
    id: 'shodan',
    name: 'Shodan',
    description: 'Search engine for internet-connected devices',
    category: 'device',
    url: 'https://www.shodan.io',
    icon: Shield,
    type: 'iframe',
    instructions: 'Discover exposed devices and vulnerabilities',
    mobile: true
  },
  {
    id: 'intelx',
    name: 'IntelX',
    description: 'Deep web and data leak search engine',
    category: 'network',
    url: 'https://intelx.io',
    icon: Database,
    type: 'iframe',
    instructions: 'Search across darknet, leaked databases, and historical data'
  },

  // Analysis Tools
  {
    id: 'link-analyzer',
    name: 'Link Analyzer',
    description: 'Expand and analyze suspicious URLs',
    category: 'network',
    url: 'https://www.redirect-checker.org',
    icon: Link,
    type: 'iframe',
    instructions: 'Safely analyze shortened links and redirects'
  },
  {
    id: 'maltego',
    name: 'Maltego',
    description: 'Graph-based link analysis and data mining',
    category: 'network',
    url: 'https://www.maltego.com',
    icon: Users,
    type: 'external',
    instructions: 'Professional graph-based investigation platform',
    mobile: true
  },

  // Archive & Historical
  {
    id: 'wayback-machine',
    name: 'Web Archive Lookup',
    description: 'View historical snapshots of websites',
    category: 'archive',
    url: 'https://web.archive.org',
    icon: Archive,
    type: 'iframe',
    instructions: 'Access archived versions of websites and pages'
  },

  // Scam Detection
  {
    id: 'scam-search',
    name: 'ScamSearch',
    description: 'Trace scammers and complaint reports',
    category: 'identity',
    url: 'https://www.scammer.info',
    icon: AlertTriangle,
    type: 'iframe',
    instructions: 'Search for known scammers and fraud reports'
  },

  // Framework
  {
    id: 'osint-framework',
    name: 'OSINT Framework',
    description: 'Comprehensive collection of OSINT tools',
    category: 'network',
    url: 'https://osintframework.com',
    icon: Globe,
    type: 'iframe',
    instructions: 'Directory of OSINT tools organized by category'
  }
];

const categoryIcons = {
  identity: User,
  email: Mail,
  phone: Phone,
  image: Image,
  network: Globe,
  device: Shield,
  social: Users,
  archive: Archive
};

const categoryNames = {
  identity: 'Identity',
  email: 'Email',
  phone: 'Phone',
  image: 'Images',
  network: 'Network',
  device: 'Devices',
  social: 'Social Media',
  archive: 'Archive'
};

export const OSINTToolsGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [hiddenTools, setHiddenTools] = useState<Set<string>>(new Set());

  const filteredTools = osintTools.filter(tool => {
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const isVisible = !hiddenTools.has(tool.id);
    return matchesCategory && matchesSearch && isVisible;
  });

  const toggleToolVisibility = (toolId: string) => {
    const newHidden = new Set(hiddenTools);
    if (newHidden.has(toolId)) {
      newHidden.delete(toolId);
    } else {
      newHidden.add(toolId);
    }
    setHiddenTools(newHidden);
  };

  const openTool = (tool: OSINTTool) => {
    if (tool.type === 'external' || tool.type === 'deep-link') {
      window.open(tool.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            OSINT Tools Dashboard
          </CardTitle>
          <CardDescription>
            Professional Open Source Intelligence tools for verification and investigation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {Object.entries(categoryNames).map(([key, name]) => (
                  <SelectItem key={key} value={key}>{name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool) => {
          const IconComponent = tool.icon;
          const CategoryIcon = categoryIcons[tool.category];
          
          return (
            <Card key={tool.id} className="relative group hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <IconComponent className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {tool.name}
                        {tool.mobile && (
                          <Badge variant="secondary" className="text-xs">Mobile</Badge>
                        )}
                      </CardTitle>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <CategoryIcon className="w-3 h-3" />
                        {categoryNames[tool.category]}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Info className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <IconComponent className="w-5 h-5" />
                            {tool.name}
                          </DialogTitle>
                          <DialogDescription>{tool.description}</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-2">
                          <h4 className="font-semibold">How to use:</h4>
                          <p className="text-sm text-muted-foreground">{tool.instructions}</p>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleToolVisibility(tool.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{tool.description}</p>
                
                <div className="flex gap-2">
                  <Button
                    onClick={() => openTool(tool)}
                    className="flex-1"
                    variant={tool.type === 'iframe' ? 'default' : 'outline'}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {tool.type === 'iframe' ? 'Open Tool' : 'Visit Site'}
                  </Button>
                </div>
                
                <Badge 
                  variant="outline" 
                  className={`text-xs ${
                    tool.type === 'iframe' ? 'bg-green-50 text-green-700 border-green-200' :
                    tool.type === 'external' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                    'bg-orange-50 text-orange-700 border-orange-200'
                  }`}
                >
                  {tool.type === 'iframe' ? 'Web Tool' : 
                   tool.type === 'external' ? 'External Site' : 'Deep Link'}
                </Badge>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredTools.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No tools found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </CardContent>
        </Card>
      )}

      {/* Disclaimer */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-yellow-800 mb-1">Legal Disclaimer</h4>
              <p className="text-sm text-yellow-700">
                These tools are for educational and investigative purposes only. Always respect privacy laws, 
                terms of service, and applicable regulations in your jurisdiction. Unauthorized surveillance 
                or investigation may violate local laws.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};