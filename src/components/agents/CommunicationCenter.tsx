
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  MessageSquare, 
  Mail, 
  Smartphone, 
  Shield, 
  Globe,
  Send,
  Filter,
  Search,
  Clock
} from 'lucide-react';
import type { Agent, CommunicationEntry } from '@/types/agentFramework';

interface CommunicationCenterProps {
  agents: Agent[];
}

export const CommunicationCenter = ({ agents }: CommunicationCenterProps) => {
  const [selectedAgent, setSelectedAgent] = useState<string>('');
  const [messageContent, setMessageContent] = useState('');
  const [selectedChannel, setSelectedChannel] = useState('internal');
  const [securityLevel, setSecurityLevel] = useState('internal');

  // Mock communication data
  const mockCommunications: CommunicationEntry[] = [
    {
      id: 'comm-1',
      fromAgentId: 'agent-1',
      toAgentId: 'agent-2',
      channel: 'internal',
      message: 'Task delegation: Please review the security protocols for the new deployment.',
      timestamp: new Date(),
      securityLevel: 'confidential',
      urgent: false,
      read: true
    },
    {
      id: 'comm-2',
      fromAgentId: 'agent-2',
      toAgentId: 'agent-1',
      channel: 'email',
      message: 'Security audit completed. 3 minor issues identified and resolved.',
      timestamp: new Date(Date.now() - 3600000),
      securityLevel: 'internal',
      urgent: false,
      read: true
    }
  ];

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'email': return <Mail className="w-4 h-4" />;
      case 'sms': return <Smartphone className="w-4 h-4" />;
      case 'internal': return <MessageSquare className="w-4 h-4" />;
      case 'secure_encrypted': return <Shield className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getSecurityColor = (level: string) => {
    switch (level) {
      case 'public': return 'bg-green-100 text-green-800';
      case 'internal': return 'bg-blue-100 text-blue-800';
      case 'confidential': return 'bg-orange-100 text-orange-800';
      case 'restricted': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAgentName = (agentId: string) => {
    const agent = agents.find(a => a.id === agentId);
    return agent?.name || 'Unknown Agent';
  };

  const handleSendMessage = () => {
    if (!selectedAgent || !messageContent.trim()) return;
    
    console.log('Sending message:', {
      to: selectedAgent,
      content: messageContent,
      channel: selectedChannel,
      security: securityLevel
    });

    setMessageContent('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Communication Center</h2>
          <p className="text-slate-600">Multi-channel communication hub for agent coordination</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Communication Channels */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Available Channels
            </CardTitle>
            <CardDescription>Global communication channels configured</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-green-600" />
                <span className="font-medium">Internal Messaging</span>
              </div>
              <Badge className="bg-green-100 text-green-800">Active</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-600" />
                <span className="font-medium">Email Gateway</span>
              </div>
              <Badge className="bg-blue-100 text-blue-800">Active</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-purple-600" />
                <span className="font-medium">SMS/WhatsApp</span>
              </div>
              <Badge className="bg-purple-100 text-purple-800">Active</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-red-600" />
                <span className="font-medium">Encrypted Channel</span>
              </div>
              <Badge className="bg-red-100 text-red-800">Secured</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Message Composer */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="w-5 h-5" />
              Send Message
            </CardTitle>
            <CardDescription>Compose and send messages to agents</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Recipient Agent</label>
                <Select value={selectedAgent} onValueChange={setSelectedAgent}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select agent" />
                  </SelectTrigger>
                  <SelectContent>
                    {agents.map((agent) => (
                      <SelectItem key={agent.id} value={agent.id}>
                        {agent.name} ({agent.role.name})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Channel</label>
                <Select value={selectedChannel} onValueChange={setSelectedChannel}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="internal">Internal Messaging</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="secure_encrypted">Encrypted Channel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Security Level</label>
              <Select value={securityLevel} onValueChange={setSecurityLevel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="internal">Internal</SelectItem>
                  <SelectItem value="confidential">Confidential</SelectItem>
                  <SelectItem value="restricted">Restricted</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Message</label>
              <Textarea
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                placeholder="Type your message..."
                rows={4}
              />
            </div>

            <Button 
              onClick={handleSendMessage}
              disabled={!selectedAgent || !messageContent.trim()}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
            >
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Communications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Recent Communications
          </CardTitle>
          <CardDescription>Latest inter-agent communications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockCommunications.map((comm) => (
              <div key={comm.id} className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-2 text-slate-600">
                  {getChannelIcon(comm.channel)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{getAgentName(comm.fromAgentId)}</span>
                    <span className="text-slate-500">→</span>
                    <span className="font-medium">{getAgentName(comm.toAgentId)}</span>
                    <Badge className={getSecurityColor(comm.securityLevel)}>
                      {comm.securityLevel}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-700 mb-2">{comm.message}</p>
                  <span className="text-xs text-slate-500">
                    {comm.timestamp.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
