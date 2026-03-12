import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Navbar from "@/features/shared/components/Navbar";
import ParticleBackground from "@/features/shared/components/ParticleBackground";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06 } }),
};

const changes = [
  { version: 'v2.4', date: 'Dec 18, 2025', items: ['Added AI Chat Assistant', 'Enhanced Template Builder with drag-and-drop', 'New Export Center for bulk data exports', 'Integration hub with 10+ services', 'Improved admin analytics with pie charts'] },
  { version: 'v2.3', date: 'Dec 5, 2025', items: ['Added Booking System type', 'Database Advanced tab with query logs', 'Personal Analytics dashboard', 'Email template management for admins', 'Performance improvements'] },
  { version: 'v2.2', date: 'Nov 20, 2025', items: ['Activity Log for students and admins', 'Notification system with real-time alerts', 'Billing management with invoice history', 'Help Center with FAQs and support tickets', 'System health monitoring'] },
  { version: 'v2.1', date: 'Nov 5, 2025', items: ['System Preview page with interactive storefront', 'Tutorial walkthrough (8 steps)', 'Enhanced pricing page with FAQ', '404 page redesign', 'Mobile responsive improvements'] },
  { version: 'v2.0', date: 'Oct 15, 2025', items: ['Complete redesign with black/white theme', 'Dark/Light mode toggle', '3D Particle background', 'AI System Generator', 'Template Builder', 'Domain Manager'] },
  { version: 'v1.0', date: 'Sep 1, 2025', items: ['Initial release', 'Student and Admin dashboards', 'Basic authentication', 'Plan selection', 'Landing page'] },
];

const ChangelogPage = () => (
  <div className="min-h-screen relative">
    <ParticleBackground />
    <Navbar />
    <div className="pt-24 section-padding">
      <div className="w-full px-4 sm:px-8 max-w-4xl mx-auto">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-5xl sm:text-6xl font-display font-bold text-center mb-4">Changelog</motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-muted-foreground text-center mb-16 text-lg">Track all platform updates and improvements.</motion.p>

        <div className="space-y-8">
          {changes.map((release, i) => (
            <motion.div key={release.version} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
              className="dashboard-card p-8">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-2xl font-display font-bold">{release.version}</span>
                <span className="text-sm text-muted-foreground">{release.date}</span>
                {i === 0 && <span className="text-xs bg-success/20 text-success px-2 py-0.5 rounded-full">Latest</span>}
              </div>
              <ul className="space-y-2">
                {release.items.map((item) => (
                  <li key={item} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-foreground mt-0.5">•</span> {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default ChangelogPage;
