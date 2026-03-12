import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MOCK_STUDENTS } from "@/features/shared/data/mockData";
import { toast } from "sonner";

const AdminUsers = () => {
  const [search, setSearch] = useState("");
  const [filterPlan, setFilterPlan] = useState<string>("all");

  const filtered = MOCK_STUDENTS.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase());
    const matchPlan = filterPlan === 'all' || s.plan === filterPlan;
    return matchSearch && matchPlan;
  });

  return (
    <div className="w-full">
      <h3 className="font-display font-bold text-3xl mb-2">User Management</h3>
      <p className="text-muted-foreground mb-6 text-lg">All registered students on the platform.</p>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="dashboard-card p-5 text-center">
          <p className="text-2xl font-display font-bold">{MOCK_STUDENTS.length}</p>
          <p className="text-xs text-muted-foreground">Total Users</p>
        </div>
        <div className="dashboard-card p-5 text-center">
          <p className="text-2xl font-display font-bold">{MOCK_STUDENTS.filter(s => s.status === 'active').length}</p>
          <p className="text-xs text-muted-foreground">Active</p>
        </div>
        <div className="dashboard-card p-5 text-center">
          <p className="text-2xl font-display font-bold">{MOCK_STUDENTS.filter(s => s.status === 'inactive').length}</p>
          <p className="text-xs text-muted-foreground">Inactive</p>
        </div>
        <div className="dashboard-card p-5 text-center">
          <p className="text-2xl font-display font-bold">{MOCK_STUDENTS.reduce((a, s) => a + s.projectsCount, 0)}</p>
          <p className="text-xs text-muted-foreground">Total Projects</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or email..." className="flex-1" />
        <div className="flex gap-2">
          {['all', 'basic', 'pro', 'capstone'].map((plan) => (
            <Button key={plan} size="sm" variant={filterPlan === plan ? 'default' : 'outline'}
              onClick={() => setFilterPlan(plan)} className="capitalize">
              {plan}
            </Button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="dashboard-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Name</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium hidden sm:table-cell">Email</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Plan</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium hidden md:table-cell">Projects</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium hidden lg:table-cell">Systems</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Status</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium hidden xl:table-cell">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s, i) => (
              <motion.tr key={s.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                className="border-b border-border/30 hover:bg-accent/30 transition-colors">
                <td className="py-3 px-4 font-medium">{s.name}</td>
                <td className="py-3 px-4 text-muted-foreground hidden sm:table-cell">{s.email}</td>
                <td className="py-3 px-4">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary font-medium">{s.plan.toUpperCase()}</span>
                </td>
                <td className="py-3 px-4 hidden md:table-cell">{s.projectsCount}</td>
                <td className="py-3 px-4 hidden lg:table-cell">
                  <div className="flex flex-wrap gap-1">
                    {s.systemTypes.map((t) => (
                      <span key={t} className="text-xs bg-accent px-1.5 py-0.5 rounded">{t}</span>
                    ))}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${s.status === 'active' ? 'bg-success/20 text-success' : 'bg-secondary text-muted-foreground'}`}>
                    {s.status}
                  </span>
                </td>
                <td className="py-3 px-4 hidden xl:table-cell">
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost" onClick={() => toast.info(`Viewing ${s.name}'s profile...`)}>View</Button>
                    <Button size="sm" variant="ghost" onClick={() => toast.success(`Email sent to ${s.name}`)}>Email</Button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">No users found matching your criteria.</div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
