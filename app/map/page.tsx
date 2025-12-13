"use client";

import { useEffect, useState } from "react";
import Map from "../../components/Map";
import { useFilteredItems } from "@/hooks/useFilteredItems";
import { FoodCard } from "@/components/FoodCard";
import MapLoadingSkeleton from "@/components/MapLoadingSkeleton";
import ListingsLoadingSkeleton from "@/components/ListingsLoadingSkeleton";
import { useMapItems } from "@/hooks/useMapItems";

export default function MapPage() {
  const { filteredListings, loading, selectedLocation, setSelectedLocation } =
    useMapItems();

  if ((true && loading) || !filteredListings) {
    return (
      <div className="relative w-full min-h-screen flex flex-row gap-4 p-4">
        <MapLoadingSkeleton />
        <ListingsLoadingSkeleton />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex flex-row gap-4 p-4">
      <div className=" h-[90vh] flex-1 relative bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg border-2 border-green-200 dark:border-green-800 overflow-hidden">
        <Map
          listings={filteredListings}
          setSelectedLocation={setSelectedLocation}
          selectedLocation={selectedLocation}
        />

        <div className="absolute top-4 right-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-3 space-y-2 text-sm">
          <div className="font-semibold text-gray-900 dark:text-gray-100">
            Map Legend
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500" />
            <span className="text-gray-600 dark:text-gray-400">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-orange-500" />
            <span className="text-gray-600 dark:text-gray-400">Selected</span>
          </div>
        </div>
      </div>

      {!loading && filteredListings.length > 0 && (
        <div className="w-full lg:w-100 hidden lg:block space-y-3 overflow-y-auto max-h-[calc(100vh-8rem)]">
          <h2 className="text-lg font-semibold sticky top-0 bg-background py-2">
            Available Pickups
          </h2>
          {filteredListings.map((listing) => (
            <FoodCard key={listing.id} item={listing} />
          ))}
        </div>
      )}
      {selectedLocation && (
        <div className="relative w-full min-h-screen p-4 lg:hidden">
          <button
            onClick={() => setSelectedLocation(null)}
            className="mb-4 px-3 py-1 rounded bg-green-600 text-white"
          >
            Back to map
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing) => (
              <FoodCard key={listing.id} item={listing} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
