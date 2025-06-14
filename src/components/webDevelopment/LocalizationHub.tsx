import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Globe, 
  Languages, 
  MapPin, 
  Users, 
  Palette,
  Plus,
  Settings,
  CheckCircle
} from 'lucide-react';
import type { WebProject } from '@/types/webDevelopment';

interface LocalizationHubProps {
  projects: WebProject[];
}

export const LocalizationHub = ({ projects }: LocalizationHubProps) => {
  const mockLocalizationProjects = [
    {
      id: '1',
      projectId: '1',
      languages: [
        { code: 'en', name: 'English', progress: 100, translatedStrings: 150, totalStrings: 150, status: 'completed' },
        { code: 'es', name: 'Spanish', progress: 85, translatedStrings: 128, totalStrings: 150, status: 'in_progress' },
        { code: 'fr', name: 'French', progress: 60, translatedStrings: 90, totalStrings: 150, status: 'in_progress' },
        { code: 'de', name: 'German', progress: 30, translatedStrings: 45, totalStrings: 150, status: 'in_progress' }
      ],
      status: 'translating',
      progress: 69,
      culturalAdaptations: [
        { type: 'currency', description: 'EUR for European markets', region: 'Europe', implemented: true },
        { type: 'colors', description: 'Culturally appropriate color schemes', region: 'Asia', implemented: false },
        { type: 'layout', description: 'RTL support for Arabic', region: 'Middle East', implemented: false }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'review': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLanguageProgress = (progress: number) => {
    if (progress === 100) return 'text-green-600';
    if (progress >= 80) return 'text-blue-600';
    if (progress >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const supportedLanguages = [
    { code: 'zh', name: 'Chinese (Simplified)', flag: '🇨🇳' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
    { code: 'pt', name: 'Portuguese', flag: '🇧🇷' },
    { code: 'ru', name: 'Russian', flag: '🇷🇺' },
    { code: 'it', name: 'Italian', flag: '🇮🇹' }
  ];

  return (
    <div className="space-y-6">
      {/* Localization Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Active Projects</p>
                <p className="text-2xl font-bold">{mockLocalizationProjects.length}</p>
              </div>
              <Globe className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Languages</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <Languages className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Avg Progress</p>
                <p className="text-2xl font-bold">69%</p>
              </div>
              <CheckCircle className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Target Markets</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <MapPin className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Localization Projects */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Localization Projects
              </CardTitle>
              <CardDescription>
                AI-powered translation and cultural adaptation for global reach
              </CardDescription>
            </div>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
              <Plus className="w-4 h-4 mr-2" />
              New Localization
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {mockLocalizationProjects.map((locProject) => {
              const project = projects.find(p => p.id === locProject.projectId);
              return (
                <div key={locProject.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-medium text-lg">{project?.name || 'Unknown Project'}</h4>
                      <p className="text-sm text-slate-600">
                        {locProject.languages.length} languages • {locProject.culturalAdaptations.length} cultural adaptations
                      </p>
                    </div>
                    <Badge className={getStatusColor(locProject.status)}>
                      {locProject.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Overall Progress</span>
                      <span>{locProject.progress}%</span>
                    </div>
                    <Progress value={locProject.progress} className="h-3" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Language Progress */}
                    <div>
                      <h5 className="font-medium mb-3">Language Progress</h5>
                      <div className="space-y-3">
                        {locProject.languages.map((lang) => (
                          <div key={lang.code} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="w-8 text-center">{lang.code.toUpperCase()}</span>
                              <span className="font-medium">{lang.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`text-sm font-medium ${getLanguageProgress(lang.progress)}`}>
                                {lang.translatedStrings}/{lang.totalStrings}
                              </span>
                              <div className="w-16">
                                <Progress value={lang.progress} className="h-2" />
                              </div>
                              <Badge className={getStatusColor(lang.status)}>
                                {lang.status === 'completed' ? '✓' : lang.progress + '%'}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Cultural Adaptations */}
                    <div>
                      <h5 className="font-medium mb-3">Cultural Adaptations</h5>
                      <div className="space-y-2">
                        {locProject.culturalAdaptations.map((adaptation, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded">
                            <div>
                              <p className="text-sm font-medium">{adaptation.description}</p>
                              <p className="text-xs text-slate-600">
                                {adaptation.type.charAt(0).toUpperCase() + adaptation.type.slice(1)} • {adaptation.region}
                              </p>
                            </div>
                            {adaptation.implemented ? (
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            ) : (
                              <div className="w-4 h-4 border border-slate-300 rounded" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline">
                      <Settings className="w-4 h-4 mr-2" />
                      Configure
                    </Button>
                    <Button size="sm" variant="outline">
                      <Users className="w-4 h-4 mr-2" />
                      Review Team
                    </Button>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                      Auto-Translate
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Available Languages */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Languages className="w-5 h-5" />
            Supported Languages & Regions
          </CardTitle>
          <CardDescription>
            Add new languages and cultural adaptations to expand your global reach
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {supportedLanguages.map((lang) => (
              <div key={lang.code} 
                   className="p-3 border rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{lang.flag}</span>
                  <div>
                    <p className="font-medium text-sm">{lang.name}</p>
                    <p className="text-xs text-slate-600">{lang.code.toUpperCase()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start gap-3">
              <Palette className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <h5 className="font-medium text-blue-900">Cultural Adaptation Features</h5>
                <p className="text-sm text-blue-700 mt-1">
                  Our AI automatically adapts colors, layouts, currency formats, date formats, 
                  and content structure based on cultural preferences and local regulations.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
