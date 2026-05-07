import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'WHMCS Automation',
    role: 'System Architect & Dev',
    tech: 'Node.js, WHMCS API, Linux',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop', // Replace with transparent PNG later
  },
  {
    id: 2,
    title: 'Sport Booking',
    role: 'Fullstack Developer',
    tech: 'React, Tailwind, Express',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop', // Replace with transparent PNG later
  },
  {
    id: 3,
    title: 'Proxmox Clustering',
    role: 'Network Administrator',
    tech: 'Proxmox VE, VLAN, Mikrotik',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop', // Replace with transparent PNG later
  }
];

export default function ProjectReveal() {
  const [activeProject, setActiveProject] = useState(null);
  const containerRef = useRef(null);

  // Framer Motion values for cursor tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Add spring physics for smooth tracking
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Offset by half the image width/height to center it on cursor
      mouseX.set(e.clientX - 200); 
      mouseY.set(e.clientY - 150);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section ref={containerRef} className="py-32 px-8 md:px-24 relative z-10 max-w-7xl mx-auto">
      <div className="mb-24 flex justify-between items-end">
        <div>
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter text-white uppercase">Selected Works</h2>
          <p className="text-[var(--accent)] font-mono mt-4">["WHMCS", "Booking_Systems", "Infrastructure"]</p>
        </div>
      </div>

      <div className="flex flex-col border-t border-white/10 relative">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group flex flex-col md:flex-row justify-between items-start md:items-center py-12 border-b border-white/10 cursor-pointer relative z-20"
            onMouseEnter={() => setActiveProject(project.id)}
            onMouseLeave={() => setActiveProject(null)}
          >
            <div className="flex flex-col z-10 relative pointer-events-none">
              <h3 className="text-5xl md:text-8xl font-black tracking-tighter uppercase transition-all duration-500 text-transparent bg-clip-text" 
                  style={{
                    WebkitTextStroke: '1px rgba(255,255,255,0.3)',
                    color: activeProject === project.id ? 'var(--accent)' : 'transparent',
                    WebkitTextStrokeColor: activeProject === project.id ? 'var(--accent)' : 'rgba(255,255,255,0.3)'
                  }}>
                {project.title}
              </h3>
            </div>
            
            <div className="flex items-center gap-8 mt-6 md:mt-0 z-10 pointer-events-none transition-opacity duration-300" 
                 style={{ opacity: activeProject === project.id ? 1 : 0.4 }}>
              <div className="text-right">
                <p className="text-xl font-bold text-white">{project.role}</p>
                <p className="text-sm font-mono text-[var(--accent-alt)] mt-1">{project.tech}</p>
              </div>
              <div className={`w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${activeProject === project.id ? 'border-[var(--accent)] bg-[var(--accent)]' : 'border-white/20'}`}>
                <ArrowRight className={`w-6 h-6 transition-transform duration-300 ${activeProject === project.id ? 'text-black -rotate-45' : 'text-white'}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Image Reveal */}
      <motion.div
        className="fixed top-0 left-0 w-[400px] h-[300px] pointer-events-none overflow-hidden rounded-xl z-0"
        style={{
          x: smoothX,
          y: smoothY,
          opacity: activeProject ? 1 : 0,
          scale: activeProject ? 1 : 0.8,
        }}
        transition={{ opacity: { duration: 0.3 }, scale: { duration: 0.3 } }}
      >
        {projects.map((project) => (
          <img
            key={project.id}
            src={project.image}
            alt={project.title}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              activeProject === project.id ? 'opacity-100' : 'opacity-0'
            }`}
            // Note: Update to 'object-contain' when using transparent PNGs
          />
        ))}
        {/* Glow behind image */}
        <div className="absolute inset-0 bg-[var(--accent)]/20 mix-blend-overlay" />
      </motion.div>
    </section>
  );
}
