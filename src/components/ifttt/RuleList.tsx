
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Play, 
  Pause, 
  Edit, 
  Trash2, 
  MoreVertical,
  Clock,
  Zap
} from 'lucide-react';
import type { IFTTTRule } from '@/types/ifttt';

interface RuleListProps {
  rules: IFTTTRule[];
  onRuleSelect: (rule: IFTTTRule) => void;
  onEditRule: (rule: IFTTTRule) => void;
}

export const RuleList = ({ rules, onRuleSelect, onEditRule }: RuleListProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'productivity': return 'bg-blue-100 text-blue-800';
      case 'social_media': return 'bg-purple-100 text-purple-800';
      case 'marketing': return 'bg-green-100 text-green-800';
      case 'humanitarian': return 'bg-red-100 text-red-800';
      case 'system': return 'bg-gray-100 text-gray-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Automation Rules</h3>
        <div className="text-sm text-muted-foreground">
          {rules.length} total rules
        </div>
      </div>

      <div className="grid gap-4">
        {rules.map((rule) => (
          <Card 
            key={rule.id} 
            className={`cursor-pointer transition-colors ${
              rule.enabled ? 'border-green-200' : 'border-gray-200'
            }`}
            onClick={() => onRuleSelect(rule)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${getPriorityColor(rule.priority)}`} />
                  <CardTitle className="text-lg">{rule.name}</CardTitle>
                  <Badge className={getCategoryColor(rule.category)}>
                    {rule.category}
                  </Badge>
                  {rule.enabled ? (
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      Active
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-gray-600">
                      Paused
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={rule.enabled} />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditRule(rule);
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <CardDescription>{rule.description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Zap className="w-4 h-4" />
                    <span>Trigger: {rule.trigger.type}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>Executed {rule.triggerCount} times</span>
                  </div>
                </div>
                <div>
                  {rule.lastTriggered && (
                    <span>Last: {rule.lastTriggered.toLocaleDateString()}</span>
                  )}
                </div>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-sm font-medium">Actions:</span>
                {rule.actions.slice(0, 3).map((action, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {action.type}
                  </Badge>
                ))}
                {rule.actions.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{rule.actions.length - 3} more
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
