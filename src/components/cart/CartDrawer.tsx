"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/lib/store/useCartStore";
import { CartLineItem } from "./CartLineItem";
import { formatPrice } from "@/lib/utils/formatPrice";
import { Button } from "../ui/Button";

interface CartDrawerProps {
  onClose: () => void;
}

export function CartDrawer({ onClose }: CartDrawerProps) {
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.subtotal)();

  // Prevent scroll when open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-999 flex justify-end"
      onClick={onClose}
    >
      {/* Sliding Drawer Container */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 350, damping: 30 }}
        className="w-full max-w-md bg-white h-full flex flex-col justify-between shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header segment */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--border-hairline)]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[var(--ink-900)]" />
            <h3 className="text-sm font-black uppercase tracking-wider text-[var(--ink-900)]">
              Shopping Cart ({items.reduce((sum, item) => sum + item.qty, 0)})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[var(--bg-canvas-alt)] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable list content */}
        <div className="flex-grow p-6 overflow-y-auto flex flex-col gap-4">
          <AnimatePresence initial={false}>
            {items.length > 0 ? (
              items.map((item, idx) => (
                <CartLineItem key={item.variantId ? `${item.productId}-${item.variantId}` : item.productId} item={item} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[var(--bg-canvas-alt)] flex items-center justify-center mb-2 animate-bounce">
                  <ShoppingBag className="w-8 h-8 text-[var(--ink-600)]" />
                </div>
                <h4 className="font-bold text-sm text-[var(--ink-900)] uppercase">
                  Your cart is empty
                </h4>
                <p className="text-xs text-[var(--ink-600)] max-w-[200px]">
                  Fill it with high fidelity digital Curations from the shop.
                </p>
                <Link href="/shop" onClick={onClose} className="mt-2">
                  <Button variant="primary" size="sm" className="uppercase font-bold tracking-widest text-[10px]">
                    Browse Catalog
                  </Button>
                </Link>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Billing segment */}
        {items.length > 0 && (
          <div className="border-t border-[var(--border-hairline)] p-6 bg-[var(--bg-canvas)] flex flex-col gap-4">
            <div className="flex justify-between items-baseline">
              <span className="text-xs font-bold text-[var(--ink-600)]">SUBTOTAL</span>
              <span className="text-xl font-black font-mono text-[var(--ink-900)]">
                {formatPrice(subtotal)}
              </span>
            </div>
            <span className="text-[10px] text-[var(--ink-600)] font-semibold uppercase">
              Shipping & taxes calculated at checkout.
            </span>

            <div className="grid grid-cols-2 gap-3 mt-2">
              <Link href="/cart" onClick={onClose} className="w-full">
                <Button variant="outline" className="w-full uppercase font-black tracking-widest text-[10px] h-11">
                  View Cart
                </Button>
              </Link>
              <Link href="/checkout" onClick={onClose} className="w-full">
                <Button variant="lime" className="w-full uppercase font-black tracking-widest text-[10px] h-11 flex items-center justify-center gap-1">
                  Checkout <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
