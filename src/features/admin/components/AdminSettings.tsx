import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const AdminSettings = () => {
  const [features, setFeatures] = useState({
    aiGenerator: true,
    templateBuilder: true,
    domainManager: true,
    databaseManager: true,
    newRegistrations: true,
    maintenanceMode: false,
    emailNotifications: true,
    autoBackup: true,
  });

  const toggle = (key: keyof typeof features) => {
    setFeatures((f) => ({ ...f, [key]: !f[key] }));
    toast.success("Setting updated!");
  };

  return (
    <div className="w-full">
      <h3 className="font-display font-bold text-3xl mb-2">Platform Settings</h3>
      <p className="text-muted-foreground mb-8 text-lg">Enable or disable platform features and configure system settings.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Feature Toggles */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="dashboard-card p-6 space-y-5">
          <h4 className="font-display font-semibold text-lg">Feature Toggles</h4>
          {Object.entries(features).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <Label className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</Label>
              <Switch checked={value} onCheckedChange={() => toggle(key as keyof typeof features)} />
            </div>
          ))}
        </motion.div>

        {/* Platform Config */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="space-y-6">
          <div className="dashboard-card p-6 space-y-4">
            <h4 className="font-display font-semibold text-lg">Platform Configuration</h4>
            <div>
              <Label>Platform Name</Label>
              <Input defaultValue="AutoStore IM" className="mt-1" />
            </div>
            <div>
              <Label>Admin Email</Label>
              <Input defaultValue="admin@autostore.im" className="mt-1" />
            </div>
            <div>
              <Label>Max Users Per Plan (Basic)</Label>
              <Input defaultValue="500" type="number" className="mt-1" />
            </div>
            <div>
              <Label>Default AI Credits (New User)</Label>
              <Input defaultValue="400" type="number" className="mt-1" />
            </div>
          </div>

          <div className="dashboard-card p-6 space-y-4">
            <h4 className="font-display font-semibold text-lg">Danger Zone</h4>
            <Button variant="outline" className="w-full" onClick={() => toast.success("Database backup initiated!")}>
              Backup Database
            </Button>
            <Button variant="outline" className="w-full" onClick={() => toast.success("Cache cleared!")}>
              Clear Cache
            </Button>
            <Button variant="outline" className="w-full text-destructive hover:text-destructive"
              onClick={() => toast.error("Reset is not available in demo mode.")}>
              Reset Platform
            </Button>
          </div>
        </motion.div>
      </div>

      <div className="mt-6">
        <Button onClick={() => toast.success("All settings saved!")} size="lg" className="px-8">Save All Settings</Button>
      </div>
    </div>
  );
};

export default AdminSettings;
