import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, Loader2 } from 'lucide-react';

const SUGGESTIONS = [
  'Apa skill utama Rizky?',
  'Ceritakan tentang project Posiva',
  'Pengalaman networking-nya?',
  'Sertifikasi apa aja yang dimiliki?',
];

const INITIAL_MESSAGE = {
  role: 'assistant',
  content:
    "Halo! Aku AI assistant-nya Rizky 👋 Tanya aja seputar skill, pengalaman, atau project-nya. Mau mulai dari mana?",
};

// Endpoint serverless. Saat dev, Vite akan proxy /api ke Vercel dev (atau backend lain).
const API_ENDPOINT = '/api/chat';

export default function AIChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [open]);

  const send = async (text) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    setError(null);
    const next = [...messages, { role: 'user', content }];
    setMessages(next);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // Kirim cuma user/assistant turns ke server, tanpa initial greeting
          messages: next.filter((m, i) => !(i === 0 && m === INITIAL_MESSAGE)),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || `HTTP ${res.status}`);
      }

      setMessages([...next, { role: 'assistant', content: data.content || '(no response)' }]);
    } catch (e) {
      setError(e.message || 'Failed to reach AI');
      setMessages([
        ...next,
        {
          role: 'assistant',
          content:
            'Maaf, lagi ada gangguan koneksi ke server AI. Coba lagi sebentar ya, atau langsung email Rizky di ferdiansyahh670@gmail.com 🙏',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-8 right-8 z-[60] w-14 h-14 rounded-full shadow-[0_0_30px_rgba(204,255,0,0.4)] border border-[#ccff00]/40 bg-gradient-to-br from-[#ccff00] to-[#00e5ff] text-black hover:scale-110 transition-transform"
        whileTap={{ scale: 0.92 }}
        aria-label={open ? 'Close AI chat' : 'Open AI chat'}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.div
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <X className="w-6 h-6" strokeWidth={2.5} />
            </motion.div>
          ) : (
            <motion.div
              key="msg"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <MessageSquare className="w-6 h-6" strokeWidth={2.5} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.25, 0.4, 0.25, 1] }}
            className="fixed bottom-24 right-4 sm:right-6 z-[60] w-[calc(100vw-2rem)] sm:w-[400px] max-h-[75vh] flex flex-col rounded-2xl border border-white/10 bg-[#0a0a0a]/95 backdrop-blur-xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-white/10 bg-gradient-to-r from-[#ccff00]/10 to-[#00e5ff]/10 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ccff00] to-[#00e5ff] flex items-center justify-center text-black">
                <Sparkles className="w-4 h-4" strokeWidth={2.5} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-white tracking-tight">Ask About Rizky</div>
                <div className="text-[10px] text-white/50 font-mono uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Powered by DataByte AI
                </div>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 py-4 space-y-3 custom-scrollbar"
              style={{ scrollBehavior: 'smooth' }}
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                      m.role === 'user'
                        ? 'bg-gradient-to-br from-[#ccff00] to-[#00e5ff] text-black rounded-br-sm font-medium'
                        : 'bg-white/5 border border-white/10 text-white/90 rounded-bl-sm'
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 rounded-2xl rounded-bl-sm px-3.5 py-2.5">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              {/* Suggestion chips — only show on first interaction */}
              {messages.length === 1 && !loading && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="text-[11px] px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 hover:border-[#ccff00]/50 hover:text-[#ccff00] hover:bg-[#ccff00]/5 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/10 bg-black/40">
              {error && (
                <div className="text-[11px] text-red-400/80 mb-2 px-1 font-mono">⚠ {error}</div>
              )}
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 focus-within:border-[#ccff00]/40 transition-colors">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Tanya tentang Rizky..."
                  disabled={loading}
                  maxLength={500}
                  className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder:text-white/30 disabled:opacity-50"
                />
                <button
                  onClick={() => send()}
                  disabled={loading || !input.trim()}
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-[#ccff00] to-[#00e5ff] text-black disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110 transition-transform shrink-0"
                  aria-label="Send"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" strokeWidth={2.5} />
                  )}
                </button>
              </div>
              <div className="text-[9px] text-white/30 text-center mt-2 font-mono uppercase tracking-widest">
                AI may make mistakes. Verify info via email.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
