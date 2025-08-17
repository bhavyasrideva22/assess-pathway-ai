
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Question, Answer } from '../types/assessment';

interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: Answer) => void;
  isLastQuestion: boolean;
}

const QuestionCard = ({ question, onAnswer, isLastQuestion }: QuestionCardProps) => {
  const [selectedValue, setSelectedValue] = useState<number | string | null>(null);
  const [sliderValue, setSliderValue] = useState<number[]>([50]);

  const handleLikertAnswer = (value: number) => {
    setSelectedValue(value);
    const score = (value / 5) * 100; // Convert 1-5 scale to 0-100
    onAnswer({
      questionId: question.id,
      value,
      score
    });
  };

  const handleMultipleChoiceAnswer = (optionIndex: number) => {
    setSelectedValue(optionIndex);
    const score = optionIndex === 0 ? 100 : optionIndex === 1 ? 75 : optionIndex === 2 ? 50 : 25;
    onAnswer({
      questionId: question.id,
      value: optionIndex,
      score
    });
  };

  const handleSliderAnswer = () => {
    const value = sliderValue[0];
    setSelectedValue(value);
    onAnswer({
      questionId: question.id,
      value,
      score: value
    });
  };

  const renderQuestionInput = () => {
    switch (question.type) {
      case 'likert':
        return (
          <div className="space-y-3">
            {question.scale?.labels.map((label, index) => (
              <button
                key={index}
                onClick={() => handleLikertAnswer(index + 1)}
                className={`option-button ${selectedValue === index + 1 ? 'selected' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <span>{label}</span>
                  <div className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center">
                    {selectedValue === index + 1 && (
                      <div className="w-3 h-3 rounded-full bg-current"></div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        );

      case 'multiple-choice':
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => handleMultipleChoiceAnswer(index)}
                className={`option-button ${selectedValue === index ? 'selected' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  <div className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center">
                    {selectedValue === index && (
                      <div className="w-3 h-3 rounded-full bg-current"></div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        );

      case 'slider':
        return (
          <div className="space-y-6">
            <div className="px-4">
              <Slider
                value={sliderValue}
                onValueChange={setSliderValue}
                max={100}
                min={0}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-body mt-2">
                <span>{question.scale?.labels[0]}</span>
                <span className="font-medium text-hero">{sliderValue[0]}%</span>
                <span>{question.scale?.labels[2]}</span>
              </div>
            </div>
            <Button 
              onClick={handleSliderAnswer}
              className="w-full gradient-primary text-white"
              disabled={selectedValue !== null}
            >
              {selectedValue !== null ? 'Answer Recorded' : 'Confirm Answer'}
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="question-card animate-fadeInUp max-w-2xl mx-auto">
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4 text-hero leading-relaxed">
          {question.text}
        </h3>
      </div>
      
      {renderQuestionInput()}
      
      {selectedValue !== null && question.type !== 'slider' && (
        <div className="mt-6 p-4 bg-primary/10 rounded-xl border border-primary/20">
          <p className="text-sm text-hero font-medium">
            ✓ Answer recorded. {isLastQuestion ? 'Ready to see your results!' : 'Moving to next question...'}
          </p>
        </div>
      )}
    </Card>
  );
};

export default QuestionCard;
