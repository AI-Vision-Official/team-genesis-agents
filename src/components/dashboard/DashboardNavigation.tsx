import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  Home, Monitor, Users, Bot, Share2, Target, Heart, Code, GraduationCap, 
  Palette, Megaphone, Lightbulb, Zap, GitBranch, Building, Settings, 
  CheckSquare, Activity, Bell, Play, FileText, Rocket, ChevronDown, 
  ChevronRight, Shield, Brain, BarChart3, Wrench, Wifi, Mic, 
  MessageSquare, UserCheck
} from 'lucide-react';

interface DashboardNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const DashboardNavigation = ({ activeTab, setActiveTab }: DashboardNavigationProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: Home, category: 'core' },
    { id: 'workstation', label: 'Workstation', icon: Monitor, category: 'core' },
    { id: 'offline', label: 'Offline Center', icon: Wifi, category: 'core' },
    { id: 'desktop', label: 'Desktop', icon: Monitor, category: 'core' },
    { id: 'collaboration', label: 'Collaboration', icon: Users, category: 'agent' },
    { id: 'voice', label: 'Voice Commands', icon: Mic, category: 'core' },
    { id: 'communication', label: 'Communication', icon: MessageSquare, category: 'agent' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, category: 'insights' },
    { id: 'designer', label: 'Agent Designer', icon: Wrench, category: 'agent' },
    { id: 'monitoring', label: 'Monitoring', icon: Activity, category: 'insights' },
    { id: 'insights', label: 'AI Insights', icon: Brain, category: 'insights' },
    { id: 'security', label: 'Security', icon: Shield, category: 'security' },
    { id: 'trust-screening', label: 'Trust & Identity Screening', icon: UserCheck, category: 'security' },
    { id: 'social', label: 'Social Media', icon: Share2, category: 'specialized' },
    { id: 'mission', label: 'Mission Control', icon: Target, category: 'specialized' },
    { id: 'humanitarian', label: 'Humanitarian', icon: Heart, category: 'specialized' },
    { id: 'web', label: 'Web Development', icon: Code, category: 'specialized' },
    { id: 'education', label: 'Education', icon: GraduationCap, category: 'specialized' },
    { id: 'creative', label: 'Creative', icon: Palette, category: 'specialized' },
    { id: 'marketing', label: 'Marketing AI', icon: Megaphone, category: 'specialized' },
    { id: 'invention', label: 'Invention', icon: Lightbulb, category: 'specialized' },
    { id: 'integrations', label: 'Integrations', icon: Zap, category: 'tools' },
    { id: 'ifttt', label: 'IFTTT', icon: GitBranch, category: 'tools' },
    { id: 'boardroom', label: 'Boardroom', icon: Building, category: 'tools' },
    { id: 'agents', label: 'Agent Framework', icon: Bot, category: 'agent' },
    { id: 'specialized', label: 'Specialized Agents', icon: Settings, category: 'agent' },
    { id: 'evaluation', label: 'Evaluation', icon: CheckSquare, category: 'insights' },
    { id: 'health', label: 'Agent Health', icon: Activity, category: 'insights' },
    { id: 'notifications', label: 'Notifications', icon: Bell, category: 'tools' },
    { id: 'actions', label: 'Quick Actions', icon: Play, category: 'tools' },
    { id: 'templates', label: 'Templates', icon: FileText, category: 'tools' },
    { id: 'innovation', label: 'Innovation', icon: Rocket, category: 'specialized' },
  ];

  const categories = [...new Set(navigationItems.map(item => item.category))];

  const groupedItems = categories.map(category => ({
    category,
    items: navigationItems.filter(item => item.category === category)
  }));

  const renderNavigationGroup = (category: string, items: any[]) => (
    <Collapsible key={category} className="w-full space-y-1">
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="w-full h-9 px-2 justify-between font-medium rounded-md hover:bg-secondary">
          {category.charAt(0).toUpperCase() + category.slice(1)}
          <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="pl-2 space-y-1">
        {items.map((item: any) => (
          <Button
            key={item.id}
            variant="ghost"
            className={`w-full h-9 px-3.5 justify-start font-normal hover:bg-secondary ${activeTab === item.id ? 'bg-secondary' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            {item.label}
          </Button>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );

  return (
    <div className="border-r border-gray-200 dark:border-gray-800 w-64 flex-shrink-0 pt-6 pb-8 flex flex-col">
      <div className="px-6 mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400">
          Navigation
        </h3>
        <Button variant="ghost" size="icon" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? <ChevronRight className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>
      <ScrollArea className="flex-1 px-6">
        <div className="space-y-4">
          {groupedItems.map(({ category, items }) => renderNavigationGroup(category, items))}
        </div>
      </ScrollArea>
      <div className="mt-auto px-6 pt-6">
        <Badge variant="secondary">v0.1.0</Badge>
      </div>
    </div>
  );
};
