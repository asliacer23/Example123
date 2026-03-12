import { motion } from "framer-motion";
import Navbar from "@/features/shared/components/Navbar";
import ParticleBackground from "@/features/shared/components/ParticleBackground";

const sections = [
  { title: '1. Information We Collect', content: 'We collect information you provide directly (name, email, student ID) and usage data (login times, features used, systems generated). We do not collect sensitive financial data — payment processing is handled by third-party providers.' },
  { title: '2. How We Use Your Information', content: 'Your information is used to provide platform services, improve user experience, send relevant notifications, generate usage analytics, and comply with educational institution requirements.' },
  { title: '3. Data Storage', content: 'Data is stored on secure cloud servers with encryption at rest and in transit. Database backups are performed daily. Data is retained for the duration of your subscription plus 90 days after account deletion.' },
  { title: '4. Data Sharing', content: 'We do not sell your personal data. We may share anonymized, aggregated data for research purposes. Data may be shared with Bestlink College of the Philippines for academic compliance verification.' },
  { title: '5. Your Rights', content: 'Under the Philippine Data Privacy Act (RA 10173), you have the right to access, correct, and delete your personal data. You may request a copy of your data or account deletion from the Settings page.' },
  { title: '6. Cookies', content: 'We use essential cookies for authentication and session management. No third-party advertising cookies are used. You can manage cookie preferences in your browser settings.' },
  { title: '7. Security', content: 'We implement industry-standard security measures including encryption, access controls, and regular security audits. We use role-based access control (RBAC) to ensure data isolation between users.' },
  { title: '8. Contact', content: 'For privacy-related inquiries, contact our Data Protection Officer at privacy@autostore.im or visit the Help Center in your dashboard.' },
];

const PrivacyPage = () => (
  <div className="min-h-screen relative">
    <ParticleBackground />
    <Navbar />
    <div className="pt-24 section-padding">
      <div className="w-full px-4 sm:px-8 max-w-4xl mx-auto">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-5xl sm:text-6xl font-display font-bold text-center mb-4">Privacy Policy</motion.h1>
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

export default PrivacyPage;
