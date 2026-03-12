import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Navbar from "@/features/shared/components/Navbar";
import ParticleBackground from "@/features/shared/components/ParticleBackground";
import { PRICING_PLANS } from "@/features/shared/data/mockData";
import { useAuth } from "@/features/auth/context/AuthContext";

const features = [
  { symbol: '##', title: "Templated Store Builder", desc: "Drag-and-drop interface to build storefront systems with customizable blocks and layouts." },
  { symbol: '>>', title: "AI System Generator", desc: "Generate full systems using artificial intelligence — database, UI, and deployment in one click." },
  { symbol: '||', title: "Managed Database", desc: "Integrated PostgreSQL database backend with normalized schemas for your projects." },
  { symbol: '^^ ', title: "Cloud Hosting", desc: "Deploy systems instantly with managed hosting and automatic scaling." },
  { symbol: '//', title: "Domain Management", desc: "Assign custom domain names and manage DNS for your generated projects." },
  { symbol: '~~', title: "Analytics Dashboard", desc: "Monitor your projects with real-time analytics, usage stats, and performance metrics." },
];

const showcase = [
  { symbol: '{ }', title: "Online Store", desc: "Full e-commerce with cart, checkout, payment processing, and order management" },
  { symbol: '[ ]', title: "Inventory System", desc: "Stock tracking, supplier management, warehouse operations, and reorder alerts" },
  { symbol: '< >', title: "School Portal", desc: "Student enrollment, grades, attendance, class scheduling, and report generation" },
  { symbol: '::',  title: "Booking System", desc: "Appointment scheduling, calendar management, reminders, and client records" },
  { symbol: '++', title: "Clinic System", desc: "Patient records, appointment booking, prescriptions, and billing management" },
  { symbol: '**', title: "Portfolio Site", desc: "Personal showcase with projects, resume builder, testimonials, and contact forms" },
];

