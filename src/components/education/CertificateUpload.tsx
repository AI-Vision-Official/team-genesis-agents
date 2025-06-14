import { useState } from 'react';
import { Button } from '@/components/ui/button';
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Upload, X, Plus, FileText, Image } from 'lucide-react';
import type { CertificateCategory, CertificateType } from '@/types/education';

export const CertificateUpload = () => {
  const [formData, setFormData] = useState({
    title: '',
    issuingOrganization: '',
    issueDate: '',
    expirationDate: '',
    verificationNumber: '',
    category: '' as CertificateCategory | '',
    type: '' as CertificateType | '',
    description: '',
    skills: [] as string[],
  });

  const [currentSkill, setCurrentSkill] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

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

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addSkill = () => {
    if (currentSkill.trim() && !formData.skills.includes(currentSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, currentSkill.trim()]
      }));
      setCurrentSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Certificate data:', formData);
    console.log('Uploaded file:', uploadedFile);
    // Here you would typically save to your backend/database
  };

  const resetForm = () => {
    setFormData({
      title: '',
      issuingOrganization: '',
      issueDate: '',
      expirationDate: '',
      verificationNumber: '',
      category: '',
      type: '',
      description: '',
      skills: [],
    });
    setUploadedFile(null);
    setCurrentSkill('');
  };

  const formatCategoryName = (category: string) => {
    return category
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-4 sm:p-0">
      <Card className="dark:bg-slate-800 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl dark:text-slate-100">Add New Certificate or Diploma</CardTitle>
          <CardDescription className="dark:text-slate-300">
            Upload and manage your educational achievements and professional certifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title" className="dark:text-slate-200">Certificate/Diploma Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
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
                  onChange={(e) => handleInputChange('issuingOrganization', e.target.value)}
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
                  onValueChange={(value) => handleInputChange('type', value)}
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
                  onValueChange={(value) => handleInputChange('category', value)}
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
                  onChange={(e) => handleInputChange('issueDate', e.target.value)}
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
                  onChange={(e) => handleInputChange('expirationDate', e.target.value)}
                  className="dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100"
                />
              </div>

              <div className="sm:col-span-2 lg:col-span-1">
                <Label htmlFor="verificationNumber" className="dark:text-slate-200">Verification Number</Label>
                <Input
                  id="verificationNumber"
                  value={formData.verificationNumber}
                  onChange={(e) => handleInputChange('verificationNumber', e.target.value)}
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
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Additional details about the certificate or achievement..."
                rows={3}
                className="dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100 resize-none"
              />
            </div>

            {/* Skills */}
            <div>
              <Label htmlFor="skills" className="dark:text-slate-200">Skills & Competencies</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={currentSkill}
                  onChange={(e) => setCurrentSkill(e.target.value)}
                  placeholder="Add a skill..."
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                  className="dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100"
                />
                <Button type="button" onClick={addSkill} variant="outline" className="shrink-0">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="flex items-center gap-1 dark:bg-slate-600 dark:text-slate-100">
                    {skill}
                    <X 
                      className="w-3 h-3 cursor-pointer hover:text-red-500" 
                      onClick={() => removeSkill(skill)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            {/* File Upload */}
            <div>
              <Label className="dark:text-slate-200">Certificate File (PDF or Image)</Label>
              <div
                className={`border-2 border-dashed rounded-lg p-4 sm:p-6 text-center transition-colors ${
                  dragActive 
                    ? 'border-primary bg-primary/5' 
                    : 'border-gray-300 dark:border-slate-600 hover:border-gray-400 dark:hover:border-slate-500'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {uploadedFile ? (
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                    {uploadedFile.type.includes('pdf') ? (
                      <FileText className="w-8 h-8 text-red-600" />
                    ) : (
                      <Image className="w-8 h-8 text-blue-600" />
                    )}
                    <div className="text-center sm:text-left">
                      <p className="font-medium dark:text-slate-200">{uploadedFile.name}</p>
                      <p className="text-sm text-muted-foreground dark:text-slate-400">
                        {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setUploadedFile(null)}
                      className="mt-2 sm:mt-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Upload className="w-8 sm:w-12 h-8 sm:h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-base sm:text-lg font-medium dark:text-slate-200">Upload Certificate File</p>
                    <p className="text-sm text-muted-foreground dark:text-slate-400 mb-4">
                      Drag and drop your file here, or click to browse
                    </p>
                    <Input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <Button type="button" variant="outline" asChild>
                      <label htmlFor="file-upload" className="cursor-pointer">
                        Choose File
                      </label>
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button type="submit" className="flex-1">
                Save Certificate
              </Button>
              <Button type="button" variant="outline" onClick={resetForm} className="flex-1 sm:flex-none">
                Reset Form
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
