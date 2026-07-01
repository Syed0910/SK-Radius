import React from 'react';
import { Canvas } from '@react-three/fiber';
import NetworkScene from './NetworkScene';
import { useIsLowPower } from '../hooks/useIsLowPower';

export default function NetworkCanvas({ className = 'absolute inset-0 z-0 opacity-70' }) {
  const isLowPower = useIsLowPower();

  // On mobile / reduced-motion / low-end devices, skip the WebGL canvas entirely
  // — GradientMesh + GridOverlay (CSS-only) carry the visual weight instead.
  if (isLowPower) return null;

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <NetworkScene />
      </Canvas>
    </div>
  );
}