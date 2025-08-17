
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Results } from '../types/assessment';
import { Brain, Target, TrendingUp, CheckCircle, AlertCircle, XCircle, BarChart3 } from 'lucide-react';
import RadarChart from './RadarChart';

interface AssessmentResultsProps {
  results: Results;
  onRestart: () => void;
}

const AssessmentResults = ({ results, onRestart }: AssessmentResultsProps) => {
  const getRecommendationIcon = () => {
    switch (results.recommendation) {
      case 'yes': return <CheckCircle className="w-8 h-8 text-green-400" />;
      case 'maybe': return <AlertCircle className="w-8 h-8 text-yellow-400" />;
      case 'no': return <XCircle className="w-8 h-8 text-red-400" />;
    }
  };

  const getRecommendationColor = () => {
    switch (results.recommendation) {
      case 'yes': return 'bg-green-500/20 border-green-500/30 text-green-100';
      case 'maybe': return 'bg-yellow-500/20 border-yellow-500/30 text-yellow-100';
      case 'no': return 'bg-red-500/20 border-red-500/30 text-red-100';
    }
  };

  const getRecommendationText = () => {
    switch (results.recommendation) {
      case 'yes': return 'Strong Fit - Pursue This Career';
      case 'maybe': return 'Potential Fit - Development Needed';
      case 'no': return 'Consider Alternative Paths';
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center animate-fadeInUp">
          <div className="inline-flex items-center justify-center w-16 h-16 gradient-primary rounded-2xl mb-4">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-2 text-hero">Your Assessment Results</h1>
          <p className="text-lg text-body">Comprehensive analysis of your fit for assessment design</p>
        </div>

        {/* Overall Recommendation */}
        <Card className={`assessment-card text-center animate-fadeInUp ${getRecommendationColor()}`} style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-center mb-4">
            {getRecommendationIcon()}
          </div>
          <h2 className="text-2xl font-bold mb-2">{getRecommendationText()}</h2>
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="text-center">
              <p className="text-3xl font-bold">{results.overallScore}%</p>
              <p className="text-sm opacity-80">Overall Score</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">{results.confidence}%</p>
              <p className="text-sm opacity-80">Confidence</p>
            </div>
          </div>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Detailed Scores */}
          <div className="space-y-6">
            <Card className="assessment-card animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-xl font-semibold mb-6 text-hero flex items-center">
                <Brain className="w-5 h-5 mr-2" />
                Score Breakdown
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-muted/10 rounded-xl">
                  <span className="font-medium text-hero">Psychometric Fit</span>
                  <Badge variant="secondary" className="text-lg px-3 py-1">
                    {results.psychometricScore}%
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-muted/10 rounded-xl">
                  <span className="font-medium text-hero">Technical Readiness</span>
                  <Badge variant="secondary" className="text-lg px-3 py-1">
                    {results.technicalScore}%
                  </Badge>
                </div>

                <div className="border-t border-border pt-4">
                  <h4 className="font-semibold mb-3 text-hero">WISCAR Dimensions</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(results.wiscarScores).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center text-sm">
                        <span className="capitalize text-body">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <span className="font-medium text-hero">{value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Insights */}
            <Card className="assessment-card animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
              <h3 className="text-xl font-semibold mb-4 text-hero flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Key Insights
              </h3>
              <div className="space-y-3">
                {results.insights.map((insight, index) => (
                  <div key={index} className="p-4 bg-muted/10 rounded-xl">
                    <p className="text-body leading-relaxed">{insight}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* WISCAR Radar Chart */}
          <div className="space-y-6">
            <Card className="assessment-card animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              <h3 className="text-xl font-semibold mb-6 text-hero text-center">WISCAR Analysis</h3>
              <RadarChart data={results.wiscarScores} />
            </Card>

            {/* Next Steps */}
            <Card className="assessment-card animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
              <h3 className="text-xl font-semibold mb-4 text-hero flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Recommended Next Steps
              </h3>
              <div className="space-y-3">
                {results.nextSteps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">{index + 1}</span>
                    </div>
                    <p className="text-body">{step}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Alternative Roles */}
        {results.alternativeRoles.length > 0 && (
          <Card className="assessment-card animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
            <h3 className="text-xl font-semibold mb-4 text-hero">Alternative Career Paths</h3>
            <p className="text-body mb-4">Based on your results, these roles might also be a great fit:</p>
            <div className="grid md:grid-cols-2 gap-4">
              {results.alternativeRoles.map((role, index) => (
                <div key={index} className="p-4 bg-muted/10 rounded-xl">
                  <p className="text-hero font-medium">{role}</p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Actions */}
        <div className="text-center animate-fadeInUp" style={{ animationDelay: '0.7s' }}>
          <Button 
            onClick={onRestart}
            variant="outline"
            size="lg"
            className="px-8 py-3"
          >
            Take Assessment Again
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentResults;
