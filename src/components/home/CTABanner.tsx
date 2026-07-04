"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MagneticButton } from "../interactive/MagneticButton";
import { ArrowRight, Globe } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function CTABanner() {
  const isReduced = usePrefersReducedMotion();

  return (
    <section className="relative py-28 bg-[var(--ink-900)] text-white overflow-hidden border-b border-black">
      {/* Abstract background graphics */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-[20%] right-[10%] w-[350px] h-[350px] rounded-full border border-white/10 animate-spin-slow" />
        <div className="absolute bottom-[10%] left-[5%] w-[450px] h-[450px] rounded-full border border-white/5" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center text-center gap-8">
        <Globe className="w-10 h-10 text-[var(--accent-lime)] animate-pulse" />

        <span className="text-xs font-black tracking-widest text-[var(--ink-300)] uppercase">
          E-Commerce Reimagined
        </span>

        <h2 className="text-grotesk text-5xl sm:text-7xl font-black uppercase tracking-tighter leading-[0.95] max-w-4xl">
          SHOP BEYOND
          <br />
          ALL KNOWN BOUNDARIES
        </h2>

        <p className="text-sm text-[var(--ink-300)] max-w-sm">
          Next-generation delivery pipes ensure high-fidelity products arrive at your shipping coordinates instantly.
        </p>

        <div className="mt-4">
          <MagneticButton range={40}>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2.5 bg-[var(--accent-lime)] text-[var(--ink-900)] font-black text-xs uppercase tracking-widest px-8 py-5 rounded-full hover:shadow-xl transition-all cursor-pointer"
            >
              Explore Collection
              <ArrowRight className="w-4 h-4" />
            </Link>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
