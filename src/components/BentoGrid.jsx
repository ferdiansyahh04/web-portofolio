import { motion } from 'framer-motion';
import { Terminal, Server, Shield, Code, Cpu, Database } from 'lucide-react';
import { useEffect, useState } from 'react';

const TechMarquee = () => {
  const techStack = [
    "Proxmox", "Mikrotik", "Docker", "Node.js", "VLAN", "React", "Next.js", "Linux", "AWS", "Nginx", "Git", "Python"
  ];

  return (
    <div className="overflow-hidden w-full relative flex items-center h-full">
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/50 to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black/50 to-transparent z-10" />
      
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {[...techStack, ...techStack].map((tech, i) => (
          <span key={i} className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-white/5 uppercase tracking-tighter hover:text-[var(--accent)] transition-colors duration-300">
            {tech}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const PseudoTerminal = () => {
  const lines = [
    "root@voltx-server:~# ping 8.8.8.8",
    "PING 8.8.8.8 (8.8.8.8) 56(84) bytes of data.",
    "64 bytes from 8.8.8.8: icmp_seq=1 ttl=115 time=14.2 ms",
    "64 bytes from 8.8.8.8: icmp_seq=2 ttl=115 time=13.8 ms",
    "root@voltx-server:~# docker ps",
    "CONTAINER ID   IMAGE          COMMAND                  STATUS",
    "a1b2c3d4e5f6   nginx:alpine   \"/docker-entrypoint.…\"   Up 5 days",
    "root@voltx-server:~# npm run build",
    "> voltx-portfolio@1.0.0 build",
    "> vite build",
    "✓ 248 modules transformed.",
    "dist/index.html   0.45 kB",
    "dist/assets/index.js  145.2 kB",
    "root@voltx-server:~# _"
  ];
  
  const [visibleLines, setVisibleLines] = useState([]);
  
  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < lines.length) {
        setVisibleLines(prev => [...prev, lines[currentLine]]);
        currentLine++;
      } else {
        setVisibleLines([]); // reset
        currentLine = 0;
      }
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-mono text-xs md:text-sm text-[#00e5ff] flex flex-col gap-1 opacity-80 h-full overflow-hidden">
      <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/10">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="text-white/30 ml-2">bash - root@voltx</span>
      </div>
      {visibleLines.map((line, i) => (
        <div key={i} className={line.startsWith("root@") ? "text-white" : "text-[var(--accent)]"}>
          {line}
        </div>
      ))}
    </div>
  );
};

export default function BentoGrid() {
  return (
    <section className="py-24 px-8 md:px-24 relative z-10 max-w-7xl mx-auto">
      <div className="mb-16">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-4">The Hybrid Engineer.</h2>
        <p className="text-lg opacity-50 max-w-2xl">Bridging the gap between robust infrastructure and seamless user experiences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
        
        {/* Box 1: Bio (Span 2 cols) */}
        <div className="md:col-span-2 row-span-1 bg-black/40 backdrop-blur-md rounded-3xl border border-white/5 p-8 flex flex-col justify-center relative overflow-hidden group hover:border-[var(--accent)]/30 transition-colors">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <Server className="w-32 h-32" />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-[var(--accent)]">About Me</h3>
          <p className="text-lg text-white/80 leading-relaxed max-w-xl relative z-10">
            Berangkat dari dunia infrastruktur jaringan yang kompleks, saya menemukan hasrat baru di ranah <span className="text-white font-bold">Software Engineering</span>. Kini, saya menggabungkan disiplin keandalan server dengan kreativitas pengembangan web interaktif.
          </p>
        </div>

        {/* Box 4: Terminal (Span 1 col, 2 rows) */}
        <div className="md:col-span-1 row-span-2 bg-[#050505] rounded-3xl border border-white/5 p-6 shadow-inner relative overflow-hidden group hover:border-[#00e5ff]/30 transition-colors">
          <PseudoTerminal />
        </div>

        {/* Box 3: Milestones (Span 1 col) */}
        <div className="md:col-span-1 row-span-1 bg-black/40 backdrop-blur-md rounded-3xl border border-white/5 p-8 flex flex-col justify-between group hover:border-[var(--accent)]/30 transition-colors">
          <Shield className="w-8 h-8 text-[var(--accent-alt)] mb-4" />
          <div>
            <h3 className="text-xl font-bold mb-2">Milestones</h3>
            <p className="text-sm text-white/60">Handling production servers bersanding dengan perjalanan eksplorasi beasiswa React Developer.</p>
          </div>
        </div>

        {/* Box 2: Tech Marquee (Span 1 col) */}
        <div className="md:col-span-1 row-span-1 bg-black/40 backdrop-blur-md rounded-3xl border border-white/5 overflow-hidden group hover:border-[var(--accent)]/30 transition-colors flex items-center">
          <TechMarquee />
        </div>

      </div>
    </section>
  );
}
