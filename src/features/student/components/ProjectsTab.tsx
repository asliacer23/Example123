import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/context/AuthContext";
import { MOCK_PROJECTS } from "@/features/shared/data/mockData";
import { useNavigate } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06 } }),
};

const ProjectsTab = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  if (!user) return null;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="font-display font-bold text-3xl mb-2">My Projects</h3>
          <p className="text-muted-foreground text-lg">{user.projectsCreated} of {user.maxProjects} project slots used</p>
        </div>
        <Button onClick={() => navigate('/dashboard')} className="shrink-0">New Project →</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_PROJECTS.map((project, i) => (
          <motion.div key={project.id} initial="hidden" animate="visible" variants={fadeUp} custom={i}
            className="dashboard-card p-0 overflow-hidden group">
            <div className="bg-secondary p-8 text-center group-hover:bg-accent transition-colors">
              <span className="text-5xl">
                {project.type.includes('commerce') ? '🛒' : project.type.includes('Inventory') ? '📦' : '💼'}
              </span>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-display font-semibold text-lg">{project.name}</h4>
                <span className={`text-xs px-2 py-0.5 rounded-full ${project.status === 'live' ? 'bg-success/20 text-success' : 'bg-secondary text-muted-foreground'}`}>
                  {project.status}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-1">{project.type}</p>
              <p className="text-xs text-muted-foreground font-mono mb-1">{project.domain}</p>
              <p className="text-xs text-muted-foreground mb-4">Created: {project.createdAt} • {project.storageUsed} GB used</p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1" onClick={() => navigate(`/preview/${project.id}`)}>Preview</Button>
                <Button size="sm" className="flex-1" onClick={() => navigate(`/preview/${project.id}`)}>Open →</Button>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Empty slots */}
        {Array.from({ length: Math.max(0, user.maxProjects - MOCK_PROJECTS.length) }).map((_, i) => (
          <motion.div key={`empty-${i}`} initial="hidden" animate="visible" variants={fadeUp} custom={MOCK_PROJECTS.length + i}
            className="dashboard-card p-8 flex flex-col items-center justify-center text-center border-dashed min-h-[300px]">
            <span className="text-4xl mb-4 opacity-30">➕</span>
            <p className="text-muted-foreground font-display font-semibold mb-2">Empty Slot</p>
            <p className="text-xs text-muted-foreground mb-4">Create a new project here</p>
            <Button size="sm" variant="outline">Create Project</Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsTab;
