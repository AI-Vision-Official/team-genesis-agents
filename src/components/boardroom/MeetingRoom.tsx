
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  Users, 
  FileText,
  CheckCircle,
  Play,
  Square
} from 'lucide-react';
import type { BoardroomAccessibilityOptions } from '@/types/boardroom';

interface MeetingRoomProps {
  settings: BoardroomAccessibilityOptions;
}

export const MeetingRoom = ({ settings }: MeetingRoomProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            <Calendar className="w-5 h-5" />
            Meeting Management
          </CardTitle>
          <CardDescription>
            Schedule and manage collaborative sessions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className={`text-gray-500 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
              Meeting room functionality coming soon
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
