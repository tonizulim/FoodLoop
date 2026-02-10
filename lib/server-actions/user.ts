"use server";

import { db } from "@/db";
import { AppUser } from "@/db/schema";
import { eq } from "drizzle-orm";
import { supabaseClient } from "../supabase/server";


export type User = {
  id: string;
  email: string;
  name?: string;
  isAdmin: boolean;
};

export async function getAllUsers() {
  const { data } = await supabaseClient
    .from("app_user")
    .select("id, email, name, is_admin");

  return (
    data?.map((u) => ({
      id: u.id,
      email: u.email,
      name: u.name,
      isAdmin: u.is_admin,
    })) ?? []
  );
}

export async function deleteUser(userId: string) {
  await db.delete(AppUser).where(eq(AppUser.id, Number(userId)));
}