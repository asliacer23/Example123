import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const templates = [
  { id: 1, name: 'Welcome Email', subject: 'Welcome to AutoStore IM!', status: 'active', sends: 847, emoji: '👋' },
  { id: 2, name: 'Plan Upgrade Confirmation', subject: 'Your plan has been upgraded', status: 'active', sends: 234, emoji: '💳' },
  { id: 3, name: 'System Generated', subject: 'Your system is ready!', status: 'active', sends: 1284, emoji: '🤖' },
  { id: 4, name: 'Password Reset', subject: 'Reset your password', status: 'active', sends: 56, emoji: '🔑' },
  { id: 5, name: 'Weekly Report', subject: 'Your weekly activity report', status: 'active', sends: 3200, emoji: '📊' },
  { id: 6, name: 'Credit Warning', subject: 'Your AI credits are running low', status: 'active', sends: 145, emoji: '⚠️' },
  { id: 7, name: 'Maintenance Notice', subject: 'Scheduled maintenance notification', status: 'draft', sends: 0, emoji: '🔧' },
  { id: 8, name: 'Renewal Reminder', subject: 'Your subscription is expiring soon', status: 'draft', sends: 0, emoji: '📅' },
];

const AdminEmailTemplates = () => {
  const [statuses, setStatuses] = useState<Record<number, boolean>>(
    Object.fromEntries(templates.map(t => [t.id, t.status === 'active']))
  );

  const toggleTemplate = (id: number) => {
    setStatuses({ ...statuses, [id]: !statuses[id] });
    toast.success(`Template ${statuses[id] ? 'deactivated' : 'activated'}`);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="font-display font-bold text-3xl mb-2">Email Templates</h3>
          <p className="text-muted-foreground text-lg">Manage automated email notifications.</p>
        </div>
        <Button onClick={() => toast.info("Template editor coming soon!")}>Create Template</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="dashboard-card p-5 text-center">
          <p className="text-2xl font-display font-bold">{templates.length}</p>
          <p className="text-xs text-muted-foreground">Total Templates</p>
        </div>
        <div className="dashboard-card p-5 text-center">
          <p className="text-2xl font-display font-bold">{templates.filter(t => t.status === 'active').length}</p>
          <p className="text-xs text-muted-foreground">Active</p>
        </div>
        <div className="dashboard-card p-5 text-center">
          <p className="text-2xl font-display font-bold">{templates.reduce((a, t) => a + t.sends, 0).toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">Total Sends</p>
        </div>
      </div>

      <div className="space-y-3">
        {templates.map((t, i) => (
          <motion.div key={t.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className="dashboard-card p-5 flex items-center gap-4">
            <span className="text-2xl">{t.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.subject}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{t.sends.toLocaleString()} sends</p>
            </div>
            <div className="flex items-center gap-3">
              <Button size="sm" variant="ghost" onClick={() => toast.info(`Editing "${t.name}"...`)}>Edit</Button>
              <Button size="sm" variant="ghost" onClick={() => toast.success(`Test email sent!`)}>Test</Button>
              <Switch checked={statuses[t.id]} onCheckedChange={() => toggleTemplate(t.id)} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminEmailTemplates;
