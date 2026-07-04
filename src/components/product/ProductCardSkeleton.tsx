import { Skeleton } from "../ui/Skeleton";

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-[var(--radius-md)] border border-[var(--border-hairline)] overflow-hidden flex flex-col h-full p-0">
      {/* Image frame skeleton */}
      <Skeleton className="aspect-square w-full rounded-t-[var(--radius-md)]" />

      {/* Info Block skeleton */}
      <div className="p-5 flex flex-col gap-3 flex-grow justify-between">
        <div className="flex flex-col gap-2">
          {/* Category */}
          <Skeleton className="h-3 w-16" />
          {/* Title */}
          <Skeleton className="h-4.5 w-4/5" />
          {/* Rating */}
          <Skeleton className="h-3 w-24" />
        </div>

        {/* Pricing line */}
        <div className="flex items-center justify-between border-t border-[var(--border-hairline)] pt-3">
          <div className="flex gap-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-3.5 w-12" />
          </div>
          {/* Mobile add btn skeleton */}
          <Skeleton className="h-8 w-8 rounded-full md:hidden" />
        </div>
      </div>
    </div>
  );
}
