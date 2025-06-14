
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Globe } from 'lucide-react';

export const WebhookManager = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="w-5 h-5" />
          Webhook Manager
        </CardTitle>
        <CardDescription>
          Configure webhooks for real-time integrations and notifications
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="webhook-name">Webhook Name</Label>
              <Input id="webhook-name" placeholder="e.g., GitHub Deploy Hook" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="webhook-url">Webhook URL</Label>
              <Input id="webhook-url" placeholder="https://your-service.com/webhook" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="events">Trigger Events</Label>
            <Input id="events" placeholder="e.g., user.signup, task.completed" />
          </div>
          <Button>Create Webhook</Button>
        </div>
      </CardContent>
    </Card>
  );
};
