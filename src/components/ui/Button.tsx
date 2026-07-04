import * as React from "react";
import { cn } from "@/lib/utils/cn";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "lime" | "coral";
  size?: "sm" | "md" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-md)] text-sm font-semibold transition-all duration-300 active:scale-98 disabled:pointer-events-none disabled:opacity-50 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink-900)]",
          {
            // Primary matches neutral theme
            "bg-[var(--ink-900)] text-white hover:bg-[var(--ink-600)]": variant === "primary",
            "bg-[var(--bg-canvas-alt)] text-[var(--ink-900)] hover:bg-[var(--ink-300)]": variant === "secondary",
            "border border-[var(--border-hairline)] bg-transparent hover:bg-[var(--bg-canvas-alt)]": variant === "outline",
            "hover:bg-[var(--bg-canvas-alt)] text-[var(--ink-900)]": variant === "ghost",
            // Lime accent CTA
            "bg-[var(--accent-lime)] text-[var(--ink-900)] hover:shadow-lg hover:shadow-[rgba(215,254,62,0.3)] hover:-translate-y-0.5 active:translate-y-0": variant === "lime",
            // Coral alert
            "bg-[var(--accent-coral)] text-white hover:shadow-lg hover:shadow-[rgba(255,90,60,0.3)] hover:-translate-y-0.5 active:translate-y-0": variant === "coral",
          },
          {
            "h-9 px-3 rounded-[var(--radius-md)] text-xs": size === "sm",
            "h-11 px-5 rounded-[var(--radius-md)]": size === "md",
            "h-14 px-8 rounded-[var(--radius-lg)] text-base": size === "lg",
            "h-10 w-10 p-0 rounded-full": size === "icon",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
