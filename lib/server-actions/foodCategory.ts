import { logError } from "../logger";
import { Result } from "../result";
import { supabaseClient } from "../supabase/server";

export async function getFoodCategory() {
  const now = new Date().toISOString();

  const { data: allCategory, error } = await supabaseClient
    .from("Food")
    .select("*");

  if (error) {
    console.error("Get error:", error);
    await logError(error);
    return Result.error("server error");
  }

  return Result.ok(allCategory);
}
