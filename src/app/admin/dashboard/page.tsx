"use client";

import { StatCard } from "@/components/admin/StatCard";
import { RevenueChart } from "@/components/admin/RevenueChart";
import { DollarSign, ShoppingBag, Percent, ArrowUpRight } from "lucide-react";
import { useAdminProductStore } from "@/lib/store/useAdminProductStore";
import ordersData from "@/data/orders.json";

export default function DashboardPage() {
  const products = useAdminProductStore((state) => state.products);

  // Calculate some analytics metrics
  const totalRevenue = ordersData.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = ordersData.length;
  const avgOrderVal = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  return (
    <div className="flex flex-col gap-8">
      {/* Title */}
      <div>
        <span className="text-xs font-black tracking-widest text-[var(--ink-600)] uppercase">
          Overview
        </span>
        <h1 className="text-grotesk text-4xl font-black uppercase tracking-tight text-[var(--ink-900)] mt-1">
          ANALYTICS DASHBOARD
        </h1>
      </div>

      {/* Stats Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={DollarSign}
          label="Total Revenue"
          value={totalRevenue}
          prefix="$"
          change="+18.4%"
          isPositive={true}
        />
        <StatCard
          icon={ShoppingBag}
          label="Total Orders"
          value={totalOrders}
          change="+12.5%"
          isPositive={true}
        />
        <StatCard
          icon={Percent}
          label="Avg. Order Value"
          value={avgOrderVal}
          prefix="$"
          decimals={2}
          change="-2.1%"
          isPositive={false}
        />
      </div>

      {/* Charts segment */}
      <div className="grid grid-cols-1 gap-6">
        <RevenueChart />
      </div>
    </div>
  );
}
