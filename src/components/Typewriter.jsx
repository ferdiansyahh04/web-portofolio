import { useState, useEffect } from 'react';

export default function Typewriter({ texts, delay = 80, pause = 2500, className = '' }) {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentText.length) {
          setCharIndex(prev => prev + 1);
        } else {
          setTimeout(() => setIsDeleting(true), pause);
        }
      } else {
        if (charIndex > 0) {
          setCharIndex(prev => prev - 1);
        } else {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? delay / 2 : delay);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts, delay, pause]);

  return (
    <span className={className}>
      {texts[textIndex].substring(0, charIndex)}
      <span className="animate-pulse border-r-4 border-[var(--accent)] ml-1 opacity-80 h-full inline-block scale-y-110">&nbsp;</span>
    </span>
  );
}
