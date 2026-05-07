import { Code, User, Mail, ArrowRight } from 'lucide-react';
import BlurText from './components/BlurText';
import ASCIIText from './components/ASCIIText';
import TextPressure from './components/TextPressure';
import NetworkBackground from './components/NetworkBackground';
import CustomCursor from './components/CustomCursor';
import Typewriter from './components/Typewriter';
import MagneticButton from './components/MagneticButton';

function App() {
  const projects = [
    { title: 'Project One', role: 'UI/UX Design', year: '2024' },
    { title: 'Project Two', role: 'Frontend Dev', year: '2025' },
    { title: 'Project Three', role: 'Fullstack', year: '2025' },
  ];

  return (
    <>
      <CustomCursor />
      <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-[var(--accent-alt)] selection:text-white font-sans relative overflow-hidden">
        
        {/* 3D WebGL Background */}
        <NetworkBackground />

        {/* Navigation */}
        <nav className="fixed w-full top-0 z-50 p-6 flex justify-between items-center backdrop-blur-md bg-black/20 border-b border-white/5">
          <div className="relative w-48 h-12 pointer-events-auto cursor-default">
            <TextPressure
              text="PORTFOLIO"
              flex={true}
              alpha={false}
              stroke={false}
              width={true}
              weight={true}
              italic={true}
              textColor="var(--accent)"
              minFontSize={24}
            />
          </div>
          <ul className="flex gap-8 text-sm font-medium opacity-70">
            <li className="hover:opacity-100 hover:text-[var(--accent)] cursor-pointer transition-colors">Work</li>
            <li className="hover:opacity-100 hover:text-[var(--accent)] cursor-pointer transition-colors">About</li>
            <li className="hover:opacity-100 hover:text-[var(--accent)] cursor-pointer transition-colors">Contact</li>
          </ul>
        </nav>

        {/* Hero Section */}
        <section className="h-screen flex flex-col justify-center items-start px-8 md:px-24 relative z-10">
          
          {/* Glassmorphism Card */}
          <div className="backdrop-blur-md bg-black/10 p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden group">
            {/* Subtle glow behind card */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 to-[var(--accent-alt)]/5 pointer-events-none" />
            
            <BlurText
              text="Hi, I'm Rizky Ferdiansyah"
              delay={100}
              animateBy="words"
              direction="bottom"
              className="text-2xl md:text-4xl text-[var(--accent)] font-medium tracking-wide mb-6 drop-shadow-md"
            />
            
            <div className="text-5xl md:text-8xl font-bold tracking-tighter leading-none mb-8 min-h-[3em] md:min-h-[2.5em] max-w-4xl text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-gray-400">
              <Typewriter 
                texts={['Fullstack Developer', 'Network Engineer']} 
                delay={120} 
                pause={2500} 
              />
            </div>
            
            <p className="max-w-xl text-lg opacity-80 font-light mt-4 mb-12 text-[#e2e8f0]">
              Building web apps, automation systems, and infrastructure solutions.
            </p>
            
            <div className="flex gap-6 relative z-20">
              <MagneticButton className="px-8 py-4 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-alt)] text-[#070b19] font-bold rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(204,255,0,0.3)] flex items-center gap-2">
                View Projects <ArrowRight className="w-5 h-5" />
              </MagneticButton>
              <MagneticButton className="px-8 py-4 bg-transparent border border-white/20 font-bold rounded-full hover:bg-white/10 transition-colors">
                Contact Me
              </MagneticButton>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-32 px-8 md:px-24 border-t border-white/5 relative z-10 bg-[var(--bg-primary)]/80 backdrop-blur-xl">
          <h2 className="text-4xl font-bold tracking-tighter mb-16">Selected Works</h2>
          
          <div className="flex flex-col gap-8">
            {projects.map((project, index) => (
              <div key={index} className="group flex justify-between items-center p-8 border border-white/10 rounded-2xl hover:bg-white/5 transition-all cursor-pointer">
                <div>
                  <h3 className="text-3xl font-bold mb-2 group-hover:text-[var(--accent)] transition-colors">{project.title}</h3>
                  <p className="opacity-50">{project.role}</p>
                </div>
                <div className="flex items-center gap-6">
                  <span className="opacity-50">{project.year}</span>
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[var(--accent)] group-hover:border-[var(--accent)] transition-all">
                    <ArrowRight className="w-5 h-5 group-hover:text-black group-hover:-rotate-45 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-8 md:px-24 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 relative z-10 bg-[var(--bg-primary)]/90">
          <div className="text-3xl font-bold tracking-tighter">Let's talk.</div>
          <div className="flex gap-6">
            <MagneticButton className="p-3 bg-white/5 rounded-full hover:bg-[var(--accent)] transition-colors group">
              <Code className="w-5 h-5 group-hover:text-black" />
            </MagneticButton>
            <MagneticButton className="p-3 bg-white/5 rounded-full hover:bg-[var(--accent)] transition-colors group">
              <User className="w-5 h-5 group-hover:text-black" />
            </MagneticButton>
            <MagneticButton className="p-3 bg-white/5 rounded-full hover:bg-[var(--accent)] transition-colors group">
              <Mail className="w-5 h-5 group-hover:text-black" />
            </MagneticButton>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
