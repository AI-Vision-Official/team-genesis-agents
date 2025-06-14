
import { Button } from '@/components/ui/button';
import { Bot, Users, Zap, Activity, Eye, Brain, Megaphone } from 'lucide-react';

interface DashboardNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const DashboardNavigation = ({ activeTab, setActiveTab }: DashboardNavigationProps) => {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'mission-control', label: 'Mission Control', icon: Brain },
    { id: 'agents', label: 'Agents', icon: Bot },
    { id: 'teams', label: 'Teams', icon: Users },
    { id: 'tasks', label: 'Tasks', icon: Zap },
    { id: 'marketing', label: 'Marketing AI', icon: Megaphone },
    { id: 'evaluation', label: 'Evaluation', icon: Eye }
  ];

  return (
    <div className="flex gap-2 mb-8">
      {tabs.map(({ id, label, icon: Icon }) => (
        <Button
          key={id}
          variant={activeTab === id ? "default" : "ghost"}
          onClick={() => setActiveTab(id)}
          className={`flex items-center gap-2 ${
            activeTab === id 
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' 
              : 'hover:bg-slate-200'
          }`}
        >
          <Icon className="w-4 h-4" />
          {label}
        </Button>
      ))}
    </div>
  );
};
