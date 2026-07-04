"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const moods = [
  {
    title: "Technological Edge",
    desc: "Uncompromising clarity and high performance gear.",
    slug: "electronics",
    image: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=600&q=80",
    size: "large",
  },
  {
    title: "Sartorial Minimalist",
    desc: "Clean lines and organic textures for your wardrobe.",
    slug: "fashion",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80",
    size: "large",
  },
  {
    title: "Restorative Sanctuary",
    desc: "Comfort and clean stoneware for your dwelling.",
    slug: "home-living",
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=600&q=80",
    size: "small",
  },
  {
    title: "Organic Essence",
    desc: "Nutritious and clean culinary treats.",
    slug: "groceries",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80",
    size: "small",
  },
  {
    title: "Pristine Radiant",
    desc: "Hyaluronic serums and floral skin oils.",
    slug: "beauty",
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=600&q=80",
    size: "small",
  },
  {
    title: "Kinetic Motion",
    desc: "Active apparel and smart sports gadgets.",
    slug: "sports",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
    size: "small",
  },
];

export function BentoGrid() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const isReduced = usePrefersReducedMotion();

  return (
    <section className="py-24 bg-[var(--bg-canvas-alt)] border-b border-[var(--border-hairline)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-black tracking-widest text-[var(--ink-600)] uppercase">
            Curated Edits
          </span>
          <h2 className="text-grotesk text-4xl md:text-5xl font-black uppercase tracking-tight mt-2 text-[var(--ink-900)]">
            SHOP BY MOOD
          </h2>
        </div>

        {/* Bento Grid with flex/grow animations */}
        <div className="flex flex-col md:flex-row gap-6 h-auto md:h-[600px]">
          {moods.map((mood, idx) => {
            const isHovered = hoveredIdx === idx;
            const isAnyHovered = hoveredIdx !== null;

            // Compute flex weight dynamically
            let flexVal = "1";
            if (!isReduced) {
              if (mood.size === "large") {
                flexVal = isHovered ? "2.5" : isAnyHovered ? "1" : "2";
              } else {
                flexVal = isHovered ? "1.5" : isAnyHovered ? "0.6" : "1";
              }
            } else {
              flexVal = mood.size === "large" ? "2" : "1";
            }

            return (
              <motion.div
                key={idx}
                layout
                style={{ flex: flexVal }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                className="relative rounded-[var(--radius-lg)] overflow-hidden bg-white border border-[var(--border-hairline)] min-h-[250px] md:min-h-0 flex flex-col justify-end group shadow-sm hover:shadow-xl duration-500"
              >
                <Link href={`/shop/${mood.slug}`} className="absolute inset-0">
                  {/* Background image */}
                  <Image
                    src={mood.image}
                    alt={mood.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover transition-transform duration-700 group-hover:scale-103"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(20,20,15,0.7)] via-[rgba(20,20,15,0.2)] to-transparent z-10" />
                </Link>

                {/* Content Overlay */}
                <div className="p-8 relative z-20 text-white flex flex-col justify-end h-full">
                  <div className="flex items-start justify-between gap-4">
                    <div className="max-w-xs">
                      <h3 className="text-grotesk font-extrabold text-xl md:text-2xl uppercase tracking-tight leading-none mb-2">
                        {mood.title}
                      </h3>
                      <p className="text-xs text-white/70 line-clamp-2 md:opacity-0 md:translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        {mood.desc}
                      </p>
                    </div>

                    <Link
                      href={`/shop/${mood.slug}`}
                      className="w-10 h-10 rounded-full bg-white text-[var(--ink-900)] flex items-center justify-center cursor-pointer shrink-0 hover:bg-[var(--accent-lime)] transition-colors"
                      aria-label={`Shop ${mood.title}`}
                    >
                      <ArrowUpRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
