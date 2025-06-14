
import type { Certificate, CertificateSummary, ExpirationAlert, Milestone } from '@/types/education';

export const mockCertificates: Certificate[] = [
  {
    id: '1',
    title: 'Machine Learning Specialization',
    issuingOrganization: 'Stanford University',
    issueDate: new Date('2023-12-15'),
    expirationDate: new Date('2025-12-15'),
    verificationNumber: 'STAN-ML-2023-456789',
    category: 'technology',
    type: 'certificate',
    status: 'active',
    description: 'Comprehensive course covering supervised learning, unsupervised learning, and deep learning.',
    skills: ['Machine Learning', 'Python', 'TensorFlow', 'Neural Networks'],
    fileUrl: '/certificates/ml-stanford.pdf',
    fileName: 'ml-specialization.pdf',
    fileSize: 2.4,
    createdAt: new Date('2023-12-16'),
    updatedAt: new Date('2023-12-16')
  },
  {
    id: '2',
    title: 'AWS Certified Solutions Architect',
    issuingOrganization: 'Amazon Web Services',
    issueDate: new Date('2023-11-20'),
    expirationDate: new Date('2026-11-20'),
    verificationNumber: 'AWS-SA-2023-123456',
    category: 'it',
    type: 'certificate',
    status: 'active',
    description: 'Professional-level certification for designing distributed applications on AWS.',
    skills: ['AWS', 'Cloud Architecture', 'EC2', 'S3', 'Lambda'],
    fileUrl: '/certificates/aws-sa.pdf',
    fileName: 'aws-solutions-architect.pdf',
    fileSize: 1.8,
    createdAt: new Date('2023-11-21'),
    updatedAt: new Date('2023-11-21')
  },
  {
    id: '3',
    title: 'Project Management Professional (PMP)',
    issuingOrganization: 'Project Management Institute',
    issueDate: new Date('2022-08-10'),
    expirationDate: new Date('2025-08-10'),
    verificationNumber: 'PMI-PMP-2022-789123',
    category: 'economy',
    type: 'certificate',
    status: 'expiring_soon',
    description: 'Globally recognized project management certification.',
    skills: ['Project Management', 'Agile', 'Risk Management', 'Leadership'],
    fileUrl: '/certificates/pmp.pdf',
    fileName: 'pmp-certificate.pdf',
    fileSize: 2.1,
    createdAt: new Date('2022-08-11'),
    updatedAt: new Date('2022-08-11')
  },
  {
    id: '4',
    title: 'Master of Business Administration',
    issuingOrganization: 'Harvard Business School',
    issueDate: new Date('2020-05-15'),
    category: 'university',
    type: 'diploma',
    status: 'active',
    description: 'Two-year MBA program focusing on strategic management and leadership.',
    skills: ['Strategic Management', 'Finance', 'Marketing', 'Operations'],
    fileUrl: '/certificates/mba-harvard.pdf',
    fileName: 'mba-diploma.pdf',
    fileSize: 3.2,
    createdAt: new Date('2020-05-16'),
    updatedAt: new Date('2020-05-16')
  },
  {
    id: '5',
    title: 'Google UX Design Certificate',
    issuingOrganization: 'Google',
    issueDate: new Date('2023-09-30'),
    category: 'photography',
    type: 'certificate',
    status: 'active',
    description: 'Professional certificate in user experience design.',
    skills: ['UX Design', 'Figma', 'User Research', 'Prototyping'],
    fileUrl: '/certificates/google-ux.pdf',
    fileName: 'google-ux-design.pdf',
    fileSize: 1.5,
    createdAt: new Date('2023-10-01'),
    updatedAt: new Date('2023-10-01')
  },
  {
    id: '6',
    title: 'Certified Information Systems Security Professional (CISSP)',
    issuingOrganization: '(ISC)² ',
    issueDate: new Date('2021-03-22'),
    expirationDate: new Date('2024-03-22'),
    verificationNumber: 'ISC2-CISSP-2021-456123',
    category: 'safety',
    type: 'certificate',
    status: 'expired',
    description: 'Advanced cybersecurity certification for experienced professionals.',
    skills: ['Cybersecurity', 'Risk Management', 'Security Architecture', 'Incident Response'],
    fileUrl: '/certificates/cissp.pdf',
    fileName: 'cissp-certificate.pdf',
    fileSize: 2.0,
    createdAt: new Date('2021-03-23'),
    updatedAt: new Date('2021-03-23')
  }
];

export const mockSummary: CertificateSummary = {
  totalCertificates: 156,
  activeCertificates: 142,
  expiredCertificates: 8,
  expiringSoon: 6,
  pendingRenewal: 4,
  categoryCounts: {
    agriculture: 3,
    animals: 7,
    beauty: 5,
    communication: 12,
    economy: 18,
    education: 15,
    general: 8,
    hobby: 9,
    horeca: 4,
    humanitarian: 6,
    it: 22,
    linguistics: 11,
    medical: 14,
    medical_autism: 2,
    medical_ce: 3,
    medical_first_aid: 5,
    music: 7,
    nature: 6,
    nutrition: 8,
    photography: 4,
    psychology: 9,
    religion: 3,
    religion_ordination: 1,
    safety: 12,
    safety_fire: 3,
    spiritual: 4,
    spiritual_reiki: 2,
    sports: 8,
    technology: 16,
    transportation: 5,
    transportation_drone: 2,
    travel: 4,
    university: 3,
    wildlife: 5
  },
  recentAchievements: mockCertificates.slice(0, 3),
  milestones: [
    {
      id: '1',
      title: 'Century Achievement',
      description: 'Reached 100 certificates milestone',
      achievedDate: new Date('2023-10-15'),
      certificateCount: 100,
      category: 'technology',
      isGuinnessWorthy: false
    },
    {
      id: '2',
      title: 'Technology Master',
      description: 'Earned 50 technology-related certificates',
      achievedDate: new Date('2023-11-20'),
      certificateCount: 50,
      category: 'technology',
      isGuinnessWorthy: true
    }
  ]
};

export const mockAlerts: ExpirationAlert[] = [
  {
    id: '1',
    certificateId: '3',
    certificate: mockCertificates[2], // PMP
    alertDate: new Date(),
    daysUntilExpiration: 45,
    acknowledged: false,
    reminderSent: true
  },
  {
    id: '2',
    certificateId: '2',
    certificate: mockCertificates[1], // AWS
    alertDate: new Date(),
    daysUntilExpiration: 365,
    acknowledged: false,
    reminderSent: false
  }
];

export const mockMilestones: Milestone[] = [
  {
    id: '1',
    title: 'First Century',
    description: 'Achieved your first 100 certificates - a remarkable milestone!',
    achievedDate: new Date('2023-08-15'),
    certificateCount: 100,
    isGuinnessWorthy: false
  },
  {
    id: '2',
    title: 'Technology Specialist',
    description: 'Earned 50+ certificates in technology, demonstrating exceptional expertise',
    achievedDate: new Date('2023-10-20'),
    certificateCount: 52,
    category: 'technology',
    isGuinnessWorthy: true
  },
  {
    id: '3',
    title: 'Learning Velocity Champion',
    description: 'Completed 25 certificates in a single month',
    achievedDate: new Date('2023-11-30'),
    certificateCount: 25,
    isGuinnessWorthy: true
  }
];
