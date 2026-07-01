import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const ParticleField = () => {
  const groupRef = useRef();
  const starsRef = useRef();
  const dustRef = useRef();

  const { posStars, posDust } = useMemo(() => {
    // Calculate sweeping DNA/galaxy helix strands
    const count = 4000;
    const posStars = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const t = (Math.random() - 0.5) * 60; // Length of the helix strand
      const strand = Math.random() > 0.5 ? 0 : Math.PI; // Two distinct strands
      const radius = 1.2; // TIGHTER BAND (constrained horizontally)
      const randomScatter = () => (Math.random() + Math.random() + Math.random() - 1.5);

      posStars[i * 3] = t + randomScatter() * 1.5; // X axis spread
      posStars[i * 3 + 1] = Math.cos(t * 0.8 + strand) * radius + randomScatter() * 0.4; // Tight Y wave
      posStars[i * 3 + 2] = Math.sin(t * 0.8 + strand) * radius + randomScatter() * 0.4; // Tight Z wave
    }

    const countDust = 800;
    const posDust = new Float32Array(countDust * 3);
    for (let i = 0; i < countDust; i++) {
      const t = (Math.random() - 0.5) * 60;
      const strand = Math.random() > 0.5 ? 0 : Math.PI;
      const radius = 1.2;
      const randomScatter = () => (Math.random() + Math.random() + Math.random() - 1.5);

      posDust[i * 3] = t + randomScatter() * 3; 
      posDust[i * 3 + 1] = Math.cos(t * 0.8 + strand) * radius + randomScatter() * 1.0;
      posDust[i * 3 + 2] = Math.sin(t * 0.8 + strand) * radius + randomScatter() * 1.0;
    }

    return { posStars, posDust };
  }, []);

  useFrame((state, delta) => {
    // Spin the DNA structure locally along its length VERY slightly/slowly
    if (starsRef.current && dustRef.current) {
      starsRef.current.rotation.x -= delta * 0.03;
      dustRef.current.rotation.x -= delta * 0.03;
    }

    // Mouse parallax applied to the global group (reduced to very slight motion)
    if (groupRef.current) {
      const targetX = (state.pointer.y * Math.PI) / 20;
      const targetY = (state.pointer.x * Math.PI) / 20;
      groupRef.current.rotation.x += 0.01 * (targetX - groupRef.current.rotation.x);
      groupRef.current.rotation.y += 0.01 * ((targetY - Math.PI / 12) - groupRef.current.rotation.y);
    }
  });

  // Use horizontal rotation (Z=0) so it perfectly spans the middle of the screen
  return React.createElement('group', { ref: groupRef, rotation: [0, -Math.PI / 12, 0] },
    React.createElement('points', { ref: starsRef, frustumCulled: false },
      React.createElement('bufferGeometry', null,
        React.createElement('bufferAttribute', {
          attach: 'attributes-position',
          count: posStars.length / 3,
          array: posStars,
          itemSize: 3
        })
      ),
      React.createElement(PointMaterial, {
        transparent: true,
        color: '#ffffff',
        size: 0.05, 
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        opacity: 0.9
      })
    ),
    React.createElement('points', { ref: dustRef, frustumCulled: false },
      React.createElement('bufferGeometry', null,
        React.createElement('bufferAttribute', {
          attach: 'attributes-position',
          count: posDust.length / 3,
          array: posDust,
          itemSize: 3
        })
      ),
      React.createElement(PointMaterial, {
        transparent: true,
        color: '#ffcca8',
        size: 0.4,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        opacity: 0.3
      })
    )
  );
};

export default function ParticleBackground() {
  return (
    <div className="absolute inset-0 w-full h-full bg-[#030303] overflow-hidden pointer-events-none z-0">
      {/* Gradients to seamlessly blend the Canvas into the dark page background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#161719]/50 to-[#161719] z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#fa6e43]/5 to-[#fa6e43]/10 z-10 pointer-events-none mix-blend-screen" />

      <div className="w-full h-full">
        <Canvas
          camera={{ position: [0, 0, 12], fov: 60 }}
          eventSource={document.getElementById('root')}
          eventPrefix="client"
        >
          {/* Pushed fog far back to ensure particles don't get completely hidden in the darkness */}
          {React.createElement('fog', { attach: 'fog', args: ['#030303', 10, 35] })}
          <ParticleField />
        </Canvas>
      </div>
    </div>
  );
}
