"use client";

import { Food } from "@/db/schema";
import { getFoodCategory } from "@/lib/server-actions/foodCategory";
import { useEffect, useState } from "react";

type FoodType = typeof Food.$inferSelect;

export function useFoodCategory() {
  const [loading, setLoading] = useState(false);
  const [foodCategory, setFoodCategory] = useState<FoodType[]>([]);

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
