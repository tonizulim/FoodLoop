"use client";

import { useState } from "react";
import { createFoodItem } from "@/lib/itemsServer"; // server action

export function useFoodForm() {
  const [item, setItem] = useState({
    title: "",
    description: "",
    food_id: undefined as number | undefined,
    expires_at: new Date(Date.now() + 2 * 3600_000).toISOString(),
  });

  const [foodFormState, setFoodFormState] = useState({
    loading: false,
    error: "",
    success: false,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFoodFormState({ loading: true, error: "", success: false });

    try {
      await createFoodItem({ ...item, food_id: item.food_id ?? -1 });

      setFoodFormState({ loading: false, error: "", success: true });
    } catch (err: any) {
      setFoodFormState({
        loading: false,
        error: err.message || "Failed",
        success: false,
      });
    }
  }

  return { item, setItem, handleSubmit, foodFormState };
}
