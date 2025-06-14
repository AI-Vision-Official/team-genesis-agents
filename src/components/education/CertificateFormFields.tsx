
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { CertificateCategory, CertificateType } from '@/types/education';
import type { CertificateFormData } from '@/hooks/use-certificate-form';

interface CertificateFormFieldsProps {
  formData: CertificateFormData;
  onInputChange: (field: keyof CertificateFormData, value: any) => void;
}

export const CertificateFormFields = ({ formData, onInputChange }: CertificateFormFieldsProps) => {
  const categories: CertificateCategory[] = [
    'agriculture', 'animals', 'beauty', 'communication', 'economy', 'education',
    'general', 'hobby', 'horeca', 'humanitarian', 'it', 'linguistics', 'medical',
    'medical_autism', 'medical_ce', 'medical_first_aid', 'music', 'nature',
    'nutrition', 'photography', 'psychology', 'religion', 'religion_ordination',
    'safety', 'safety_fire', 'spiritual', 'spiritual_reiki', 'sports',
    'technology', 'transportation', 'transportation_drone', 'travel',
    'university', 'wildlife'
  ];

  const types: CertificateType[] = [
    'diploma', 'certificate', 'license', 'badge', 'award', 'completion'
  ];

  const formatCategoryName = (category: string) => {
    return category
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <>
      {/* Basic Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title" className="dark:text-slate-200">Certificate/Diploma Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => onInputChange('title', e.target.value)}
            placeholder="e.g., Bachelor of Computer Science"
            required
            className="dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100"
          />
        </div>
        
        <div>
          <Label htmlFor="organization" className="dark:text-slate-200">Issuing Organization *</Label>
          <Input
            id="organization"
            value={formData.issuingOrganization}
            onChange={(e) => onInputChange('issuingOrganization', e.target.value)}
            placeholder="e.g., Stanford University"
            required
            className="dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100"
          />
        </div>
      </div>

      {/* Type and Category */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="type" className="dark:text-slate-200">Type *</Label>
          <Select
            value={formData.type}
            onValueChange={(value) => onInputChange('type', value)}
          >
            <SelectTrigger className="dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent className="dark:bg-slate-700 dark:border-slate-600">
              {types.map((type) => (
                <SelectItem key={type} value={type} className="dark:text-slate-100 dark:focus:bg-slate-600">
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="category" className="dark:text-slate-200">Category *</Label>
          <Select
            value={formData.category}
            onValueChange={(value) => onInputChange('category', value)}
          >
            <SelectTrigger className="dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="dark:bg-slate-700 dark:border-slate-600 max-h-60">
              {categories.map((category) => (
                <SelectItem key={category} value={category} className="dark:text-slate-100 dark:focus:bg-slate-600">
                  {formatCategoryName(category)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="issueDate" className="dark:text-slate-200">Issue Date *</Label>
          <Input
            id="issueDate"
            type="date"
            value={formData.issueDate}
            onChange={(e) => onInputChange('issueDate', e.target.value)}
            required
            className="dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100"
          />
        </div>
        
        <div>
          <Label htmlFor="expirationDate" className="dark:text-slate-200">Expiration Date</Label>
          <Input
            id="expirationDate"
            type="date"
            value={formData.expirationDate}
            onChange={(e) => onInputChange('expirationDate', e.target.value)}
            className="dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100"
          />
        </div>

        <div className="sm:col-span-2 lg:col-span-1">
          <Label htmlFor="verificationNumber" className="dark:text-slate-200">Verification Number</Label>
          <Input
            id="verificationNumber"
            value={formData.verificationNumber}
            onChange={(e) => onInputChange('verificationNumber', e.target.value)}
            placeholder="e.g., CERT-123456"
            className="dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <Label htmlFor="description" className="dark:text-slate-200">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => onInputChange('description', e.target.value)}
          placeholder="Additional details about the certificate or achievement..."
          rows={3}
          className="dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100 resize-none"
        />
      </div>
    </>
  );
};
