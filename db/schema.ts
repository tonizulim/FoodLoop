import {
  pgTable,
  integer,
  varchar,
  boolean,
  timestamp,
  point,
  text,
} from "drizzle-orm/pg-core";
import { number } from "zod";

export const Role = pgTable("Role", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  role: varchar({ length: 50 }).notNull(),
});

export const Shop = pgTable("Shop", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  location: point("location"),
  image: varchar({ length: 500 }),
  admin_id: integer()
    .references(() => User.id)
    .notNull(),
  user_id: integer().references(() => User.id),
});

export const User = pgTable("User", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  salt: varchar({ length: 255 }).notNull(),
  refresh_token: varchar({ length: 500 }),
  role_id: integer()
    .references(() => Role.id)
    .notNull(),
});

export const Food = pgTable("Food", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  type: varchar({ length: 50 }).notNull(),
});

export const Item = pgTable("Item", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  shop_id: integer()
    .references(() => Shop.id)
    .notNull(),
  food_id: integer()
    .references(() => Food.id)
    .notNull(),
  title: varchar({ length: 255 }).notNull(),
  description: text(),
  image: varchar({ length: 500 }),
  published_at: timestamp().defaultNow(),
  expires_at: timestamp(),
});

export const Log = pgTable("Log", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  code: varchar({ length: 50 }),
  message: varchar({ length: 255 }).notNull(),
  details: text(),
  hint: text(),
  time: timestamp().defaultNow(),
});
