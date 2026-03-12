import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  id: number;
  role: 'user' | 'ai';
  content: string;
  time: string;
}

const aiResponses: Record<string, string> = {
  'default': "I'm AutoStore AI Assistant! I can help you with system generation, templates, database management, and more. What would you like to know?",
  'generate': "To generate a new system, go to the **Generate System** tab and select a system type. I'll handle the database schema (1NF→4NF), UI components, and deployment automatically!",
  'template': "The **Template Builder** lets you drag and drop blocks like headers, product grids, CTAs, and footers onto a canvas. You can rearrange them and preview your layout in real-time.",
  'domain': "You can manage domains in the **Domain Manager** tab. Each project gets a subdomain under autostore-im.app. Just type your desired name and click Assign!",
  'database': "Your database uses strict normalization (1NF to 4NF). You can view tables, columns, row counts, and export data as CSV from the **Database** tab.",
  'plan': "We have 3 plans: **Basic** (₱1,500) for solo projects, **Pro** (₱3,000) for group work, and **Capstone** (₱5,000) for thesis projects. Each comes with different AI credits and storage.",
  'help': "Here's what I can help with:\n• System generation\n• Template building\n• Domain management\n• Database queries\n• Plan information\n• Troubleshooting\n\nJust ask me anything!",
  'credit': "AI credits are consumed when generating systems. Basic gets 400, Pro gets 1,000, and Capstone gets 2,100 credits. You can track usage in your Analytics tab.",
  'storage': "Storage is allocated per plan: Basic (1GB), Pro (2GB), Capstone (4GB). Monitor your usage in the Database tab or Analytics tab.",
};

const getAIResponse = (input: string): string => {
  const lower = input.toLowerCase();
  if (lower.includes('generat')) return aiResponses['generate'];
  if (lower.includes('template') || lower.includes('builder')) return aiResponses['template'];
  if (lower.includes('domain')) return aiResponses['domain'];
  if (lower.includes('database') || lower.includes('table') || lower.includes('schema')) return aiResponses['database'];
  if (lower.includes('plan') || lower.includes('price') || lower.includes('pricing') || lower.includes('upgrade')) return aiResponses['plan'];
  if (lower.includes('help') || lower.includes('what can')) return aiResponses['help'];
  if (lower.includes('credit')) return aiResponses['credit'];
  if (lower.includes('storage') || lower.includes('space')) return aiResponses['storage'];
  return aiResponses['default'];
};

const AIChatTab = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: 'ai', content: "👋 Hi! I'm the AutoStore AI Assistant. I can help you with system generation, templates, domains, databases, and more. What would you like to know?", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: messages.length, role: 'user', content: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, userMsg]);
    const q = input;
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg: Message = { id: messages.length + 1, role: 'ai', content: getAIResponse(q), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 800 + Math.random() * 1200);
  };

  const suggestions = ['How do I generate a system?', 'Tell me about templates', 'What plans are available?', 'How do credits work?'];

  return (
    <div className="w-full flex flex-col" style={{ height: 'calc(100vh - 120px)' }}>
      <div className="mb-4">
        <h3 className="font-display font-bold text-3xl mb-2">AI Assistant</h3>
        <p className="text-muted-foreground">Ask me anything about AutoStore IM</p>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
        {messages.map((msg) => (
          <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'dashboard-card'} rounded-2xl px-5 py-3`}>
              <p className="text-sm whitespace-pre-line">{msg.content}</p>
              <p className={`text-xs mt-1 ${msg.role === 'user' ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>{msg.time}</p>
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
            <div className="dashboard-card rounded-2xl px-5 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div className="flex gap-2 flex-wrap mb-4">
          {suggestions.map((s) => (
            <Button key={s} size="sm" variant="outline" onClick={() => { setInput(s); }} className="text-xs">{s}</Button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="flex gap-2">
        <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your question..."
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()} className="flex-1" />
        <Button onClick={sendMessage} disabled={!input.trim() || isTyping}>Send →</Button>
      </div>
    </div>
  );
};

export default AIChatTab;
