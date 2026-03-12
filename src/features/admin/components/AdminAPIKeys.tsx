import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const apiKeys = [
  { id: 1, name: 'Production API Key', key: 'ask_prod_xxxxxxxxxxxx', created: '2025-10-01', lastUsed: '2 min ago', status: 'active', calls: 12450 },
  { id: 2, name: 'Development API Key', key: 'ask_dev_xxxxxxxxxxxx', created: '2025-11-15', lastUsed: '1 hour ago', status: 'active', calls: 3200 },
  { id: 3, name: 'Webhook Key', key: 'ask_whk_xxxxxxxxxxxx', created: '2025-12-01', lastUsed: '5 min ago', status: 'active', calls: 890 },
  { id: 4, name: 'Test Key (Deprecated)', key: 'ask_test_xxxxxxxxxxxx', created: '2025-08-01', lastUsed: '30 days ago', status: 'revoked', calls: 45 },
];

const AdminAPIKeys = () => {
  const [showKey, setShowKey] = useState<number | null>(null);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="font-display font-bold text-3xl mb-2">API Keys</h3>
          <p className="text-muted-foreground text-lg">Manage API keys for platform integrations.</p>
        </div>
        <Button onClick={() => toast.success("New API key generated!")}>Generate New Key</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="dashboard-card p-5 text-center">
          <p className="text-2xl font-display font-bold">{apiKeys.filter(k => k.status === 'active').length}</p>
          <p className="text-xs text-muted-foreground">Active Keys</p>
        </div>
        <div className="dashboard-card p-5 text-center">
          <p className="text-2xl font-display font-bold">{apiKeys.reduce((a, k) => a + k.calls, 0).toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">Total API Calls</p>
        </div>
        <div className="dashboard-card p-5 text-center">
          <p className="text-2xl font-display font-bold">50K</p>
          <p className="text-xs text-muted-foreground">Monthly Limit</p>
        </div>
      </div>

      <div className="space-y-3">
        {apiKeys.map((key, i) => (
          <motion.div key={key.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="dashboard-card p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-medium text-sm">{key.name}</h4>
                <p className="font-mono text-xs text-muted-foreground mt-1">
                  {showKey === key.id ? key.key : '•'.repeat(24)}
                </p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${key.status === 'active' ? 'bg-success/20 text-success' : 'bg-secondary text-muted-foreground'}`}>
                {key.status}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-4 text-xs text-muted-foreground">
                <span>Created: {key.created}</span>
                <span>Last used: {key.lastUsed}</span>
                <span>{key.calls.toLocaleString()} calls</span>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost" onClick={() => setShowKey(showKey === key.id ? null : key.id)}>
                  {showKey === key.id ? 'Hide' : 'Show'}
                </Button>
                <Button size="sm" variant="ghost" onClick={() => { navigator.clipboard.writeText(key.key); toast.success("Copied!"); }}>Copy</Button>
                {key.status === 'active' && (
                  <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => toast.error("Key revoked!")}>Revoke</Button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminAPIKeys;
