import { cn } from "@/lib/utils/cn";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "lime" | "coral" | "outline";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors duration-200 border border-transparent",
        {
          "bg-[var(--ink-900)] text-white": variant === "default",
          "bg-[var(--bg-canvas-alt)] text-[var(--ink-900)]": variant === "secondary",
          "bg-[var(--accent-lime)] text-[var(--ink-900)]": variant === "lime",
          "bg-[var(--accent-coral)] text-white": variant === "coral",
          "border-[var(--border-hairline)] text-[var(--ink-600)]": variant === "outline",
        },
        className
      )}
      {...props}
    />
  );
}
