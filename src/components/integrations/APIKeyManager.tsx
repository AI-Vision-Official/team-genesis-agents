
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Key } from 'lucide-react';

export const APIKeyManager = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="w-5 h-5" />
            API Key Manager
          </CardTitle>
          <CardDescription>
            Securely store and manage your API keys for various services
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="service">Service</Label>
              <Input id="service" placeholder="e.g., OpenAI" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="api-key">API Key</Label>
              <Input id="api-key" type="password" placeholder="Enter your API key" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Input id="description" placeholder="Brief description of this key's purpose" />
          </div>
          <Button>Add API Key</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Stored API Keys</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">OpenAI API Key</p>
                <p className="text-sm text-gray-500">For GPT models and AI features</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">Edit</Button>
                <Button size="sm" variant="destructive">Delete</Button>
              </div>
            </div>
            <div className="text-center py-8 text-gray-500">
              No API keys stored yet. Add your first key above.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
