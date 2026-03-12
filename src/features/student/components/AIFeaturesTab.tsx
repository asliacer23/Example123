import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const aiFeatures = [
  { id: 'code-gen', title: 'Code Generator', desc: 'Generate full-stack code from natural language descriptions', emoji: '{ }', status: 'available' },
  { id: 'db-design', title: 'Database Designer', desc: 'AI-powered schema design with normalization analysis', emoji: '[ ]', status: 'available' },
  { id: 'ui-builder', title: 'UI Composer', desc: 'Generate responsive UI layouts from text prompts', emoji: '# #', status: 'available' },
  { id: 'api-gen', title: 'API Generator', desc: 'Create RESTful APIs with authentication and validation', emoji: '< >', status: 'available' },
  { id: 'test-gen', title: 'Test Writer', desc: 'Auto-generate unit and integration tests', emoji: '/ /', status: 'beta' },
  { id: 'doc-gen', title: 'Doc Generator', desc: 'Generate comprehensive documentation from code', emoji: '= =', status: 'available' },
  { id: 'optimize', title: 'Performance Optimizer', desc: 'Analyze and optimize your system performance', emoji: '> >', status: 'beta' },
  { id: 'security', title: 'Security Scanner', desc: 'AI-powered vulnerability detection and fixes', emoji: '| |', status: 'coming' },
  { id: 'translate', title: 'Multi-Language', desc: 'Translate your storefront to multiple languages', emoji: 'A a', status: 'available' },
  { id: 'seo', title: 'SEO Optimizer', desc: 'Optimize content for search engines automatically', emoji: '^ ^', status: 'beta' },
  { id: 'analytics-ai', title: 'Smart Analytics', desc: 'AI-generated insights from your storefront data', emoji: '~ ~', status: 'available' },
  { id: 'chatbot', title: 'Chatbot Builder', desc: 'Create AI chatbots for your storefronts', emoji: '. .', status: 'coming' },
];

const aiModels = [
  { name: 'AutoStore GPT', version: 'v4.2', desc: 'General purpose system generation', accuracy: 94, speed: 'Fast' },
  { name: 'SchemaForge', version: 'v2.1', desc: 'Database schema optimization', accuracy: 97, speed: 'Medium' },
  { name: 'UIVision', version: 'v3.0', desc: 'UI/UX generation and layout', accuracy: 91, speed: 'Fast' },
  { name: 'CodeCraft', version: 'v1.8', desc: 'Backend code generation', accuracy: 89, speed: 'Slow' },
];

const recentGenerations = [
  { id: 1, prompt: 'E-commerce store with product filtering', model: 'AutoStore GPT', time: '2.4s', tokens: 1247, status: 'completed' },
  { id: 2, prompt: 'Inventory management with barcode scanning', model: 'SchemaForge', time: '3.1s', tokens: 2156, status: 'completed' },
  { id: 3, prompt: 'Student portal with grade tracking', model: 'UIVision', time: '1.8s', tokens: 987, status: 'completed' },
  { id: 4, prompt: 'REST API for clinic appointments', model: 'CodeCraft', time: '4.2s', tokens: 3421, status: 'completed' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.4 } }),
};

