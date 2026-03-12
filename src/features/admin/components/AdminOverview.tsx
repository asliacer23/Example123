import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { ADMIN_METRICS, MONTHLY_REVENUE_DATA, USER_GROWTH_DATA, WEEKLY_ACTIVITY_DATA, SYSTEM_TYPE_DISTRIBUTION, PLAN_DISTRIBUTION_DATA } from "@/features/shared/data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, Tooltip, PieChart, Pie, Cell, AreaChart, Area, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.4 } }),
};

const AdminOverview = () => {
  const m = ADMIN_METRICS;

  const stats = [
    { label: "Total Users", value: m.totalUsers.toLocaleString(), emoji: "👥" },
    { label: "Active Students", value: m.activeStudents.toLocaleString(), emoji: "🎓" },
    { label: "Systems Generated", value: m.systemsGenerated.toLocaleString(), emoji: "📁" },
    { label: "Monthly Revenue", value: `₱${m.monthlyRevenue.toLocaleString()}`, emoji: "💰" },
    { label: "AI Credits Used", value: `${(m.aiCreditsUsed / 1000).toFixed(1)}K`, emoji: "🤖" },
    { label: "Storage Used", value: `${m.storageUsed} GB`, emoji: "💾" },
    { label: "Weekly Signups", value: `${m.weeklySignups}`, emoji: "📈" },
    { label: "Avg Session", value: `${m.avgSessionMinutes} min`, emoji: "⏱️" },
  ];

  const tooltipStyle = {
    background: 'hsl(var(--card))',
    border: '1px solid hsl(var(--border))',
    borderRadius: '8px',
    color: 'hsl(var(--foreground))',
    fontSize: '12px',
  };

  return (
    <div className="space-y-6 w-full">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial="hidden" animate="visible" variants={fadeUp} custom={i}
            className="dashboard-card p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{s.emoji}</span>
              <span className="text-sm text-muted-foreground">{s.label}</span>
            </div>
            <p className="text-3xl font-display font-bold">{s.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={8}
          className="dashboard-card p-6">
          <h4 className="font-display font-semibold text-lg mb-4">Monthly Revenue (₱)</h4>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={MONTHLY_REVENUE_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="revenue" fill="hsl(var(--foreground))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* User Growth */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={9}
          className="dashboard-card p-6">
          <h4 className="font-display font-semibold text-lg mb-4">User Growth</h4>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={USER_GROWTH_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="users" stroke="hsl(var(--foreground))" fill="hsl(var(--foreground) / 0.1)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Plan Distribution Pie */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={10}
          className="dashboard-card p-6">
          <h4 className="font-display font-semibold text-lg mb-4">Plan Distribution</h4>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={PLAN_DISTRIBUTION_DATA} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5}
                dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {PLAN_DISTRIBUTION_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* System Type Distribution */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={11}
          className="dashboard-card p-6">
          <h4 className="font-display font-semibold text-lg mb-4">System Types</h4>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={SYSTEM_TYPE_DISTRIBUTION} cx="50%" cy="50%" outerRadius={100} paddingAngle={3}
                dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {SYSTEM_TYPE_DISTRIBUTION.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Weekly Activity */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={12}
          className="dashboard-card p-6">
          <h4 className="font-display font-semibold text-lg mb-4">Weekly Activity</h4>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={WEEKLY_ACTIVITY_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="sessions" fill="hsl(var(--foreground))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="generations" fill="hsl(var(--muted-foreground))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Revenue by Plan */}
      <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={13}
        className="dashboard-card p-6">
        <h4 className="font-display font-semibold text-lg mb-6">Revenue Simulation by Plan</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Basic ({m.basicUsers} users)</span>
              <span className="font-medium">₱{(m.basicUsers * 1500).toLocaleString()}</span>
            </div>
            <Progress value={(m.basicUsers / m.totalUsers) * 100} className="h-3" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Pro ({m.proUsers} users)</span>
              <span className="font-medium">₱{(m.proUsers * 3000).toLocaleString()}</span>
            </div>
            <Progress value={(m.proUsers / m.totalUsers) * 100} className="h-3" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Capstone ({m.capstoneUsers} users)</span>
              <span className="font-medium">₱{(m.capstoneUsers * 5000).toLocaleString()}</span>
            </div>
            <Progress value={(m.capstoneUsers / m.totalUsers) * 100} className="h-3" />
          </div>
        </div>
      </motion.div>

      {/* Platform Health */}
      <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={14}
        className="dashboard-card p-6">
        <h4 className="font-display font-semibold text-lg mb-6">Platform Health</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Server Uptime</p>
            <p className="text-2xl font-display font-bold">99.9%</p>
            <Progress value={99.9} className="h-2 mt-2" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">AI Credit Usage</p>
            <p className="text-2xl font-display font-bold">{((m.aiCreditsUsed / m.totalAiCredits) * 100).toFixed(0)}%</p>
            <Progress value={(m.aiCreditsUsed / m.totalAiCredits) * 100} className="h-2 mt-2" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Storage Capacity</p>
            <p className="text-2xl font-display font-bold">{((m.storageUsed / m.totalStorage) * 100).toFixed(0)}%</p>
            <Progress value={(m.storageUsed / m.totalStorage) * 100} className="h-2 mt-2" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Conversion Rate</p>
            <p className="text-2xl font-display font-bold">{m.conversionRate}%</p>
            <Progress value={m.conversionRate} className="h-2 mt-2" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminOverview;
