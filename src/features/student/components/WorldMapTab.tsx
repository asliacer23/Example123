import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const regions = [
  { id: 'ncr', name: 'NCR - Metro Manila', lat: 14.6, lng: 121.0, students: 312, systems: 487, active: true, color: 'foreground' },
  { id: 'r3', name: 'Region III - Central Luzon', lat: 15.5, lng: 120.7, students: 89, systems: 124, active: true, color: 'foreground' },
  { id: 'r4a', name: 'Region IV-A - CALABARZON', lat: 14.1, lng: 121.3, students: 145, systems: 198, active: true, color: 'foreground' },
  { id: 'r7', name: 'Region VII - Central Visayas', lat: 9.8, lng: 123.9, students: 67, systems: 89, active: true, color: 'foreground' },
  { id: 'r11', name: 'Region XI - Davao', lat: 7.1, lng: 125.6, students: 54, systems: 72, active: true, color: 'foreground' },
  { id: 'r1', name: 'Region I - Ilocos', lat: 16.6, lng: 120.3, students: 38, systems: 45, active: false, color: 'muted-foreground' },
  { id: 'r6', name: 'Region VI - Western Visayas', lat: 10.7, lng: 122.5, students: 42, systems: 56, active: true, color: 'foreground' },
  { id: 'r10', name: 'Region X - Northern Mindanao', lat: 8.5, lng: 124.6, students: 31, systems: 38, active: false, color: 'muted-foreground' },
  { id: 'r2', name: 'Region II - Cagayan Valley', lat: 17.6, lng: 121.7, students: 22, systems: 28, active: false, color: 'muted-foreground' },
  { id: 'car', name: 'CAR - Cordillera', lat: 16.4, lng: 120.6, students: 19, systems: 21, active: false, color: 'muted-foreground' },
];

const globalNodes = [
  { name: 'Philippines', x: 78, y: 52, students: 847, primary: true },
  { name: 'Singapore', x: 73, y: 55, students: 12, primary: false },
  { name: 'Japan', x: 82, y: 38, students: 8, primary: false },
  { name: 'USA (West)', x: 18, y: 40, students: 5, primary: false },
  { name: 'UAE', x: 58, y: 45, students: 3, primary: false },
  { name: 'Australia', x: 82, y: 72, students: 4, primary: false },
  { name: 'South Korea', x: 80, y: 37, students: 6, primary: false },
  { name: 'Canada', x: 20, y: 30, students: 2, primary: false },
];

const deploymentServers = [
  { name: 'AS-Primary (Manila)', location: 'Manila, PH', status: 'operational', latency: '12ms', load: 45, region: 'Asia Pacific' },
  { name: 'AS-Secondary (Singapore)', location: 'Singapore', status: 'operational', latency: '35ms', load: 28, region: 'Asia Pacific' },
  { name: 'AS-Tertiary (Tokyo)', location: 'Tokyo, JP', status: 'operational', latency: '68ms', load: 15, region: 'Asia Pacific' },
  { name: 'US-West (Oregon)', location: 'Oregon, US', status: 'standby', latency: '180ms', load: 5, region: 'North America' },
  { name: 'EU-Central (Frankfurt)', location: 'Frankfurt, DE', status: 'standby', latency: '220ms', load: 3, region: 'Europe' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.4 } }),
};

