"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils/formatPrice";
import { useAdminProductStore } from "@/lib/store/useAdminProductStore";

export function FlashSale() {
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 23, seconds: 12 });
  const products = useAdminProductStore((state) => state.products);
  const saleProducts = products.filter((p) => p.compareAtPrice !== undefined).slice(0, 10);

  // Timer Tick
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-ink-900 text-white overflow-hidden border-b border-black">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left text info */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <span className="text-xs font-black tracking-widest text-accent-coral uppercase">
            Limited Flash Event
          </span>
          <h2 className="text-grotesk text-4xl md:text-5xl font-black uppercase tracking-tight leading-none">
            AETHER FLASH
            <br />
            UP TO 30% OFF
          </h2>
          <p className="text-sm text-ink-300 max-w-sm">
            High fidelity products at promotional rates. Mutates hourly. Complete checkout before tick resets.
          </p>

          {/* Countdown ticking clock with Sliding digits styling */}
          <div className="flex gap-4 items-center mt-2">
            {[
              { label: "HRS", val: timeLeft.hours },
              { label: "MIN", val: timeLeft.minutes },
              { label: "SEC", val: timeLeft.seconds },
            ].map((digitGroup, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="h-16 w-16 bg-white/5 border border-white/10 rounded-[var(--radius-md)] flex items-center justify-center text-2xl font-black text-accent-coral font-mono tabular-nums overflow-hidden relative">
                  <span className="digit-roll">
                    {String(digitGroup.val).padStart(2, "0")}
                  </span>
                </div>
                <span className="text-[10px] font-bold text-ink-300 mt-2 tracking-widest">
                  {digitGroup.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right sliding loop marquee track */}
        <div className="lg:col-span-7 overflow-hidden relative py-6">
          {/* Faders */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink-900 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink-900 to-transparent z-10 pointer-events-none" />

          {/* Marquee Track */}
          <div className="flex gap-4 animate-marquee hover-pause-marquee cursor-pointer">
            {/* Render twice for loop */}
            {[...saleProducts, ...saleProducts].map((item, idx) => (
              <Link
                key={idx}
                href={`/product/${item.slug}`}
                className="shrink-0 w-44 bg-neutral-900 border border-neutral-800 p-3 rounded-[var(--radius-md)] hover:bg-neutral-800 hover:border-neutral-700 transition-all flex flex-col gap-3 group"
              >
                <div className="aspect-square relative rounded-[var(--radius-md)] overflow-hidden bg-white/5">
                  <Image
                    src={item.images[0]}
                    alt={item.name}
                    fill
                    sizes="150px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 bg-[var(--accent-coral)] text-white text-[8px] font-extrabold px-1.5 py-0.5 rounded-full">
                    SALE
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-bold line-clamp-1 group-hover:text-[var(--accent-lime)] transition-colors">
                    {item.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-black text-white">
                      {formatPrice(item.price)}
                    </span>
                    {item.compareAtPrice && (
                      <span className="text-[10px] text-white/40 line-through">
                        {formatPrice(item.compareAtPrice)}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
