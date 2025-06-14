
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bell, 
  BellOff, 
  AlertTriangle, 
  Info, 
  CheckCircle, 
  X, 
  Filter,
  Settings,
  MessageSquare,
  Zap
} from 'lucide-react';

interface SmartNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success' | 'urgent';
  priority: 'low' | 'medium' | 'high' | 'critical';
  source: string;
  timestamp: Date;
  read: boolean;
  actionRequired: boolean;
  category: 'agent_health' | 'mission_update' | 'security' | 'user_feedback' | 'system';
  autoActions?: string[];
}

interface NotificationSettings {
  enablePush: boolean;
  enableEmail: boolean;
  enableSound: boolean;
  quietHours: boolean;
  minPriority: 'low' | 'medium' | 'high' | 'critical';
  categories: {
    agent_health: boolean;
    mission_update: boolean;
    security: boolean;
    user_feedback: boolean;
    system: boolean;
  };
}

export const SmartNotificationSystem = () => {
  const [notifications, setNotifications] = useState<SmartNotification[]>([]);
  const [settings, setSettings] = useState<NotificationSettings>({
    enablePush: true,
    enableEmail: false,
    enableSound: true,
    quietHours: false,
    minPriority: 'medium',
    categories: {
      agent_health: true,
      mission_update: true,
      security: true,
      user_feedback: false,
      system: true
    }
  });
  const [filter, setFilter] = useState<'all' | 'unread' | 'critical'>('unread');

  useEffect(() => {
    loadNotifications();
    const interval = setInterval(loadNotifications, 10000); // Check every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const loadNotifications = () => {
    // Mock smart notifications - replace with actual notification system
    const mockNotifications: SmartNotification[] = [
      {
        id: '1',
        title: 'Critical Agent Failure',
        message: 'MissionControl-Delta agent is experiencing high CPU usage and degraded performance',
        type: 'error',
        priority: 'critical',
        source: 'Agent Health Monitor',
        timestamp: new Date(Date.now() - 300000),
        read: false,
        actionRequired: true,
        category: 'agent_health',
        autoActions: ['Restart agent', 'Scale resources', 'Activate backup']
      },
      {
        id: '2',
        title: 'New Mission Completed',
        message: 'Market analysis mission completed successfully with 94% confidence score',
        type: 'success',
        priority: 'medium',
        source: 'Mission Control',
        timestamp: new Date(Date.now() - 900000),
        read: false,
        actionRequired: false,
        category: 'mission_update'
      },
      {
        id: '3',
        title: 'Security Scan Alert',
        message: 'Unusual access pattern detected on humanitarian data endpoint',
        type: 'warning',
        priority: 'high',
        source: 'Security Monitor',
        timestamp: new Date(Date.now() - 1800000),
        read: true,
        actionRequired: true,
        category: 'security',
        autoActions: ['Block suspicious IPs', 'Enable enhanced monitoring']
      },
      {
        id: '4',
        title: 'User Feedback Threshold',
        message: 'Positive feedback for social media campaigns reached 95% satisfaction',
        type: 'info',
        priority: 'low',
        source: 'Feedback System',
        timestamp: new Date(Date.now() - 3600000),
        read: true,
        actionRequired: false,
        category: 'user_feedback'
      }
    ];
    
    setNotifications(mockNotifications);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'error': return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'success': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'urgent': return <Zap className="w-5 h-5 text-purple-600" />;
      default: return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => notif.id === id ? { ...notif, read: true } : notif)
    );
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread' && notif.read) return false;
    if (filter === 'critical' && notif.priority !== 'critical') return false;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;
  const criticalCount = notifications.filter(n => n.priority === 'critical' && !n.read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Bell className="w-6 h-6 text-blue-600" />
            {unreadCount > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-[1.2rem] h-5 flex items-center justify-center rounded-full">
                {unreadCount}
              </Badge>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold">Smart Notifications</h2>
            <p className="text-slate-600">Intelligent alert management and routing</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={markAllAsRead} variant="outline" disabled={unreadCount === 0}>
            Mark All Read
          </Button>
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Critical Alerts Banner */}
      {criticalCount > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-red-600" />
              <div className="flex-1">
                <h3 className="font-medium text-red-900">Critical Alerts Require Immediate Attention</h3>
                <p className="text-sm text-red-700">{criticalCount} critical notification{criticalCount > 1 ? 's' : ''} pending</p>
              </div>
              <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                View Critical
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="notifications" className="space-y-4">
        <TabsList>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-4">
          {/* Filter Controls */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              <Label>Filter:</Label>
            </div>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant={filter === 'all' ? 'default' : 'outline'}
                onClick={() => setFilter('all')}
              >
                All ({notifications.length})
              </Button>
              <Button 
                size="sm" 
                variant={filter === 'unread' ? 'default' : 'outline'}
                onClick={() => setFilter('unread')}
              >
                Unread ({unreadCount})
              </Button>
              <Button 
                size="sm" 
                variant={filter === 'critical' ? 'default' : 'outline'}
                onClick={() => setFilter('critical')}
              >
                Critical ({criticalCount})
              </Button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="space-y-3">
            {filteredNotifications.map((notification) => (
              <Card key={notification.id} className={`border-l-4 ${
                notification.priority === 'critical' ? 'border-l-red-500' :
                notification.priority === 'high' ? 'border-l-orange-500' :
                notification.priority === 'medium' ? 'border-l-yellow-500' : 'border-l-green-500'
              } ${!notification.read ? 'bg-blue-50' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      {getNotificationIcon(notification.type)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{notification.title}</h4>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full" />
                          )}
                        </div>
                        <p className="text-sm text-slate-600 mb-2">{notification.message}</p>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getPriorityColor(notification.priority)}>
                            {notification.priority}
                          </Badge>
                          <Badge variant="outline">{notification.category.replace('_', ' ')}</Badge>
                          <span className="text-xs text-slate-500">{notification.source}</span>
                          <span className="text-xs text-slate-500">
                            {notification.timestamp.toLocaleString()}
                          </span>
                        </div>
                        {notification.autoActions && notification.autoActions.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {notification.autoActions.map((action, index) => (
                              <Button key={index} size="sm" variant="outline" className="text-xs">
                                {action}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-1 ml-4">
                      {!notification.read && (
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                      )}
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => dismissNotification(notification.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {filteredNotifications.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <BellOff className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-600 mb-2">No notifications</h3>
                  <p className="text-slate-500">You're all caught up!</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Configure how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="push">Push Notifications</Label>
                  <Switch 
                    id="push"
                    checked={settings.enablePush}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, enablePush: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="email">Email Notifications</Label>
                  <Switch 
                    id="email"
                    checked={settings.enableEmail}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, enableEmail: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="sound">Sound Alerts</Label>
                  <Switch 
                    id="sound"
                    checked={settings.enableSound}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, enableSound: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="quiet">Quiet Hours (10 PM - 8 AM)</Label>
                  <Switch 
                    id="quiet"
                    checked={settings.quietHours}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, quietHours: checked }))}
                  />
                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="font-medium mb-4">Category Filters</h4>
                <div className="space-y-3">
                  {Object.entries(settings.categories).map(([category, enabled]) => (
                    <div key={category} className="flex items-center justify-between">
                      <Label htmlFor={category}>{category.replace('_', ' ').toUpperCase()}</Label>
                      <Switch 
                        id={category}
                        checked={enabled}
                        onCheckedChange={(checked) => 
                          setSettings(prev => ({ 
                            ...prev, 
                            categories: { ...prev.categories, [category]: checked }
                          }))
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
