import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/features/auth/context/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const SettingsTab = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  if (!user) return null;

  return (
    <div className="w-full">
      <h3 className="font-display font-bold text-3xl mb-2">Account Settings</h3>
      <p className="text-muted-foreground mb-8 text-lg">Manage your account information and preferences.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="dashboard-card p-6 space-y-5">
          <h4 className="font-display font-semibold text-lg">Profile Information</h4>
          <div>
            <Label>Full Name</Label>
            <Input defaultValue={user.name} className="mt-1" />
          </div>
          <div>
            <Label>Email</Label>
            <Input defaultValue={user.email} disabled className="mt-1" />
          </div>
          <div>
            <Label>Student ID</Label>
            <Input defaultValue="2025-IM-0042" className="mt-1" />
          </div>
          <div>
            <Label>Section</Label>
            <Input defaultValue="BSIT-IM 4A" className="mt-1" />
          </div>
          <Button onClick={() => toast.success("Profile updated!")} className="w-full">Save Changes</Button>
        </motion.div>

        {/* Subscription */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="space-y-6">
          <div className="dashboard-card p-6">
            <h4 className="font-display font-semibold text-lg mb-4">Subscription</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Current Plan</span>
                <span className="font-semibold">{user.plan?.toUpperCase() || 'None'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">AI Credits</span>
                <span className="font-semibold">{user.aiCredits}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Storage</span>
                <span className="font-semibold">{user.storageUsed}/{user.storageTotal} GB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Projects</span>
                <span className="font-semibold">{user.projectsCreated}/{user.maxProjects}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Member Since</span>
                <span className="font-semibold">{user.joinDate}</span>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4" onClick={() => toast.info("Upgrade coming soon!")}>
              Upgrade Plan
            </Button>
          </div>

          {/* Preferences */}
          <div className="dashboard-card p-6 space-y-4">
            <h4 className="font-display font-semibold text-lg">Preferences</h4>
            <div className="flex items-center justify-between">
              <Label>Push Notifications</Label>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
            <div className="flex items-center justify-between">
              <Label>Email Alerts</Label>
              <Switch checked={emailAlerts} onCheckedChange={setEmailAlerts} />
            </div>
          </div>

          {/* Actions */}
          <div className="dashboard-card p-6 space-y-3">
            <h4 className="font-display font-semibold text-lg">Quick Actions</h4>
            <Button variant="outline" className="w-full" onClick={() => navigate('/tutorial')}>
              View Tutorial
            </Button>
            <Button variant="outline" className="w-full" onClick={() => toast.success("Password reset email sent!")}>
              Change Password
            </Button>
            <Button variant="outline" className="w-full text-destructive hover:text-destructive" onClick={() => toast.error("Account deletion is not available in demo mode.")}>
              Delete Account
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SettingsTab;
