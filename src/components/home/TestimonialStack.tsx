"use client";

import { useRef } from "react";
import { useGSAP } from "@/hooks/useGSAP";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { Star, Quote } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  {
    name: "Elena Rostova",
    role: "Verified Collector",
    text: "The motion feels so natural, and the checkout transition is incredibly fast. Next level e-commerce design.",
    rating: 5,
    bg: "bg-white",
    color: "text-[var(--ink-900)]",
  },
  {
    name: "Devon Miller",
    role: "Studio Director",
    text: "Clean, desaturated canvas highlights the premium sneaker float beautifully. Nitec-style token is gorgeous.",
    rating: 5,
    bg: "bg-[var(--ink-900)]",
    color: "text-white",
  },
  {
    name: "Sarah Jenkins",
    role: "Product Lead",
    text: "Zustand stores synced instantly, and the flying item animation is delightfully satisfying to execute.",
    rating: 5,
    bg: "bg-[var(--accent-lime)]",
    color: "text-[var(--ink-900)]",
  },
];

export function TestimonialStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isReduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (isReduced || !containerRef.current) return;

      const cards = containerRef.current.querySelectorAll(".stack-card");
      if (cards.length === 0) return;

      // Pin the container and stagger/scale the cards
      cards.forEach((card, index) => {
        if (index === cards.length - 1) return; // Last card stays active

        gsap.to(card, {
          scale: 0.9 - (cards.length - 1 - index) * 0.03,
          opacity: 0.3,
          yPercent: -10 * (cards.length - 1 - index),
          scrollTrigger: {
            trigger: card,
            start: "top 25%",
            end: "bottom 20%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      });

      // Pin the section track
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: `+=${cards.length * 80}%`,
        pin: true,
        scrub: true,
      });
    },
    [isReduced],
    containerRef
  );

  return (
    <section
      ref={containerRef}
      className="py-32 bg-[var(--bg-canvas)] border-b border-[var(--border-hairline)] relative min-h-screen flex items-center justify-center"
    >
      <div className="max-w-4xl mx-auto px-6 w-full flex flex-col items-center">
        <div className="text-center mb-16">
          <span className="text-xs font-black tracking-widest text-[var(--ink-600)] uppercase">
            Client Voices
          </span>
          <h2 className="text-grotesk text-4xl md:text-5xl font-black uppercase tracking-tight mt-2 text-[var(--ink-900)]">
            STICKY CARD REVIEWS
          </h2>
        </div>

        {/* Stacking Frame */}
        <div className="relative w-full max-w-xl h-[340px] flex items-center justify-center">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className={`stack-card absolute w-full p-8 rounded-[var(--radius-lg)] border border-[var(--border-hairline)] shadow-xl ${rev.bg} ${rev.color} flex flex-col justify-between h-[320px] transition-all`}
              style={{
                zIndex: idx + 1,
                transform: isReduced ? `translateY(${idx * 20}px) scale(${1 - (reviews.length - 1 - idx) * 0.03})` : undefined,
                position: isReduced ? "relative" : "absolute",
              }}
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <Quote className="w-8 h-8 opacity-20" />
                  <div className="flex gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current stroke-none" />
                    ))}
                  </div>
                </div>
                <p className="text-base sm:text-lg font-bold leading-relaxed tracking-tight italic">
                  "{rev.text}"
                </p>
              </div>

              <div className="flex justify-between items-end border-t border-[var(--border-hairline)] pt-4">
                <div>
                  <h4 className="font-extrabold text-sm uppercase tracking-wide">
                    {rev.name}
                  </h4>
                  <span className="text-xs opacity-60 font-semibold">{rev.role}</span>
                </div>
                <span className="text-2xl font-black font-mono opacity-25">
                  0{idx + 1}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
