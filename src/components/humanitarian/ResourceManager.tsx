
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DollarSign, Package, PieChart, ExternalLink, Plus } from 'lucide-react';
import type { HumanitarianProject, AccessibilitySettings } from '@/types/humanitarian';

interface ResourceManagerProps {
  projects: HumanitarianProject[];
  settings: AccessibilitySettings;
}

export const ResourceManager = ({ projects, settings }: ResourceManagerProps) => {
  const totalResources = projects.reduce(
    (acc, project) => ({
      budget: acc.budget + project.resources.budget,
      spent: acc.spent + project.resources.spent,
      donations: acc.donations + project.resources.donations.length,
    }),
    { budget: 0, spent: 0, donations: 0 }
  );

  const utilizationRate = totalResources.budget > 0 ? (totalResources.spent / totalResources.budget) * 100 : 0;

  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            💰 Resource & Donation Manager
          </CardTitle>
          <CardDescription>
            Transparent tracking and ethical allocation of humanitarian resources
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600">Total Budget</p>
                <p className="text-2xl font-bold text-green-700">
                  ${totalResources.budget.toLocaleString()}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600">Total Donations</p>
                <p className="text-2xl font-bold text-blue-700">{totalResources.donations}</p>
              </div>
              <Package className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-purple-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600">Utilization Rate</p>
                <p className="text-2xl font-bold text-purple-700">
                  {Math.round(utilizationRate)}%
                </p>
              </div>
              <PieChart className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Project Resource Allocation</CardTitle>
            <CardDescription>How resources are distributed across projects</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{project.name}</span>
                  <Badge variant="outline">
                    ${project.resources.spent.toLocaleString()} / ${project.resources.budget.toLocaleString()}
                  </Badge>
                </div>
                <Progress 
                  value={(project.resources.spent / project.resources.budget) * 100} 
                  className="h-2" 
                />
                <div className="text-xs text-slate-600">
                  {project.resources.donations.length} donations • {project.resources.materials.length} material items
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transparency Reports</CardTitle>
            <CardDescription>Public accountability and donor trust</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium">Q4 2024 Impact Report</p>
                  <p className="text-sm text-green-600">Financial transparency & outcomes</p>
                </div>
                <Button size="sm" variant="outline">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View
                </Button>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium">Donation Breakdown</p>
                  <p className="text-sm text-blue-600">Real-time allocation tracking</p>
                </div>
                <Button size="sm" variant="outline">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View
                </Button>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-gray-700">94%</div>
                  <div className="text-xs text-gray-600">Direct Impact</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-700">6%</div>
                  <div className="text-xs text-gray-600">Operations</div>
                </div>
              </div>
            </div>
            
            <Button className="w-full bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              Generate New Report
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
