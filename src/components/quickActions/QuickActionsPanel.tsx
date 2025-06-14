
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, 
  Bot, 
  Shield, 
  Heart, 
  RefreshCw, 
  AlertTriangle,
  Play,
  Pause,
  Settings,
  Download,
  Upload,
  Database,
  Globe,
  Users,
  Brain,
  Target,
  TrendingUp
} from 'lucide-react';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: 'system' | 'agents' | 'missions' | 'data' | 'monitoring';
  danger?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

export const QuickActionsPanel = () => {
  const [executingAction, setExecutingAction] = useState<string | null>(null);
  const [recentActions, setRecentActions] = useState<string[]>([]);

  const quickActions: QuickAction[] = [
    // System Actions
    {
      id: 'emergency-stop',
      title: 'Emergency Stop All',
      description: 'Immediately halt all agent operations',
      icon: <AlertTriangle className="w-5 h-5" />,
      category: 'system',
      danger: true
    },
    {
      id: 'restart-system',
      title: 'Restart System',
      description: 'Full system restart with health checks',
      icon: <RefreshCw className="w-5 h-5" />,
      category: 'system',
      danger: true
    },
    {
      id: 'backup-now',
      title: 'Create Backup',
      description: 'Instant backup of all configurations',
      icon: <Download className="w-5 h-5" />,
      category: 'data'
    },
    
    // Agent Actions
    {
      id: 'spawn-analyst',
      title: 'Spawn Data Analyst',
      description: 'Quick spawn specialized data analysis agent',
      icon: <Bot className="w-5 h-5" />,
      category: 'agents'
    },
    {
      id: 'spawn-security',
      title: 'Spawn Security Agent',
      description: 'Deploy security monitoring agent',
      icon: <Shield className="w-5 h-5" />,
      category: 'agents'
    },
    {
      id: 'health-check-all',
      title: 'Health Check All',
      description: 'Run comprehensive health check on all agents',
      icon: <Heart className="w-5 h-5" />,
      category: 'agents'
    },
    
    // Mission Actions
    {
      id: 'start-crisis-mode',
      title: 'Activate Crisis Mode',
      description: 'Enable crisis response protocols',
      icon: <Target className="w-5 h-5" />,
      category: 'missions',
      danger: true
    },
    {
      id: 'run-analysis',
      title: 'Run Market Analysis',
      description: 'Start comprehensive market research',
      icon: <TrendingUp className="w-5 h-5" />,
      category: 'missions'
    },
    
    // Monitoring Actions
    {
      id: 'enable-monitoring',
      title: 'Enable Full Monitoring',
      description: 'Activate all monitoring systems',
      icon: <Globe className="w-5 h-5" />,
      category: 'monitoring'
    },
    {
      id: 'generate-report',
      title: 'Generate Status Report',
      description: 'Create comprehensive system report',
      icon: <Database className="w-5 h-5" />,
      category: 'monitoring'
    },
    
    // Data Actions
    {
      id: 'sync-platforms',
      title: 'Sync All Platforms',
      description: 'Synchronize data across all connected platforms',
      icon: <Upload className="w-5 h-5" />,
      category: 'data'
    },
    {
      id: 'optimize-performance',
      title: 'Optimize Performance',
      description: 'Run AI optimization on all systems',
      icon: <Brain className="w-5 h-5" />,
      category: 'system'
    }
  ];

  const executeAction = async (actionId: string) => {
    setExecutingAction(actionId);
    
    // Simulate action execution
    console.log(`Executing action: ${actionId}`);
    
    // Add artificial delay to simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setExecutingAction(null);
    setRecentActions(prev => [actionId, ...prev.slice(0, 4)]); // Keep last 5 actions
  };

  const getActionsByCategory = (category: string) => {
    return quickActions.filter(action => action.category === category);
  };

  const categories = [
    { id: 'system', label: 'System', icon: <Settings className="w-4 h-4" /> },
    { id: 'agents', label: 'Agents', icon: <Bot className="w-4 h-4" /> },
    { id: 'missions', label: 'Missions', icon: <Target className="w-4 h-4" /> },
    { id: 'monitoring', label: 'Monitoring', icon: <Globe className="w-4 h-4" /> },
    { id: 'data', label: 'Data', icon: <Database className="w-4 h-4" /> }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Zap className="w-6 h-6 text-yellow-600" />
            Quick Actions Panel
          </h2>
          <p className="text-slate-600 mt-1">One-click access to common system operations</p>
        </div>
        {recentActions.length > 0 && (
          <div className="text-sm text-slate-600">
            Last action: {quickActions.find(a => a.id === recentActions[0])?.title}
          </div>
        )}
      </div>

      {/* Recent Actions */}
      {recentActions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Actions</CardTitle>
            <CardDescription>Last {recentActions.length} executed actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {recentActions.map((actionId, index) => {
                const action = quickActions.find(a => a.id === actionId);
                return action ? (
                  <Badge key={`${actionId}-${index}`} variant="outline" className="flex items-center gap-1">
                    {action.icon}
                    {action.title}
                  </Badge>
                ) : null;
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions by Category */}
      <div className="space-y-6">
        {categories.map((category) => {
          const actions = getActionsByCategory(category.id);
          return (
            <Card key={category.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {category.icon}
                  {category.label} Actions
                </CardTitle>
                <CardDescription>
                  Quick access to {category.label.toLowerCase()} operations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {actions.map((action) => (
                    <div
                      key={action.id}
                      className={`p-4 border rounded-lg transition-all hover:shadow-md ${
                        action.danger 
                          ? 'border-red-200 bg-red-50 hover:bg-red-100' 
                          : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {action.icon}
                          <h4 className="font-medium">{action.title}</h4>
                        </div>
                        {action.danger && (
                          <Badge variant="destructive" className="text-xs">
                            Danger
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-slate-600 mb-4">
                        {action.description}
                      </p>
                      <Button
                        onClick={() => executeAction(action.id)}
                        disabled={action.disabled || executingAction === action.id}
                        className={`w-full ${
                          action.danger 
                            ? 'bg-red-600 hover:bg-red-700 text-white' 
                            : ''
                        }`}
                        variant={action.danger ? 'destructive' : 'default'}
                      >
                        {executingAction === action.id ? (
                          <>
                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                            Executing...
                          </>
                        ) : (
                          <>
                            {action.icon}
                            <span className="ml-2">Execute</span>
                          </>
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
