import { useState, useEffect } from 'react';

export function useIsLowPower() {
  const [isLowPower, setIsLowPower] = useState(false);

  useEffect(() => {
    const check = () => {
      const isMobile = window.innerWidth < 768;
      const isSlowGPU = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setIsLowPower(reducedMotion);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return isLowPower;
}