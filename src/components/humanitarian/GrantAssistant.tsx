
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, Calendar, DollarSign, FileText } from 'lucide-react';
import type { AccessibilitySettings } from '@/types/humanitarian';

interface GrantAssistantProps {
  settings: AccessibilitySettings;
}

export const GrantAssistant = ({ settings }: GrantAssistantProps) => {
  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-emerald-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📋 Grant & Funding Assistant
          </CardTitle>
          <CardDescription>
            AI-powered grant discovery and application support
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-emerald-50">
          <CardContent className="p-6 text-center">
            <Search className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-emerald-700">15</p>
            <p className="text-sm text-emerald-600">Active Opportunities</p>
          </CardContent>
        </Card>
        
        <Card className="bg-blue-50">
          <CardContent className="p-6 text-center">
            <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-blue-700">3</p>
            <p className="text-sm text-blue-600">Upcoming Deadlines</p>
          </CardContent>
        </Card>
        
        <Card className="bg-purple-50">
          <CardContent className="p-6 text-center">
            <DollarSign className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-purple-700">$2.4M</p>
            <p className="text-sm text-purple-600">Total Available</p>
          </CardContent>
        </Card>
        
        <Card className="bg-green-50">
          <CardContent className="p-6 text-center">
            <FileText className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-700">4</p>
            <p className="text-sm text-green-600">Submitted</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recommended Grant Opportunities</CardTitle>
          <CardDescription>AI-matched funding opportunities based on your projects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-medium">Global Humanitarian Innovation Fund</h4>
                  <p className="text-sm text-slate-600">UN Development Programme</p>
                </div>
                <Badge className="bg-green-100 text-green-800">95% match</Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm text-slate-600 mb-3">
                <div>Amount: $250,000 - $500,000</div>
                <div>Deadline: March 15, 2025</div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                  Start Application
                </Button>
                <Button size="sm" variant="outline">View Details</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
