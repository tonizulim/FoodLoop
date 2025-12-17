"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { type FoodListing } from "@/lib/itemsActions";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { supabaseClient } from "@/lib/supabase/server";
import formatDateDayMonthTime from "@/lib/helpers";

export default function ItemPage() {
  const params = useParams();
  const [item, setItem] = useState<FoodListing | null>(null);

  async function getItemById(itemId: number) {
    const { data, error } = await supabaseClient
      .from("Item")
      .select("*")
      .eq("id", itemId)
      .single();

    if (error || !data) {
      console.error(error);
      return null;
    }

    const { data: shopData, error: shopError } = await supabaseClient
      .from("Shop")
      .select("location, address")
      .eq("id", data.shop_id)
      .single();

    if (shopError || !shopData) {
      console.error("GET SHOP ERROR:", shopError);
      return null;
    }

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      location: shopData.location,
      address: shopData.address,
      expiresAt: data.expires_at,
      publishedAt: data.published_at,
      shopId: data.shop_id,
      image: data.image,
    } as FoodListing;
  }

  useEffect(() => {
    const loadItem = async () => {
      const item1 = await getItemById(Number(params.id));
      setItem(item1);
    };
    loadItem();
  }, [params.id]);

  if (!item) return <p>Loading or Item not found...</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>{item.title}</CardTitle>
          <CardDescription>{item.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Address: {item.address}</p>
          <p>Published: {formatDateDayMonthTime(item.publishedAt)}</p>
          <p>Expires: {formatDateDayMonthTime(item.expiresAt)}</p>
        </CardContent>
      </Card>
    </div>
  );
}
