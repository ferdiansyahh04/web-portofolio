import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const StatItem = ({ label, value, suffix, delay }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value);
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[var(--accent)]/30 transition-colors group">
      <div className="text-3xl md:text-5xl font-black text-white group-hover:text-[var(--accent)] transition-colors mb-2">
        {count}{suffix}
      </div>
      <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold">{label}</div>
    </div>
  );
};

export default function Stats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
      <StatItem label="Uptime" value="99" suffix=".9%" delay={0} />
      <StatItem label="Servers Managed" value="50" suffix="+" delay={0.1} />
      <StatItem label="Projects Done" value="12" suffix="+" delay={0.2} />
      <StatItem label="Years Exp" value="3" suffix="+" delay={0.3} />
    </div>
  );
}
