"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface ProductGalleryProps {
  images: string[];
  layoutId?: string;
}

export function ProductGallery({ images, layoutId }: ProductGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({ display: "none" });
  const containerRef = useRef<HTMLDivElement>(null);
  const isReduced = usePrefersReducedMotion();

  // Desktop Hover Magnifier logic
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isReduced) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      display: "block",
      backgroundImage: `url(${images[activeIdx]})`,
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: "200%",
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: "none" });
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Active viewport image panel */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="aspect-square relative overflow-hidden bg-[var(--bg-canvas-alt)] rounded-[var(--radius-md)] border border-[var(--border-hairline)] cursor-zoom-in"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full relative"
            layoutId={activeIdx === 0 ? layoutId : undefined}
          >
            <Image
              src={images[activeIdx]}
              alt={`Active view angle ${activeIdx + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Magnifier Glass overlay pane */}
        <div
          style={zoomStyle}
          className="absolute inset-0 z-30 pointer-events-none bg-no-repeat border border-[var(--border-hairline)] rounded-[var(--radius-md)] hidden md:block"
        />
      </div>

      {/* Thumbnails list snap track */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`relative aspect-square w-16 md:w-20 rounded-[var(--radius-md)] border overflow-hidden snap-start shrink-0 cursor-pointer transition-all ${
                activeIdx === idx ? "border-[var(--ink-900)] ring-1 ring-[var(--ink-900)]" : "border-[var(--border-hairline)] hover:border-[var(--ink-600)]"
              }`}
            >
              <Image src={img} alt={`View angle Thumbnail ${idx + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
