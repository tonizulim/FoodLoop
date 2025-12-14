import { supabaseClient } from "./supabase/server";

export type FoodListing = {
  id: string;
  title: string;
  description: string;
  location: string;
  address: string;
  expiresAt: string;
  userId: number;
};

export async function getUserListings(userId: number) {
  const { data, error } = await supabaseClient
    .from("Item")
    .select("*")
    .eq("shop_id", userId)
    .order("expires_at", { ascending: true });

console.log("AAAAAAAAAAAAAAA");

  if (error) {
    console.error("getUserListings error:", error);
    return [];
  }

  console.log(data);

  return data.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    location: item.location,
    address: item.address,
    expiresAt: item.expires_at,
    userId: item.user_id,
  })) as FoodListing[];
}


export type CurrentUser = {
  id: number;
  email: string;
  role_id: number;
};

export async function getCurrentUser() {
  const userId = "1";

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


export async function deleteFoodListing(itemId: number) {
  const { error } = await supabaseClient
    .from("Item")
    .delete()
    .eq("id", itemId);

  if (error) {
    console.error("deleteFoodListing error:", error);
    return false;
  }

  return true;
}

type EditFoodListingInput = {
  title: string;
  description: string;
  location: string;
  address: string;
  expiresAt: string;
};

export async function editFoodListing(
  itemId: number,
  data: EditFoodListingInput
) {
  const { error } = await supabaseClient
    .from("Item")
    .update({
      title: data.title,
      description: data.description,
      location: data.location,
      address: data.address,
      expires_at: data.expiresAt,
    })
    .eq("id", itemId);

  if (error) {
    console.error("editFoodListing error:", error);
    return false;
  }

  return true;
}
