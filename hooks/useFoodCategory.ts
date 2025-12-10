import { getFoodCategory } from "@/lib/server-actions/foodCategory";
import { getActiveItems } from "@/lib/server-actions/item";
import { Listing } from "@/types/Listing";
import { useEffect, useState } from "react";

export function useFoodCategory() {
  const [loading, setLoading] = useState(false);
  const [foodCategory, setFoodCategory] = useState<Listing[]>([]);

  async function fetchFoodCategory() {
    setLoading(true);
    try {
      const res = await getFoodCategory();
      if (res.status) {
        setFoodCategory(res?.data ?? []);
      }
      setLoading(false);
      return;
    } catch (err) {}

    setLoading(false);
  }

  useEffect(() => {
    fetchFoodCategory();
  }, []);

  return { loading, foodCategory };
}
