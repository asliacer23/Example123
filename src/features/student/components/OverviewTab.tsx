import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/context/AuthContext";
import { MOCK_PROJECTS } from "@/features/shared/data/mockData";
import { useNavigate } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4 } }),
};

const OverviewTab = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  if (!user) return null;

  const stats = [
    { label: "Active Plan", value: user.plan?.toUpperCase() || "None", symbol: "::" },
    { label: "AI Credits", value: `${user.aiCredits}`, symbol: "{ }" },
    { label: "Projects", value: `${user.projectsCreated} / ${user.maxProjects}`, symbol: "[]" },
    { label: "Storage", value: `${user.storageUsed} / ${user.storageTotal} GB`, symbol: "||" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="dashboard-card p-8">
        <h3 className="font-display font-bold text-3xl mb-2">Welcome back, {user.name}!</h3>
        <p className="text-muted-foreground">Here's an overview of your AutoStore IM account and projects.</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial="hidden" animate="visible" variants={fadeUp} custom={i}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="dashboard-card p-6 cursor-default">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-sm font-mono text-foreground/40">{s.symbol}</span>
              <span className="text-sm text-muted-foreground">{s.label}</span>
            </div>
            <p className="text-3xl font-display font-bold">{s.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Storage Bar */}
      {user.storageTotal > 0 && (
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={4}
          className="dashboard-card p-6">
          <div className="flex justify-between text-sm mb-3">
            <span className="text-muted-foreground">Storage Usage</span>
            <span className="font-medium">{((user.storageUsed / user.storageTotal) * 100).toFixed(0)}%</span>
          </div>
          <Progress value={(user.storageUsed / user.storageTotal) * 100} className="h-3" />
          <p className="text-xs text-muted-foreground mt-2">
            {user.storageUsed} GB used of {user.storageTotal} GB ({user.plan?.toUpperCase()} plan)
          </p>
        </motion.div>
      )}

      {/* Quick Actions */}
      <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={5}>
        <h3 className="font-display font-semibold text-xl mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { symbol: '>>', title: 'Generate System', desc: 'Create a new system with AI', tab: 'generator' },
            { symbol: '##', title: 'Use Template', desc: 'Start from a template', tab: 'templates' },
            { symbol: '()', title: 'Global Map', desc: 'View platform coverage', tab: 'world-map' },
          ].map((action) => (
            <motion.button key={action.tab} onClick={() => navigate('/dashboard')}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.97 }}
              className="dashboard-card p-6 text-left hover:border-foreground/20 transition-all">
              <span className="text-xl font-mono font-bold text-foreground/30 mb-3 block">{action.symbol}</span>
              <h4 className="font-display font-semibold mb-1">{action.title}</h4>
              <p className="text-xs text-muted-foreground">{action.desc}</p>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* My Projects */}
      <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={6}>
        <h3 className="font-display font-semibold text-xl mb-4">My Projects</h3>
        {MOCK_PROJECTS.length === 0 ? (
          <div className="dashboard-card text-center text-muted-foreground py-16">
            <span className="text-3xl font-mono block mb-4">[ ]</span>
            <p className="text-lg font-display font-semibold mb-2">No projects yet</p>
            <p className="text-sm">Generate your first system to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MOCK_PROJECTS.map((p) => (
              <motion.div key={p.id}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="dashboard-card p-6 group hover:border-foreground/20 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-display font-semibold">{p.name}</h4>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${p.status === 'live' ? 'bg-foreground/10 text-foreground' : 'bg-secondary text-muted-foreground'}`}>
                    {p.status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-1">{p.type}</p>
                <p className="text-xs text-muted-foreground font-mono mb-4">{p.domain}</p>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                  <Button size="sm" variant="outline" className="w-full" onClick={() => navigate(`/preview/${p.id}`)}>
                    View Project →
                  </Button>
                </motion.div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default OverviewTab;
