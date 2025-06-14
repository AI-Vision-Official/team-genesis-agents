
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FileText, 
  Plus, 
  Calendar,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';
import type { PatentApplication } from '@/types/invention';

interface PatentTrackerProps {
  patents: PatentApplication[];
}

export const PatentTracker = ({ patents }: PatentTrackerProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'filed': return 'bg-blue-100 text-blue-800';
      case 'under_review': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'abandoned': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDeadlineUrgency = (dueDate: Date) => {
    const today = new Date();
    const daysUntil = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntil < 0) return 'overdue';
    if (daysUntil <= 7) return 'urgent';
    if (daysUntil <= 30) return 'soon';
    return 'normal';
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'urgent': return 'bg-orange-100 text-orange-800';
      case 'soon': return 'bg-yellow-100 text-yellow-800';
      case 'normal': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Patent Tracker</h3>
          <p className="text-slate-600">Monitor patent applications and deadlines</p>
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
          <Plus className="w-4 h-4 mr-2" />
          New Application
        </Button>
      </div>

      {/* Patent Applications */}
      <div className="space-y-4">
        {patents.map((patent) => (
          <Card key={patent.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{patent.title}</CardTitle>
                  {patent.applicationNumber && (
                    <CardDescription>Application: {patent.applicationNumber}</CardDescription>
                  )}
                </div>
                <Badge className={getStatusColor(patent.status)}>
                  {patent.status.replace('_', ' ')}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Key Info */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-slate-500">Filing Date</p>
                  <p className="font-medium">{patent.filingDate?.toLocaleDateString() || 'Not filed'}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Jurisdictions</p>
                  <p className="font-medium">{patent.jurisdiction.join(', ')}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Attorney</p>
                  <p className="font-medium">{patent.attorney || 'Not assigned'}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Total Cost</p>
                  <p className="font-medium">${patent.cost.toLocaleString()}</p>
                </div>
              </div>

              {/* Deadlines */}
              {patent.deadlines.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Upcoming Deadlines
                  </h4>
                  <div className="space-y-2">
                    {patent.deadlines.map((deadline) => {
                      const urgency = getDeadlineUrgency(deadline.dueDate);
                      return (
                        <div key={deadline.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium">{deadline.description}</p>
                            <p className="text-sm text-slate-600">Type: {deadline.type.replace('_', ' ')}</p>
                          </div>
                          <div className="text-right">
                            <Badge className={getUrgencyColor(urgency)}>
                              {deadline.dueDate.toLocaleDateString()}
                            </Badge>
                            {deadline.cost && (
                              <p className="text-sm text-slate-600 mt-1">${deadline.cost}</p>
                            )}
                          </div>
                          <div className="ml-4">
                            {deadline.completed ? (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : urgency === 'overdue' || urgency === 'urgent' ? (
                              <AlertTriangle className="w-5 h-5 text-red-600" />
                            ) : (
                              <Clock className="w-5 h-5 text-slate-400" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-2 border-t">
                <Button size="sm" variant="outline">
                  View Documents
                </Button>
                <Button size="sm" variant="outline">
                  Update Status
                </Button>
                <Button size="sm" variant="outline">
                  Add Deadline
                </Button>
                <Button size="sm" variant="outline">
                  Contact Attorney
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {patents.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-600 mb-2">No patent applications</h3>
            <p className="text-slate-500 mb-4">Start protecting your inventions with patent applications</p>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
              <Plus className="w-4 h-4 mr-2" />
              File New Application
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
