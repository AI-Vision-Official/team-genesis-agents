
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WebAgentGrid } from './WebAgentGrid';
import { ProjectManager } from './ProjectManager';
import { VisualEditorPanel } from './VisualEditorPanel';
import { MonitoringDashboard } from './MonitoringDashboard';
import { SecurityCenter } from './SecurityCenter';
import { LocalizationHub } from './LocalizationHub';
import type { WebAgent, WebProject } from '@/types/webDevelopment';

interface WebDevelopmentCenterProps {
  agents: WebAgent[];
  projects: WebProject[];
}

export const WebDevelopmentCenter = ({ agents, projects }: WebDevelopmentCenterProps) => {
  const [activeProject, setActiveProject] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🌐 Website & App Creation & Management Center
          </CardTitle>
          <CardDescription>
            Autonomous web development with specialized AI agents for front-end, back-end, mobile, and maintenance
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="agents" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="agents">AI Specialists</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="editor">Visual Editor</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="localization">Localization</TabsTrigger>
        </TabsList>

        <TabsContent value="agents">
          <WebAgentGrid agents={agents} />
        </TabsContent>

        <TabsContent value="projects">
          <ProjectManager 
            projects={projects} 
            agents={agents}
            onProjectSelect={setActiveProject}
          />
        </TabsContent>

        <TabsContent value="editor">
          <VisualEditorPanel activeProject={activeProject} />
        </TabsContent>

        <TabsContent value="monitoring">
          <MonitoringDashboard projects={projects} />
        </TabsContent>

        <TabsContent value="security">
          <SecurityCenter projects={projects} />
        </TabsContent>

        <TabsContent value="localization">
          <LocalizationHub projects={projects} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
