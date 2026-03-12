import { motion } from "framer-motion";
import Navbar from "@/features/shared/components/Navbar";
import ParticleBackground from "@/features/shared/components/ParticleBackground";

const sections = [
  { title: '1. Acceptance of Terms', content: 'By accessing and using AutoStore IM, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree, please do not use the platform.' },
  { title: '2. Platform Description', content: 'AutoStore IM is an educational prototype platform that allows BSIT Information Management students to generate, deploy, and manage intelligent storefront systems using templates, AI generation, and managed infrastructure.' },
  { title: '3. User Accounts', content: 'You must provide accurate information when creating an account. You are responsible for maintaining the security of your account credentials. AutoStore IM reserves the right to suspend or terminate accounts that violate these terms.' },
  { title: '4. Subscription Plans', content: 'Plans are billed per semester. Prices are in Philippine Peso (₱). Features and limits vary by plan tier (Basic, Pro, Capstone). Plan changes take effect immediately.' },
  { title: '5. Acceptable Use', content: 'The platform is intended for educational purposes only. Users must not use generated systems for illegal activities, spam, or any purpose that violates Philippine law. Generated content must comply with academic integrity policies.' },
  { title: '6. Intellectual Property', content: 'Systems generated through the platform are owned by the student user. AutoStore IM retains rights to the platform code, templates, and AI models. Users grant AutoStore IM a license to use anonymized data for platform improvement.' },
  { title: '7. Data Privacy', content: 'We collect and process personal data in accordance with the Philippine Data Privacy Act of 2012 (RA 10173). See our Privacy Policy for detailed information on data handling practices.' },
  { title: '8. Limitation of Liability', content: 'AutoStore IM is provided "as is" without warranties. As a research prototype, the platform may experience downtime or data loss. We are not liable for damages arising from platform use.' },
  { title: '9. Modifications', content: 'AutoStore IM reserves the right to modify these terms at any time. Users will be notified of significant changes via email or platform notification.' },
];

const TermsPage = () => (
  <div className="min-h-screen relative">
    <ParticleBackground />
    <Navbar />
    <div className="pt-24 section-padding">
      <div className="w-full px-4 sm:px-8 max-w-4xl mx-auto">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-5xl sm:text-6xl font-display font-bold text-center mb-4">Terms of Service</motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-muted-foreground text-center mb-16 text-lg">Last updated: December 20, 2025</motion.p>

        <div className="space-y-6">
          {sections.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}
              className="dashboard-card p-6">
              <h3 className="font-display font-semibold text-lg mb-3">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default TermsPage;
