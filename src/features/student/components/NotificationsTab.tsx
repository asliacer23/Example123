import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
  emoji: string;
  type: 'info' | 'success' | 'warning' | 'alert';
}

const initialNotifications: Notification[] = [
  { id: 1, title: 'System Generated Successfully', message: 'Your E-commerce Store "Campus Merch" is now live and accessible.', time: '2 min ago', read: false, emoji: '✅', type: 'success' },
  { id: 2, title: 'AI Credits Running Low', message: 'You have 180 AI credits remaining. Consider upgrading your plan.', time: '15 min ago', read: false, emoji: '⚠️', type: 'warning' },
  { id: 3, title: 'Domain SSL Renewed', message: 'SSL certificate for campusmerch.autostore-im.app has been renewed.', time: '1 hour ago', read: false, emoji: '🔒', type: 'info' },
  { id: 4, title: 'New Template Available', message: 'Check out "Restaurant Manager" — a new template for food business systems.', time: '2 hours ago', read: false, emoji: '🎨', type: 'info' },
  { id: 5, title: 'Database Backup Complete', message: 'Automatic backup of your database completed successfully.', time: '3 hours ago', read: true, emoji: '💾', type: 'success' },
  { id: 6, title: 'System Update Available', message: 'AutoStore IM v2.4 is available with new features and improvements.', time: '5 hours ago', read: true, emoji: '🔄', type: 'info' },
  { id: 7, title: 'Login from New Device', message: 'New login detected from Chrome/Windows in Manila, Philippines.', time: '1 day ago', read: true, emoji: '🔐', type: 'alert' },
  { id: 8, title: 'Plan Upgrade Successful', message: 'Your plan has been upgraded to Student Pro. Enjoy more features!', time: '1 day ago', read: true, emoji: '🎉', type: 'success' },
  { id: 9, title: 'Weekly Report Ready', message: 'Your weekly activity report for Dec 14-20 is available.', time: '2 days ago', read: true, emoji: '📊', type: 'info' },
  { id: 10, title: 'Maintenance Scheduled', message: 'System maintenance scheduled for Dec 25, 2:00 AM - 4:00 AM PST.', time: '3 days ago', read: true, emoji: '🔧', type: 'warning' },
  { id: 11, title: 'New Feature: AI Chat', message: 'Try our new AI Chat assistant for help with your projects.', time: '4 days ago', read: true, emoji: '🤖', type: 'info' },
  { id: 12, title: 'Welcome to AutoStore IM!', message: 'Your account has been created. Start by taking the tutorial!', time: '5 days ago', read: true, emoji: '👋', type: 'success' },
];

const NotificationsTab = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const unreadCount = notifications.filter(n => !n.read).length;
  const displayed = filter === 'unread' ? notifications.filter(n => !n.read) : notifications;

  const markRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
    toast.success("Notification deleted");
  };

  const clearAll = () => {
    setNotifications([]);
    toast.success("All notifications cleared");
  };

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h3 className="font-display font-bold text-3xl mb-2">Notifications</h3>
          <p className="text-muted-foreground">{unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button size="sm" variant={filter === 'all' ? 'default' : 'outline'} onClick={() => setFilter('all')}>All ({notifications.length})</Button>
          <Button size="sm" variant={filter === 'unread' ? 'default' : 'outline'} onClick={() => setFilter('unread')}>Unread ({unreadCount})</Button>
          <Button size="sm" variant="outline" onClick={markAllRead}>Mark All Read</Button>
          <Button size="sm" variant="outline" onClick={clearAll} className="text-destructive hover:text-destructive">Clear All</Button>
        </div>
      </div>

      <div className="space-y-2">
        {displayed.map((n, i) => (
          <motion.div key={n.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
            className={`dashboard-card p-5 flex items-start gap-4 cursor-pointer transition-all hover:border-foreground/10 ${!n.read ? 'border-foreground/20 bg-accent/30' : ''}`}
            onClick={() => markRead(n.id)}>
            <span className="text-2xl">{n.emoji}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h4 className={`text-sm ${!n.read ? 'font-semibold' : 'font-medium'}`}>{n.title}</h4>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{n.time}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{n.message}</p>
            </div>
            <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); deleteNotification(n.id); }}
              className="text-muted-foreground hover:text-destructive shrink-0">✕</Button>
          </motion.div>
        ))}
        {displayed.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <span className="text-6xl block mb-4">🔔</span>
            <p className="text-lg font-display font-semibold mb-2">No notifications</p>
            <p className="text-sm">You're all caught up!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsTab;
