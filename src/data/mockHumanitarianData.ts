
import type { HumanitarianProject, CrisisAlert } from '@/types/humanitarian';

export const mockHumanitarianProjects: HumanitarianProject[] = [
  {
    id: '1',
    name: 'Community Education Initiative',
    description: 'Providing educational resources and literacy programs to underserved communities worldwide',
    status: 'active',
    phase: 'Implementation',
    startDate: new Date('2024-01-15'),
    targetDate: new Date('2024-12-31'),
    region: ['Kenya', 'Guatemala', 'Philippines'],
    languages: ['English', 'Swahili', 'Spanish', 'Tagalog'],
    priority: 'high',
    ethicsAlignment: 94,
    impact: {
      peopleHelped: 2840,
      regionsReached: 3,
      languagesServed: 4,
      storiesShared: 12,
      emotionalReach: 8500,
      educationalImpact: 2840
    },
    resources: {
      budget: 45000,
      spent: 28500,
      donations: [
        { id: '1', amount: 15000, currency: 'USD', donor: 'Anonymous', date: new Date(), purpose: 'Educational Materials', allocated: true },
        { id: '2', amount: 10000, currency: 'USD', donor: 'Local Community', date: new Date(), purpose: 'Teacher Training', allocated: true }
      ],
      materials: [
        { id: '1', type: 'Books', quantity: 500, value: 5000, source: 'Publisher Donation', allocated: true }
      ],
      transparency: {
        lastUpdated: new Date(),
        breakdown: [
          { category: 'Educational Materials', amount: 18000, percentage: 63 },
          { category: 'Teacher Training', amount: 8500, percentage: 30 },
          { category: 'Operations', amount: 2000, percentage: 7 }
        ]
      }
    },
    milestones: [
      { id: '1', title: 'Phase 1 Launch', description: 'Initial rollout in Kenya', dueDate: new Date('2024-03-01'), completed: true, completionDate: new Date('2024-02-28'), assignedTo: ['volunteer-1'] },
      { id: '2', title: 'Teacher Training Program', description: 'Train 50 local teachers', dueDate: new Date('2024-06-01'), completed: true, completionDate: new Date('2024-05-15'), assignedTo: ['volunteer-2'] },
      { id: '3', title: 'Expand to Guatemala', description: 'Launch program in second region', dueDate: new Date('2024-09-01'), completed: false, assignedTo: ['volunteer-3'] }
    ],
    volunteers: [
      { id: 'v1', name: 'Sarah Chen', type: 'human', skills: ['Education', 'Project Management'], availability: 'Full-time', currentTasks: ['Training coordination'] },
      { id: 'v2', name: 'Content Creator AI', type: 'ai', skills: ['Content Generation', 'Translation'], availability: '24/7', currentTasks: ['Material translation'] }
    ]
  }
];

export const mockCrisisAlerts: CrisisAlert[] = [
  {
    id: '1',
    type: 'natural_disaster',
    location: 'Philippines - Mindanao',
    severity: 'high',
    title: 'Typhoon Displacement Crisis',
    description: 'Typhoon has displaced thousands of families, immediate shelter and food assistance needed',
    affectedPopulation: 15000,
    urgency: 8,
    feasibility: 6,
    detectedAt: new Date(),
    suggestedActions: [
      'Coordinate with local NGOs for shelter setup',
      'Launch emergency donation campaign',
      'Deploy multilingual communication support',
      'Establish family reunification center'
    ],
    status: 'new'
  }
];
