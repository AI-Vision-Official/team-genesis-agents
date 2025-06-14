
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lock, Upload, FileText, Image, Video, Shield } from 'lucide-react';

export const SecureVault = () => {
  const mockFiles = [
    { id: '1', name: 'Energy_Storage_Blueprint_v3.pdf', type: 'pdf', size: '2.4 MB', encrypted: true, accessLevel: 'top_secret' },
    { id: '2', name: 'AI_Diagnostic_Prototype_Demo.mp4', type: 'video', size: '45.2 MB', encrypted: true, accessLevel: 'confidential' },
    { id: '3', name: 'Patent_Application_Draft.docx', type: 'document', size: '1.1 MB', encrypted: true, accessLevel: 'confidential' }
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="w-5 h-5 text-red-600" />;
      case 'video': return <Video className="w-5 h-5 text-purple-600" />;
      case 'image': return <Image className="w-5 h-5 text-blue-600" />;
      default: return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  const getAccessColor = (level: string) => {
    switch (level) {
      case 'public': return 'bg-green-100 text-green-800';
      case 'internal': return 'bg-blue-100 text-blue-800';
      case 'confidential': return 'bg-orange-100 text-orange-800';
      case 'top_secret': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Secure Vault</h3>
          <p className="text-slate-600">End-to-end encrypted storage for sensitive files</p>
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
          <Upload className="w-4 h-4 mr-2" />
          Upload File
        </Button>
      </div>

      {/* Storage Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Lock className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">256</p>
            <p className="text-sm text-slate-500">Files Encrypted</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">2.4 GB</p>
            <p className="text-sm text-slate-500">Storage Used</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <FileText className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">47</p>
            <p className="text-sm text-slate-500">Access Logs</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Lock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">100%</p>
            <p className="text-sm text-slate-500">Security Score</p>
          </CardContent>
        </Card>
      </div>

      {/* File List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Files</CardTitle>
          <CardDescription>Latest uploaded secure files</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockFiles.map((file) => (
              <div key={file.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3">
                  {getFileIcon(file.type)}
                  <div>
                    <h4 className="font-medium">{file.name}</h4>
                    <p className="text-sm text-slate-500">Size: {file.size}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getAccessColor(file.accessLevel)}>
                    {file.accessLevel.replace('_', ' ')}
                  </Badge>
                  {file.encrypted && <Lock className="w-4 h-4 text-green-600" />}
                  <Button size="sm" variant="outline">
                    Download
                  </Button>
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
              All files are encrypted with AES-256 encryption. Zero-knowledge architecture ensures only you can access your data.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
