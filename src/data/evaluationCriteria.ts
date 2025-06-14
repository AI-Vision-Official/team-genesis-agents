
import { ReviewCriteria } from '@/types/evaluation';

export const DEFAULT_REVIEW_CRITERIA: ReviewCriteria[] = [
  {
    id: 'output_quality',
    name: 'Output Quality',
    description: 'Evaluates the accuracy, completeness, and usefulness of the work output',
    weight: 0.3,
    applicableTaskTypes: ['all'],
    evaluationPoints: [
      {
        id: 'accuracy',
        description: 'How accurate and error-free is the output?',
        maxScore: 10,
        minScore: 1
      },
      {
        id: 'completeness',
        description: 'Does the output address all requirements?',
        maxScore: 10,
        minScore: 1
      },
      {
        id: 'usefulness',
        description: 'How valuable is this output for achieving the task goal?',
        maxScore: 10,
        minScore: 1
      }
    ]
  },
  {
    id: 'process_efficiency',
    name: 'Process Efficiency',
    description: 'Evaluates how well the agent managed time, resources, and methodology',
    weight: 0.25,
    applicableTaskTypes: ['all'],
    evaluationPoints: [
      {
        id: 'time_management',
        description: 'How efficiently was time utilized?',
        maxScore: 10,
        minScore: 1
      },
      {
        id: 'resource_optimization',
        description: 'How well were available resources used?',
        maxScore: 10,
        minScore: 1
      },
      {
        id: 'methodology',
        description: 'How appropriate was the chosen approach?',
        maxScore: 10,
        minScore: 1
      }
    ]
  },
  {
    id: 'collaboration',
    name: 'Collaboration & Communication',
    description: 'Evaluates teamwork, communication, and support provided to other agents',
    weight: 0.25,
    applicableTaskTypes: ['all'],
    evaluationPoints: [
      {
        id: 'communication_clarity',
        description: 'How clear and effective was communication?',
        maxScore: 10,
        minScore: 1
      },
      {
        id: 'team_support',
        description: 'How well did the agent support team members?',
        maxScore: 10,
        minScore: 1
      },
      {
        id: 'knowledge_sharing',
        description: 'How effectively did the agent share insights and learnings?',
        maxScore: 10,
        minScore: 1
      }
    ]
  },
  {
    id: 'innovation',
    name: 'Innovation & Adaptability',
    description: 'Evaluates creative problem-solving and adaptation to challenges',
    weight: 0.2,
    applicableTaskTypes: ['all'],
    evaluationPoints: [
      {
        id: 'creative_solutions',
        description: 'How innovative were the solutions proposed?',
        maxScore: 10,
        minScore: 1
      },
      {
        id: 'adaptability',
        description: 'How well did the agent adapt to changing requirements?',
        maxScore: 10,
        minScore: 1
      },
      {
        id: 'continuous_improvement',
        description: 'How well did the agent apply previous learnings?',
        maxScore: 10,
        minScore: 1
      }
    ]
  }
];

// Specialized criteria for specific task types
export const TASK_SPECIFIC_CRITERIA: Record<string, ReviewCriteria[]> = {
  'data_analysis': [
    {
      id: 'data_accuracy',
      name: 'Data Analysis Accuracy',
      description: 'Evaluates the correctness of data interpretation and analysis',
      weight: 0.4,
      applicableTaskTypes: ['data_analysis'],
      evaluationPoints: [
        {
          id: 'statistical_validity',
          description: 'Are the statistical methods appropriate and correctly applied?',
          maxScore: 10,
          minScore: 1
        },
        {
          id: 'insight_quality',
          description: 'How valuable and actionable are the insights generated?',
          maxScore: 10,
          minScore: 1
        }
      ]
    }
  ],
  'content_creation': [
    {
      id: 'content_quality',
      name: 'Content Quality',
      description: 'Evaluates the quality and engagement of created content',
      weight: 0.35,
      applicableTaskTypes: ['content_creation'],
      evaluationPoints: [
        {
          id: 'engagement_potential',
          description: 'How likely is this content to engage the target audience?',
          maxScore: 10,
          minScore: 1
        },
        {
          id: 'brand_alignment',
          description: 'How well does the content align with brand guidelines?',
          maxScore: 10,
          minScore: 1
        }
      ]
    }
  ]
};
