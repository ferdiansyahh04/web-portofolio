import { ReactLenis } from 'lenis/react';

export default function SmoothScroll({ children }) {
  return (
    <ReactLenis root options={{ 
      lerp: 0.08, 
      duration: 1.5, 
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 1,
    }}>
      {children}
    </ReactLenis>
  );
}
