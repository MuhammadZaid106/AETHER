"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { X, Settings } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface MobileMenuProps {
  onClose: () => void;
}

const menuLinks = [
  { label: "Shop All", href: "/shop" },
  { label: "Electronics", href: "/shop/electronics" },
  { label: "Fashion", href: "/shop/fashion" },
  { label: "Beauty", href: "/shop/beauty" },
  { label: "Home & Living", href: "/shop/home-living" },
  { label: "Sports", href: "/shop/sports" },
];

export function MobileMenu({ onClose }: MobileMenuProps) {
  const isReduced = usePrefersReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isReduced ? 0 : 0.08,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.25 },
    },
  } as const;

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 },
    },
    exit: { y: -20, opacity: 0 },
  } as const;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 bg-[var(--ink-900)] text-white z-999 flex flex-col justify-between p-8"
    >
      {/* Top Header Row */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <span className="text-grotesk text-xl font-black uppercase tracking-tight">
          Aether Market
        </span>
        <button
          onClick={onClose}
          className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 transition-colors cursor-pointer"
          aria-label="Close Menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Primary Links */}
      <nav className="flex flex-col gap-6 my-auto">
        {menuLinks.map((link) => (
          <motion.div key={link.label} variants={itemVariants}>
            <Link
              href={link.href}
              onClick={onClose}
              className="text-grotesk text-4xl sm:text-5xl font-black hover:text-[var(--accent-lime)] transition-colors inline-block tracking-tight"
            >
              {link.label}
            </Link>
          </motion.div>
        ))}
      </nav>

      {/* Footer Info */}
      <div className="border-t border-white/10 pt-6 flex flex-col gap-4">
        <Link
          href="/admin/dashboard"
          onClick={onClose}
          className="text-sm font-semibold flex items-center gap-1.5 text-white/70 hover:text-white transition-colors"
        >
          <Settings className="w-4 h-4" />
          Admin panel
        </Link>
        <p className="text-xs text-white/40">
          © 2026 Aether Market. Built for speed and motion.
        </p>
      </div>
    </motion.div>
  );
}
