
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Presentation, Eye, Download } from 'lucide-react';

export const PitchDeckBuilder = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold">Pitch Deck Builder</h3>
        <p className="text-gray-600">Create compelling presentations for your innovations</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pitch Deck Templates</CardTitle>
          <CardDescription>
            Choose from investor-ready templates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <Presentation className="w-6 h-6 mb-2" />
              Tech Startup Deck
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Presentation className="w-6 h-6 mb-2" />
              Product Demo Deck
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
