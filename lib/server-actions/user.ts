"use server";

import { db } from "@/db";
import { AppUser, Shop } from "@/db/schema";
import { eq } from "drizzle-orm";
import { InferSelectModel } from "drizzle-orm";
import { supabaseAdmin, supabaseClient } from "../supabase/server";

// export type User = {
//   id: string;
//   email: string;
//   name?: string;
//   isAdmin: boolean;
// };

export async function getAllUsers() {
  const data = await db.select().from(AppUser);
  return (
    data?.map((u) => ({
      id: u.id as number,
      email: u.email,
      name: u.name,
      isAdmin: u.isAdmin,
      adminId: u.authUserId,
    })) ?? []
  );
}

export async function deleteUser(userId: string) {
  await db.delete(AppUser).where(eq(AppUser.authUserId, userId));
  supabaseAdmin.auth.admin.deleteUser(userId);
}

export async function getUser(userId: string) {
  const [user, shop] = await Promise.all([
    db.select().from(AppUser).where(eq(AppUser.authUserId, userId)),
    db.select().from(Shop).where(eq(Shop.admin_id, userId)),
  ]);

  if (!user[0]) return null;

  return {
    id: user[0].id as number,
    name: user[0].name,
    email: user[0].email,
    adminId: user[0].authUserId,
    shop: shop[0]
      ? {
          name: shop[0].name,
          address: shop[0].address,
          location: shop[0].location,
        }
      : undefined,
  };
}

export type User = {
  id: string;
  email: string;
  name?: string;
  isAdmin: boolean;
  adminId: string;
  shop?: {
    name: string;
    address: string;
    location: [number, number];
  };
};

export async function updateUser(
  userId: string,
  data: {
    name: string;
    email: string;
    shopName: string;
    shopAddress: string;
    location: [number, number];
  },
) {
  const userUpdate: Partial<InferSelectModel<typeof AppUser>> = {};
  if (data.name !== undefined) userUpdate.name = data.name;
  if (data.email !== undefined) userUpdate.email = data.email;

  if (Object.keys(userUpdate).length > 0) {
    await db
      .update(AppUser)
      .set(userUpdate)
      .where(eq(AppUser.authUserId, userId));
  }

  const existingShop = await db
    .select()
    .from(Shop)
    .where(eq(Shop.admin_id, userId));

  if (existingShop.length > 0) {
    const shopUpdate: Partial<InferSelectModel<typeof Shop>> = {};
    if (data.shopName !== undefined) shopUpdate.name = data.shopName;
    if (data.shopAddress !== undefined) shopUpdate.address = data.shopAddress;
    if (data.location !== undefined) shopUpdate.location = data.location;

    if (Object.keys(shopUpdate).length > 0) {
      await db.update(Shop).set(shopUpdate).where(eq(Shop.admin_id, userId));
    }
  } else if (data.shopName && data.shopAddress && data.location) {
    await db.insert(Shop).values({
      admin_id: userId,
      name: data.shopName,
      address: data.shopAddress,
      location: data.location,
    });
  }

  return await getUser(userId);
}
