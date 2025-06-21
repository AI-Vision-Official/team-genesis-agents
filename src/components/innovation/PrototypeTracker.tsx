
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export const PrototypeTracker = () => {
  const prototypes = [
    {
      id: 'vst-emotion',
      name: 'Emotion VST Plugin',
      stage: 'Development',
      progress: 65,
      lastUpdate: '2 days ago'
    },
    {
      id: 'ui-framework',
      name: 'Adaptive UI Framework',
      stage: 'Research',
      progress: 25,
      lastUpdate: '1 week ago'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold">Prototype Tracker</h3>
        <p className="text-gray-600">Monitor your innovation projects from concept to completion</p>
      </div>

      <div className="space-y-4">
        {prototypes.map((prototype) => (
          <Card key={prototype.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{prototype.name}</CardTitle>
                <Badge variant="outline">{prototype.stage}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Progress</span>
                  <span>{prototype.progress}%</span>
                </div>
                <Progress value={prototype.progress} />
                <p className="text-sm text-gray-500">Last updated: {prototype.lastUpdate}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
