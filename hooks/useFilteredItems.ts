"use client";

import { getActiveItems } from "@/lib/server-actions/item";
import { Listing } from "@/types/Listing";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useFoodCategory } from "./useFoodCategory";
import { LocationPoint } from "@/types/Location";

export function useFilteredItems() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  const searchQuery = searchParams.get("query") ?? "";
  const filterFoodCategory = searchParams.get("filterFoodCategory") ?? "0";

  const { foodCategory } = useFoodCategory();

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
    return listings.filter(
      (listing) =>
        listing.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (Number(filterFoodCategory) != 0
          ? listing.food_id == Number(filterFoodCategory)
          : true) &&
        (selectedLocation
          ? selectedLocation?.lng == listing.location.lng &&
            selectedLocation?.lat == listing.location.lat
          : true)
    );
  }, [listings, searchQuery, filterFoodCategory, selectedLocation]);

  return {
    loading,
    listings,
    filteredListings,
    searchQuery,
    filterFoodCategory,
    foodCategory,
    selectedLocation,
    setSelectedLocation,
  };
}
