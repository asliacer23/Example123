import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/context/AuthContext";
import ThemeToggle from "@/features/shared/components/ThemeToggle";
import AdminOverview from "@/features/admin/components/AdminOverview";
import AdminUsers from "@/features/admin/components/AdminUsers";
import AdminSettings from "@/features/admin/components/AdminSettings";
import AdminActivityLog from "@/features/admin/components/AdminActivityLog";
import AdminNotifications from "@/features/admin/components/AdminNotifications";
import AdminSystemHealth from "@/features/admin/components/AdminSystemHealth";
import AdminReports from "@/features/admin/components/AdminReports";
import AdminSupportTickets from "@/features/admin/components/AdminSupportTickets";
import AdminBilling from "@/features/admin/components/AdminBilling";
import AdminEmailTemplates from "@/features/admin/components/AdminEmailTemplates";
import AdminAuditLog from "@/features/admin/components/AdminAuditLog";
import AdminAPIKeys from "@/features/admin/components/AdminAPIKeys";
import AdminContentManager from "@/features/admin/components/AdminContentManager";
import AdminDomains from "@/features/admin/components/AdminDomains";
import AdminGlobalMap from "@/features/admin/components/AdminGlobalMap";
import AdminAIManager from "@/features/admin/components/AdminAIManager";
import logoWhite from "@/assets/logo-white.png";

const adminTabs = [
  { id: 'overview', label: 'Analytics', emoji: '::' },
  { id: 'users', label: 'Users', emoji: '[]' },
  { id: 'ai-manager', label: 'AI Manager', emoji: '{ }' },
  { id: 'global-map', label: 'Global Map', emoji: '()' },
  { id: 'billing', label: 'Billing', emoji: '$$' },
  { id: 'reports', label: 'Reports', emoji: '~~' },
  { id: 'tickets', label: 'Support Tickets', emoji: '!!' },
  { id: 'domains', label: 'Domains', emoji: '//' },
  { id: 'system-health', label: 'System Health', emoji: '<>' },
  { id: 'activity', label: 'Activity Log', emoji: '--' },
  { id: 'notifications', label: 'Notifications', emoji: '##' },
  { id: 'content', label: 'Content', emoji: '==' },
  { id: 'email-templates', label: 'Email Templates', emoji: '>>' },
  { id: 'api-keys', label: 'API Keys', emoji: '**' },
  { id: 'audit', label: 'Audit Log', emoji: '||' },
  { id: 'settings', label: 'Settings', emoji: '@@' },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) return <Navigate to="/login" />;
  if (user?.role !== 'superadmin') return <Navigate to="/dashboard" />;

  const handleLogout = () => { logout(); navigate('/'); };

  const SidebarContent = () => (
    <>
      <div className="flex items-center gap-2 p-4 border-b border-border/50">
        <img src={logoWhite} alt="Logo" className="h-7 w-7 dark:invert-0 invert" />
        <div>
          <span className="font-display font-bold text-sm block">AutoStore IM</span>
          <span className="text-xs text-muted-foreground">** Superadmin</span>
        </div>
      </div>
      <div className="p-3 space-y-0.5 flex-1 overflow-y-auto">
        {adminTabs.map((tab) => (
          <motion.button key={tab.id} onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.97 }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${activeTab === tab.id ? 'bg-accent text-foreground font-medium' : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'}`}>
            <span className="text-xs font-mono w-5 text-center opacity-60">{tab.emoji}</span>
            <span className="truncate">{tab.label}</span>
          </motion.button>
        ))}
      </div>
      <div className="p-3 border-t border-border/50">
        <div className="px-3 py-1 text-xs text-muted-foreground truncate">{user?.email}</div>
        <motion.button onClick={handleLogout} whileHover={{ x: 4 }} whileTap={{ scale: 0.97 }}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors">
          <span className="text-xs font-mono w-5 text-center opacity-60">{'->'}</span> Log Out
        </motion.button>
      </div>
    </>
  );

  const renderTab = () => {
    switch (activeTab) {
      case 'overview': return <AdminOverview />;
      case 'users': return <AdminUsers />;
      case 'ai-manager': return <AdminAIManager />;
      case 'global-map': return <AdminGlobalMap />;
      case 'settings': return <AdminSettings />;
      case 'activity': return <AdminActivityLog />;
      case 'notifications': return <AdminNotifications />;
      case 'system-health': return <AdminSystemHealth />;
      case 'reports': return <AdminReports />;
      case 'tickets': return <AdminSupportTickets />;
      case 'billing': return <AdminBilling />;
      case 'email-templates': return <AdminEmailTemplates />;
      case 'audit': return <AdminAuditLog />;
      case 'api-keys': return <AdminAPIKeys />;
      case 'content': return <AdminContentManager />;
      case 'domains': return <AdminDomains />;
      default: return <AdminOverview />;
    }
  };

  return (
    <div className="min-h-screen flex">
      <aside className="hidden md:flex w-60 flex-col glass-card border-r border-border/50 fixed inset-y-0 left-0 z-30">
        <SidebarContent />
      </aside>

      <div className="md:hidden fixed top-0 left-0 right-0 z-40 glass-card border-b border-border/50 h-14 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)} className="font-mono text-base">☰</Button>
          <span className="font-display font-bold text-sm">Admin Panel</span>
        </div>
        <ThemeToggle />
      </div>

      <AnimatePresence>
        {sidebarOpen && (
          <div className="md:hidden fixed inset-0 z-50">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
            <motion.aside initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }} transition={{ type: 'spring', damping: 25 }}
              className="absolute left-0 inset-y-0 w-64 glass-card flex flex-col border-r border-border/50">
              <div className="flex justify-end p-2">
                <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)} className="font-mono">✕</Button>
              </div>
              <SidebarContent />
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      <main className="flex-1 md:ml-60 pt-14 md:pt-0">
        <div className="hidden md:flex h-14 items-center justify-between px-6 border-b border-border/50">
          <h2 className="font-display font-semibold">{adminTabs.find(t => t.id === activeTab)?.label}</h2>
          <ThemeToggle />
        </div>
        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
          className="p-4 sm:p-6 lg:p-8">
          {renderTab()}
        </motion.div>
      </main>
    </div>
  );
};

export default AdminDashboard;
