"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBag, ClipboardList, Store, LogOut } from "lucide-react";
import { motion } from "framer-motion";

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

  return (
    <div className="flex min-h-screen bg-[var(--bg-canvas)]">
      {/* Sidebar panel */}
      <aside className="w-64 border-r border-[var(--border-hairline)] bg-white flex flex-col justify-between p-6 shrink-0">
        <div className="flex flex-col gap-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-full bg-[var(--ink-900)] text-white flex items-center justify-center text-grotesk text-lg font-black">
              Æ
            </span>
            <span className="text-grotesk font-black uppercase text-sm tracking-tight">
              Aether Admin
            </span>
          </Link>

          <nav className="flex flex-col gap-2">
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-[var(--radius-md)] text-xs font-black uppercase tracking-wider relative transition-colors ${
                    isActive ? "text-[var(--ink-900)]" : "text-[var(--ink-600)] hover:text-black hover:bg-[var(--bg-canvas)]"
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
          </nav>
        </div>

        {/* Footer shortcuts */}
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

      {/* Main viewport panels */}
      <main className="flex-grow p-10 overflow-y-auto">{children}</main>
    </div>
  );
}
