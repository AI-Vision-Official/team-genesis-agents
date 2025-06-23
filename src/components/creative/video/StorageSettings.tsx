
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Settings, 
  HardDrive, 
  WifiOff, 
  Wifi, 
  CheckCircle, 
  AlertCircle 
} from 'lucide-react';

interface StorageSettingsProps {
  useLocalStorage: boolean;
  offlineMode: boolean;
  onLocalStorageChange: (value: boolean) => void;
  onOfflineModeChange: (value: boolean) => void;
}

export const StorageSettings = ({
  useLocalStorage,
  offlineMode,
  onLocalStorageChange,
  onOfflineModeChange
}: StorageSettingsProps) => {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Storage Settings
        </CardTitle>
        <CardDescription>
          Choose how to store and process your videos
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HardDrive className="w-4 h-4" />
            <Label htmlFor="local-storage">Local Storage (Large files)</Label>
          </div>
          <Switch
            id="local-storage"
            checked={useLocalStorage}
            onCheckedChange={onLocalStorageChange}
          />
        </div>
        <p className="text-sm text-gray-600">
          {useLocalStorage 
            ? "Videos are stored locally on your computer and processed offline" 
            : "Small videos (<50MB) are stored in the cloud"
          }
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <WifiOff className="w-4 h-4" />
            <Label htmlFor="offline-mode">Offline Mode</Label>
          </div>
          <Switch
            id="offline-mode"
            checked={offlineMode}
            onCheckedChange={onOfflineModeChange}
          />
        </div>
        <p className="text-sm text-gray-600">
          {offlineMode 
            ? "All features work completely offline with local AI models" 
            : "Online features available for cloud processing"
          }
        </p>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="flex items-center gap-2 text-sm">
            {useLocalStorage ? (
              <>
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>No file size limit</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>Max 50MB per file</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm">
            {offlineMode ? (
              <>
                <WifiOff className="w-4 h-4 text-blue-600" />
                <span>Fully offline</span>
              </>
            ) : (
              <>
                <Wifi className="w-4 h-4 text-green-600" />
                <span>Online features active</span>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
