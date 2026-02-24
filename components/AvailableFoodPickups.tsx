"use client";

import { useState, useEffect } from "react";
import { FoodCard } from "@/components/FoodCard";
import { useFilteredItems } from "@/hooks/useFilteredItems";
import { useQueryState, parseAsString } from "nuqs";
import AvailableFoodPickupsLoadingSkeleton from "./AvailableFoodPickupsLoadingSkeleton";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function AvailableFoodPickups() {
  const { loading, filteredListings } = useFilteredItems();

  const [searchQuery] = useQueryState(
    "query",
    parseAsString.withDefault("").withOptions({ shallow: false }),
  );

  // 👇 koliko itema prikazujemo
  const [visibleCount, setVisibleCount] = useState(10);

  // 👇 resetiraj na 10 kad se promijeni search
  useEffect(() => {
    setVisibleCount(10);
  }, [searchQuery]);

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          Available Food Pickups
        </h2>
        <p className="text-muted-foreground">
          {!loading && filteredListings.length !== 0 && (
            <>
              {filteredListings.length}{" "}
              {filteredListings.length === 1 ? "listing" : "listings"} available
            </>
          )}
        </p>
      </div>

      {loading && <AvailableFoodPickupsLoadingSkeleton />}

      {!loading && filteredListings.length === 0 && (
        <div className="flex flex-col items-center justify-center text-center py-20 bg-muted/30 rounded-2xl">
          <Image
            src="/empty-food.png"
            alt="No food available"
            width={160}
            height={160}
            className="mb-6 opacity-80"
          />
          <h3 className="text-xl font-semibold mb-2">
            {searchQuery ? "No Results Found" : "No Food Available Yet"}
          </h3>

          <p className="text-muted-foreground max-w-md">
            {searchQuery
              ? "Try adjusting your search or category filter to find available food pickups."
              : "There are currently no food listings available. Please check back later or be the first to post one!"}
          </p>
        </div>
      )}

      {!loading && filteredListings.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings
              .slice(0, visibleCount)
              .map((listing) => (
                <FoodCard key={listing.id} item={listing} />
              ))}
          </div>

          {visibleCount < filteredListings.length && (
            <div className="flex justify-center mt-10">
              <Button
                onClick={() => setVisibleCount((prev) => prev + 10)}
                variant="outline"
              >
                Load more
              </Button>
            </div>
          )}
        </>
      )}
    </section>
  );
}