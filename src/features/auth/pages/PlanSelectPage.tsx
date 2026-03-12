import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PRICING_PLANS } from "@/features/shared/data/mockData";
import { useAuth } from "@/features/auth/context/AuthContext";
import ParticleBackground from "@/features/shared/components/ParticleBackground";
import ThemeToggle from "@/features/shared/components/ThemeToggle";
import type { PlanType } from "@/features/auth/context/AuthContext";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const PlanSelectPage = () => {
  const { selectPlan } = useAuth();
  const navigate = useNavigate();

  const handleSelect = (planId: string) => {
    selectPlan(planId as PlanType);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative px-4 py-24">
      <ParticleBackground />
      <div className="absolute top-4 right-4 z-10"><ThemeToggle /></div>
      <div className="w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-center mb-2">Choose Your Plan</h1>
          <p className="text-center text-muted-foreground mb-12 text-lg">Select a subscription to start building</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {PRICING_PLANS.map((plan, i) => (
              <motion.div key={plan.id} initial="hidden" animate="visible" variants={fadeUp} custom={i}
                className={`dashboard-card flex flex-col relative p-8 ${plan.popular ? 'border-foreground/30 ring-1 ring-foreground/10' : ''}`}>
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">Recommended</span>
                )}
                <h3 className="font-display font-bold text-xl">{plan.name}</h3>
                <p className="text-xs text-muted-foreground mb-4">{plan.target}</p>
                <p className="text-5xl font-display font-bold mb-6">{plan.currency}{plan.price.toLocaleString()}</p>
                <ul className="space-y-3 mb-6 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="text-sm text-muted-foreground flex gap-2"><span className="text-foreground">✓</span>{f}</li>
                  ))}
                </ul>
                <Button onClick={() => handleSelect(plan.id)} variant={plan.popular ? "default" : "outline"} className="w-full" size="lg">
                  Select Plan →
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PlanSelectPage;
