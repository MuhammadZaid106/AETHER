"use client";

import { motion, LayoutGroup } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils/cn";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function getPageNumbers(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "ellipsis")[] = [1];

  if (current > 3) pages.push("ellipsis");

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (current < total - 2) pages.push("ellipsis");

  pages.push(total);
  return pages;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const isReduced = usePrefersReducedMotion();

  if (totalPages <= 1) return null;

  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <motion.nav
      aria-label="Pagination"
      initial={isReduced ? {} : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.1 }}
      className="flex flex-col items-center gap-4 mt-12"
    >
      <motion.p
        key={`label-${currentPage}`}
        initial={isReduced ? {} : { opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="text-xs font-bold uppercase tracking-widest text-[var(--ink-600)]"
      >
        Page {currentPage} of {totalPages}
      </motion.p>

      <LayoutGroup>
        <div className="inline-flex items-center gap-1 p-1.5 bg-white border border-[var(--border-hairline)] rounded-[var(--radius-pill)] shadow-sm">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
            className={cn(
              "flex items-center justify-center w-10 h-10 rounded-full text-[var(--ink-900)] transition-all duration-300",
              "hover:bg-[var(--bg-canvas-alt)] hover:scale-105 active:scale-95",
              "disabled:opacity-30 disabled:pointer-events-none disabled:scale-100 cursor-pointer"
            )}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {pages.map((page, idx) =>
            page === "ellipsis" ? (
              <span
                key={`ellipsis-${idx}`}
                className="w-9 h-10 flex items-center justify-center text-sm font-bold text-[var(--ink-300)] select-none"
              >
                ···
              </span>
            ) : (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                aria-label={`Page ${page}`}
                aria-current={page === currentPage ? "page" : undefined}
                className={cn(
                  "relative flex items-center justify-center w-10 h-10 rounded-full text-xs font-black transition-colors duration-300 cursor-pointer",
                  page === currentPage
                    ? "text-[var(--ink-900)]"
                    : "text-[var(--ink-600)] hover:text-[var(--ink-900)] hover:bg-[var(--bg-canvas-alt)]"
                )}
              >
                {page === currentPage &&
                  (isReduced ? (
                    <span className="absolute inset-0 bg-[var(--accent-lime)] rounded-full -z-10" />
                  ) : (
                    <motion.span
                      layoutId="pagination-active"
                      className="absolute inset-0 bg-[var(--accent-lime)] rounded-full -z-10 shadow-[0_0_12px_rgba(215,254,62,0.4)]"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  ))}
                {page}
              </button>
            )
          )}

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
            className={cn(
              "flex items-center justify-center w-10 h-10 rounded-full text-[var(--ink-900)] transition-all duration-300",
              "hover:bg-[var(--bg-canvas-alt)] hover:scale-105 active:scale-95",
              "disabled:opacity-30 disabled:pointer-events-none disabled:scale-100 cursor-pointer"
            )}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </LayoutGroup>
    </motion.nav>
  );
}
