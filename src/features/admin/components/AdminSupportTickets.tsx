import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const tickets = [
  { id: 'TKT-045', user: 'Camille Bautista', subject: 'Cannot generate Clinic System', priority: 'high', status: 'open', time: '2 hours ago', emoji: '🔴' },
  { id: 'TKT-044', user: 'Carlos Mendoza', subject: 'Payment not reflecting after GCash transfer', priority: 'high', status: 'open', time: '5 hours ago', emoji: '🔴' },
  { id: 'TKT-043', user: 'Miguel Torres', subject: 'Domain not resolving after assignment', priority: 'medium', status: 'in-progress', time: '8 hours ago', emoji: '🟡' },
  { id: 'TKT-042', user: 'Ana Garcia', subject: 'How to export database tables?', priority: 'low', status: 'in-progress', time: '1 day ago', emoji: '🟢' },
  { id: 'TKT-041', user: 'Sofia Villanueva', subject: 'Request for additional AI credits', priority: 'medium', status: 'resolved', time: '1 day ago', emoji: '✅' },
  { id: 'TKT-040', user: 'Juan Dela Cruz', subject: 'Template builder blocks not loading', priority: 'high', status: 'resolved', time: '2 days ago', emoji: '✅' },
  { id: 'TKT-039', user: 'Pedro Reyes', subject: 'Need help with database schema', priority: 'low', status: 'resolved', time: '3 days ago', emoji: '✅' },
  { id: 'TKT-038', user: 'Maria Santos', subject: 'Plan upgrade inquiry', priority: 'low', status: 'resolved', time: '4 days ago', emoji: '✅' },
];

const AdminSupportTickets = () => {
  const [filter, setFilter] = useState('all');

  const filtered = tickets.filter(t => filter === 'all' || t.status === filter);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="font-display font-bold text-3xl mb-2">Support Tickets</h3>
          <p className="text-muted-foreground text-lg">{tickets.filter(t => t.status === 'open').length} open tickets</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Open', value: tickets.filter(t => t.status === 'open').length, emoji: '🔴' },
          { label: 'In Progress', value: tickets.filter(t => t.status === 'in-progress').length, emoji: '🟡' },
          { label: 'Resolved', value: tickets.filter(t => t.status === 'resolved').length, emoji: '✅' },
          { label: 'Avg Response', value: '2.4h', emoji: '⏱️' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            className="dashboard-card p-5 text-center">
            <span className="text-xl block mb-1">{s.emoji}</span>
            <p className="text-2xl font-display font-bold">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {['all', 'open', 'in-progress', 'resolved'].map(f => (
          <Button key={f} size="sm" variant={filter === f ? 'default' : 'outline'} onClick={() => setFilter(f)} className="capitalize">{f.replace('-', ' ')}</Button>
        ))}
      </div>

      {/* Tickets */}
      <div className="space-y-2">
        {filtered.map((t, i) => (
          <motion.div key={t.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
            className="dashboard-card p-5 flex items-start gap-4">
            <span className="text-xl mt-0.5">{t.emoji}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-medium text-sm">{t.subject}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{t.id} • {t.user} • {t.time}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${t.priority === 'high' ? 'bg-destructive/20 text-destructive' : t.priority === 'medium' ? 'bg-accent' : 'bg-secondary'}`}>{t.priority}</span>
                  {t.status !== 'resolved' && (
                    <Button size="sm" variant="outline" onClick={() => toast.success(`Responded to ${t.id}`)}>Reply</Button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminSupportTickets;
