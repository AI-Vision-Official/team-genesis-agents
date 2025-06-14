
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Download, Zap } from 'lucide-react';
import type { RuleTemplate } from '@/types/ifttt';

interface RuleTemplatesProps {
  onUseTemplate: (template: RuleTemplate) => void;
}

export const RuleTemplates = ({ onUseTemplate }: RuleTemplatesProps) => {
  const templates: RuleTemplate[] = [
    {
      id: 'template_1',
      name: 'Social Media Crisis Response',
      description: 'Automatically detect negative mentions and alert team',
      category: 'social_media',
      popularity: 95,
      trigger: { type: 'social_media_mention', platform: 'twitter', event: 'negative_sentiment' },
      actions: [
        { type: 'send_notification', platform: 'slack', operation: 'alert_team' },
        { type: 'create_task', platform: 'system', operation: 'crisis_response' }
      ],
      tags: ['crisis', 'social media', 'alerts']
    },
    {
      id: 'template_2',
      name: 'Daily Report Generation',
      description: 'Generate and send daily performance reports',
      category: 'productivity',
      popularity: 88,
      trigger: { type: 'schedule', platform: 'system', event: 'daily_9am' },
      actions: [
        { type: 'generate_report', platform: 'analytics', operation: 'daily_summary' },
        { type: 'send_email', platform: 'email', operation: 'team_report' }
      ],
      tags: ['reports', 'daily', 'automation']
    },
    {
      id: 'template_3',
      name: 'New Task Assignment',
      description: 'Auto-assign tasks to available agents',
      category: 'productivity',
      popularity: 92,
      trigger: { type: 'task_completed', platform: 'system', event: 'agent_available' },
      actions: [
        { type: 'assign_agent', platform: 'system', operation: 'next_task' },
        { type: 'send_notification', platform: 'system', operation: 'task_assigned' }
      ],
      tags: ['tasks', 'agents', 'automation']
    },
    {
      id: 'template_4',
      name: 'Humanitarian Alert Response',
      description: 'Respond to crisis alerts with immediate action',
      category: 'humanitarian',
      popularity: 85,
      trigger: { type: 'crisis_alert', platform: 'humanitarian', event: 'new_crisis' },
      actions: [
        { type: 'create_task', platform: 'system', operation: 'crisis_response_team' },
        { type: 'post_social_media', platform: 'social', operation: 'awareness_campaign' },
        { type: 'send_email', platform: 'email', operation: 'volunteer_mobilization' }
      ],
      tags: ['humanitarian', 'crisis', 'response']
    },
    {
      id: 'template_5',
      name: 'Content Approval Workflow',
      description: 'Route content through approval process',
      category: 'marketing',
      popularity: 78,
      trigger: { type: 'user_action', platform: 'system', event: 'content_submitted' },
      actions: [
        { type: 'send_notification', platform: 'slack', operation: 'approval_request' },
        { type: 'create_task', platform: 'system', operation: 'content_review' }
      ],
      tags: ['content', 'approval', 'workflow']
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'productivity': return 'bg-blue-100 text-blue-800';
      case 'social_media': return 'bg-purple-100 text-purple-800';
      case 'marketing': return 'bg-green-100 text-green-800';
      case 'humanitarian': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Rule Templates</h3>
        <p className="text-muted-foreground">
          Start with proven automation templates and customize them for your needs
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <Card key={template.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-base mb-1">{template.name}</CardTitle>
                  <Badge className={getCategoryColor(template.category)}>
                    {template.category}
                  </Badge>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  {template.popularity}%
                </div>
              </div>
              <CardDescription>{template.description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium mb-1">Trigger:</p>
                  <div className="flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    <span className="text-sm text-muted-foreground">
                      {template.trigger.type}
                    </span>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-1">Actions:</p>
                  <div className="flex flex-wrap gap-1">
                    {template.actions.slice(0, 2).map((action, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {action.type}
                      </Badge>
                    ))}
                    {template.actions.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{template.actions.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-1">Tags:</p>
                  <div className="flex flex-wrap gap-1">
                    {template.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Button 
                  className="w-full" 
                  onClick={() => onUseTemplate(template)}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Use Template
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
