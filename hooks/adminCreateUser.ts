"use server";

import { db } from "@/db";
import { AppUser, Shop, user } from "@/db/schema";
import { authClient } from "@/lib/auth-client";
import { supabaseAdmin } from "@/lib/supabase/server";

type CreateUserInput = {
  name: string;
  email: string;
  password: string;
  shopName: string;
  shopAddress: string;
  location: [number, number];
};

export async function adminCreateUser({
  name,
  email,
  password,
  shopName,
  shopAddress,
  location,
}: CreateUserInput) {
  const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
  const userExists = existingUsers?.users?.find((u) => u.email === email);
  if (userExists) throw new Error("User with this email already exists");

  const { data: authUser, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  const { data: authUser2 } = await authClient.signUp.email({
    email,
    password,
    name,
  });

  if (error || !authUser.user) {
    throw new Error(error?.message || "Failed to create auth user");
  }

  const authUserId = authUser.user.id;

  await db.insert(user).values({
    id: authUserId,
    email,
    name,
    emailVerified: true,
  });

  await db.insert(AppUser).values({
    authUserId,
    email,
    name,
    isAdmin: true,
  });

  await db.insert(Shop).values({
    admin_id: authUserId,
    name: shopName,
    address: shopAddress,
    location,
  });

  return { success: true, userId: authUserId };
}
