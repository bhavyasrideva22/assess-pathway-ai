
export interface Question {
  id: string;
  text: string;
  type: 'likert' | 'multiple-choice' | 'slider' | 'scenario';
  category: 'psychometric' | 'technical' | 'wiscar';
  subcategory: string;
  options?: string[];
  scale?: { min: number; max: number; labels: string[] };
}

export interface Answer {
  questionId: string;
  value: number | string;
  score: number;
}

export interface AssessmentState {
  currentSection: number;
  currentQuestion: number;
  answers: Answer[];
  isComplete: boolean;
}

export interface Results {
  psychometricScore: number;
  technicalScore: number;
  wiscarScores: {
    will: number;
    interest: number;
    skill: number;
    cognitive: number;
    abilityToLearn: number;
    realWorld: number;
  };
  overallScore: number;
  recommendation: 'yes' | 'maybe' | 'no';
  confidence: number;
  insights: string[];
  nextSteps: string[];
  alternativeRoles: string[];
}
