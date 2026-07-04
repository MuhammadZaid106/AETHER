"use client";

import { useEffect, useState } from "react";

/**
 * Detects the user's prefers-reduced-motion media query preference.
 * All animated components must branch on this hook to skip animations
 * when the user has requested reduced motion.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);

    const listener = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);

  return reduced;
}
