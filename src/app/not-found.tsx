"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Search, Home, ShoppingBag } from "lucide-react";

export default function NotFoundPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  useEffect(() => {
    document.title = "404 — Page Not Found | Aether Market";
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" as const },
    },
  };

  const links = [
    { icon: Home, label: "Return Home", href: "/" },
    { icon: ShoppingBag, label: "Browse Shop", href: "/shop" },
    { icon: Search, label: "Search Products", href: "/?search=true" },
  ];

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-[var(--bg-canvas)] overflow-hidden flex flex-col items-center justify-center px-6 py-24"
    >
      {/* Background noise texture */}
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />

      {/* Animated floating 404 text in background */}
      <motion.div
        style={{ y: yParallax }}
        aria-hidden
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden"
      >
        <span
          className="text-grotesk font-black leading-none tracking-tighter text-[clamp(180px,28vw,380px)]"
          style={{
            color: "transparent",
            WebkitTextStroke: "1.5px rgba(20,20,15,0.06)",
          }}
        >
          404
        </span>
      </motion.div>

      {/* Animated lime accent blob */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.12 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[var(--accent-lime)] blur-[120px] pointer-events-none"
      />

      {/* Main content */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center max-w-xl gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Status badge */}
        <motion.div variants={itemVariants}>
          <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.22em] border border-[var(--border-hairline)] px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm text-[var(--ink-600)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-coral)] animate-pulse" />
            Error 404 — Not Found
          </span>
        </motion.div>

        {/* Heading */}
        <motion.div variants={itemVariants} className="flex flex-col gap-3">
          <h1 className="text-grotesk text-[clamp(48px,8vw,80px)] font-black uppercase tracking-tight leading-none text-[var(--ink-900)]">
            LOST IN THE
            <br />
            <span className="text-outline">AETHER.</span>
          </h1>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-sm text-[var(--ink-600)] max-w-sm leading-relaxed"
        >
          The page you're looking for has drifted beyond our catalog. It may
          have been moved, removed, or never existed in this dimension.
        </motion.p>

        {/* Action links */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
        >
          {links.map(({ icon: Icon, label, href }, i) => (
            <Link
              key={href}
              href={href}
              className={`group flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-[var(--radius-md)] text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                i === 0
                  ? "bg-[var(--ink-900)] text-white hover:bg-[var(--ink-600)]"
                  : "bg-white border border-[var(--border-hairline)] text-[var(--ink-900)] hover:bg-[var(--bg-canvas-alt)] hover:border-[var(--ink-300)]"
              }`}
            >
              <Icon className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
              {label}
            </Link>
          ))}
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

      {/* Decorative bottom marquee */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden border-t border-[var(--border-hairline)] py-4 bg-white/50 backdrop-blur-sm">
        <div className="flex gap-8 animate-marquee hover-pause-marquee whitespace-nowrap">
          {Array(8)
            .fill(["404", "NOT FOUND", "LOST PAGE", "AETHER MARKET", "EXPLORE MORE"])
            .flat()
            .map((text, i) => (
              <span
                key={i}
                className="text-[10px] font-black uppercase tracking-[0.25em] text-[var(--ink-300)] shrink-0"
              >
                {text} <span className="text-[var(--accent-lime)] mx-2">·</span>
              </span>
            ))}
        </div>
      </div>
    </div>
  );
}
