
import { Progress } from '@/components/ui/progress';

interface AssessmentProgressProps {
  currentQuestion: number;
  totalQuestions: number;
  currentSection: string;
}

const AssessmentProgress = ({ currentQuestion, totalQuestions, currentSection }: AssessmentProgressProps) => {
  const progressPercentage = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-semibold text-hero">{currentSection}</h2>
          <p className="text-sm text-body">Question {currentQuestion} of {totalQuestions}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-hero">{Math.round(progressPercentage)}%</p>
          <p className="text-xs text-body">Complete</p>
        </div>
      </div>
      <Progress value={progressPercentage} className="h-3" />
    </div>
  );
};

export default AssessmentProgress;
