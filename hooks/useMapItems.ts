"use client";

import { getActiveItems } from "@/lib/server-actions/item";
import { Listing } from "@/types/Listing";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useFoodCategory } from "./useFoodCategory";
import { LocationPoint } from "@/types/Location";

export function useMapItems() {
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState<Listing[]>([]);

  const [selectedLocation, setSelectedLocation] =
    useState<LocationPoint | null>(null);

  async function fetchListings() {
    setLoading(true);
    try {
      const res = await getActiveItems();
      if (res.status) {
        setListings(res?.data ?? []);
      }
      setLoading(false);
      return;
    } catch (err) {}

    setLoading(false);
  }

  useEffect(() => {
    fetchListings();
  }, []);

  const filteredListings = useMemo(() => {
    return listings.filter((listing) =>
      selectedLocation
        ? selectedLocation?.lng == listing.location.lng &&
          selectedLocation?.lat == listing.location.lat
        : true
    );
  }, [listings, selectedLocation]);

  return {
    loading,
    listings,
    filteredListings,
    selectedLocation,
    setSelectedLocation,
  };
}
