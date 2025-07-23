
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { IdentityVerifier } from './IdentityVerifier';
import { IPLocationChecker } from './IPLocationChecker';
import { NetworkAnalyzer } from './NetworkAnalyzer';
import { PublicRecordsChecker } from './PublicRecordsChecker';
import { PhotoReverseLookup } from './PhotoReverseLookup';
import { TrustProfileGenerator } from './TrustProfileGenerator';
import { ScreeningReports } from './ScreeningReports';
import { OSINTToolsGrid } from './OSINTToolsGrid';
import { OSINTToolViewer } from './OSINTToolViewer';
import { Shield, Search, Globe, Users, FileText, Camera, Brain, Download, Target } from 'lucide-react';
import type { ScreeningReport } from '@/types/trustScreening';

export const TrustScreeningCenter = () => {
  const [activeReport, setActiveReport] = useState<ScreeningReport | null>(null);
  const [reports, setReports] = useState<ScreeningReport[]>([]);

  const createNewReport = (subject: string) => {
    const newReport: ScreeningReport = {
      id: `report-${Date.now()}`,
      subject,
      createdAt: new Date(),
      notes: ''
    };
    setReports(prev => [newReport, ...prev]);
    setActiveReport(newReport);
    return newReport;
  };

  const updateReport = (reportId: string, updates: Partial<ScreeningReport>) => {
    setReports(prev => prev.map(report => 
      report.id === reportId ? { ...report, ...updates } : report
    ));
    if (activeReport?.id === reportId) {
      setActiveReport(prev => prev ? { ...prev, ...updates } : null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Shield className="w-8 h-8 text-blue-600" />
            Trust & Identity Screening
          </h1>
          <p className="text-gray-600 mt-2">
            Comprehensive toolkit for verifying identity, background, and digital footprint analysis
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-green-700 border-green-300">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            Online Tools Active
          </Badge>
          <Badge variant="outline" className="text-blue-700 border-blue-300">
            <FileText className="w-3 h-3 mr-1" />
            {reports.length} Reports
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="osint-tools" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
          <TabsTrigger value="osint-tools" className="flex items-center gap-1">
            <Target className="w-4 h-4" />
            <span className="hidden sm:inline">OSINT Tools</span>
          </TabsTrigger>
          <TabsTrigger value="identity" className="flex items-center gap-1">
            <Search className="w-4 h-4" />
            <span className="hidden sm:inline">Identity</span>
          </TabsTrigger>
          <TabsTrigger value="ip-location" className="flex items-center gap-1">
            <Globe className="w-4 h-4" />
            <span className="hidden sm:inline">IP/Location</span>
          </TabsTrigger>
          <TabsTrigger value="network" className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">Network</span>
          </TabsTrigger>
          <TabsTrigger value="records" className="flex items-center gap-1">
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">Records</span>
          </TabsTrigger>
          <TabsTrigger value="photo" className="flex items-center gap-1">
            <Camera className="w-4 h-4" />
            <span className="hidden sm:inline">Photo</span>
          </TabsTrigger>
          <TabsTrigger value="trust" className="flex items-center gap-1">
            <Brain className="w-4 h-4" />
            <span className="hidden sm:inline">Trust AI</span>
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-1">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Reports</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="osint-tools">
          <OSINTToolsGrid />
        </TabsContent>

        <TabsContent value="identity">
          <IdentityVerifier 
            activeReport={activeReport}
            onCreateReport={createNewReport}
            onUpdateReport={updateReport}
          />
        </TabsContent>

        <TabsContent value="ip-location">
          <IPLocationChecker 
            activeReport={activeReport}
            onCreateReport={createNewReport}
            onUpdateReport={updateReport}
          />
        </TabsContent>

        <TabsContent value="network">
          <NetworkAnalyzer 
            activeReport={activeReport}
            onCreateReport={createNewReport}
            onUpdateReport={updateReport}
          />
        </TabsContent>

        <TabsContent value="records">
          <PublicRecordsChecker 
            activeReport={activeReport}
            onCreateReport={createNewReport}
            onUpdateReport={updateReport}
          />
        </TabsContent>

        <TabsContent value="photo">
          <PhotoReverseLookup 
            activeReport={activeReport}
            onCreateReport={createNewReport}
            onUpdateReport={updateReport}
          />
        </TabsContent>

        <TabsContent value="trust">
          <TrustProfileGenerator 
            activeReport={activeReport}
            onCreateReport={createNewReport}
            onUpdateReport={updateReport}
          />
        </TabsContent>

        <TabsContent value="reports">
          <ScreeningReports 
            reports={reports}
            activeReport={activeReport}
            onSelectReport={setActiveReport}
            onUpdateReport={updateReport}
          />
        </TabsContent>
      </Tabs>

      {activeReport && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Active Report: {activeReport.subject}</CardTitle>
            <CardDescription>
              Created: {activeReport.createdAt.toLocaleDateString()} at {activeReport.createdAt.toLocaleTimeString()}
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  );
};
