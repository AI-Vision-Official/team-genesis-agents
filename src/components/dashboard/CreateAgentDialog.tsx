
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Bot, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CreateAgentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateAgentDialog = ({ open, onOpenChange }: CreateAgentDialogProps) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    capabilities: [] as string[],
    newCapability: ''
  });
  const { toast } = useToast();

  const agentTypes = [
    { value: 'data_analyst', label: 'Data Analyst' },
    { value: 'code_reviewer', label: 'Code Reviewer' },
    { value: 'project_manager', label: 'Project Manager' },
    { value: 'content_creator', label: 'Content Creator' },
    { value: 'research_assistant', label: 'Research Assistant' },
    { value: 'customer_support', label: 'Customer Support' },
    { value: 'marketing_specialist', label: 'Marketing Specialist' },
    { value: 'quality_assurance', label: 'Quality Assurance' }
  ];

  const handleAddCapability = () => {
    if (formData.newCapability.trim() && !formData.capabilities.includes(formData.newCapability.trim())) {
      setFormData(prev => ({
        ...prev,
        capabilities: [...prev.capabilities, prev.newCapability.trim()],
        newCapability: ''
      }));
    }
  };

  const handleRemoveCapability = (capability: string) => {
    setFormData(prev => ({
      ...prev,
      capabilities: prev.capabilities.filter(c => c !== capability)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.type || !formData.description.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Simulate agent creation
    toast({
      title: "Agent Created Successfully!",
      description: `${formData.name} has been added to your team and is ready to start working.`,
    });

    // Reset form and close dialog
    setFormData({
      name: '',
      type: '',
      description: '',
      capabilities: [],
      newCapability: ''
    });
    onOpenChange(false);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      type: '',
      description: '',
      capabilities: [],
      newCapability: ''
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-purple-600" />
            Create New AI Agent
          </DialogTitle>
          <DialogDescription>
            Configure your new AI agent with specific capabilities and responsibilities.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Agent Name *</Label>
            <Input
              id="name"
              placeholder="e.g., DataAnalyst-Alpha, CodeReviewer-Beta"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Agent Type *</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select agent specialization" />
              </SelectTrigger>
              <SelectContent>
                {agentTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Describe what this agent will do and its primary responsibilities..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-3">
            <Label>Capabilities</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Add a capability (e.g., Data Processing, Report Generation)"
                value={formData.newCapability}
                onChange={(e) => setFormData(prev => ({ ...prev, newCapability: e.target.value }))}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCapability())}
              />
              <Button type="button" onClick={handleAddCapability} variant="outline">
                Add
              </Button>
            </div>
            
            {formData.capabilities.length > 0 && (
              <div className="flex flex-wrap gap-2 p-3 bg-slate-50 rounded-lg">
                {formData.capabilities.map((capability) => (
                  <Badge key={capability} variant="secondary" className="flex items-center gap-1">
                    {capability}
                    <X 
                      className="w-3 h-3 cursor-pointer hover:text-red-500" 
                      onClick={() => handleRemoveCapability(capability)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <DialogFooter className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={handleReset}>
              Reset
            </Button>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              Create Agent
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
