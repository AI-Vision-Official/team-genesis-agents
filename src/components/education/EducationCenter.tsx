
import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GraduationCap, Award, AlertTriangle, TrendingUp } from 'lucide-react';
import { CertificateGrid } from './CertificateGrid';
import { CertificateFilters } from './CertificateFilters';
import { CertificateUpload } from './CertificateUpload';
import { EducationDashboard } from './EducationDashboard';
import { ExpirationAlerts } from './ExpirationAlerts';
import { MilestoneTracker } from './MilestoneTracker';
import { mockCertificates, mockSummary, mockAlerts, mockMilestones } from '@/data/mockEducationData';
import type { Certificate, CertificateFilters as FilterType } from '@/types/education';

export const EducationCenter = () => {
  const [certificates] = useState<Certificate[]>(mockCertificates);
  const [filters, setFilters] = useState<FilterType>({});
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredCertificates = useMemo(() => {
    return certificates.filter(cert => {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        if (!cert.title.toLowerCase().includes(searchLower) &&
            !cert.issuingOrganization.toLowerCase().includes(searchLower) &&
            !cert.skills.some(skill => skill.toLowerCase().includes(searchLower))) {
          return false;
        }
      }
      
      if (filters.category && cert.category !== filters.category) return false;
      if (filters.type && cert.type !== filters.type) return false;
      if (filters.status && cert.status !== filters.status) return false;
      if (filters.organization && !cert.issuingOrganization.toLowerCase().includes(filters.organization.toLowerCase())) return false;
      
      if (filters.dateFrom && new Date(cert.issueDate) < filters.dateFrom) return false;
      if (filters.dateTo && new Date(cert.issueDate) > filters.dateTo) return false;
      
      if (filters.expirationFrom && cert.expirationDate && new Date(cert.expirationDate) < filters.expirationFrom) return false;
      if (filters.expirationTo && cert.expirationDate && new Date(cert.expirationDate) > filters.expirationTo) return false;
      
      return true;
    });
  }, [certificates, filters]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="w-6 h-6" />
            Education & Certification Center
          </CardTitle>
          <CardDescription>
            Comprehensive management system for diplomas, certificates, and educational achievements
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
          <TabsTrigger value="upload">Add New</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <EducationDashboard summary={mockSummary} />
        </TabsContent>

        <TabsContent value="certificates">
          <div className="space-y-6">
            <CertificateFilters 
              filters={filters} 
              onFiltersChange={setFilters}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              totalResults={filteredCertificates.length}
            />
            <CertificateGrid 
              certificates={filteredCertificates}
              viewMode={viewMode}
            />
          </div>
        </TabsContent>

        <TabsContent value="upload">
          <CertificateUpload />
        </TabsContent>

        <TabsContent value="alerts">
          <ExpirationAlerts alerts={mockAlerts} />
        </TabsContent>

        <TabsContent value="milestones">
          <MilestoneTracker milestones={mockMilestones} certificates={certificates} />
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Learning Progress Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Advanced analytics and progress tracking coming soon...
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
