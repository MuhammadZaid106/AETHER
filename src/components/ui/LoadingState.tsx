"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface LoadingStateProps {
  className?: string;
  variant?: "fullscreen" | "inline" | "skeleton";
  theme?: "dark" | "light" | "auto";
  text?: string;
}

const TAGLINES = [
  "CONNECTING TO AETHER GATEWAY...",
  "ASSEMBLING HIGH-FIDELITY CANVAS...",
  "SYNCHRONIZING CURATED CATALOG...",
  "OPTIMIZING CINEMATIC ENGINE...",
  "REFRACTING AMBIENT TEXTURES...",
  "PREPARING PREMIUM PRODUCTS..."
];

export function LoadingState({
  className,
  variant = "fullscreen",
  theme = "dark",
  text
}: LoadingStateProps) {
  const [taglineIndex, setTaglineIndex] = useState(0);

  useEffect(() => {
    if (variant !== "fullscreen") return;
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % TAGLINES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [variant]);

  // Styling maps based on theme selection
  const isDark = theme === "dark" || (theme === "auto" && true); // default cinematic is dark
  
  const containerClasses = cn(
    "relative flex flex-col items-center justify-center overflow-hidden transition-colors duration-500",
    variant === "fullscreen" && [
      "fixed inset-0 z-[99999] w-screen h-screen",
      isDark ? "bg-[#14140F] text-white" : "bg-[#F6F5F2] text-[#14140F]"
    ],
    variant === "inline" && [
      "w-full h-full min-h-[300px] rounded-[var(--radius-lg)] border border-[var(--border-hairline)] p-12",
      isDark ? "bg-[#14140F]/95 text-white" : "bg-[#F6F5F2]/80 text-[#14140F]"
    ],
    className
  );

  if (variant === "skeleton") {
    return (
      <div className="w-full space-y-4 p-6 border border-[var(--border-hairline)] rounded-[var(--radius-lg)] bg-[var(--surface-card)]">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[var(--bg-canvas-alt)] animate-[shimmer_1.6s_infinite] relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_1.6s_infinite]" />
          </div>
          <div className="flex-1 space-y-2">
            <div className="h-4 w-1/3 bg-[var(--bg-canvas-alt)] rounded-[var(--radius-md)] relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_1.6s_infinite]" />
            </div>
            <div className="h-3 w-1/2 bg-[var(--bg-canvas-alt)] rounded-[var(--radius-md)] relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_1.6s_infinite]" />
            </div>
          </div>
        </div>
        <div className="space-y-2 pt-2">
          <div className="h-24 w-full bg-[var(--bg-canvas-alt)] rounded-[var(--radius-md)] relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_1.6s_infinite]" />
          </div>
          <div className="h-4 w-full bg-[var(--bg-canvas-alt)] rounded-[var(--radius-md)] relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_1.6s_infinite]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      {/* Noise background grain for cinematic style */}
      {variant === "fullscreen" && (
        <div className="absolute inset-0 pointer-events-none bg-noise opacity-[0.035] mix-blend-overlay" />
      )}

      {/* Main interactive animation bundle */}
      <div className="relative flex flex-col items-center justify-center z-10 gap-8">
        
        {/* Animated Outer Circles & Logo */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          
          {/* Pulsing glow underlay */}
          <motion.div
            className={cn(
              "absolute w-24 h-24 rounded-full blur-2xl opacity-40",
              isDark ? "bg-[var(--accent-lime)]" : "bg-[var(--accent-coral)]"
            )}
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.3, 0.55, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* SVG Rotating Hairline Track */}
          <svg className="absolute w-32 h-32" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="54"
              stroke={isDark ? "rgba(255,255,255,0.06)" : "rgba(20,20,15,0.06)"}
              strokeWidth="1.5"
              fill="none"
            />
            {/* Active Lime trace */}
            <motion.circle
              cx="60"
              cy="60"
              r="54"
              stroke="var(--accent-lime)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0.2, rotate: 0 }}
              animate={{
                pathLength: [0.15, 0.5, 0.15],
                rotate: [0, 360]
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            {/* Active Coral trace running opposite direction */}
            <motion.circle
              cx="60"
              cy="60"
              r="48"
              stroke="var(--accent-coral)"
              strokeWidth="1"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0.1, rotate: 180 }}
              animate={{
                pathLength: [0.1, 0.35, 0.1],
                rotate: [180, -180]
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </svg>

          {/* Logo container with physical breathing spring animation */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 12 }}
            className={cn(
              "w-20 h-20 rounded-full flex items-center justify-center text-grotesk text-3xl font-extrabold tracking-tighter shadow-xl border select-none",
              isDark 
                ? "bg-[#14140F] border-white/10 text-white shadow-black/60" 
                : "bg-white border-[#14140F]/5 text-[#14140F] shadow-black/5"
            )}
          >
            <motion.span
              animate={{
                scale: [0.94, 1.06, 0.94],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Æ
            </motion.span>
          </motion.div>
        </div>

        {/* Text Area */}
        <div className="flex flex-col items-center gap-2 text-center max-w-xs">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-grotesk text-lg font-black uppercase tracking-widest"
          >
            {text || "AETHER MARKET"}
          </motion.h2>

          {/* Tagline Cycler for Fullscreen, or static subtext for Inline */}
          {variant === "fullscreen" ? (
            <div className="h-4 flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={taglineIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 0.5, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="text-[9px] font-bold tracking-[0.25em] font-mono text-center uppercase"
                >
                  {TAGLINES[taglineIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          ) : (
            <span className="text-[10px] opacity-45 tracking-widest font-mono uppercase">
              LOADING COMPONENT
            </span>
          )}
        </div>

        {/* Cinematic Linear Bar Loader */}
        <div className="w-40 h-[2px] bg-border-hairline rounded-full overflow-hidden relative">
          <motion.div
            className={cn(
              "h-full rounded-full absolute top-0 left-0",
              isDark ? "bg-[var(--accent-lime)]" : "bg-[var(--accent-coral)]"
            )}
            initial={{ left: "-100%", width: "40%" }}
            animate={{
              left: ["-100%", "100%"],
              width: ["30%", "60%", "30%"]
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>
      
      {/* Bottom Subtle Brand Detail */}
      {variant === "fullscreen" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute bottom-10 flex flex-col items-center gap-1 select-none"
        >
          <span className="text-[9px] font-black tracking-[0.35em] uppercase">
            AETHER STUDIO CORP
          </span>
          <span className="text-[8px] font-mono opacity-50 tracking-[0.2em]">
            VER. 16.2 · CINEMATIC E-COMMERCE
          </span>
        </motion.div>
      )}
    </div>
  );
}
