import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const domainsList = [
  { domain: 'campusmerch.autostore-im.app', owner: 'Juan Dela Cruz', ssl: true, status: 'active', traffic: '1.2K/day' },
  { domain: 'bcpinventory.autostore-im.app', owner: 'Juan Dela Cruz', ssl: true, status: 'active', traffic: '890/day' },
  { domain: 'mariasclinic.autostore-im.app', owner: 'Maria Santos', ssl: true, status: 'active', traffic: '456/day' },
  { domain: 'schoolhub.autostore-im.app', owner: 'Maria Santos', ssl: true, status: 'active', traffic: '234/day' },
  { domain: 'pedrofolio.autostore-im.app', owner: 'Pedro Reyes', ssl: true, status: 'active', traffic: '120/day' },
  { domain: 'anastore.autostore-im.app', owner: 'Ana Garcia', ssl: false, status: 'pending', traffic: '0/day' },
];

const AdminDomains = () => {
  return (
    <div className="w-full">
      <h3 className="font-display font-bold text-3xl mb-2">Domain Management</h3>
      <p className="text-muted-foreground mb-8 text-lg">Manage all platform domains and DNS settings.</p>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Domains', value: domainsList.length, emoji: '🌐' },
          { label: 'Active', value: domainsList.filter(d => d.status === 'active').length, emoji: '✅' },
          { label: 'SSL Secured', value: domainsList.filter(d => d.ssl).length, emoji: '🔒' },
          { label: 'Daily Traffic', value: '2.9K', emoji: '📈' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            className="dashboard-card p-5 text-center">
            <span className="text-xl block mb-1">{s.emoji}</span>
            <p className="text-2xl font-display font-bold">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="dashboard-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Domain</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium hidden sm:table-cell">Owner</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">SSL</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium hidden md:table-cell">Traffic</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Status</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {domainsList.map((d, i) => (
              <motion.tr key={d.domain} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                className="border-b border-border/30">
                <td className="py-3 px-4 font-mono text-xs">{d.domain}</td>
                <td className="py-3 px-4 hidden sm:table-cell">{d.owner}</td>
                <td className="py-3 px-4">{d.ssl ? '🔒' : '⚠️'}</td>
                <td className="py-3 px-4 hidden md:table-cell">{d.traffic}</td>
                <td className="py-3 px-4">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${d.status === 'active' ? 'bg-success/20 text-success' : 'bg-accent'}`}>{d.status}</span>
                </td>
                <td className="py-3 px-4">
                  <Button size="sm" variant="ghost" onClick={() => toast.info(`Managing ${d.domain}...`)}>Manage</Button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDomains;
