import { motion } from 'framer-motion';
import { Award, GraduationCap, Calendar, MapPin } from 'lucide-react';

const certifications = [
  {
    title: "MikroTik Certified Network Associate (MTCNA)",
    issuer: "MikroTik",
    date: "2023",
    icon: <Award className="w-6 h-6 text-[var(--accent)]" />
  },
  {
    title: "Cisco Certified Network Associate (CCNA)",
    issuer: "Cisco",
    date: "2022",
    icon: <Award className="w-6 h-6 text-[var(--accent)]" />
  },
  {
    title: "Google IT Support Professional",
    issuer: "Google",
    date: "2021",
    icon: <Award className="w-6 h-6 text-[var(--accent)]" />
  }
];

const education = [
  {
    degree: "Computer & Network Engineering",
    school: "Vocational High School",
    period: "2018 - 2021",
    location: "Indonesia",
    icon: <GraduationCap className="w-6 h-6 text-[var(--accent-alt)]" />
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.4, 0.25, 1] }
  })
};

export default function Certifications() {
  return (
    <section id="credentials" className="py-24 px-8 md:px-24 relative z-10 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Certifications Side */}
        <div>
          <motion.div 
            className="mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-4xl font-bold tracking-tighter text-white mb-2 uppercase italic">Certifications</h2>
            <div className="h-1 w-20 bg-[var(--accent)]" />
          </motion.div>

          <div className="space-y-6">
            {certifications.map((cert, i) => (
              <motion.div 
                key={i}
                className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[var(--accent)]/50 hover:bg-white/[0.07] transition-all"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
              >
                <div className="flex gap-4">
                  <div className="p-3 rounded-xl bg-black/40 border border-white/5 group-hover:scale-110 transition-transform">
                    {cert.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-[var(--accent)] transition-colors">{cert.title}</h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-white/50 font-mono">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {cert.issuer}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {cert.date}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education Side */}
        <div>
          <motion.div 
            className="mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-4xl font-bold tracking-tighter text-white mb-2 uppercase italic">Education</h2>
            <div className="h-1 w-20 bg-[var(--accent-alt)]" />
          </motion.div>

          <div className="space-y-6">
            {education.map((edu, i) => (
              <motion.div 
                key={i}
                className="group p-8 rounded-2xl bg-black/20 border border-white/5 hover:border-[var(--accent-alt)]/50 transition-all relative overflow-hidden"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
              >
                <div className="absolute -right-8 -bottom-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <GraduationCap className="w-40 h-40" />
                </div>
                
                <div className="relative z-10">
                  <div className="inline-flex p-3 rounded-xl bg-white/5 border border-white/5 mb-6">
                    {edu.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{edu.degree}</h3>
                  <p className="text-[var(--accent-alt)] font-medium mb-4">{edu.school}</p>
                  
                  <div className="flex flex-wrap gap-6 text-sm text-white/40 font-mono">
                    <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {edu.period}</span>
                    <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {edu.location}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
