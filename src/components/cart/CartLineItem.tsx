"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";
import { formatPrice } from "@/lib/utils/formatPrice";
import { QuantityStepper } from "@/components/product/QuantityStepper";
import { motion } from "framer-motion";
import { useCartStore } from "@/lib/store/useCartStore";

interface CartLineItemProps {
  item: {
    productId: string;
    variantId?: string;
    color?: string;
    size?: string;
    qty: number;
    price: number;
    name: string;
    image: string;
  };
}

export function CartLineItem({ item }: CartLineItemProps) {
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQty = useCartStore((state) => state.updateQty);

  const handleQtyChange = (val: number) => {
    updateQty(item.productId, val, item.variantId);
  };

  return (
    <motion.div
      layout
      exit={{ opacity: 0, height: 0, paddingBottom: 0, paddingTop: 0, overflow: "hidden" }}
      className="flex gap-4 py-4 border-b border-[var(--border-hairline)]"
    >
      {/* Thumbnail */}
      <div className="w-16 h-16 relative rounded-[var(--radius-md)] overflow-hidden bg-[var(--bg-canvas-alt)] shrink-0">
        <Image src={item.image} alt={item.name} fill className="object-cover" />
      </div>

      {/* Info Block */}
      <div className="flex-grow flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start gap-2">
            <h4 className="text-xs font-black text-[var(--ink-900)] line-clamp-1">
              {item.name}
            </h4>
            <span className="text-xs font-mono font-bold text-[var(--ink-900)]">
              {formatPrice(item.price * item.qty)}
            </span>
          </div>
          {(item.color || item.size) && (
            <span className="text-[10px] text-[var(--ink-600)] font-semibold uppercase mt-0.5 inline-block">
              {item.color} {item.size ? `/ Size: ${item.size}` : ""}
            </span>
          )}
        </div>

        {/* Quantity Stepper + Remove Row */}
        <div className="flex items-center justify-between gap-4 mt-2">
          <QuantityStepper qty={item.qty} onChange={handleQtyChange} />

          <button
            onClick={() => removeItem(item.productId, item.variantId)}
            className="p-1 text-[var(--ink-600)] hover:text-red-500 cursor-pointer transition-colors"
            aria-label="Remove item"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
