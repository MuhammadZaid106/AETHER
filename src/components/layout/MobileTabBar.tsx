"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ShoppingBag, Heart, Search, Settings } from "lucide-react";
import { useCartStore } from "@/lib/store/useCartStore";
import { useWishlistStore } from "@/lib/store/useWishlistStore";

export function MobileTabBar() {
  const pathname = usePathname();
  const cartItems = useCartStore((state) => state.items);
  const totalCartQty = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const wishlistCount = useWishlistStore((state) => state.productIds.length);

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Shop", href: "/shop", icon: ShoppingBag },
    {
      label: "Wishlist",
      href: "/wishlist",
      icon: Heart,
      badge: wishlistCount,
    },
    {
      label: "Cart",
      href: "/cart",
      icon: ShoppingBag,
      badge: totalCartQty,
      isCart: true,
    },
    { label: "Admin", href: "/admin/dashboard", icon: Settings },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-[rgba(246,245,242,0.95)] backdrop-blur-md border-t border-[var(--border-hairline)] z-40 flex items-center justify-around px-4 lg:hidden">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;

        return (
          <Link
            key={item.label}
            href={item.href}
            className="flex flex-col items-center justify-center relative py-1 px-3"
          >
            <motion.div
              whileTap={{ scale: 0.85 }}
              animate={{
                scale: isActive ? 1.15 : 1,
                color: isActive ? "var(--ink-900)" : "var(--ink-600)",
              }}
              className="relative p-1.5"
            >
              <Icon className="w-5 h-5" />
              {item.badge !== undefined && item.badge > 0 && (
                <span
                  className={`absolute -top-1 -right-1 w-4 h-4 text-[9px] font-extrabold rounded-full flex items-center justify-center text-white ${
                    item.isCart ? "bg-[var(--accent-lime)] text-[var(--ink-900)]" : "bg-[var(--accent-coral)]"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </motion.div>
            <span
              className={`text-[9px] font-bold ${
                isActive ? "text-[var(--ink-900)]" : "text-[var(--ink-600)]"
              }`}
            >
              {item.label}
            </span>
            {isActive && (
              <motion.div
                layoutId="activeTabDot"
                className="absolute bottom-0 w-1 h-1 rounded-full bg-[var(--accent-lime)]"
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
              />
            )}
          </Link>
        );
      })}
    </div>
  );
}
