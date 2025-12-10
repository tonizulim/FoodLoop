import { getActiveItems } from "@/lib/server-actions/item";
import { useEffect, useMemo, useState } from "react";
import { Item } from "@/db/schema";
import { InferModel } from "drizzle-orm";

type ItemType = InferModel<typeof Item>;

export function useFilteredItems() {
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState<ItemType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  async function fetchListings() {
    setLoading(true);
    try {
      const res = await getActiveItems();
      if (res.status) {
        //setListings(res?.data ?? []);
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
