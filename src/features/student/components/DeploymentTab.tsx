import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const deployments = [
  { id: 1, project: 'Campus Merch Store', version: 'v2.4.1', env: 'Production', status: 'live', time: '2 min ago', duration: '34s', commits: 3 },
  { id: 2, project: 'Campus Merch Store', version: 'v2.4.0', env: 'Staging', status: 'completed', time: '1 hour ago', duration: '42s', commits: 5 },
  { id: 3, project: 'BCP Inventory Tracker', version: 'v1.8.2', env: 'Production', status: 'live', time: '3 hours ago', duration: '28s', commits: 2 },
  { id: 4, project: 'Student Portfolio', version: 'v1.0.0', env: 'Preview', status: 'building', time: 'now', duration: '-', commits: 1 },
  { id: 5, project: 'Campus Merch Store', version: 'v2.3.9', env: 'Production', status: 'rolled-back', time: '1 day ago', duration: '38s', commits: 4 },
];

const environments = [
  { name: 'Production', status: 'healthy', instances: 2, cpu: 34, memory: 58, requests: '1.2K/min' },
  { name: 'Staging', status: 'healthy', instances: 1, cpu: 12, memory: 25, requests: '45/min' },
  { name: 'Preview', status: 'building', instances: 1, cpu: 68, memory: 42, requests: '8/min' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05 } }),
};

const DeploymentTab = () => {
  const [deploying, setDeploying] = useState(false);
  const [deployProgress, setDeployProgress] = useState(0);

  const triggerDeploy = () => {
    setDeploying(true);
    setDeployProgress(0);
    const interval = setInterval(() => {
      setDeployProgress(p => {
        if (p >= 100) { clearInterval(interval); setDeploying(false); toast.success("Deployment successful!"); return 100; }
        return p + 5;
      });
    }, 120);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="font-display font-bold text-3xl mb-2">Deployments</h3>
          <p className="text-muted-foreground text-lg">Manage and monitor your system deployments.</p>
        </div>
        <Button onClick={triggerDeploy} disabled={deploying} className="hover:scale-105 transition-transform">
          {deploying ? 'Deploying...' : 'Deploy Now'}
        </Button>
      </div>

      {deploying && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="dashboard-card p-6 mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span>Building and deploying...</span>
            <span className="font-mono">{Math.round(deployProgress)}%</span>
          </div>
          <Progress value={deployProgress} className="h-2 mb-3" />
          <div className="flex gap-6 text-xs text-muted-foreground">
            <span className={deployProgress > 10 ? 'text-foreground' : ''}>:: Install</span>
            <span className={deployProgress > 30 ? 'text-foreground' : ''}>:: Build</span>
            <span className={deployProgress > 60 ? 'text-foreground' : ''}>:: Test</span>
            <span className={deployProgress > 85 ? 'text-foreground' : ''}>:: Deploy</span>
          </div>
        </motion.div>
      )}

      {/* Environments */}
      <h4 className="font-display font-semibold text-xl mb-4">Environments</h4>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {environments.map((env, i) => (
          <motion.div key={env.name} initial="hidden" animate="visible" variants={fadeUp} custom={i}
            className="dashboard-card p-5 hover:border-foreground/20 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-display font-semibold">{env.name}</h4>
              <span className={`w-2.5 h-2.5 rounded-full ${env.status === 'healthy' ? 'bg-foreground' : 'bg-muted-foreground animate-pulse'}`} />
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-muted-foreground">Instances</span><span>{env.instances}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">CPU</span><span>{env.cpu}%</span></div>
              <Progress value={env.cpu} className="h-1" />
              <div className="flex justify-between"><span className="text-muted-foreground">Memory</span><span>{env.memory}%</span></div>
              <Progress value={env.memory} className="h-1" />
              <div className="flex justify-between"><span className="text-muted-foreground">Requests</span><span>{env.requests}</span></div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Deployment History */}
      <h4 className="font-display font-semibold text-xl mb-4">Deployment History</h4>
      <div className="space-y-2">
        {deployments.map((d, i) => (
          <motion.div key={d.id} initial="hidden" animate="visible" variants={fadeUp} custom={i + 3}
            className="dashboard-card p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:border-foreground/10 transition-all duration-200">
            <div className="flex items-center gap-4">
              <div className={`w-2.5 h-2.5 rounded-full ${d.status === 'live' ? 'bg-foreground' : d.status === 'building' ? 'bg-muted-foreground animate-pulse' : d.status === 'rolled-back' ? 'bg-destructive' : 'bg-muted-foreground'}`} />
              <div>
                <p className="font-medium text-sm">{d.project}</p>
                <p className="text-xs text-muted-foreground">{d.version} — {d.env} — {d.commits} commit{d.commits !== 1 ? 's' : ''}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-muted-foreground">{d.duration !== '-' ? `Built in ${d.duration}` : 'Building...'}</span>
              <span className="text-xs text-muted-foreground">{d.time}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${
                d.status === 'live' ? 'bg-foreground/10 text-foreground' :
                d.status === 'building' ? 'bg-accent text-accent-foreground' :
                d.status === 'rolled-back' ? 'bg-destructive/20 text-destructive' :
                'bg-secondary text-muted-foreground'
              }`}>{d.status}</span>
              {d.status === 'live' && (
                <Button size="sm" variant="ghost" onClick={() => toast.info("Rolling back...")}
                  className="hover:scale-105 transition-transform">Rollback</Button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DeploymentTab;
