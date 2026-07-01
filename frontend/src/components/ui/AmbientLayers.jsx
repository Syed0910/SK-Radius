import React from 'react';

export function GradientMesh() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute top-[-10%] left-[10%] w-[40rem] h-[40rem] bg-primary rounded-full mix-blend-screen filter blur-[140px] opacity-20 animate-blob" />
      <div className="absolute bottom-[-10%] right-[5%] w-[35rem] h-[35rem] bg-[hsl(var(--primary-light))] rounded-full mix-blend-screen filter blur-[140px] opacity-15 animate-blob animation-delay-2000" />
      <div className="absolute top-[30%] right-[30%] w-[25rem] h-[25rem] bg-primary rounded-full mix-blend-screen filter blur-[120px] opacity-10 animate-blob animation-delay-4000" />
    </div>
  );
}
export function NoiseOverlay() {
  return (
    <div
      className="fixed inset-0 z-50 pointer-events-none opacity-[0.035] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}

export function GridOverlay() {
  return (
    <div
      className="absolute inset-0 z-0 opacity-[0.07]"
      style={{
        backgroundImage:
          'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
        backgroundSize: '64px 64px',
        maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)',
      }}
    />
  );
}