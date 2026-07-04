"use client";

import { createContext, useContext } from "react";
import { useLenis } from "@/hooks/useLenis";
import Lenis from "lenis";

const SmoothScrollContext = createContext<React.MutableRefObject<Lenis | null> | null>(null);

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useLenis();

  return (
    <SmoothScrollContext.Provider value={lenisRef}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

export function useSmoothScroll() {
  const context = useContext(SmoothScrollContext);
  if (!context) {
    throw new Error("useSmoothScroll must be used within a SmoothScrollProvider");
  }
  return context;
}
