import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06 } }),
};

const services = [
  { name: 'Web Server', status: 'operational', uptime: '99.99%', emoji: '🌐', latency: '45ms' },
  { name: 'Database Server', status: 'operational', uptime: '99.95%', emoji: '🗄️', latency: '12ms' },
  { name: 'AI Engine', status: 'operational', uptime: '99.90%', emoji: '🤖', latency: '280ms' },
  { name: 'File Storage', status: 'operational', uptime: '99.99%', emoji: '💾', latency: '35ms' },
  { name: 'Email Service', status: 'operational', uptime: '99.85%', emoji: '📧', latency: '120ms' },
  { name: 'CDN', status: 'operational', uptime: '99.99%', emoji: '⚡', latency: '8ms' },
  { name: 'Payment Gateway', status: 'operational', uptime: '99.95%', emoji: '💳', latency: '200ms' },
  { name: 'DNS Service', status: 'operational', uptime: '100%', emoji: '🔗', latency: '5ms' },
];

const AdminSystemHealth = () => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="font-display font-bold text-3xl mb-2">System Health</h3>
          <p className="text-muted-foreground text-lg">Monitor platform infrastructure and performance.</p>
        </div>
        <Button onClick={() => toast.success("Health check initiated!")}>Run Health Check</Button>
      </div>

      {/* Overall Status */}
      <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}
        className="dashboard-card p-8 text-center mb-8">
        <span className="text-6xl block mb-4">✅</span>
        <h4 className="font-display font-bold text-2xl mb-2">All Systems Operational</h4>
        <p className="text-muted-foreground">Last checked: {new Date().toLocaleTimeString()}</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Overall Uptime', value: '99.97%', emoji: '📊' },
          { label: 'Avg Response Time', value: '88ms', emoji: '⚡' },
          { label: 'Active Connections', value: '234', emoji: '🔗' },
          { label: 'Error Rate', value: '0.03%', emoji: '🛡️' },
        ].map((s, i) => (
          <motion.div key={s.label} initial="hidden" animate="visible" variants={fadeUp} custom={i + 1}
            className="dashboard-card p-6">
            <span className="text-2xl block mb-2">{s.emoji}</span>
            <p className="text-2xl font-display font-bold">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Services */}
      <h4 className="font-display font-semibold text-xl mb-4">Services</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {services.map((s, i) => (
          <motion.div key={s.name} initial="hidden" animate="visible" variants={fadeUp} custom={i + 5}
            className="dashboard-card p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{s.emoji}</span>
              <div>
                <p className="font-medium text-sm">{s.name}</p>
                <p className="text-xs text-muted-foreground">Latency: {s.latency}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs bg-success/20 text-success px-2 py-0.5 rounded-full capitalize">{s.status}</span>
              <p className="text-xs text-muted-foreground mt-1">{s.uptime}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Resource Usage */}
      <div className="mt-8">
        <h4 className="font-display font-semibold text-xl mb-4">Resource Usage</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'CPU Usage', value: 34 },
            { label: 'Memory', value: 62 },
            { label: 'Disk I/O', value: 28 },
            { label: 'Network', value: 45 },
          ].map((r, i) => (
            <motion.div key={r.label} initial="hidden" animate="visible" variants={fadeUp} custom={i + 13}
              className="dashboard-card p-5">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">{r.label}</span>
                <span className="font-medium">{r.value}%</span>
              </div>
              <Progress value={r.value} className="h-2" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminSystemHealth;
