"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [hoverType, setHoverType] = useState<null | "view" | "drag">(null);
  const isReduced = usePrefersReducedMotion();

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Disable on mobile/touch screens
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch || isReduced) return;

    setMounted(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const viewAttr = target.closest('[data-cursor="view"]');
      const dragAttr = target.closest('[data-cursor="drag"]');

      if (viewAttr) {
        setHoverType("view");
      } else if (dragAttr) {
        setHoverType("drag");
      } else {
        setHoverType(null);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY, isReduced]);

  if (!mounted || isReduced) return null;

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[var(--ink-900)] pointer-events-none z-9999 -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: hoverType ? 1.8 : 1,
          backgroundColor: hoverType ? "rgba(20,20,15,0.05)" : "rgba(20,20,15,0)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
      {/* Tiny Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[var(--ink-900)] pointer-events-none z-9999 -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: hoverType ? 0 : 1,
        }}
      />
      {/* Overlay label */}
      <AnimatePresence>
        {hoverType && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed top-0 left-0 pointer-events-none z-9999 text-[10px] font-bold tracking-widest text-white uppercase bg-[var(--ink-900)] px-2 py-1 rounded-[4px] -translate-x-1/2 translate-y-6"
            style={{
              x: cursorXSpring,
              y: cursorYSpring,
            }}
          >
            {hoverType}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
