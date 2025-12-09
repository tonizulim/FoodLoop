export interface NewItem {
  shop_id: number;
  food_id: number;
  title: string;
  description: string;
  image?: string;
  published_at?: string; // ISO string
  expires_at?: string; // ISO string
}
