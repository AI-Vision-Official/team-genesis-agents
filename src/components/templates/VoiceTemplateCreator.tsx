
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mic, MicOff } from 'lucide-react';

export const VoiceTemplateCreator = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Voice-to-Template Creator</CardTitle>
          <CardDescription>
            Speak naturally to create templates with AI assistance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Button size="lg">
              <Mic className="w-6 h-6 mr-2" />
              Start Voice Creation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
