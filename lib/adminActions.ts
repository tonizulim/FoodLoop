"use server";

import { supabaseClient } from "@/lib/supabase/server";
import { AppUser } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";

export type User = {
  id: string;
  email: string;
  approved: boolean;
  isAdmin: boolean;
};

export async function getAllUsers() {
  const { data } = await supabaseClient
    .from("app_user")
    .select("id, email, approved, role_id");

  return (
    data?.map((u) => ({
      id: u.id,
      email: u.email,
      approved: u.approved,
      isAdmin: u.role_id === 2,
    })) ?? []
  );
}

export async function approveUser(userId: string) {
  await db
    .update(AppUser)
    .set({ approved: true })
    .where(eq(AppUser.id, Number(userId)));
}

export async function deleteUser(userId: string) {
  await db.delete(AppUser).where(eq(AppUser.id, Number(userId)));
}