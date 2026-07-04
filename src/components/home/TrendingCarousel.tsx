"use client";

import { useRef } from "react";
import { ProductCard } from "../product/ProductCard";
import { useGSAP } from "@/hooks/useGSAP";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import productsData from "@/data/products.json";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function TrendingCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const isReduced = usePrefersReducedMotion();

  // Pick some trending products
  const trendingProducts = productsData.slice(0, 8);

  useGSAP(
    () => {
      if (isReduced || !containerRef.current || !scrollTrackRef.current) return;

      const track = scrollTrackRef.current;
      const scrollWidth = track.scrollWidth;
      const viewportWidth = window.innerWidth;
      
      // Calculate how far to translate the track
      const xVal = -(scrollWidth - viewportWidth + 80);

      gsap.to(track, {
        x: xVal,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${scrollWidth - viewportWidth + 300}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    },
    [isReduced],
    containerRef
  );

  return (
    <div ref={containerRef} className="relative bg-white border-b border-[var(--border-hairline)] overflow-hidden">
      {/* For desktop, we wrap inside a pin area. On mobile we just use standard snap overflow */}
      <div className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-black tracking-widest text-[var(--ink-600)] uppercase">
              Spotlight
            </span>
            <h2 className="text-grotesk text-4xl md:text-5xl font-black uppercase tracking-tight mt-2 text-[var(--ink-900)]">
              TRENDING NOW
            </h2>
          </div>
          <p className="text-sm text-[var(--ink-600)] max-w-xs mt-4 md:mt-0">
            A real-time index of items gaining velocity across all digital channels.
          </p>
        </div>
      </div>

      {/* Scroll Track container */}
      <div className="overflow-x-auto md:overflow-hidden pb-12 scrollbar-none snap-x snap-mandatory px-6 md:px-0">
        <div
          ref={scrollTrackRef}
          className="flex gap-6 w-max px-[max(24px,calc((100vw-1200px)/2))] snap-x"
        >
          {trendingProducts.map((product) => (
            <div
              key={product.id}
              className="w-[280px] md:w-[320px] snap-center shrink-0"
              data-cursor="drag"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
