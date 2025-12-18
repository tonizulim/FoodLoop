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

export default function ItemPage() {
  const params = useParams();
  const id = Number(params.id);
  //const [item, setItem] = useState<FoodListing | null>(null);
  const { listing, loading } = useItem(id);

  if (!listing || loading) return <p>Loading or Item not found...</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>{listing?.title}</CardTitle>
          <CardDescription>{listing?.description}</CardDescription>
        </CardHeader>
        <div className="bg-red-500 min-h-1">
          <Map
            listings={listing ? [listing] : []}
            setSelectedLocation={() => {}}
            selectedLocation={listing ? listing.location : null}
          />
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
