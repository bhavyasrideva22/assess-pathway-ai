
import { useState } from 'react';
import { assessmentQuestions } from '../data/questions';
import { calculateResults } from '../utils/scoring';
import { AssessmentState, Answer, Results } from '../types/assessment';
import AssessmentWelcome from '../components/AssessmentWelcome';
import AssessmentProgress from '../components/AssessmentProgress';
import QuestionCard from '../components/QuestionCard';
import AssessmentResults from '../components/AssessmentResults';

const Index = () => {
  const [assessmentState, setAssessmentState] = useState<AssessmentState>({
    currentSection: 0,
    currentQuestion: 0,
    answers: [],
    isComplete: false
  });
  
  const [results, setResults] = useState<Results | null>(null);
  const [hasStarted, setHasStarted] = useState(false);

  const sections = [
    { name: 'Psychometric Analysis', questions: assessmentQuestions.filter(q => q.category === 'psychometric') },
    { name: 'Technical Assessment', questions: assessmentQuestions.filter(q => q.category === 'technical') },
    { name: 'WISCAR Evaluation', questions: assessmentQuestions.filter(q => q.category === 'wiscar') }
  ];

  const currentSection = sections[assessmentState.currentSection];
  const currentQuestion = currentSection?.questions[assessmentState.currentQuestion];
  const totalQuestions = assessmentQuestions.length;
  const completedQuestions = assessmentState.answers.length;

  const startAssessment = () => {
    setHasStarted(true);
  };

  const handleAnswer = (answer: Answer) => {
    const newAnswers = [...assessmentState.answers, answer];
    
    // Move to next question
    setTimeout(() => {
      let newCurrentQuestion = assessmentState.currentQuestion + 1;
      let newCurrentSection = assessmentState.currentSection;

      // Check if we need to move to next section
      if (newCurrentQuestion >= currentSection.questions.length) {
        newCurrentQuestion = 0;
        newCurrentSection += 1;
      }

      // Check if assessment is complete
      if (newCurrentSection >= sections.length) {
        const finalResults = calculateResults(newAnswers);
        setResults(finalResults);
        setAssessmentState(prev => ({
          ...prev,
          answers: newAnswers,
          isComplete: true
        }));
      } else {
        setAssessmentState(prev => ({
          ...prev,
          currentSection: newCurrentSection,
          currentQuestion: newCurrentQuestion,
          answers: newAnswers
        }));
      }
    }, 1500);
  };

  const restartAssessment = () => {
    setAssessmentState({
      currentSection: 0,
      currentQuestion: 0,
      answers: [],
      isComplete: false
    });
    setResults(null);
    setHasStarted(false);
  };

  if (!hasStarted) {
    return <AssessmentWelcome onStart={startAssessment} />;
  }

  if (assessmentState.isComplete && results) {
    return <AssessmentResults results={results} onRestart={restartAssessment} />;
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-body">Loading assessment...</p>
        </div>
      </div>
    );
  }

  const isLastQuestion = completedQuestions === totalQuestions - 1;

  return (
    <div className="min-h-screen p-4 py-8">
      <div className="max-w-4xl mx-auto">
        <AssessmentProgress
          currentQuestion={completedQuestions + 1}
          totalQuestions={totalQuestions}
          currentSection={currentSection.name}
        />
        
        <QuestionCard
          question={currentQuestion}
          onAnswer={handleAnswer}
          isLastQuestion={isLastQuestion}
        />
      </div>
    </div>
  );
};

export default Index;
