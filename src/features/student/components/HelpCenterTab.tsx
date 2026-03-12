import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const faqs = [
  { q: 'How do I generate a new system?', a: 'Go to the Generate System tab, select your system type, and click to start generation. The AI will create your database schema, UI components, and deploy everything automatically.', category: 'Getting Started' },
  { q: 'What system types can I generate?', a: 'E-commerce Store, Inventory System, Clinic System, School System, Portfolio Website, and Booking System. More types are being added regularly.', category: 'Getting Started' },
  { q: 'How do AI credits work?', a: 'AI credits are consumed when generating systems. Each generation uses approximately 50-200 credits depending on complexity. You can track your usage in the Analytics tab.', category: 'Credits' },
  { q: 'Can I get more AI credits?', a: 'Upgrade your plan for more credits, or wait for your monthly refresh. Basic gets 400, Pro gets 1,000, and Capstone gets 2,100 credits per semester.', category: 'Credits' },
  { q: 'How do I assign a domain?', a: 'Go to Domain Manager, enter your desired subdomain name, and click Assign. Your domain will be active under autostore-im.app within minutes.', category: 'Domains' },
  { q: 'Can I use a custom domain?', a: 'Currently, all domains are subdomains of autostore-im.app. Custom domain support (yourdomain.com) is planned for a future update.', category: 'Domains' },
  { q: 'How do I export my data?', a: 'Go to the Database tab, expand any table, and click "Export CSV". You can also use the Export Center for bulk exports.', category: 'Data' },
  { q: 'Is my data backed up?', a: 'Yes! Automatic backups run daily. You can also trigger manual backups from the Database tab.', category: 'Data' },
  { q: 'How do I change my plan?', a: 'Go to Settings → Subscription and click "Upgrade Plan". You can upgrade at any time, and your data will be preserved.', category: 'Billing' },
  { q: 'What payment methods are accepted?', a: 'GCash, PayMaya, bank transfer (BPI, BDO, Metrobank), and over-the-counter payments at partner outlets.', category: 'Billing' },
  { q: 'Can I use this for my capstone/thesis?', a: 'Absolutely! The Capstone plan is designed specifically for thesis projects. It includes more AI credits, storage, and project slots.', category: 'General' },
  { q: 'How do I contact support?', a: 'Use the AI Chat assistant for instant help, or submit a support ticket from this Help Center page.', category: 'General' },
];

const categories = ['All', ...new Set(faqs.map(f => f.category))];

const HelpCenterTab = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [expanded, setExpanded] = useState<number | null>(null);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');

  const filtered = faqs.filter(f => {
    const matchSearch = f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === 'All' || f.category === activeCategory;
    return matchSearch && matchCategory;
  });

  const submitTicket = () => {
    if (!ticketSubject.trim() || !ticketMessage.trim()) { toast.error("Please fill all fields"); return; }
    toast.success("Support ticket submitted! We'll respond within 24 hours.");
    setTicketSubject('');
    setTicketMessage('');
  };

  return (
    <div className="w-full">
      <h3 className="font-display font-bold text-3xl mb-2">Help Center</h3>
      <p className="text-muted-foreground mb-8 text-lg">Find answers and get support.</p>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        {[
          { emoji: '📖', title: 'Tutorial', desc: 'Step-by-step guide' },
          { emoji: '🤖', title: 'AI Chat', desc: 'Instant AI help' },
          { emoji: '📧', title: 'Email Support', desc: 'support@autostore.im' },
          { emoji: '📋', title: 'Docs', desc: 'Full documentation' },
        ].map((link, i) => (
          <motion.div key={link.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            className="dashboard-card p-5 text-center cursor-pointer hover:border-foreground/20 transition-all"
            onClick={() => toast.info(`Opening ${link.title}...`)}>
            <span className="text-3xl block mb-2">{link.emoji}</span>
            <h4 className="font-display font-semibold text-sm">{link.title}</h4>
            <p className="text-xs text-muted-foreground">{link.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* FAQ */}
        <div className="lg:col-span-2">
          <h4 className="font-display font-semibold text-xl mb-4">Frequently Asked Questions</h4>
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search FAQs..." className="mb-4" />
          <div className="flex gap-2 flex-wrap mb-4">
            {categories.map(c => (
              <Button key={c} size="sm" variant={activeCategory === c ? 'default' : 'outline'} onClick={() => setActiveCategory(c)}>{c}</Button>
            ))}
          </div>
          <div className="space-y-2">
            {filtered.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                className="dashboard-card overflow-hidden">
                <button onClick={() => setExpanded(expanded === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left">
                  <span className="font-medium text-sm">{faq.q}</span>
                  <span className="text-muted-foreground ml-2">{expanded === i ? '▲' : '▼'}</span>
                </button>
                {expanded === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                    className="px-4 pb-4">
                    <p className="text-sm text-muted-foreground">{faq.a}</p>
                    <span className="text-xs bg-secondary px-2 py-0.5 rounded mt-2 inline-block">{faq.category}</span>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Support Ticket */}
        <div>
          <h4 className="font-display font-semibold text-xl mb-4">Submit a Ticket</h4>
          <div className="dashboard-card p-6 space-y-4 sticky top-20">
            <div>
              <label className="text-sm font-medium block mb-1">Subject</label>
              <Input value={ticketSubject} onChange={(e) => setTicketSubject(e.target.value)} placeholder="Brief description..." />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Message</label>
              <textarea value={ticketMessage} onChange={(e) => setTicketMessage(e.target.value)}
                placeholder="Describe your issue in detail..."
                className="w-full min-h-[120px] bg-background border border-input rounded-md px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <Button className="w-full" onClick={submitTicket}>Submit Ticket</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenterTab;
