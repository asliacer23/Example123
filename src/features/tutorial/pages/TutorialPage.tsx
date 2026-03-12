import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TUTORIAL_STEPS } from "@/features/shared/data/mockData";
import ParticleBackground from "@/features/shared/components/ParticleBackground";
import ThemeToggle from "@/features/shared/components/ThemeToggle";

const stepEmojis = ['👋', '💳', '🤖', '🎨', '🌐', '🗄️', '👁️', '🎉'];

const TutorialPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const step = TUTORIAL_STEPS[currentStep];
  const progress = ((currentStep + 1) / TUTORIAL_STEPS.length) * 100;

  const next = () => {
    if (currentStep < TUTORIAL_STEPS.length - 1) setCurrentStep(currentStep + 1);
    else navigate('/register');
  };

  const prev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen relative flex flex-col">
      <ParticleBackground />
      
      {/* Header */}
      <div className="w-full px-4 sm:px-8 py-4 flex items-center justify-between z-10">
        <Button variant="ghost" onClick={() => navigate('/')}>← Back to Home</Button>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground hidden sm:block">Step {currentStep + 1} of {TUTORIAL_STEPS.length}</span>
          <ThemeToggle />
        </div>
      </div>

      {/* Progress */}
      <div className="w-full px-4 sm:px-8 z-10">
        <Progress value={progress} className="h-1" />
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-8 py-8 z-10">
        <AnimatePresence mode="wait">
          <motion.div key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-3xl text-center">
            
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.1 }}
              className="text-7xl sm:text-8xl mb-8">{stepEmojis[currentStep]}</motion.div>
            
            <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl mb-4">{step.title}</h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-6">{step.description}</p>
            
            <div className="dashboard-card p-8 text-left mb-8">
              <p className="text-muted-foreground leading-relaxed text-base">{step.content}</p>
            </div>

            {/* Step Dots */}
            <div className="flex justify-center gap-2 mb-8">
              {TUTORIAL_STEPS.map((_, i) => (
                <button key={i} onClick={() => setCurrentStep(i)}
                  className={`w-3 h-3 rounded-full transition-all ${i === currentStep ? 'bg-foreground scale-125' : i < currentStep ? 'bg-foreground/50' : 'bg-border'}`} />
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-center gap-4">
              {currentStep > 0 && (
                <Button variant="outline" size="lg" onClick={prev} className="px-8">← Previous</Button>
              )}
              <Button size="lg" onClick={next} className="px-8">
                {currentStep === TUTORIAL_STEPS.length - 1 ? 'Get Started →' : 'Next →'}
              </Button>
              {currentStep < TUTORIAL_STEPS.length - 1 && (
                <Button variant="ghost" size="lg" onClick={() => navigate('/register')} className="px-8">
                  Skip Tutorial
                </Button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TutorialPage;
