"use client";

import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import Map from "../../../components/Map";
import { useItem } from "@/hooks/useItem";
import Image from "next/image";
import { Clock, Fullscreen, MapPin, User, Utensils } from "lucide-react";

export default function ItemPage() {
  const params = useParams();
  const id = Number(params.id);
  const { item, loading } = useItem(id);

  if (!item || loading) return <p>Loading or Item not found...</p>;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-secondary/30 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="p-0 sm:p-2">
          <div className="flex flex-col-reverse  gap-2 sm:flex-row items-center sm:justify-between">
            <div className="m-2">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </div>
                <CardDescription className="line-clamp-2">
                  {item.description}
                </CardDescription>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Utensils className="h-4 w-4 text-primary" />
                  <span className="font-medium">{item.foodCategory}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="font-medium">{item.address}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>{item.email}</span>
                </div>
              </CardContent>
              <CardFooter className="text-xs text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                Posted {new Date(item.published_at).toLocaleDateString()}
              </CardFooter>
            </div>
            <div className="relative w-full h-50 sm:h-60 sm:w-60 overflow-hidden rounded-lg">
              <Image
                //src={listing?.image ?? "/itemImg.png"}
                src="/itemImg.png"
                alt="Logo"
                fill
                className="object-cover rounded-md"
              />
            </div>
          </div>
          <div className="w-full h-full">
            <div className="m-2 h-[40vh] sm:h-[60vh] flex-1 relative bg-linear-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg border-2 border-green-200 dark:border-green-800 overflow-hidden">
              <Map
                listings={item ? [item] : []}
                setSelectedLocation={() => {}}
                selectedLocation={item ? item.location : null}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
