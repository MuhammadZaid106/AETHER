"use client";

import { useState } from "react";
import { Star, ThumbsUp } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Cell } from "recharts";
import { Badge } from "../ui/Badge";

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewListProps {
  productId: string;
  reviews: Review[];
  rating: number;
  reviewCount: number;
}

export function ReviewList({ productId, reviews, rating, reviewCount }: ReviewListProps) {
  const [helpfulCounts, setHelpfulCounts] = useState<Record<string, number>>({});
  const [upvoted, setUpvoted] = useState<Record<string, boolean>>({});

  const handleHelpful = (id: string) => {
    if (upvoted[id]) return;
    setHelpfulCounts((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    setUpvoted((prev) => ({ ...prev, [id]: true }));
  };

  // Recharts ratings distribution breakdown data
  const data = [
    { stars: "5 Stars", count: 140 },
    { stars: "4 Stars", count: 65 },
    { stars: "3 Stars", count: 20 },
    { stars: "2 Stars", count: 8 },
    { stars: "1 Star", count: 2 },
  ];

  return (
    <div className="flex flex-col gap-12 border-t border-[var(--border-hairline)] pt-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Stats Dashboard Column */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <h3 className="text-grotesk text-xl font-black uppercase tracking-tight text-[var(--ink-900)]">
            Ratings Distribution
          </h3>

          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-black text-[var(--ink-900)] font-mono">{rating}</span>
            <span className="text-sm font-bold text-[var(--ink-600)]">out of 5.0</span>
          </div>

          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(rating)
                    ? "fill-[var(--accent-lime)] stroke-[var(--accent-lime)]"
                    : "stroke-[var(--ink-300)]"
                }`}
              />
            ))}
          </div>

          <span className="text-xs font-bold text-[var(--ink-600)]">
            Based on {reviewCount} verified purchases
          </span>

          {/* Recharts chart bar widget */}
          <div className="h-44 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} layout="vertical" margin={{ left: -10, right: 10, top: 0, bottom: 0 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="stars" type="category" stroke="var(--ink-600)" fontSize={10} width={60} axisLine={false} tickLine={false} />
                <Bar dataKey="count" fill="var(--ink-900)" radius={[0, 4, 4, 0]}>
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index === 0 ? "var(--ink-900)" : "var(--ink-600)"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right review list cards column */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <h3 className="text-grotesk text-xl font-black uppercase tracking-tight text-[var(--ink-900)]">
            Customer Reviews
          </h3>

          <div className="flex flex-col gap-6">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white border border-[var(--border-hairline)] p-6 rounded-[var(--radius-md)] flex flex-col gap-4 shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-extrabold text-sm text-[var(--ink-900)]">{rev.userName}</h4>
                    <span className="text-[10px] text-[var(--ink-600)] font-semibold uppercase tracking-wider">
                      Verified coordinate · {new Date(rev.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[var(--accent-lime)] stroke-[var(--accent-lime)]" />
                    ))}
                  </div>
                </div>

                <p className="text-sm text-[var(--ink-900)] leading-relaxed italic">
                  "{rev.comment}"
                </p>

                <div className="flex items-center justify-between border-t border-[var(--border-hairline)] pt-4 mt-2">
                  <button
                    onClick={() => handleHelpful(rev.id)}
                    disabled={upvoted[rev.id]}
                    className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest cursor-pointer ${
                      upvoted[rev.id] ? "text-emerald-600" : "text-[var(--ink-600)] hover:text-black"
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    Helpful ({helpfulCounts[rev.id] || 0})
                  </button>
                  <Badge variant="outline" className="text-[9px] uppercase tracking-wider font-extrabold">
                    Purchase Verified
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
