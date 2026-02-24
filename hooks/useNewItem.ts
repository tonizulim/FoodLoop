// "use client";

// import { useState } from "react";
// import { createFoodItem } from "@/lib/itemsServer"; // server action

// export function useFoodForm() {
//   const [item, setItem] = useState({
//     title: "",
//     description: "",
//     food_id: undefined as number | undefined,
//     expires_at: new Date(Date.now() + 2 * 3600_000).toISOString(),
//   });

//   const [foodFormState, setFoodFormState] = useState({
//     loading: false,
//     error: "",
//     success: false,
//   });

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     setFoodFormState({ loading: true, error: "", success: false });

//     try {
//       await createFoodItem({ ...item, food_id: item.food_id ?? -1 });

//       setFoodFormState({ loading: false, error: "", success: true });
//     } catch (err: any) {
//       setFoodFormState({
//         loading: false,
//         error: "Failed to submit food item. Please try again. Make sure all required fields are filled.",
//         success: false,
//       });
//     }
//   }

//   return { item, setItem, handleSubmit, foodFormState };
// }

"use client";

import { useState } from "react";
import { createFoodItem } from "@/lib/itemsServer";
import { supabaseClient as supabase } from "@/lib/supabase/client";

export function useFoodForm() {
  const [item, setItem] = useState({
    title: "",
    description: "",
    food_id: undefined as number | undefined,
    expires_at: new Date(Date.now() + 2 * 3600_000).toISOString(),
    image: "", // 👈 DODANO
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  const [foodFormState, setFoodFormState] = useState({
    loading: false,
    error: "",
    success: false,
  });

  async function uploadImage(): Promise<string | null> {
    if (!imageFile) return null;

    const fileExt = imageFile.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;

    console.log("IMAGE FILE:", imageFile);

    const { error } = await supabase.storage
      .from("food-images")
      .upload(fileName, imageFile);

    if (error) {
      console.error("Image upload error:", error);
      return null;
    };

    const { data } = supabase.storage
      .from("food-images")
      .getPublicUrl(fileName);

    return data.publicUrl;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFoodFormState({ loading: true, error: "", success: false });
    console.log("Submitting item:", item);

    try {
      let imageUrl = "";

      if (imageFile) {
        const uploadedUrl = await uploadImage();
        if (uploadedUrl) imageUrl = uploadedUrl;
      }

      await createFoodItem({
        ...item,
        image: imageUrl,
        food_id: item.food_id ?? -1,
      });

      setFoodFormState({ loading: false, error: "", success: true });

      setItem({
        title: "",
        description: "",
        food_id: undefined,
        expires_at: new Date(Date.now() + 2 * 3600_000).toISOString(),
        image: "",
      });

      setImageFile(null);
    } catch (err) {
      setFoodFormState({
        loading: false,
        error: "Failed to submit food item. Please try again. Make sure all required fields are filled.",
        success: false,
      });
    }
  }

  return { item, setItem, handleSubmit, foodFormState, setImageFile };
}