const stats = [
  { value: "847+", label: "Active Students" },
  { value: "1,284", label: "Systems Generated" },
  { value: "99.9%", label: "Uptime" },
  { value: "4.9/5", label: "Student Rating" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const LandingPage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen relative">
      <ParticleBackground />
      <Navbar />

      {/* Hero */}
      <section className="min-h-screen flex items-center section-padding pt-24">
        <div className="w-full text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
              className="text-sm font-medium tracking-[0.3em] uppercase text-muted-foreground mb-6">
              Bestlink College of the Philippines // BSIT — Information Management
            </motion.p>
            <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-display font-bold tracking-tight mb-6">
              AutoStore{" "}
              <span className="gradient-text">IM</span>
            </h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              className="text-xl sm:text-2xl text-muted-foreground mb-3 font-display">
              Automated Storefronts, Managed Intelligence
            </motion.p>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              className="text-base sm:text-lg text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              A platform that allows Information Management students to generate intelligent storefront systems 
              using templates, AI generation, and managed infrastructure.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link to={isAuthenticated ? "/dashboard" : "/register"}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Button size="lg" className="px-10 py-6 text-base font-semibold">
                    Get Started →
                  </Button>
                </motion.div>
              </Link>
              <Link to="/pricing">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Button variant="outline" size="lg" className="px-10 py-6 text-base">View Pricing</Button>
                </motion.div>
              </Link>
              <Link to="/tutorial">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Button variant="ghost" size="lg" className="px-10 py-6 text-base">Take a Tour</Button>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl mx-auto">
            {stats.map((s, i) => (
              <motion.div key={s.label} variants={fadeUp} custom={i}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="dashboard-card text-center py-8 cursor-default">
                <p className="text-3xl sm:text-4xl font-display font-bold mb-1">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="section-padding">
        <div className="w-full px-4 sm:px-8">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-center mb-4">Platform Features</motion.h2>
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}
            className="text-muted-foreground text-center mb-16 max-w-2xl mx-auto text-lg">
            Everything you need to build, deploy, and manage intelligent storefronts.
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div key={f.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i + 2}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="dashboard-card group cursor-default p-8">
                <span className="text-2xl font-mono font-bold text-foreground/40 group-hover:text-foreground transition-colors duration-300 mb-4 block">{f.symbol}</span>
                <h3 className="font-display font-semibold text-xl mb-3">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase */}
      <section className="section-padding">
        <div className="w-full px-4 sm:px-8">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-center mb-4">What You Can Build</motion.h2>
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}
            className="text-muted-foreground text-center mb-16 max-w-2xl mx-auto text-lg">
            Generate complete systems with a single click using AI or templates.
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {showcase.map((s, i) => (
              <motion.div key={s.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i + 2}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="dashboard-card text-center group p-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-secondary flex items-center justify-center group-hover:bg-accent transition-colors duration-300">
                  <span className="text-xl font-mono font-bold text-foreground/60 group-hover:text-foreground transition-colors">{s.symbol}</span>
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding">
        <div className="w-full px-4 sm:px-8">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-center mb-16">How It Works</motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Sign Up', desc: 'Create your account as a BSIT IM student and choose your plan.' },
              { step: '02', title: 'Choose', desc: 'Select a system type or template to start building your project.' },
              { step: '03', title: 'Generate', desc: 'Let AutoStore AI generate your complete system with database and UI.' },
              { step: '04', title: 'Deploy', desc: 'Your system is live instantly with managed hosting and a custom domain.' },
            ].map((item, i) => (
              <motion.div key={item.step} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="text-center cursor-default">
                <div className="text-6xl font-display font-bold text-muted-foreground/20 mb-4">{item.step}</div>
                <h3 className="font-display font-semibold text-xl mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="section-padding">
        <div className="w-full px-4 sm:px-8">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-center mb-4">Student Pricing</motion.h2>
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}
            className="text-muted-foreground text-center mb-16 max-w-2xl mx-auto text-lg">
            Affordable plans designed for BSIT IM students.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {PRICING_PLANS.map((plan, i) => (
              <motion.div key={plan.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i + 2}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className={`dashboard-card relative flex flex-col p-8 ${plan.popular ? 'border-foreground/30 ring-1 ring-foreground/10' : ''}`}>
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
                <h3 className="font-display font-bold text-xl mb-1">{plan.name}</h3>
                <p className="text-xs text-muted-foreground mb-4">{plan.target}</p>
                <p className="text-5xl font-display font-bold mb-6">
                  {plan.currency}{plan.price.toLocaleString()}
                </p>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-foreground mt-0.5 font-mono text-xs">::</span> {f}
                    </li>
                  ))}
                </ul>
                <Link to="/register">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button className="w-full" variant={plan.popular ? "default" : "outline"}>Subscribe</Button>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="w-full px-4 sm:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
            className="dashboard-card text-center py-16 sm:py-24 px-8">
            <h2 className="text-3xl sm:text-5xl font-display font-bold mb-4">Ready to Build?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-lg">
              Join 847+ BSIT IM students already building intelligent storefronts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Button size="lg" className="px-10 py-6 text-base font-semibold">Start Building Now →</Button>
                </motion.div>
              </Link>
              <Link to="/tutorial">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Button variant="outline" size="lg" className="px-10 py-6 text-base">View Tutorial</Button>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 section-padding py-12">
        <div className="w-full px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-display font-bold text-lg mb-3">AutoStore IM</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A BSIT Information Management research prototype for generating intelligent storefront systems.
              </p>
            </div>
            <div>
              <h4 className="font-display font-bold mb-3">Quick Links</h4>
              <div className="space-y-2">
                <Link to="/#features" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Features</Link>
                <Link to="/pricing" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
                <Link to="/tutorial" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Tutorial</Link>
                <Link to="/docs" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Documentation</Link>
              </div>
            </div>
            <div>
              <h4 className="font-display font-bold mb-3">Company</h4>
              <div className="space-y-2">
                <Link to="/about" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">About</Link>
                <Link to="/changelog" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Changelog</Link>
                <Link to="/status" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Status</Link>
                <Link to="/contact" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
              </div>
            </div>
            <div>
              <h4 className="font-display font-bold mb-3">Legal</h4>
              <div className="space-y-2">
                <Link to="/terms" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
                <Link to="/privacy" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
                <Link to="/login" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Log In</Link>
                <Link to="/register" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Register</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-border/50 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 AutoStore IM — Bestlink College of the Philippines</p>
            <p className="mt-1">BSIT — Information Management Research Prototype</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
