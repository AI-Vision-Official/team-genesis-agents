
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Zap, 
  Brain, 
  Globe, 
  Headphones, 
  Square, 
  Play, 
  Upload, 
  Download, 
  FileAudio, 
  Sparkles 
} from 'lucide-react';
import { AudioUploadSection } from './AudioUploadSection';
import { AudioLibrary } from './AudioLibrary';
import { AudioModuleGrid } from './AudioModuleGrid';
import type { AccessibilityOptions } from '@/types/creative';

interface UploadedAudio {
  id: string;
  file: File;
  url: string;
  name: string;
  size: number;
  duration?: number;
  uploaded: boolean;
}

interface AudioModule {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  status: string;
  agents: number;
}

interface AudioOverviewProps {
  audioModules: AudioModule[];
  settings: AccessibilityOptions;
  uploadedAudios: UploadedAudio[];
  setUploadedAudios: React.Dispatch<React.SetStateAction<UploadedAudio[]>>;
  isUploading: boolean;
  isRecording: boolean;
  audioLevel: number;
  isPlaying: { [key: string]: boolean };
  onFileUpload: (files: FileList) => void;
  togglePlayback: (audioId: string) => void;
  startProcessing: (audioId: string) => void;
  setIsRecording: (recording: boolean) => void;
  setActiveTab: (tab: string) => void;
}

export const AudioOverview = ({
  audioModules,
  settings,
  uploadedAudios,
  setUploadedAudios,
  isUploading,
  isRecording,
  audioLevel,
  isPlaying,
  onFileUpload,
  togglePlayback,
  startProcessing,
  setIsRecording,
  setActiveTab
}: AudioOverviewProps) => {
  return (
    <div className="space-y-6">
      <AudioUploadSection onFileUpload={onFileUpload} isUploading={isUploading} />
      
      <AudioLibrary 
        uploadedAudios={uploadedAudios}
        setUploadedAudios={setUploadedAudios}
        isPlaying={isPlaying}
        togglePlayback={togglePlayback}
        startProcessing={startProcessing}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600">Active Modules</p>
                <p className="text-2xl font-bold text-blue-700">
                  {audioModules.filter(m => m.status === 'active').length}
                </p>
              </div>
              <Zap className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-50 to-green-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600">Audio Agents</p>
                <p className="text-2xl font-bold text-green-700">
                  {audioModules.reduce((acc, m) => acc + m.agents, 0)}
                </p>
              </div>
              <Brain className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-50 to-purple-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600">Languages</p>
                <p className="text-2xl font-bold text-purple-700">47</p>
              </div>
              <Globe className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <AudioModuleGrid 
        audioModules={audioModules}
        settings={settings}
        onModuleClick={setActiveTab}
      />

      <Card>
        <CardContent className="space-y-4 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Headphones className="w-5 h-5" />
            <h3 className="font-medium">Quick Audio Control</h3>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setIsRecording(!isRecording)}
              className={isRecording ? 'bg-red-500 hover:bg-red-600' : ''}
            >
              {isRecording ? <Square className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {isRecording ? 'Stop Recording' : 'Start Recording'}
            </Button>
            <div className="flex-1">
              <div className="flex items-center justify-between text-sm mb-1">
                <span>Audio Level</span>
                <span>{audioLevel}%</span>
              </div>
              <Progress value={audioLevel} className="h-2" />
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Import Audio
            </Button>
            <Button size="sm" variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Project
            </Button>
            <Button size="sm" variant="outline">
              <FileAudio className="w-4 h-4 mr-2" />
              Load Preset
            </Button>
            <Button size="sm" variant="outline">
              <Sparkles className="w-4 h-4 mr-2" />
              AI Enhance
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
