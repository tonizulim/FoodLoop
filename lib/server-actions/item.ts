import { NewItem } from "@/types/NewItemDTO";
import { supabaseClient } from "../supabase/server";
import { itemSchema } from "@/validators/itemValidator";
import { formatZodError } from "../zodHelpers";
import { Result } from "../result";
import { logError } from "../logger";
import { Listing } from "@/types/Listing";

const parsePoint = (
  pointStr: string | null | undefined
): { x: number; y: number } | null => {
  if (!pointStr) return null;
  const [x, y] = pointStr.replace(/[()]/g, "").split(",").map(Number);
  return { x, y };
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
    location: parsePoint(item.Shop?.location) ?? { lng: 0, lat: 0 },
    address: item.Shop?.address ?? "",
    email: item.Shop?.User?.email ?? "",
  }));
}

export async function getActiveItems() {
  const now = new Date().toISOString();

  const { data: allPosts, error } = await supabaseClient
    .from("Item")
    .select(
      `
    *,
    Food (
      type
    ),
    Shop (
      location,
      User!Shop_admin_id_User_id_fk (email)
    )
  `
    )
    .gt("expires_at", now);

  if (error) {
    console.error("Get error:", error);
    await logError(error);
    return Result.error("server error");
  }

  return Result.ok(transformListings(allPosts));
}

export async function addItem(item: NewItem) {
  const parsedItem = itemSchema.safeParse(item);

  if (!parsedItem.success) {
    return Result.error("validation error", formatZodError(parsedItem.error));
  }

  const { data, error } = await supabaseClient
    .from("Item")
    .insert([parsedItem.data]);

  if (error) {
    console.error("Insert error:", error);
    await logError(error);
    return Result.error("server error");
  }

  return Result.ok("Successfully added new item.");
}
