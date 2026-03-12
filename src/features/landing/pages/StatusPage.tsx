import { motion } from "framer-motion";
import Navbar from "@/features/shared/components/Navbar";
import ParticleBackground from "@/features/shared/components/ParticleBackground";
import { Progress } from "@/components/ui/progress";

const services = [
  { name: 'Web Application', status: 'operational', uptime: '99.99%', emoji: '🌐' },
  { name: 'AI Generation Engine', status: 'operational', uptime: '99.90%', emoji: '🤖' },
  { name: 'Database Services', status: 'operational', uptime: '99.95%', emoji: '🗄️' },
  { name: 'Cloud Hosting', status: 'operational', uptime: '99.99%', emoji: '☁️' },
  { name: 'Domain Services', status: 'operational', uptime: '100%', emoji: '🔗' },
  { name: 'Payment Processing', status: 'operational', uptime: '99.95%', emoji: '💳' },
  { name: 'Email Service', status: 'operational', uptime: '99.85%', emoji: '📧' },
  { name: 'CDN / Static Assets', status: 'operational', uptime: '99.99%', emoji: '⚡' },
];

const incidents = [
  { date: 'Dec 15, 2025', title: 'Brief API latency spike', status: 'resolved', duration: '12 minutes' },
  { date: 'Dec 8, 2025', title: 'Email delivery delays', status: 'resolved', duration: '45 minutes' },
  { date: 'Nov 28, 2025', title: 'Scheduled maintenance', status: 'completed', duration: '2 hours' },
];

const StatusPage = () => (
  <div className="min-h-screen relative">
    <ParticleBackground />
    <Navbar />
    <div className="pt-24 section-padding">
      <div className="w-full px-4 sm:px-8 max-w-4xl mx-auto">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-5xl sm:text-6xl font-display font-bold text-center mb-4">System Status</motion.h1>
        
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
          className="dashboard-card p-8 text-center mb-8">
          <span className="text-6xl block mb-4">✅</span>
          <h2 className="font-display font-bold text-2xl mb-2">All Systems Operational</h2>
          <p className="text-muted-foreground">Updated: {new Date().toLocaleString()}</p>
        </motion.div>

        <div className="space-y-2 mb-12">
          {services.map((s, i) => (
            <motion.div key={s.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
              className="dashboard-card p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xl">{s.emoji}</span>
                <span className="font-medium text-sm">{s.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">{s.uptime}</span>
                <span className="text-xs bg-success/20 text-success px-2 py-0.5 rounded-full">{s.status}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <h3 className="font-display font-bold text-2xl mb-4">Recent Incidents</h3>
        <div className="space-y-3">
          {incidents.map((inc, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 + i * 0.1 }}
              className="dashboard-card p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-sm">{inc.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{inc.date} • Duration: {inc.duration}</p>
                </div>
                <span className="text-xs bg-success/20 text-success px-2 py-0.5 rounded-full">{inc.status}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default StatusPage;
