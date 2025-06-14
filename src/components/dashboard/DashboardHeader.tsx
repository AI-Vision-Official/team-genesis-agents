
import { Button } from '@/components/ui/button';
import { Plus, Settings } from 'lucide-react';

export const DashboardHeader = () => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          AI Agent Command Center
        </h1>
        <p className="text-slate-600 mt-2">Orchestrate intelligent agents to accomplish complex tasks</p>
      </div>
      <div className="flex gap-3">
        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Create Agent
        </Button>
        <Button variant="outline">
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
      </div>
    </div>
  );
};