const WorldMapTab = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [mapView, setMapView] = useState<'philippines' | 'global' | 'servers'>('philippines');

  const totalStudents = regions.reduce((a, r) => a + r.students, 0);
  const totalSystems = regions.reduce((a, r) => a + r.systems, 0);
  const activeRegions = regions.filter(r => r.active).length;

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h3 className="font-display font-bold text-3xl mb-2">Global Map</h3>
          <p className="text-muted-foreground text-lg">Platform deployment across regions and servers.</p>
        </div>
        <div className="flex gap-2">
          <Button variant={mapView === 'philippines' ? 'default' : 'outline'} size="sm" onClick={() => setMapView('philippines')}>Philippines</Button>
          <Button variant={mapView === 'global' ? 'default' : 'outline'} size="sm" onClick={() => setMapView('global')}>Global</Button>
          <Button variant={mapView === 'servers' ? 'default' : 'outline'} size="sm" onClick={() => setMapView('servers')}>Servers</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Students', value: totalStudents.toLocaleString() },
          { label: 'Systems Deployed', value: totalSystems.toLocaleString() },
          { label: 'Active Regions', value: `${activeRegions} / ${regions.length}` },
          { label: 'Server Nodes', value: deploymentServers.length.toString() },
        ].map((s, i) => (
          <motion.div key={s.label} initial="hidden" animate="visible" variants={fadeUp} custom={i}
            className="dashboard-card p-5 group hover:border-foreground/20 transition-all duration-300">
            <p className="text-2xl font-display font-bold group-hover:scale-105 transition-transform origin-left">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {mapView === 'philippines' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {/* Interactive Map Visualization */}
          <div className="dashboard-card p-6 mb-6">
            <h4 className="font-display font-semibold text-lg mb-4">Philippines Coverage</h4>
            <div className="relative bg-secondary rounded-xl p-8 min-h-[400px] overflow-hidden">
              {/* Grid lines for map effect */}
              <div className="absolute inset-0 opacity-10">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={`h-${i}`} className="absolute w-full border-t border-foreground/20" style={{ top: `${(i + 1) * 5}%` }} />
                ))}
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={`v-${i}`} className="absolute h-full border-l border-foreground/20" style={{ left: `${(i + 1) * 5}%` }} />
                ))}
              </div>

              {/* Region dots */}
              {regions.map((region, i) => {
                const x = ((region.lng - 118) / 10) * 100;
                const y = ((18 - region.lat) / 12) * 100;
                return (
                  <motion.div
                    key={region.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.08, type: 'spring' }}
                    className={`absolute cursor-pointer group`}
                    style={{ left: `${Math.min(90, Math.max(5, x))}%`, top: `${Math.min(90, Math.max(5, y))}%` }}
                    onClick={() => setSelectedRegion(region.id === selectedRegion ? null : region.id)}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${region.active ? 'bg-foreground border-foreground' : 'bg-muted-foreground/50 border-muted-foreground'} ${selectedRegion === region.id ? 'scale-150 ring-4 ring-foreground/20' : 'group-hover:scale-125'}`} />
                    {region.active && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-foreground/30"
                        animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                    <div className="absolute left-6 top-[-8px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-card border border-border rounded-lg px-3 py-1.5 text-xs shadow-lg z-10">
                      <p className="font-semibold">{region.name}</p>
                      <p className="text-muted-foreground">{region.students} students</p>
                    </div>
                  </motion.div>
                );
              })}

              {/* Connection lines between major regions */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                {regions.filter(r => r.active).slice(0, 5).map((r, i, arr) => {
                  if (i === 0) return null;
                  const prev = arr[0];
                  const x1 = Math.min(90, Math.max(5, ((prev.lng - 118) / 10) * 100));
                  const y1 = Math.min(90, Math.max(5, ((18 - prev.lat) / 12) * 100));
                  const x2 = Math.min(90, Math.max(5, ((r.lng - 118) / 10) * 100));
                  const y2 = Math.min(90, Math.max(5, ((18 - r.lat) / 12) * 100));
                  return (
                    <motion.line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                      stroke="hsl(var(--foreground))" strokeWidth="0.15" strokeDasharray="1,1" opacity={0.3}
                      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: i * 0.2, duration: 1 }}
                    />
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Region List */}
          <h4 className="font-display font-semibold text-lg mb-4">Region Details</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {regions.map((r, i) => (
              <motion.div key={r.id} initial="hidden" animate="visible" variants={fadeUp} custom={i}
                className={`dashboard-card p-5 cursor-pointer transition-all duration-300 hover:border-foreground/20 hover:-translate-y-0.5 ${selectedRegion === r.id ? 'border-foreground/30 bg-accent/30' : ''}`}
                onClick={() => setSelectedRegion(r.id === selectedRegion ? null : r.id)}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-display font-semibold text-sm">{r.name}</h4>
                  <span className={`w-2.5 h-2.5 rounded-full ${r.active ? 'bg-foreground' : 'bg-muted-foreground/40'}`} />
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{r.students} students</span>
                  <span>{r.systems} systems</span>
                  <span>{r.active ? 'Active' : 'Expanding'}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {mapView === 'global' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="dashboard-card p-6 mb-6">
            <h4 className="font-display font-semibold text-lg mb-4">Global Reach</h4>
            <div className="relative bg-secondary rounded-xl p-8 min-h-[400px] overflow-hidden">
              {/* World map grid */}
              <div className="absolute inset-0 opacity-5">
                {Array.from({ length: 30 }).map((_, i) => (
                  <div key={`wh-${i}`} className="absolute w-full border-t border-foreground" style={{ top: `${(i + 1) * 3.33}%` }} />
                ))}
                {Array.from({ length: 40 }).map((_, i) => (
                  <div key={`wv-${i}`} className="absolute h-full border-l border-foreground" style={{ left: `${(i + 1) * 2.5}%` }} />
                ))}
              </div>

              {/* Node points */}
              {globalNodes.map((node, i) => (
                <motion.div key={node.name}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.1, type: 'spring' }}
                  className="absolute group cursor-pointer"
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}>
                  <div className={`rounded-full border-2 border-foreground transition-all duration-300 group-hover:scale-150 ${node.primary ? 'w-5 h-5 bg-foreground' : 'w-3 h-3 bg-foreground/60'}`} />
                  {node.primary && (
                    <motion.div className="absolute inset-[-4px] rounded-full border border-foreground/40"
                      animate={{ scale: [1, 2], opacity: [0.5, 0] }} transition={{ duration: 2, repeat: Infinity }} />
                  )}
                  <div className="absolute left-6 top-[-8px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-card border border-border rounded-lg px-3 py-1.5 text-xs shadow-lg z-10">
                    <p className="font-semibold">{node.name}</p>
                    <p className="text-muted-foreground">{node.students} students</p>
                  </div>
                </motion.div>
              ))}

              {/* Connection lines to Philippines hub */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {globalNodes.filter(n => !n.primary).map((node, i) => (
                  <motion.line key={i}
                    x1={`${globalNodes[0].x}%`} y1={`${globalNodes[0].y}%`}
                    x2={`${node.x}%`} y2={`${node.y}%`}
                    stroke="hsl(var(--foreground))" strokeWidth="0.5" strokeDasharray="4,4" opacity={0.2}
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: i * 0.15 + 0.5, duration: 1 }}
                  />
                ))}
              </svg>

              <div className="absolute bottom-4 right-4 text-xs text-muted-foreground bg-card/80 px-3 py-1.5 rounded-lg border border-border/50">
                {globalNodes.reduce((a, n) => a + n.students, 0)} users worldwide
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {globalNodes.map((node, i) => (
              <motion.div key={node.name} initial="hidden" animate="visible" variants={fadeUp} custom={i}
                className="dashboard-card p-4 hover:border-foreground/20 hover:-translate-y-0.5 transition-all duration-300">
                <div className="flex items-center gap-2 mb-1">
                  <div className={`w-2 h-2 rounded-full ${node.primary ? 'bg-foreground' : 'bg-muted-foreground'}`} />
                  <span className="font-display font-semibold text-sm">{node.name}</span>
                </div>
                <p className="text-xs text-muted-foreground">{node.students} student{node.students !== 1 ? 's' : ''}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {mapView === 'servers' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="grid grid-cols-1 gap-4">
            {deploymentServers.map((server, i) => (
              <motion.div key={server.name} initial="hidden" animate="visible" variants={fadeUp} custom={i}
                className="dashboard-card p-6 hover:border-foreground/20 transition-all duration-300">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${server.status === 'operational' ? 'bg-foreground' : 'bg-muted-foreground/50'}`}>
                      {server.status === 'operational' && (
                        <motion.div className="w-3 h-3 rounded-full bg-foreground/30"
                          animate={{ scale: [1, 2], opacity: [0.5, 0] }} transition={{ duration: 2, repeat: Infinity }} />
                      )}
                    </div>
                    <div>
                      <h4 className="font-display font-semibold">{server.name}</h4>
                      <p className="text-xs text-muted-foreground">{server.location} — {server.region}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Latency</p>
                      <p className="font-mono text-sm font-medium">{server.latency}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Load</p>
                      <p className="font-mono text-sm font-medium">{server.load}%</p>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full capitalize ${server.status === 'operational' ? 'bg-foreground/10 text-foreground' : 'bg-secondary text-muted-foreground'}`}>
                      {server.status}
                    </span>
                    <Button size="sm" variant="ghost" onClick={() => toast.info(`Pinging ${server.name}...`)}
                      className="hover:scale-105 transition-transform">Ping</Button>
                  </div>
                </div>
                <div className="mt-3 bg-secondary rounded-lg h-2 overflow-hidden">
                  <motion.div className="h-full bg-foreground/60 rounded-lg"
                    initial={{ width: 0 }} animate={{ width: `${server.load}%` }} transition={{ delay: i * 0.1, duration: 0.8 }} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default WorldMapTab;
