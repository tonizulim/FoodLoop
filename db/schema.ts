import { user } from "@/auth-schema";
import {
  pgTable,
  integer,
  varchar,
  boolean,
  timestamp,
  point,
  text,
} from "drizzle-orm/pg-core";

export * from "@/auth-schema";

export const Role = pgTable("Role", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  role: varchar({ length: 50 }).notNull(),
});

export const Shop = pgTable("shop", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  location: point("location").notNull(),
  address: varchar({ length: 200 }).notNull(),
  image: varchar({ length: 500 }),
  admin_id: text("admin_id").notNull().references(() => user.id),
});

export const AppUser = pgTable("app_user", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: varchar({ length: 255 }).notNull().unique(),
  approved: boolean().default(false).notNull(),
  role_id: integer().references(() => Role.id).notNull(),
  authUserId: text("auth_user_id").notNull().references(() => user.id),
});


export const Food = pgTable("Food", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  type: varchar({ length: 50 }).notNull(),
});

export const Item = pgTable("item", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  shop_id: integer().references(() => Shop.id).notNull(),
  food_id: integer().references(() => Food.id).notNull(),
  title: varchar({ length: 255 }).notNull(),
  description: text(),
  image: varchar({ length: 500 }),
  published_at: timestamp().defaultNow().notNull(),
  expires_at: timestamp().notNull(),
});

export const Log = pgTable("Log", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  code: varchar({ length: 50 }),
  message: varchar({ length: 255 }).notNull(),
  details: text(),
  hint: text(),
  time: timestamp().defaultNow(),
});
