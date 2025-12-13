import { Item } from "@/db/schema";
import { InferModel } from "drizzle-orm";
import { LocationPoint } from "./Location";

type ItemType = InferModel<typeof Item>;

export interface Listing extends ItemType {
  foodCategory: string;
  address: string;
  location: LocationPoint;
  email: string;
}
