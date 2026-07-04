"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const categoriesData = [
  {
    name: "Electronics",
    items: ["Audio", "Wearables", "Computers", "Smart Home"],
    href: "/shop/electronics",
  },
  {
    name: "Fashion",
    items: ["Menswear", "Womenswear", "Accessories", "Footwear"],
    href: "/shop/fashion",
  },
  {
    name: "Beauty",
    items: ["Skincare", "Makeup", "Fragrance", "Haircare"],
    href: "/shop/beauty",
  },
  {
    name: "Home & Living",
    items: ["Furniture", "Decor", "Kitchen", "Bedding"],
    href: "/shop/home-living",
  },
];

export function MegaMenu() {
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 w-screen max-w-5xl bg-white border border-[var(--border-hairline)] shadow-2xl rounded-[var(--radius-lg)] p-8 opacity-0 pointer-events-none group-hover/menu:opacity-100 group-hover/menu:pointer-events-auto transition-all duration-300 transform translate-y-2 group-hover/menu:translate-y-0 z-50 grid grid-cols-5 gap-8">
      {categoriesData.map((cat) => (
        <div key={cat.name} className="flex flex-col gap-4">
          <Link
            href={cat.href}
            className="text-base font-bold text-grotesk tracking-tight text-[var(--ink-900)] hover:text-[var(--ink-600)]"
          >
            {cat.name}
          </Link>
          <ul className="flex flex-col gap-2.5">
            {cat.items.map((item) => (
              <li key={item}>
                <Link
                  href={`${cat.href}?subcategory=${item.toLowerCase()}`}
                  className="text-sm text-[var(--ink-600)] hover:text-[var(--ink-900)] transition-colors"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* Featured Card */}
      <div className="col-span-1 bg-[var(--bg-canvas-alt)] rounded-[var(--radius-md)] p-5 flex flex-col justify-between overflow-hidden relative group/feat">
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(20,20,15,0.4)] to-transparent opacity-60 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80"
          alt="Featured Headphones"
          fill
          sizes="200px"
          className="object-cover transition-transform duration-700 group-hover/feat:scale-105"
        />
        <div className="relative z-20 flex flex-col justify-between h-full text-white">
          <span className="text-[10px] font-bold tracking-widest uppercase bg-white/20 backdrop-blur-sm self-start px-2 py-0.5 rounded-full">
            Featured
          </span>
          <div className="mt-auto">
            <h4 className="text-grotesk font-extrabold text-lg leading-tight mb-2">
              The Sound Edit
            </h4>
            <Link
              href="/product/studio-anc-headphones"
              className="text-xs font-bold flex items-center gap-1 hover:underline"
            >
              Shop Now <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
