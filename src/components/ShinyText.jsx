import { motion } from 'framer-motion';

export default function ShinyText({ text, disabled = false, speed = 3, className = '' }) {
  const animationProps = {
    initial: { backgroundPosition: '200% center' },
    animate: { backgroundPosition: '-200% center' },
    transition: {
      repeat: Infinity,
      duration: speed,
      ease: 'linear',
    },
  };

  return (
    <motion.div
      className={`inline-block font-bold uppercase tracking-widest ${className}`}
      style={{
        backgroundImage: 'linear-gradient(120deg, var(--accent) 40%, #ffffff 50%, var(--accent) 60%)',
        backgroundSize: '200% auto',
        color: 'transparent',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
      }}
      {...(!disabled && animationProps)}
    >
      {text}
    </motion.div>
  );
}
