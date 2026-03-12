import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/context/AuthContext";
import ThemeToggle from "@/features/shared/components/ThemeToggle";
import logoWhite from "@/assets/logo-white.png";

const mainTabs = [
  { id: 'overview', label: 'Dashboard', emoji: '::' },
  { id: 'generator', label: 'Generate System', emoji: '>>' },
  { id: 'ai-features', label: 'AI Features', emoji: '{ }' },
  { id: 'templates', label: 'Templates', emoji: '##' },
  { id: 'projects', label: 'My Projects', emoji: '[]' },
  { id: 'world-map', label: 'Global Map', emoji: '()' },
  { id: 'domains', label: 'Domains', emoji: '//' },
  { id: 'database', label: 'Database', emoji: '||' },
  { id: 'database-advanced', label: 'DB Advanced', emoji: '{}' },
  { id: 'deployment', label: 'Deployments', emoji: '^^ ' },
  { id: 'performance', label: 'Performance', emoji: '<>' },
  { id: 'analytics', label: 'Analytics', emoji: '~~' },
  { id: 'ai-chat', label: 'AI Chat', emoji: '..' },
  { id: 'security', label: 'Security', emoji: '**' },
  { id: 'notifications', label: 'Notifications', emoji: '!!' },
  { id: 'activity', label: 'Activity Log', emoji: '--' },
  { id: 'billing', label: 'Billing', emoji: '$$' },
  { id: 'integrations', label: 'Integrations', emoji: '++' },
  { id: 'export', label: 'Export Center', emoji: '=>' },
  { id: 'help', label: 'Help Center', emoji: '??' },
  { id: 'settings', label: 'Settings', emoji: '@@' },
];

interface DashboardLayoutProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  children: React.ReactNode;
}

const StudentDashboardLayout = ({ activeTab, onTabChange, children }: DashboardLayoutProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/'); };

  const SidebarContent = () => (
    <>
      <div className="flex items-center gap-2 p-4 border-b border-border/50">
        <img src={logoWhite} alt="Logo" className="h-7 w-7 dark:invert-0 invert" />
        <span className="font-display font-bold text-sm">AutoStore IM</span>
      </div>
      <div className="p-3 space-y-0.5 flex-1 overflow-y-auto">
        {mainTabs.map((tab) => (
          <motion.button key={tab.id} onClick={() => { onTabChange(tab.id); setSidebarOpen(false); }}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.97 }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${activeTab === tab.id ? 'bg-accent text-foreground font-medium' : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'}`}>
            <span className="text-xs font-mono w-5 text-center opacity-60">{tab.emoji}</span>
            <span className="truncate">{tab.label}</span>
          </motion.button>
        ))}
      </div>
      <div className="p-3 border-t border-border/50 space-y-1">
        <div className="px-3 py-2 text-xs text-muted-foreground truncate">{user?.email}</div>
        <div className="px-3 py-1 text-xs text-muted-foreground">
          Plan: <span className="text-foreground font-medium">{user?.plan?.toUpperCase() || 'None'}</span>
        </div>
        <motion.button onClick={handleLogout} whileHover={{ x: 4 }} whileTap={{ scale: 0.97 }}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors">
          <span className="text-xs font-mono w-5 text-center opacity-60">{'->'}</span> Log Out
        </motion.button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-60 flex-col glass-card border-r border-border/50 fixed inset-y-0 left-0 z-30">
        <SidebarContent />
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 glass-card border-b border-border/50 h-14 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)} className="font-mono text-base">☰</Button>
          <span className="font-display font-bold text-sm">AutoStore IM</span>
        </div>
        <ThemeToggle />
      </div>

      {/* Mobile Sidebar Overlay */}
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

      {/* Main Content */}
      <main className="flex-1 md:ml-60 pt-14 md:pt-0">
        <div className="hidden md:flex h-14 items-center justify-between px-6 border-b border-border/50">
          <h2 className="font-display font-semibold">{mainTabs.find(t => t.id === activeTab)?.label}</h2>
          <ThemeToggle />
        </div>
        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
          className="p-4 sm:p-6 lg:p-8">
          {children}
        </motion.div>
      </main>
    </div>
  );
};

export default StudentDashboardLayout;
