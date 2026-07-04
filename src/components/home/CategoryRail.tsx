"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Laptop,
  Shirt,
  Sparkles,
  Home,
  Dumbbell,
  Apple,
  Baby,
  Car,
} from "lucide-react";

const categories = [
  { name: "Electronics", slug: "electronics", icon: Laptop },
  { name: "Fashion", slug: "fashion", icon: Shirt },
  { name: "Beauty", slug: "beauty", icon: Sparkles },
  { name: "Home & Living", slug: "home-living", icon: Home },
  { name: "Sports", slug: "sports", icon: Dumbbell },
  { name: "Groceries", slug: "groceries", icon: Apple },
  { name: "Kids", slug: "kids", icon: Baby },
  { name: "Auto", slug: "auto", icon: Car },
];

export function CategoryRail() {
  return (
    <section className="py-12 bg-white border-b border-[var(--border-hairline)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="sr-only">Categories</h2>

        <div className="flex gap-4 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory scrollbar-none">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;

            return (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="snap-start shrink-0"
              >
                <Link
                  href={`/shop/${cat.slug}`}
                  className="flex flex-col items-center gap-3 w-28 md:w-32 py-5 rounded-[var(--radius-md)] border border-[var(--border-hairline)] bg-[var(--bg-canvas)] hover:bg-white hover:border-[var(--ink-900)] transition-all duration-300 relative group"
                >
                  {/* Icon Wrapper */}
                  <div className="w-12 h-12 rounded-full bg-white group-hover:bg-[var(--accent-lime)] transition-colors duration-300 flex items-center justify-center border border-[var(--border-hairline)] shadow-sm">
                    <Icon className="w-5 h-5 text-[var(--ink-900)] group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-xs font-extrabold text-[var(--ink-900)] uppercase tracking-wider group-hover:text-black">
                    {cat.name}
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
