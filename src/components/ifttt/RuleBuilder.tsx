
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Plus, 
  Trash2, 
  Save, 
  X, 
  Zap, 
  Settings,
  Clock,
  Filter
} from 'lucide-react';
import type { IFTTTRule, Platform, Trigger, Action, Condition } from '@/types/ifttt';

interface RuleBuilderProps {
  rule?: IFTTTRule | null;
  platforms: Platform[];
  onSave: (rule: IFTTTRule) => void;
  onCancel: () => void;
}

export const RuleBuilder = ({ rule, platforms, onSave, onCancel }: RuleBuilderProps) => {
  const [ruleName, setRuleName] = useState(rule?.name || '');
  const [ruleDescription, setRuleDescription] = useState(rule?.description || '');
  const [enabled, setEnabled] = useState(rule?.enabled ?? true);
  const [priority, setPriority] = useState(rule?.priority || 'medium');
  const [category, setCategory] = useState(rule?.category || 'productivity');
  
  const [trigger, setTrigger] = useState<Trigger>(rule?.trigger || {
    id: '',
    type: 'webhook',
    platform: '',
    event: '',
    parameters: {}
  });
  
  const [conditions, setConditions] = useState<Condition[]>(rule?.conditions || []);
  const [actions, setActions] = useState<Action[]>(rule?.actions || []);

  const handleSave = () => {
    const newRule: IFTTTRule = {
      id: rule?.id || `rule_${Date.now()}`,
      name: ruleName,
      description: ruleDescription,
      enabled,
      createdBy: 'current_user',
      createdAt: rule?.createdAt || new Date(),
      triggerCount: rule?.triggerCount || 0,
      trigger,
      conditions,
      actions,
      priority: priority as any,
      category: category as any
    };
    
    onSave(newRule);
  };

  const addCondition = () => {
    setConditions([...conditions, {
      id: `condition_${Date.now()}`,
      field: '',
      operator: 'equals',
      value: '',
      logicalOperator: 'AND'
    }]);
  };

  const addAction = () => {
    setActions([...actions, {
      id: `action_${Date.now()}`,
      type: 'send_email',
      platform: '',
      operation: '',
      parameters: {}
    }]);
  };

  const removeCondition = (id: string) => {
    setConditions(conditions.filter(c => c.id !== id));
  };

  const removeAction = (id: string) => {
    setActions(actions.filter(a => a.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">
          {rule ? 'Edit Rule' : 'Create New Rule'}
        </h3>
        <Button variant="ghost" onClick={onCancel}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="ruleName">Rule Name</Label>
              <Input
                id="ruleName"
                value={ruleName}
                onChange={(e) => setRuleName(e.target.value)}
                placeholder="Enter rule name"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch checked={enabled} onCheckedChange={setEnabled} />
              <Label>Enabled</Label>
            </div>
          </div>
          
          <div>
            <Label htmlFor="ruleDescription">Description</Label>
            <Textarea
              id="ruleDescription"
              value={ruleDescription}
              onChange={(e) => setRuleDescription(e.target.value)}
              placeholder="Describe what this rule does"
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Priority</Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="productivity">Productivity</SelectItem>
                  <SelectItem value="social_media">Social Media</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="humanitarian">Humanitarian</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trigger Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Trigger Configuration
          </CardTitle>
          <CardDescription>Define what starts this automation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Trigger Type</Label>
              <Select 
                value={trigger.type} 
                onValueChange={(value) => setTrigger({...trigger, type: value as any})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="webhook">Webhook</SelectItem>
                  <SelectItem value="schedule">Schedule</SelectItem>
                  <SelectItem value="email_received">Email Received</SelectItem>
                  <SelectItem value="social_media_mention">Social Media Mention</SelectItem>
                  <SelectItem value="task_completed">Task Completed</SelectItem>
                  <SelectItem value="agent_status_change">Agent Status Change</SelectItem>
                  <SelectItem value="crisis_alert">Crisis Alert</SelectItem>
                  <SelectItem value="performance_threshold">Performance Threshold</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Platform</Label>
              <Select 
                value={trigger.platform} 
                onValueChange={(value) => setTrigger({...trigger, platform: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  {platforms.map(platform => (
                    <SelectItem key={platform.id} value={platform.id}>
                      {platform.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Event</Label>
              <Input
                value={trigger.event}
                onChange={(e) => setTrigger({...trigger, event: e.target.value})}
                placeholder="Event name"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Conditions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Conditions
          </CardTitle>
          <CardDescription>Add conditions to filter when this rule runs</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {conditions.map((condition, index) => (
            <div key={condition.id} className="flex gap-2 items-end">
              <div className="flex-1">
                <Label>Field</Label>
                <Input
                  value={condition.field}
                  onChange={(e) => {
                    const newConditions = [...conditions];
                    newConditions[index].field = e.target.value;
                    setConditions(newConditions);
                  }}
                  placeholder="Field name"
                />
              </div>
              <div className="flex-1">
                <Label>Operator</Label>
                <Select 
                  value={condition.operator}
                  onValueChange={(value) => {
                    const newConditions = [...conditions];
                    newConditions[index].operator = value as any;
                    setConditions(newConditions);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="equals">Equals</SelectItem>
                    <SelectItem value="not_equals">Not Equals</SelectItem>
                    <SelectItem value="greater_than">Greater Than</SelectItem>
                    <SelectItem value="less_than">Less Than</SelectItem>
                    <SelectItem value="contains">Contains</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Label>Value</Label>
                <Input
                  value={condition.value}
                  onChange={(e) => {
                    const newConditions = [...conditions];
                    newConditions[index].value = e.target.value;
                    setConditions(newConditions);
                  }}
                  placeholder="Value"
                />
              </div>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => removeCondition(condition.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
          <Button variant="outline" onClick={addCondition}>
            <Plus className="w-4 h-4 mr-2" />
            Add Condition
          </Button>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Actions
          </CardTitle>
          <CardDescription>Define what happens when this rule is triggered</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {actions.map((action, index) => (
            <div key={action.id} className="flex gap-2 items-end">
              <div className="flex-1">
                <Label>Action Type</Label>
                <Select 
                  value={action.type}
                  onValueChange={(value) => {
                    const newActions = [...actions];
                    newActions[index].type = value as any;
                    setActions(newActions);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="send_email">Send Email</SelectItem>
                    <SelectItem value="send_sms">Send SMS</SelectItem>
                    <SelectItem value="post_social_media">Post Social Media</SelectItem>
                    <SelectItem value="create_task">Create Task</SelectItem>
                    <SelectItem value="assign_agent">Assign Agent</SelectItem>
                    <SelectItem value="send_notification">Send Notification</SelectItem>
                    <SelectItem value="generate_report">Generate Report</SelectItem>
                    <SelectItem value="trigger_api">Trigger API</SelectItem>
                    <SelectItem value="custom_script">Custom Script</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Label>Platform</Label>
                <Select 
                  value={action.platform}
                  onValueChange={(value) => {
                    const newActions = [...actions];
                    newActions[index].platform = value;
                    setActions(newActions);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    {platforms.map(platform => (
                      <SelectItem key={platform.id} value={platform.id}>
                        {platform.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Label>Operation</Label>
                <Input
                  value={action.operation}
                  onChange={(e) => {
                    const newActions = [...actions];
                    newActions[index].operation = e.target.value;
                    setActions(newActions);
                  }}
                  placeholder="Operation name"
                />
              </div>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => removeAction(action.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
          <Button variant="outline" onClick={addAction}>
            <Plus className="w-4 h-4 mr-2" />
            Add Action
          </Button>
        </CardContent>
      </Card>

      {/* Save/Cancel */}
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave} className="bg-gradient-to-r from-purple-600 to-blue-600">
          <Save className="w-4 h-4 mr-2" />
          Save Rule
        </Button>
      </div>
    </div>
  );
};
