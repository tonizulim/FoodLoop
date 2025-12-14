import "dotenv/config";
import { db } from "../index.js";
import { Role, Food, User, Shop, Item } from "../schema.js";
import { Roles } from "../../constants/roles.js";
import { FoodCategory } from "../../constants/foodCategory.js";

async function runSeeds() {
  try {
    console.log("Cleaning database...");

    await db.execute(`TRUNCATE TABLE "Item" RESTART IDENTITY CASCADE`);
    await db.execute(`TRUNCATE TABLE "Shop" RESTART IDENTITY CASCADE`);
    await db.execute(`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`);
    await db.execute(`TRUNCATE TABLE "Food" RESTART IDENTITY CASCADE`);
    await db.execute(`TRUNCATE TABLE "Role" RESTART IDENTITY CASCADE`);

    console.log("Database cleaned");
    const roles = await db
      .insert(Role)
      .values([
        { role: Roles.Superadmin },
        { role: Roles.Admin },
        { role: Roles.User },
      ])
      .returning();
    console.log("Adding roles: ");
    console.log(roles);

    const foodCategory = await db
      .insert(Food)
      .values([
        { type: FoodCategory.Bread },
        { type: FoodCategory.Meat },
        { type: FoodCategory.Pastry },
      ])
      .returning();
    console.log("Adding foods: ");
    console.log(foodCategory);

    const superAdminRoleId = roles[0].id;
    const adminRoleId = roles[1].id;
    const userRoleId = roles[2].id;
    const bread = foodCategory[0].id;
    const meat = foodCategory[1].id;
    const pastry = foodCategory[2].id;

    const users = await db
      .insert(User)
      .values([
        {
          email: "superadmin@test.com",
          password: "Superadmin123!",
          salt: "1",
          role_id: superAdminRoleId,
          approved: true,
        },
        {
          email: "admin@test.com",
          password: "Admin123!",
          salt: "1",
          role_id: adminRoleId,
          approved: true,
        },
        {
          email: "user@test.com",
          password: "User123!",
          salt: "3",
          role_id: userRoleId,
          approved: false,
        },
      ])
      .returning();
    console.log("Adding users: ");
    console.log(users);

    const userAdminId = users[1].id;
    const userId = users[2].id;

    const shops = await db
      .insert(Shop)
      .values([
        {
          admin_id: userAdminId,
          user_id: userId,
          image: "https://placehold.co/600x400",
          location: [43.511649, 16.466764],
          address: "Kampus",
        },
        {
          admin_id: userAdminId,
          user_id: userId,
          image: "https://placehold.co/600x400",
          location: [43.5023, 16.4779],
          address: "Žnjan",
        },
      ])
      .returning();
    console.log("Adding shops: ");
    console.log(shops);

    const shopId1 = shops[0].id;
    const shopId2 = shops[1].id;

    const items = await db
      .insert(Item)
      .values([
        {
          shop_id: 1,
          food_id: bread,
          title: "Fresh Baguette",
          description: "Daily baked baguette",
          image: "https://placehold.co/500x300",
          expires_at: new Date("2025-12-31"),
        },
        {
          shop_id: 1,
          food_id: pastry,
          title: "Chocolate Croissant",
          description: "Buttery and fresh",
          image: "https://placehold.co/500x300",
          expires_at: new Date("2025-12-31"),
        },
        {
          shop_id: 2,
          food_id: meat,
          title: "Beef Steak",
          description: "Grass-fed quality",
          image: "https://placehold.co/500x300",
          expires_at: new Date("2025-12-31"),
        },
      ])
      .returning();
    console.log("Adding items: ");
    console.log(items);

    console.log("All seeds executed successfully!");
  } catch (err) {
    console.error("Seed error:", err);
  }
}

runSeeds();
