import { useState, useEffect } from 'react';
import { ArrowRight, Download } from 'lucide-react';
import BlurText from './components/BlurText';
import TextPressure from './components/TextPressure';
import NetworkBackground from './components/NetworkBackground';
import CustomCursor from './components/CustomCursor';
import Typewriter from './components/Typewriter';
import MagneticButton from './components/MagneticButton';
import BentoGrid from './components/BentoGrid';
import ProjectReveal from './components/ProjectReveal';
import ExperienceTimeline from './components/ExperienceTimeline';
import Certifications from './components/Certifications';
import Preloader from './components/Preloader';
import Stats from './components/Stats';

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <Preloader onComplete={() => setIsLoading(false)} />
      
      {!isLoading && (
        <div className="min-h-screen bg-[#0a0a0a] text-[#fafafa] selection:bg-[#00e5ff] selection:text-black font-sans relative overflow-hidden">
      <CustomCursor />
      
      {/* 3D WebGL Background */}
      <NetworkBackground />

      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 p-4 md:p-6 flex justify-between items-center backdrop-blur-md bg-black/20 border-b border-white/5">
        <div 
          className="relative w-32 md:w-48 h-8 md:h-12 pointer-events-auto cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <TextPressure
            text="PORTFOLIO"
            flex={true}
            alpha={false}
            stroke={false}
            width={true}
            weight={true}
            italic={true}
            textColor="#ccff00"
            minFontSize={18}
          />
        </div>
        <ul className="flex gap-4 md:gap-8 text-[10px] md:text-sm font-medium opacity-70">
          <li 
            className="hover:opacity-100 hover:text-[#ccff00] cursor-pointer transition-colors uppercase tracking-widest"
            onClick={() => scrollToSection('projects')}
          >
            Work
          </li>
          <li 
            className="hover:opacity-100 hover:text-[#ccff00] cursor-pointer transition-colors uppercase tracking-widest"
            onClick={() => scrollToSection('about')}
          >
            About
          </li>
          <li 
            className="hover:opacity-100 hover:text-[#ccff00] cursor-pointer transition-colors uppercase tracking-widest"
            onClick={() => scrollToSection('contact')}
          >
            Contact
          </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex flex-col justify-center items-start px-6 md:px-24 py-24 relative z-10">
        <div className="backdrop-blur-md bg-black/10 p-6 md:p-12 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden group w-full max-w-5xl">
          <div className="absolute inset-0 bg-gradient-to-br from-[#ccff00]/5 to-[#00e5ff]/5 pointer-events-none" />
          
          <BlurText
            text="Hi, I'm Rizky Ferdiansyah"
            delay={100}
            animateBy="words"
            direction="bottom"
            className="text-xl md:text-4xl text-[#ccff00] font-medium tracking-wide mb-4 md:mb-6 drop-shadow-md"
          />
          
          <div className="text-3xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight mb-6 md:mb-8 min-h-[4em] md:min-h-[3em] text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">
            <Typewriter 
              texts={['System & Network Administrator', 'Software Engineering Enthusiast']} 
              delay={80} 
              pause={3000} 
            />
          </div>
          
          <p className="max-w-xl text-base md:text-lg opacity-80 font-light mt-4 mb-10 md:mb-12 text-[#e2e8f0]">
            Building robust infrastructure systems, automation solutions, and interactive web experiences.
          </p>
          
          <div className="flex flex-wrap gap-3 md:gap-6 relative z-20">
            <MagneticButton 
              className="px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-[#ccff00] to-[#00e5ff] text-[#0a0a0a] font-bold rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(204,255,0,0.3)] flex items-center gap-2 text-sm md:text-base"
              onClick={() => scrollToSection('projects')}
            >
              View Projects <ArrowRight className="w-4 md:w-5 h-4 md:h-5" />
            </MagneticButton>
            <MagneticButton 
              className="px-6 md:px-8 py-3 md:py-4 bg-transparent border border-white/20 font-bold rounded-full hover:bg-white/10 transition-colors text-white text-sm md:text-base"
              onClick={() => scrollToSection('contact')}
            >
              Contact
            </MagneticButton>
            <MagneticButton 
              className="px-6 md:px-8 py-3 md:py-4 bg-white/5 border border-[#ccff00]/30 font-bold rounded-full hover:bg-[#ccff00]/10 transition-colors text-[#ccff00] flex items-center gap-2 text-sm md:text-base"
              onClick={() => {
                alert('CV belum tersedia. Silakan tambahkan file CV ke folder public/cv.pdf');
              }}
            >
              <Download className="w-4 md:w-5 h-4 md:h-5" /> CV
            </MagneticButton>
          </div>
        </div>
      </section>

        <div className="px-8 md:px-24 max-w-7xl mx-auto -mt-12 mb-24 relative z-20">
          <Stats />
        </div>

        {/* The Hybrid Engineer (Bento Grid) */}
        <BentoGrid />

      {/* Selected Works (Interactive Image Reveal) */}
      <ProjectReveal />

      {/* Experience Timeline */}
      <ExperienceTimeline />

      {/* Certifications & Education */}
      <Certifications />

      {/* The Grand Footer / Contact */}
      <footer id="contact" className="h-[80vh] flex flex-col justify-end px-8 md:px-24 pb-16 border-t border-white/5 relative z-10 bg-[#0a0a0a]/80 backdrop-blur-xl">
        <div className="flex justify-between items-end w-full">
          <div className="w-full">
            <p className="text-[#00e5ff] font-mono mb-4 text-xl">Let's build something epic.</p>
            <a 
              href="mailto:rizkyferdiansyah04@gmail.com"
              className="block text-[12vw] leading-[0.8] font-black tracking-tighter text-white hover:text-[#ccff00] transition-colors duration-500 cursor-pointer mb-8 no-underline"
            >
              LET'S TALK.
            </a>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-8 border-t border-white/10 w-full gap-8">
          <div className="text-white/50 font-mono text-sm">
            &copy; 2026 Rizky Ferdiansyah.
          </div>
          <div className="flex flex-wrap gap-4 md:gap-6">
            <a href="https://github.com/ferdiansyahh04" target="_blank" rel="noopener noreferrer">
              <MagneticButton className="px-6 py-3 bg-white/5 rounded-full hover:bg-[#ccff00] hover:text-black transition-colors font-bold text-sm md:text-base text-white">
                GitHub
              </MagneticButton>
            </a>
            <a href="https://linkedin.com/in/rizkyferdiansyah" target="_blank" rel="noopener noreferrer">
              <MagneticButton className="px-6 py-3 bg-white/5 rounded-full hover:bg-[#ccff00] hover:text-black transition-colors font-bold text-sm md:text-base text-white">
                LinkedIn
              </MagneticButton>
            </a>
            <a href="mailto:rizkyferdiansyah04@gmail.com">
              <MagneticButton className="px-6 py-3 bg-[#ccff00] text-black rounded-full hover:bg-white transition-colors font-bold text-sm md:text-base">
                Email Me
              </MagneticButton>
            </a>
          </div>
        </div>
        </footer>
      </div>
      )}
    </>
  );
}

export default App;
