import {
  integer,
  pgTable,
  varchar,
  serial,
  text,
  timestamp,
  boolean,
  doublePrecision,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  isAdmin: boolean("is_admin").notNull().default(false),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const items = pgTable("items", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  address: text("address").notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  expiresAt: timestamp("expires_at").notNull(),
});
