import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const auditEntries = [
  { id: 1, actor: 'Admin', action: 'Updated platform settings', resource: 'Settings', ip: '192.168.1.1', time: '10 min ago', emoji: '⚙️' },
  { id: 2, actor: 'Admin', action: 'Approved user registration', resource: 'Users', ip: '192.168.1.1', time: '30 min ago', emoji: '✅' },
  { id: 3, actor: 'System', action: 'Automated backup completed', resource: 'Database', ip: 'Internal', time: '2 hours ago', emoji: '💾' },
  { id: 4, actor: 'Admin', action: 'Disabled maintenance mode', resource: 'Settings', ip: '192.168.1.1', time: '4 hours ago', emoji: '🔧' },
  { id: 5, actor: 'System', action: 'SSL certificates renewed', resource: 'Security', ip: 'Internal', time: '6 hours ago', emoji: '🔒' },
  { id: 6, actor: 'Admin', action: 'Exported user report', resource: 'Reports', ip: '192.168.1.1', time: '8 hours ago', emoji: '📤' },
  { id: 7, actor: 'System', action: 'Rate limit triggered', resource: 'API', ip: '203.177.x.x', time: '12 hours ago', emoji: '🛡️' },
  { id: 8, actor: 'Admin', action: 'Updated pricing plans', resource: 'Billing', ip: '192.168.1.1', time: '1 day ago', emoji: '💰' },
  { id: 9, actor: 'System', action: 'Cron job: cleanup expired sessions', resource: 'Auth', ip: 'Internal', time: '1 day ago', emoji: '🗑️' },
  { id: 10, actor: 'Admin', action: 'Reset user password', resource: 'Users', ip: '192.168.1.1', time: '2 days ago', emoji: '🔑' },
];

const AdminAuditLog = () => {
  const [search, setSearch] = useState('');
  const filtered = auditEntries.filter(e =>
    e.action.toLowerCase().includes(search.toLowerCase()) || e.actor.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="font-display font-bold text-3xl mb-2">Audit Log</h3>
          <p className="text-muted-foreground text-lg">Track all administrative actions for compliance.</p>
        </div>
        <Button variant="outline" onClick={() => toast.success("Audit log exported!")}>Export Log</Button>
      </div>

      <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search audit entries..." className="mb-6" />

      <div className="dashboard-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Actor</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Action</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium hidden sm:table-cell">Resource</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium hidden md:table-cell">IP Address</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Time</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((e, i) => (
              <motion.tr key={e.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                className="border-b border-border/30 hover:bg-accent/30 transition-colors">
                <td className="py-3 px-4 font-medium">
                  <span className="mr-2">{e.emoji}</span>{e.actor}
                </td>
                <td className="py-3 px-4">{e.action}</td>
                <td className="py-3 px-4 hidden sm:table-cell"><span className="text-xs bg-secondary px-2 py-0.5 rounded">{e.resource}</span></td>
                <td className="py-3 px-4 font-mono text-xs hidden md:table-cell">{e.ip}</td>
                <td className="py-3 px-4 text-muted-foreground">{e.time}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAuditLog;
