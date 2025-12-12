import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, User, Utensils } from "lucide-react";
import { FoodCardProps } from "@/types/FoodCardProps";

export function FoodCard({ item }: FoodCardProps) {
  const timeLeft = new Date(item.expires_at).getTime() - Date.now();
  const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-xl">{item.title}</CardTitle>
          {hoursLeft < 24 && (
            <Badge
              variant={hoursLeft < 6 ? "destructive" : "secondary"}
              className="shrink-0"
            >
              {hoursLeft}h left
            </Badge>
          )}
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
          <span className="font-medium">{item.location}</span>
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
    </Card>
  );
}
