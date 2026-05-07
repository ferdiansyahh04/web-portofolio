import { motion } from 'framer-motion';

const experiences = [
  {
    id: 1,
    role: "System & Network Administrator",
    company: "Botnix",
    period: "2023 - Present",
    description: "Mengelola infrastruktur jaringan inti, orkestrasi server Proxmox, dan implementasi keamanan tingkat lanjut untuk menjamin uptime 99.9%.",
    tech: ["Proxmox", "Mikrotik", "VLAN", "Linux", "Firewall"]
  },
  {
    id: 2,
    role: "IT Infrastructure Engineer",
    company: "Samudra Kilat Indonesia",
    period: "2021 - 2023",
    description: "Bertanggung jawab atas arsitektur jaringan operasional logistik, pemeliharaan server lokal, dan troubleshooting hardware/software lintas cabang.",
    tech: ["Cisco", "Windows Server", "VPN", "Troubleshooting"]
  }
];

export default function ExperienceTimeline() {
  return (
    <section className="py-24 px-8 md:px-24 relative z-10 max-w-5xl mx-auto">
      <div className="mb-20">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">Experience</h2>
        <p className="text-[var(--accent)] mt-2 font-mono">cd /var/log/career</p>
      </div>

      <div className="relative border-l border-white/10 ml-4 md:ml-8 space-y-16 pb-12">
        {experiences.map((exp, index) => (
          <div key={exp.id} className="relative pl-8 md:pl-16 group">
            {/* Timeline Node */}
            <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[#050505] border-2 border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:shadow-[0_0_15px_rgba(204,255,0,0.6)] transition-all duration-300" />
            
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-[var(--accent)] transition-colors">{exp.role}</h3>
              <span className="text-sm font-mono text-white/50 bg-white/5 px-4 py-1 rounded-full w-max mt-2 md:mt-0 border border-white/5">
                {exp.period}
              </span>
            </div>
            
            <h4 className="text-xl text-[var(--accent-alt)] mb-4">{exp.company}</h4>
            
            <p className="text-lg text-white/70 leading-relaxed mb-6 max-w-2xl">
              {exp.description}
            </p>
            
            <div className="flex flex-wrap gap-3">
              {exp.tech.map((tech, i) => (
                <span key={i} className="px-3 py-1 text-xs font-mono border border-white/10 rounded text-white/60 hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors cursor-default">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
