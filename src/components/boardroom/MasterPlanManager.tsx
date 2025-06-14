
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  FileText, 
  Download, 
  Upload, 
  Edit, 
  Save, 
  Plus,
  Target,
  Lightbulb,
  Shield,
  TrendingUp
} from 'lucide-react';
import type { BoardroomAccessibilityOptions, MasterPlan } from '@/types/boardroom';

interface MasterPlanManagerProps {
  settings: BoardroomAccessibilityOptions;
}

export const MasterPlanManager = ({ settings }: MasterPlanManagerProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedSection, setSelectedSection] = useState('objectives');

  const mockMasterPlan: MasterPlan = {
    id: '1',
    title: 'AI-Human Collaborative Excellence Initiative',
    version: '2.1.3',
    lastUpdated: new Date(),
    objectives: [
      {
        id: '1',
        title: 'Enhance AI-Human Collaboration',
        description: 'Create seamless integration between AI agents and human team members',
        priority: 'critical',
        status: 'in_progress',
        targetDate: new Date('2024-08-15'),
        assignedTo: ['AI-Alpha', 'Human-Sarah', 'AI-Beta'],
        progress: 75
      },
      {
        id: '2',
        title: 'Global Platform Expansion',
        description: 'Expand social media presence to include censorship-resistant platforms',
        priority: 'high',
        status: 'planned',
        targetDate: new Date('2024-09-30'),
        assignedTo: ['AI-Gamma', 'Human-Marcus'],
        progress: 25
      }
    ],
    strategies: [],
    milestones: [],
    resources: [],
    risks: [],
    successMetrics: [],
    collaborators: []
  };

  const handleExportJSON = () => {
    const dataStr = JSON.stringify(mockMasterPlan, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'masterplan.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            📋 Master Plan
          </h2>
          <p className={`text-gray-600 mt-1 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            Living blueprint for AI-Human collaboration • Version {mockMasterPlan.version}
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleExportJSON}>
            <Download className="w-4 h-4 mr-2" />
            Export JSON
          </Button>
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Button 
            onClick={() => setIsEditing(!isEditing)}
            variant={isEditing ? "secondary" : "default"}
          >
            {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
            {isEditing ? 'Save Changes' : 'Edit Plan'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className={`text-lg ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
              Sections
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              { id: 'objectives', label: 'Objectives', icon: Target, count: 2 },
              { id: 'strategies', label: 'Strategies', icon: Lightbulb, count: 0 },
              { id: 'risks', label: 'Risks', icon: Shield, count: 0 },
              { id: 'metrics', label: 'Success Metrics', icon: TrendingUp, count: 0 }
            ].map(({ id, label, icon: Icon, count }) => (
              <Button
                key={id}
                variant={selectedSection === id ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setSelectedSection(id)}
              >
                <Icon className="w-4 h-4 mr-2" />
                {label}
                <Badge variant="secondary" className="ml-auto">
                  {count}
                </Badge>
              </Button>
            ))}
          </CardContent>
        </Card>

        <div className="lg:col-span-3 space-y-6">
          {selectedSection === 'objectives' && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className={settings.dyslexiaFont ? 'font-mono' : ''}>
                    Strategic Objectives
                  </CardTitle>
                  <CardDescription>
                    Core goals driving our AI-Human collaborative mission
                  </CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Objective
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockMasterPlan.objectives.map((objective) => (
                  <Card key={objective.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className={`font-medium ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                            {objective.title}
                          </h4>
                          <p className={`text-sm text-gray-600 mt-1 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                            {objective.description}
                          </p>
                          <div className="flex items-center gap-4 mt-3">
                            <Badge variant={objective.priority === 'critical' ? 'destructive' : 'default'}>
                              {objective.priority}
                            </Badge>
                            <Badge variant={objective.status === 'in_progress' ? 'default' : 'secondary'}>
                              {objective.status.replace('_', ' ')}
                            </Badge>
                            <span className={`text-sm text-gray-500 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                              Progress: {objective.progress}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all"
                              style={{ width: `${objective.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        {isEditing && (
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          )}

          {selectedSection === 'strategies' && (
            <Card>
              <CardHeader>
                <CardTitle className={settings.dyslexiaFont ? 'font-mono' : ''}>
                  Strategic Approaches
                </CardTitle>
                <CardDescription>
                  Methods and tactics for achieving our objectives
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Lightbulb className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className={`text-gray-500 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                    No strategies defined yet. Click "Add Strategy" to begin.
                  </p>
                  <Button className="mt-4">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Strategy
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                <FileText className="w-5 h-5" />
                Master Plan Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Add collaborative notes, insights, and evolution thoughts here..."
                className={`min-h-[120px] ${settings.dyslexiaFont ? 'font-mono' : ''}`}
                disabled={!isEditing}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
