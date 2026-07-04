import { useLayoutEffect, useRef, DependencyList } from "react";
import gsap from "gsap";

/**
 * Safe GSAP hook that creates a gsap.context(), runs the callback inside it,
 * and automatically reverts all tweens/ScrollTriggers on unmount.
 * This prevents ScrollTrigger leaks during Next.js App Router navigation.
 */
export function useGSAP(
  callback: (context: gsap.Context) => void,
  deps: DependencyList = [],
  scope?: React.RefObject<HTMLElement | null>
) {
  const ctx = useRef<gsap.Context | null>(null);

  useLayoutEffect(() => {
    ctx.current = gsap.context((self) => callback(self), scope?.current ?? undefined);
    return () => {
      ctx.current?.revert();
      ctx.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ctx;
}
