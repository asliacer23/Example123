import { motion } from "framer-motion";
import Navbar from "@/features/shared/components/Navbar";
import ParticleBackground from "@/features/shared/components/ParticleBackground";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06 } }),
};

const sections = [
  {
    title: 'Getting Started',
    emoji: '🚀',
    items: [
      { title: 'Creating Your Account', desc: 'Register with your student email and choose a subscription plan.' },
      { title: 'Navigating the Dashboard', desc: 'Overview of the student dashboard layout and sidebar navigation.' },
      { title: 'Understanding Your Plan', desc: 'Learn about AI credits, storage limits, and project slots.' },
      { title: 'Taking the Tutorial', desc: 'Step-by-step walkthrough of all platform features.' },
    ]
  },
  {
    title: 'AI System Generation',
    emoji: '🤖',
    items: [
      { title: 'Choosing a System Type', desc: 'E-commerce, Inventory, Clinic, School, Portfolio, or Booking systems.' },
      { title: 'Generation Process', desc: 'How the AI generates database schemas, UI components, and deploys.' },
      { title: 'Customizing Generated Systems', desc: 'Modify the generated output using the template builder.' },
      { title: 'AI Credit Management', desc: 'Track and optimize your AI credit usage.' },
    ]
  },
  {
    title: 'Template Builder',
    emoji: '🎨',
    items: [
      { title: 'Block Types', desc: 'Headers, heroes, product grids, CTAs, testimonials, and more.' },
      { title: 'Drag and Drop', desc: 'Reorder blocks by dragging them to your desired position.' },
      { title: 'Preview Mode', desc: 'See a live preview of your storefront layout.' },
      { title: 'Saving Templates', desc: 'Save your custom templates for reuse across projects.' },
    ]
  },
  {
    title: 'Domain Management',
    emoji: '🌐',
    items: [
      { title: 'Assigning Domains', desc: 'Create subdomains under autostore-im.app for your projects.' },
      { title: 'SSL Certificates', desc: 'All domains come with free SSL certificates.' },
      { title: 'DNS Configuration', desc: 'Manage DNS settings for your assigned domains.' },
    ]
  },
  {
    title: 'Database',
    emoji: '🗄️',
    items: [
      { title: 'Schema Normalization', desc: 'Understanding 1NF through 4NF compliance in generated schemas.' },
      { title: 'Table Management', desc: 'View tables, columns, and row counts.' },
      { title: 'Data Export', desc: 'Export tables as CSV, JSON, or SQL backup files.' },
      { title: 'Backups', desc: 'Automatic daily backups and manual backup triggers.' },
    ]
  },
];

const DocumentationPage = () => (
  <div className="min-h-screen relative">
    <ParticleBackground />
    <Navbar />
    <div className="pt-24 section-padding">
      <div className="w-full px-4 sm:px-8 max-w-5xl mx-auto">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-5xl sm:text-6xl font-display font-bold text-center mb-4">Documentation</motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-muted-foreground text-center mb-16 text-lg">Everything you need to know about AutoStore IM.</motion.p>

        <div className="space-y-12">
          {sections.map((section, si) => (
            <motion.div key={section.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={si}>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">{section.emoji}</span>
                <h2 className="font-display font-bold text-2xl">{section.title}</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {section.items.map((item) => (
                  <div key={item.title} className="dashboard-card p-6 hover:border-foreground/20 transition-all cursor-pointer">
                    <h3 className="font-display font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default DocumentationPage;
