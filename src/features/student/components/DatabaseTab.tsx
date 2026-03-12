import { useState } from "react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/context/AuthContext";
import { toast } from "sonner";

const DatabaseTab = () => {
  const { user } = useAuth();
  const [expandedTable, setExpandedTable] = useState<string | null>(null);
  if (!user) return null;

  const usagePercent = user.storageTotal > 0 ? (user.storageUsed / user.storageTotal) * 100 : 0;

  const tables = [
    { name: "products", rows: 142, size: "0.12 GB", columns: ["id", "name", "price", "category_id", "stock", "image_url", "created_at"] },
    { name: "orders", rows: 89, size: "0.08 GB", columns: ["id", "user_id", "total", "status", "payment_method", "created_at"] },
    { name: "users", rows: 23, size: "0.02 GB", columns: ["id", "name", "email", "role", "created_at"] },
    { name: "inventory", rows: 456, size: "0.34 GB", columns: ["id", "product_id", "quantity", "warehouse_id", "last_updated"] },
    { name: "categories", rows: 18, size: "0.01 GB", columns: ["id", "name", "description", "parent_id"] },
    { name: "order_items", rows: 234, size: "0.15 GB", columns: ["id", "order_id", "product_id", "quantity", "price"] },
  ];

  return (
    <div className="w-full">
      <h3 className="font-display font-bold text-3xl mb-2">Database Manager</h3>
      <p className="text-muted-foreground mb-8 text-lg">View and manage your database allocation.</p>

      {/* Storage Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="dashboard-card p-6">
          <span className="text-2xl mb-2 block">💾</span>
          <p className="text-sm text-muted-foreground">Storage Used</p>
          <p className="text-2xl font-display font-bold">{user.storageUsed} GB</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
          className="dashboard-card p-6">
          <span className="text-2xl mb-2 block">📊</span>
          <p className="text-sm text-muted-foreground">Total Tables</p>
          <p className="text-2xl font-display font-bold">{tables.length}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}
          className="dashboard-card p-6">
          <span className="text-2xl mb-2 block">📋</span>
          <p className="text-sm text-muted-foreground">Total Rows</p>
          <p className="text-2xl font-display font-bold">{tables.reduce((a, t) => a + t.rows, 0).toLocaleString()}</p>
        </motion.div>
      </div>

      {/* Storage Bar */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="dashboard-card mb-8 p-6">
        <div className="flex justify-between text-sm mb-3">
          <span className="text-muted-foreground">Storage Usage</span>
          <span className="font-medium">{user.storageUsed} GB / {user.storageTotal} GB</span>
        </div>
        <Progress value={usagePercent} className="h-3 mb-2" />
        <p className="text-xs text-muted-foreground">Plan: {user.plan?.toUpperCase() || 'None'} — {user.storageTotal} GB allocated</p>
      </motion.div>

      {/* Tables */}
      <h4 className="font-display font-semibold text-xl mb-4">Tables</h4>
      <div className="space-y-3">
        {tables.map((t, i) => (
          <motion.div key={t.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="dashboard-card overflow-hidden">
            <button onClick={() => setExpandedTable(expandedTable === t.name ? null : t.name)}
              className="w-full flex items-center justify-between p-5 text-left">
              <div className="flex items-center gap-4">
                <span className="font-mono text-sm font-medium">{t.name}</span>
                <span className="text-xs text-muted-foreground">{t.rows} rows</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-muted-foreground">{t.size}</span>
                <span className="text-muted-foreground">{expandedTable === t.name ? '▲' : '▼'}</span>
              </div>
            </button>
            {expandedTable === t.name && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                className="border-t border-border/50 p-5">
                <p className="text-xs text-muted-foreground mb-3">Columns:</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {t.columns.map((col) => (
                    <span key={col} className="text-xs font-mono bg-secondary px-2 py-1 rounded">{col}</span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => toast.info(`Viewing ${t.name} data...`)}>View Data</Button>
                  <Button size="sm" variant="outline" onClick={() => toast.success(`Exported ${t.name}.csv`)}>Export CSV</Button>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DatabaseTab;
