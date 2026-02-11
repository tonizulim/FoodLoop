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
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  onReset?: () => void;
}

export default function SearchBar({ onReset }: SearchBarProps) {
  const { foodCategory } = useFoodCategory();

  const [filterFoodCategory, setFilterFoodCategory] = useQueryState(
    "filterFoodCategory",
    parseAsInteger.withDefault(0).withOptions({ shallow: false }),
  );

  const [searchQuery, setSearchQuery] = useQueryState(
    "query",
    parseAsString.withDefault("").withOptions({ shallow: false }),
  );

  return (
    <div className="relative max-w-4xl mx-auto mt-4 flex flex-col md:flex-row gap-2 items-center">
      {/* Search input */}
      <div className="relative flex-0 md:basis-2/5 w-full">
        <Search className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground pointer-events-none" />
        <Input
          type="text"
          placeholder="Search for food, location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 h-12 w-full"
        />
      </div>

      {/* Food category select */}
      <div className="flex-0 md:basis-2/5 w-full">
        <Select
          value={filterFoodCategory ? filterFoodCategory.toString() : ""}
          onValueChange={(value) =>
            setFilterFoodCategory(value === "none" ? 0 : Number(value))
          }
        >
          <SelectTrigger
            id="category"
            className="w-full flex rounded-md border border-input px-3 py-2 min-h-12 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <SelectValue placeholder="Select a food category" />
          </SelectTrigger>
          <SelectContent className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
            <SelectItem key="none" value="none">
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

      {/* Reset button */}
      <div className="flex-0 md:basis-1/5 w-full">
        <Button
          size="sm"
          variant="outline"
          className="h-12 w-full"
          onClick={() => {
            setSearchQuery("");
            setFilterFoodCategory(0);
            onReset?.();
          }}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}
