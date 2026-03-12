import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const aiMetrics = {
  totalGenerations: 1284,
  todayGenerations: 47,
  avgResponseTime: '2.8s',
  successRate: 98.2,
  creditsConsumed: 89420,
  creditsTotal: 150000,
  modelsActive: 4,
  queuedJobs: 3,
};

const modelUsage = [
  { name: 'AutoStore GPT v4.2', generations: 542, credits: 38940, accuracy: 94, avgTime: '2.4s' },
  { name: 'SchemaForge v2.1', generations: 398, credits: 27860, accuracy: 97, avgTime: '3.1s' },
  { name: 'UIVision v3.0', generations: 234, credits: 16380, accuracy: 91, avgTime: '1.8s' },
  { name: 'CodeCraft v1.8', generations: 110, credits: 6240, accuracy: 89, avgTime: '4.2s' },
];

const recentErrors = [
  { time: '14:32', model: 'CodeCraft', error: 'Token limit exceeded', resolution: 'Auto-truncated' },
  { time: '12:15', model: 'UIVision', error: 'Invalid layout constraint', resolution: 'Fallback applied' },
  { time: '09:45', model: 'SchemaForge', error: 'Circular dependency detected', resolution: 'Schema restructured' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05 } }),
};

const AdminAIManager = () => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="font-display font-bold text-3xl mb-2">AI Management</h3>
          <p className="text-muted-foreground text-lg">Monitor and configure AI models and generation pipeline.</p>
        </div>
        <Button onClick={() => toast.success("AI health check initiated!")} className="hover:scale-105 transition-transform">
          Health Check
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Generations', value: aiMetrics.totalGenerations.toLocaleString() },
          { label: 'Today', value: aiMetrics.todayGenerations.toString() },
          { label: 'Success Rate', value: `${aiMetrics.successRate}%` },
          { label: 'Avg Response', value: aiMetrics.avgResponseTime },
        ].map((s, i) => (
          <motion.div key={s.label} initial="hidden" animate="visible" variants={fadeUp} custom={i}
            className="dashboard-card p-5 group hover:border-foreground/20 transition-all duration-300">
            <p className="text-2xl font-display font-bold group-hover:scale-105 transition-transform origin-left">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Credit Usage */}
      <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={4}
        className="dashboard-card p-6 mb-8">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Platform AI Credits</span>
          <span className="font-medium">{aiMetrics.creditsConsumed.toLocaleString()} / {aiMetrics.creditsTotal.toLocaleString()}</span>
        </div>
        <Progress value={(aiMetrics.creditsConsumed / aiMetrics.creditsTotal) * 100} className="h-3" />
        <p className="text-xs text-muted-foreground mt-2">
          {((aiMetrics.creditsConsumed / aiMetrics.creditsTotal) * 100).toFixed(1)}% consumed — {(aiMetrics.creditsTotal - aiMetrics.creditsConsumed).toLocaleString()} remaining
        </p>
      </motion.div>

      {/* Model Usage */}
      <h4 className="font-display font-semibold text-xl mb-4">Model Performance</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {modelUsage.map((m, i) => (
          <motion.div key={m.name} initial="hidden" animate="visible" variants={fadeUp} custom={i + 5}
            className="dashboard-card p-5 hover:border-foreground/20 hover:-translate-y-0.5 transition-all duration-300">
            <h4 className="font-display font-semibold mb-3">{m.name}</h4>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div><span className="text-muted-foreground">Generations</span><p className="font-bold text-lg">{m.generations}</p></div>
              <div><span className="text-muted-foreground">Credits Used</span><p className="font-bold text-lg">{(m.credits / 1000).toFixed(1)}K</p></div>
              <div>
                <span className="text-muted-foreground">Accuracy</span>
                <p className="font-bold text-lg">{m.accuracy}%</p>
                <Progress value={m.accuracy} className="h-1 mt-1" />
              </div>
              <div><span className="text-muted-foreground">Avg Time</span><p className="font-bold text-lg">{m.avgTime}</p></div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Errors */}
      <h4 className="font-display font-semibold text-xl mb-4">Recent Issues</h4>
      <div className="space-y-2">
        {recentErrors.map((e, i) => (
          <motion.div key={i} initial="hidden" animate="visible" variants={fadeUp} custom={i + 9}
            className="dashboard-card p-4 flex items-center justify-between hover:border-foreground/10 transition-all duration-200">
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono text-muted-foreground">{e.time}</span>
              <div>
                <p className="text-sm font-medium">{e.error}</p>
                <p className="text-xs text-muted-foreground">{e.model} — {e.resolution}</p>
              </div>
            </div>
            <span className="text-xs bg-accent px-2 py-0.5 rounded-full">Resolved</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminAIManager;
