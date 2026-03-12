import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const contentItems = [
  { id: 1, title: 'Platform Announcement: v2.4 Release', type: 'announcement', status: 'published', date: '2025-12-18', emoji: '📢' },
  { id: 2, title: 'Holiday Sale: 20% Off All Plans', type: 'promotion', status: 'published', date: '2025-12-15', emoji: '🎄' },
  { id: 3, title: 'New Template: Restaurant Manager', type: 'update', status: 'published', date: '2025-12-12', emoji: '🆕' },
  { id: 4, title: 'AI Generator v2 — Faster & Smarter', type: 'update', status: 'published', date: '2025-12-10', emoji: '🤖' },
  { id: 5, title: 'Maintenance Notice: Dec 25', type: 'announcement', status: 'scheduled', date: '2025-12-25', emoji: '🔧' },
  { id: 6, title: 'New Year Promotion Draft', type: 'promotion', status: 'draft', date: '2026-01-01', emoji: '🎆' },
  { id: 7, title: 'Feature: Advanced Database Tools', type: 'update', status: 'draft', date: '2026-01-15', emoji: '🗄️' },
];

const AdminContentManager = () => {
  const [filter, setFilter] = useState('all');
  const filtered = contentItems.filter(c => filter === 'all' || c.status === filter);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="font-display font-bold text-3xl mb-2">Content Manager</h3>
          <p className="text-muted-foreground text-lg">Manage announcements, updates, and promotions.</p>
        </div>
        <Button onClick={() => toast.info("Content editor coming soon!")}>Create Content</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="dashboard-card p-5 text-center">
          <p className="text-2xl font-display font-bold">{contentItems.filter(c => c.status === 'published').length}</p>
          <p className="text-xs text-muted-foreground">Published</p>
        </div>
        <div className="dashboard-card p-5 text-center">
          <p className="text-2xl font-display font-bold">{contentItems.filter(c => c.status === 'scheduled').length}</p>
          <p className="text-xs text-muted-foreground">Scheduled</p>
        </div>
        <div className="dashboard-card p-5 text-center">
          <p className="text-2xl font-display font-bold">{contentItems.filter(c => c.status === 'draft').length}</p>
          <p className="text-xs text-muted-foreground">Drafts</p>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        {['all', 'published', 'scheduled', 'draft'].map(f => (
          <Button key={f} size="sm" variant={filter === f ? 'default' : 'outline'} onClick={() => setFilter(f)} className="capitalize">{f}</Button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map((c, i) => (
          <motion.div key={c.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className="dashboard-card p-5 flex items-center gap-4">
            <span className="text-2xl">{c.emoji}</span>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm">{c.title}</h4>
              <p className="text-xs text-muted-foreground">{c.type} • {c.date}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                c.status === 'published' ? 'bg-success/20 text-success' :
                c.status === 'scheduled' ? 'bg-accent text-foreground' :
                'bg-secondary text-muted-foreground'
              }`}>{c.status}</span>
              <Button size="sm" variant="ghost" onClick={() => toast.info(`Editing "${c.title}"...`)}>Edit</Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminContentManager;
