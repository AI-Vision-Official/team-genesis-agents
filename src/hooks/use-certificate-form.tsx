
import { useState } from 'react';
import type { CertificateCategory, CertificateType } from '@/types/education';

export interface CertificateFormData {
  title: string;
  issuingOrganization: string;
  issueDate: string;
  expirationDate: string;
  verificationNumber: string;
  category: CertificateCategory | '';
  type: CertificateType | '';
  description: string;
  skills: string[];
}

export const useCertificateForm = () => {
  const [formData, setFormData] = useState<CertificateFormData>({
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

  const handleInputChange = (field: keyof CertificateFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
  };

  return {
    formData,
    handleInputChange,
    resetForm,
  };
};
