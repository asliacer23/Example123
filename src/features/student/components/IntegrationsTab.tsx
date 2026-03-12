import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const integrations = [
  { id: 'gcash', name: 'GCash', desc: 'Accept GCash payments in your storefront', emoji: '📱', connected: true, category: 'Payments' },
  { id: 'paymaya', name: 'PayMaya', desc: 'Accept PayMaya payments', emoji: '💳', connected: false, category: 'Payments' },
  { id: 'stripe', name: 'Stripe', desc: 'International payment processing', emoji: '💰', connected: false, category: 'Payments' },
  { id: 'google-analytics', name: 'Google Analytics', desc: 'Track visitor behavior on your storefront', emoji: '📊', connected: true, category: 'Analytics' },
  { id: 'facebook-pixel', name: 'Facebook Pixel', desc: 'Track conversions from Facebook ads', emoji: '📘', connected: false, category: 'Analytics' },
  { id: 'gmail', name: 'Gmail SMTP', desc: 'Send emails from your system', emoji: '📧', connected: true, category: 'Communication' },
  { id: 'sms', name: 'SMS Gateway', desc: 'Send SMS notifications to users', emoji: '📲', connected: false, category: 'Communication' },
  { id: 'cloudinary', name: 'Cloudinary', desc: 'Cloud image storage and optimization', emoji: '🖼️', connected: false, category: 'Storage' },
  { id: 'github', name: 'GitHub', desc: 'Export generated code to GitHub', emoji: '🐙', connected: false, category: 'Developer' },
  { id: 'slack', name: 'Slack', desc: 'Get notifications in Slack', emoji: '💬', connected: false, category: 'Communication' },
];

const IntegrationsTab = () => {
  const [connections, setConnections] = useState<Record<string, boolean>>(
    Object.fromEntries(integrations.map(i => [i.id, i.connected]))
  );

  const toggleConnection = (id: string, name: string) => {
    const newState = !connections[id];
    setConnections({ ...connections, [id]: newState });
    toast.success(`${name} ${newState ? 'connected' : 'disconnected'}!`);
  };

  const categories = [...new Set(integrations.map(i => i.category))];

  return (
    <div className="w-full">
      <h3 className="font-display font-bold text-3xl mb-2">Integrations</h3>
      <p className="text-muted-foreground mb-8 text-lg">Connect third-party services to your storefronts.</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="dashboard-card p-5 text-center">
          <p className="text-2xl font-display font-bold">{Object.values(connections).filter(Boolean).length}</p>
          <p className="text-xs text-muted-foreground">Connected</p>
        </div>
        <div className="dashboard-card p-5 text-center">
          <p className="text-2xl font-display font-bold">{Object.values(connections).filter(v => !v).length}</p>
          <p className="text-xs text-muted-foreground">Available</p>
        </div>
        <div className="dashboard-card p-5 text-center">
          <p className="text-2xl font-display font-bold">{integrations.length}</p>
          <p className="text-xs text-muted-foreground">Total</p>
        </div>
      </div>

      {categories.map((cat) => (
        <div key={cat} className="mb-8">
          <h4 className="font-display font-semibold text-xl mb-4">{cat}</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {integrations.filter(i => i.category === cat).map((integration, idx) => (
              <motion.div key={integration.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }}
                className="dashboard-card p-5 flex items-center gap-4">
                <span className="text-3xl">{integration.emoji}</span>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{integration.name}</h4>
                  <p className="text-xs text-muted-foreground">{integration.desc}</p>
                </div>
                <Switch checked={connections[integration.id]} onCheckedChange={() => toggleConnection(integration.id, integration.name)} />
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default IntegrationsTab;
