import { getActiveItems } from "@/lib/server-actions/item";
import { Listing } from "@/types/Listing";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export function useFilteredItems() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  const searchQuery = searchParams.get("query") ?? "";
  const filterFoodCategory = searchParams.get("filterFoodCategory") ?? "0";

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState<Listing[]>([]);

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
          : true)
    );
  }, [listings, searchQuery, filterFoodCategory]);

  return { loading, filteredListings, searchQuery, filterFoodCategory };
}
