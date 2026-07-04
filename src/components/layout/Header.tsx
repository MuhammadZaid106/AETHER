"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { Search, ShoppingBag, Heart, Menu, User, Settings } from "lucide-react";
import { useCartStore } from "@/lib/store/useCartStore";
import { useWishlistStore } from "@/lib/store/useWishlistStore";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { MegaMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";
import { CartDrawer } from "../cart/CartDrawer";
import { SearchOverlay } from "../search/SearchOverlay";

export function Header() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { scrollY } = useScroll();
  const isReduced = usePrefersReducedMotion();

  // Cart & Wishlist state
  const cartItems = useCartStore((state) => state.items);
  const totalCartQty = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const wishlistCount = useWishlistStore((state) => state.productIds.length);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      if (!isReduced) setHidden(true);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 50);
  });

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 h-20 transition-colors duration-300 ${
          scrolled
            ? "bg-[rgba(246,245,242,0.8)] backdrop-blur-lg border-b border-[var(--border-hairline)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="w-10 h-10 rounded-full bg-[var(--ink-900)] text-white flex items-center justify-center text-grotesk text-xl font-extrabold transition-transform group-hover:scale-105">
              Æ
            </span>
            <span className="text-grotesk text-xl font-black tracking-tight uppercase hidden md:inline-block">
              Aether Market
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              href="/shop"
              className="text-sm font-semibold hover:text-[var(--ink-600)] transition-colors"
            >
              Shop All
            </Link>
            <div className="relative group/menu">
              <span className="text-sm font-semibold hover:text-[var(--ink-600)] transition-colors cursor-pointer py-8">
                Categories
              </span>
              <MegaMenu />
            </div>
            <Link
              href="/admin"
              className="text-sm font-semibold flex items-center gap-1.5 text-[var(--ink-600)] hover:text-[var(--ink-900)] transition-colors"
            >
              <Settings className="w-4 h-4" />
              Admin
            </Link>
          </nav>

          {/* Action Row */}
          <div className="flex items-center gap-4">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2.5 rounded-full hover:bg-[var(--bg-canvas-alt)] transition-colors cursor-pointer"
              aria-label="Search Catalog"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Account Icon (Desktop) */}
            <Link
              href="/admin/dashboard"
              className="p-2.5 rounded-full hover:bg-[var(--bg-canvas-alt)] transition-colors cursor-pointer hidden md:inline-block"
              aria-label="Account / Dashboard"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Wishlist Link */}
            <Link
              href="/wishlist"
              className="p-2.5 rounded-full hover:bg-[var(--bg-canvas-alt)] transition-colors cursor-pointer relative"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-[var(--accent-coral)] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Trigger */}
            <button
              id="global-cart-btn"
              onClick={() => setIsCartOpen(true)}
              className="p-2.5 rounded-full hover:bg-[var(--bg-canvas-alt)] transition-colors cursor-pointer relative"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartQty > 0 && (
                <motion.span
                  key={totalCartQty}
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: [0.6, 1.25, 1], opacity: 1 }}
                  className="absolute top-0.5 right-0.5 w-4.5 h-4.5 bg-[var(--accent-lime)] text-[var(--ink-900)] text-[10px] font-black rounded-full flex items-center justify-center"
                >
                  {totalCartQty}
                </motion.span>
              )}
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2.5 rounded-full hover:bg-[var(--bg-canvas-alt)] transition-colors cursor-pointer lg:hidden"
              aria-label="Open Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Overlay Interfaces */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu onClose={() => setIsMobileMenuOpen(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCartOpen && <CartDrawer onClose={() => setIsCartOpen(false)} />}
      </AnimatePresence>

      <AnimatePresence>
        {isSearchOpen && (
          <SearchOverlay onClose={() => setIsSearchOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
