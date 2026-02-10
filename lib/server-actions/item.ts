import { NewItem } from "@/types/NewItemDTO";
import { supabaseClient } from "../supabase/server";
import { itemSchema } from "@/validators/itemValidator";
import { formatZodError } from "../zodHelpers";
import { Result } from "../result";
import { Listing } from "@/types/Listing";
import { LocationPoint } from "@/types/Location";

const parsePoint = (
  pointStr: string | null | undefined
): LocationPoint | null => {
  if (!pointStr) return null;
  const [lat, lng] = pointStr.replace(/[()]/g, "").split(",").map(Number);
  return { lat, lng };
};

export function transformListings(raw: any[]): Listing[] {
  return raw.map((item) => ({
    id: item.id,
    shop_id: item.shop_id,
    food_id: item.food_id,
    title: item.title,
    description: item.description,
    image: item.image,
    published_at: item.published_at,
    expires_at: item.expires_at,

    foodCategory: item.Food?.type ?? "",
    location: parsePoint(item.shop?.location) ?? { lat: 0, lng: 0 },
    address: item.shop?.address ?? "",
    email: item.shop?.user?.email ?? "",
  }));
}


export async function getActiveItems() {
  const now = new Date().toISOString();

  const { data, error } = await supabaseClient
    .from("item")
    .select(`
      id,
      shop_id,
      food_id,
      title,
      description,
      image,
      published_at,
      expires_at,

      Food (
        type
      ),

      shop:shop_id (
        location,
        address,

        user:admin_id (
          email
        )
      )
    `)
    .gt("expires_at", now);

  if (error) {
    console.error("Get error:", error);
    return Result.error("server error");
  }

  return Result.ok(transformListings(data ?? []));
}


export async function getItem(id: number) {
  const now = new Date().toISOString();

  const { data, error } = await supabaseClient
    .from("item")
    .select(`
      id,
      shop_id,
      food_id,
      title,
      description,
      image,
      published_at,
      expires_at,

      Food (
        type
      ),

      shop:shop_id (
        location,
        address,

        user:admin_id (
          email
        )
      )
    `)
    .eq("id", id)
    .gt("expires_at", now)
    .single();

  if (error) {
    console.error("Get error:", error);
    return Result.error("server error");
  }

  return Result.ok(transformListings([data])[0]);
}


export async function addItem(item: NewItem) {
  const parsedItem = itemSchema.safeParse(item);

  if (!parsedItem.success) {
    return Result.error("validation error", formatZodError(parsedItem.error));
  }

  const { data, error } = await supabaseClient
    .from("item")
    .insert([parsedItem.data]);

  if (error) {
    console.error("Insert error:", error);
    return Result.error("server error");
  }

  return Result.ok("Successfully added new item.");
}
