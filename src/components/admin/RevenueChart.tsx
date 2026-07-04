"use client";

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

const data = [
  { name: "Mon", revenue: 2400 },
  { name: "Tue", revenue: 3200 },
  { name: "Wed", revenue: 1800 },
  { name: "Thu", revenue: 4500 },
  { name: "Fri", revenue: 6000 },
  { name: "Sat", revenue: 7500 },
  { name: "Sun", revenue: 9000 },
];

export function RevenueChart() {
  return (
    <div className="bg-white border border-[var(--border-hairline)] rounded-[var(--radius-lg)] p-8 shadow-sm flex flex-col gap-6 w-full">
      <div>
        <span className="text-[10px] font-black uppercase tracking-widest text-[var(--ink-600)]">
          Financials
        </span>
        <h3 className="text-grotesk text-xl font-black uppercase tracking-tight text-[var(--ink-900)] mt-1">
          Revenue Index Over Time
        </h3>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--accent-lime)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="var(--accent-lime)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" stroke="var(--ink-600)" fontSize={10} axisLine={false} tickLine={false} />
            <YAxis stroke="var(--ink-600)" fontSize={10} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                background: "var(--surface-card)",
                color: "var(--ink-900)",
                border: "1px solid var(--border-hairline)",
                borderRadius: "var(--radius-md)",
                fontSize: 12,
              }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="var(--ink-900)"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#revenueGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
