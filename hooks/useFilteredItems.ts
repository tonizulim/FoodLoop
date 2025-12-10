import { getActiveItems } from "@/lib/server-actions/item";
import { Listing } from "@/types/Listing";
import { useEffect, useMemo, useState } from "react";

export function useFilteredItems() {
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState<Listing[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

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
      listing.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [listings, searchQuery]);

  return { loading, filteredListings, searchQuery, setSearchQuery };
}
