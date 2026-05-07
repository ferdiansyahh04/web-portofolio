import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const messages = [
  "Initializing BIOS...",
  "Loading kernel modules...",
  "Checking storage partition /dev/sda1...",
  "Mounting network drives...",
  "Establishing secure SSH handshake...",
  "Starting Rizky's Portfolio services...",
  "Ready."
];

export default function Preloader({ onComplete }) {
  const [currentLine, setCurrentLine] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (currentLine < messages.length) {
      const timeout = setTimeout(() => {
        setCurrentLine(prev => prev + 1);
      }, Math.random() * 300 + 200); // Random delay for realism
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onComplete, 500); // Small buffer before showing main content
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [currentLine, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col items-center justify-center font-mono p-8 text-sm md:text-base"
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="max-w-2xl w-full">
            <div className="flex gap-2 mb-8">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            
            <div className="space-y-2">
              {messages.slice(0, currentLine + 1).map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex gap-4 items-start"
                >
                  <span className="text-[#ccff00] shrink-0">[OK]</span>
                  <span className={i === currentLine ? "text-white animate-pulse" : "text-white/60"}>
                    {msg}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#ccff00] to-[#00e5ff]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.5, ease: "linear" }}
              />
            </div>
          </div>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/20 text-xs tracking-widest uppercase">
            System Boot Sequence v2.4.0
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
