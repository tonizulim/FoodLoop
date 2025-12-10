import { getUnexpiredItems } from "@/lib/server-actions/item";
import { useEffect, useState } from "react";
import { Item } from "@/db/schema";
import { InferModel } from "drizzle-orm";

type ItemType = InferModel<typeof Item>;

export function useExistingItems() {
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState<ItemType[]>([]);

  async function fetchListings() {
    setLoading(true);
    try {
      const res = await getUnexpiredItems();
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

  return { loading, listings };
}
