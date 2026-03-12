import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const backups = [
  { id: 1, date: '2025-12-20 02:00 AM', size: '2.4 MB', status: 'completed', type: 'Auto' },
  { id: 2, date: '2025-12-19 02:00 AM', size: '2.3 MB', status: 'completed', type: 'Auto' },
  { id: 3, date: '2025-12-18 14:30 PM', size: '2.3 MB', status: 'completed', type: 'Manual' },
  { id: 4, date: '2025-12-18 02:00 AM', size: '2.2 MB', status: 'completed', type: 'Auto' },
  { id: 5, date: '2025-12-17 02:00 AM', size: '2.1 MB', status: 'completed', type: 'Auto' },
];

const queryLogs = [
  { query: 'SELECT * FROM products WHERE stock < 10', time: '45ms', rows: 3, timestamp: '2 min ago' },
  { query: 'INSERT INTO orders (user_id, total) VALUES ($1, $2)', time: '12ms', rows: 1, timestamp: '15 min ago' },
  { query: 'UPDATE inventory SET quantity = quantity - 1 WHERE product_id = $1', time: '8ms', rows: 1, timestamp: '20 min ago' },
  { query: 'SELECT COUNT(*) FROM users WHERE status = \'active\'', time: '5ms', rows: 1, timestamp: '1 hour ago' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06 } }),
};

const DatabaseAdvancedTab = () => {
  return (
    <div className="w-full">
      <h3 className="font-display font-bold text-3xl mb-2">Database Advanced</h3>
      <p className="text-muted-foreground mb-8 text-lg">Advanced database management, backups, and query logs.</p>

      {/* DB Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Queries Today', value: '1,247', emoji: '📝' },
          { label: 'Avg Query Time', value: '18ms', emoji: '⚡' },
          { label: 'Active Connections', value: '3', emoji: '🔗' },
          { label: 'Last Backup', value: '6h ago', emoji: '💾' },
        ].map((s, i) => (
          <motion.div key={s.label} initial="hidden" animate="visible" variants={fadeUp} custom={i}
            className="dashboard-card p-5">
            <span className="text-xl block mb-2">{s.emoji}</span>
            <p className="text-2xl font-display font-bold">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Backups */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-display font-semibold text-xl">Backups</h4>
            <Button size="sm" onClick={() => toast.success("Manual backup initiated!")}>Create Backup</Button>
          </div>
          <div className="space-y-2">
            {backups.map((b, i) => (
              <motion.div key={b.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                className="dashboard-card p-4 flex items-center justify-between">
                <div>
                  <p className="font-mono text-xs">{b.date}</p>
                  <p className="text-xs text-muted-foreground">{b.size} • {b.type}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-success/20 text-success px-2 py-0.5 rounded-full">{b.status}</span>
                  <Button size="sm" variant="ghost" onClick={() => toast.success("Restoring backup...")}>Restore</Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Query Log */}
        <div>
          <h4 className="font-display font-semibold text-xl mb-4">Recent Queries</h4>
          <div className="space-y-2">
            {queryLogs.map((q, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                className="dashboard-card p-4">
                <p className="font-mono text-xs text-foreground mb-2 break-all">{q.query}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>⚡ {q.time}</span>
                  <span>📋 {q.rows} row{q.rows !== 1 ? 's' : ''}</span>
                  <span>🕐 {q.timestamp}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Schema Visualization */}
      <div className="mt-8">
        <h4 className="font-display font-semibold text-xl mb-4">Schema Normalization</h4>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {['1NF', '2NF', '3NF', '4NF'].map((nf, i) => (
            <motion.div key={nf} initial="hidden" animate="visible" variants={fadeUp} custom={i}
              className="dashboard-card p-6 text-center">
              <span className="text-3xl font-display font-bold block mb-2">{nf}</span>
              <Progress value={100} className="h-2 mb-2" />
              <p className="text-xs text-success">✓ Compliant</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DatabaseAdvancedTab;
