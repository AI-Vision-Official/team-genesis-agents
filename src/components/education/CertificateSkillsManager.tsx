
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, X } from 'lucide-react';

interface CertificateSkillsManagerProps {
  skills: string[];
  onSkillsChange: (skills: string[]) => void;
}

export const CertificateSkillsManager = ({ skills, onSkillsChange }: CertificateSkillsManagerProps) => {
  const [currentSkill, setCurrentSkill] = useState('');

  const addSkill = () => {
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      onSkillsChange([...skills, currentSkill.trim()]);
      setCurrentSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    onSkillsChange(skills.filter(s => s !== skill));
  };

  return (
    <div>
      <Label htmlFor="skills" className="dark:text-slate-200">Skills & Competencies</Label>
      <div className="flex gap-2 mb-2">
        <Input
          value={currentSkill}
          onChange={(e) => setCurrentSkill(e.target.value)}
          placeholder="Add a skill..."
          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
          className="dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100"
        />
        <Button type="button" onClick={addSkill} variant="outline" className="shrink-0">
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <Badge key={skill} variant="secondary" className="flex items-center gap-1 dark:bg-slate-600 dark:text-slate-100">
            {skill}
            <X 
              className="w-3 h-3 cursor-pointer hover:text-red-500" 
              onClick={() => removeSkill(skill)}
            />
          </Badge>
        ))}
      </div>
    </div>
  );
};
