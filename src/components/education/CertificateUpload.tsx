
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useCertificateForm } from '@/hooks/use-certificate-form';
import { CertificateFormFields } from './CertificateFormFields';
import { CertificateSkillsManager } from './CertificateSkillsManager';
import { CertificateFileUpload } from './CertificateFileUpload';

export const CertificateUpload = () => {
  const { formData, handleInputChange, resetForm } = useCertificateForm();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleSkillsChange = (skills: string[]) => {
    handleInputChange('skills', skills);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Certificate data:', formData);
    console.log('Uploaded file:', uploadedFile);
    // Here you would typically save to your backend/database
  };

  const handleReset = () => {
    resetForm();
    setUploadedFile(null);
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
            <CertificateFormFields 
              formData={formData} 
              onInputChange={handleInputChange} 
            />
            
            <CertificateSkillsManager 
              skills={formData.skills} 
              onSkillsChange={handleSkillsChange} 
            />

            <CertificateFileUpload 
              uploadedFile={uploadedFile} 
              onFileChange={setUploadedFile} 
            />

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button type="submit" className="flex-1">
                Save Certificate
              </Button>
              <Button type="button" variant="outline" onClick={handleReset} className="flex-1 sm:flex-none">
                Reset Form
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
