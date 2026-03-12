import { useState } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TEMPLATE_BLOCKS } from "@/features/shared/data/mockData";
import { toast } from "sonner";

interface CanvasBlock {
  id: string;
  type: string;
  label: string;
  content: string;
  width: string;
}

const templates = [
  { id: '1', name: 'Modern Store', category: 'E-commerce', preview: '🛍️', desc: 'Clean, minimal e-commerce layout' },
  { id: '2', name: 'Dashboard Pro', category: 'Analytics', preview: '📊', desc: 'Data-heavy analytics dashboard' },
  { id: '3', name: 'Portfolio Minimal', category: 'Portfolio', preview: '✨', desc: 'Elegant personal portfolio' },
  { id: '4', name: 'Clinic Manager', category: 'Healthcare', preview: '🏥', desc: 'Patient management system' },
  { id: '5', name: 'School Hub', category: 'Education', preview: '📚', desc: 'Student enrollment portal' },
  { id: '6', name: 'Inventory Track', category: 'Logistics', preview: '📦', desc: 'Warehouse management system' },
];

const TemplatesTab = () => {
  const [mode, setMode] = useState<'browse' | 'builder'>('browse');
  const [canvas, setCanvas] = useState<CanvasBlock[]>([]);
  const [previewMode, setPreviewMode] = useState(false);

  const addBlock = (block: typeof TEMPLATE_BLOCKS[0]) => {
    const newBlock = { ...block, id: `${block.id}-${Date.now()}` };
    setCanvas((prev) => [...prev, newBlock]);
    toast.success(`${block.label} added to canvas`);
  };

  const removeBlock = (id: string) => {
    setCanvas((prev) => prev.filter((b) => b.id !== id));
  };

  const clearCanvas = () => {
    setCanvas([]);
    toast.success("Canvas cleared");
  };

  const saveTemplate = () => {
    if (canvas.length === 0) {
      toast.error("Add at least one block to save");
      return;
    }
    toast.success("Template saved successfully!");
  };

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h3 className="font-display font-bold text-3xl mb-2">Template Builder</h3>
          <p className="text-muted-foreground">
            {mode === 'browse' ? 'Choose a template or build from scratch.' : 'Drag blocks to build your storefront layout.'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant={mode === 'browse' ? 'default' : 'outline'} onClick={() => setMode('browse')}>Browse</Button>
          <Button variant={mode === 'builder' ? 'default' : 'outline'} onClick={() => setMode('builder')}>Builder</Button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {mode === 'browse' ? (
          <motion.div key="browse" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates.map((t, i) => (
                <motion.div key={t.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                  className="dashboard-card group p-6">
                  <div className="bg-secondary rounded-lg p-8 text-center mb-4 group-hover:bg-accent transition-colors">
                    <span className="text-5xl">{t.preview}</span>
                  </div>
                  <h4 className="font-display font-semibold text-lg">{t.name}</h4>
                  <p className="text-xs text-muted-foreground mb-1">{t.category}</p>
                  <p className="text-xs text-muted-foreground mb-4">{t.desc}</p>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1" onClick={() => { setMode('builder'); toast.success(`Template "${t.name}" loaded!`); }}>
                      Use Template
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => toast.info(`Previewing "${t.name}"...`)}>
                      Preview
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div key="builder" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Blocks Panel */}
              <div className="lg:col-span-1">
                <div className="dashboard-card p-4 sticky top-20">
                  <h4 className="font-display font-semibold mb-4">Available Blocks</h4>
                  <div className="space-y-2 max-h-[60vh] overflow-y-auto">
                    {TEMPLATE_BLOCKS.map((block) => (
                      <button key={block.id} onClick={() => addBlock(block)}
                        className="w-full text-left p-3 rounded-lg border border-border/50 hover:border-foreground/20 hover:bg-accent/50 transition-all text-sm">
                        <span className="font-medium">{block.label}</span>
                        <p className="text-xs text-muted-foreground mt-0.5">{block.content}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Canvas */}
              <div className="lg:col-span-3">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-2">
                    <Button size="sm" variant={previewMode ? 'default' : 'outline'} onClick={() => setPreviewMode(!previewMode)}>
                      {previewMode ? '🎨 Edit Mode' : '👁️ Preview'}
                    </Button>
                    <Button size="sm" variant="outline" onClick={clearCanvas}>Clear All</Button>
                  </div>
                  <Button size="sm" onClick={saveTemplate}>Save Template</Button>
                </div>

                {canvas.length === 0 ? (
                  <div className="dashboard-card p-16 text-center">
                    <span className="text-5xl block mb-4">🎨</span>
                    <h4 className="font-display font-semibold text-xl mb-2">Start Building</h4>
                    <p className="text-muted-foreground">Click blocks from the panel to add them to your canvas.</p>
                  </div>
                ) : previewMode ? (
                  <div className="dashboard-card p-0 overflow-hidden">
                    {canvas.map((block) => (
                      <div key={block.id} className={`p-6 border-b border-border/30 last:border-0 ${
                        block.type === 'header' ? 'bg-secondary py-8 text-center' :
                        block.type === 'hero' ? 'py-12 text-center' :
                        block.type === 'cta' ? 'bg-accent text-center py-10' :
                        block.type === 'footer' ? 'bg-secondary text-center py-6 text-sm text-muted-foreground' :
                        ''
                      }`}>
                        <p className={`${
                          block.type === 'header' ? 'text-2xl font-display font-bold' :
                          block.type === 'hero' ? 'text-3xl font-display font-bold' :
                          block.type === 'cta' ? 'text-xl font-display font-semibold' :
                          ''
                        }`}>{block.content}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Reorder.Group axis="y" values={canvas} onReorder={setCanvas} className="space-y-2">
                    {canvas.map((block) => (
                      <Reorder.Item key={block.id} value={block}
                        className="dashboard-card p-4 cursor-grab active:cursor-grabbing flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-muted-foreground cursor-grab">⠿</span>
                          <div>
                            <p className="font-medium text-sm">{block.label}</p>
                            <p className="text-xs text-muted-foreground">{block.content}</p>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost" onClick={() => removeBlock(block.id)} className="text-destructive hover:text-destructive">
                          ✕
                        </Button>
                      </Reorder.Item>
                    ))}
                  </Reorder.Group>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TemplatesTab;
