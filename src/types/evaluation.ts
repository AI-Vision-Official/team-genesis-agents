
export interface ReviewCriteria {
  id: string;
  name: string;
  description: string;
  weight: number; // 0-1, how important this criteria is
  applicableTaskTypes: string[];
  evaluationPoints: EvaluationPoint[];
}

export interface EvaluationPoint {
  id: string;
  description: string;
  maxScore: number;
  minScore: number;
}

export interface AgentReview {
  id: string;
  reviewerId: string;
  revieweeId: string;
  taskId: string;
  criteria: ReviewCriteria[];
  scores: ReviewScore[];
  feedback: ReviewFeedback;
  timestamp: Date;
  status: 'pending' | 'completed' | 'acknowledged';
}

export interface ReviewScore {
  criteriaId: string;
  evaluationPointId: string;
  score: number;
  justification: string;
}

export interface ReviewFeedback {
  strengths: string[];
  improvements: string[];
  specificSuggestions: string[];
  collaborationNotes: string;
  overallRating: number; // 1-10
}

export interface LearningAdjustment {
  id: string;
  agentId: string;
  basedOnReviewId: string;
  adjustmentType: 'behavior' | 'approach' | 'output_quality' | 'collaboration';
  description: string;
  implementationPlan: string;
  measurableGoals: string[];
  implemented: boolean;
  effectivenessMeasure?: number; // 0-1
}

export interface EvaluationSession {
  id: string;
  taskId: string;
  participantAgents: string[];
  reviewPairs: ReviewPair[];
  sessionType: 'peer_review' | 'team_evaluation' | 'self_assessment';
  startTime: Date;
  endTime?: Date;
  status: 'active' | 'completed' | 'analyzing';
  learningOutcomes: LearningAdjustment[];
}

export interface ReviewPair {
  reviewerId: string;
  revieweeId: string;
  status: 'assigned' | 'in_progress' | 'completed';
}
