"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { FoodCard } from "@/components/FoodCard";
import { useFilteredItems } from "@/hooks/useFilteredItems";

export default function HomePage() {
  const { loading, filteredListings, searchQuery, setSearchQuery } =
    useFilteredItems();

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-background border-b border-border">
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
            <div className="relative max-w-xl mx-auto mt-4">
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground pointer-events-none" />
              <Input
                type="text"
                placeholder="Search for food, location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Available Food Pickups
          </h2>

          <p className="text-muted-foreground">
            {!loading && filteredListings.length !== 0 && (
              <>
                {filteredListings.length}{" "}
                {filteredListings.length === 1 ? "listing" : "listings"}{" "}
                available
              </>
            )}
          </p>
        </div>

        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse p-4 border rounded-xl h-48 bg-muted/30"
              >
                <div className="h-32 w-full bg-muted rounded mb-4"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
              </div>
            ))}
          </div>
        )}

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
    </div>
  );
}
