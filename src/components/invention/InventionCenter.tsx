
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Lightbulb, 
  Shield, 
  FileText, 
  Users, 
  Search, 
  AlertTriangle,
  Lock,
  Eye,
  TrendingUp,
  Briefcase,
  Brain,
  Plus
} from 'lucide-react';
import { InventionOrganizer } from './InventionOrganizer';
import { ContactManager } from './ContactManager';
import { PatentTracker } from './PatentTracker';
import { LegalDocumentManager } from './LegalDocumentManager';
import { NDAGenerator } from './NDAGenerator';
import { MonitoringDashboard } from './MonitoringDashboard';
import { SecureVault } from './SecureVault';
import { InvestorOutreach } from './InvestorOutreach';
import type { 
  Invention, 
  Contact, 
  PatentApplication, 
  LegalDocument, 
  MonitoringAlert,
  AIAgent 
} from '@/types/invention';

export const InventionCenter = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock data for demonstration
  const mockInventions: Invention[] = [
    {
      id: 'inv-1',
      title: 'Smart Energy Storage System',
      description: 'Revolutionary battery technology with 10x capacity and rapid charging',
      category: 'hardware',
      stage: 'prototype',
      priority: 'high',
      createdAt: new Date('2024-01-15'),
      lastModified: new Date('2024-06-10'),
      versions: [],
      attachments: [],
      patentApplications: [],
      collaborators: ['contact-1', 'contact-2'],
      confidentialityLevel: 'confidential',
      tags: ['energy', 'battery', 'IoT'],
      marketPotential: 95,
      developmentCost: 250000,
      timeToMarket: 18
    },
    {
      id: 'inv-2',
      title: 'AI-Powered Diagnostic Platform',
      description: 'Medical diagnostic system using advanced machine learning algorithms',
      category: 'software',
      stage: 'patent_pending',
      priority: 'critical',
      createdAt: new Date('2024-02-20'),
      lastModified: new Date('2024-06-12'),
      versions: [],
      attachments: [],
      patentApplications: [],
      collaborators: ['contact-3'],
      confidentialityLevel: 'top_secret',
      tags: ['AI', 'medical', 'diagnostics'],
      marketPotential: 98,
      developmentCost: 500000,
      timeToMarket: 24
    }
  ];

  const mockContacts: Contact[] = [
    {
      id: 'contact-1',
      name: 'Dr. Sarah Chen',
      email: 'sarah.chen@techventures.com',
      company: 'TechVentures Capital',
      role: 'investor',
      relationship: 'active',
      ndaSigned: true,
      ndaExpiryDate: new Date('2025-12-31'),
      notes: 'Interested in energy storage technologies. Previous successful investments in CleanTech.',
      lastContact: new Date('2024-06-08'),
      trustLevel: 9,
      specializations: ['CleanTech', 'Hardware', 'Series A']
    },
    {
      id: 'contact-2',
      name: 'Prof. Michael Rodriguez',
      email: 'mrodriguez@university.edu',
      company: 'State University',
      role: 'collaborator',
      relationship: 'active',
      ndaSigned: true,
      notes: 'Materials science expert. Co-inventor on battery technology.',
      lastContact: new Date('2024-06-12'),
      trustLevel: 10,
      specializations: ['Materials Science', 'Battery Technology', 'Research']
    }
  ];

  const mockPatents: PatentApplication[] = [
    {
      id: 'patent-1',
      inventionId: 'inv-2',
      applicationNumber: 'US20240123456',
      title: 'AI-Powered Medical Diagnostic System',
      status: 'under_review',
      filingDate: new Date('2024-03-15'),
      jurisdiction: ['US', 'EU', 'JP'],
      attorney: 'Johnson & Associates IP Law',
      cost: 25000,
      documents: [],
      deadlines: [
        {
          id: 'deadline-1',
          type: 'response',
          dueDate: new Date('2024-09-15'),
          description: 'Response to Office Action required',
          completed: false,
          cost: 3000
        }
      ]
    }
  ];

  const mockAlerts: MonitoringAlert[] = [
    {
      id: 'alert-1',
      type: 'patent_conflict',
      severity: 'high',
      title: 'Similar Patent Application Detected',
      description: 'Patent application filed by TechCorp Inc. shows 73% similarity to your Smart Energy Storage System',
      detectedAt: new Date(),
      source: 'USPTO Database',
      evidence: ['Patent Application US20240987654', 'Technical specifications comparison'],
      relatedInvention: 'inv-1',
      status: 'new',
      recommendedAction: 'Review patent claims and consider filing continuation or improvement patent',
      legalRisk: 8
    },
    {
      id: 'alert-2',
      type: 'copyright_infringement',
      severity: 'medium',
      title: 'Potential Design Copy on Marketplace',
      description: 'Product listing on AliExpress shows similar design elements to your prototype',
      detectedAt: new Date(Date.now() - 3600000),
      source: 'AliExpress Marketplace',
      evidence: ['Product listing screenshots', 'Design comparison analysis'],
      status: 'investigating',
      recommendedAction: 'Send DMCA takedown notice to marketplace',
      legalRisk: 5
    }
  ];

  const mockAIAgents: AIAgent[] = [
    {
      id: 'agent-1',
      name: 'CopyrightGuard-AI',
      type: 'monitor',
      status: 'scanning',
      lastScan: new Date(),
      tasksCompleted: 1247,
      alertsGenerated: 23,
      accuracy: 94,
      specialization: ['Copyright Monitoring', 'Brand Protection', 'Image Recognition']
    },
    {
      id: 'agent-2',
      name: 'PatentScout-AI',
      type: 'analyzer',
      status: 'active',
      lastScan: new Date(Date.now() - 1800000),
      tasksCompleted: 856,
      alertsGenerated: 15,
      accuracy: 97,
      specialization: ['Patent Analysis', 'Prior Art Search', 'Conflict Detection']
    },
    {
      id: 'agent-3',
      name: 'NoveltyChecker-AI',
      type: 'validator',
      status: 'idle',
      lastScan: new Date(Date.now() - 7200000),
      tasksCompleted: 432,
      alertsGenerated: 8,
      accuracy: 91,
      specialization: ['Novelty Assessment', 'Prior Art Analysis', 'Patentability']
    }
  ];

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'concept': return 'bg-gray-100 text-gray-800';
      case 'development': return 'bg-blue-100 text-blue-800';
      case 'prototype': return 'bg-purple-100 text-purple-800';
      case 'testing': return 'bg-yellow-100 text-yellow-800';
      case 'patent_pending': return 'bg-orange-100 text-orange-800';
      case 'patented': return 'bg-green-100 text-green-800';
      case 'commercialized': return 'bg-emerald-100 text-emerald-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-gray-100 text-gray-800';
      case 'medium': return 'bg-blue-100 text-blue-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Invention Protection & Management</h2>
          <p className="text-slate-600">Secure your innovations with enterprise-grade protection and monitoring</p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
            <Plus className="w-4 h-4 mr-2" />
            New Invention
          </Button>
          <Button variant="outline">
            <Shield className="w-4 h-4 mr-2" />
            Security Scan
          </Button>
        </div>
      </div>

      {/* Quick Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700">Active Inventions</p>
                <p className="text-2xl font-bold text-blue-900">{mockInventions.length}</p>
              </div>
              <Lightbulb className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700">Patents Filed</p>
                <p className="text-2xl font-bold text-green-900">{mockPatents.length}</p>
              </div>
              <FileText className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-700">Active Alerts</p>
                <p className="text-2xl font-bold text-orange-900">{mockAlerts.filter(a => a.status === 'new').length}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700">AI Agents</p>
                <p className="text-2xl font-bold text-purple-900">{mockAIAgents.filter(a => a.status === 'active' || a.status === 'scanning').length}</p>
              </div>
              <Brain className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="inventions">Inventions</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
          <TabsTrigger value="patents">Patents</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="vault">Secure Vault</TabsTrigger>
          <TabsTrigger value="investors">Investors</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          {/* Recent Inventions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                Recent Inventions
              </CardTitle>
              <CardDescription>Your latest innovation projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockInventions.map((invention) => (
                  <div key={invention.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{invention.title}</h4>
                      <p className="text-sm text-slate-600 mt-1">{invention.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className={getStageColor(invention.stage)}>
                          {invention.stage.replace('_', ' ')}
                        </Badge>
                        <Badge className={getPriorityColor(invention.priority)}>
                          {invention.priority}
                        </Badge>
                        <span className="text-xs text-slate-500">
                          Modified {invention.lastModified.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <p className="text-sm font-medium">{invention.marketPotential}%</p>
                        <p className="text-xs text-slate-500">Market Potential</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Active Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Security Alerts
              </CardTitle>
              <CardDescription>Recent monitoring alerts requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                    <div className="mt-1">
                      <Badge className={getSeverityColor(alert.severity)}>
                        {alert.severity}
                      </Badge>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{alert.title}</h4>
                      <p className="text-sm text-slate-600 mt-1">{alert.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-slate-500">
                          {alert.detectedAt.toLocaleString()}
                        </span>
                        <span className="text-xs text-slate-500">•</span>
                        <span className="text-xs text-slate-500">Risk: {alert.legalRisk}/10</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Review
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventions">
          <InventionOrganizer inventions={mockInventions} />
        </TabsContent>

        <TabsContent value="contacts">
          <ContactManager contacts={mockContacts} />
        </TabsContent>

        <TabsContent value="patents">
          <PatentTracker patents={mockPatents} />
        </TabsContent>

        <TabsContent value="documents">
          <LegalDocumentManager />
        </TabsContent>

        <TabsContent value="monitoring">
          <MonitoringDashboard alerts={mockAlerts} agents={mockAIAgents} />
        </TabsContent>

        <TabsContent value="vault">
          <SecureVault />
        </TabsContent>

        <TabsContent value="investors">
          <InvestorOutreach contacts={mockContacts.filter(c => c.role === 'investor')} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
