
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, FileText, Download } from 'lucide-react';

export const PatentHelper = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold">Patent & IP Helper</h3>
        <p className="text-gray-600">Protect your innovations with proper documentation</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Patent Research</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full">
              <Shield className="w-4 h-4 mr-2" />
              Search Patents
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">NDA Generator</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Create NDA
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Patent Application</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Patent
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
