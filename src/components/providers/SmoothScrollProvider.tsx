"use client";

import { createContext, useCallback, useContext } from "react";
import { useLenis } from "@/hooks/useLenis";
import Lenis from "lenis";
import { scrollToElement, scrollWindowToTop } from "@/lib/utils/scroll";

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

export function useScrollTo() {
  const lenisRef = useSmoothScroll();

  const scrollToTop = useCallback(
    (options?: { smooth?: boolean }) => {
      scrollWindowToTop(lenisRef.current, options);
    },
    [lenisRef]
  );

  const scrollTo = useCallback(
    (target: HTMLElement | null, options?: { smooth?: boolean; offset?: number }) => {
      if (!target) return;
      scrollToElement(target, lenisRef.current, options);
    },
    [lenisRef]
  );

  return { scrollToTop, scrollTo };
}
