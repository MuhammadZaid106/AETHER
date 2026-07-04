"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CounterProps {
  value: number;
  duration?: number; // In seconds
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export function Counter({
  value,
  duration = 1.8,
  prefix = "",
  suffix = "",
  decimals = 0,
}: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const durationMs = duration * 1000;
    const startTime = performance.now();

    const updateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / durationMs, 1);

      // Ease out quad
      const easedProgress = progress * (2 - progress);
      const currentVal = start + (end - start) * easedProgress;

      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  }, [value, duration, isInView]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}
