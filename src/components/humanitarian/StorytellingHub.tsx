
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Share2, Edit, Plus } from 'lucide-react';
import type { HumanitarianProject, AccessibilitySettings } from '@/types/humanitarian';

interface StorytellingHubProps {
  projects: HumanitarianProject[];
  settings: AccessibilitySettings;
}

export const StorytellingHub = ({ projects, settings }: StorytellingHubProps) => {
  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-indigo-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📚 Storytelling & Content Generator
          </CardTitle>
          <CardDescription>
            Share impactful stories and generate awareness content
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-indigo-50">
          <CardContent className="p-6 text-center">
            <BookOpen className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-indigo-700">12</p>
            <p className="text-sm text-indigo-600">Stories Published</p>
          </CardContent>
        </Card>
        
        <Card className="bg-green-50">
          <CardContent className="p-6 text-center">
            <Share2 className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-700">2.4K</p>
            <p className="text-sm text-green-600">Social Shares</p>
          </CardContent>
        </Card>
        
        <Card className="bg-orange-50">
          <CardContent className="p-6 text-center">
            <Edit className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-orange-700">5</p>
            <p className="text-sm text-orange-600">Drafts in Progress</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Stories</CardTitle>
              <CardDescription>Impact stories and project updates</CardDescription>
            </div>
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              <Plus className="w-4 h-4 mr-2" />
              New Story
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium">Community Garden Transforms Lives</h4>
                <Badge variant="outline">Published</Badge>
              </div>
              <p className="text-sm text-slate-600 mb-3">
                In the heart of the refugee camp, seeds of hope are growing into something beautiful...
              </p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Share2 className="w-4 h-4 mr-2" />
                  Generate Social Posts
                </Button>
                <Button size="sm" variant="outline">Edit</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
