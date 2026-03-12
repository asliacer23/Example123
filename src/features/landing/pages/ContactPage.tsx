import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/features/shared/components/Navbar";
import ParticleBackground from "@/features/shared/components/ParticleBackground";
import { toast } from "sonner";

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) { toast.error("Please fill all fields"); return; }
    toast.success("Message sent! We'll respond within 24 hours.");
    setName(''); setEmail(''); setMessage('');
  };

  return (
    <div className="min-h-screen relative">
      <ParticleBackground />
      <Navbar />
      <div className="pt-24 section-padding">
        <div className="w-full px-4 sm:px-8 max-w-4xl mx-auto">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-5xl sm:text-6xl font-display font-bold text-center mb-4">Contact Us</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-muted-foreground text-center mb-16 text-lg">Get in touch with the AutoStore IM team.</motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="dashboard-card p-8 space-y-5">
              <h3 className="font-display font-bold text-xl mb-2">Send a Message</h3>
              <div>
                <label className="text-sm font-medium block mb-1">Name</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Email</label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Message</label>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help?"
                  className="w-full min-h-[150px] bg-background border border-input rounded-md px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <Button type="submit" className="w-full" size="lg">Send Message →</Button>
            </motion.form>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="space-y-6">
              {[
                { emoji: '📧', title: 'Email', info: 'support@autostore.im', sub: 'We respond within 24 hours' },
                { emoji: '🏫', title: 'Location', info: 'Bestlink College of the Philippines', sub: 'Quezon City, Metro Manila' },
                { emoji: '🕐', title: 'Office Hours', info: 'Mon - Fri: 8:00 AM - 5:00 PM', sub: 'Philippine Standard Time (PST)' },
                { emoji: '📱', title: 'Phone', info: '+63 2 1234 5678', sub: 'Available during office hours' },
              ].map((item) => (
                <div key={item.title} className="dashboard-card p-6 flex items-start gap-4">
                  <span className="text-3xl">{item.emoji}</span>
                  <div>
                    <h4 className="font-display font-semibold">{item.title}</h4>
                    <p className="text-sm font-medium">{item.info}</p>
                    <p className="text-xs text-muted-foreground">{item.sub}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
