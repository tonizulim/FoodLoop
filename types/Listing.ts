import { Item } from "@/db/schema";
import { InferModel } from "drizzle-orm";

type ItemType = InferModel<typeof Item>;

export interface Listing extends ItemType {
  type: string; // Food type
  location: string; // Shop location
  email: string; // User email
}
