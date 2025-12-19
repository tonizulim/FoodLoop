"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useQueryState, parseAsInteger, parseAsString } from "nuqs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFoodCategory } from "@/hooks/useFoodCategory";
//import { Suspense } from "react";
//import AvailableFoodPickups from "@/components/AvailableFoodPickups";
//import AvailableFoodPickupsLoadingSkeleton from "@/components/AvailableFoodPickupsLoadingSkeleton";

export default function HomePage() {
  const { foodCategory } = useFoodCategory();

  const [filterFoodCategory, setFilterFoodCategory] = useQueryState(
    "filterFoodCategory",
    parseAsInteger.withDefault(0).withOptions({ shallow: false })
  );

  const [searchQuery, setSearchQuery] = useQueryState(
    "query",
    parseAsString.withDefault("").withOptions({ shallow: false })
  );

  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(0).withOptions({ shallow: false })
  );

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-background border-b border-border">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance">
              Share Food, <span className="text-primary">Reduce Waste</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground text-pretty">
              Connect with your community to share surplus food and help reduce
              food waste. Browse available pickups or share your own.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto mt-4 flex flex-col md:flex-row gap-2">
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground pointer-events-none" />
              <Input
                type="text"
                placeholder="Search for food, location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base"
              />
              <Select
                value={filterFoodCategory ? filterFoodCategory.toString() : ""}
                onValueChange={(value) => {
                  setFilterFoodCategory(value == "none" ? 0 : Number(value));
                }}
              >
                <SelectTrigger
                  id="category"
                  className="flex w-full rounded-md border border-input px-3 py-2 min-h-12 text-sm  focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <SelectValue placeholder="Select a food category" />
                </SelectTrigger>
                <SelectContent className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                  <SelectItem key={"spec"} value={"none"}>
                    no filter
                  </SelectItem>
                  {foodCategory.map((opt) => (
                    <SelectItem key={opt.id} value={opt.id.toString()}>
                      {opt.type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>
      {/* <Suspense fallback={<AvailableFoodPickupsLoadingSkeleton />}>
        <AvailableFoodPickups />
      </Suspense> */}
    </div>
  );
}
