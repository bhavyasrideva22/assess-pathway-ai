
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BookOpen, Brain, Target, TrendingUp } from 'lucide-react';

interface AssessmentWelcomeProps {
  onStart: () => void;
}

const AssessmentWelcome = ({ onStart }: AssessmentWelcomeProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fadeInUp">
          <div className="inline-flex items-center justify-center w-20 h-20 gradient-primary rounded-2xl mb-6 shadow-xl">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold mb-4 text-hero">
            Should I Become an Assessment Designer?
          </h1>
          <p className="text-xl text-body max-w-2xl mx-auto leading-relaxed">
            Discover if a career in creating reliable, valid, and purpose-driven assessments 
            aligns with your skills, interests, and career goals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            {
              icon: Target,
              title: "Psychometric Analysis",
              description: "Evaluate your personality fit and cognitive preferences"
            },
            {
              icon: Brain,
              title: "Technical Aptitude", 
              description: "Test your knowledge of assessment principles and best practices"
            },
            {
              icon: TrendingUp,
              title: "WISCAR Framework",
              description: "Comprehensive readiness evaluation across 6 key dimensions"
            },
            {
              icon: BookOpen,
              title: "Personalized Guidance",
              description: "Get tailored recommendations and career pathway insights"
            }
          ].map((feature, index) => (
            <Card key={index} className="assessment-card text-center animate-fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="inline-flex items-center justify-center w-12 h-12 gradient-secondary rounded-xl mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-hero">{feature.title}</h3>
              <p className="text-sm text-body">{feature.description}</p>
            </Card>
          ))}
        </div>

        <Card className="assessment-card animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-hero">What You'll Discover</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div>
                <h3 className="font-semibold mb-2 text-hero">Your Fit Score</h3>
                <p className="text-body text-sm">Comprehensive analysis of your suitability for assessment design roles</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-hero">Skill Gaps</h3>
                <p className="text-body text-sm">Identify areas for development and create your learning roadmap</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-hero">Career Pathways</h3>
                <p className="text-body text-sm">Explore specific roles and alternative career options</p>
              </div>
            </div>
            
            <div className="bg-muted/20 rounded-xl p-6 mb-8">
              <p className="text-body mb-4">
                <strong className="text-hero">Assessment Duration:</strong> 20-25 minutes<br />
                <strong className="text-hero">Questions:</strong> 15 carefully crafted items<br />
                <strong className="text-hero">Results:</strong> Instant, detailed analysis with actionable insights
              </p>
            </div>

            <Button 
              onClick={onStart}
              size="lg"
              className="gradient-primary text-white font-semibold px-12 py-4 text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Start Assessment
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AssessmentWelcome;
