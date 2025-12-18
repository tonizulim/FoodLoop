"use client";

import { getItem } from "@/lib/server-actions/item";
import { Listing } from "@/types/Listing";
import { useEffect, useState } from "react";

export function useItem(id: number) {
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState<Listing | null>();

  async function fetchListing() {
    setLoading(true);
    try {
      const res = await getItem(id);
      if (res.status) {
        setListing(res?.data);
      }
      setLoading(false);
      return;
    } catch (err) {}

    setLoading(false);
  }

  useEffect(() => {
    fetchListing();
  }, []);

  return {
    loading,
    listing,
  };
}
