"use client";

import { useState, useEffect } from "react";
import { useAdminProductStore } from "@/lib/store/useAdminProductStore";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductCardSkeleton } from "@/components/product/ProductCardSkeleton";
import { FilterSidebar } from "@/components/filters/FilterSidebar";
import { FilterChips } from "@/components/filters/FilterChips";
import { Button } from "@/components/ui/Button";
import { Grid, List, SlidersHorizontal } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export default function ShopPage() {
  const allProducts = useAdminProductStore((state) => state.products);
  const isReduced = usePrefersReducedMotion();

  // Loading state simulation
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Filters State
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1500]);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter Logic
  const filteredProducts = allProducts.filter((product) => {
    // Categories Match
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
      return false;
    }
    // Subcategories Match
    if (
      selectedSubcategories.length > 0 &&
      !selectedSubcategories.includes(product.specs.Subcategory || "")
    ) {
      return false;
    }
    // Price Range Match
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }
    return true;
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0; // featured
  });

  // Handlers
  const handleCategoryToggle = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleSubcategoryToggle = (sub: string) => {
    setSelectedSubcategories((prev) =>
      prev.includes(sub) ? prev.filter((s) => s !== sub) : [...prev, sub]
    );
  };

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setSelectedSubcategories([]);
    setPriceRange([0, 1500]);
    setSortBy("featured");
  };

  return (
    <div className="min-h-screen bg-[var(--bg-canvas)] py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title segment */}
        <div className="flex flex-col gap-2 mb-12">
          <span className="text-xs font-black tracking-widest text-[var(--ink-600)] uppercase">
            Curated Catalog
          </span>
          <h1 className="text-grotesk text-5xl font-black uppercase tracking-tight text-[var(--ink-900)]">
            SHOP THE EDIT
          </h1>
        </div>

        {/* Toolbar row */}
        <div className="flex items-center justify-between border-b border-[var(--border-hairline)] pb-5 mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden p-3 bg-white border border-[var(--border-hairline)] rounded-[var(--radius-md)] flex items-center gap-2 text-xs font-black uppercase tracking-wider cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </button>
            <span className="text-xs font-bold text-[var(--ink-600)]">
              Showing {sortedProducts.length} results
            </span>
          </div>

          {/* Sort selection */}
          <div className="flex items-center gap-3">
            <label className="text-xs font-bold text-[var(--ink-600)] hidden sm:inline-block">
              SORT BY
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-[var(--border-hairline)] text-xs font-bold uppercase tracking-wider px-3.5 py-2.5 rounded-[var(--radius-md)] outline-none cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Layout split */}
        <div className="flex gap-10 items-start">
          {/* Left Desktop filters sidebar */}
          <div className="hidden lg:block w-72 shrink-0 sticky top-24">
            <FilterSidebar
              selectedCategories={selectedCategories}
              selectedSubcategories={selectedSubcategories}
              priceRange={priceRange}
              onCategoryChange={handleCategoryToggle}
              onSubcategoryChange={handleSubcategoryToggle}
              onPriceChange={setPriceRange}
              onReset={handleResetFilters}
            />
          </div>

          {/* Mobile Collapsible sidebar drawer */}
          {mobileFilterOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
              onClick={() => setMobileFilterOpen(false)}
            >
              <div
                className="absolute top-0 left-0 bottom-0 w-80 bg-white p-6 overflow-y-auto flex flex-col gap-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center border-b border-[var(--border-hairline)] pb-4">
                  <span className="text-sm font-black uppercase">Filters</span>
                  <button
                    onClick={() => setMobileFilterOpen(false)}
                    className="text-xs font-bold uppercase text-[var(--accent-coral)]"
                  >
                    Close
                  </button>
                </div>
                <FilterSidebar
                  selectedCategories={selectedCategories}
                  selectedSubcategories={selectedSubcategories}
                  priceRange={priceRange}
                  onCategoryChange={handleCategoryToggle}
                  onSubcategoryChange={handleSubcategoryToggle}
                  onPriceChange={setPriceRange}
                  onReset={handleResetFilters}
                />
              </div>
            </div>
          )}

          {/* Right Product Grid */}
          <div className="flex-grow">
            {/* Filter chips status */}
            <FilterChips
              filters={{
                categories: selectedCategories,
                subcategories: selectedSubcategories,
                priceRange,
              }}
              onRemoveCategory={handleCategoryToggle}
              onRemoveSubcategory={handleSubcategoryToggle}
              onResetPrice={() => setPriceRange([0, 1500])}
              onClearAll={handleResetFilters}
            />

            {/* Grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white border border-[var(--border-hairline)] rounded-[var(--radius-md)]">
                <p className="text-sm text-[var(--ink-600)]">No products match your parameters.</p>
                <Button variant="secondary" onClick={handleResetFilters} className="mt-4">
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
