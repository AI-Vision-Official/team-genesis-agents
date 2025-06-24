
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
  const navigationTabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'workstation', label: 'My Workstation', icon: '🏠' },
    { id: 'offline', label: 'Offline Mode', icon: '📴' },
    { id: 'desktop', label: 'Desktop Apps', icon: '💻' },
    { id: 'health', label: 'System Health', icon: '💗' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'actions', label: 'Quick Actions', icon: '⚡' },
    { id: 'collaboration', label: 'Agent Collaboration', icon: '👥' },
    { id: 'voice', label: 'Voice Control', icon: '🎤' },
    { id: 'communication', label: 'Communication', icon: '💬' },
    { id: 'analytics', label: 'Advanced Analytics', icon: '📈' },
    { id: 'designer', label: 'Agent Designer', icon: '🎨' },
    { id: 'monitoring', label: 'Real-Time Monitor', icon: '📡' },
    { id: 'insights', label: 'AI Insights', icon: '🧠' },
    { id: 'security', label: 'Security Center', icon: '🔒' },
    { id: 'trust-screening', label: 'Trust & Identity Screening', icon: '🔒' },
    { id: 'social', label: 'Social Media', icon: '📱' },
    { id: 'mission', label: 'Mission Control', icon: '🎯' },
    { id: 'humanitarian', label: 'Humanitarian', icon: '🌍' },
    { id: 'web', label: 'Web Development', icon: '🌐' },
    { id: 'education', label: 'Education', icon: '🎓' },
    { id: 'templates', label: 'Template Toolkit', icon: '🧾' },
    { id: 'innovation', label: 'Innovation Hub', icon: '🔬' },
    { id: 'marketing', label: 'Marketing AI', icon: '📢' },
    { id: 'invention', label: 'Invention Hub', icon: '💡' },
    { id: 'integrations', label: 'Integrations', icon: '🔗' },
    { id: 'ifttt', label: 'IFTTT Automation', icon: '🔄' },
    { id: 'boardroom', label: 'Boardroom', icon: '👔' },
    { id: 'agents', label: 'Agent Framework', icon: '🤖' },
    { id: 'specialized', label: 'Specialized Agents', icon: '🛡️' },
    { id: 'evaluation', label: 'Evaluation', icon: '📋' },
    { id: 'creative', label: 'Creative Studio', icon: '🎨' },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-2 mb-6 border border-slate-200 dark:border-slate-700">
      <div className="flex flex-wrap gap-1">
        {navigationTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
              ${activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-md transform scale-105'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
              }
            `}
          >
            <span className="text-base">{tab.icon}</span>
            <span className="hidden sm:inline whitespace-nowrap">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
