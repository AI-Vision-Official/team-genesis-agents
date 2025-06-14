
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle,
  RefreshCw,
  Filter
} from 'lucide-react';
import type { ExecutionLog } from '@/types/ifttt';

interface ExecutionHistoryProps {
  logs: ExecutionLog[];
}

export const ExecutionHistory = ({ logs }: ExecutionHistoryProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'partial':
        return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      case 'skipped':
        return <Clock className="w-4 h-4 text-gray-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'partial': return 'bg-orange-100 text-orange-800';
      case 'skipped': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Execution History</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {logs.map((log) => (
          <Card key={log.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  {getStatusIcon(log.status)}
                  <h4 className="font-medium">{log.ruleName}</h4>
                  <Badge className={getStatusColor(log.status)}>
                    {log.status}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  {log.timestamp.toLocaleString()}
                </div>
              </div>
              
              <div className="text-sm text-muted-foreground mb-2">
                Execution time: {log.executionTime}ms
              </div>
              
              {log.executedActions.length > 0 && (
                <div className="mb-2">
                  <p className="text-sm font-medium mb-1">Executed Actions:</p>
                  <div className="flex flex-wrap gap-1">
                    {log.executedActions.map((action, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {action}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {log.errorMessage && (
                <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-800">
                  Error: {log.errorMessage}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
