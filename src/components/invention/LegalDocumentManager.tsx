
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Plus, Download, Eye, Lock, Shield } from 'lucide-react';

export const LegalDocumentManager = () => {
  const mockDocuments = [
    {
      id: 'doc-1',
      type: 'nda',
      title: 'Standard NDA Template',
      status: 'signed',
      parties: ['Chris', 'TechVentures Capital'],
      createdDate: new Date('2024-06-01'),
      signedDate: new Date('2024-06-02'),
      expiryDate: new Date('2025-06-01')
    },
    {
      id: 'doc-2',
      type: 'patent',
      title: 'Smart Energy Storage Patent Application',
      status: 'filed',
      createdDate: new Date('2024-03-15'),
      parties: ['Chris', 'USPTO']
    }
  ];

  const getDocumentTypeColor = (type: string) => {
    switch (type) {
      case 'nda': return 'bg-blue-100 text-blue-800';
      case 'contract': return 'bg-green-100 text-green-800';
      case 'patent': return 'bg-purple-100 text-purple-800';
      case 'license': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'sent': return 'bg-yellow-100 text-yellow-800';
      case 'signed': return 'bg-green-100 text-green-800';
      case 'filed': return 'bg-blue-100 text-blue-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Legal Document Manager</h3>
          <p className="text-slate-600">Secure storage and management of legal documents</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Shield className="w-4 h-4 mr-2" />
            Generate NDA
          </Button>
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
            <Plus className="w-4 h-4 mr-2" />
            Upload Document
          </Button>
        </div>
      </div>

      {/* Document Categories */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {['NDA', 'Contracts', 'Patents', 'Licenses', 'Correspondence'].map((category) => (
          <Card key={category} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <FileText className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <p className="font-medium">{category}</p>
              <p className="text-sm text-slate-500">{Math.floor(Math.random() * 10) + 1} docs</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Documents */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Documents</CardTitle>
          <CardDescription>Latest legal documents and agreements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockDocuments.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded">
                    <FileText className="w-5 h-5 text-slate-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{doc.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getDocumentTypeColor(doc.type)}>
                        {doc.type.toUpperCase()}
                      </Badge>
                      <Badge className={getStatusColor(doc.status)}>
                        {doc.status}
                      </Badge>
                      <span className="text-sm text-slate-500">
                        Parties: {doc.parties.join(', ')}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Created: {doc.createdDate.toLocaleDateString()}
                      {doc.signedDate && ` • Signed: ${doc.signedDate.toLocaleDateString()}`}
                      {doc.expiryDate && ` • Expires: ${doc.expiryDate.toLocaleDateString()}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Lock className="w-4 h-4 text-green-600" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security Notice */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-600" />
            <p className="text-sm text-green-800">
              All documents are encrypted end-to-end and stored securely. Access is logged and monitored.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
