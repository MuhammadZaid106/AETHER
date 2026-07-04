"use client";

import { Star } from "lucide-react";

const brands = [
  { name: "AetherAudio", rating: 4.9, country: "US" },
  { name: "Chronos", rating: 4.8, country: "UK" },
  { name: "Modura", rating: 4.9, country: "IT" },
  { name: "Glow Lab", rating: 4.7, country: "KR" },
  { name: "Sartorialist", rating: 4.9, country: "FR" },
  { name: "Apex Sport", rating: 4.8, country: "DE" },
  { name: "Nectar", rating: 4.7, country: "NZ" },
  { name: "Bright Mind", rating: 4.9, country: "JP" },
];

export function BrandStrip() {
  return (
    <section className="py-12 bg-[var(--bg-canvas-alt)] border-b border-[var(--border-hairline)] overflow-hidden">
      <div className="relative flex items-center">
        {/* Faders */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--bg-canvas-alt)] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--bg-canvas-alt)] to-transparent z-10 pointer-events-none" />

        {/* Marquee loop track */}
        <div className="flex gap-6 animate-brand-marquee hover-pause-marquee cursor-pointer py-2">
          {[...brands, ...brands, ...brands].map((brand, idx) => (
            <div
              key={idx}
              className="shrink-0 bg-white border border-[var(--border-hairline)] px-6 py-4.5 rounded-[var(--radius-md)] flex items-center gap-4 shadow-sm hover:border-[var(--ink-900)] transition-colors duration-300"
            >
              {/* Fake Avatar */}
              <div className="w-9 h-9 rounded-full bg-[var(--ink-900)] text-white text-xs font-black flex items-center justify-center">
                {brand.name[0]}
              </div>

              <div>
                <h4 className="text-xs font-black text-[var(--ink-900)] uppercase tracking-wider">
                  {brand.name}
                </h4>
                <div className="flex items-center gap-1 mt-0.5">
                  <Star className="w-3 h-3 fill-[var(--accent-lime)] stroke-[var(--accent-lime)]" />
                  <span className="text-[10px] font-extrabold text-[var(--ink-900)]">
                    {brand.rating}
                  </span>
                  <span className="text-[9px] text-[var(--ink-600)] font-mono">
                    ({brand.country})
                  </span>
                </div>
              </div>

              {/* Live Badge */}
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
