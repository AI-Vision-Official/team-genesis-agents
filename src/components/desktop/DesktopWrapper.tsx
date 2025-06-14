
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Monitor, 
  Download, 
  Settings, 
  Minimize2, 
  Maximize2, 
  X,
  Wifi,
  WifiOff,
  Battery,
  Volume2,
  Bell,
  Shield
} from 'lucide-react';

interface SystemStatus {
  isOnline: boolean;
  batteryLevel: number;
  memoryUsage: number;
  cpuUsage: number;
  diskSpace: number;
  notifications: number;
}

interface DesktopFeature {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  icon: React.ReactNode;
}

export const DesktopWrapper = () => {
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    isOnline: true,
    batteryLevel: 85,
    memoryUsage: 62,
    cpuUsage: 45,
    diskSpace: 78,
    notifications: 3
  });

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isElectronAvailable, setIsElectronAvailable] = useState(false);

  const desktopFeatures: DesktopFeature[] = [
    {
      id: 'notifications',
      name: 'System Notifications',
      description: 'Native desktop notifications for agent updates',
      enabled: true,
      icon: <Bell className="w-4 h-4" />
    },
    {
      id: 'offline',
      name: 'Offline Mode',
      description: 'Continue working when internet is unavailable',
      enabled: true,
      icon: <WifiOff className="w-4 h-4" />
    },
    {
      id: 'autoupdate',
      name: 'Auto Updates',
      description: 'Automatically download and install updates',
      enabled: true,
      icon: <Download className="w-4 h-4" />
    },
    {
      id: 'security',
      name: 'Enhanced Security',
      description: 'Encrypted local storage and secure communications',
      enabled: true,
      icon: <Shield className="w-4 h-4" />
    }
  ];

  useEffect(() => {
    // Check if running in Electron
    const checkElectron = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      setIsElectronAvailable(userAgent.indexOf('electron') !== -1);
    };

    checkElectron();

    // Simulate system status updates
    const interval = setInterval(() => {
      setSystemStatus(prev => ({
        ...prev,
        batteryLevel: Math.max(0, prev.batteryLevel + (Math.random() - 0.5) * 2),
        memoryUsage: Math.max(0, Math.min(100, prev.memoryUsage + (Math.random() - 0.5) * 5)),
        cpuUsage: Math.max(0, Math.min(100, prev.cpuUsage + (Math.random() - 0.5) * 10)),
        diskSpace: prev.diskSpace,
        notifications: Math.max(0, prev.notifications + (Math.random() > 0.8 ? 1 : 0))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleMinimize = () => {
    if (window.electronAPI) {
      window.electronAPI.minimize();
    }
  };

  const handleMaximize = () => {
    if (window.electronAPI) {
      window.electronAPI.maximize();
      setIsFullscreen(!isFullscreen);
    }
  };

  const handleClose = () => {
    if (window.electronAPI) {
      window.electronAPI.close();
    }
  };

  const downloadDesktopApp = () => {
    // In a real implementation, this would trigger the download
    console.log('Downloading desktop application...');
    alert('Desktop app download would start here. This demo simulates the desktop experience.');
  };

  const getBatteryColor = (level: number) => {
    if (level > 50) return 'text-green-600';
    if (level > 20) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getUsageColor = (usage: number) => {
    if (usage < 50) return 'bg-green-500';
    if (usage < 80) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Monitor className="w-6 h-6 text-blue-500" />
            Desktop Application
          </h2>
          <p className="text-slate-600 mt-1">Native desktop experience with enhanced capabilities</p>
        </div>
        {!isElectronAvailable && (
          <Button onClick={downloadDesktopApp} className="bg-gradient-to-r from-blue-600 to-purple-600">
            <Download className="w-4 h-4 mr-2" />
            Download Desktop App
          </Button>
        )}
      </div>

      {/* Desktop Controls (only show in Electron) */}
      {isElectronAvailable && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Window Controls</span>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={handleMinimize}>
                  <Minimize2 className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={handleMaximize}>
                  <Maximize2 className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={handleClose}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="w-5 h-5" />
              System Status
            </CardTitle>
            <CardDescription>Real-time system monitoring</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Connection Status */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {systemStatus.isOnline ? 
                  <Wifi className="w-4 h-4 text-green-600" /> : 
                  <WifiOff className="w-4 h-4 text-red-600" />
                }
                <span className="text-sm">Connection</span>
              </div>
              <Badge variant={systemStatus.isOnline ? "default" : "destructive"}>
                {systemStatus.isOnline ? 'Online' : 'Offline'}
              </Badge>
            </div>

            {/* Battery Level */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Battery className={`w-4 h-4 ${getBatteryColor(systemStatus.batteryLevel)}`} />
                  <span className="text-sm">Battery</span>
                </div>
                <span className="text-sm font-medium">{systemStatus.batteryLevel.toFixed(0)}%</span>
              </div>
              <Progress value={systemStatus.batteryLevel} className="h-2" />
            </div>

            {/* Memory Usage */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Memory Usage</span>
                <span className="text-sm font-medium">{systemStatus.memoryUsage.toFixed(0)}%</span>
              </div>
              <Progress 
                value={systemStatus.memoryUsage} 
                className={`h-2 ${getUsageColor(systemStatus.memoryUsage)}`}
              />
            </div>

            {/* CPU Usage */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">CPU Usage</span>
                <span className="text-sm font-medium">{systemStatus.cpuUsage.toFixed(0)}%</span>
              </div>
              <Progress 
                value={systemStatus.cpuUsage} 
                className={`h-2 ${getUsageColor(systemStatus.cpuUsage)}`}
              />
            </div>

            {/* Notifications */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-blue-600" />
                <span className="text-sm">Notifications</span>
              </div>
              <Badge variant="outline">{systemStatus.notifications}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Desktop Features */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Desktop Features
            </CardTitle>
            <CardDescription>Enhanced desktop capabilities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {desktopFeatures.map((feature) => (
              <div key={feature.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3">
                  {feature.icon}
                  <div>
                    <p className="font-medium text-sm">{feature.name}</p>
                    <p className="text-xs text-slate-600">{feature.description}</p>
                  </div>
                </div>
                <Badge variant={feature.enabled ? "default" : "outline"}>
                  {feature.enabled ? 'Enabled' : 'Disabled'}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Installation Guide */}
      {!isElectronAvailable && (
        <Card>
          <CardHeader>
            <CardTitle>Desktop App Benefits</CardTitle>
            <CardDescription>Why use the desktop application?</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium">🚀 Performance</h4>
                <p className="text-sm text-slate-600">Faster loading, better memory management, and smoother animations</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">🔔 Notifications</h4>
                <p className="text-sm text-slate-600">Native desktop notifications for agent updates and alerts</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">📱 Offline Support</h4>
                <p className="text-sm text-slate-600">Continue working even when internet connection is lost</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">🔐 Security</h4>
                <p className="text-sm text-slate-600">Enhanced security with encrypted local storage</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
