"use client";

import { use, useState, useEffect } from "react";
import { useAdminProductStore } from "@/lib/store/useAdminProductStore";
import { useCartStore } from "@/lib/store/useCartStore";
import { useRecentlyViewedStore } from "@/lib/store/useRecentlyViewedStore";
import { ProductGallery } from "@/components/product/ProductGallery";
import { VariantSelector } from "@/components/product/VariantSelector";
import { QuantityStepper } from "@/components/product/QuantityStepper";
import { ReviewList } from "@/components/product/ReviewList";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { toast } from "sonner";
import { formatPrice } from "@/lib/utils/formatPrice";
import { productImageLayoutId } from "@/lib/constants/layoutIds";
import {
  ShoppingBag,
  Heart,
  Star,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { slug } = use(params);
  const products = useAdminProductStore((state) => state.products);
  const addCartItem = useCartStore((state) => state.addItem);
  const addRecentlyViewed = useRecentlyViewedStore((state) => state.addProduct);
  const isReduced = usePrefersReducedMotion();
  const [mounted, setMounted] = useState(false);

  // Find product by slug
  const product = products.find((p) => p.slug === slug);

  // States
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Seed default variant values once product is loaded
  useEffect(() => {
    if (product) {
      addRecentlyViewed(product.id);
      if (product.variants && product.variants.length > 0) {
        setSelectedColor(product.variants[0].color || "");
        setSelectedSize(product.variants[0].size || "");
      }
    }
  }, [product, addRecentlyViewed]);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-canvas)]">
        <div className="text-xs font-bold tracking-widest text-[var(--ink-600)] uppercase animate-pulse">
          Loading Product Details...
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-canvas)]">
        <div className="text-center">
          <h2 className="text-xl font-bold">Product not found</h2>
          <Link
            href="/shop"
            className="text-xs font-black uppercase text-[var(--accent-lime)] mt-4 inline-block underline"
          >
            Back to Catalog
          </Link>
        </div>
      </div>
    );
  }

  // Active Variant lookup
  const activeVariant = product.variants?.find(
    (v) => v.color === selectedColor && v.size === selectedSize,
  );

  const handleAddToCart = () => {
    addCartItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      color: selectedColor || undefined,
      size: selectedSize || undefined,
      variantId: activeVariant?.id || undefined,
      qty,
    });
    toast.success(`Added ${qty} x ${product.name} to cart`);
  };

  // Filter out matching categories for Related Carousel
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-[var(--bg-canvas)] py-16">
      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-16">
        {/* Main Grid: Gallery + Info Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Large Gallery Column */}
          <div className="lg:col-span-6 w-full">
            <ProductGallery
              images={product.images}
              layoutId={productImageLayoutId(product.id)}
            />
          </div>

          {/* Right Info Details Column */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {/* Title / Badge Block */}
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                <Badge
                  variant="outline"
                  className="text-[10px] uppercase font-extrabold tracking-wider"
                >
                  {product.category}
                </Badge>
                {product.compareAtPrice && (
                  <Badge
                    variant="coral"
                    className="text-[10px] uppercase font-black tracking-wider"
                  >
                    PROMO RATE
                  </Badge>
                )}
              </div>

              <h1 className="text-grotesk text-3xl sm:text-4xl font-black uppercase tracking-tight text-[var(--ink-900)] mt-2">
                {product.name}
              </h1>

              {/* Star Rating Header */}
              <div className="flex items-center gap-1.5 mt-1">
                <Star className="w-4 h-4 fill-[var(--accent-lime)] stroke-[var(--accent-lime)]" />
                <span className="text-sm font-bold text-[var(--ink-900)]">
                  {product.rating}
                </span>
                <span className="text-xs text-[var(--ink-600)]">
                  ({product.reviewCount} customer reviews)
                </span>
              </div>
            </div>

            {/* Price section */}
            <div className="flex items-baseline gap-3 pb-6 border-b border-[var(--border-hairline)]">
              <span className="text-2xl font-black text-[var(--ink-900)] font-mono">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="text-sm text-[var(--ink-600)] line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>

            {/* Product Description */}
            <p className="text-sm text-[var(--ink-600)] leading-relaxed">
              {product.description}
            </p>

            {/* Variant select panel */}
            {product.variants && product.variants.length > 0 && (
              <VariantSelector
                variants={product.variants}
                selectedColor={selectedColor}
                selectedSize={selectedSize}
                onChangeColor={setSelectedColor}
                onChangeSize={setSelectedSize}
              />
            )}

            {/* Add to Cart Stepper panel */}
            <div className="flex items-center gap-4 pt-4 border-t border-[var(--border-hairline)] mt-4">
              <QuantityStepper
                qty={qty}
                onChange={setQty}
                maxStock={activeVariant?.stock || product.stock}
              />

              <Button
                variant="lime"
                size="md"
                className="flex-grow uppercase font-black tracking-widest text-xs h-11"
                onClick={handleAddToCart}
                disabled={
                  activeVariant
                    ? activeVariant.stock === 0
                    : product.stock === 0
                }
              >
                <ShoppingBag className="w-4.5 h-4.5" /> Add to Cart
              </Button>
            </div>

            {/* Trust Badges widget */}
            <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-[var(--border-hairline)]">
              <div className="flex items-center gap-2.5 text-xs text-[var(--ink-600)]">
                <ShieldCheck className="w-5 h-5 text-[var(--ink-900)]" />
                <span>2 Year Warranty Coverage</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[var(--ink-600)]">
                <RefreshCw className="w-4.5 h-4.5 text-[var(--ink-900)]" />
                <span>30 Day Returns Guarantee</span>
              </div>
            </div>
          </div>
        </div>

        {/* Spec Sheets segment */}
        <div className="bg-white border border-[var(--border-hairline)] rounded-[var(--radius-lg)] p-8 shadow-sm">
          <h3 className="text-grotesk text-xl font-black uppercase tracking-tight text-[var(--ink-900)] mb-6">
            PRODUCT SPECIFICATIONS
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(product.specs || {}).map(([key, val]) => (
              <div
                key={key}
                className="flex justify-between border-b border-[var(--border-hairline)] pb-2 text-sm"
              >
                <span className="font-bold text-[var(--ink-600)]">{key}</span>
                <span className="font-black text-[var(--ink-900)]">{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews panel */}
        <ReviewList
          productId={product.id}
          reviews={[
            {
              id: `r_1_${product.id}`,
              userName: "Avery K.",
              rating: 5,
              comment:
                "Absolutely exceeded my expectations. Built quality is stellar!",
              date: new Date().toISOString(),
            },
            {
              id: `r_2_${product.id}`,
              userName: "Marcus L.",
              rating: 4,
              comment:
                "Very solid. Only feedback is shipping took a day longer than expected.",
              date: new Date(
                Date.now() - 1000 * 60 * 60 * 24 * 3,
              ).toISOString(),
            },
          ]}
          rating={product.rating}
          reviewCount={product.reviewCount}
        />

        {/* Related products carousel */}
        {related.length > 0 && (
          <div className="flex flex-col gap-8 pt-12 border-t border-[var(--border-hairline)]">
            <div className="flex justify-between items-end">
              <h3 className="text-grotesk text-2xl font-black uppercase tracking-tight text-[var(--ink-900)]">
                RELATED CURATIONS
              </h3>
              <Link
                href="/shop"
                className="text-xs font-black uppercase text-[var(--ink-600)] hover:text-black flex items-center gap-1"
              >
                View All <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
