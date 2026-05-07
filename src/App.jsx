import { Code, User, Mail, ArrowRight } from 'lucide-react';
import BlurText from './components/BlurText';
import TextPressure from './components/TextPressure';
import NetworkBackground from './components/NetworkBackground';
import CustomCursor from './components/CustomCursor';
import Typewriter from './components/Typewriter';
import MagneticButton from './components/MagneticButton';
import BentoGrid from './components/BentoGrid';
import ProjectReveal from './components/ProjectReveal';
import ExperienceTimeline from './components/ExperienceTimeline';

// Kita hilangkan SmoothScroll sementara untuk memastikan tidak ada error library
function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#fafafa] selection:bg-[#00e5ff] selection:text-black font-sans relative overflow-hidden">
      <CustomCursor />
      
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
            textColor="#ccff00"
            minFontSize={24}
          />
        </div>
        <ul className="flex gap-8 text-sm font-medium opacity-70">
          <li className="hover:opacity-100 hover:text-[#ccff00] cursor-pointer transition-colors">Work</li>
          <li className="hover:opacity-100 hover:text-[#ccff00] cursor-pointer transition-colors">About</li>
          <li className="hover:opacity-100 hover:text-[#ccff00] cursor-pointer transition-colors">Contact</li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-center items-start px-8 md:px-24 relative z-10">
        <div className="backdrop-blur-md bg-black/10 p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-[#ccff00]/5 to-[#00e5ff]/5 pointer-events-none" />
          
          <BlurText
            text="Hi, I'm Rizky Ferdiansyah"
            delay={100}
            animateBy="words"
            direction="bottom"
            className="text-2xl md:text-4xl text-[#ccff00] font-medium tracking-wide mb-6 drop-shadow-md"
          />
          
          <div className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight mb-8 min-h-[3em] max-w-4xl text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">
            <Typewriter 
              texts={['System & Network Administrator', 'Software Engineering Enthusiast']} 
              delay={100} 
              pause={3000} 
            />
          </div>
          
          <p className="max-w-xl text-lg opacity-80 font-light mt-4 mb-12 text-[#e2e8f0]">
            Building robust infrastructure systems, automation solutions, and interactive web experiences.
          </p>
          
          <div className="flex gap-6 relative z-20">
            <MagneticButton className="px-8 py-4 bg-gradient-to-r from-[#ccff00] to-[#00e5ff] text-[#0a0a0a] font-bold rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(204,255,0,0.3)] flex items-center gap-2">
              View Projects <ArrowRight className="w-5 h-5" />
            </MagneticButton>
            <MagneticButton className="px-8 py-4 bg-transparent border border-white/20 font-bold rounded-full hover:bg-white/10 transition-colors text-white">
              Contact Me
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* The Hybrid Engineer (Bento Grid) */}
      <BentoGrid />

      {/* Selected Works (Interactive Image Reveal) */}
      <ProjectReveal />

      {/* Experience Timeline */}
      <ExperienceTimeline />

      {/* The Grand Footer */}
      <footer className="h-[80vh] flex flex-col justify-end px-8 md:px-24 pb-16 border-t border-white/5 relative z-10 bg-[#0a0a0a]/80 backdrop-blur-xl">
        <div className="flex justify-between items-end w-full">
          <div className="w-full">
            <p className="text-[#00e5ff] font-mono mb-4 text-xl">Let's build something epic.</p>
            <h2 className="text-[12vw] leading-[0.8] font-black tracking-tighter text-white hover:text-[#ccff00] transition-colors duration-500 cursor-pointer mb-8">
              LET'S TALK.
            </h2>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-8 border-t border-white/10 w-full gap-8">
          <div className="text-white/50 font-mono text-sm">
            &copy; 2026 Rizky Ferdiansyah.
          </div>
          <div className="flex flex-wrap gap-4 md:gap-6">
            <MagneticButton className="px-6 py-3 bg-white/5 rounded-full hover:bg-[#ccff00] hover:text-black transition-colors font-bold text-sm md:text-base text-white">
              GitHub
            </MagneticButton>
            <MagneticButton className="px-6 py-3 bg-white/5 rounded-full hover:bg-[#ccff00] hover:text-black transition-colors font-bold text-sm md:text-base text-white">
              LinkedIn
            </MagneticButton>
            <MagneticButton className="px-6 py-3 bg-[#ccff00] text-black rounded-full hover:bg-white transition-colors font-bold text-sm md:text-base">
              Email Me
            </MagneticButton>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
