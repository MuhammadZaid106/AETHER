"use client";

import { Minus, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface QuantityStepperProps {
  qty: number;
  onChange: (qty: number) => void;
  maxStock?: number;
}

export function QuantityStepper({ qty, onChange, maxStock = 99 }: QuantityStepperProps) {
  const handleMinus = (e: React.MouseEvent) => {
    e.preventDefault();
    if (qty > 1) onChange(qty - 1);
  };

  const handlePlus = (e: React.MouseEvent) => {
    e.preventDefault();
    if (qty < maxStock) onChange(qty + 1);
  };

  return (
    <div className="flex items-center border border-[var(--border-hairline)] bg-white rounded-[var(--radius-md)] h-11 w-32 shadow-sm overflow-hidden justify-between">
      <button
        onClick={handleMinus}
        disabled={qty <= 1}
        className="w-10 h-full flex items-center justify-center hover:bg-[var(--bg-canvas-alt)] active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
        aria-label="Decrease quantity"
      >
        <Minus className="w-3.5 h-3.5" />
      </button>

      {/* Digit Stepper roll transition */}
      <div className="flex-grow text-center font-mono font-bold text-sm text-[var(--ink-900)] overflow-hidden relative h-5 flex items-center justify-center">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={qty}
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -15, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute"
          >
            {qty}
          </motion.span>
        </AnimatePresence>
      </div>

      <button
        onClick={handlePlus}
        disabled={qty >= maxStock}
        className="w-10 h-full flex items-center justify-center hover:bg-[var(--bg-canvas-alt)] active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
        aria-label="Increase quantity"
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
