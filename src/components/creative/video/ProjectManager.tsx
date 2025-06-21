
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileVideo, Save, Upload, Settings } from 'lucide-react';
import type { AccessibilityOptions } from '@/types/creative';

interface ProjectManagerProps {
  settings: AccessibilityOptions;
}

export const ProjectManager = ({ settings }: ProjectManagerProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className={`text-xl font-bold ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            Project Management
          </h3>
          <p className={`text-gray-600 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            Version control and collaborative editing
          </p>
        </div>
        <Badge variant="outline">Git-based</Badge>
      </div>

      <Card>
        <CardContent className="flex items-center justify-center h-96">
          <div className="text-center">
            <FileVideo className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">Project Manager Coming Soon</h3>
            <p className="text-gray-600">Version control and team collaboration</p>
            <div className="flex gap-2 mt-4 justify-center">
              <Button size="sm"><Save className="w-4 h-4 mr-2" />Save Project</Button>
              <Button size="sm" variant="outline"><Upload className="w-4 h-4" />Share</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
