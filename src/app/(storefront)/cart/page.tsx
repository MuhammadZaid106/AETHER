"use client";

import { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/lib/store/useCartStore";
import { CartLineItem } from "@/components/cart/CartLineItem";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils/formatPrice";
import { ArrowLeft, ArrowRight, ShoppingBag, Tag } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.subtotal)();

  // Promo code validation states
  const [promoCode, setPromoCode] = useState("");
  const [discountVal, setDiscountVal] = useState(0);
  const [isShake, setIsShake] = useState(false);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.toUpperCase() === "AETHER20") {
      setDiscountVal(0.2); // 20% discount
      toast.success("Promo code AETHER20 applied: 20% Off!");
    } else {
      setIsShake(true);
      setTimeout(() => setIsShake(false), 400);
      toast.error("Invalid coupon code coordinate");
    }
  };

  const discountAmount = subtotal * discountVal;
  const shippingAmount = subtotal > 150 || subtotal === 0 ? 0 : 15;
  const totalAmount = subtotal - discountAmount + shippingAmount;

  return (
    <div className="min-h-screen bg-[var(--bg-canvas)] py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <div className="flex flex-col gap-2 mb-12">
          <span className="text-xs font-black tracking-widest text-[var(--ink-600)] uppercase">
            Your Selection
          </span>
          <h1 className="text-grotesk text-5xl font-black uppercase tracking-tight text-[var(--ink-900)]">
            SHOPPING CART
          </h1>
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Items Column */}
            <div className="lg:col-span-8 bg-white border border-[var(--border-hairline)] rounded-[var(--radius-lg)] p-8 shadow-sm flex flex-col gap-2">
              <h3 className="text-grotesk text-xl font-black uppercase tracking-tight text-[var(--ink-900)] border-b border-[var(--border-hairline)] pb-4 mb-2">
                Order Items
              </h3>
              <AnimatePresence initial={false}>
                {items.map((item, idx) => (
                  <CartLineItem key={item.variantId ? `${item.productId}-${item.variantId}` : item.productId} item={item} />
                ))}
              </AnimatePresence>
              <Link href="/shop" className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[var(--ink-600)] hover:text-black mt-6">
                <ArrowLeft className="w-4 h-4" /> Continue Shopping
              </Link>
            </div>

            {/* Right Summary Column */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {/* Promo input with shake animation */}
              <motion.form
                onSubmit={handleApplyPromo}
                animate={isShake ? { x: [0, -6, 6, -4, 4, 0] } : {}}
                transition={{ duration: 0.35 }}
                className="bg-white border border-[var(--border-hairline)] p-6 rounded-[var(--radius-md)] flex flex-col gap-4 shadow-sm"
              >
                <h4 className="text-xs font-black uppercase tracking-widest text-[var(--ink-600)] mb-1 flex items-center gap-1.5">
                  <Tag className="w-4 h-4 text-[var(--ink-900)]" /> Promo Code
                </h4>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code (AETHER20)..."
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-grow bg-[var(--bg-canvas)] border border-[var(--border-hairline)] text-sm px-3.5 rounded-[var(--radius-md)] outline-none text-[var(--ink-900)] placeholder:text-[var(--ink-300)]"
                  />
                  <Button type="submit" variant="primary" size="sm" className="uppercase font-bold tracking-widest text-[10px]">
                    Apply
                  </Button>
                </div>
              </motion.form>

              {/* Order Summary details */}
              <div className="bg-white border border-[var(--border-hairline)] p-8 rounded-[var(--radius-lg)] shadow-sm flex flex-col gap-5">
                <h3 className="text-grotesk text-xl font-black uppercase tracking-tight text-[var(--ink-900)] border-b border-[var(--border-hairline)] pb-4 mb-2">
                  Summary
                </h3>

                <div className="flex justify-between text-sm">
                  <span className="font-bold text-[var(--ink-600)]">Subtotal</span>
                  <span className="font-black text-[var(--ink-900)] font-mono">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                {discountVal > 0 && (
                  <div className="flex justify-between text-sm text-emerald-600">
                    <span className="font-bold">Discount (20%)</span>
                    <span className="font-black font-mono">
                      -{formatPrice(discountAmount)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-sm">
                  <span className="font-bold text-[var(--ink-600)]">Shipping</span>
                  <span className="font-black text-[var(--ink-900)] font-mono">
                    {shippingAmount === 0 ? "FREE" : formatPrice(shippingAmount)}
                  </span>
                </div>

                <div className="flex justify-between items-baseline border-t border-[var(--border-hairline)] pt-4 mt-2">
                  <span className="text-sm font-black text-[var(--ink-900)]">ESTIMATED TOTAL</span>
                  <span className="text-2xl font-black font-mono text-[var(--ink-900)]">
                    {formatPrice(totalAmount)}
                  </span>
                </div>

                <Link href="/checkout" className="w-full mt-4">
                  <Button variant="lime" className="w-full uppercase font-black tracking-widest text-xs h-12 flex items-center justify-center gap-1">
                    Proceed to Checkout <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-[var(--border-hairline)] rounded-[var(--radius-lg)] max-w-2xl mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-full bg-[var(--bg-canvas-alt)] flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-8 h-8 text-[var(--ink-600)]" />
            </div>
            <h2 className="text-grotesk text-2xl font-black uppercase text-[var(--ink-900)]">
              YOUR CART IS EMPTY
            </h2>
            <p className="text-sm text-[var(--ink-600)] max-w-xs mx-auto mt-2 leading-relaxed">
              Explore our curation index to add products to your cart.
            </p>
            <Link href="/shop" className="inline-block mt-6">
              <Button variant="primary">Shop All Catalog</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
