"use server";

import { supabaseClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/adminGuard";

export type User = {
  id: string;
  email: string;
  approved: boolean;
  isAdmin: boolean;
};


export async function getAllUsers() {
  await requireAdmin();

  const { data } = await supabaseClient
    .from("app_user")
    .select("email, approved, role_id, auth_user_id");

  return data?.map((u) => ({
    id: u.auth_user_id,
    email: u.email,
    approved: u.approved,
    isAdmin: u.role_id === 2,
  })) ?? [];
}

export async function approveUser(userId: string) {
  await requireAdmin();
  const { data, error } = await supabaseClient
  .from("app_user")
  .update({ approved: true })
  .eq("auth_user_id", userId);

if (error) console.error("Error updating user:", error);
else console.log("User approved:", data);

}


export async function rejectUser(userId: string) {
  await requireAdmin();
  await supabaseClient
    .from("app_user")
    .update({ approved: false })
    .eq("auth_user_id", userId);
}

export async function deleteUser(userId: string) {
  await requireAdmin();
  await supabaseClient
    .from("app_user")
    .delete()
    .eq("auth_user_id", userId);
}

export async function makeAdmin(userId: string) {
  await requireAdmin();
  await supabaseClient
    .from("app_user")
    .update({ role_id: 2 })
    .eq("auth_user_id", userId);
}
