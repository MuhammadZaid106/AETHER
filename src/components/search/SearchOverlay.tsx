"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search, X, TrendingUp, History } from "lucide-react";
import Fuse from "fuse.js";
import productsData from "@/data/products.json";
import { formatPrice } from "@/lib/utils/formatPrice";

interface SearchOverlayProps {
  onClose: () => void;
}

export function SearchOverlay({ onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [recent, setRecent] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load recent searches from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("aether-recent-searches");
    if (saved) {
      try {
        setRecent(JSON.parse(saved));
      } catch (e) {}
    }
    inputRef.current?.focus();

    // Close on ESC
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Configure Fuse.js
  const fuseRef = useRef(
    new Fuse(productsData, {
      keys: ["name", "category", "tags", "description"],
      threshold: 0.35,
    })
  );

  const handleSearch = (val: string) => {
    setQuery(val);
    if (!val) {
      setResults([]);
      return;
    }
    const searchRes = fuseRef.current.search(val).map((res) => res.item);
    setResults(searchRes.slice(0, 5));
  };

  const handleSelectResult = (item: any) => {
    // Add query to recent searches
    const updated = [query, ...recent.filter((q) => q !== query)].slice(0, 5);
    setRecent(updated);
    localStorage.setItem("aether-recent-searches", JSON.stringify(updated));
    onClose();
  };

  const handleRemoveRecent = (e: React.MouseEvent, q: string) => {
    e.preventDefault();
    e.stopPropagation();
    const updated = recent.filter((val) => val !== q);
    setRecent(updated);
    localStorage.setItem("aether-recent-searches", JSON.stringify(updated));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-999 flex items-start justify-center pt-24 px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: -20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: -20 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className="w-full max-w-2xl bg-white rounded-[var(--radius-lg)] border border-[var(--border-hairline)] overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input area */}
        <div className="flex items-center gap-3 border-b border-[var(--border-hairline)] px-6 py-4.5">
          <Search className="w-5 h-5 text-[var(--ink-600)] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type query to find products..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="flex-grow bg-transparent border-none outline-none text-base text-[var(--ink-900)] placeholder:text-[var(--ink-300)] font-medium"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[var(--bg-canvas-alt)] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic content wrapper */}
        <div className="p-6 overflow-y-auto max-h-[380px] flex flex-col gap-6">
          {query === "" ? (
            <>
              {/* Recent searches */}
              {recent.length > 0 && (
                <div>
                  <h4 className="text-[10px] font-black tracking-widest text-[var(--ink-600)] uppercase mb-3 flex items-center gap-1">
                    <History className="w-3.5 h-3.5" /> Recent Queries
                  </h4>
                  <div className="flex flex-col gap-1.5">
                    {recent.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSearch(q)}
                        className="flex items-center justify-between text-sm text-[var(--ink-900)] hover:bg-[var(--bg-canvas-alt)] px-3 py-2 rounded-[var(--radius-md)] text-left cursor-pointer transition-colors"
                      >
                        <span>{q}</span>
                        <X
                          className="w-3.5 h-3.5 text-[var(--ink-600)] hover:text-red-500"
                          onClick={(e) => handleRemoveRecent(e, q)}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Trending searches */}
              <div>
                <h4 className="text-[10px] font-black tracking-widest text-[var(--ink-600)] uppercase mb-3 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> Trending Trends
                </h4>
                <div className="flex flex-wrap gap-2">
                  {["Headphones", "Serums", "Jackets", "Lounge Chair", "Dumbbells"].map((trend) => (
                    <button
                      key={trend}
                      onClick={() => handleSearch(trend)}
                      className="bg-[var(--bg-canvas-alt)] hover:bg-[var(--ink-900)] hover:text-white text-xs font-bold px-3.5 py-1.5 rounded-full transition-colors cursor-pointer"
                    >
                      {trend}
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : results.length > 0 ? (
            <div>
              <h4 className="text-[10px] font-black tracking-widest text-[var(--ink-600)] uppercase mb-3">
                Matches Found ({results.length})
              </h4>
              <div className="flex flex-col gap-3">
                {results.map((item) => (
                  <Link
                    key={item.id}
                    href={`/product/${item.slug}`}
                    onClick={() => handleSelectResult(item)}
                    className="flex gap-4 p-2 rounded-[var(--radius-md)] hover:bg-[var(--bg-canvas-alt)] transition-colors border border-transparent hover:border-[var(--border-hairline)]"
                  >
                    <div className="w-12 h-12 relative rounded-[var(--radius-md)] overflow-hidden bg-[var(--bg-canvas-alt)] shrink-0">
                      <Image
                        src={item.images[0]}
                        alt={item.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h4 className="text-sm font-bold text-[var(--ink-900)] line-clamp-1">
                        {item.name}
                      </h4>
                      <span className="text-xs text-[var(--ink-600)] mt-0.5">
                        {item.category} · {formatPrice(item.price)}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-sm text-[var(--ink-600)]">No matches found for "{query}".</p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
