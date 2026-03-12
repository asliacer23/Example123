import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ADMIN_METRICS } from "@/features/shared/data/mockData";
import { toast } from "sonner";

const recentPayments = [
  { id: 'PAY-301', user: 'Maria Santos', amount: 5000, plan: 'Capstone', method: 'GCash', date: '2025-12-20', status: 'completed' },
  { id: 'PAY-300', user: 'Rafael Aquino', amount: 3000, plan: 'Pro', method: 'GCash', date: '2025-12-20', status: 'completed' },
  { id: 'PAY-299', user: 'Ana Garcia', amount: 3000, plan: 'Pro', method: 'Bank Transfer', date: '2025-12-19', status: 'completed' },
  { id: 'PAY-298', user: 'Pedro Reyes', amount: 1500, plan: 'Basic', method: 'PayMaya', date: '2025-12-19', status: 'completed' },
  { id: 'PAY-297', user: 'Camille Bautista', amount: 5000, plan: 'Capstone', method: 'GCash', date: '2025-12-18', status: 'completed' },
  { id: 'PAY-296', user: 'Carlos Mendoza', amount: 1500, plan: 'Basic', method: 'GCash', date: '2025-12-18', status: 'pending' },
];

const AdminBilling = () => {
  const m = ADMIN_METRICS;

  return (
    <div className="w-full">
      <h3 className="font-display font-bold text-3xl mb-2">Billing Management</h3>
      <p className="text-muted-foreground mb-8 text-lg">Monitor payments, subscriptions, and revenue.</p>

      {/* Revenue Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Monthly Revenue', value: `₱${m.monthlyRevenue.toLocaleString()}`, emoji: '💰' },
          { label: 'Pending Payments', value: '₱4,500', emoji: '⏳' },
          { label: 'Total Subscribers', value: m.totalUsers.toLocaleString(), emoji: '👥' },
          { label: 'Avg Revenue/User', value: `₱${Math.round(m.monthlyRevenue / m.totalUsers).toLocaleString()}`, emoji: '📈' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            className="dashboard-card p-6">
            <span className="text-2xl block mb-2">{s.emoji}</span>
            <p className="text-2xl font-display font-bold">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Plan Revenue */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { plan: 'Basic', users: m.basicUsers, price: 1500 },
          { plan: 'Pro', users: m.proUsers, price: 3000 },
          { plan: 'Capstone', users: m.capstoneUsers, price: 5000 },
        ].map((p, i) => (
          <motion.div key={p.plan} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: (i + 4) * 0.06 }}
            className="dashboard-card p-6">
            <h4 className="font-display font-semibold mb-3">{p.plan} Plan</h4>
            <p className="text-2xl font-display font-bold mb-1">₱{(p.users * p.price).toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mb-3">{p.users} subscribers × ₱{p.price.toLocaleString()}</p>
            <Progress value={(p.users / m.totalUsers) * 100} className="h-2" />
          </motion.div>
        ))}
      </div>

      {/* Recent Payments */}
      <h4 className="font-display font-semibold text-xl mb-4">Recent Payments</h4>
      <div className="dashboard-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">ID</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Student</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Amount</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium hidden sm:table-cell">Plan</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium hidden md:table-cell">Method</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Status</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {recentPayments.map((p, i) => (
              <motion.tr key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                className="border-b border-border/30">
                <td className="py-3 px-4 font-mono text-xs">{p.id}</td>
                <td className="py-3 px-4">{p.user}</td>
                <td className="py-3 px-4 font-semibold">₱{p.amount.toLocaleString()}</td>
                <td className="py-3 px-4 hidden sm:table-cell">{p.plan}</td>
                <td className="py-3 px-4 hidden md:table-cell">{p.method}</td>
                <td className="py-3 px-4">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${p.status === 'completed' ? 'bg-success/20 text-success' : 'bg-accent text-muted-foreground'}`}>{p.status}</span>
                </td>
                <td className="py-3 px-4">
                  <Button size="sm" variant="ghost" onClick={() => toast.info(`Viewing ${p.id}...`)}>View</Button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBilling;
