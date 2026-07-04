"use client";

import { use, useState, useEffect } from "react";
import { useAdminProductStore } from "@/lib/store/useAdminProductStore";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductCardSkeleton } from "@/components/product/ProductCardSkeleton";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

// Mock lifestyle images for category scroll zoom heroes
const categoryImages: Record<string, string> = {
  electronics: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&q=80",
  fashion: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=80",
  beauty: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80",
  "home-living": "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80",
  sports: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80",
  groceries: "https://images.unsplash.com/photo-1497515114629-f71d768fd07c?auto=format&fit=crop&w=1200&q=80",
  kids: "https://images.unsplash.com/photo-1519457431-7e5140d814e6?auto=format&fit=crop&w=1200&q=80",
  auto: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80",
};

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { category } = use(params);
  const products = useAdminProductStore((state) => state.products);
  const isReduced = usePrefersReducedMotion();

  // Scroll Zoom controls
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 400], [1, 1.15]);
  const blur = useTransform(scrollY, [0, 400], ["blur(0px)", "blur(8px)"]);
  const opacity = useTransform(scrollY, [0, 400], [0.75, 0.25]);

  // Loading state simulation
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Filter products by category (case-insensitive slug matching)
  const categoryProducts = products.filter(
    (p) => p.category.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-") === category
  );

  const displayTitle = category.replace("-", " ").toUpperCase();
  const heroImg = categoryImages[category] || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&q=80";

  return (
    <div className="min-h-screen bg-[var(--bg-canvas)]">
      {/* Category Scroll Zoom Hero */}
      <div className="relative w-full h-[60vh] overflow-hidden bg-black flex items-center justify-center">
        <motion.div
          style={{
            scale: isReduced ? 1 : scale,
            filter: isReduced ? "none" : blur,
            opacity: isReduced ? 0.65 : opacity,
          }}
          className="absolute inset-0 z-0 bg-cover bg-center"
          layoutId={`category-hero-${category}`}
        >
          <img
            src={heroImg}
            alt={displayTitle}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Content pinned */}
        <div className="relative z-10 text-center px-6 text-white flex flex-col items-center gap-4">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[var(--accent-lime)] hover:underline mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Shop
          </Link>
          <h1 className="text-grotesk text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
            {displayTitle}
          </h1>
          <p className="text-xs text-white/70 font-semibold tracking-widest uppercase">
            Collection edit · {categoryProducts.length} items
          </p>
        </div>
      </div>

      {/* Main product listing grid */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : categoryProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-[var(--border-hairline)] rounded-[var(--radius-md)]">
            <p className="text-sm text-[var(--ink-600)]">No products found in this category.</p>
            <Link href="/shop" className="inline-block mt-4">
              <Button variant="secondary">Browse All Products</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
