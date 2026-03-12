import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const activityData = [
  { id: 1, action: 'Generated E-commerce Store', type: 'generation', time: '2 minutes ago', emoji: '🤖', details: 'AI generated "Campus Merch Store" with 8 pages and 5 database tables' },
  { id: 2, action: 'Deployed to campusmerch.autostore-im.app', type: 'deployment', time: '5 minutes ago', emoji: '🚀', details: 'System deployed successfully with SSL certificate' },
  { id: 3, action: 'Updated domain settings', type: 'settings', time: '15 minutes ago', emoji: '🌐', details: 'Changed DNS configuration for bcpinventory.autostore-im.app' },
  { id: 4, action: 'Used 50 AI credits', type: 'credits', time: '20 minutes ago', emoji: '⚡', details: 'Credits consumed for system generation and optimization' },
  { id: 5, action: 'Saved template "Modern Store"', type: 'template', time: '1 hour ago', emoji: '🎨', details: 'Template saved with 6 blocks: header, hero, products, CTA, testimonials, footer' },
  { id: 6, action: 'Logged in from Chrome/Windows', type: 'auth', time: '1 hour ago', emoji: '🔐', details: 'IP: 192.168.1.xxx • Manila, Philippines' },
  { id: 7, action: 'Exported products table as CSV', type: 'export', time: '2 hours ago', emoji: '📤', details: 'Exported 142 rows from products table' },
  { id: 8, action: 'Added new product category', type: 'data', time: '2 hours ago', emoji: '📂', details: 'Category "Electronics" added to Campus Merch Store' },
  { id: 9, action: 'Changed password', type: 'security', time: '3 hours ago', emoji: '🔑', details: 'Password updated successfully' },
  { id: 10, action: 'Upgraded plan to Pro', type: 'billing', time: '1 day ago', emoji: '💳', details: 'Upgraded from Basic to Pro plan — ₱3,000/semester' },
  { id: 11, action: 'Generated Inventory System', type: 'generation', time: '1 day ago', emoji: '🤖', details: 'AI generated "BCP Inventory Tracker" with inventory management features' },
  { id: 12, action: 'Completed tutorial', type: 'tutorial', time: '2 days ago', emoji: '📖', details: 'Finished all 8 tutorial steps' },
  { id: 13, action: 'Account created', type: 'auth', time: '5 days ago', emoji: '👤', details: 'Registered as BSIT IM student' },
  { id: 14, action: 'Connected GCash payment', type: 'billing', time: '5 days ago', emoji: '💰', details: 'GCash payment method linked successfully' },
  { id: 15, action: 'First login', type: 'auth', time: '5 days ago', emoji: '🎉', details: 'Welcome to AutoStore IM!' },
];

const typeFilters = ['all', 'generation', 'deployment', 'settings', 'credits', 'template', 'auth', 'export', 'data', 'security', 'billing', 'tutorial'];

const ActivityLogTab = () => {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = activityData.filter(a => {
    const matchType = filter === 'all' || a.type === filter;
    const matchSearch = a.action.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <div className="w-full">
      <h3 className="font-display font-bold text-3xl mb-2">Activity Log</h3>
      <p className="text-muted-foreground mb-8 text-lg">Track all your actions and changes on the platform.</p>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search activities..." className="flex-1" />
        <div className="flex gap-2 flex-wrap">
          {['all', 'generation', 'auth', 'billing'].map((t) => (
            <Button key={t} size="sm" variant={filter === t ? 'default' : 'outline'} onClick={() => setFilter(t)} className="capitalize">
              {t}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-1">
        {filtered.map((activity, i) => (
          <motion.div key={activity.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
            className="dashboard-card p-4 flex items-start gap-4 hover:border-foreground/10 transition-all">
            <span className="text-2xl mt-0.5">{activity.emoji}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className="font-medium text-sm">{activity.action}</p>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{activity.details}</p>
            </div>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <span className="text-5xl block mb-4">📋</span>
            <p>No activities found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityLogTab;
