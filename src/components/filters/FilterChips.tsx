"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface FilterChipsProps {
  filters: {
    categories: string[];
    priceRange: [number, number];
    subcategories: string[];
  };
  onRemoveCategory: (cat: string) => void;
  onRemoveSubcategory: (sub: string) => void;
  onResetPrice: () => void;
  onClearAll: () => void;
}

export function FilterChips({
  filters,
  onRemoveCategory,
  onRemoveSubcategory,
  onResetPrice,
  onClearAll,
}: FilterChipsProps) {
  const hasCategories = filters.categories.length > 0;
  const hasSubcategories = filters.subcategories.length > 0;
  const hasCustomPrice = filters.priceRange[0] > 0 || filters.priceRange[1] < 1500;
  const hasAny = hasCategories || hasSubcategories || hasCustomPrice;

  if (!hasAny) return null;

  return (
    <div className="flex flex-wrap gap-2 items-center mb-6">
      <AnimatePresence>
        {/* Categories */}
        {filters.categories.map((cat) => (
          <motion.div
            key={`cat-${cat}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="inline-flex items-center gap-1 bg-white border border-[var(--border-hairline)] rounded-full pl-3 pr-1.5 py-1 text-xs font-bold text-[var(--ink-900)] shadow-sm"
          >
            <span>Category: {cat}</span>
            <button
              onClick={() => onRemoveCategory(cat)}
              className="p-0.5 rounded-full hover:bg-[var(--bg-canvas-alt)] cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}

        {/* Subcategories */}
        {filters.subcategories.map((sub) => (
          <motion.div
            key={`sub-${sub}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="inline-flex items-center gap-1 bg-white border border-[var(--border-hairline)] rounded-full pl-3 pr-1.5 py-1 text-xs font-bold text-[var(--ink-900)] shadow-sm"
          >
            <span>Sub: {sub}</span>
            <button
              onClick={() => onRemoveSubcategory(sub)}
              className="p-0.5 rounded-full hover:bg-[var(--bg-canvas-alt)] cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}

        {/* Price bounds */}
        {hasCustomPrice && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="inline-flex items-center gap-1 bg-white border border-[var(--border-hairline)] rounded-full pl-3 pr-1.5 py-1 text-xs font-bold text-[var(--ink-900)] shadow-sm"
          >
            <span>Price: ${filters.priceRange[0]} - ${filters.priceRange[1]}</span>
            <button
              onClick={onResetPrice}
              className="p-0.5 rounded-full hover:bg-[var(--bg-canvas-alt)] cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}

        {/* Clear All button */}
        <motion.button
          onClick={onClearAll}
          className="text-xs font-black uppercase text-[var(--accent-coral)] hover:underline ml-2 cursor-pointer"
        >
          Clear All
        </motion.button>
      </AnimatePresence>
    </div>
  );
}
