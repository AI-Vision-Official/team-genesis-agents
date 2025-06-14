
import { Button } from '@/components/ui/button';
import { VisualIndicator } from '@/components/ui/visual-indicator';
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
          <VisualIndicator 
            type={isMonitoring ? 'active' : 'inactive'} 
            size="lg" 
            pulse={isMonitoring}
          />
        </h2>
        <p className="text-slate-600 mt-2 flex items-center gap-2">
          <span>Live system and agent performance metrics</span>
          {isMonitoring && (
            <span className="inline-flex items-center gap-1 text-green-600 text-sm font-medium">
              <VisualIndicator type="active" size="sm" pulse />
              MONITORING ACTIVE
            </span>
          )}
        </p>
      </div>
      <div className="flex gap-3">
        <Button 
          variant={isMonitoring ? "default" : "outline"}
          onClick={onToggleMonitoring}
          className={isMonitoring ? 'bg-green-600 shadow-lg' : 'border-2 border-dashed border-red-300 text-red-600'}
        >
          <div className="flex items-center gap-2">
            <VisualIndicator 
              type={isMonitoring ? 'active' : 'inactive'} 
              pulse={isMonitoring}
            />
            {isMonitoring ? <Eye className="w-4 h-4" /> : <RefreshCw className="w-4 h-4" />}
            {isMonitoring ? 'Monitoring' : 'Paused'}
          </div>
        </Button>
        <Button variant="outline">
          <Settings className="w-4 h-4 mr-2" />
          Configure
        </Button>
      </div>
    </div>
  );
};
