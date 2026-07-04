"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [percent, setPercent] = useState(0);
  const [exiting, setExiting] = useState(false);
  const isReduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();
  const hasStarted = useRef(false);

  useEffect(() => {
    // Skip preloader for reduced motion or return visits
    if (isReduced) {
      setLoading(false);
      return;
    }

    const hasLoaded = sessionStorage.getItem("aether-preloader-shown");
    if (hasLoaded) {
      setLoading(false);
      return;
    }

    if (hasStarted.current) return;
    hasStarted.current = true;

    // Guaranteed count: always goes 0 → 100 in ~3 seconds
    // Step size: 1-3 every 35ms → ~1.5s to 3.5s total, feels organic
    let current = 0;

    const tick = () => {
      const remaining = 100 - current;
      // Slow near the end for dramatic effect
      const step = remaining > 20
        ? Math.floor(Math.random() * 3) + 1
        : 1;

      current = Math.min(current + step, 100);
      setPercent(current);

      if (current < 100) {
        setTimeout(tick, remaining > 20 ? 40 : 70);
      } else {
        // At 100% — hold for 600ms then begin exit wipe
        setTimeout(() => {
          setExiting(true);
          // After the wipe animation finishes (1.4s), unmount
          setTimeout(() => {
            setLoading(false);
            sessionStorage.setItem("aether-preloader-shown", "true");
          }, 1450);
        }, 600);
      }
    };

    // Small initial delay so the "0%" is visible for a moment
    setTimeout(tick, 150);
  }, [isReduced]);

  return (
    <>
      {/* Scroll Progress Bar — shown only when main content is visible */}
      {!loading && (
        <motion.div
          className="fixed top-0 left-0 right-0 h-[3px] bg-[var(--accent-lime)] z-[9999] origin-left pointer-events-none"
          style={{ scaleX: scrollYProgress }}
        />
      )}

      <AnimatePresence>
        {loading && !isReduced && (
          <motion.div
            key="preloader"
            className="fixed inset-0 bg-[var(--ink-900)] z-[99999] flex flex-col items-center justify-center text-white overflow-hidden"
            animate={exiting ? {
              clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
            } : {
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            }}
            transition={exiting ? {
              duration: 1.4,
              ease: [0.76, 0, 0.24, 1],
            } : {
              duration: 0,
            }}
          >
            {/* Center content */}
            <div className="flex flex-col items-center gap-6 px-8 w-full max-w-sm">
              {/* Logo mark */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
                className="w-20 h-20 rounded-full border-2 border-white/20 flex items-center justify-center text-grotesk text-4xl font-extrabold tracking-tighter"
              >
                Æ
              </motion.div>

              {/* Brand name */}
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-grotesk text-2xl font-black tracking-tight uppercase"
              >
                Aether Market
              </motion.h1>

              {/* Progress bar track */}
              <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[var(--accent-lime)] rounded-full origin-left"
                  style={{ scaleX: percent / 100, transformOrigin: "left" }}
                  transition={{ duration: 0.1, ease: "linear" }}
                />
              </div>

              {/* Percentage counter */}
              <motion.div
                className="font-mono text-sm tracking-[0.25em] text-white/50 tabular-nums"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {String(percent).padStart(3, "\u2007")}%
              </motion.div>
            </div>

            {/* Bottom tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="absolute bottom-10 text-[10px] font-black tracking-[0.3em] uppercase text-white/30"
            >
              All Categories · 2,400+ Brands
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <main>{children}</main>
    </>
  );
}
