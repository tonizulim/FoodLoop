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
import Image from "next/image";
import Link from "next/link";

import { useState, useEffect } from "react";

export function FoodCard({ item }: FoodCardProps) {
  const [timeLeftText, setTimeLeftText] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const timeLeft = new Date(item.expires_at).getTime() - Date.now();
      const totalMinutes = Math.max(0, Math.floor(timeLeft / (1000 * 60)));
      const hoursLeft = Math.floor(totalMinutes / 60);
      const minutesLeft = totalMinutes % 60;

      if (totalMinutes <= 0) {
        setTimeLeftText("");
      } else if (hoursLeft > 0) {
        if (hoursLeft < 24) {
          setTimeLeftText(`${hoursLeft}h ${minutesLeft}m left`);
        } else {
          setTimeLeftText(`${Math.floor(hoursLeft / 24)}d left`);
        }
      } else {
        setTimeLeftText(`${minutesLeft}m left`);
      }
    }, 1000); // update svakih 1s

    return () => clearInterval(interval);
  }, [item.expires_at]);

  const postedDate = new Date(item.published_at).toLocaleDateString(); // možeš isto staviti u useEffect ako želiš

  return (
    <Link href={`/item/${item.id}`} className="m-2">
      <Card className="transition-all hover:shadow-lg hover:border-primary">
        {/* Slika */}
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={item.image ?? "/itemImg.png"} // fallback
            alt={item.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Header */}
        <CardHeader className="pt-4 pb-2">
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="text-lg md:text-xl font-semibold">
              {item.title}
            </CardTitle>
            {timeLeftText && (
              <Badge
                variant={
                  timeLeftText.includes("h") && Number(timeLeftText[0]) < 6
                    ? "destructive"
                    : "secondary"
                }
                className="shrink-0 px-2 py-1 text-xs"
              >
                {timeLeftText}
              </Badge>
            )}
          </div>

          <CardDescription className="line-clamp-2 text-sm text-muted-foreground mt-1">
            {item.description}
          </CardDescription>

          <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
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
          Posted {postedDate}
        </CardFooter>
      </Card>
    </Link>
  );
}

// export function FoodCard({ item }: FoodCardProps) {
//   const timeLeft = new Date(item.expires_at).getTime() - Date.now();

//   const totalMinutes = Math.max(0, Math.floor(timeLeft / (1000 * 60)));
//   const hoursLeft = Math.floor(totalMinutes / 60);
//   const minutesLeft = totalMinutes % 60;

//   return (
//     <Link href={`/item/${item.id}`} className="m-2">
//       <Card className="transition-all hover:shadow-lg hover:border-primary">
//         {/* Slika */}
//         <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
//           <Image
//             src="/itemImg.png"
//             alt={item.title}
//             fill
//             className="object-cover"
//           />
//         </div>

//         {/* Header: Title + Badge */}
//         <CardHeader className="pt-4 pb-2">
//           <div className="flex items-center justify-between gap-2">
//             <CardTitle className="text-lg md:text-xl font-semibold">
//               {item.title}
//             </CardTitle>
//             {totalMinutes > 0 && totalMinutes < 1440 && (
//               <Badge
//                 variant={hoursLeft < 6 ? "destructive" : "secondary"}
//                 className="shrink-0 px-2 py-1 text-xs"
//               >
//                 {hoursLeft > 0
//                   ? `${hoursLeft}h ${minutesLeft}m left`
//                   : `${minutesLeft}m left`}
//               </Badge>
//             )}
//           </div>

//           {/* Description */}
//           <CardDescription className="line-clamp-2 text-sm text-muted-foreground mt-1">
//             {item.description}
//           </CardDescription>

//           {/* Food category */}
//           <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
//             <Utensils className="h-4 w-4 text-primary" />
//             <span className="font-medium">{item.foodCategory}</span>
//           </div>
//         </CardHeader>

//         {/* Content: Address + Email */}
//         <CardContent className="space-y-2">
//           <div className="flex items-center gap-2 text-sm text-muted-foreground">
//             <MapPin className="h-4 w-4 text-primary" />
//             <span className="font-medium">{item.address}</span>
//           </div>
//           <div className="flex items-center gap-2 text-sm text-muted-foreground">
//             <User className="h-4 w-4" />
//             <span>{item.email}</span>
//           </div>
//         </CardContent>

//         {/* Footer: Date */}
//         <CardFooter className="text-xs text-muted-foreground">
//           <Clock className="h-3 w-3 mr-1" />
//           Posted {new Date(item.published_at).toLocaleDateString()}
//         </CardFooter>
//       </Card>
//     </Link>
//   );
// }
