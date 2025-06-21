
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Copy, Download, Star } from 'lucide-react';

interface TemplateLibraryProps {
  categories: any[];
}

export const TemplateLibrary = ({ categories }: TemplateLibraryProps) => {
  const templates = [
    {
      id: 'monthly-budget',
      name: 'Monthly Budget Planner',
      category: 'Personal Use',
      description: 'Track income, expenses, and savings goals',
      rating: 4.8,
      downloads: 1240,
      featured: true
    },
    {
      id: 'invoice-pro',
      name: 'Professional Invoice',
      category: 'Business',
      description: 'Auto-calculating invoice with tax support',
      rating: 4.9,
      downloads: 856,
      featured: true
    },
    // Add more templates...
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold">Template Library</h3>
          <p className="text-gray-600">Browse and use pre-built templates</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <Card key={template.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-base">{template.name}</CardTitle>
                  <Badge variant="outline" className="text-xs mt-1">
                    {template.category}
                  </Badge>
                </div>
                {template.featured && (
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                )}
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">{template.description}</CardDescription>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>★ {template.rating}</span>
                <span>{template.downloads} downloads</span>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
                <Button size="sm" className="flex-1">
                  <Copy className="w-4 h-4 mr-2" />
                  Use
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
