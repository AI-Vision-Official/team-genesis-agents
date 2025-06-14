
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Users, 
  Plus, 
  Search, 
  Mail,
  Phone,
  Building,
  Shield,
  Calendar,
  Star,
  MessageSquare
} from 'lucide-react';
import type { Contact } from '@/types/invention';

interface ContactManagerProps {
  contacts: Contact[];
}

export const ContactManager = ({ contacts }: ContactManagerProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterRelationship, setFilterRelationship] = useState('all');

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (contact.company && contact.company.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesRole = filterRole === 'all' || contact.role === filterRole;
    const matchesRelationship = filterRelationship === 'all' || contact.relationship === filterRelationship;
    
    return matchesSearch && matchesRole && matchesRelationship;
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'collaborator': return 'bg-blue-100 text-blue-800';
      case 'investor': return 'bg-green-100 text-green-800';
      case 'lawyer': return 'bg-purple-100 text-purple-800';
      case 'partner': return 'bg-orange-100 text-orange-800';
      case 'manufacturer': return 'bg-indigo-100 text-indigo-800';
      case 'advisor': return 'bg-teal-100 text-teal-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRelationshipColor = (relationship: string) => {
    switch (relationship) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'potential': return 'bg-yellow-100 text-yellow-800';
      case 'former': return 'bg-gray-100 text-gray-800';
      case 'blacklisted': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrustStars = (trustLevel: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${i < Math.floor(trustLevel / 2) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Contact & Partner Manager</h3>
          <p className="text-slate-600">Manage your professional network and collaborators</p>
        </div>
        <Button className="bg-gradient-to-r from-green-600 to-blue-600">
          <Plus className="w-4 h-4 mr-2" />
          Add Contact
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
                  placeholder="Search contacts by name, email, or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterRole} onValueChange={setFilterRole}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="collaborator">Collaborator</SelectItem>
                <SelectItem value="investor">Investor</SelectItem>
                <SelectItem value="lawyer">Lawyer</SelectItem>
                <SelectItem value="partner">Partner</SelectItem>
                <SelectItem value="manufacturer">Manufacturer</SelectItem>
                <SelectItem value="advisor">Advisor</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterRelationship} onValueChange={setFilterRelationship}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Relationship" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Relationships</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="potential">Potential</SelectItem>
                <SelectItem value="former">Former</SelectItem>
                <SelectItem value="blacklisted">Blacklisted</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredContacts.map((contact) => (
          <Card key={contact.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{contact.name}</CardTitle>
                  {contact.company && (
                    <div className="flex items-center gap-1 mt-1">
                      <Building className="w-4 h-4 text-slate-500" />
                      <span className="text-sm text-slate-600">{contact.company}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  {getTrustStars(contact.trustLevel)}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Role and Relationship */}
              <div className="flex items-center gap-2">
                <Badge className={getRoleColor(contact.role)}>
                  {contact.role}
                </Badge>
                <Badge className={getRelationshipColor(contact.relationship)}>
                  {contact.relationship}
                </Badge>
              </div>

              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-500" />
                  <span className="text-sm text-slate-600">{contact.email}</span>
                </div>
                {contact.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-600">{contact.phone}</span>
                  </div>
                )}
              </div>

              {/* NDA Status */}
              <div className="flex items-center justify-between p-2 bg-slate-50 rounded">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-slate-500" />
                  <span className="text-sm">NDA Status</span>
                </div>
                <Badge className={contact.ndaSigned ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                  {contact.ndaSigned ? 'Signed' : 'Not Signed'}
                </Badge>
              </div>

              {/* Specializations */}
              {contact.specializations.length > 0 && (
                <div>
                  <p className="text-xs text-slate-500 mb-1">Specializations:</p>
                  <div className="flex flex-wrap gap-1">
                    {contact.specializations.map((spec, index) => (
                      <Badge key={index} variant="secondary">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              {contact.notes && (
                <div className="p-2 bg-slate-50 rounded">
                  <p className="text-xs text-slate-500 mb-1">Notes:</p>
                  <p className="text-sm text-slate-700 line-clamp-2">{contact.notes}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Mail className="w-4 h-4 mr-1" />
                  Email
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <MessageSquare className="w-4 h-4 mr-1" />
                  Message
                </Button>
                <Button size="sm" variant="outline">
                  Edit
                </Button>
              </div>

              {/* Last Contact */}
              <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>Last contact: {contact.lastContact.toLocaleDateString()}</span>
                </div>
                <span>Trust: {contact.trustLevel}/10</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredContacts.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-600 mb-2">No contacts found</h3>
            <p className="text-slate-500 mb-4">
              {searchTerm || filterRole !== 'all' || filterRelationship !== 'all' 
                ? 'Try adjusting your search criteria'
                : 'Start building your professional network'
              }
            </p>
            <Button className="bg-gradient-to-r from-green-600 to-blue-600">
              <Plus className="w-4 h-4 mr-2" />
              Add Contact
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
