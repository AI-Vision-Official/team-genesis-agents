
import { Card, CardContent } from '@/components/ui/card';

interface IntegrationsOverviewProps {
  connectedCount: number;
  availableCount: number;
  categoriesCount: number;
  featuresCount: number;
}

export const IntegrationsOverview = ({
  connectedCount,
  availableCount,
  categoriesCount,
  featuresCount
}: IntegrationsOverviewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="bg-blue-50">
        <CardContent className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-700">{connectedCount}</p>
            <p className="text-sm text-blue-600">Connected</p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-orange-50">
        <CardContent className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-700">{availableCount}</p>
            <p className="text-sm text-orange-600">Available</p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-green-50">
        <CardContent className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-700">{categoriesCount}</p>
            <p className="text-sm text-green-600">Categories</p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-purple-50">
        <CardContent className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-700">{featuresCount}</p>
            <p className="text-sm text-purple-600">Features</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
