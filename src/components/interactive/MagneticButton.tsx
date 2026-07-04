"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface MagneticProps {
  children: React.ReactNode;
  range?: number;
}

export function MagneticButton({ children, range = 45 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const isReduced = usePrefersReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.6 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    if (isReduced) return;

    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = el.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      // Calculate distance between cursor and element center
      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;
      const distance = Math.hypot(distanceX, distanceY);

      if (distance < range) {
        setActive(true);
        // Pull towards cursor with spring ratio limit
        x.set(distanceX * 0.35);
        y.set(distanceY * 0.35);
      } else {
        setActive(false);
        x.set(0);
        y.set(0);
      }
    };

    const handleMouseLeave = () => {
      setActive(false);
      x.set(0);
      y.set(0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [range, x, y, isReduced]);

  if (isReduced) return <div ref={ref}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      style={{
        x: springX,
        y: springY,
      }}
      animate={{
        scale: active ? 1.05 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}
