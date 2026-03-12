import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ADMIN_METRICS } from "@/features/shared/data/mockData";
import { toast } from "sonner";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";

const tooltipStyle = {
  background: 'hsl(var(--card))',
  border: '1px solid hsl(var(--border))',
  borderRadius: '8px',
  color: 'hsl(var(--foreground))',
  fontSize: '12px',
};

const dailyRevenue = [
  { date: 'Dec 14', revenue: 18500 },
  { date: 'Dec 15', revenue: 22000 },
  { date: 'Dec 16', revenue: 15000 },
  { date: 'Dec 17', revenue: 28000 },
  { date: 'Dec 18', revenue: 31000 },
  { date: 'Dec 19', revenue: 24500 },
  { date: 'Dec 20', revenue: 35000 },
];

const planBreakdown = [
  { plan: 'Basic', users: 312, revenue: 312 * 1500, percent: 36.8 },
  { plan: 'Pro', users: 378, revenue: 378 * 3000, percent: 44.6 },
  { plan: 'Capstone', users: 157, revenue: 157 * 5000, percent: 18.5 },
];

const AdminReports = () => {
  const m = ADMIN_METRICS;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="font-display font-bold text-3xl mb-2">Reports</h3>
          <p className="text-muted-foreground text-lg">Detailed platform analytics and reports.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => toast.success("Report exported as PDF!")}>Export PDF</Button>
          <Button onClick={() => toast.success("Report generated!")}>Generate Report</Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Revenue', value: `₱${(m.monthlyRevenue * 6).toLocaleString()}`, emoji: '💰', sub: 'All Time' },
          { label: 'Avg Revenue/User', value: `₱${Math.round(m.monthlyRevenue / m.totalUsers).toLocaleString()}`, emoji: '📈', sub: 'Monthly' },
          { label: 'Churn Rate', value: '2.4%', emoji: '📉', sub: 'This Month' },
          { label: 'Retention Rate', value: '97.6%', emoji: '🎯', sub: 'This Month' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            className="dashboard-card p-6">
            <span className="text-2xl block mb-2">{s.emoji}</span>
            <p className="text-2xl font-display font-bold">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label} • {s.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Daily Revenue Chart */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="dashboard-card p-6 mb-8">
        <h4 className="font-display font-semibold text-lg mb-4">Daily Revenue (Last 7 Days)</h4>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={dailyRevenue}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="revenue" fill="hsl(var(--foreground))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Plan Revenue Breakdown */}
      <h4 className="font-display font-semibold text-xl mb-4">Revenue by Plan</h4>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {planBreakdown.map((p, i) => (
          <motion.div key={p.plan} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="dashboard-card p-6 text-center">
            <p className="text-sm text-muted-foreground mb-1">{p.plan}</p>
            <p className="text-3xl font-display font-bold mb-1">₱{p.revenue.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">{p.users} users • {p.percent}%</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminReports;
