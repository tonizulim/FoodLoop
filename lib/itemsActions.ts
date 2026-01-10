"use server";

import { db } from "@/db";
import { Item, Shop } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "@/lib/auth-server";

export async function getUserListings() {
  const session = await getServerSession();
  if (!session) throw new Error("Unauthorized");

  return db
    .select({
      id: Item.id,
      title: Item.title,
      description: Item.description,
      image: Item.image,
      publishedAt: Item.published_at,
      expiresAt: Item.expires_at,
      address: Shop.address,
      location: Shop.location,
    })
    .from(Item)
    .innerJoin(Shop, eq(Item.shop_id, Shop.id))
    .where(eq(Shop.admin_id, session.user.id));
}

export async function deleteFoodListing(itemId: number) {
  const session = await getServerSession();
  if (!session) throw new Error("Unauthorized");

  const listing = await db
    .select()
    .from(Item)
    .innerJoin(Shop, eq(Item.shop_id, Shop.id))
    .where(eq(Item.id, itemId))
    .limit(1);

  if (!listing.length || listing[0].shop.admin_id !== session.user.id) {
    throw new Error("Forbidden");
  }

  await db.delete(Item).where(eq(Item.id, itemId));
  return true;
}

export async function editFoodListing(
  itemId: number,
  data: {
    title: string;
    description: string;
    publishedAt: string;
    expiresAt: string;
    image?: string | null;
  }
) {
  const session = await getServerSession();
  if (!session) throw new Error("Unauthorized");

  const listing = await db
    .select()
    .from(Item)
    .innerJoin(Shop, eq(Item.shop_id, Shop.id))
    .where(eq(Item.id, itemId))
    .limit(1);

  if (!listing.length || listing[0].shop.admin_id !== session.user.id) {
    throw new Error("Forbidden");
  }

  await db
    .update(Item)
    .set({
      title: data.title,
      description: data.description,
      published_at: new Date(data.publishedAt),
      expires_at: new Date(data.expiresAt),
      image: data.image ?? listing[0].item.image,
    })
    .where(eq(Item.id, itemId));

  return true;
}
