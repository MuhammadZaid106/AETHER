"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LayoutDashboard, ShoppingBag, ClipboardList, Store, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const sidebarLinks = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: ShoppingBag },
  { label: "Orders", href: "/admin/orders", icon: ClipboardList },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const NavLinks = ({ onLinkClick }: { onLinkClick?: () => void }) => (
    <>
      {sidebarLinks.map((link) => {
        const isActive = pathname === link.href;
        const Icon = link.icon;
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onLinkClick}
            className={`flex items-center gap-3 px-4 py-3 rounded-[var(--radius-md)] text-xs font-black uppercase tracking-wider relative transition-colors ${
              isActive
                ? "text-[var(--ink-900)]"
                : "text-[var(--ink-600)] hover:text-black hover:bg-[var(--bg-canvas)]"
            }`}
          >
            <Icon className="w-4.5 h-4.5" />
            <span>{link.label}</span>
            {isActive && (
              <motion.div
                layoutId="activeAdminLinkBg"
                className="absolute inset-0 bg-[var(--accent-lime)] -z-10 rounded-[var(--radius-md)]"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </Link>
        );
      })}
    </>
  );

  return (
    <div className="flex min-h-screen bg-[var(--bg-canvas)]">
      {/* ── Desktop Sidebar ── */}
      <aside className="hidden md:flex w-64 border-r border-[var(--border-hairline)] bg-white flex-col justify-between p-6 shrink-0">
        <div className="flex flex-col gap-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-full bg-[var(--ink-900)] text-white flex items-center justify-center text-lg font-black">
              Æ
            </span>
            <span className="font-black uppercase text-sm tracking-tight">
              Aether Admin
            </span>
          </Link>
          <nav className="flex flex-col gap-2">
            <NavLinks />
          </nav>
        </div>
        <div className="flex flex-col gap-2 pt-6 border-t border-[var(--border-hairline)]">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 text-xs font-black uppercase tracking-wider text-[var(--ink-600)] hover:text-black rounded-[var(--radius-md)]"
          >
            <Store className="w-4.5 h-4.5" />
            <span>Storefront</span>
          </Link>
        </div>
      </aside>

      {/* ── Mobile Header Bar ── */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-[var(--border-hairline)] flex items-center justify-between px-4 h-14">
        <Link href="/" className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-[var(--ink-900)] text-white flex items-center justify-center text-sm font-black">
            Æ
          </span>
          <span className="font-black uppercase text-xs tracking-tight text-[var(--ink-900)]">
            Aether Admin
          </span>
        </Link>
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-[var(--radius-md)] hover:bg-[var(--bg-canvas)] text-[var(--ink-900)]"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* ── Mobile Slide-out Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="md:hidden fixed inset-0 z-50 bg-black/40"
            />
            {/* Drawer panel */}
            <motion.aside
              key="drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="md:hidden fixed left-0 top-0 bottom-0 z-50 w-72 bg-white border-r border-[var(--border-hairline)] flex flex-col justify-between p-6"
            >
              <div className="flex flex-col gap-8">
                <div className="flex items-center justify-between">
                  <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                    <span className="w-9 h-9 rounded-full bg-[var(--ink-900)] text-white flex items-center justify-center text-lg font-black">
                      Æ
                    </span>
                    <span className="font-black uppercase text-sm tracking-tight text-[var(--ink-900)]">
                      Aether Admin
                    </span>
                  </Link>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="p-2 rounded-[var(--radius-md)] hover:bg-[var(--bg-canvas)]"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5 text-[var(--ink-900)]" />
                  </button>
                </div>
                <nav className="flex flex-col gap-2">
                  <NavLinks onLinkClick={() => setMobileOpen(false)} />
                </nav>
              </div>
              <div className="flex flex-col gap-2 pt-6 border-t border-[var(--border-hairline)]">
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-xs font-black uppercase tracking-wider text-[var(--ink-600)] hover:text-black rounded-[var(--radius-md)]"
                >
                  <Store className="w-4.5 h-4.5" />
                  <span>Storefront</span>
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── Main Content ── */}
      <main className="flex-grow p-4 sm:p-6 md:p-10 overflow-y-auto mt-14 md:mt-0">
        {children}
      </main>
    </div>
  );
}
