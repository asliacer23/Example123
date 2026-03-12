import { motion } from "framer-motion";
import Navbar from "@/features/shared/components/Navbar";
import ParticleBackground from "@/features/shared/components/ParticleBackground";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06 } }),
};

const AboutPage = () => (
  <div className="min-h-screen relative">
    <ParticleBackground />
    <Navbar />
    <div className="pt-24 section-padding">
      <div className="w-full px-4 sm:px-8 max-w-4xl mx-auto">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-5xl sm:text-6xl font-display font-bold text-center mb-4">About AutoStore IM</motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-muted-foreground text-center mb-16 text-lg">Learn about our mission and team.</motion.p>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
          className="dashboard-card p-8 mb-8">
          <h2 className="font-display font-bold text-2xl mb-4">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            AutoStore IM is a research prototype developed by BSIT Information Management students at Bestlink College of the Philippines. Our mission is to provide an accessible platform that enables IM students to generate, deploy, and manage intelligent storefront systems.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            By leveraging AI generation, template-based building, and managed cloud infrastructure, we aim to bridge the gap between academic learning and real-world software development.
          </p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}
          className="dashboard-card p-8 mb-8">
          <h2 className="font-display font-bold text-2xl mb-4">Technology Stack</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { name: 'React', emoji: '⚛️' },
              { name: 'TypeScript', emoji: '📘' },
              { name: 'Tailwind CSS', emoji: '🎨' },
              { name: 'Framer Motion', emoji: '✨' },
              { name: 'PostgreSQL', emoji: '🐘' },
              { name: 'Cloud Hosting', emoji: '☁️' },
              { name: 'AI Engine', emoji: '🤖' },
              { name: 'REST APIs', emoji: '🔗' },
            ].map((tech) => (
              <div key={tech.name} className="text-center p-4 rounded-lg bg-secondary">
                <span className="text-2xl block mb-2">{tech.emoji}</span>
                <p className="text-sm font-medium">{tech.name}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2}
          className="dashboard-card p-8 mb-8">
          <h2 className="font-display font-bold text-2xl mb-4">Research Team</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            This prototype was developed as part of a capstone research project for the Bachelor of Science in Information Technology, major in Information Management program.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: 'Research Adviser', role: 'Faculty Adviser' },
              { name: 'Development Team', role: 'BSIT-IM Students' },
              { name: 'Documentation', role: 'Research Writers' },
              { name: 'Testing', role: 'QA Team' },
            ].map((member) => (
              <div key={member.name} className="p-4 rounded-lg border border-border/50">
                <p className="font-medium text-sm">{member.name}</p>
                <p className="text-xs text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={3}
          className="dashboard-card p-8">
          <h2 className="font-display font-bold text-2xl mb-4">Contact</h2>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">📧 Email: research@autostore.im</p>
            <p className="text-sm text-muted-foreground">🏫 Bestlink College of the Philippines</p>
            <p className="text-sm text-muted-foreground">📍 Quezon City, Philippines</p>
          </div>
        </motion.div>
      </div>
    </div>
  </div>
);

export default AboutPage;
