
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Zap, 
  Plus, 
  Play, 
  Pause, 
  Settings, 
  BarChart3,
  Clock,
  CheckCircle,
  AlertTriangle,
  Filter
} from 'lucide-react';
import { RuleBuilder } from './RuleBuilder';
import { RuleList } from './RuleList';
import { PlatformConnections } from './PlatformConnections';
import { ExecutionHistory } from './ExecutionHistory';
import { RuleTemplates } from './RuleTemplates';
import { IFTTTDashboard } from './IFTTTDashboard';
import type { IFTTTRule, Platform, ExecutionLog, IFTTTStats } from '@/types/ifttt';

interface IFTTTCenterProps {
  rules: IFTTTRule[];
  platforms: Platform[];
  executionLogs: ExecutionLog[];
  stats: IFTTTStats;
}

export const IFTTTCenter = ({ rules, platforms, executionLogs, stats }: IFTTTCenterProps) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedRule, setSelectedRule] = useState<IFTTTRule | null>(null);
  const [showRuleBuilder, setShowRuleBuilder] = useState(false);

  const activeRules = rules.filter(rule => rule.enabled);
  const connectedPlatforms = platforms.filter(platform => platform.connected);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            IFTTT Automation Center
          </h2>
          <p className="text-muted-foreground">
            Create powerful automation workflows for your team
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setShowRuleBuilder(true)} className="bg-gradient-to-r from-purple-600 to-blue-600">
            <Plus className="w-4 h-4 mr-2" />
            Create Rule
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">Active Rules</p>
                <p className="text-2xl font-bold">{activeRules.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Connected Platforms</p>
                <p className="text-2xl font-bold">{connectedPlatforms.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold">{stats.successRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Executions Today</p>
                <p className="text-2xl font-bold">{stats.totalExecutions}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="rules">Rules</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="platforms">Platforms</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="builder">Builder</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <IFTTTDashboard 
            stats={stats}
            recentExecutions={executionLogs.slice(0, 10)}
            activeRules={activeRules}
          />
        </TabsContent>

        <TabsContent value="rules">
          <RuleList 
            rules={rules}
            onRuleSelect={setSelectedRule}
            onEditRule={(rule) => {
              setSelectedRule(rule);
              setShowRuleBuilder(true);
            }}
          />
        </TabsContent>

        <TabsContent value="templates">
          <RuleTemplates onUseTemplate={(template) => {
            setShowRuleBuilder(true);
          }} />
        </TabsContent>

        <TabsContent value="platforms">
          <PlatformConnections platforms={platforms} />
        </TabsContent>

        <TabsContent value="history">
          <ExecutionHistory logs={executionLogs} />
        </TabsContent>

        <TabsContent value="builder">
          <RuleBuilder 
            rule={selectedRule}
            platforms={platforms}
            onSave={() => {
              setShowRuleBuilder(false);
              setSelectedRule(null);
            }}
            onCancel={() => {
              setShowRuleBuilder(false);
              setSelectedRule(null);
            }}
          />
        </TabsContent>
      </Tabs>

      {/* Rule Builder Modal */}
      {showRuleBuilder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <RuleBuilder 
              rule={selectedRule}
              platforms={platforms}
              onSave={() => {
                setShowRuleBuilder(false);
                setSelectedRule(null);
              }}
              onCancel={() => {
                setShowRuleBuilder(false);
                setSelectedRule(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
