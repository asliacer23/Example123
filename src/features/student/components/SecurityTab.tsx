import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const securityScore = 87;

const securityChecks = [
  { name: 'Password Strength', status: 'pass', detail: 'Strong password detected' },
  { name: 'Two-Factor Auth', status: 'warning', detail: 'Not enabled — recommended' },
  { name: 'Email Verified', status: 'pass', detail: 'Email verified on signup' },
  { name: 'Session Management', status: 'pass', detail: '1 active session' },
  { name: 'API Keys Secured', status: 'pass', detail: 'All keys hashed and encrypted' },
  { name: 'SSL Certificate', status: 'pass', detail: 'Valid until Mar 2027' },
  { name: 'RLS Policies', status: 'pass', detail: 'All tables protected' },
  { name: 'Backup Encryption', status: 'pass', detail: 'AES-256 encryption active' },
];

const loginHistory = [
  { device: 'Chrome / Windows 11', location: 'Manila, PH', time: '2 min ago', ip: '192.168.1.xxx', status: 'current' },
  { device: 'Chrome / Windows 11', location: 'Manila, PH', time: '1 day ago', ip: '192.168.1.xxx', status: 'success' },
  { device: 'Safari / macOS', location: 'Quezon City, PH', time: '3 days ago', ip: '10.0.0.xxx', status: 'success' },
  { device: 'Firefox / Linux', location: 'Caloocan, PH', time: '1 week ago', ip: '172.16.0.xxx', status: 'success' },
  { device: 'Unknown / Android', location: 'Bulacan, PH', time: '2 weeks ago', ip: '192.168.2.xxx', status: 'blocked' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05 } }),
};

const SecurityTab = () => {
  const [twoFactor, setTwoFactor] = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);

  return (
    <div className="w-full">
      <h3 className="font-display font-bold text-3xl mb-2">Security Center</h3>
      <p className="text-muted-foreground mb-8 text-lg">Monitor and manage your account security.</p>

      {/* Score */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="dashboard-card p-8 text-center mb-8">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--border))" strokeWidth="8" />
            <motion.circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--foreground))" strokeWidth="8"
              strokeDasharray={`${2 * Math.PI * 42}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - securityScore / 100) }}
              transition={{ duration: 1, delay: 0.3 }}
              strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-display font-bold">{securityScore}</span>
          </div>
        </div>
        <h4 className="font-display font-semibold text-xl mb-1">Security Score</h4>
        <p className="text-sm text-muted-foreground">Your account is well protected</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Security Checks */}
        <div>
          <h4 className="font-display font-semibold text-xl mb-4">Security Checks</h4>
          <div className="space-y-2">
            {securityChecks.map((check, i) => (
              <motion.div key={check.name} initial="hidden" animate="visible" variants={fadeUp} custom={i}
                className="dashboard-card p-4 flex items-center justify-between hover:border-foreground/10 transition-all duration-200">
                <div className="flex items-center gap-3">
                  <span className={`w-2.5 h-2.5 rounded-full ${check.status === 'pass' ? 'bg-foreground' : 'bg-muted-foreground'}`} />
                  <div>
                    <p className="font-medium text-sm">{check.name}</p>
                    <p className="text-xs text-muted-foreground">{check.detail}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${check.status === 'pass' ? 'bg-foreground/10 text-foreground' : 'bg-accent text-accent-foreground'}`}>
                  {check.status === 'pass' ? 'Pass' : 'Action Needed'}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="space-y-6">
          <div className="dashboard-card p-6">
            <h4 className="font-display font-semibold text-lg mb-4">Security Settings</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Two-Factor Authentication</p>
                  <p className="text-xs text-muted-foreground">Add extra security to your account</p>
                </div>
                <Switch checked={twoFactor} onCheckedChange={(v) => { setTwoFactor(v); toast.success(v ? '2FA enabled' : '2FA disabled'); }} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Login Alerts</p>
                  <p className="text-xs text-muted-foreground">Get notified of new logins</p>
                </div>
                <Switch checked={loginAlerts} onCheckedChange={setLoginAlerts} />
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4 hover:scale-[1.01] transition-transform"
              onClick={() => toast.success("Password updated!")}>Change Password</Button>
          </div>

          {/* Login History */}
          <div className="dashboard-card p-6">
            <h4 className="font-display font-semibold text-lg mb-4">Login History</h4>
            <div className="space-y-3">
              {loginHistory.map((login, i) => (
                <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                  <div>
                    <p className="text-sm font-medium">{login.device}</p>
                    <p className="text-xs text-muted-foreground">{login.location} — {login.ip}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${login.status === 'current' ? 'bg-foreground/10 text-foreground' : login.status === 'blocked' ? 'bg-destructive/20 text-destructive' : 'bg-secondary text-muted-foreground'}`}>
                      {login.status}
                    </span>
                    <p className="text-xs text-muted-foreground mt-0.5">{login.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityTab;
