
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Mail, Users, Shield, Plus } from 'lucide-react';
import type { Contact } from '@/types/invention';

interface InvestorOutreachProps {
  contacts: Contact[];
}

export const InvestorOutreach = ({ contacts }: InvestorOutreachProps) => {
  const getTrustColor = (level: number) => {
    if (level >= 8) return 'bg-green-100 text-green-800';
    if (level >= 6) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Investor Outreach</h3>
          <p className="text-slate-600">Manage investor relationships and funding opportunities</p>
        </div>
        <Button className="bg-gradient-to-r from-green-600 to-blue-600">
          <Plus className="w-4 h-4 mr-2" />
          Add Investor
        </Button>
      </div>

      {/* Investor Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {contacts.map((investor) => (
          <Card key={investor.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{investor.name}</CardTitle>
                  <CardDescription>{investor.company}</CardDescription>
                </div>
                <Badge className={getTrustColor(investor.trustLevel)}>
                  Trust: {investor.trustLevel}/10
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* NDA Status */}
              <div className="flex items-center justify-between p-2 bg-slate-50 rounded">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span className="text-sm">NDA Status</span>
                </div>
                <Badge className={investor.ndaSigned ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                  {investor.ndaSigned ? 'Signed' : 'Required'}
                </Badge>
              </div>

              {/* Specializations */}
              <div>
                <p className="text-sm text-slate-500 mb-1">Investment Focus:</p>
                <div className="flex flex-wrap gap-1">
                  {investor.specializations.map((spec, index) => (
                    <Badge key={index} variant="secondary">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Mail className="w-4 h-4 mr-1" />
                  Send Pitch
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Shield className="w-4 h-4 mr-1" />
                  Send NDA
                </Button>
              </div>

              <div className="text-xs text-slate-500 pt-2 border-t">
                Last contact: {investor.lastContact.toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {contacts.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <TrendingUp className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-600 mb-2">No investors in pipeline</h3>
            <p className="text-slate-500 mb-4">Start building relationships with potential investors</p>
            <Button className="bg-gradient-to-r from-green-600 to-blue-600">
              <Plus className="w-4 h-4 mr-2" />
              Add Investor
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
