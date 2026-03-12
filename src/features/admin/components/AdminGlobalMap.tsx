import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

const trafficByCountry = [
  { country: 'Philippines', visits: 12450, percentage: 82 },
  { country: 'Singapore', visits: 845, percentage: 6 },
  { country: 'Japan', visits: 634, percentage: 4 },
  { country: 'South Korea', visits: 423, percentage: 3 },
  { country: 'USA', visits: 312, percentage: 2 },
  { country: 'Others', visits: 456, percentage: 3 },
];

const regionData = [
  { name: 'NCR', value: 42, fill: 'hsl(var(--foreground))' },
  { name: 'CALABARZON', value: 18, fill: 'hsl(var(--muted-foreground))' },
  { name: 'Central Luzon', value: 12, fill: 'hsl(var(--accent-foreground))' },
  { name: 'Visayas', value: 15, fill: 'hsl(var(--secondary-foreground))' },
  { name: 'Mindanao', value: 13, fill: 'hsl(var(--border))' },
];

const hourlyTraffic = [
  { hour: '6AM', users: 45 }, { hour: '8AM', users: 120 }, { hour: '10AM', users: 210 },
  { hour: '12PM', users: 280 }, { hour: '2PM', users: 245 }, { hour: '4PM', users: 190 },
  { hour: '6PM', users: 310 }, { hour: '8PM', users: 350 }, { hour: '10PM', users: 180 },
  { hour: '12AM', users: 65 },
];

const serverNodes = [
  { name: 'PH-Manila-01', load: 45, status: 'healthy', connections: 234 },
  { name: 'PH-Manila-02', load: 38, status: 'healthy', connections: 198 },
  { name: 'SG-Primary', load: 22, status: 'healthy', connections: 67 },
  { name: 'JP-Tokyo', load: 15, status: 'healthy', connections: 34 },
  { name: 'US-Oregon', load: 8, status: 'standby', connections: 12 },
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
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05 } }),
};

const AdminGlobalMap = () => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="font-display font-bold text-3xl mb-2">Global Analytics</h3>
          <p className="text-muted-foreground text-lg">Platform traffic and deployment across regions.</p>
        </div>
        <Button onClick={() => toast.success("Refreshing data...")} className="hover:scale-105 transition-transform">
          Refresh
        </Button>
      </div>

      {/* Global Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Visits (30d)', value: '15,120' },
          { label: 'Unique Visitors', value: '4,287' },
          { label: 'Active Regions', value: '7' },
          { label: 'Server Nodes', value: '5' },
        ].map((s, i) => (
          <motion.div key={s.label} initial="hidden" animate="visible" variants={fadeUp} custom={i}
            className="dashboard-card p-5 group hover:border-foreground/20 transition-all duration-300">
            <p className="text-2xl font-display font-bold group-hover:scale-105 transition-transform origin-left">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Hourly Traffic */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={4}
          className="dashboard-card p-6">
          <h4 className="font-display font-semibold text-lg mb-4">Hourly Traffic (Today)</h4>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={hourlyTraffic}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" fontSize={11} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="users" stroke="hsl(var(--foreground))" fill="hsl(var(--foreground) / 0.1)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Region Distribution */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={5}
          className="dashboard-card p-6">
          <h4 className="font-display font-semibold text-lg mb-4">Traffic by Region</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={regionData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3}
                dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {regionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Traffic by Country */}
      <h4 className="font-display font-semibold text-xl mb-4">Traffic by Country</h4>
      <div className="dashboard-card mb-8 overflow-hidden">
        {trafficByCountry.map((c, i) => (
          <motion.div key={c.country} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
            className="flex items-center gap-4 p-4 border-b border-border/30 last:border-0 hover:bg-accent/30 transition-colors">
            <span className="font-medium text-sm w-32">{c.country}</span>
            <div className="flex-1">
              <motion.div className="h-2 bg-foreground/80 rounded-full" initial={{ width: 0 }} animate={{ width: `${c.percentage}%` }}
                transition={{ delay: i * 0.1, duration: 0.8 }} />
            </div>
            <span className="text-sm font-mono w-20 text-right">{c.visits.toLocaleString()}</span>
            <span className="text-xs text-muted-foreground w-10 text-right">{c.percentage}%</span>
          </motion.div>
        ))}
      </div>

      {/* Server Nodes */}
      <h4 className="font-display font-semibold text-xl mb-4">Server Nodes</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {serverNodes.map((node, i) => (
          <motion.div key={node.name} initial="hidden" animate="visible" variants={fadeUp} custom={i}
            className="dashboard-card p-5 hover:border-foreground/20 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-sm font-medium">{node.name}</span>
              <span className={`w-2.5 h-2.5 rounded-full ${node.status === 'healthy' ? 'bg-foreground' : 'bg-muted-foreground/50'}`} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs"><span className="text-muted-foreground">Load</span><span>{node.load}%</span></div>
              <Progress value={node.load} className="h-1.5" />
              <div className="flex justify-between text-xs"><span className="text-muted-foreground">Connections</span><span>{node.connections}</span></div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminGlobalMap;
