
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  FileText, 
  Calendar, 
  Target, 
  Zap,
  Heart,
  Play,
  Square,
  MessageCircle,
  TrendingUp,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { MasterPlanManager } from './MasterPlanManager';
import { DailyLogManager } from './DailyLogManager';
import { TaskDashboard } from './TaskDashboard';
import { MotivationCenter } from './MotivationCenter';
import { MeetingRoom } from './MeetingRoom';
import { CollaborationSpace } from './CollaborationSpace';
import type { BoardroomAccessibilityOptions } from '@/types/boardroom';

interface BoardroomCenterProps {
  settings: BoardroomAccessibilityOptions;
}

export const BoardroomCenter = ({ settings }: BoardroomCenterProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [meetingStatus, setMeetingStatus] = useState<'inactive' | 'active' | 'logging'>('inactive');

  const handleDFTrigger = () => {
    setMeetingStatus('active');
    console.log('🚀 Meeting started - DF trigger activated');
  };

  const handleDFGTrigger = () => {
    setMeetingStatus('logging');
    console.log('📝 Meeting ended - DFG trigger activated, logging results');
    setTimeout(() => setMeetingStatus('inactive'), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-bold ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            🏛️ AI-Human Boardroom
          </h1>
          <p className={`text-gray-600 mt-2 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            Collaborative strategic planning and decision-making space
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button
            onClick={handleDFTrigger}
            disabled={meetingStatus === 'active'}
            className="bg-green-600 hover:bg-green-700"
          >
            <Play className="w-4 h-4 mr-2" />
            Start Meeting (DF)
          </Button>
          <Button
            onClick={handleDFGTrigger}
            disabled={meetingStatus !== 'active'}
            className="bg-red-600 hover:bg-red-700"
          >
            <Square className="w-4 h-4 mr-2" />
            End Meeting (DFG)
          </Button>
        </div>
      </div>

      {meetingStatus !== 'inactive' && (
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              {meetingStatus === 'active' && (
                <>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className={`text-green-600 font-medium ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                    Meeting in Progress - Collaborative Mode Active
                  </span>
                </>
              )}
              {meetingStatus === 'logging' && (
                <>
                  <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                  <span className={`text-orange-600 font-medium ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                    Logging Results and Updating Master Plan...
                  </span>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-blue-500" />
              <div>
                <p className={`text-2xl font-bold ${settings.dyslexiaFont ? 'font-mono' : ''}`}>12</p>
                <p className={`text-sm text-gray-600 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>Active Collaborators</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Target className="w-8 h-8 text-green-500" />
              <div>
                <p className={`text-2xl font-bold ${settings.dyslexiaFont ? 'font-mono' : ''}`}>8/15</p>
                <p className={`text-sm text-gray-600 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>Objectives Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-purple-500" />
              <div>
                <p className={`text-2xl font-bold ${settings.dyslexiaFont ? 'font-mono' : ''}`}>23</p>
                <p className={`text-sm text-gray-600 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>Tasks Today</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Heart className="w-8 h-8 text-red-500" />
              <div>
                <p className={`text-2xl font-bold ${settings.dyslexiaFont ? 'font-mono' : ''}`}>94%</p>
                <p className={`text-sm text-gray-600 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>Team Morale</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="masterplan">Master Plan</TabsTrigger>
          <TabsTrigger value="tasks">Task Board</TabsTrigger>
          <TabsTrigger value="logs">Daily Logs</TabsTrigger>
          <TabsTrigger value="collaboration">Collaborate</TabsTrigger>
          <TabsTrigger value="motivation">Motivation</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                  <TrendingUp className="w-5 h-5" />
                  Progress Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className={settings.dyslexiaFont ? 'font-mono' : ''}>Strategic Objectives</span>
                    <Badge variant="secondary">53% Complete</Badge>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '53%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                  <AlertTriangle className="w-5 h-5" />
                  Active Challenges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className={`text-sm ${settings.dyslexiaFont ? 'font-mono' : ''}`}>Resource allocation optimization</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className={`text-sm ${settings.dyslexiaFont ? 'font-mono' : ''}`}>Cross-platform integration delays</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="masterplan">
          <MasterPlanManager settings={settings} />
        </TabsContent>

        <TabsContent value="tasks">
          <TaskDashboard settings={settings} />
        </TabsContent>

        <TabsContent value="logs">
          <DailyLogManager settings={settings} />
        </TabsContent>

        <TabsContent value="collaboration">
          <CollaborationSpace settings={settings} meetingStatus={meetingStatus} />
        </TabsContent>

        <TabsContent value="motivation">
          <MotivationCenter settings={settings} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
