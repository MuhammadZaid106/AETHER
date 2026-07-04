"use client";

import Link from "next/link";
import { useWishlistStore } from "@/lib/store/useWishlistStore";
import { useAdminProductStore } from "@/lib/store/useAdminProductStore";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/Button";
import { Heart, ShoppingBag } from "lucide-react";

export default function WishlistPage() {
  const wishlistIds = useWishlistStore((state) => state.productIds);
  const products = useAdminProductStore((state) => state.products);

  // Filter products in wishlist
  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="min-h-screen bg-[var(--bg-canvas)] py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <div className="flex flex-col gap-2 mb-12">
          <span className="text-xs font-black tracking-widest text-[var(--ink-600)] uppercase">
            Your Wishlist
          </span>
          <h1 className="text-grotesk text-5xl font-black uppercase tracking-tight text-[var(--ink-900)]">
            SAVED CURATIONS
          </h1>
        </div>

        {wishlistProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistProducts.map((product) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-[var(--border-hairline)] rounded-[var(--radius-lg)] max-w-2xl mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-full bg-[var(--bg-canvas-alt)] flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-[var(--ink-600)]" />
            </div>
            <h2 className="text-grotesk text-2xl font-black uppercase text-[var(--ink-900)]">
              YOUR WISHLIST IS EMPTY
            </h2>
            <p className="text-sm text-[var(--ink-600)] max-w-xs mx-auto mt-2 leading-relaxed">
              Bookmark your favorite high-fidelity items by clicking the heart button.
            </p>
            <Link href="/shop" className="inline-block mt-6">
              <Button variant="primary">Browse Shop</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
