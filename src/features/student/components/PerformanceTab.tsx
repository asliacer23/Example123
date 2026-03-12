import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, BarChart, Bar } from "recharts";

const responseTimeData = [
  { time: '00:00', avg: 120, p95: 250 },
  { time: '04:00', avg: 85, p95: 180 },
  { time: '08:00', avg: 145, p95: 320 },
  { time: '12:00', avg: 180, p95: 400 },
  { time: '16:00', avg: 165, p95: 350 },
  { time: '20:00', avg: 130, p95: 280 },
  { time: '23:59', avg: 95, p95: 200 },
];

const pageLoadData = [
  { page: 'Home', load: 1.2 },
  { page: 'Products', load: 1.8 },
  { page: 'Cart', load: 0.9 },
  { page: 'Checkout', load: 2.1 },
  { page: 'Profile', load: 0.7 },
  { page: 'Orders', load: 1.5 },
];

const tooltipStyle = {
  background: 'hsl(var(--card))',
  border: '1px solid hsl(var(--border))',
  borderRadius: '8px',
  color: 'hsl(var(--foreground))',
  fontSize: '12px',
};

const lighthouseScores = [
  { name: 'Performance', score: 94 },
  { name: 'Accessibility', score: 98 },
  { name: 'Best Practices', score: 92 },
  { name: 'SEO', score: 96 },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05 } }),
};

const PerformanceTab = () => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="font-display font-bold text-3xl mb-2">Performance</h3>
          <p className="text-muted-foreground text-lg">Monitor your system speed and optimization.</p>
        </div>
        <Button onClick={() => toast.success("Performance audit started!")} className="hover:scale-105 transition-transform">
          Run Audit
        </Button>
      </div>

      {/* Lighthouse Scores */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {lighthouseScores.map((s, i) => (
          <motion.div key={s.name} initial="hidden" animate="visible" variants={fadeUp} custom={i}
            className="dashboard-card p-6 text-center group hover:border-foreground/20 transition-all duration-300">
            <div className="relative w-20 h-20 mx-auto mb-3">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--border))" strokeWidth="8" />
                <motion.circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--foreground))" strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 40 * (1 - s.score / 100) }}
                  transition={{ duration: 1, delay: i * 0.15 }}
                  strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-display font-bold group-hover:scale-110 transition-transform">{s.score}</span>
              </div>
            </div>
            <p className="text-sm font-medium">{s.name}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={4}
          className="dashboard-card p-6">
          <h4 className="font-display font-semibold text-lg mb-4">Response Time (24h)</h4>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={responseTimeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={11} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} unit="ms" />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="avg" stroke="hsl(var(--foreground))" fill="hsl(var(--foreground) / 0.1)" strokeWidth={2} name="Avg" />
              <Area type="monotone" dataKey="p95" stroke="hsl(var(--muted-foreground))" fill="hsl(var(--muted-foreground) / 0.05)" strokeWidth={1} strokeDasharray="4 4" name="P95" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={5}
          className="dashboard-card p-6">
          <h4 className="font-display font-semibold text-lg mb-4">Page Load Times</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={pageLoadData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="page" stroke="hsl(var(--muted-foreground))" fontSize={11} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} unit="s" />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="load" fill="hsl(var(--foreground))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Quick Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Time to First Byte', value: '45ms', status: 'good' },
          { label: 'First Contentful Paint', value: '0.8s', status: 'good' },
          { label: 'Largest Contentful Paint', value: '1.2s', status: 'good' },
          { label: 'Cumulative Layout Shift', value: '0.02', status: 'good' },
          { label: 'Total Blocking Time', value: '120ms', status: 'good' },
          { label: 'Speed Index', value: '1.1s', status: 'good' },
          { label: 'Interaction to Next Paint', value: '85ms', status: 'good' },
          { label: 'Bundle Size', value: '245 KB', status: 'good' },
        ].map((m, i) => (
          <motion.div key={m.label} initial="hidden" animate="visible" variants={fadeUp} custom={i + 6}
            className="dashboard-card p-4 hover:border-foreground/10 transition-all duration-200">
            <p className="text-xs text-muted-foreground mb-1">{m.label}</p>
            <p className="text-lg font-display font-bold">{m.value}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceTab;
