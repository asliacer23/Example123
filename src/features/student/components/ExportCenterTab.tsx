import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const exportOptions = [
  { id: 'products', label: 'Products Table', rows: 142, format: 'CSV', emoji: '🛍️' },
  { id: 'orders', label: 'Orders Table', rows: 89, format: 'CSV', emoji: '📋' },
  { id: 'users', label: 'Users Table', rows: 23, format: 'CSV', emoji: '👥' },
  { id: 'inventory', label: 'Inventory Table', rows: 456, format: 'CSV', emoji: '📦' },
  { id: 'categories', label: 'Categories Table', rows: 18, format: 'CSV', emoji: '📂' },
  { id: 'full-backup', label: 'Full Database Backup', rows: 728, format: 'SQL', emoji: '💾' },
  { id: 'project-config', label: 'Project Configuration', rows: 1, format: 'JSON', emoji: '⚙️' },
  { id: 'analytics', label: 'Analytics Report', rows: 1, format: 'PDF', emoji: '📊' },
];

const recentExports = [
  { file: 'products_2025-12-20.csv', date: '2025-12-20', size: '142 KB', status: 'completed' },
  { file: 'full_backup_2025-12-19.sql', date: '2025-12-19', size: '2.4 MB', status: 'completed' },
  { file: 'analytics_dec_2025.pdf', date: '2025-12-18', size: '856 KB', status: 'completed' },
  { file: 'orders_2025-12-15.csv', date: '2025-12-15', size: '89 KB', status: 'completed' },
];

const ExportCenterTab = () => {
  const [exporting, setExporting] = useState<string | null>(null);

  const handleExport = (id: string, label: string) => {
    setExporting(id);
    setTimeout(() => {
      setExporting(null);
      toast.success(`${label} exported successfully!`);
    }, 1500);
  };

  return (
    <div className="w-full">
      <h3 className="font-display font-bold text-3xl mb-2">Export Center</h3>
      <p className="text-muted-foreground mb-8 text-lg">Export your data in various formats.</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h4 className="font-display font-semibold text-xl mb-4">Available Exports</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {exportOptions.map((opt, i) => (
              <motion.div key={opt.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="dashboard-card p-5 flex items-center gap-4">
                <span className="text-2xl">{opt.emoji}</span>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{opt.label}</h4>
                  <p className="text-xs text-muted-foreground">{opt.rows} rows • {opt.format}</p>
                </div>
                <Button size="sm" onClick={() => handleExport(opt.id, opt.label)} disabled={exporting === opt.id}>
                  {exporting === opt.id ? 'Exporting...' : 'Export'}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold text-xl mb-4">Recent Exports</h4>
          <div className="space-y-2">
            {recentExports.map((exp, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                className="dashboard-card p-4">
                <p className="font-mono text-xs font-medium">{exp.file}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-muted-foreground">{exp.date} • {exp.size}</span>
                  <Button size="sm" variant="ghost" onClick={() => toast.success(`Downloading ${exp.file}...`)}>↓</Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportCenterTab;
