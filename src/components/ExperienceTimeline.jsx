import { motion } from 'framer-motion';

const experiences = [
  {
    id: 1,
    role: "IT Network Operation Center (NOC)",
    company: "Samudra Kilat Indonesia",
    period: "Feb 2022 - Present",
    description: "Memonitor performa jaringan dan sistem produksi 24/7, menangani VPN tunnel, failover, load balancing, OSPF, VLAN, dan firewall. Diagnosa isu database, mail server, serta IP PBX/VoIP, dan eskalasi insiden kritis berdasarkan prioritas SLA.",
    tech: ["Mikrotik", "OSPF", "VLAN", "Linux", "Fortigate", "VoIP"]
  },
  {
    id: 2,
    role: "Network & System Administrator (Remote)",
    company: "Botnix",
    period: "Dec 2020 - Present",
    description: "Mengelola dan memelihara Virtual Private Server (VPS), Proxmox VE, dan Proxmox Backup Server. Menangani VPN tunnel, static routing, isu database produksi, serta maintenance website (SSL, DNS, hosting accessibility).",
    tech: ["Proxmox VE", "VPS", "Linux", "VPN", "cPanel", "NGINX"]
  },
  {
    id: 3,
    role: "IT Network Operation Center (NOC)",
    company: "Pemuda Berkarya Manunggal",
    period: "Dec 2020 - Feb 2022",
    description: "Troubleshoot isu jaringan dan sistem, konfigurasi router/switch dan wireless radio, menangani VPN tunnel, failover, load balancing, dan firewall. Maintenance dasar PABX/IP PBX dan monitoring traffic jaringan.",
    tech: ["Mikrotik", "Cisco", "VPN", "PABX", "Firewall"]
  },
  {
    id: 4,
    role: "IT Helpdesk",
    company: "Pemuda Berkarya Manunggal",
    period: "Sep 2019 - Dec 2020",
    description: "First-level technical support via ticketing dan komunikasi langsung. Diagnosa isu jaringan dan sistem dasar, monitoring performa downstream/upstream, eskalasi ke tim NOC/engineering bila diperlukan.",
    tech: ["Ticketing", "Network Monitoring", "Troubleshooting"]
  },
  {
    id: 5,
    role: "IT Helpdesk",
    company: "Anugrah Karunia Perkasa Abadi",
    period: "Apr 2019 - Aug 2019",
    description: "Memberikan technical support level pertama untuk klien, log dan tracking keluhan teknis, serta membantu network monitoring dan basic troubleshooting.",
    tech: ["Helpdesk", "Network Monitoring"]
  }
];

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="py-24 px-8 md:px-24 relative z-10 max-w-5xl mx-auto">
      <motion.div
        className="mb-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
      >
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">Experience</h2>
        <p className="text-[var(--accent)] mt-2 font-mono">cd /var/log/career</p>
      </motion.div>

      <div className="relative border-l border-white/10 ml-4 md:ml-8 space-y-16 pb-12">
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.id}
            className="relative pl-8 md:pl-16 group"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: index * 0.2, ease: [0.25, 0.4, 0.25, 1] }}
          >
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
          </motion.div>
        ))}
      </div>
    </section>
  );
}
