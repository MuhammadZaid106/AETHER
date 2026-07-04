"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { useCartStore } from "@/lib/store/useCartStore";
import { useWishlistStore } from "@/lib/store/useWishlistStore";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { productImageLayoutId } from "@/lib/constants/layoutIds";
import { formatPrice } from "@/lib/utils/formatPrice";
import { flyToCart } from "@/lib/utils/flyToCart";
import { toast } from "sonner";

export interface ProductCardProps {
  product: {
    id: string;
    slug: string;
    name: string;
    category: string;
    price: number;
    compareAtPrice?: number;
    images: string[];
    description: string;
    rating: number;
    reviewCount: number;
    stock: number;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const isReduced = usePrefersReducedMotion();

  // Stores
  const addItem = useCartStore((state) => state.addItem);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isWishlisted = useWishlistStore((state) => state.hasItem(product.id));

  // Wishlist heart burst animation states
  const [burstCount, setBurstCount] = useState(0);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    if (!isWishlisted) {
      setBurstCount((prev) => prev + 1);
    }
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const cartBtn = document.getElementById("global-cart-btn");
    const sourceImg = imageRef.current?.querySelector("img");

    if (cartBtn && sourceImg) {
      // Trigger fly animation
      flyToCart(sourceImg, cartBtn, product.images[0], () => {
        addItem({
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.images[0],
          qty: 1,
        });
        toast.success(`${product.name} added to cart`, {
          description: "Click cart icon to checkout.",
        });
      });
    } else {
      // Fallback if elements not fully rendered
      addItem({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        qty: 1,
      });
      toast.success(`${product.name} added to cart`);
    }
  };

  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  return (
    <motion.div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={isReduced ? {} : { opacity: 0, y: 30 }}
      whileInView={isReduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.5 }}
      className="group bg-white rounded-[var(--radius-md)] border border-[var(--border-hairline)] overflow-hidden flex flex-col justify-between h-full relative hover:shadow-xl transition-all duration-300"
    >
      <Link href={`/product/${product.slug}`} className="flex flex-col h-full">
        {/* Image Frame */}
        <div
          ref={imageRef}
          className="aspect-square relative overflow-hidden bg-[var(--bg-canvas-alt)]"
        >
          {/* Main Image */}
          <motion.div
            layoutId={productImageLayoutId(product.id)}
            className="w-full h-full relative"
          >
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority={false}
            />
          </motion.div>

          {/* Hover Crossfade Image */}
          {product.images[1] && (
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <Image
                src={product.images[1]}
                alt={`${product.name} alternate view`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
          )}

          {/* Discount Badge */}
          {product.compareAtPrice && (
            <div className="absolute top-4 left-4 bg-[var(--accent-coral)] text-white text-[10px] font-black tracking-widest uppercase py-1 px-2.5 rounded-full z-10">
              {discount}% OFF
            </div>
          )}

          {/* Wishlist Heart Toggle */}
          <button
            onClick={handleWishlistClick}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm border border-[var(--border-hairline)] flex items-center justify-center cursor-pointer shadow-sm hover:bg-white hover:scale-110 active:scale-90 transition-all z-20"
            aria-label="Add to Wishlist"
          >
            <motion.div
              animate={isWishlisted ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.35 }}
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  isWishlisted
                    ? "fill-[var(--accent-coral)] stroke-[var(--accent-coral)]"
                    : "stroke-[var(--ink-900)]"
                }`}
              />
            </motion.div>

            {/* Heart burst particle effect */}
            <AnimatePresence>
              {burstCount > 0 && isWishlisted && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={`${burstCount}-${i}`}
                      initial={{ scale: 0.8, opacity: 1 }}
                      animate={{
                        x: Math.cos((i * Math.PI) / 3) * 20,
                        y: Math.sin((i * Math.PI) / 3) * 20,
                        scale: 0,
                        opacity: 0,
                      }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="absolute w-1.5 h-1.5 rounded-full bg-[var(--accent-coral)]"
                    />
                  ))}
                </div>
              )}
            </AnimatePresence>
          </button>

          {/* Desktop Hover Quick Add Bar */}
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20 bg-gradient-to-t from-[rgba(20,20,15,0.2)] to-transparent hidden md:block">
            <button
              onClick={handleQuickAdd}
              className="w-full py-3 px-4 bg-[var(--accent-lime)] text-[var(--ink-900)] font-black text-xs uppercase tracking-widest rounded-[var(--radius-md)] flex items-center justify-center gap-2 hover:bg-white hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              Quick Add
            </button>
          </div>
        </div>

        {/* Info Block */}
        <div className="p-5 flex flex-col gap-2 flex-grow justify-between">
          <div>
            <span className="text-[10px] font-bold text-[var(--ink-600)] uppercase tracking-wider">
              {product.category}
            </span>
            <h3 className="text-sm font-bold text-[var(--ink-900)] group-hover:text-[var(--ink-600)] transition-colors line-clamp-1 mt-1">
              {product.name}
            </h3>

            {/* Stars */}
            <div className="flex items-center gap-1 mt-1">
              <Star className="w-3.5 h-3.5 fill-[var(--accent-lime)] stroke-[var(--accent-lime)]" />
              <span className="text-xs font-bold text-[var(--ink-900)]">
                {product.rating}
              </span>
              <span className="text-[10px] text-[var(--ink-600)]">
                ({product.reviewCount})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 mt-3 pt-3 border-t border-[var(--border-hairline)]">
            <span className="text-sm font-black text-[var(--ink-900)]">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-xs text-[var(--ink-600)] line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}

            {/* Mobile Plus Add button */}
            <button
              onClick={handleQuickAdd}
              className="ml-auto w-8 h-8 rounded-full bg-[var(--accent-lime)] text-[var(--ink-900)] flex items-center justify-center md:hidden cursor-pointer active:scale-90 transition-transform"
              aria-label="Add to Cart"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
