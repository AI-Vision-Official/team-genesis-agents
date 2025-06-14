
import { Button } from '@/components/ui/button';
import { Activity, Eye, RefreshCw, Settings } from 'lucide-react';

interface MonitoringHeaderProps {
  isMonitoring: boolean;
  onToggleMonitoring: () => void;
}

export const MonitoringHeader = ({ isMonitoring, onToggleMonitoring }: MonitoringHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent flex items-center gap-3">
          <Activity className="w-8 h-8 text-blue-600" />
          Real-Time Performance Monitoring
        </h2>
        <p className="text-slate-600 mt-2">Live system and agent performance metrics</p>
      </div>
      <div className="flex gap-3">
        <Button 
          variant="outline" 
          onClick={onToggleMonitoring}
          className={isMonitoring ? 'text-green-600' : 'text-red-600'}
        >
          {isMonitoring ? <Eye className="w-4 h-4 mr-2" /> : <RefreshCw className="w-4 h-4 mr-2" />}
          {isMonitoring ? 'Monitoring' : 'Paused'}
        </Button>
        <Button variant="outline">
          <Settings className="w-4 h-4 mr-2" />
          Configure
        </Button>
      </div>
    </div>
  );
};
