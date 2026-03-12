import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SYSTEM_TYPES } from "@/features/shared/data/mockData";
import { useNavigate } from "react-router-dom";

type Phase = 'select' | 'generating' | 'done';

const GeneratorTab = () => {
  const [phase, setPhase] = useState<Phase>('select');
  const [selected, setSelected] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const handleGenerate = (typeId: string) => {
    setSelected(typeId);
    setPhase('generating');
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(interval); setPhase('done'); return 100; }
        return p + 2;
      });
    }, 80);
  };

  const reset = () => { setPhase('select'); setSelected(null); setProgress(0); };

  const selectedType = SYSTEM_TYPES.find((t) => t.id === selected);

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {phase === 'select' && (
          <motion.div key="select" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h3 className="font-display font-bold text-3xl mb-2">AI System Generator</h3>
            <p className="text-muted-foreground mb-8 text-lg">Choose a system type to generate using AutoStore AI.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SYSTEM_TYPES.map((type, i) => (
                <motion.button key={type.id} onClick={() => handleGenerate(type.id)}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.97 }}
                  className="dashboard-card text-left hover:border-foreground/30 transition-all p-6 group">
                  <span className="text-xl font-mono font-bold text-foreground/30 group-hover:text-foreground transition-colors duration-300 mb-4 block">{type.icon}</span>
                  <h4 className="font-display font-semibold text-lg mb-2">{type.name}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{type.description}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {phase === 'generating' && (
          <motion.div key="generating" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            className="text-center py-20">
            <div className="relative w-32 h-32 mx-auto mb-8">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--border))" strokeWidth="6" />
                <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--foreground))" strokeWidth="6"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                  strokeLinecap="round" className="transition-all duration-100" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-display font-bold">{progress}%</span>
              </div>
            </div>
            <h3 className="font-display font-bold text-3xl mb-2">Generating System...</h3>
            <p className="text-muted-foreground text-lg mb-8">AutoStore AI is building your {selectedType?.name}</p>
            <div className="space-y-3 text-sm text-muted-foreground max-w-md mx-auto">
              {[
                { threshold: 5, label: 'Analyzing requirements...' },
                { threshold: 25, label: 'Generating database schema (1NF → 4NF)...' },
                { threshold: 50, label: 'Building UI components...' },
                { threshold: 75, label: 'Configuring authentication & RLS...' },
                { threshold: 90, label: 'Deploying to cloud...' },
              ].map((step, i) => (
                <motion.p key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: progress > step.threshold ? 1 : 0.3, x: 0 }}
                  className={progress > step.threshold ? 'text-foreground' : ''}>
                  {progress > step.threshold ? '::' : '--'} {step.label}
                </motion.p>
              ))}
            </div>
          </motion.div>
        )}

        {phase === 'done' && (
          <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            className="text-center py-16">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}
              className="text-4xl font-mono font-bold text-foreground mb-8">[ OK ]</motion.div>
            <h3 className="font-display font-bold text-3xl mb-2">System Generated!</h3>
            <p className="text-muted-foreground text-lg mb-2">Your {selectedType?.name} is ready.</p>
            <p className="text-sm text-muted-foreground mb-8">
              Domain: <span className="text-foreground font-mono">{selectedType?.name.toLowerCase().replace(/\s+/g, '')}.autostore-im.app</span>
            </p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="dashboard-card max-w-lg mx-auto mb-8 p-8">
              <div className="bg-secondary rounded-lg p-10 text-center mb-4">
                <span className="text-3xl font-mono font-bold text-foreground/40">{selectedType?.icon}</span>
              </div>
              <p className="font-display font-semibold text-xl">{selectedType?.name}</p>
              <p className="text-sm text-muted-foreground mt-1">Live Preview Available</p>
            </motion.div>
            <div className="flex gap-4 justify-center flex-wrap">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Button variant="outline" size="lg" onClick={reset} className="px-8">Generate Another</Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Button size="lg" className="px-8" onClick={() => navigate('/preview/new')}>View Project →</Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GeneratorTab;
