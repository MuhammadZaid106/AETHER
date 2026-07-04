"use client";

import Link from "next/link";
import { ProductTable } from "@/components/admin/ProductTable";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";

export default function AdminProductsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-end justify-between">
        <div>
          <span className="text-xs font-black tracking-widest text-[var(--ink-600)] uppercase">
            Catalog Management
          </span>
          <h1 className="text-grotesk text-4xl font-black uppercase tracking-tight text-[var(--ink-900)] mt-1">
            PRODUCTS LIST
          </h1>
        </div>

        <Link href="/admin/products/new">
          <Button variant="lime" size="sm" className="uppercase font-black tracking-widest text-xs h-10 flex items-center gap-1.5">
            <Plus className="w-4 h-4" /> Add Product
          </Button>
        </Link>
      </div>

      {/* Main product listings table */}
      <ProductTable />
    </div>
  );
}
