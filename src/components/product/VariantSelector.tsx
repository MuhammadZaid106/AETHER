"use client";

import { Badge } from "../ui/Badge";

interface Variant {
  id: string;
  color?: string;
  size?: string;
  stock: number;
}

interface VariantSelectorProps {
  variants: Variant[];
  selectedColor: string;
  selectedSize: string;
  onChangeColor: (color: string) => void;
  onChangeSize: (size: string) => void;
}

export function VariantSelector({
  variants,
  selectedColor,
  selectedSize,
  onChangeColor,
  onChangeSize,
}: VariantSelectorProps) {
  // Extract unique colors and sizes
  const colors = Array.from(new Set(variants.map((v) => v.color).filter(Boolean))) as string[];
  const sizes = Array.from(new Set(variants.map((v) => v.size).filter(Boolean))) as string[];

  // Find active variant stock status
  const currentVariant = variants.find(
    (v) => v.color === selectedColor && v.size === selectedSize
  );
  const currentStock = currentVariant ? currentVariant.stock : 0;

  return (
    <div className="flex flex-col gap-6">
      {/* Color picker swatches */}
      {colors.length > 0 && (
        <div className="flex flex-col gap-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--ink-600)]">
            Color: {selectedColor}
          </span>
          <div className="flex gap-3">
            {colors.map((color) => {
              const isActive = color === selectedColor;
              return (
                <button
                  key={color}
                  onClick={() => onChangeColor(color)}
                  className={`w-9 h-9 rounded-full border flex items-center justify-center cursor-pointer transition-all ${
                    isActive
                      ? "border-[var(--ink-900)] scale-110 shadow-sm"
                      : "border-[var(--border-hairline)] hover:scale-105"
                  }`}
                  title={color}
                >
                  <span
                    className={`w-7 h-7 rounded-full inline-block ${
                      color.includes("Grey")
                        ? "bg-stone-400"
                        : color.includes("White")
                        ? "bg-white border border-[var(--border-hairline)]"
                        : "bg-neutral-900"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Size picker selections */}
      {sizes.length > 0 && (
        <div className="flex flex-col gap-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--ink-600)]">
            Select Size
          </span>
          <div className="flex gap-2">
            {sizes.map((size) => {
              const isActive = size === selectedSize;
              return (
                <button
                  key={size}
                  onClick={() => onChangeSize(size)}
                  className={`min-w-11 h-11 px-3 border text-xs font-black uppercase rounded-[var(--radius-md)] flex items-center justify-center cursor-pointer transition-all ${
                    isActive
                      ? "bg-[var(--ink-900)] text-white border-[var(--ink-900)] scale-102"
                      : "bg-white text-[var(--ink-900)] border-[var(--border-hairline)] hover:border-[var(--ink-600)]"
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Stock warning notifications */}
      {currentVariant && (
        <div className="pt-2">
          {currentStock === 0 ? (
            <Badge variant="coral">OUT OF STOCK</Badge>
          ) : currentStock <= 5 ? (
            <Badge variant="coral" className="animate-pulse">
              ONLY {currentStock} LEFT IN QUANTITY
            </Badge>
          ) : (
            <Badge variant="lime">IN STOCK</Badge>
          )}
        </div>
      )}
    </div>
  );
}
