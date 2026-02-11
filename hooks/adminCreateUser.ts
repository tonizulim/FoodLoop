"use server";

import { db } from "@/db";
import { AppUser, Shop, user } from "@/db/schema";
import { auth } from "@/lib/auth"; // server auth

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
  // 1️⃣ Kreiraj Better Auth user
  const result = await auth.api.signUpEmail({
    body: {
      email,
      password,
      name,
    },
  });

  const authUserId = result.user.id; // ✅ JEDINI ID KOJI POSTOJI

  // 3️⃣ App user
  await db.insert(AppUser).values({
    authUserId,
    email,
    name,
    isAdmin: false,
  });

  // 4️⃣ Shop
  await db.insert(Shop).values({
    admin_id: authUserId,
    name: shopName,
    address: shopAddress,
    location,
  });

  return { success: true, userId: authUserId };
}
