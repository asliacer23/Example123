import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const activities = [
  { id: 1, user: 'Juan Dela Cruz', action: 'Generated E-commerce Store', time: '2 min ago', emoji: '🤖', type: 'generation' },
  { id: 2, user: 'Maria Santos', action: 'Upgraded to Capstone plan', time: '5 min ago', emoji: '💳', type: 'billing' },
  { id: 3, user: 'Pedro Reyes', action: 'Deployed Portfolio Website', time: '12 min ago', emoji: '🚀', type: 'deployment' },
  { id: 4, user: 'Ana Garcia', action: 'Created new domain assignment', time: '20 min ago', emoji: '🌐', type: 'domain' },
  { id: 5, user: 'Sofia Villanueva', action: 'Exported database backup', time: '30 min ago', emoji: '💾', type: 'export' },
  { id: 6, user: 'Miguel Torres', action: 'Logged in from new device', time: '45 min ago', emoji: '🔐', type: 'auth' },
  { id: 7, user: 'Rafael Aquino', action: 'Generated Clinic System', time: '1 hour ago', emoji: '🤖', type: 'generation' },
  { id: 8, user: 'Camille Bautista', action: 'Submitted support ticket', time: '1 hour ago', emoji: '🎫', type: 'support' },
  { id: 9, user: 'Isabella Cruz', action: 'Account registered', time: '2 hours ago', emoji: '👤', type: 'auth' },
  { id: 10, user: 'Carlos Mendoza', action: 'Password reset requested', time: '3 hours ago', emoji: '🔑', type: 'security' },
  { id: 11, user: 'System', action: 'Automatic backup completed', time: '4 hours ago', emoji: '⚙️', type: 'system' },
  { id: 12, user: 'System', action: 'SSL certificates renewed', time: '6 hours ago', emoji: '🔒', type: 'system' },
  { id: 13, user: 'Admin', action: 'Platform settings updated', time: '8 hours ago', emoji: '🛡️', type: 'admin' },
  { id: 14, user: 'System', action: 'Daily reports generated', time: '12 hours ago', emoji: '📊', type: 'system' },
  { id: 15, user: 'Juan Dela Cruz', action: 'Saved template "Modern Store"', time: '1 day ago', emoji: '🎨', type: 'template' },
];

const AdminActivityLog = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const filtered = activities.filter(a => {
    const matchSearch = a.user.toLowerCase().includes(search.toLowerCase()) || a.action.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || a.type === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="w-full">
      <h3 className="font-display font-bold text-3xl mb-2">Platform Activity Log</h3>
      <p className="text-muted-foreground mb-6 text-lg">Real-time feed of all platform activities.</p>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by user or action..." className="flex-1" />
        <div className="flex gap-2 flex-wrap">
          {['all', 'generation', 'auth', 'system', 'billing'].map(t => (
            <Button key={t} size="sm" variant={filter === t ? 'default' : 'outline'} onClick={() => setFilter(t)} className="capitalize">{t}</Button>
          ))}
        </div>
      </div>

      <div className="space-y-1">
        {filtered.map((a, i) => (
          <motion.div key={a.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
            className="dashboard-card p-4 flex items-start gap-4">
            <span className="text-2xl mt-0.5">{a.emoji}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm"><span className="font-semibold">{a.user}</span> — {a.action}</p>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{a.time}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminActivityLog;
