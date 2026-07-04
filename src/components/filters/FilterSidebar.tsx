"use client";

import { PriceRangeSlider } from "./PriceRangeSlider";

const categories = [
  "Electronics",
  "Fashion",
  "Beauty",
  "Home & Living",
  "Sports",
  "Groceries",
  "Kids",
  "Auto",
];

const subcategoriesList = [
  "Audio",
  "Wearables",
  "Computers",
  "Menswear",
  "Womenswear",
  "Accessories",
  "Skincare",
  "Furniture",
  "Fitness",
];

interface FilterSidebarProps {
  selectedCategories: string[];
  selectedSubcategories: string[];
  priceRange: [number, number];
  onCategoryChange: (category: string) => void;
  onSubcategoryChange: (sub: string) => void;
  onPriceChange: (val: [number, number]) => void;
  onReset: () => void;
}

export function FilterSidebar({
  selectedCategories,
  selectedSubcategories,
  priceRange,
  onCategoryChange,
  onSubcategoryChange,
  onPriceChange,
  onReset,
}: FilterSidebarProps) {
  return (
    <div className="flex flex-col gap-8 w-full max-w-[280px]">
      <div className="flex items-center justify-between border-b border-[var(--border-hairline)] pb-4">
        <h3 className="text-sm font-black uppercase tracking-wider text-[var(--ink-900)]">
          FILTERS
        </h3>
        <button
          onClick={onReset}
          className="text-xs font-bold text-[var(--ink-600)] hover:text-black hover:underline cursor-pointer"
        >
          Reset All
        </button>
      </div>

      {/* Category List */}
      <div className="flex flex-col gap-4">
        <h4 className="text-xs font-black uppercase tracking-widest text-[var(--ink-600)]">
          Categories
        </h4>
        <div className="flex flex-col gap-2.5">
          {categories.map((cat) => {
            const checked = selectedCategories.includes(cat);
            return (
              <label
                key={cat}
                className="flex items-center gap-3 text-sm text-[var(--ink-900)] hover:text-black cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onCategoryChange(cat)}
                  className="rounded border-[var(--border-hairline)] text-[var(--ink-900)] focus:ring-0 focus:ring-offset-0 w-4.5 h-4.5 accent-[var(--ink-900)] cursor-pointer"
                />
                <span className={checked ? "font-bold" : "font-medium"}>{cat}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Subcategory List */}
      <div className="flex flex-col gap-4">
        <h4 className="text-xs font-black uppercase tracking-widest text-[var(--ink-600)]">
          Subcategories
        </h4>
        <div className="flex flex-col gap-2.5">
          {subcategoriesList.map((sub) => {
            const checked = selectedSubcategories.includes(sub);
            return (
              <label
                key={sub}
                className="flex items-center gap-3 text-sm text-[var(--ink-900)] hover:text-black cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onSubcategoryChange(sub)}
                  className="rounded border-[var(--border-hairline)] text-[var(--ink-900)] focus:ring-0 focus:ring-offset-0 w-4.5 h-4.5 accent-[var(--ink-900)] cursor-pointer"
                />
                <span className={checked ? "font-bold" : "font-medium"}>{sub}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="flex flex-col gap-4">
        <h4 className="text-xs font-black uppercase tracking-widest text-[var(--ink-600)]">
          Price Cap
        </h4>
        <PriceRangeSlider
          min={0}
          max={1500}
          value={priceRange}
          onValueChange={onPriceChange}
        />
      </div>
    </div>
  );
}
