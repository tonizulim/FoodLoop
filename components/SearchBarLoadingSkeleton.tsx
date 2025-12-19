"use client";

import { Loader2 } from "lucide-react";
export default function SearchBarLoadingSkeleton() {
  return (
    <div className="relative max-w-xl mx-auto mt-4 flex flex-col md:flex-row gap-2 animate-pulse">
      {/* Search Input Skeleton */}
      <div className="flex-1 relative">
        <div className="h-12 w-full rounded-md bg-muted" />
        <Loader2 className="absolute left-3 top-3 h-5 w-5 text-muted-foreground animate-spin" />
      </div>

      {/* Select Skeleton */}
      <div className="w-full md:w-52">
        <div className="h-12 w-full rounded-md bg-muted" />
      </div>
    </div>
  );
}
