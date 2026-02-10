"use server";

import { db } from "@/db";
import { AppUser } from "@/db/schema";
import { eq } from "drizzle-orm";
import { supabaseAdmin, supabaseClient } from "../supabase/server";

export type User = {
  id: string;
  email: string;
  name?: string;
  isAdmin: boolean;
};

export async function getAllUsers() {
  console.log("Fetching all users from the database...");
  const data = await db.select().from(AppUser);

    console.log("Raw user data from Supabase:", data);
  return (
    data?.map((u) => ({
      id: u.id as number,
      email: u.email,
      name: u.name,
      isAdmin: u.isAdmin,
    })) ?? []
  );
}

export async function deleteUser(userId: string) {
  await db.delete(AppUser).where(eq(AppUser.id, Number(userId)));
  supabaseAdmin.auth.admin.deleteUser(userId);
}
