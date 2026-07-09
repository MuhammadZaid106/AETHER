"use client";

import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSmoothScroll } from "./SmoothScrollProvider";
import { scrollAdminMainToTop, scrollWindowToTop } from "@/lib/utils/scroll";

/**
 * Resets scroll position on every client-side route change.
 * Lenis owns window scroll, so Next.js default restoration does not apply.
 */
export function ScrollToTop() {
  const pathname = usePathname();
  const lenisRef = useSmoothScroll();
  const isFirstMount = useRef(true);

  useLayoutEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    if (pathname.startsWith("/admin")) {
      scrollAdminMainToTop();
      return;
    }

    scrollWindowToTop(lenisRef.current);

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  }, [pathname, lenisRef]);

  return null;
}
