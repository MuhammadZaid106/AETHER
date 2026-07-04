"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Returns true once, when the element enters the viewport.
 * After that, it stays true even if the element scrolls out.
 * Use for entrance animations that should only fire once.
 */
export function useInViewOnce(threshold = 0.15): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}
