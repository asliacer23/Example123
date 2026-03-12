import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const notifications = [
  { id: 1, title: 'New User Registration Spike', message: '15 new users registered in the last hour.', time: '5 min ago', emoji: '📈', read: false },
  { id: 2, title: 'Storage Warning', message: 'Platform storage at 78% capacity. Consider scaling.', time: '30 min ago', emoji: '⚠️', read: false },
  { id: 3, title: 'Payment Received', message: '₱5,000 received from Maria Santos (Capstone plan).', time: '1 hour ago', emoji: '💰', read: false },
  { id: 4, title: 'System Generation Complete', message: '12 systems generated successfully today.', time: '2 hours ago', emoji: '✅', read: true },
  { id: 5, title: 'Support Ticket #045', message: 'New support ticket from Camille Bautista requires attention.', time: '3 hours ago', emoji: '🎫', read: true },
  { id: 6, title: 'Daily Backup Complete', message: 'All databases backed up successfully at 2:00 AM.', time: '6 hours ago', emoji: '💾', read: true },
  { id: 7, title: 'SSL Certificate Renewal', message: '3 SSL certificates renewed automatically.', time: '8 hours ago', emoji: '🔒', read: true },
  { id: 8, title: 'Revenue Milestone', message: 'Monthly revenue exceeded ₱400,000!', time: '1 day ago', emoji: '🎉', read: true },
  { id: 9, title: 'New Feature Deployed', message: 'AI Chat feature deployed to production.', time: '2 days ago', emoji: '🚀', read: true },
  { id: 10, title: 'User Report', message: 'Weekly user engagement report is ready.', time: '3 days ago', emoji: '📊', read: true },
];

const AdminNotifications = () => {
  const [notifs, setNotifs] = useState(notifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const unread = notifs.filter(n => !n.read).length;
  const displayed = filter === 'unread' ? notifs.filter(n => !n.read) : notifs;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="font-display font-bold text-3xl mb-2">Admin Notifications</h3>
          <p className="text-muted-foreground">{unread} unread</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant={filter === 'all' ? 'default' : 'outline'} onClick={() => setFilter('all')}>All</Button>
          <Button size="sm" variant={filter === 'unread' ? 'default' : 'outline'} onClick={() => setFilter('unread')}>Unread</Button>
          <Button size="sm" variant="outline" onClick={() => { setNotifs(notifs.map(n => ({ ...n, read: true }))); toast.success("All marked read"); }}>Mark All Read</Button>
        </div>
      </div>
      <div className="space-y-2">
        {displayed.map((n, i) => (
          <motion.div key={n.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
            className={`dashboard-card p-5 flex items-start gap-4 cursor-pointer ${!n.read ? 'border-foreground/20 bg-accent/30' : ''}`}
            onClick={() => setNotifs(notifs.map(x => x.id === n.id ? { ...x, read: true } : x))}>
            <span className="text-2xl">{n.emoji}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h4 className={`text-sm ${!n.read ? 'font-semibold' : ''}`}>{n.title}</h4>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{n.time}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{n.message}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminNotifications;
