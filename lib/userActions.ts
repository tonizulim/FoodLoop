import { FoodListing } from "./itemsActions";
import { supabaseClient } from "./supabase/server";

export async function getUserListings(shopId: number) {
  const { data, error } = await supabaseClient
    .from("Item")
    .select("*")
    .eq("shop_id", shopId)
    .order("expires_at", { ascending: true });

  if (error) {
    console.error("getUserListings error:", error);
    return [];
  }

  const { data: shopData, error: shopError } = await supabaseClient
    .from("Shop")
    .select("location, address")
    .eq("id", shopId)
    .single();

  if (shopError) {
    console.error("GET SHOP ERROR:", shopError);
    return [];
  }

  return data.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    location: shopData.location,
    address: shopData.address,
    expiresAt: item.expires_at,
    publishedAt: item.published_at,
    shopId: item.shop_id,
    image: item.image,
  })) as FoodListing[];
}

export type CurrentUser = {
  id: number;
  email: string;
  role_id: number;
};

export async function getCurrentUser(userId: string) {
  if (!userId) return null;

  const { data, error } = await supabaseClient
    .from("User")
    .select("id, email, role_id")
    .eq("id", userId)
    .single();

  if (error || !data) {
    console.error("getCurrentUser error:", error);
    return null;
  }

  return data as CurrentUser;
}