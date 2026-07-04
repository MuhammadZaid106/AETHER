"use client";

import { motion } from "framer-motion";
import { Counter } from "../interactive/Counter";
import { Badge } from "../ui/Badge";
import { Sparkles, Trophy, ShieldCheck, Zap } from "lucide-react";

const stats = [
  {
    icon: Trophy,
    label: "Awwwards Nominations",
    value: 12,
    suffix: "",
    badge: "Motion Design",
  },
  {
    icon: Zap,
    label: "Hourly Active Orders",
    value: 480,
    suffix: "+",
    badge: "Live Index",
  },
  {
    icon: ShieldCheck,
    label: "Secure Transactions",
    value: 99.9,
    suffix: "%",
    decimals: 1,
    badge: "Verified SSL",
  },
];

export function StatsSection() {
  return (
    <section className="py-24 bg-white border-b border-[var(--border-hairline)]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left copy */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <span className="text-xs font-black tracking-widest text-[var(--ink-600)] uppercase">
            Platform Metrics
          </span>
          <h2 className="text-grotesk text-4xl font-black uppercase tracking-tight leading-none text-[var(--ink-900)]">
            PERFORMANCE
            <br />
            IS A CORE FEATURE
          </h2>
          <p className="text-sm text-[var(--ink-600)] max-w-sm">
            We merge clean aesthetic boundaries with lightning fast performance metrics to set a new standard in e-commerce reliability.
          </p>

          {/* Color swatch row widget (Reference A style sidebar widget) */}
          <div className="bg-[var(--bg-canvas)] border border-[var(--border-hairline)] rounded-[var(--radius-md)] p-4 flex flex-col gap-3 max-w-xs shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-wider text-[var(--ink-600)]">
              Accent Palettes (Reference A)
            </span>
            <div className="flex gap-2">
              <span className="w-6 h-6 rounded-full bg-[var(--accent-lime)] border border-[var(--border-hairline)]" title="Lime CTA Accent" />
              <span className="w-6 h-6 rounded-full bg-[var(--accent-coral)] border border-[var(--border-hairline)]" title="Coral Promo Accent" />
              <span className="w-6 h-6 rounded-full bg-[var(--ink-900)]" title="Ink Canvas" />
              <span className="w-6 h-6 rounded-full bg-[var(--bg-canvas)] border border-[var(--border-hairline)]" title="Warm Off-white" />
            </div>
          </div>
        </div>

        {/* Right side stat cards */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[var(--bg-canvas)] border border-[var(--border-hairline)] p-6 rounded-[var(--radius-md)] flex flex-col justify-between h-48 shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-[var(--border-hairline)]">
                    <Icon className="w-5 h-5 text-[var(--ink-900)]" />
                  </div>
                  <Badge variant="outline" className="text-[9px] uppercase tracking-wider font-extrabold">
                    {stat.badge}
                  </Badge>
                </div>

                <div>
                  <div className="text-3xl font-black text-[var(--ink-900)] font-mono leading-none tracking-tight">
                    <Counter
                      value={stat.value}
                      suffix={stat.suffix}
                      decimals={stat.decimals}
                    />
                  </div>
                  <p className="text-xs font-bold text-[var(--ink-600)] mt-2 uppercase tracking-wide">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
