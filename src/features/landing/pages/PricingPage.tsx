import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PRICING_PLANS } from "@/features/shared/data/mockData";
import { Button } from "@/components/ui/button";
import Navbar from "@/features/shared/components/Navbar";
import ParticleBackground from "@/features/shared/components/ParticleBackground";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const PricingPage = () => (
  <div className="min-h-screen relative">
    <ParticleBackground />
    <Navbar />
    <div className="pt-24 section-padding">
      <div className="w-full px-4 sm:px-8">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-center mb-4">Student Pricing Plans</motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-muted-foreground text-center mb-16 max-w-2xl mx-auto text-lg">
          Choose the plan that fits your project needs. All plans include cloud hosting and domain management.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {PRICING_PLANS.map((plan, i) => (
            <motion.div key={plan.id} initial="hidden" animate="visible" variants={fadeUp} custom={i}
              className={`dashboard-card flex flex-col relative p-8 ${plan.popular ? 'border-foreground/30 ring-1 ring-foreground/10' : ''}`}>
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">
                  Most Popular
                </span>
              )}
              <h3 className="font-display font-bold text-xl mb-1">{plan.name}</h3>
              <p className="text-xs text-muted-foreground mb-4">{plan.target}</p>
              <p className="text-5xl font-display font-bold mb-6">{plan.currency}{plan.price.toLocaleString()}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-foreground mt-0.5">✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link to="/register">
                <Button className="w-full" variant={plan.popular ? "default" : "outline"}>Subscribe</Button>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-24 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-center mb-12">Frequently Asked Questions</h2>
          {[
            { q: 'Can I upgrade my plan later?', a: 'Yes! You can upgrade anytime from your dashboard settings. Your data and projects will be preserved.' },
            { q: 'What payment methods are accepted?', a: 'We accept GCash, PayMaya, bank transfer, and over-the-counter payments.' },
            { q: 'Is there a free trial?', a: 'All plans include a 7-day free trial so you can explore the platform before committing.' },
            { q: 'Can I use this for my thesis/capstone?', a: 'Absolutely! The Capstone plan is specifically designed for thesis and capstone projects with more AI credits and storage.' },
          ].map((faq, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
              className="dashboard-card p-6 mb-4">
              <h4 className="font-display font-semibold mb-2">{faq.q}</h4>
              <p className="text-sm text-muted-foreground">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default PricingPage;
