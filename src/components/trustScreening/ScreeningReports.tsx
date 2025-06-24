
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Download, FileText, Trash2, Eye, Calendar } from 'lucide-react';
import type { ScreeningReport } from '@/types/trustScreening';

interface ScreeningReportsProps {
  reports: ScreeningReport[];
  activeReport: ScreeningReport | null;
  onSelectReport: (report: ScreeningReport) => void;
  onUpdateReport: (reportId: string, updates: Partial<ScreeningReport>) => void;
}

export const ScreeningReports = ({ 
  reports, 
  activeReport, 
  onSelectReport, 
  onUpdateReport 
}: ScreeningReportsProps) => {
  const [expandedReport, setExpandedReport] = useState<string | null>(null);

  const exportReportAsPDF = async (report: ScreeningReport) => {
    // Simulate PDF export
    const reportData = {
      subject: report.subject,
      createdAt: report.createdAt.toISOString(),
      identity: report.identity,
      ipLocation: report.ipLocation,
      networkAnalysis: report.networkAnalysis,
      publicRecords: report.publicRecords,
      photoReverse: report.photoReverse,
      trustProfile: report.trustProfile,
      notes: report.notes
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `trust-screening-${report.subject.replace(/[^a-zA-Z0-9]/g, '-')}-${report.createdAt.toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getReportCompleteness = (report: ScreeningReport) => {
    const sections = [
      report.identity,
      report.ipLocation,
      report.networkAnalysis,
      report.publicRecords?.length ? true : false,
      report.photoReverse,
      report.trustProfile
    ];
    const completed = sections.filter(Boolean).length;
    return Math.round((completed / sections.length) * 100);
  };

  const getRiskLevel = (report: ScreeningReport) => {
    let riskScore = 0;
    let factors = 0;

    if (report.identity) {
      riskScore += report.identity.riskScore;
      factors++;
    }
    
    if (report.ipLocation) {
      riskScore += report.ipLocation.threatScore;
      factors++;
    }

    if (report.networkAnalysis) {
      riskScore += report.networkAnalysis.redFlags.length * 20;
      factors++;
    }

    if (report.publicRecords) {
      const criticalRecords = report.publicRecords.filter(r => r.severity === 'critical').length;
      riskScore += criticalRecords * 30;
      factors++;
    }

    if (report.trustProfile) {
      riskScore += (100 - report.trustProfile.overallScore);
      factors++;
    }

    return factors > 0 ? Math.min(riskScore / factors, 100) : 0;
  };

  const getRiskColor = (risk: number) => {
    if (risk < 30) return 'text-green-600 bg-green-100';
    if (risk < 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Screening Reports
            </span>
            <Badge variant="outline">
              {reports.length} Report{reports.length !== 1 ? 's' : ''}
            </Badge>
          </CardTitle>
          <CardDescription>
            View, export, and manage your identity screening reports
          </CardDescription>
        </CardHeader>
      </Card>

      {reports.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-600 mb-2">No Reports Yet</h3>
            <p className="text-gray-500">
              Run identity verification, IP checks, or other screening tools to create your first report.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => {
            const completeness = getReportCompleteness(report);
            const riskLevel = getRiskLevel(report);
            const isExpanded = expandedReport === report.id;

            return (
              <Card 
                key={report.id} 
                className={`cursor-pointer transition-colors ${
                  activeReport?.id === report.id ? 'border-blue-300 bg-blue-50' : ''
                }`}
                onClick={() => onSelectReport(report)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{report.subject}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        {report.createdAt.toLocaleDateString()} at {report.createdAt.toLocaleTimeString()}
                      </CardDescription>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">
                        {completeness}% Complete
                      </Badge>
                      <Badge className={getRiskColor(riskLevel)}>
                        Risk: {Math.round(riskLevel)}
                      </Badge>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedReport(isExpanded ? null : report.id);
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          exportReportAsPDF(report);
                        }}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {isExpanded && (
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
                        <div className={`p-3 rounded-lg ${report.identity ? 'bg-green-100' : 'bg-gray-100'}`}>
                          <div className="text-sm font-semibold">Identity</div>
                          <div className="text-xs">{report.identity ? '✓ Done' : 'Pending'}</div>
                        </div>
                        
                        <div className={`p-3 rounded-lg ${report.ipLocation ? 'bg-green-100' : 'bg-gray-100'}`}>
                          <div className="text-sm font-semibold">IP Check</div>
                          <div className="text-xs">{report.ipLocation ? '✓ Done' : 'Pending'}</div>
                        </div>
                        
                        <div className={`p-3 rounded-lg ${report.networkAnalysis ? 'bg-green-100' : 'bg-gray-100'}`}>
                          <div className="text-sm font-semibold">Network</div>
                          <div className="text-xs">{report.networkAnalysis ? '✓ Done' : 'Pending'}</div>
                        </div>
                        
                        <div className={`p-3 rounded-lg ${report.publicRecords?.length ? 'bg-green-100' : 'bg-gray-100'}`}>
                          <div className="text-sm font-semibold">Records</div>
                          <div className="text-xs">{report.publicRecords?.length ? '✓ Done' : 'Pending'}</div>
                        </div>
                        
                        <div className={`p-3 rounded-lg ${report.photoReverse ? 'bg-green-100' : 'bg-gray-100'}`}>
                          <div className="text-sm font-semibold">Photo</div>
                          <div className="text-xs">{report.photoReverse ? '✓ Done' : 'Pending'}</div>
                        </div>
                        
                        <div className={`p-3 rounded-lg ${report.trustProfile ? 'bg-green-100' : 'bg-gray-100'}`}>
                          <div className="text-sm font-semibold">Trust AI</div>
                          <div className="text-xs">{report.trustProfile ? '✓ Done' : 'Pending'}</div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Notes</label>
                        <Textarea
                          value={report.notes}
                          onChange={(e) => onUpdateReport(report.id, { notes: e.target.value })}
                          placeholder="Add your notes about this screening..."
                          rows={3}
                        />
                      </div>

                      <div className="flex items-center gap-2 pt-4 border-t">
                        <Button
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            exportReportAsPDF(report);
                          }}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Export Report
                        </Button>
                        
                        <Button
                          variant="ghost"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle delete - would need to be implemented in parent
                            console.log('Delete report:', report.id);
                          }}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
