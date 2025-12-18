"use client";

import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Map from "../../../components/Map";
import { useItem } from "@/hooks/useItem";
import { useMapItems } from "@/hooks/useMapItems";

export default function ItemPage() {
  const params = useParams();
  const id = Number(params.id);
  const { listing, loading } = useItem(id);

  if (!listing || loading) return <p>Loading or Item not found...</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>{listing?.title}</CardTitle>
          <CardDescription>{listing?.description}</CardDescription>
        </CardHeader>
        <div className="w-full h-full">
          <div className=" h-[90vh] flex-1 relative bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg border-2 border-green-200 dark:border-green-800 overflow-hidden">
            <Map
              listings={listing ? [listing] : []}
              setSelectedLocation={() => {}}
              selectedLocation={listing ? listing.location : null}
            />
          </div>
        </div>

        <CardContent>
          <p>Address: {listing?.address}</p>
          {/* <p>Published: {formatDateDayMonthTime(listing?.publishedAt)}</p>
          <p>Expires: {formatDateDayMonthTime(listing?.expiresAt)}</p> */}
        </CardContent>
      </Card>
    </div>
  );
}
