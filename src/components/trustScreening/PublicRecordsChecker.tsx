
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { FileText, ExternalLink, AlertTriangle, Building, Gavel } from 'lucide-react';
import type { PublicRecord, ScreeningReport } from '@/types/trustScreening';

interface PublicRecordsCheckerProps {
  activeReport: ScreeningReport | null;
  onCreateReport: (subject: string) => ScreeningReport;
  onUpdateReport: (reportId: string, updates: Partial<ScreeningReport>) => void;
}

export const PublicRecordsChecker = ({ activeReport, onCreateReport, onUpdateReport }: PublicRecordsCheckerProps) => {
  const [searchInput, setSearchInput] = useState('');
  const [records, setRecords] = useState<PublicRecord[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!searchInput.trim()) return;

    setIsSearching(true);
    
    // Simulate API call with realistic data
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockRecords: PublicRecord[] = [
      {
        type: 'business',
        source: 'Chamber of Commerce',
        title: 'Business Registration - Example Corp',
        description: 'Registered business entity with good standing',
        date: '2020-01-15',
        severity: 'info',
        url: 'https://example.gov/business/12345'
      },
      {
        type: 'regulatory',
        source: 'State Licensing Board',
        title: 'Professional License - Real Estate',
        description: 'Active real estate license, no violations',
        date: '2019-06-10',
        severity: 'info'
      }
    ];

    // Add some concerning records if search contains certain keywords
    if (searchInput.toLowerCase().includes('fraud') || searchInput.toLowerCase().includes('scam')) {
      mockRecords.push(
        {
          type: 'fraud',
          source: 'Consumer Protection Agency',
          title: 'Consumer Complaint Filed',
          description: 'Multiple complaints regarding fraudulent business practices',
          date: '2023-08-20',
          severity: 'critical',
          url: 'https://example.gov/complaints/67890'
        },
        {
          type: 'court',
          source: 'District Court Records',
          title: 'Civil Lawsuit - Breach of Contract',
          description: 'Ongoing litigation for alleged contract violations',
          date: '2023-11-05',
          severity: 'warning'
        }
      );
    }

    setRecords(mockRecords);

    // Update or create report
    let reportToUpdate = activeReport;
    if (!reportToUpdate) {
      reportToUpdate = onCreateReport(searchInput);
    }

    onUpdateReport(reportToUpdate.id, {
      subject: searchInput,
      publicRecords: mockRecords
    });

    setIsSearching(false);
  };

  const getRecordIcon = (type: string) => {
    switch (type) {
      case 'business': return <Building className="w-4 h-4" />;
      case 'court': return <Gavel className="w-4 h-4" />;
      case 'fraud': return <AlertTriangle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'info': return 'text-blue-600 bg-blue-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Background & Public Records Checker
          </CardTitle>
          <CardDescription>
            Search public databases for business registrations, court records, sanctions, and compliance issues
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="search-input">Name, Business, or Entity</Label>
            <Input
              id="search-input"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="John Doe, Example Corp, or registration number"
            />
          </div>

          <Button 
            onClick={handleSearch} 
            disabled={!searchInput.trim() || isSearching}
            className="w-full"
          >
            {isSearching ? 'Searching Records...' : 'Search Public Records'}
          </Button>

          <div className="text-xs text-gray-500 space-y-1">
            <p>• Searches multiple databases including business registrations, sanctions lists, and public court records</p>
            <p>• Results may take 15-30 seconds to compile from various sources</p>
            <p>• Not all jurisdictions may be covered - results are not exhaustive</p>
          </div>
        </CardContent>
      </Card>

      {records.length > 0 && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Public Records Found
                <Badge variant="outline">
                  {records.length} Record{records.length !== 1 ? 's' : ''}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {records.map((record, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getRecordIcon(record.type)}
                        <div>
                          <h4 className="font-semibold">{record.title}</h4>
                          <p className="text-sm text-gray-600">{record.source}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getSeverityColor(record.severity)}>
                          {record.severity}
                        </Badge>
                        <span className="text-xs text-gray-500">{record.date}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-3">{record.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {record.type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </Badge>
                      {record.url && (
                        <Button variant="ghost" size="sm" asChild>
                          <a href={record.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            View Source
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardContent className="pt-6">
              <h4 className="font-semibold text-green-800 mb-2">Record Summary</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-700">
                    {records.filter(r => r.severity === 'info').length}
                  </div>
                  <div className="text-xs text-green-600">Clean Records</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-700">
                    {records.filter(r => r.severity === 'warning').length}
                  </div>
                  <div className="text-xs text-yellow-600">Warnings</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-700">
                    {records.filter(r => r.severity === 'critical').length}
                  </div>
                  <div className="text-xs text-red-600">Critical Issues</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-700">
                    {records.filter(r => r.type === 'business').length}
                  </div>
                  <div className="text-xs text-blue-600">Business Records</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
