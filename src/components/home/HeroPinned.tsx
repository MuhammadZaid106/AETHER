"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@/hooks/useGSAP";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { MagneticButton } from "../interactive/MagneticButton";
import { ArrowRight, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function HeroPinned() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgLayerFar = useRef<HTMLDivElement>(null);
  const bgLayerMid = useRef<HTMLDivElement>(null);
  const bgLayerNear = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const isReduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (isReduced) return;

      // 1. Entrance timeline
      const entryTl = gsap.timeline();
      
      // Hide initially to prevent FOUC
      gsap.set([headlineRef.current, ctaRef.current, bgLayerFar.current, bgLayerMid.current, bgLayerNear.current], {
        visibility: "visible",
      });

      entryTl
        .fromTo(
          bgLayerFar.current,
          { opacity: 0, scale: 1.15 },
          { opacity: 0.15, scale: 1, duration: 1.5, ease: "power3.out" }
        )
        .fromTo(
          bgLayerMid.current,
          { opacity: 0, scale: 0.8, y: 100 },
          { opacity: 1, scale: 1, y: 0, duration: 1.8, ease: "power4.out" },
          "-=1"
        )
        .fromTo(
          bgLayerNear.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" },
          "-=1.2"
        );

      const words = headlineRef.current?.querySelectorAll(".word-inner");
      if (words && words.length > 0) {
        entryTl.fromTo(
          words,
          { yPercent: 120, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.05, ease: "power4.out" },
          "-=1.5"
        );
      }

      entryTl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.4)" },
        "-=0.8"
      );

      // 2. Parallax Scroll Pinned Timeline
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=120%",
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
        },
      });

      scrollTl
        .to(bgLayerFar.current, { yPercent: -20, opacity: 0, ease: "none" }, 0)
        .to(bgLayerMid.current, { yPercent: -45, scale: 1.15, ease: "none" }, 0)
        .to(bgLayerNear.current, { yPercent: -75, ease: "none" }, 0)
        .to(headlineRef.current, { opacity: 0, y: -80, ease: "none" }, 0.4)
        .to(ctaRef.current, { opacity: 0, y: -60, ease: "none" }, 0.45);
    },
    [isReduced],
    containerRef
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100svh] overflow-hidden bg-[var(--bg-canvas)] flex items-center justify-center border-b border-[var(--border-hairline)]"
    >
      {/* Background Layer 1 (Far): Soft gradient/blur silhouette */}
      <div
        ref={bgLayerFar}
        style={{ visibility: isReduced ? "visible" : "hidden" }}
        className="absolute inset-0 z-0 bg-gradient-to-tr from-[rgba(215,254,62,0.15)] via-transparent to-[rgba(255,90,60,0.1)] blur-3xl opacity-60"
      />

      {/* Background Layer 2 (Mid): Core subject product float */}
      <div
        ref={bgLayerMid}
        style={{ visibility: isReduced ? "visible" : "hidden" }}
        className="absolute w-[80vw] h-[70vh] md:w-[600px] md:h-[600px] z-10 select-none pointer-events-none flex items-center justify-center opacity-90"
      >
        <div className="relative w-[300px] h-[300px] md:w-[480px] md:h-[480px] animate-float">
          <Image
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80"
            alt="Hero Float Subject"
            fill
            sizes="(max-width: 768px) 80vw, 480px"
            className="object-contain filter drop-shadow-[0_35px_35px_rgba(20,20,15,0.15)]"
            priority
          />
        </div>
      </div>

      {/* Background Layer 3 (Near): Orbiting abstract details (Reference A) */}
      <div
        ref={bgLayerNear}
        style={{ visibility: isReduced ? "visible" : "hidden" }}
        className="absolute inset-0 z-20 pointer-events-none"
      >
        {/* Orbital dots */}
        <div className="absolute top-[25%] left-[20%] w-3 h-3 rounded-full bg-[var(--accent-lime)] animate-pulse" />
        <div className="absolute top-[65%] right-[25%] w-4.5 h-4.5 rounded-full bg-[var(--accent-coral)]" />
        <div className="absolute bottom-[20%] left-[35%] w-2 h-2 rounded-full bg-[var(--ink-900)]" />
      </div>

      {/* Pinned Content overlay */}
      <div className="relative z-30 flex flex-col items-center justify-center text-center px-6 max-w-4xl">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-1.5 bg-white border border-[var(--border-hairline)] px-4 py-1.5 rounded-full text-xs font-black tracking-wider uppercase mb-8 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[var(--accent-coral)]" />
          New Season · 2,400+ Brands
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          style={{ visibility: isReduced ? "visible" : "hidden" }}
          className="text-grotesk text-[clamp(44px,8vw,120px)] leading-[0.9] font-black tracking-tighter uppercase mb-8 max-w-3xl"
        >
          {isReduced ? (
            "SHOCKING BEAUTY IN MOTION"
          ) : (
            <span className="flex flex-col items-center">
              <span className="overflow-hidden inline-block py-2">
                <span className="word-inner inline-block will-change-transform">SHOCKING BEAUTY</span>
              </span>
              <span className="overflow-hidden inline-block py-2">
                <span className="word-inner inline-block will-change-transform text-outline">IN MOTION</span>
              </span>
            </span>
          )}
        </h1>

        {/* CTA */}
        <div
          ref={ctaRef}
          style={{ visibility: isReduced ? "visible" : "hidden" }}
        >
          <MagneticButton range={60}>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2.5 bg-[var(--accent-lime)] text-[var(--ink-900)] font-black text-sm uppercase tracking-wider px-8 py-5.5 rounded-full hover:shadow-xl hover:scale-102 transition-transform cursor-pointer"
            >
              Shop the Edit
              <ArrowRight className="w-4 h-4" />
            </Link>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
