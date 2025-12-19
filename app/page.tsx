"use client";

import { useFoodCategory } from "@/hooks/useFoodCategory";
import { Suspense } from "react";
import AvailableFoodPickups from "@/components/AvailableFoodPickups";
import AvailableFoodPickupsLoadingSkeleton from "@/components/AvailableFoodPickupsLoadingSkeleton";
import SearchBar from "@/components/SearchBar";
import SearchBarLoadingSkeleton from "@/components/SearchBarLoadingSkeleton";

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="bg-linear-to-b from-primary/10 to-background border-b border-border">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance">
              Share Food, <span className="text-primary">Reduce Waste</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground text-pretty">
              Connect with your community to share surplus food and help reduce
              food waste. Browse available pickups or share your own.
            </p>

            {/* Search Bar */}
            <Suspense fallback={<SearchBarLoadingSkeleton />}>
              <SearchBar />
            </Suspense>
          </div>
        </div>
      </section>
      <Suspense fallback={<AvailableFoodPickupsLoadingSkeleton />}>
        <AvailableFoodPickups />
      </Suspense>
    </div>
  );
}
