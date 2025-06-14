
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Bell, 
  BellOff, 
  AlertTriangle, 
  Info, 
  CheckCircle, 
  X,
  Settings,
  Filter,
  Brain,
  Clock
} from 'lucide-react';

interface SmartNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  priority: 'low' | 'medium' | 'high' | 'critical';
  source: string;
  timestamp: Date;
  read: boolean;
  actionRequired: boolean;
  smartScore: number; // AI-determined importance score
  category: 'system' | 'agent' | 'mission' | 'security' | 'performance';
  autoRouted: boolean;
}

interface NotificationSettings {
  enabled: boolean;
  smartFiltering: boolean;
  criticalOnly: boolean;
  quietHours: boolean;
  autoAcknowledge: boolean;
  soundEnabled: boolean;
  desktopNotifications: boolean;
  minimumPriority: 'low' | 'medium' | 'high' | 'critical';
}

export const SmartNotificationSystem = () => {
  const [notifications, setNotifications] = useState<SmartNotification[]>([]);
  const [settings, setSettings] = useState<NotificationSettings>({
    enabled: true,
    smartFiltering: true,
    criticalOnly: false,
    quietHours: false,
    autoAcknowledge: false,
    soundEnabled: true,
    desktopNotifications: true,
    minimumPriority: 'medium'
  });
  const [filter, setFilter] = useState<'all' | 'unread' | 'critical' | 'today'>('unread');

  useEffect(() => {
    // Initialize with mock notifications
    const mockNotifications: SmartNotification[] = [
      {
        id: '1',
        title: 'Agent Performance Alert',
        message: 'DataAnalyst-Beta showing elevated memory usage (82%)',
        type: 'warning',
        priority: 'medium',
        source: 'Health Monitor',
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
        read: false,
        actionRequired: true,
        smartScore: 0.75,
        category: 'performance',
        autoRouted: true
      },
      {
        id: '2',
        title: 'Mission Completion',
        message: 'Market Analysis Mission completed successfully',
        type: 'success',
        priority: 'low',
        source: 'Mission Control',
        timestamp: new Date(Date.now() - 1000 * 60 * 15),
        read: false,
        actionRequired: false,
        smartScore: 0.45,
        category: 'mission',
        autoRouted: false
      },
      {
        id: '3',
        title: 'Critical System Alert',
        message: 'MissionControl-Delta agent unresponsive for 2 minutes',
        type: 'error',
        priority: 'critical',
        source: 'System Monitor',
        timestamp: new Date(Date.now() - 1000 * 60 * 2),
        read: false,
        actionRequired: true,
        smartScore: 0.95,
        category: 'system',
        autoRouted: true
      },
      {
        id: '4',
        title: 'Security Scan Complete',
        message: 'Weekly security audit completed - no issues found',
        type: 'info',
        priority: 'low',
        source: 'Security Center',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        read: true,
        actionRequired: false,
        smartScore: 0.30,
        category: 'security',
        autoRouted: false
      }
    ];

    setNotifications(mockNotifications);

    // Simulate real-time notifications
    const interval = setInterval(() => {
      if (Math.random() > 0.8) { // 20% chance every 10 seconds
        const newNotification: SmartNotification = {
          id: Date.now().toString(),
          title: 'New Activity Detected',
          message: `Agent ${Math.random() > 0.5 ? 'Social' : 'Creative'}-${String.fromCharCode(65 + Math.floor(Math.random() * 26))} completed task`,
          type: Math.random() > 0.7 ? 'warning' : 'info',
          priority: Math.random() > 0.8 ? 'high' : 'medium',
          source: 'Real-time Monitor',
          timestamp: new Date(),
          read: false,
          actionRequired: Math.random() > 0.7,
          smartScore: Math.random(),
          category: 'agent',
          autoRouted: true
        };
        
        setNotifications(prev => [newNotification, ...prev].slice(0, 50)); // Keep last 50
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'success': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'info': return <Info className="w-4 h-4 text-blue-600" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread' && notification.read) return false;
    if (filter === 'critical' && notification.priority !== 'critical') return false;
    if (filter === 'today') {
      const today = new Date();
      const notificationDate = new Date(notification.timestamp);
      return notificationDate.toDateString() === today.toDateString();
    }
    return true;
  });

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const criticalCount = notifications.filter(n => n.priority === 'critical' && !n.read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Bell className="w-6 h-6 text-blue-600" />
            Smart Notifications
            {unreadCount > 0 && (
              <Badge className="bg-red-500 text-white ml-2">
                {unreadCount}
              </Badge>
            )}
          </h2>
          <p className="text-slate-600 mt-1">
            AI-powered notification filtering and intelligent routing
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={markAllAsRead}>
            Mark All Read
          </Button>
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700">Total Unread</p>
                <p className="text-2xl font-bold text-blue-900">{unreadCount}</p>
              </div>
              <Bell className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-700">Critical</p>
                <p className="text-2xl font-bold text-red-900">{criticalCount}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700">AI Filtered</p>
                <p className="text-2xl font-bold text-purple-900">
                  {notifications.filter(n => n.autoRouted).length}
                </p>
              </div>
              <Brain className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700">Action Required</p>
                <p className="text-2xl font-bold text-green-900">
                  {notifications.filter(n => n.actionRequired && !n.read).length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Controls */}
      <div className="flex gap-2">
        <Button 
          variant={filter === 'all' ? 'default' : 'outline'}
          onClick={() => setFilter('all')}
        >
          All
        </Button>
        <Button 
          variant={filter === 'unread' ? 'default' : 'outline'}
          onClick={() => setFilter('unread')}
        >
          Unread ({unreadCount})
        </Button>
        <Button 
          variant={filter === 'critical' ? 'default' : 'outline'}
          onClick={() => setFilter('critical')}
        >
          Critical
        </Button>
        <Button 
          variant={filter === 'today' ? 'default' : 'outline'}
          onClick={() => setFilter('today')}
        >
          Today
        </Button>
      </div>

      {/* Notifications List */}
      <div className="space-y-2">
        {filteredNotifications.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <BellOff className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-600 mb-2">No notifications</h3>
              <p className="text-slate-500">You're all caught up! No notifications match your current filter.</p>
            </CardContent>
          </Card>
        ) : (
          filteredNotifications.map((notification) => (
            <Card 
              key={notification.id} 
              className={`border-l-4 ${
                notification.priority === 'critical' ? 'border-l-red-500 bg-red-50' :
                notification.priority === 'high' ? 'border-l-orange-500 bg-orange-50' :
                notification.priority === 'medium' ? 'border-l-yellow-500 bg-yellow-50' :
                'border-l-blue-500 bg-blue-50'
              } ${!notification.read ? 'ring-2 ring-blue-200' : ''}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getIcon(notification.type)}
                      <h4 className={`font-medium ${!notification.read ? 'font-bold' : ''}`}>
                        {notification.title}
                      </h4>
                      <Badge className={getPriorityColor(notification.priority)}>
                        {notification.priority}
                      </Badge>
                      {notification.autoRouted && (
                        <Badge variant="outline" className="text-purple-600 border-purple-600">
                          AI Filtered
                        </Badge>
                      )}
                      {notification.actionRequired && (
                        <Badge variant="outline" className="text-orange-600 border-orange-600">
                          Action Required
                        </Badge>
                      )}
                    </div>
                    <p className="text-slate-700 mb-2">{notification.message}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {notification.timestamp.toLocaleTimeString()}
                      </span>
                      <span>Source: {notification.source}</span>
                      <span>Smart Score: {Math.round(notification.smartScore * 100)}%</span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    {!notification.read && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => markAsRead(notification.id)}
                      >
                        Mark Read
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
          ))
        )}
      </div>
    </div>
  );
};
