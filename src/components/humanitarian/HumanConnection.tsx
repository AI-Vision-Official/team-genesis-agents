
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Send, Phone, Globe, CheckCircle, AlertCircle } from 'lucide-react';
import type { AccessibilitySettings } from '@/types/humanitarian';

interface HumanConnectionProps {
  settings: AccessibilitySettings;
}

export const HumanConnection = ({ settings }: HumanConnectionProps) => {
  const [emergencyMessage, setEmergencyMessage] = useState('');
  const [recipients, setRecipients] = useState('');

  const channels = [
    { name: 'SMS', icon: '📱', status: 'active' },
    { name: 'Email', icon: '📧', status: 'active' },
    { name: 'Signal', icon: '🔐', status: 'backup' },
    { name: 'Telegram', icon: '✈️', status: 'backup' }
  ];

  const quickMessages = [
    { type: 'safety_check', text: 'Are you safe? Please respond if you can.', icon: '🛡️' },
    { type: 'shelter_info', text: 'Emergency shelter available at [location]. Food and water provided.', icon: '🏠' },
    { type: 'medical_help', text: 'Medical assistance needed? Reply with your location.', icon: '🏥' },
    { type: 'family_search', text: 'Looking for family member. Please share if you have information.', icon: '👨‍👩‍👧‍👦' }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-orange-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📞 Human Connection Engine
          </CardTitle>
          <CardDescription>
            Emergency communication and family reconnection support
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Emergency Messaging</CardTitle>
            <CardDescription>Send urgent communications across multiple channels</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="message">Emergency Message</Label>
              <textarea
                id="message"
                className="w-full p-3 border rounded-lg resize-none h-24"
                placeholder="Type your emergency message..."
                value={emergencyMessage}
                onChange={(e) => setEmergencyMessage(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="recipients">Recipients (phone/email)</Label>
              <Input
                id="recipients"
                placeholder="+1234567890, email@example.com"
                value={recipients}
                onChange={(e) => setRecipients(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Delivery Channels</Label>
              <div className="flex flex-wrap gap-2">
                {channels.map((channel) => (
                  <Badge
                    key={channel.name}
                    variant={channel.status === 'active' ? 'default' : 'outline'}
                    className="cursor-pointer"
                  >
                    {channel.icon} {channel.name}
                  </Badge>
                ))}
              </div>
            </div>
            
            <Button className="w-full bg-orange-600 hover:bg-orange-700">
              <Send className="w-4 h-4 mr-2" />
              Send Emergency Message
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Message Templates</CardTitle>
            <CardDescription>Pre-written messages for common emergency situations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickMessages.map((template) => (
              <div
                key={template.type}
                className="p-3 border rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                onClick={() => setEmergencyMessage(template.text)}
              >
                <div className="flex items-start gap-3">
                  <span className="text-lg">{template.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium capitalize">
                      {template.type.replace('_', ' ')}
                    </p>
                    <p className="text-xs text-slate-600 mt-1">
                      {template.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Message Delivery Status</CardTitle>
          <CardDescription>Track delivery success and retry failed messages</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium">Safety Check - Group 1</p>
                  <p className="text-sm text-green-600">Sent 5 minutes ago</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-green-700">24/25 delivered</p>
                <p className="text-xs text-green-600">96% success rate</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                <div>
                  <p className="font-medium">Shelter Information</p>
                  <p className="text-sm text-yellow-600">Sent 12 minutes ago</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-yellow-700">18/20 delivered</p>
                <Button size="sm" variant="outline">Retry Failed</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
