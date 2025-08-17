
import { Answer, Results } from '../types/assessment';
import { correctAnswers } from '../data/questions';

export const calculateResults = (answers: Answer[]): Results => {
  // Separate answers by category
  const psychometricAnswers = answers.filter(a => a.questionId.startsWith('p'));
  const technicalAnswers = answers.filter(a => a.questionId.startsWith('t'));
  const wiscarAnswers = answers.filter(a => a.questionId.startsWith('w'));

  // Calculate psychometric score (average of normalized scores)
  const psychometricScore = Math.round(
    psychometricAnswers.reduce((sum, answer) => sum + answer.score, 0) / psychometricAnswers.length
  );

  // Calculate technical score (mix of correct answers and self-assessment)
  let technicalScore = 0;
  technicalAnswers.forEach(answer => {
    if (correctAnswers[answer.questionId] !== undefined) {
      // Multiple choice questions - score based on correctness
      technicalScore += answer.value === correctAnswers[answer.questionId] ? 25 : 0;
    } else {
      // Slider questions - normalize to 0-25 scale
      technicalScore += (answer.score / 100) * 25;
    }
  });
  technicalScore = Math.round(technicalScore);

  // Calculate WISCAR scores
  const wiscarScores = {
    will: Math.round((wiscarAnswers.find(a => a.questionId === 'w1')?.score || 0) * 20),
    interest: Math.round((wiscarAnswers.find(a => a.questionId === 'w2')?.score || 0) * 20),
    skill: Math.round((wiscarAnswers.find(a => a.questionId === 'w3')?.score || 0)),
    cognitive: Math.round(technicalScore * 0.8), // Based on technical performance
    abilityToLearn: Math.round((wiscarAnswers.find(a => a.questionId === 'w4')?.score || 0) * 20),
    realWorld: Math.round((wiscarAnswers.find(a => a.questionId === 'w5')?.score || 0) * 20)
  };

  // Calculate overall score
  const overallScore = Math.round(
    (psychometricScore + technicalScore + Object.values(wiscarScores).reduce((sum, score) => sum + score, 0) / 6) / 3
  );

  // Determine recommendation
  let recommendation: 'yes' | 'maybe' | 'no';
  let confidence: number;

  if (overallScore >= 80) {
    recommendation = 'yes';
    confidence = Math.min(95, overallScore + 10);
  } else if (overallScore >= 60) {
    recommendation = 'maybe';
    confidence = overallScore;
  } else {
    recommendation = 'no';
    confidence = Math.max(20, overallScore - 10);
  }

  // Generate insights and recommendations
  const insights = generateInsights(psychometricScore, technicalScore, wiscarScores, overallScore);
  const nextSteps = generateNextSteps(recommendation, technicalScore, wiscarScores);
  const alternativeRoles = generateAlternatives(recommendation, psychometricScore, wiscarScores);

  return {
    psychometricScore,
    technicalScore,
    wiscarScores,
    overallScore,
    recommendation,
    confidence,
    insights,
    nextSteps,
    alternativeRoles
  };
};

const generateInsights = (psychometric: number, technical: number, wiscar: any, overall: number): string[] => {
  const insights = [];

  if (psychometric >= 80) {
    insights.push("Your psychological profile strongly aligns with assessment design work - you show excellent attention to detail and structured thinking.");
  } else if (psychometric >= 60) {
    insights.push("You have a good foundation for assessment work, with solid analytical thinking and attention to quality.");
  } else {
    insights.push("Your strengths may be better suited to more creative or interpersonal roles, though assessment design skills can be developed.");
  }

  if (technical >= 70) {
    insights.push("You demonstrate strong technical knowledge of assessment principles and best practices.");
  } else if (technical >= 50) {
    insights.push("You have basic technical understanding but would benefit from additional training in assessment methodology.");
  } else {
    insights.push("Technical assessment skills will need significant development before pursuing this career path.");
  }

  if (wiscar.interest >= 80) {
    insights.push("Your genuine interest in assessment design is evident and will drive your success in this field.");
  }

  return insights;
};

const generateNextSteps = (recommendation: string, technical: number, wiscar: any): string[] => {
  const steps = [];

  if (recommendation === 'yes') {
    steps.push("Start building a portfolio of sample assessments in your area of interest");
    steps.push("Consider pursuing certification in instructional design or educational measurement");
    steps.push("Connect with assessment designers in your network or through professional associations");
  } else if (recommendation === 'maybe') {
    if (technical < 70) {
      steps.push("Study Bloom's Taxonomy and assessment validity principles");
      steps.push("Take an online course in educational measurement or instructional design");
    }
    if (wiscar.skill < 60) {
      steps.push("Practice writing different types of assessment questions");
      steps.push("Learn to use assessment authoring tools like Articulate or H5P");
    }
    steps.push("Shadow or volunteer with an assessment designer to gain hands-on experience");
  } else {
    steps.push("Explore related roles that leverage your strengths");
    steps.push("Consider roles in training delivery or content creation as stepping stones");
    steps.push("Develop foundational skills in instructional design before reconsidering assessment design");
  }

  return steps;
};

const generateAlternatives = (recommendation: string, psychometric: number, wiscar: any): string[] => {
  if (recommendation === 'yes') return [];

  const alternatives = [];

  if (wiscar.interest >= 70 && psychometric >= 60) {
    alternatives.push("Instructional Designer - broader content creation with analytical elements");
  }
  
  if (wiscar.realWorld >= 70) {
    alternatives.push("Learning & Development Specialist - focus on training delivery and learner support");
  }

  if (psychometric >= 70) {
    alternatives.push("Quality Assurance Analyst - detail-oriented work in other domains");
  }

  alternatives.push("Training Facilitator - leverage communication skills while staying in education");
  alternatives.push("LMS Administrator - technical focus on learning systems");

  return alternatives;
};
