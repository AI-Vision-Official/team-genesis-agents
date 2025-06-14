
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Lightbulb, 
  Plus, 
  Search, 
  Filter,
  Clock,
  TrendingUp,
  DollarSign,
  Users
} from 'lucide-react';
import type { Invention } from '@/types/invention';

interface InventionOrganizerProps {
  inventions: Invention[];
}

export const InventionOrganizer = ({ inventions }: InventionOrganizerProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStage, setFilterStage] = useState('all');

  const filteredInventions = inventions.filter(invention => {
    const matchesSearch = invention.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invention.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invention.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = filterCategory === 'all' || invention.category === filterCategory;
    const matchesStage = filterStage === 'all' || invention.stage === filterStage;
    
    return matchesSearch && matchesCategory && matchesStage;
  });

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

  const getConfidentialityColor = (level: string) => {
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
          <h3 className="text-xl font-semibold">Invention Organizer</h3>
          <p className="text-slate-600">Manage and track your innovation pipeline</p>
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
          <Plus className="w-4 h-4 mr-2" />
          New Invention
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search inventions, descriptions, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="hardware">Hardware</SelectItem>
                <SelectItem value="software">Software</SelectItem>
                <SelectItem value="process">Process</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="biotech">Biotech</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStage} onValueChange={setFilterStage}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stages</SelectItem>
                <SelectItem value="concept">Concept</SelectItem>
                <SelectItem value="development">Development</SelectItem>
                <SelectItem value="prototype">Prototype</SelectItem>
                <SelectItem value="testing">Testing</SelectItem>
                <SelectItem value="patent_pending">Patent Pending</SelectItem>
                <SelectItem value="patented">Patented</SelectItem>
                <SelectItem value="commercialized">Commercialized</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Inventions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredInventions.map((invention) => (
          <Card key={invention.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{invention.title}</CardTitle>
                  <CardDescription className="mt-2">{invention.description}</CardDescription>
                </div>
                <Badge className={getConfidentialityColor(invention.confidentialityLevel)}>
                  {invention.confidentialityLevel.replace('_', ' ')}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Status and Priority */}
              <div className="flex items-center gap-2">
                <Badge className={getStageColor(invention.stage)}>
                  {invention.stage.replace('_', ' ')}
                </Badge>
                <Badge className={getPriorityColor(invention.priority)}>
                  {invention.priority}
                </Badge>
                <Badge variant="outline">
                  {invention.category}
                </Badge>
              </div>

              {/* Tags */}
              {invention.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {invention.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4 pt-2 border-t">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium">{invention.marketPotential}%</span>
                  </div>
                  <p className="text-xs text-slate-500">Market Potential</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <DollarSign className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium">${(invention.developmentCost / 1000).toFixed(0)}K</span>
                  </div>
                  <p className="text-xs text-slate-500">Dev Cost</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Clock className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium">{invention.timeToMarket}m</span>
                  </div>
                  <p className="text-xs text-slate-500">Time to Market</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1">
                  View Details
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  Edit
                </Button>
                <Button size="sm" variant="outline">
                  <Users className="w-4 h-4" />
                </Button>
              </div>

              {/* Timestamps */}
              <div className="text-xs text-slate-500 pt-2 border-t">
                Created: {invention.createdAt.toLocaleDateString()} • 
                Modified: {invention.lastModified.toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredInventions.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Lightbulb className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-600 mb-2">No inventions found</h3>
            <p className="text-slate-500 mb-4">
              {searchTerm || filterCategory !== 'all' || filterStage !== 'all' 
                ? 'Try adjusting your search criteria'
                : 'Start by creating your first invention'
              }
            </p>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
              <Plus className="w-4 h-4 mr-2" />
              Create Invention
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
