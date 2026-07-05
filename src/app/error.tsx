"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { RotateCcw, ArrowLeft, Home } from "lucide-react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log error in development only
    if (process.env.NODE_ENV === "development") {
      console.error("[ErrorBoundary]", error);
    }
  }, [error]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: "easeOut" as const },
    },
  };

  return (
    <div className="relative min-h-screen bg-[var(--bg-canvas)] overflow-hidden flex flex-col items-center justify-center px-6 py-24">
      {/* Background noise texture */}
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />

      {/* Coral glowing blob */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[var(--accent-coral)] blur-[100px] pointer-events-none"
      />

      {/* Giant background text */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        aria-hidden
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden"
      >
        <span
          className="text-grotesk font-black leading-none tracking-tighter text-[clamp(160px,25vw,340px)]"
          style={{
            color: "transparent",
            WebkitTextStroke: "1.5px rgba(20,20,15,0.06)",
          }}
        >
          ERROR
        </span>
      </motion.div>

      {/* Main content card */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center max-w-lg gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Status badge */}
        <motion.div variants={itemVariants}>
          <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.22em] border border-[var(--border-hairline)] px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm text-[var(--ink-600)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-coral)] animate-pulse" />
            System Error — Something Went Wrong
          </span>
        </motion.div>

        {/* Heading */}
        <motion.div variants={itemVariants} className="flex flex-col gap-3">
          <h1 className="text-grotesk text-[clamp(42px,7vw,72px)] font-black uppercase tracking-tight leading-none text-[var(--ink-900)]">
            SIGNAL
            <br />
            <span className="text-outline">DISRUPTED.</span>
          </h1>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-sm text-[var(--ink-600)] max-w-sm leading-relaxed"
        >
          An unexpected system fault occurred. Our team has been notified. You
          can try reloading the page — it usually resolves itself.
        </motion.p>

        {/* Error digest (dev/prod) */}
        {error.digest && (
          <motion.div
            variants={itemVariants}
            className="text-[10px] font-mono text-[var(--ink-300)] bg-[var(--bg-canvas-alt)] border border-[var(--border-hairline)] px-4 py-2.5 rounded-[var(--radius-md)] w-full max-w-xs text-center tracking-wider"
          >
            Error ID: {error.digest}
          </motion.div>
        )}

        {/* Action buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
        >
          <button
            onClick={reset}
            className="group flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-[var(--radius-md)] text-xs font-black uppercase tracking-widest bg-[var(--ink-900)] text-white hover:bg-[var(--ink-600)] transition-all duration-300"
          >
            <RotateCcw className="w-4 h-4 transition-transform duration-500 group-hover:rotate-180" />
            Try Again
          </button>

          <Link
            href="/"
            className="group flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-[var(--radius-md)] text-xs font-black uppercase tracking-widest bg-white border border-[var(--border-hairline)] text-[var(--ink-900)] hover:bg-[var(--bg-canvas-alt)] transition-all duration-300"
          >
            <Home className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
            Go Home
          </Link>
        </motion.div>

        {/* Go back link */}
        <motion.button
          variants={itemVariants}
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-xs text-[var(--ink-600)] hover:text-[var(--ink-900)] transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
          Go back to previous page
        </motion.button>
      </motion.div>

      {/* Decorative bottom strip */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden border-t border-[var(--border-hairline)] py-4 bg-white/50 backdrop-blur-sm">
        <div className="flex gap-8 animate-marquee hover-pause-marquee whitespace-nowrap">
          {Array(8)
            .fill(["SYSTEM ERROR", "PLEASE RETRY", "AETHER MARKET", "DISRUPTED SIGNAL", "RECONNECTING"])
            .flat()
            .map((text, i) => (
              <span
                key={i}
                className="text-[10px] font-black uppercase tracking-[0.25em] text-[var(--ink-300)] shrink-0"
              >
                {text} <span className="text-[var(--accent-coral)] mx-2">·</span>
              </span>
            ))}
        </div>
      </div>
    </div>
  );
}
