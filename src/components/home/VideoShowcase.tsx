"use client";

import { useRef } from "react";
import { useGSAP } from "@/hooks/useGSAP";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { RevealText } from "../interactive/RevealText";
import { Play } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function VideoShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const isReduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (isReduced || !containerRef.current || !videoWrapperRef.current)
        return;

      // Reveal mask (clip-path wipe circle or polygon) on scroll trigger
      gsap.fromTo(
        videoWrapperRef.current,
        {
          clipPath: "inset(12% 12% rounded 28px)",
        },
        {
          clipPath: "inset(0% 0% rounded 0px)",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          },
        },
      );
    },
    [isReduced],
    containerRef,
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[90svh] bg-[var(--ink-900)] overflow-hidden flex items-center justify-center border-b border-black"
    >
      {/* Video Box with reveal mask */}
      <div
        ref={videoWrapperRef}
        style={{ clipPath: isReduced ? "none" : undefined }}
        className="absolute inset-0 z-0 bg-black overflow-hidden"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60 scale-102"
        >
          {/* High-quality abstract product lifestyle footage */}
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-skincare-oil-bottle-dripping-oil-42352-large.mp4"
            type="video/mp4"
          />
        </video>
        {/* Subtle noise pattern overlay */}
        <div className="absolute inset-0 bg-noise opacity-15 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
      </div>

      {/* Overlay Text Details */}
      <div className="relative z-10 text-center px-6 max-w-3xl text-white flex flex-col items-center gap-6">
        <div className="w-16 h-16 rounded-full bg-[var(--accent-lime)] text-[var(--ink-900)] flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all shadow-xl">
          <Play className="w-6 h-6 fill-current translate-x-0.5" />
        </div>

        <span className="text-xs font-black tracking-widest uppercase text-[var(--accent-lime)] mt-4">
          Brand Narrative
        </span>

        <RevealText
          text="CRAFTED BEYOND BOUNDARIES. DESIGNED FOR PERFORMANCE."
          tag="h2"
          className="text-grotesk text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-none text-white"
        />

        <p className="text-sm text-[var(--ink-300)] max-w-md mt-2">
          Watch our 2026 brand film detailing the manufacturing integrity behind
          every single Aether delivery.
        </p>
      </div>
    </section>
  );
}
