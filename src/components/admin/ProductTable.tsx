"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Edit2, Trash2, Search, ArrowUpDown } from "lucide-react";
import { formatPrice } from "@/lib/utils/formatPrice";
import { useAdminProductStore } from "@/lib/store/useAdminProductStore";
import { Badge } from "../ui/Badge";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";

export function ProductTable() {
  const products = useAdminProductStore((state) => state.products);
  const deleteProduct = useAdminProductStore((state) => state.deleteProduct);

  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<"name" | "price" | "stock">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Search logic
  const searchedProducts = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase())
  );

  // Sorting logic
  const sortedProducts = [...searchedProducts].sort((a, b) => {
    let aVal: any = a[sortKey];
    let bVal: any = b[sortKey];

    if (sortOrder === "asc") {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });

  const handleSort = (key: "name" | "price" | "stock") => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Confirm deletion of ${name}?`)) {
      deleteProduct(id);
      toast.success(`Deleted ${name}`);
    }
  };

  return (
    <div className="flex flex-col gap-6 bg-white border border-[var(--border-hairline)] rounded-[var(--radius-lg)] p-8 shadow-sm">
      {/* Search Header Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[var(--border-hairline)] pb-6">
        <h3 className="text-grotesk text-xl font-black uppercase tracking-tight text-[var(--ink-900)]">
          Manage Catalog
        </h3>

        <div className="flex items-center gap-2 border border-[var(--border-hairline)] px-3 py-2 bg-[var(--bg-canvas)] rounded-[var(--radius-md)] w-full sm:max-w-xs focus-within:border-black transition-colors">
          <Search className="w-4.5 h-4.5 text-[var(--ink-600)] shrink-0" />
          <input
            type="text"
            placeholder="Search items..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-xs w-full text-[var(--ink-900)]"
          />
        </div>
      </div>

      {/* Table grid */}
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[var(--border-hairline)] text-[10px] font-black uppercase tracking-widest text-[var(--ink-600)]">
              <th className="py-4">Item</th>
              <th className="py-4 cursor-pointer select-none" onClick={() => handleSort("name")}>
                <span className="flex items-center gap-1">Name <ArrowUpDown className="w-3 h-3" /></span>
              </th>
              <th className="py-4">Category</th>
              <th className="py-4 cursor-pointer select-none" onClick={() => handleSort("price")}>
                <span className="flex items-center gap-1">Price <ArrowUpDown className="w-3 h-3" /></span>
              </th>
              <th className="py-4 cursor-pointer select-none" onClick={() => handleSort("stock")}>
                <span className="flex items-center gap-1">Stock <ArrowUpDown className="w-3 h-3" /></span>
              </th>
              <th className="py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence initial={false}>
              {sortedProducts.map((p) => {
                const isOutOfStock = p.stock === 0;
                const isLowStock = p.stock > 0 && p.stock <= 8;

                return (
                  <motion.tr
                    key={p.id}
                    layout
                    exit={{ opacity: 0, height: 0, overflow: "hidden" }}
                    className="border-b border-[var(--border-hairline)] hover:bg-[var(--bg-canvas)] transition-colors text-xs font-semibold text-[var(--ink-900)]"
                  >
                    {/* Thumbnail */}
                    <td className="py-3">
                      <div className="w-10 h-10 relative rounded-[var(--radius-md)] overflow-hidden bg-[var(--bg-canvas-alt)]">
                        <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                      </div>
                    </td>
                    {/* Name */}
                    <td className="py-3 font-bold max-w-[200px] truncate">{p.name}</td>
                    {/* Category */}
                    <td className="py-3 uppercase text-[10px]">{p.category}</td>
                    {/* Price */}
                    <td className="py-3 font-mono">{formatPrice(p.price)}</td>
                    {/* Stock Status Badge */}
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono">{p.stock}</span>
                        {isOutOfStock ? (
                          <Badge variant="coral" className="text-[8px] py-0 px-1.5 font-bold uppercase">OUT</Badge>
                        ) : isLowStock ? (
                          <Badge variant="coral" className="text-[8px] py-0 px-1.5 font-bold uppercase">LOW</Badge>
                        ) : (
                          <Badge variant="lime" className="text-[8px] py-0 px-1.5 font-bold uppercase">OK</Badge>
                        )}
                      </div>
                    </td>
                    {/* Row Action buttons */}
                    <td className="py-3 text-right">
                      <div className="flex gap-2 justify-end">
                        <Link href={`/admin/products/${p.id}/edit`}>
                          <button className="p-2 border border-[var(--border-hairline)] rounded-[var(--radius-md)] hover:bg-[var(--accent-lime)] text-[var(--ink-900)] cursor-pointer transition-colors">
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDelete(p.id, p.name)}
                          className="p-2 border border-[var(--border-hairline)] rounded-[var(--radius-md)] hover:bg-red-500 hover:text-white text-red-500 cursor-pointer transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}
