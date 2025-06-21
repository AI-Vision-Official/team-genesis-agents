
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Music, Cpu, Settings } from 'lucide-react';

export const MusicInnovationLab = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold">Music Innovation Lab</h3>
        <p className="text-gray-600">Specialized tools for music and audio technology development</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Music className="w-5 h-5" />
              VST Plugin Designer
            </CardTitle>
            <CardDescription>
              Plan and prototype VST/VST3 plugins with JUCE framework
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">
              <Settings className="w-4 h-4 mr-2" />
              Start Plugin Project
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cpu className="w-5 h-5" />
              Instrument Designer
            </CardTitle>
            <CardDescription>
              Create virtual instruments with custom MIDI mapping
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">
              <Music className="w-4 h-4 mr-2" />
              Design Instrument
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
