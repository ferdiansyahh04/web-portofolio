import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const BlurText = ({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words', // 'words' or 'letters'
  direction = 'top', // 'top' or 'bottom'
}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  let elements = [];
  if (animateBy === 'words') {
    elements = text.split(' ');
  } else if (animateBy === 'letters') {
    elements = text.split('');
  }

  const defaultVariants = {
    hidden: { filter: 'blur(10px)', opacity: 0, transform: `translate3d(0,${direction === 'top' ? '-' : ''}50px,0)` },
    visible: { filter: 'blur(0px)', opacity: 1, transform: 'translate3d(0,0,0)' },
  };

  return (
    <p ref={ref} className={className}>
      {elements.map((element, index) => (
        <motion.span
          key={index}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={defaultVariants}
          transition={{ delay: index * (delay / 1000) }}
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
        >
          {element === ' ' ? '\u00A0' : element}
          {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
        </motion.span>
      ))}
    </p>
  );
};

export default BlurText;
