import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/features/auth/context/AuthContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, AreaChart, Area } from "recharts";

const weeklyUsage = [
  { day: 'Mon', credits: 45, generations: 2 },
  { day: 'Tue', credits: 80, generations: 3 },
  { day: 'Wed', credits: 35, generations: 1 },
  { day: 'Thu', credits: 120, generations: 4 },
  { day: 'Fri', credits: 65, generations: 2 },
  { day: 'Sat', credits: 20, generations: 1 },
  { day: 'Sun', credits: 15, generations: 0 },
];

const monthlyProgress = [
  { week: 'Week 1', projects: 0, hours: 4 },
  { week: 'Week 2', projects: 1, hours: 8 },
  { week: 'Week 3', projects: 1, hours: 12 },
  { week: 'Week 4', projects: 2, hours: 18 },
];

const tooltipStyle = {
  background: 'hsl(var(--card))',
  border: '1px solid hsl(var(--border))',
  borderRadius: '8px',
  color: 'hsl(var(--foreground))',
  fontSize: '12px',
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06 } }),
};

const AnalyticsTab = () => {
  const { user } = useAuth();
  if (!user) return null;

  const creditUsage = user.plan === 'pro' ? 32 : user.plan === 'capstone' ? 18 : 55;
  const storageUsage = user.storageTotal > 0 ? (user.storageUsed / user.storageTotal) * 100 : 0;

  return (
    <div className="w-full">
      <h3 className="font-display font-bold text-3xl mb-2">Personal Analytics</h3>
      <p className="text-muted-foreground mb-8 text-lg">Track your usage, performance, and progress.</p>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Generations', value: '7', emoji: '🤖' },
          { label: 'Templates Saved', value: '3', emoji: '🎨' },
          { label: 'Hours Active', value: '42', emoji: '⏱️' },
          { label: 'Domains Active', value: '2', emoji: '🌐' },
        ].map((s, i) => (
          <motion.div key={s.label} initial="hidden" animate="visible" variants={fadeUp} custom={i}
            className="dashboard-card p-6">
            <span className="text-2xl block mb-2">{s.emoji}</span>
            <p className="text-3xl font-display font-bold">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Usage Meters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={4} className="dashboard-card p-6">
          <p className="text-sm text-muted-foreground mb-2">AI Credits Used</p>
          <p className="text-2xl font-display font-bold mb-2">{creditUsage}%</p>
          <Progress value={creditUsage} className="h-2" />
          <p className="text-xs text-muted-foreground mt-2">{user.aiCredits} credits remaining</p>
        </motion.div>
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={5} className="dashboard-card p-6">
          <p className="text-sm text-muted-foreground mb-2">Storage Used</p>
          <p className="text-2xl font-display font-bold mb-2">{storageUsage.toFixed(0)}%</p>
          <Progress value={storageUsage} className="h-2" />
          <p className="text-xs text-muted-foreground mt-2">{user.storageUsed} / {user.storageTotal} GB</p>
        </motion.div>
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={6} className="dashboard-card p-6">
          <p className="text-sm text-muted-foreground mb-2">Projects Used</p>
          <p className="text-2xl font-display font-bold mb-2">{((user.projectsCreated / user.maxProjects) * 100).toFixed(0)}%</p>
          <Progress value={(user.projectsCreated / user.maxProjects) * 100} className="h-2" />
          <p className="text-xs text-muted-foreground mt-2">{user.projectsCreated} / {user.maxProjects} projects</p>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={7} className="dashboard-card p-6">
          <h4 className="font-display font-semibold text-lg mb-4">Weekly Credit Usage</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyUsage}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="credits" fill="hsl(var(--foreground))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={8} className="dashboard-card p-6">
          <h4 className="font-display font-semibold text-lg mb-4">Monthly Progress</h4>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={monthlyProgress}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="hours" stroke="hsl(var(--foreground))" fill="hsl(var(--foreground) / 0.1)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
};

export default AnalyticsTab;
