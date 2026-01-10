"use server";

import { db } from "@/db";
import { Item, Shop } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "@/lib/auth-server";

export async function createFoodItem(data: {
  title: string;
  description: string;
  food_id: number;
  expires_at: string;
}) {
  const session = await getServerSession();
  if (!session) throw new Error("Unauthorized");

  // Dobavi shop id
  const shop = await db
    .select()
    .from(Shop)
    .where(eq(Shop.admin_id, session.user.id))
    .limit(1);

  if (!shop.length) throw new Error("No shop for this user");

  await db.insert(Item).values({
    shop_id: shop[0].id,
    food_id: data.food_id,
    title: data.title,
    description: data.description,
    published_at: new Date(),
    expires_at: new Date(data.expires_at),
  });
}
