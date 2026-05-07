import { motion } from 'framer-motion';
import { Terminal, Server, Shield, Code, Cpu, Database } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

const TechGrid = () => {
  const categories = [
    { name: "Infrastructure", icon: <Server className="w-5 h-5" />, items: ["Proxmox", "VLAN", "Nginx"] },
    { name: "Networking", icon: <Shield className="w-5 h-5" />, items: ["Mikrotik", "Cisco", "Firewall"] },
    { name: "Development", icon: <Code className="w-5 h-5" />, items: ["React", "Node.js", "Python"] },
    { name: "Cloud & Dev", icon: <Database className="w-5 h-5" />, items: ["Docker", "Git", "AWS"] },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 p-2 h-full">
      {categories.map((cat, i) => (
        <div key={i} className="flex flex-col gap-2 group/item">
          <div className="flex items-center gap-2 text-[var(--accent)] opacity-80 group-hover/item:opacity-100 transition-opacity">
            {cat.icon}
            <span className="text-[10px] font-bold uppercase tracking-widest">{cat.name}</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {cat.items.map((item, j) => (
              <span key={j} className="text-[9px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/60">
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const InteractiveTerminal = () => {
  const [history, setHistory] = useState([
    { type: 'output', content: 'Welcome to Rizky-OS v2.4.0 (stable)' },
    { type: 'output', content: 'Type "help" to see available commands.' },
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      const newHistory = [...history, { type: 'input', content: `root@voltx:~# ${input}` }];
      
      let output = '';
      switch (cmd) {
        case 'help':
          output = 'Available commands: help, about, skills, contact, clear, date';
          break;
        case 'about':
          output = 'Rizky Ferdiansyah — System & Network Administrator turning Software Engineer. Specializing in high-availability infrastructure and interactive web apps.';
          break;
        case 'skills':
          output = 'Linux [██████████] 95%\nNetworking [████████░░] 85%\nReact [████████░░] 80%\nDocker [███████░░░] 75%';
          break;
        case 'contact':
          output = 'Email: rizkyferdiansyah04@gmail.com\nLinkedIn: in/rizkyferdiansyah';
          break;
        case 'date':
          output = new Date().toString();
          break;
        case 'clear':
          setHistory([]);
          setInput('');
          return;
        default:
          output = `Command not found: ${cmd}. Type "help" for a list of commands.`;
      }

      setHistory([...newHistory, { type: 'output', content: output }]);
      setInput('');
    }
  };

  return (
    <div className="font-mono text-[10px] md:text-xs text-[#00e5ff] flex flex-col h-full overflow-hidden">
      <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/10 shrink-0">
        <div className="w-2 h-2 rounded-full bg-red-500" />
        <div className="w-2 h-2 rounded-full bg-yellow-500" />
        <div className="w-2 h-2 rounded-full bg-green-500" />
        <span className="text-white/30 ml-2 text-[10px]">bash — interactive</span>
      </div>
      
      <div ref={scrollRef} className="flex-1 overflow-y-auto custom-scrollbar pr-2">
        {history.map((line, i) => (
          <div key={i} className={`whitespace-pre-wrap mb-1 ${line.type === 'input' ? 'text-white' : 'text-[#00e5ff] opacity-80'}`}>
            {line.content}
          </div>
        ))}
        <div className="flex items-center gap-2 text-white">
          <span className="shrink-0">root@voltx:~#</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            className="bg-transparent border-none outline-none w-full text-white"
            autoFocus
          />
        </div>
      </div>
    </div>
  );
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: [0.25, 0.4, 0.25, 1] }
  })
};

export default function BentoGrid() {
  return (
    <section id="about" className="py-24 px-8 md:px-24 relative z-10 max-w-7xl mx-auto">
      <motion.div 
        className="mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
      >
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-4">The Hybrid Engineer.</h2>
        <p className="text-lg opacity-50 max-w-2xl">Bridging the gap between robust infrastructure and seamless user experiences.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
        
        {/* Box 1: Bio (Span 2 cols) */}
        <motion.div 
          className="md:col-span-2 row-span-1 bg-black/40 backdrop-blur-md rounded-3xl border border-white/5 p-8 flex flex-col justify-center relative overflow-hidden group hover:border-[var(--accent)]/30 transition-colors"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={0}
          variants={fadeUp}
        >
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <Server className="w-32 h-32" />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-[var(--accent)]">About Me</h3>
          <p className="text-lg text-white/80 leading-relaxed max-w-xl relative z-10">
            Berangkat dari dunia infrastruktur jaringan yang kompleks, saya menemukan hasrat baru di ranah <span className="text-white font-bold">Software Engineering</span>. Kini, saya menggabungkan disiplin keandalan server dengan kreativitas pengembangan web interaktif.
          </p>
        </motion.div>

        {/* Box 4: Terminal (Span 1 col, 2 rows) */}
        <motion.div 
          className="md:col-span-1 row-span-2 bg-[#050505] rounded-3xl border border-white/5 p-6 shadow-inner relative overflow-hidden group hover:border-[#00e5ff]/30 transition-colors"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={1}
          variants={fadeUp}
        >
          <InteractiveTerminal />
        </motion.div>

        {/* Box 3: Milestones (Span 1 col) */}
        <motion.div 
          className="md:col-span-1 row-span-1 bg-black/40 backdrop-blur-md rounded-3xl border border-white/5 p-8 flex flex-col justify-between group hover:border-[var(--accent)]/30 transition-colors"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={2}
          variants={fadeUp}
        >
          <Shield className="w-8 h-8 text-[var(--accent-alt)] mb-4" />
          <div>
            <h3 className="text-xl font-bold mb-2">Milestones</h3>
            <p className="text-sm text-white/60">Handling production servers bersanding dengan perjalanan eksplorasi beasiswa React Developer.</p>
          </div>
        </motion.div>

        {/* Box 2: Tech Grid (Span 1 col) */}
        <motion.div 
          className="md:col-span-1 row-span-1 bg-black/40 backdrop-blur-md rounded-3xl border border-white/5 p-8 overflow-hidden group hover:border-[var(--accent)]/30 transition-colors flex flex-col justify-between"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={3}
          variants={fadeUp}
        >
          <h3 className="text-sm font-bold text-white/40 mb-4 uppercase tracking-tighter">Stack</h3>
          <TechGrid />
        </motion.div>

      </div>
    </section>
  );
}
