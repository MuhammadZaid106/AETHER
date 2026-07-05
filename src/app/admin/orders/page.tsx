"use client";

import { Fragment, useState } from "react";
import { useAdminProductStore } from "@/lib/store/useAdminProductStore";
import ordersData from "@/data/orders.json";
import { formatPrice } from "@/lib/utils/formatPrice";
import { Badge } from "@/components/ui/Badge";
import { ChevronDown, ChevronUp, Search, ClipboardList } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function AdminOrdersPage() {
  const [query, setQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Search orders (by name or status)
  const filteredOrders = ordersData.filter(
    (o) =>
      o.customer.name.toLowerCase().includes(query.toLowerCase()) ||
      o.id.toLowerCase().includes(query.toLowerCase())
  );

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      {/* Header title */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2">
        <div>
          <span className="text-xs font-black tracking-widest text-[var(--ink-600)] uppercase">
            Order Index
          </span>
          <h1 className="text-grotesk text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-[var(--ink-900)] mt-1">
            PURCHASE DISPATCHES
          </h1>
        </div>
      </div>

      {/* Main orders visual database table card */}
      <div className="bg-white border border-[var(--border-hairline)] rounded-[var(--radius-lg)] p-4 sm:p-6 md:p-8 shadow-sm flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b pb-4 sm:pb-6">
          <h3 className="text-grotesk text-lg sm:text-xl font-black uppercase tracking-tight text-[var(--ink-900)]">
            Incoming dispatches
          </h3>

          <div className="flex items-center gap-2 border border-[var(--border-hairline)] px-3 py-2 bg-[var(--bg-canvas)] rounded-[var(--radius-md)] w-full sm:max-w-xs focus-within:border-black transition-colors">
            <Search className="w-4.5 h-4.5 text-[var(--ink-600)] shrink-0" />
            <input
              type="text"
              placeholder="Search ID or client..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-xs w-full text-[var(--ink-900)]"
            />
          </div>
        </div>

        {/* Dispatch Order Table */}
        <div className="overflow-x-auto w-full -mx-1 px-1">
          <table className="w-full text-left border-collapse min-w-[480px]">
            <thead>
              <tr className="border-b border-[var(--border-hairline)] text-[10px] font-black uppercase tracking-widest text-[var(--ink-600)]">
                <th className="py-3 pr-3">Order ID</th>
                <th className="py-3 pr-3">Customer</th>
                <th className="py-3 pr-3 hidden sm:table-cell">Date</th>
                <th className="py-3 pr-3 hidden xs:table-cell">Status</th>
                <th className="py-3 pr-3">Total</th>
                <th className="py-3 text-right">Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => {
                const isExpanded = expandedId === order.id;

                return (
                  <Fragment key={order.id}>
                    <tr
                      className="border-b border-[var(--border-hairline)] hover:bg-[var(--bg-canvas)] transition-colors text-xs font-semibold text-[var(--ink-900)]"
                    >
                      <td className="py-3 pr-3 font-mono font-bold text-[10px] sm:text-xs">{order.id}</td>
                      <td className="py-3 pr-3 max-w-[100px] sm:max-w-none truncate">{order.customer.name}</td>
                      <td className="py-3 pr-3 hidden sm:table-cell">{new Date(order.date).toLocaleDateString()}</td>
                      <td className="py-3 pr-3 hidden xs:table-cell">
                        <Badge
                          variant={
                            order.status === "Delivered"
                              ? "lime"
                              : order.status === "Processing"
                              ? "outline"
                              : "coral"
                          }
                          className="text-[8px] py-0 px-1.5 font-bold uppercase"
                        >
                          {order.status}
                        </Badge>
                      </td>
                      <td className="py-3 pr-3 font-mono">{formatPrice(order.total)}</td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => toggleExpand(order.id)}
                          className="p-2 border border-[var(--border-hairline)] rounded-[var(--radius-md)] hover:bg-[var(--accent-lime)] text-[var(--ink-900)] cursor-pointer transition-colors inline-flex items-center gap-1.5"
                        >
                          {isExpanded ? (
                            <ChevronUp className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </td>
                    </tr>

                    {/* Collapsible expandable row */}
                    {isExpanded && (
                      <tr>
                        <td colSpan={6} className="bg-[var(--bg-canvas)] p-3 sm:p-6 border-b">
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="flex flex-col gap-4 text-xs"
                          >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 border-b pb-4">
                              <div>
                                <h5 className="font-bold text-[var(--ink-600)] uppercase tracking-wider mb-2">Shipping Coordinates</h5>
                                <p>{order.customer.address}</p>
                                <p>{order.customer.city}, {order.customer.state} {order.customer.zip}</p>
                                <p>{order.customer.country}</p>
                              </div>
                              <div>
                                <h5 className="font-bold text-[var(--ink-600)] uppercase tracking-wider mb-2">Client Connection</h5>
                                <p>Email: {order.customer.email}</p>
                                <p>Phone: {order.customer.phone}</p>
                              </div>
                            </div>

                            <div>
                              <h5 className="font-bold text-[var(--ink-600)] uppercase tracking-wider mb-2">Ordered Items</h5>
                              <div className="flex flex-col gap-2 bg-white p-3 sm:p-4 rounded-[var(--radius-md)] border">
                                {order.items.map((item, idx) => (
                                  <div key={idx} className="flex justify-between font-semibold gap-2">
                                    <span className="truncate">{item.name} (x{item.qty}) · <span className="text-[10px] text-[var(--ink-600)]">{item.variant}</span></span>
                                    <span className="font-mono shrink-0">{formatPrice(item.price)}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

