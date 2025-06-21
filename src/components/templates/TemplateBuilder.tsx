
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Move, 
  Type, 
  Image, 
  Calendar, 
  DollarSign, 
  CheckSquare, 
  Table,
  Save,
  Eye,
  Undo,
  Redo,
  Settings
} from 'lucide-react';

interface TemplateBuilderProps {
  activeTemplate: string | null;
}

export const TemplateBuilder = ({ activeTemplate }: TemplateBuilderProps) => {
  const [templateName, setTemplateName] = useState('');
  const [templateDescription, setTemplateDescription] = useState('');
  const [elements, setElements] = useState<any[]>([]);

  const elementTypes = [
    { id: 'text', name: 'Text Field', icon: Type, description: 'Single line input' },
    { id: 'textarea', name: 'Text Area', icon: Type, description: 'Multi-line text' },
    { id: 'date', name: 'Date Picker', icon: Calendar, description: 'Date selection' },
    { id: 'currency', name: 'Currency', icon: DollarSign, description: 'Money amounts' },
    { id: 'checkbox', name: 'Checkbox', icon: CheckSquare, description: 'Yes/No options' },
    { id: 'table', name: 'Table', icon: Table, description: 'Structured data' },
    { id: 'image', name: 'Image', icon: Image, description: 'Picture placeholder' }
  ];

  const addElement = (type: string) => {
    const newElement = {
      id: `element-${Date.now()}`,
      type,
      label: `New ${type}`,
      placeholder: `Enter ${type}...`,
      required: false,
      aiAssisted: false
    };
    setElements([...elements, newElement]);
  };

  const removeElement = (id: string) => {
    setElements(elements.filter(el => el.id !== id));
  };

  const renderPreview = () => (
    <div className="border rounded-lg p-6 bg-white">
      <h3 className="text-lg font-semibold mb-2">{templateName || 'Untitled Template'}</h3>
      <p className="text-gray-600 mb-4">{templateDescription}</p>
      
      <div className="space-y-4">
        {elements.map((element) => (
          <div key={element.id} className="space-y-2">
            <div className="flex items-center gap-2">
              <label className="font-medium">{element.label}</label>
              {element.required && <span className="text-red-500">*</span>}
              {element.aiAssisted && (
                <Badge variant="secondary" className="text-xs">AI</Badge>
              )}
            </div>
            
            {element.type === 'text' && (
              <Input placeholder={element.placeholder} />
            )}
            {element.type === 'textarea' && (
              <Textarea placeholder={element.placeholder} />
            )}
            {element.type === 'date' && (
              <Input type="date" />
            )}
            {element.type === 'currency' && (
              <Input type="number" placeholder="0.00" className="pl-8" />
            )}
            {element.type === 'checkbox' && (
              <div className="flex items-center gap-2">
                <input type="checkbox" />
                <span>{element.placeholder}</span>
              </div>
            )}
            {element.type === 'table' && (
              <div className="border rounded">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-2 text-left">Item</th>
                      <th className="p-2 text-left">Quantity</th>
                      <th className="p-2 text-left">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2 border-t">Sample Item</td>
                      <td className="p-2 border-t">1</td>
                      <td className="p-2 border-t">$0.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            {element.type === 'image' && (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Image className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                <p className="text-gray-500">Image placeholder</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold">Template Builder</h3>
          <p className="text-gray-600">Create smart templates with drag-and-drop elements</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Undo className="w-4 h-4 mr-2" />
            Undo
          </Button>
          <Button variant="outline" size="sm">
            <Redo className="w-4 h-4 mr-2" />
            Redo
          </Button>
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button>
            <Save className="w-4 h-4 mr-2" />
            Save Template
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Template Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Template Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Template Name</label>
              <Input
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                placeholder="My Template"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <Textarea
                value={templateDescription}
                onChange={(e) => setTemplateDescription(e.target.value)}
                placeholder="Describe what this template is for..."
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-3">Add Elements</label>
              <div className="space-y-2">
                {elementTypes.map((type) => (
                  <Button
                    key={type.id}
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => addElement(type.id)}
                  >
                    <type.icon className="w-4 h-4 mr-2" />
                    <div className="text-left">
                      <div className="font-medium">{type.name}</div>
                      <div className="text-xs text-gray-500">{type.description}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Element List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Template Elements</CardTitle>
            <CardDescription>
              Drag to reorder • Click to configure
            </CardDescription>
          </CardHeader>
          <CardContent>
            {elements.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Plus className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No elements yet</p>
                <p className="text-sm">Add elements from the left panel</p>
              </div>
            ) : (
              <div className="space-y-2">
                {elements.map((element, index) => (
                  <div
                    key={element.id}
                    className="flex items-center gap-2 p-3 border rounded-lg hover:bg-gray-50"
                  >
                    <Move className="w-4 h-4 text-gray-400 cursor-move" />
                    <div className="flex-1">
                      <div className="font-medium">{element.label}</div>
                      <div className="text-sm text-gray-500">{element.type}</div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => removeElement(element.id)}
                      >
                        ×
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Live Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Live Preview</CardTitle>
            <CardDescription>
              See how your template will look
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderPreview()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
