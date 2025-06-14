
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, FileText, Send } from 'lucide-react';

export const NDAGenerator = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Custom NDA Generator
        </CardTitle>
        <CardDescription>Generate and send NDAs for secure collaboration</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="h-20 flex-col">
            <FileText className="w-6 h-6 mb-2" />
            Standard NDA
          </Button>
          <Button variant="outline" className="h-20 flex-col">
            <Shield className="w-6 h-6 mb-2" />
            Mutual NDA
          </Button>
        </div>
        <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
          <Send className="w-4 h-4 mr-2" />
          Create Custom NDA
        </Button>
      </CardContent>
    </Card>
  );
};
