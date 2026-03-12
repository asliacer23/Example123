import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/context/AuthContext";
import { toast } from "sonner";

const invoices = [
  { id: 'INV-2025-001', date: '2025-12-01', amount: 3000, plan: 'Pro', status: 'paid', method: 'GCash' },
  { id: 'INV-2025-002', date: '2025-11-01', amount: 1500, plan: 'Basic', status: 'paid', method: 'GCash' },
  { id: 'INV-2025-003', date: '2025-10-01', amount: 1500, plan: 'Basic', status: 'paid', method: 'Bank Transfer' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06 } }),
};

const BillingTab = () => {
  const { user } = useAuth();
  if (!user) return null;

  const planPrices: Record<string, number> = { basic: 1500, pro: 3000, capstone: 5000 };
  const currentPrice = user.plan ? planPrices[user.plan] || 0 : 0;

  return (
    <div className="w-full">
      <h3 className="font-display font-bold text-3xl mb-2">Billing & Invoices</h3>
      <p className="text-muted-foreground mb-8 text-lg">Manage your subscription and view payment history.</p>

      {/* Current Plan */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}
          className="dashboard-card p-6">
          <h4 className="font-display font-semibold text-lg mb-4">Current Subscription</h4>
          <div className="space-y-3">
            <div className="flex justify-between"><span className="text-muted-foreground text-sm">Plan</span><span className="font-semibold">{user.plan?.toUpperCase() || 'None'}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground text-sm">Price</span><span className="font-semibold">₱{currentPrice.toLocaleString()}/semester</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground text-sm">Status</span><span className="text-success font-semibold">Active</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground text-sm">Next Billing</span><span className="font-semibold">Jun 1, 2026</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground text-sm">Payment Method</span><span className="font-semibold">GCash</span></div>
          </div>
          <div className="flex gap-2 mt-6">
            <Button className="flex-1" onClick={() => toast.info("Upgrade options coming soon!")}>Upgrade Plan</Button>
            <Button variant="outline" className="flex-1" onClick={() => toast.info("Payment method management coming soon!")}>Update Payment</Button>
          </div>
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={1}
          className="dashboard-card p-6">
          <h4 className="font-display font-semibold text-lg mb-4">Payment Methods</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg border border-border/50">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📱</span>
                <div>
                  <p className="font-medium text-sm">GCash</p>
                  <p className="text-xs text-muted-foreground">••••••7890</p>
                </div>
              </div>
              <span className="text-xs bg-success/20 text-success px-2 py-0.5 rounded-full">Default</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg border border-border/50">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🏦</span>
                <div>
                  <p className="font-medium text-sm">Bank Transfer</p>
                  <p className="text-xs text-muted-foreground">BPI ••••1234</p>
                </div>
              </div>
              <Button size="sm" variant="ghost" onClick={() => toast.success("Set as default")}>Set Default</Button>
            </div>
          </div>
          <Button variant="outline" className="w-full mt-4" onClick={() => toast.info("Add payment method coming soon!")}>
            Add Payment Method
          </Button>
        </motion.div>
      </div>

      {/* Invoices */}
      <h4 className="font-display font-semibold text-xl mb-4">Invoice History</h4>
      <div className="dashboard-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Invoice</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Date</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Plan</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Amount</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Method</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Status</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv, i) => (
              <motion.tr key={inv.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                className="border-b border-border/30">
                <td className="py-3 px-4 font-mono text-xs">{inv.id}</td>
                <td className="py-3 px-4">{inv.date}</td>
                <td className="py-3 px-4">{inv.plan}</td>
                <td className="py-3 px-4 font-semibold">₱{inv.amount.toLocaleString()}</td>
                <td className="py-3 px-4">{inv.method}</td>
                <td className="py-3 px-4"><span className="text-xs bg-success/20 text-success px-2 py-0.5 rounded-full capitalize">{inv.status}</span></td>
                <td className="py-3 px-4"><Button size="sm" variant="ghost" onClick={() => toast.success(`Downloading ${inv.id}...`)}>Download</Button></td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BillingTab;
