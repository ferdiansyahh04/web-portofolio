import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleNetwork() {
  const ref = useRef();
  const count = 500;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 30;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.05;
    
    // Parallax effect
    const x = state.mouse.x * 0.8;
    const y = state.mouse.y * 0.8;
    
    ref.current.position.x += (x - ref.current.position.x) * 0.05;
    ref.current.position.y += (y - ref.current.position.y) * 0.05;
  });

  return (
    <group ref={ref}>
      <Points positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#ccff00" size={0.06} sizeAttenuation={true} depthWrite={false} />
      </Points>
      {/* 3D Wireframe Grid */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -6, 0]}>
        <planeGeometry args={[100, 100, 40, 40]} />
        <meshBasicMaterial color="#00e5ff" wireframe transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

export default function NetworkBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-80">
      <Canvas camera={{ position: [0, 0, 12], fov: 60 }}>
        <color attach="background" args={['#0a0a0a']} />
        <fog attach="fog" args={['#0a0a0a', 8, 25]} />
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
          <ParticleNetwork />
        </Float>
      </Canvas>
    </div>
  );
}
