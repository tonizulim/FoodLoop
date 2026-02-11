"use client";

import { FoodCard } from "@/components/FoodCard";
import { useFilteredItems } from "@/hooks/useFilteredItems";
import { useQueryState, parseAsString } from "nuqs";
import AvailableFoodPickupsLoadingSkeleton from "./AvailableFoodPickupsLoadingSkeleton";

export default function AvailableFoodPickups() {
  const { loading, filteredListings } = useFilteredItems();

  const [searchQuery] = useQueryState(
    "query",
    parseAsString.withDefault("").withOptions({ shallow: false }),
  );

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

      {true && <AvailableFoodPickupsLoadingSkeleton />}

      {!loading && filteredListings.length === 0 && (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground">
            {searchQuery
              ? "No listings match your search."
              : "No food listings available yet."}
          </p>
        </div>
      )}

      {!loading && filteredListings.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <FoodCard key={listing.id} item={listing} />
          ))}
        </div>
      )}
    </section>
  );
}
