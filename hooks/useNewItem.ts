"use client";

import { addItem } from "@/lib/server-actions/item";
import { ItemFormState } from "@/types/ItemFormState";
import { NewItem } from "@/types/NewItemDTO";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useFoodForm() {
  const router = useRouter();
  const [foodFormState, setFoodFormState] = useState<ItemFormState>({
    error: "",
    success: false,
    loading: false,
    fieldErrors: {},
  });
  const [item, setItem] = useState<NewItem>({
    shop_id: 1,
    food_id: 1,
    title: "",
    description: "",
    image: undefined,
    published_at: new Date(Date.now()).toISOString(),
    expires_at: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
  });

  useEffect(() => {
    if (foodFormState.success) router.push("./");
  }, [foodFormState.success]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFoodFormState((prev) => ({
      ...prev,
      error: "",
      fieldErrors: {},
      success: false,
      loading: true,
    }));

    try {
      const res = await addItem(item);

      if (res?.status) {
        setFoodFormState((prev) => ({
          ...prev,
          success: true,
          loading: false,
        }));
        return;
      } else {
        setFoodFormState((prev) => ({
          ...prev,
          error: res?.message ? res?.message : "",
          fieldErrors: res?.error ? res?.error : {},
          success: false,
          loading: false,
        }));
      }
    } catch (err) {
      setFoodFormState((prev) => ({
        ...prev,
        error: "Failed to post food listing",
        loading: false,
      }));
    }
    return;
  };

  return { item, setItem, handleSubmit, foodFormState };
}