const AIFeaturesTab = () => {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [genProgress, setGenProgress] = useState(0);
  const [activeModel, setActiveModel] = useState('AutoStore GPT');
  const [view, setView] = useState<'features' | 'playground' | 'models'>('features');

  const handleGenerate = () => {
    if (!prompt.trim()) { toast.error("Enter a prompt"); return; }
    setGenerating(true);
    setGenProgress(0);
    const interval = setInterval(() => {
      setGenProgress(p => {
        if (p >= 100) { clearInterval(interval); setGenerating(false); toast.success("Generation complete!"); return 100; }
        return p + Math.random() * 8 + 2;
      });
    }, 100);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h3 className="font-display font-bold text-3xl mb-2">AI Features</h3>
          <p className="text-muted-foreground text-lg">Leverage AI to build, optimize, and manage your systems.</p>
        </div>
        <div className="flex gap-2">
          <Button variant={view === 'features' ? 'default' : 'outline'} size="sm" onClick={() => setView('features')}>Features</Button>
          <Button variant={view === 'playground' ? 'default' : 'outline'} size="sm" onClick={() => setView('playground')}>Playground</Button>
          <Button variant={view === 'models' ? 'default' : 'outline'} size="sm" onClick={() => setView('models')}>Models</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Credits Remaining', value: '680', sub: 'of 1,000' },
          { label: 'Generations Today', value: '12', sub: '45 tokens avg' },
          { label: 'Models Available', value: '4', sub: 'Active' },
          { label: 'Avg Response', value: '2.8s', sub: 'Last 24h' },
        ].map((s, i) => (
          <motion.div key={s.label} initial="hidden" animate="visible" variants={fadeUp} custom={i}
            className="dashboard-card p-5 group hover:border-foreground/20 transition-all duration-300">
            <p className="text-2xl font-display font-bold group-hover:scale-105 transition-transform origin-left">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="text-xs text-muted-foreground/60 mt-0.5">{s.sub}</p>
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {view === 'features' && (
          <motion.div key="features" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {aiFeatures.map((f, i) => (
                <motion.div key={f.id} initial="hidden" animate="visible" variants={fadeUp} custom={i + 4}
                  onClick={() => { setSelectedFeature(f.id === selectedFeature ? null : f.id); }}
                  className={`dashboard-card p-5 cursor-pointer group transition-all duration-300 hover:border-foreground/20 hover:-translate-y-1 hover:shadow-lg ${selectedFeature === f.id ? 'border-foreground/30 bg-accent/30' : ''}`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-mono font-bold text-foreground/80 group-hover:text-foreground transition-colors">{f.emoji}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${f.status === 'available' ? 'bg-foreground/10 text-foreground' : f.status === 'beta' ? 'bg-accent text-accent-foreground' : 'bg-secondary text-muted-foreground'}`}>
                      {f.status}
                    </span>
                  </div>
                  <h4 className="font-display font-semibold text-sm mb-1 group-hover:text-foreground transition-colors">{f.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                  {selectedFeature === f.id && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-3 pt-3 border-t border-border/50">
                      <Button size="sm" className="w-full" onClick={(e) => { e.stopPropagation(); setView('playground'); toast.info(`Opening ${f.title} playground...`); }}>
                        Try it
                      </Button>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {view === 'playground' && (
          <motion.div key="playground" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <div className="dashboard-card p-6">
                  <h4 className="font-display font-semibold text-lg mb-4">AI Playground</h4>
                  <div className="flex gap-2 flex-wrap mb-4">
                    {aiModels.map(m => (
                      <Button key={m.name} size="sm" variant={activeModel === m.name ? 'default' : 'outline'}
                        onClick={() => setActiveModel(m.name)} className="hover:scale-105 transition-transform">{m.name}</Button>
                    ))}
                  </div>
                  <div className="space-y-3">
                    <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Describe what you want to generate... (e.g., 'Create an inventory system with barcode scanning and stock alerts')"
                      className="w-full min-h-[120px] bg-background border border-input rounded-lg px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring transition-all" />
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">Model: {activeModel} — Est. ~50 credits</p>
                      <Button onClick={handleGenerate} disabled={generating} className="hover:scale-105 transition-transform">
                        {generating ? 'Generating...' : 'Generate'}
                      </Button>
                    </div>
                  </div>
                  {generating && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4">
                      <div className="flex justify-between text-xs text-muted-foreground mb-2">
                        <span>Processing with {activeModel}...</span>
                        <span>{Math.min(100, Math.round(genProgress))}%</span>
                      </div>
                      <Progress value={Math.min(100, genProgress)} className="h-2" />
                      <div className="mt-3 space-y-2 text-xs">
                        <motion.p animate={{ opacity: genProgress > 10 ? 1 : 0.3 }} className={genProgress > 10 ? 'text-foreground' : 'text-muted-foreground'}>
                          {genProgress > 10 ? '::' : '--'} Parsing requirements...
                        </motion.p>
                        <motion.p animate={{ opacity: genProgress > 30 ? 1 : 0.3 }} className={genProgress > 30 ? 'text-foreground' : 'text-muted-foreground'}>
                          {genProgress > 30 ? '::' : '--'} Designing schema (1NF to 4NF)...
                        </motion.p>
                        <motion.p animate={{ opacity: genProgress > 55 ? 1 : 0.3 }} className={genProgress > 55 ? 'text-foreground' : 'text-muted-foreground'}>
                          {genProgress > 55 ? '::' : '--'} Generating components...
                        </motion.p>
                        <motion.p animate={{ opacity: genProgress > 80 ? 1 : 0.3 }} className={genProgress > 80 ? 'text-foreground' : 'text-muted-foreground'}>
                          {genProgress > 80 ? '::' : '--'} Optimizing and deploying...
                        </motion.p>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Output Preview */}
                {genProgress >= 100 && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="dashboard-card p-6">
                    <h4 className="font-display font-semibold text-lg mb-4">Generated Output</h4>
                    <div className="bg-secondary rounded-lg p-4 font-mono text-xs space-y-1 overflow-x-auto">
                      <p className="text-muted-foreground">// Auto-generated by {activeModel}</p>
                      <p className="text-foreground">CREATE TABLE products (</p>
                      <p className="text-foreground pl-4">id UUID PRIMARY KEY DEFAULT gen_random_uuid(),</p>
                      <p className="text-foreground pl-4">name VARCHAR(255) NOT NULL,</p>
                      <p className="text-foreground pl-4">price DECIMAL(10,2) NOT NULL,</p>
                      <p className="text-foreground pl-4">category_id UUID REFERENCES categories(id),</p>
                      <p className="text-foreground pl-4">stock INTEGER DEFAULT 0,</p>
                      <p className="text-foreground pl-4">created_at TIMESTAMPTZ DEFAULT now()</p>
                      <p className="text-foreground">);</p>
                      <p className="text-muted-foreground mt-2">// 5 tables generated, 23 columns, RLS policies applied</p>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline" className="hover:scale-105 transition-transform" onClick={() => toast.success("Code copied!")}>Copy Code</Button>
                      <Button size="sm" className="hover:scale-105 transition-transform" onClick={() => toast.success("Deployed!")}>Deploy Now</Button>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* History */}
              <div>
                <h4 className="font-display font-semibold text-lg mb-4">Recent Generations</h4>
                <div className="space-y-2">
                  {recentGenerations.map((g, i) => (
                    <motion.div key={g.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                      className="dashboard-card p-4 hover:border-foreground/10 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                      onClick={() => { setPrompt(g.prompt); toast.info("Prompt loaded!"); }}>
                      <p className="text-sm font-medium truncate">{g.prompt}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                        <span>{g.model}</span>
                        <span>{g.time}</span>
                        <span>{g.tokens} tokens</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {view === 'models' && (
          <motion.div key="models" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {aiModels.map((m, i) => (
                <motion.div key={m.name} initial="hidden" animate="visible" variants={fadeUp} custom={i}
                  className="dashboard-card p-6 hover:border-foreground/20 hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-display font-semibold text-lg">{m.name}</h4>
                    <span className="text-xs font-mono bg-secondary px-2 py-0.5 rounded">{m.version}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{m.desc}</p>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Accuracy</span>
                        <span className="font-medium">{m.accuracy}%</span>
                      </div>
                      <Progress value={m.accuracy} className="h-2" />
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Speed</span>
                      <span className="font-medium">{m.speed}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-4 hover:scale-[1.02] transition-transform"
                    onClick={() => { setActiveModel(m.name); setView('playground'); }}>Use Model</Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIFeaturesTab;
