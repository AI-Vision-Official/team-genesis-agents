
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProjectOverview } from './ProjectOverview';
import { ImpactDashboard } from './ImpactDashboard';
import { VolunteerTracker } from './VolunteerTracker';
import { ResourceManager } from './ResourceManager';
import { StorytellingHub } from './StorytellingHub';
import { GrantAssistant } from './GrantAssistant';
import { EthicsChecker } from './EthicsChecker';
import { CrisisResponse } from './CrisisResponse';
import { HumanConnection } from './HumanConnection';
import { AccessibilityControls } from './AccessibilityControls';
import type { HumanitarianProject, CrisisAlert, AccessibilitySettings } from '@/types/humanitarian';

interface HumanitarianCenterProps {
  projects: HumanitarianProject[];
  alerts: CrisisAlert[];
}

export const HumanitarianCenter = ({ projects, alerts }: HumanitarianCenterProps) => {
  const [accessibilitySettings, setAccessibilitySettings] = useState<AccessibilitySettings>({
    dyslexiaFont: false,
    colorBlindMode: 'none',
    lowContrast: false,
    readingLevel: 'standard',
    quietMode: false,
    minimumUI: false,
  });

  const containerClass = `space-y-6 ${
    accessibilitySettings.dyslexiaFont ? 'font-mono' : ''
  } ${
    accessibilitySettings.lowContrast ? 'contrast-75' : ''
  } ${
    accessibilitySettings.minimumUI ? 'max-w-4xl mx-auto' : ''
  }`;

  return (
    <div className={containerClass}>
      <Card className="border-l-4 border-l-green-500">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-green-700">
                🌍 Non Profit Management Center
              </CardTitle>
              <CardDescription className="text-green-600">
                Comprehensive management platform for all your non-profit initiatives
              </CardDescription>
            </div>
            <AccessibilityControls 
              settings={accessibilitySettings}
              onUpdate={setAccessibilitySettings}
            />
          </div>
        </CardHeader>
      </Card>

      {!accessibilitySettings.quietMode && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-green-50">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-700">{projects.length}</p>
                <p className="text-sm text-green-600">Active Projects</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-blue-50">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-700">
                  {projects.reduce((sum, p) => sum + p.impact.peopleHelped, 0)}
                </p>
                <p className="text-sm text-blue-600">People Helped</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-orange-50">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-700">
                  {alerts.filter(a => a.status === 'new').length}
                </p>
                <p className="text-sm text-orange-600">Active Alerts</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className={`grid w-full ${
          accessibilitySettings.minimumUI ? 'grid-cols-4' : 'grid-cols-8'
        }`}>
          <TabsTrigger value="overview">Projects</TabsTrigger>
          <TabsTrigger value="impact">Impact</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          {!accessibilitySettings.minimumUI && (
            <>
              <TabsTrigger value="volunteers">Team</TabsTrigger>
              <TabsTrigger value="stories">Stories</TabsTrigger>
              <TabsTrigger value="grants">Grants</TabsTrigger>
              <TabsTrigger value="ethics">Ethics</TabsTrigger>
            </>
          )}
        </TabsList>

        <TabsContent value="overview">
          <ProjectOverview projects={projects} settings={accessibilitySettings} />
        </TabsContent>

        <TabsContent value="impact">
          <ImpactDashboard projects={projects} settings={accessibilitySettings} />
        </TabsContent>

        <TabsContent value="alerts">
          <CrisisResponse alerts={alerts} settings={accessibilitySettings} />
        </TabsContent>

        <TabsContent value="resources">
          <ResourceManager projects={projects} settings={accessibilitySettings} />
        </TabsContent>

        {!accessibilitySettings.minimumUI && (
          <>
            <TabsContent value="volunteers">
              <VolunteerTracker projects={projects} settings={accessibilitySettings} />
            </TabsContent>

            <TabsContent value="stories">
              <StorytellingHub projects={projects} settings={accessibilitySettings} />
            </TabsContent>

            <TabsContent value="grants">
              <GrantAssistant settings={accessibilitySettings} />
            </TabsContent>

            <TabsContent value="ethics">
              <EthicsChecker projects={projects} settings={accessibilitySettings} />
            </TabsContent>
          </>
        )}
      </Tabs>

      <HumanConnection settings={accessibilitySettings} />
    </div>
  );
};
