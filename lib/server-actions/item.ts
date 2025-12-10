import { NewItem } from "@/types/NewItemDTO";
import { supabaseClient } from "../supabase/server";
import { itemSchema } from "@/validators/itemValidator";
import { formatZodError } from "../zodHelpers";
import { Result } from "../result";
import { logError } from "../logger";

export async function getUnexpiredItems() {
  const now = new Date().toISOString();

  const { data: allPosts, error } = await supabaseClient
    .from("Item")
    .select("*")
    .gt("expires_at", now);

  if (error) {
    console.error("Get error:", error);
    await logError(error);
    return Result.error("server error");
  }

  return Result.ok(allPosts);
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
