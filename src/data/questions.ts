
import { Question } from '../types/assessment';

export const assessmentQuestions: Question[] = [
  // Psychometric Questions
  {
    id: 'p1',
    text: 'I enjoy breaking down complex concepts into measurable, testable parts.',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'interest',
    scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }
  },
  {
    id: 'p2',
    text: 'Even when tasks are tedious, I strive to ensure assessments are fair and unbiased.',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'motivation',
    scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }
  },
  {
    id: 'p3',
    text: 'I prefer designing systems that have clear, measurable outcomes.',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'cognitive-preference',
    scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }
  },
  {
    id: 'p4',
    text: 'I consistently double-check my work to ensure accuracy and precision.',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'personality',
    scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }
  },
  {
    id: 'p5',
    text: 'I find satisfaction in analyzing data to understand learning patterns.',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'interest',
    scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }
  },

  // Technical Questions
  {
    id: 't1',
    text: 'Which assessment type is most appropriate for measuring a learner\'s ability to apply knowledge in real-world scenarios?',
    type: 'multiple-choice',
    category: 'technical',
    subcategory: 'assessment-types',
    options: [
      'Multiple choice questions',
      'Performance-based assessments',
      'True/false questions', 
      'Fill-in-the-blank questions'
    ]
  },
  {
    id: 't2',
    text: 'What is the primary difference between formative and summative assessment?',
    type: 'multiple-choice',
    category: 'technical',
    subcategory: 'assessment-principles',
    options: [
      'Formative is for grading, summative is for feedback',
      'Formative provides ongoing feedback, summative evaluates final learning',
      'Formative is digital, summative is paper-based',
      'There is no significant difference'
    ]
  },
  {
    id: 't3',
    text: 'Identify the flaw in this multiple-choice question: "What is the best programming language?" A) Python B) JavaScript C) Java D) C++',
    type: 'multiple-choice',
    category: 'technical',
    subcategory: 'question-writing',
    options: [
      'Too many options provided',
      'The question is subjective and lacks context',
      'Options are not parallel in structure',
      'Nothing wrong with this question'
    ]
  },
  {
    id: 't4',
    text: 'Rate your current familiarity with Bloom\'s Taxonomy',
    type: 'slider',
    category: 'technical',
    subcategory: 'prerequisite-knowledge',
    scale: { min: 0, max: 100, labels: ['Never heard of it', 'Basic understanding', 'Can apply it effectively'] }
  },

  // WISCAR Questions
  {
    id: 'w1',
    text: 'I rework assessment content repeatedly until it\'s completely clear and properly aligned with learning objectives.',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'will',
    scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }
  },
  {
    id: 'w2',
    text: 'I genuinely enjoy analyzing how different question types assess various learning outcomes.',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'interest',
    scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }
  },
  {
    id: 'w3',
    text: 'How would you rate your current skill in writing clear, unbiased assessment questions?',
    type: 'slider',
    category: 'wiscar',
    subcategory: 'skill',
    scale: { min: 0, max: 100, labels: ['Beginner', 'Intermediate', 'Advanced'] }
  },
  {
    id: 'w4',
    text: 'I actively seek and implement feedback to improve my assessment designs.',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'ability-to-learn',
    scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }
  },
  {
    id: 'w5',
    text: 'Which daily activity sounds most appealing to you?',
    type: 'multiple-choice',
    category: 'wiscar',
    subcategory: 'real-world',
    options: [
      'Analyzing test data to identify improvement opportunities',
      'Writing and refining assessment questions',
      'Collaborating with subject matter experts on content',
      'Researching best practices in educational measurement'
    ]
  }
];

export const correctAnswers: Record<string, number> = {
  't1': 1, // Performance-based assessments
  't2': 1, // Formative provides ongoing feedback
  't3': 1, // Question is subjective
  'w5': 3  // All options are valid, scoring based on alignment
};
