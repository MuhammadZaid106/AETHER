"use client";

import { useInViewOnce } from "@/hooks/useInViewOnce";
import { Counter } from "../interactive/Counter";
import { Badge } from "../ui/Badge";
import { motion } from "framer-motion";
import { ArrowUpRight, LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  change: string;
  isPositive?: boolean;
}

export function StatCard({
  icon: Icon,
  label,
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  change,
  isPositive = true,
}: StatCardProps) {
  const [ref, inView] = useInViewOnce();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 15 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4 }}
      className="bg-white border border-[var(--border-hairline)] rounded-[var(--radius-md)] p-6 flex flex-col justify-between h-40 shadow-sm"
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[var(--bg-canvas)] border border-[var(--border-hairline)] flex items-center justify-center">
            <Icon className="w-4.5 h-4.5 text-[var(--ink-900)]" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[var(--ink-600)]">
            {label}
          </span>
        </div>

        <Badge
          variant={isPositive ? "lime" : "coral"}
          className="text-[8px] py-0 px-1.5 uppercase font-bold tracking-wider"
        >
          {change}
        </Badge>
      </div>

      <div className="mt-4">
        <div className="text-3xl font-black font-mono text-[var(--ink-900)] tracking-tight leading-none">
          <Counter value={value} prefix={prefix} suffix={suffix} decimals={decimals} />
        </div>
      </div>
    </motion.div>
  );
}
