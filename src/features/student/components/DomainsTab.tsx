import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MOCK_PROJECTS } from "@/features/shared/data/mockData";
import { toast } from "sonner";

const DomainsTab = () => {
  const [newDomain, setNewDomain] = useState("");
  const [domains, setDomains] = useState(MOCK_PROJECTS);

  const handleAssign = () => {
    if (!newDomain.trim()) { toast.error("Enter a domain name"); return; }
    const newProject = {
      id: `new-${Date.now()}`,
      name: newDomain,
      type: 'Custom Domain',
      status: 'live' as const,
      domain: `${newDomain}.autostore-im.app`,
      createdAt: new Date().toISOString().split('T')[0],
      storageUsed: 0,
    };
    setDomains([...domains, newProject]);
    toast.success(`Domain "${newDomain}.autostore-im.app" assigned!`);
    setNewDomain("");
  };

  const handleRemove = (id: string) => {
    setDomains(domains.filter(d => d.id !== id));
    toast.success("Domain removed");
  };

  return (
    <div className="w-full">
      <h3 className="font-display font-bold text-3xl mb-2">Domain Manager</h3>
      <p className="text-muted-foreground mb-8 text-lg">Manage domains for your generated projects.</p>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="dashboard-card mb-8 p-6">
        <h4 className="font-display font-semibold text-lg mb-4">Assign New Domain</h4>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input value={newDomain} onChange={(e) => setNewDomain(e.target.value)} placeholder="myproject" className="flex-1"
            onKeyDown={(e) => e.key === 'Enter' && handleAssign()} />
          <span className="flex items-center text-sm text-muted-foreground whitespace-nowrap">.autostore-im.app</span>
          <Button onClick={handleAssign} className="shrink-0">Assign Domain</Button>
        </div>
      </motion.div>

      <h4 className="font-display font-semibold text-xl mb-4">Active Domains ({domains.length})</h4>
      <div className="space-y-3">
        {domains.map((p, i) => (
          <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="dashboard-card flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 gap-3">
            <div className="flex-1">
              <p className="font-mono text-sm font-medium">{p.domain}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{p.name} • {p.type}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-xs px-3 py-1 rounded-full ${p.status === 'live' ? 'bg-success/20 text-success' : 'bg-secondary text-muted-foreground'}`}>
                {p.status}
              </span>
              <Button size="sm" variant="ghost" onClick={() => handleRemove(p.id)} className="text-destructive hover:text-destructive">
                Remove
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DomainsTab;
