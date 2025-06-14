
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, 
  Bot, 
  Share2, 
  Brain, 
  Shield, 
  Heart, 
  Globe, 
  MessageSquare,
  TrendingUp,
  AlertTriangle,
  RefreshCw,
  Play,
  Pause,
  Settings
} from 'lucide-react';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: 'agents' | 'missions' | 'social' | 'security' | 'analytics';
  danger?: boolean;
  action: () => void;
}

export const QuickActionsPanel = () => {
  const [executing, setExecuting] = useState<string | null>(null);

  const executeAction = async (actionId: string, action: () => void) => {
    setExecuting(actionId);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate action
      action();
    } finally {
      setExecuting(null);
    }
  };

  const quickActions: QuickAction[] = [
    // Agent Management
    {
      id: 'spawn-agent',
      title: 'Spawn New Agent',
      description: 'Create a specialized AI agent for urgent tasks',
      icon: <Bot className="w-5 h-5" />,
      category: 'agents',
      action: () => console.log('Spawning new agent...')
    },
    {
      id: 'restart-all',
      title: 'Restart All Agents',
      description: 'Restart all AI agents (use with caution)',
      icon: <RefreshCw className="w-5 h-5" />,
      category: 'agents',
      danger: true,
      action: () => console.log('Restarting all agents...')
    },
    {
      id: 'health-check',
      title: 'System Health Check',
      description: 'Run comprehensive health diagnostic',
      icon: <Heart className="w-5 h-5" />,
      category: 'agents',
      action: () => console.log('Running health check...')
    },

    // Mission Control
    {
      id: 'emergency-mission',
      title: 'Emergency Mission',
      description: 'Launch crisis response protocol',
      icon: <AlertTriangle className="w-5 h-5" />,
      category: 'missions',
      danger: true,
      action: () => console.log('Launching emergency mission...')
    },
    {
      id: 'auto-optimize',
      title: 'Auto-Optimize',
      description: 'AI-powered system optimization',
      icon: <Brain className="w-5 h-5" />,
      category: 'missions',
      action: () => console.log('Running auto-optimization...')
    },

    // Social Media
    {
      id: 'social-blast',
      title: 'Social Media Blast',
      description: 'Post to all connected platforms',
      icon: <Share2 className="w-5 h-5" />,
      category: 'social',
      action: () => console.log('Posting to all platforms...')
    },
    {
      id: 'engagement-boost',
      title: 'Engagement Boost',
      description: 'Activate high-engagement protocols',
      icon: <TrendingUp className="w-5 h-5" />,
      category: 'social',
      action: () => console.log('Boosting engagement...')
    },

    // Security
    {
      id: 'security-scan',
      title: 'Security Scan',
      description: 'Full system security audit',
      icon: <Shield className="w-5 h-5" />,
      category: 'security',
      action: () => console.log('Running security scan...')
    },
    {
      id: 'lockdown',
      title: 'Emergency Lockdown',
      description: 'Secure all systems immediately',
      icon: <Shield className="w-5 h-5" />,
      category: 'security',
      danger: true,
      action: () => console.log('Initiating lockdown...')
    },

    // Analytics
    {
      id: 'generate-report',
      title: 'Generate Report',
      description: 'Create comprehensive analytics report',
      icon: <TrendingUp className="w-5 h-5" />,
      category: 'analytics',
      action: () => console.log('Generating report...')
    },
    {
      id: 'global-status',
      title: 'Global Status',
      description: 'Check status across all platforms',
      icon: <Globe className="w-5 h-5" />,
      category: 'analytics',
      action: () => console.log('Checking global status...')
    }
  ];

  const categories = {
    agents: { name: 'Agent Management', color: 'bg-blue-500' },
    missions: { name: 'Mission Control', color: 'bg-purple-500' },
    social: { name: 'Social Media', color: 'bg-green-500' },
    security: { name: 'Security', color: 'bg-red-500' },
    analytics: { name: 'Analytics', color: 'bg-yellow-500' }
  };

  const groupedActions = quickActions.reduce((acc, action) => {
    if (!acc[action.category]) acc[action.category] = [];
    acc[action.category].push(action);
    return acc;
  }, {} as Record<string, QuickAction[]>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Zap className="w-6 h-6 text-yellow-500" />
            Quick Actions
          </h2>
          <p className="text-slate-600 mt-1">One-click access to essential system operations</p>
        </div>
        <Button variant="outline">
          <Settings className="w-4 h-4 mr-2" />
          Customize
        </Button>
      </div>

      {/* Action Categories */}
      <div className="space-y-6">
        {Object.entries(groupedActions).map(([categoryKey, actions]) => {
          const category = categories[categoryKey as keyof typeof categories];
          return (
            <Card key={categoryKey}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${category.color}`} />
                  {category.name}
                </CardTitle>
                <CardDescription>
                  Quick actions for {category.name.toLowerCase()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {actions.map((action) => (
                    <Card key={action.id} className={`cursor-pointer transition-all hover:shadow-md ${
                      action.danger ? 'border-red-200 hover:border-red-300' : 'hover:border-blue-300'
                    }`}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${
                            action.danger ? 'bg-red-100' : 'bg-blue-100'
                          }`}>
                            {action.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium text-sm">{action.title}</h4>
                              {action.danger && (
                                <Badge variant="destructive" className="text-xs">Danger</Badge>
                              )}
                            </div>
                            <p className="text-xs text-slate-600 mb-3">{action.description}</p>
                            <Button 
                              size="sm" 
                              className={`w-full ${action.danger ? 'bg-red-600 hover:bg-red-700' : ''}`}
                              onClick={() => executeAction(action.id, action.action)}
                              disabled={executing === action.id}
                            >
                              {executing === action.id ? (
                                <>
                                  <RefreshCw className="w-3 h-3 mr-2 animate-spin" />
                                  Executing...
                                </>
                              ) : (
                                <>
                                  <Play className="w-3 h-3 mr-2" />
                                  Execute
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Emergency Actions */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-800 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Emergency Controls
          </CardTitle>
          <CardDescription className="text-red-600">
            Use these controls only in critical situations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button 
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={() => executeAction('emergency-stop', () => console.log('Emergency stop activated'))}
              disabled={executing === 'emergency-stop'}
            >
              {executing === 'emergency-stop' ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Stopping...
                </>
              ) : (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  Emergency Stop All
                </>
              )}
            </Button>
            <Button 
              variant="outline" 
              className="border-red-300 text-red-700 hover:bg-red-50"
              onClick={() => executeAction('full-reset', () => console.log('Full system reset initiated'))}
              disabled={executing === 'full-reset'}
            >
              {executing === 'full-reset' ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Resetting...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Full System Reset
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
