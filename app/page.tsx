"use client";

import { useEffect, useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { getItems } from "@/lib/server-actions/item";
import { Item } from "@/db/schema";
import { InferModel } from "drizzle-orm";

type ItemType = InferModel<typeof Item>;

export default function HomePage() {
  const [listings, setListings] = useState<ItemType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredListings = useMemo(() => {
    return listings.filter(
      (listing) => true
      // listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      // listing.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      // listing.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [listings, searchQuery]);

  useEffect(() => {
    async function fetchListings() {
      const res = await getItems();
      if (res.status) {
        setListings(res?.data ?? []);
      }
    }

    fetchListings();
  }, []);

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

      {/* Listings Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Available Food Pickups
          </h2>
          <p className="text-muted-foreground">
            {filteredListings.length !== 0 && (
              <>
                {filteredListings.length}{" "}
                {filteredListings.length === 1 ? "listing" : "listings"}{" "}
                available
              </>
            )}
          </p>
        </div>

        {filteredListings.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">
              {searchQuery
                ? "No listings match your search."
                : "No food listings available yet."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((l) => {
              return <p key={l.id}>{l.title}</p>;
            })}
          </div>
        )}
      </section>
    </div>
  );
}
